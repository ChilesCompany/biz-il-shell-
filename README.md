# BIZ IL Shell

**Business Intelligence Layer** — React portal for Biltmore Management Advisors.

Built on: React 18 + Vite + Tailwind CSS + Supabase + React Router

## Stack
- **Frontend:** React 18, Vite, Tailwind CSS, React Router v6
- **Data:** Supabase (PostgreSQL + Edge Functions)
- **Brand:** BMA orange `#E05C2A`, navy `#1A1A2E`, Bebas Neue / DM Sans
- **Icons:** Lucide React

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

## Pages

| Route | Page | Status |
|---|---|---|
| `/dashboard` | Command Center | ✅ Built |
| `/pipeline` | Pipeline Kanban | ✅ Built |
| `/briefing` | Daily Briefing | ✅ Built |
| `/clients` | Client Health | ✅ Built |
| `/deals` | Deal Table | ✅ Built |
| `/proposals` | Proposal Tracker | ✅ Built |
| `/meetings` | Meeting Calendar | ✅ Built |
| `/katana` | Katana MRP | ✅ Built |
| `/agents` | Agent Registry | ✅ Built |
| `/knowledge` | Knowledge Base | ✅ Built |
| `/settings` | Platform Settings | ✅ Built |
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import PageShell from '@/components/ui/PageShell'
import AgentRunModal from '@/components/ui/AgentRunModal'
import { Bot, Play, Clock, CheckCircle, Circle, AlertTriangle, Loader2, Layers, Cpu, Zap } from 'lucide-react'

const LAYER_LABELS = {
  'Gateway':     { color: 'bg-orange/10 text-orange' },
  'Super Skill': { color: 'bg-violet-50 text-violet-700' },
  'Agent':       { color: 'bg-blue-50 text-blue-700' },
  'SIOP':        { color: 'bg-emerald-50 text-emerald-700' },
}

const STATUS_DISPLAY = {
  'Active':         { icon: CheckCircle,   color: 'text-emerald-600', label: 'Active' },
  'In Development': { icon: AlertTriangle,  color: 'text-amber-500',  label: 'In Dev' },
}

export default function AgentsPage() {
  const [agents, setAgents]           = useState([])
  const [loading, setLoading]         = useState(true)
  const [activeAgent, setActiveAgent] = useState(null)
  const [filterLayer, setFilterLayer] = useState('all')

  useEffect(() => {
    async function fetchAgents() {
      setLoading(true)
      const { data, error } = await supabase
        .from('dashboard_snapshots')
        .select('payload')
        .eq('widget', 'agents')
        .single()

      if (!error && data?.payload) {
        setAgents(Array.isArray(data.payload) ? data.payload : [])
      }
      setLoading(false)
    }
    fetchAgents()
  }, [])

  const filtered    = filterLayer === 'all' ? agents : agents.filter(a => a.layer === filterLayer)
  const active      = agents.filter(a => a.status === 'Active').length
  const inDev       = agents.filter(a => a.status === 'In Development').length
  const totalSkills = agents.reduce((s, a) => s + (a.skill_count || 0), 0)
  const layers      = ['all', ...new Set(agents.map(a => a.layer).filter(Boolean))]

  return (
    <PageShell title="Agent Registry" description="All BiZ SuperAgents — click Run to execute any agent" icon={Bot} color="orange">

      {/* Summary */}
      <div className="flex gap-6 mb-5 px-1 flex-wrap">
        <div>
          <div className="text-xs text-ink-3 font-medium">Total Agents</div>
          <div className="font-display text-3xl text-ink">{agents.length}</div>
        </div>
        <div>
          <div className="text-xs text-ink-3 font-medium">Active</div>
          <div className="font-display text-3xl text-emerald-600">{active}</div>
        </div>
        <div>
          <div className="text-xs text-ink-3 font-medium">In Development</div>
          <div className="font-display text-3xl text-amber-500">{inDev}</div>
        </div>
        <div>
          <div className="text-xs text-ink-3 font-medium">Total Skills</div>
          <div className="font-display text-3xl text-blue-600">{totalSkills}</div>
        </div>
      </div>

      {/* Layer filter tabs */}
      <div className="flex gap-2 mb-4 px-1 flex-wrap">
        {layers.map(layer => (
          <button
            key={layer}
            onClick={() => setFilterLayer(layer)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterLayer === layer
                ? 'bg-orange text-white'
                : 'bg-surface-2 text-ink-3 hover:bg-surface-3'
            }`}
          >
            {layer === 'all' ? `All (${agents.length})` : `${layer} (${agents.filter(a => a.layer === layer).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="text-orange animate-spin" />
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-2">
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide">Agent</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide hidden md:table-cell">Layer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide hidden lg:table-cell">Skills</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide hidden xl:table-cell">Role</th>
                <th className="px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide text-right">Action</th>
              </tr>

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
          .select('id, deal_name, amount, priority, updated_at, close_date, is_closed_won, is_closed_lost')
          .or('is_closed_won.is.null,is_closed_won.eq.false')
          .or('is_closed_lost.is.null,is_closed_lost.eq.false')
          .order('amount', { ascending: false }),
        supabase
          .from('dashboard_snapshots')
          .select('payload')
          .eq('widget', 'agents')
          .single(),
      ])
      if (dealsRes.error) throw dealsRes.error
      const deals = (dealsRes.data ?? []).map(d => ({
        ...d,
        name:     d.deal_name,
        stage:    d.priority ?? 'Unknown',
        age_days: d.updated_at ? differenceInDays(new Date(), parseISO(d.updated_at)) : 0,
      }))
      const totalPipeline = deals.reduce((s, d) => s + (Number(d.amount) || 0), 0)
      const staleDeals    = deals.filter(d => d.age_days > 14)
      const agents        = agentsRes.data?.payload ?? []
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
## Environment Variables

```
VITE_SUPABASE_URL=https://gjfwpwjbwgamtwtjqlbx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_CLAUDE_API_PROXY_URL=https://gjfwpwjbwgamtwtjqlbx.supabase.co/functions/v1/claude-proxy
```
