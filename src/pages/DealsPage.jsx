import PageShell from '@/components/ui/PageShell'
import { Handshake, Clock } from 'lucide-react'

const DEALS = [
  { name: 'Cathedral Holdings',           amount: 25000, stage: 'Proposal Sent', owner: 'CC', days: 12, close: 'Apr 15' },
  { name: 'Carport Central Hollow Metal', amount: 50000, stage: 'Discovery',     owner: 'CC', days: 5,  close: 'May 1' },
  { name: 'J L Smith Co',                 amount: 40000, stage: 'Negotiation',   owner: 'CC', days: 21, close: 'Apr 30' },
  { name: 'SylvanSport',                  amount: 25000, stage: 'Proposal Sent', owner: 'CC', days: 8,  close: 'Apr 20' },
  { name: 'Attivo Group',                 amount: 15000, stage: 'Qualified',     owner: 'CC', days: 3,  close: 'May 15' },
  { name: 'Shredr.ai',                    amount: 10000, stage: 'Discovery',     owner: 'CC', days: 6,  close: 'May 10' },
]

const STAGE_COLOR = {
  'Proposal Sent': 'bg-amber-50 text-amber-700',
  'Discovery':     'bg-blue-50 text-blue-700',
  'Negotiation':   'bg-orange/10 text-orange',
  'Qualified':     'bg-violet-50 text-violet-700',
}

export default function DealsPage() {
  const total = DEALS.reduce((s, d) => s + d.amount, 0)

  return (
    <PageShell
      title="Deals"
      description="All open HubSpot deals with aging and close dates"
      icon={Handshake}
      color="blue"
    >
      <div className="max-w-4xl">
        {/* Summary bar */}
        <div className="flex gap-6 mb-5 px-1">
          <div>
            <div className="text-xs text-ink-3 font-medium">Total Pipeline</div>
            <div className="font-display text-3xl text-orange">${total.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-ink-3 font-medium">Open Deals</div>
            <div className="font-display text-3xl text-ink">{DEALS.length}</div>
          </div>
          <div>
            <div className="text-xs text-ink-3 font-medium">Avg Deal Size</div>
            <div className="font-display text-3xl text-ink">${Math.round(total / DEALS.length).toLocaleString()}</div>
          </div>
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
                <th className="text-right px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide hidden md:table-cell">Close</th>
              </tr>
            </thead>
            <tbody>
              {DEALS.map(({ name, amount, stage, days, close }, i) => (
                <tr key={name} className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-medium text-ink">{name}</td>
                  <td className="px-4 py-3">
                    <span className={`stat-pill ${STAGE_COLOR[stage] ?? 'bg-surface-3 text-ink-3'}`}>{stage}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-ink">${amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right hidden md:table-cell">
                    <span className={`flex items-center gap-1 justify-end text-xs ${days > 14 ? 'text-red-500 font-semibold' : 'text-ink-3'}`}>
                      <Clock size={11} /> {days}d
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-ink-3 hidden md:table-cell">{close}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  )
}
