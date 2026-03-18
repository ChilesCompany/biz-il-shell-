import { Handshake, Clock, RefreshCw, ArrowUpRight } from 'lucide-react'
import { clsx } from 'clsx'
import { format, parseISO, differenceInDays } from 'date-fns'
import PageShell from '@/components/ui/PageShell'
import { PageLoader, ErrorCard } from '@/components/ui/Loaders'
import { useDeals } from '@/hooks/useDeals'

const STAGE_COLOR = {
  'Proposal Sent': 'bg-amber-50 text-amber-700',
  'Discovery':     'bg-blue-50 text-blue-700',
  'Negotiation':   'bg-orange/10 text-orange',
  'Qualified':     'bg-violet-50 text-violet-700',
  'Lead':          'bg-surface-3 text-ink-3',
}

function fmt(n) {
  if (!n) return '$0'
  const v = Number(n)
  if (v >= 1000) return '$' + (v/1000).toFixed(0) + 'K'
  return '$' + v.toLocaleString()
}

export default function DealsPage() {
  const { deals, loading, error, refetch } = useDeals()

  const total   = deals.reduce((s, d) => s + (Number(d.amount) || 0), 0)
  const avgDeal = deals.length ? Math.round(total / deals.length) : 0
  const stale   = deals.filter(d => d.age_days > 14).length

  return (
    <PageShell title="Deals" description="All open HubSpot deals with aging and close dates" icon={Handshake} color="blue">

      {loading && <PageLoader message="Loading deals..." />}
      {error   && <ErrorCard message={error} onRetry={refetch} />}

      {!loading && !error && (
        <div className="max-w-4xl">
          {/* Summary bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex gap-6">
              <div>
                <div className="text-xs text-ink-3 font-medium">Total Pipeline</div>
                <div className="font-display text-3xl text-orange">{fmt(total)}</div>
              </div>
              <div>
                <div className="text-xs text-ink-3 font-medium">Open Deals</div>
                <div className="font-display text-3xl text-ink">{deals.length}</div>
              </div>
              <div>
                <div className="text-xs text-ink-3 font-medium">Avg Deal Size</div>
                <div className="font-display text-3xl text-ink">{fmt(avgDeal)}</div>
              </div>
              {stale > 0 && (
                <div>
                  <div className="text-xs text-ink-3 font-medium">Stale (14d+)</div>
                  <div className="font-display text-3xl text-amber-500">{stale}</div>
                </div>
              )}
            </div>
            <button onClick={refetch} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-ink-2 hover:border-orange/40 hover:text-orange transition-all">
              <RefreshCw size={12} /> Refresh
            </button>
          </div>

          {/* Table */}
          <div className="card overflow-hidden p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide">Deal</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide">Stage</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide">Amount</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide hidden md:table-cell">Age</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide hidden md:table-cell">Close Date</th>
                </tr>
              </thead>
              <tbody>
                {deals.map(d => (
                  <tr key={d.id} className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-medium text-ink">{d.name}</td>
                    <td className="px-4 py-3">
                      <span className={clsx('stat-pill', STAGE_COLOR[d.stage] ?? 'bg-surface-3 text-ink-3')}>
                        {d.stage ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-ink">{fmt(d.amount)}</td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      <span className={clsx('flex items-center gap-1 justify-end text-xs', d.age_days > 14 ? 'text-red-500 font-semibold' : 'text-ink-3')}>
                        <Clock size={11} /> {d.age_days}d
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-ink-3 hidden md:table-cell">
                      {d.close_date ? format(parseISO(d.close_date), 'MMM d, yyyy') : '—'}
                    </td>
                  </tr>
                ))}
                {deals.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-sm text-ink-3">
                      No open deals. Run hubspot-notion-sync to populate.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageShell>
  )
}
