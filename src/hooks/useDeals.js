import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { differenceInDays, parseISO } from 'date-fns'

export function useDeals({ includeClosedWon = false, includeClosedLost = false } = {}) {
  const [deals, setDeals]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  async function fetchDeals() {
    setLoading(true)
    setError(null)
    try {
      let query = supabase
        .from('deals')
        .select('*')
        .order('amount', { ascending: false })

      if (!includeClosedWon && !includeClosedLost) {
        query = query.not('stage', 'in', '("Closed Won","Closed Lost")')
      } else if (!includeClosedWon) {
        query = query.neq('stage', 'Closed Won')
      } else if (!includeClosedLost) {
        query = query.neq('stage', 'Closed Lost')
      }

      const { data, error } = await query
      if (error) throw error

      // Enrich with age in days
      const enriched = (data ?? []).map(d => ({
        ...d,
        age_days: d.updated_at
          ? differenceInDays(new Date(), parseISO(d.updated_at))
          : 0,
      }))

      setDeals(enriched)
    } catch (err) {
      console.error('[useDeals]', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDeals() }, [])

  return { deals, loading, error, refetch: fetchDeals }
}
