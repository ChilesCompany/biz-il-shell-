import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function usePipeline() {
  const [deals, setDeals]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [lastSync, setLastSync] = useState(null)

  async function fetchDeals() {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('id, deal_name, amount, priority, close_date, updated_at')
        .eq('is_closed_won', false)
        .eq('is_closed_lost', false)
        .order('amount', { ascending: false })
      if (error) throw error
      setDeals((data ?? []).map(d => ({ ...d, name: d.deal_name, stage: d.priority })))
      setLastSync(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDeals() }, [])
  return { deals, loading, error, lastSync, refetch: fetchDeals }
}
