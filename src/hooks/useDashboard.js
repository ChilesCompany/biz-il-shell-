import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { differenceInDays, parseISO } from 'date-fns'

export function useDashboard() {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  async function fetch() {
    setLoading(true)
    setError(null)
    try {
      const [dealsRes, agentsRes] = await Promise.all([
        supabase
          .from('deals')
          .select('id, dealname, amount, dealstage, updated_at, close_date')
          .eq('is_closed_won', false)
          .eq('is_closed_lost', false)
          .order('amount', { ascending: false }),
        supabase
          .from('agent_registry')
          .select('name, status, last_run, schedule, category')
          .order('name'),
      ])
      if (dealsRes.error) throw dealsRes.error
      const deals = (dealsRes.data ?? []).map(d => ({
        ...d,
        name:     d.dealname,
        stage:    d.dealstage,
        age_days: d.updated_at ? differenceInDays(new Date(), parseISO(d.updated_at)) : 0,
      }))
      const totalPipeline = deals.reduce((s, d) => s + (Number(d.amount) || 0), 0)
      const staleDeals    = deals.filter(d => d.age_days > 14)
      const agents        = agentsRes.data ?? []
      setData({ deals, totalPipeline, staleDeals, agents })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetch() }, [])
  return { data, loading, error, refetch: fetch }
}
