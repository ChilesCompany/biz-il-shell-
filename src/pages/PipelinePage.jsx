import { TrendingUp, RefreshCw, Clock } from 'lucide-react'
import { format } from 'date-fns'
import PageShell from '@/components/ui/PageShell'
import { PageLoader, ErrorCard } from '@/components/ui/Loaders'
import { usePipeline } from '@/hooks/usePipeline'

const STAGES = [
  { label: 'Lead',           color: 'bg-ink-4' },
  { label: 'Qualified',      color: 'bg-blue-400' },
  { label: 'Discovery',      color: 'bg-violet-400' },
  { label: 'Proposal Sent',  color: 'bg-amber-400' },
  { label: 'Negotiation',    color: 'bg-orange' },
  { label: 'Closed Won',     color: 'bg-emerald-500' },
]

function normalizeStage(stage) {
  if (!stage) return 'Lead'
  const s = stage.toLowerCase()
  if (s.includes('qualify') || s.includes('qualified'))     return 'Qualified'
  if (s.includes('discover') || s.includes('connect'))     return 'Discovery'
  if (s.includes('proposal') || s.includes('present'))     return 'Proposal Sent'
  if (s.includes('negotiat') || s.includes('decision'))    return 'Negotiation'
  if (s.includes('closed won') || s.includes('closedwon')) return 'Closed Won'
  return 'Lead'
}

function fmt(amount) {
  if (!amount) return '$0'
  const n = Number(amount)
  if (n >= 1000) return '$' + (n / 1000).toFixed(0) + 'K'
  return '$' + n.toLocaleString()
}

export default function PipelinePage() {
  const { deals, loading, error, lastSync, refetch } = usePipeline()
  const normalized = deals.map(d => ({ ...d, _stage: normalizeStage(d.stage) }))
  const stageStats = STAGES.map(s => {
    const stageDeals = normalized.filter(d => d._stage === s.label)
    const value = stageDeals.reduce((sum, d) => sum + (Number(d.amount) || 0), 0)
    return { ...s, deals: stageDeals, count: stageDeals.length, value }
  })
  const totalPipeline = deals.reduce((s, d) => s + (Number(d.amount) || 0), 0)

  return (
    <PageShell title="Pipeline" description="Live HubSpot deal board" icon={TrendingUp} color="orange">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-xs text-ink-3 font-medium">Total Pipeline</div>
            <div className="font-display text-3xl text-orange">{fmt(totalPipeline)}</div>
          </div>
          <div>
            <div className="text-xs text-ink-3 font-medium">Open Deals</div>
            <div className="font-display text-3xl text-ink">{deals.length}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {lastSync && (
            <span className="text-xs text-ink-4 flex items-center gap-1">
              <Clock size={11} /> {format(lastSync, 'h:mm a')}
            </span>
          )}
          <button onClick={refetch} disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-ink-2 hover:border-orange/40 hover:text-orange transition-all disabled:opacity-40">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {loading && <PageLoader message="Loading pipeline from HubSpot..." />}
      {error   && <ErrorCard message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
            {stageStats.map(({ label, color, count, value }) => (
              <div key={label} className="card p-3">
                <div className={'h-1 w-full rounded-full mb-2 ' + color} />
                <div className="text-[10px] text-ink-3 font-semibold uppercase tracking-wide leading-tight">{label}</div>
                <div className="font-display text-xl text-ink mt-1">{fmt(value)}</div>
                <div className="text-xs text-ink-4">{count} deal{count !== 1 ? 's' : ''}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3">
            {stageStats.map(({ label, color, deals: stageDeals }) => (
              <div key={label} className="flex-shrink-0 w-56">
                <div className="flex items-center gap-2 mb-2 px-1">
                  <div className={'h-2 w-2 rounded-full ' + color} />
                  <span className="text-xs font-semibold text-ink-2 uppercase tracking-wide truncate">{label}</span>
                  <span className="ml-auto text-[10px] text-ink-4 bg-surface-3 px-1.5 py-0.5 rounded-full">{stageDeals.length}</span>
                </div>
                <div className="space-y-2">
                  {stageDeals.map(d => (
                    <div key={d.id} className="card p-3 cursor-pointer hover:shadow-card-lg hover:-translate-y-0.5 transition-all duration-150">
                      <div className="text-sm font-medium text-ink leading-tight">{d.name}</div>
                      {d.amount > 0 && <div className="text-xs text-orange font-semibold mt-1.5">{fmt(d.amount)}</div>}
                      {d.close_date && <div className="text-[10px] text-ink-4 mt-1">Close: {format(new Date(d.close_date), 'MMM d')}</div>}
                    </div>
                  ))}
                  {stageDeals.length === 0 && (
                    <div className="h-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                      <span className="text-xs text-ink-4">Empty</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {deals.length === 0 && (
            <div className="card border-dashed text-center py-16 mt-4">
              <div className="text-3xl mb-2">📭</div>
              <div className="font-semibold text-ink-2">No open deals found</div>
              <div className="text-sm text-ink-3 mt-1">
                Run <code className="font-mono text-xs bg-surface-3 px-1.5 py-0.5 rounded">/hubspot-notion-sync</code> in Commander BIZ to populate deals.
              </div>
            </div>
          )}
        </>
      )}
    </PageShell>
  )
}
