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
      // Run all queries in parallel
      const [dealsRes, agentsRes] = await Promise.all([
        supabase
          .from('deals')
          .select('id, name, amount, stage, updated_at, close_date')
          .not('stage', 'in', '("Closed Won","Closed Lost")')
          .order('amount', { ascending: false }),
        supabase
          .from('agent_registry')
          .select('name, status, last_run, schedule, category')
          .order('name'),
      ])

      if (dealsRes.error) throw dealsRes.error

      const deals = (dealsRes.data ?? []).map(d => ({
        ...d,
        age_days: d.updated_at
          ? differenceInDays(new Date(), parseISO(d.updated_at))
          : 0,
      }))

      const totalPipeline = deals.reduce((s, d) => s + (Number(d.amount) || 0), 0)
      const stalDeals     = deals.filter(d => d.age_days > 14)
      const agents        = agentsRes.data ?? []

      setData({ deals, totalPipeline, staleDeals: stalDeals, agents })
    } catch (err) {
      console.error('[useDashboard]', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetch() }, [])
  return { data, loading, error, refetch: fetch }
}
