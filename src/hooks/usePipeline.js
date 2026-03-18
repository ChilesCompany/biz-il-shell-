import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function usePipeline() {
  const [deals, setDeals]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [lastSync, setLastSync] = useState(null)

  async function fetchDeals() {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('deals')
        .select(`
          id,
          hubspot_id,
          name,
          amount,
          stage,
          pipeline,
          probability,
          close_date,
          owner_id,
          created_at,
          updated_at
        `)
        .not('stage', 'in', '("Closed Won","Closed Lost")')
        .order('amount', { ascending: false })

      if (error) throw error
      setDeals(data ?? [])
      setLastSync(new Date())
    } catch (err) {
      console.error('[usePipeline]', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDeals() }, [])

  return { deals, loading, error, lastSync, refetch: fetchDeals }
}
