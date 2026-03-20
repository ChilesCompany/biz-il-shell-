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
            </thead>
            <tbody>
              {filtered.map(agent => {
                const statusInfo = STATUS_DISPLAY[agent.status] || STATUS_DISPLAY['Active']
                const layerInfo  = LAYER_LABELS[agent.layer]    || LAYER_LABELS['Agent']
                const StatusIcon = statusInfo.icon
                return (
                  <tr key={agent.name} className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-semibold text-xs text-ink">{agent.name}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`stat-pill ${layerInfo.color}`}>
                        {agent.layer || 'Agent'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <StatusIcon size={13} className={statusInfo.color} />
                        <span className={`text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs text-ink-3">
                        {agent.skill_count || 0} skill{(agent.skill_count || 0) !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <span className="text-xs text-ink-3 line-clamp-1 max-w-xs">{agent.role}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {agent.status === 'Active' && agent.skill_count > 0 ? (
                        <button
                          onClick={() => setActiveAgent(agent)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange/10 text-orange hover:bg-orange hover:text-white text-xs font-semibold transition-all duration-150 ml-auto"
                        >
                          <Play size={11} /> Run
                        </button>
                      ) : (
                        <span className="text-[10px] text-ink-4 italic">In Dev</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeAgent && (
        <AgentRunModal agent={activeAgent} onClose={() => setActiveAgent(null)} />
      )}
    </PageShell>
  )
}
