import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { differenceInDays, parseISO } from 'date-fns'

export function useDeals() {
  const [deals, setDeals]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  async function fetchDeals() {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('id, dealname, amount, dealstage, close_date, updated_at, is_closed_won, is_closed_lost')
        .eq('is_closed_won', false)
        .eq('is_closed_lost', false)
        .order('amount', { ascending: false })

      if (error) throw error

      const enriched = (data ?? []).map(d => ({
        ...d,
        name:     d.dealname,
        stage:    d.dealstage,
        age_days: d.updated_at ? differenceInDays(new Date(), parseISO(d.updated_at)) : 0,
      }))

      setDeals(enriched)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDeals() }, [])
  return { deals, loading, error, refetch: fetchDeals }
}
