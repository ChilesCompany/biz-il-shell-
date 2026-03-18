import { TrendingUp, Users, DollarSign, CalendarDays, Bot, Zap, ArrowUpRight, Clock, RefreshCw, AlertTriangle } from 'lucide-react'
import { clsx } from 'clsx'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { useDashboard } from '@/hooks/useDashboard'
import { PageLoader, ErrorCard, Spinner } from '@/components/ui/Loaders'

const RAG_DAYS = { green: 7, yellow: 14 }
function rag(days) {
  if (days <= RAG_DAYS.green)  return 'green'
  if (days <= RAG_DAYS.yellow) return 'yellow'
  return 'red'
}
function ragDot(days) {
  const r = rag(days)
  return r === 'green' ? 'dot-green' : r === 'yellow' ? 'dot-yellow' : 'dot-red'
}

function fmt(n) {
  if (!n) return '$0'
  const v = Number(n)
  if (v >= 1000000) return '$' + (v/1000000).toFixed(1) + 'M'
  if (v >= 1000)    return '$' + (v/1000).toFixed(0) + 'K'
  return '$' + v.toLocaleString()
}

const COLOR_MAP = {
  orange:  'bg-orange/10 text-orange',
  blue:    'bg-blue-500/10 text-blue-600',
  emerald: 'bg-emerald-500/10 text-emerald-600',
  violet:  'bg-violet-500/10 text-violet-600',
}

export default function DashboardPage() {
  const { data, loading, error, refetch } = useDashboard()

  if (loading) return <PageLoader message="Loading command center..." />
  if (error)   return <ErrorCard message={error} onRetry={refetch} />

  const { deals, totalPipeline, staleDeals, agents } = data

  const stats = [
    { label: 'Open Pipeline',    value: fmt(totalPipeline),  delta: deals.length + ' deals',   icon: TrendingUp,   color: 'orange' },
    { label: 'Active Deals',     value: deals.length,         delta: staleDeals.length + ' stale', icon: DollarSign, color: 'blue' },
    { label: 'Agents Active',    value: agents.filter(a => a.status === 'active' || a.status === 'ok').length || agents.length,
                                                               delta: agents.length + ' total',  icon: Bot,          color: 'emerald' },
    { label: 'Avg Deal Size',    value: fmt(deals.length ? totalPipeline / deals.length : 0),
                                                               delta: 'weighted avg',            icon: CalendarDays, color: 'violet' },
  ]

  const quickActions = [
    'Run Morning Briefing',
    'Sync Pipeline to Notion',
    'Generate Proposals Report',
    'Check Katana MRP',
    'Email Summary',
  ]

  return (
    <div className="space-y-6">

      {/* Refresh */}
      <div className="flex justify-end">
        <button onClick={refetch} className="flex items-center gap-1.5 text-xs text-ink-3 hover:text-orange transition-colors">
          <RefreshCw size={12} /> Refresh
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, delta, icon: Icon, color }) => (
          <div key={label} className="card flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-ink-3 uppercase tracking-wide">{label}</span>
              <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center', COLOR_MAP[color])}>
                <Icon size={15} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-display text-3xl text-ink tracking-wide">{value}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-surface-3 text-ink-3">{delta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Open deals */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-ink">Open Deals</h3>
            {staleDeals.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-full">
                <AlertTriangle size={11} /> {staleDeals.length} need attention
              </span>
            )}
            <a href="/pipeline" className="flex items-center gap-1 text-xs text-orange font-medium hover:underline ml-auto">
              View pipeline <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="space-y-1">
            {deals.slice(0, 8).map(d => (
              <div key={d.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-2 transition-colors cursor-pointer">
                <div className={ragDot(d.age_days)} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink truncate">{d.name}</div>
                  <div className="text-xs text-ink-3">{d.stage}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-ink">{fmt(d.amount)}</div>
                  <div className="text-xs text-ink-4 flex items-center gap-1 justify-end">
                    <Clock size={9} /> {d.age_days}d
                  </div>
                </div>
              </div>
            ))}
            {deals.length === 0 && (
              <div className="py-8 text-center text-sm text-ink-3">No open deals. Run hubspot-notion-sync to populate.</div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Agent status */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-ink flex items-center gap-2">
                <Bot size={15} className="text-orange" /> Agents
              </h3>
              <a href="/agents" className="text-xs text-orange font-medium hover:underline flex items-center gap-1">
                All <ArrowUpRight size={11} />
              </a>
            </div>
            {agents.length === 0 ? (
              <div className="space-y-2">
                {['morning-briefing','hubspot-notion-sync','pipeline-dashboard','email-summary','katana-mrp'].map(name => (
                  <div key={name} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <div className="dot-gray" />
                      <span className="text-xs font-mono text-ink-3">{name}</span>
                    </div>
                    <span className="text-[10px] text-ink-4">—</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {agents.slice(0, 6).map(a => (
                  <div key={a.name} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <div className={a.status === 'active' || a.status === 'ok' ? 'dot-green' : 'dot-gray'} />
                      <span className="text-xs font-mono text-ink-2">{a.name}</span>
                    </div>
                    <span className="text-[10px] text-ink-4">
                      {a.last_run ? formatDistanceToNow(parseISO(a.last_run), { addSuffix: true }) : '—'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="card">
            <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
              <Zap size={15} className="text-orange" /> Quick Actions
            </h3>
            <div className="space-y-1.5">
              {quickActions.map(action => (
                <button key={action} className="w-full text-left text-xs px-3 py-2 rounded-lg border border-border hover:border-orange/40 hover:bg-orange/5 text-ink-2 hover:text-orange font-medium transition-all duration-150">
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
