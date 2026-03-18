import PageShell from '@/components/ui/PageShell'
import { TrendingUp } from 'lucide-react'

const STAGES = [
  { label: 'Lead',          deals: 2, value: '$25K',  color: 'bg-ink-4' },
  { label: 'Qualified',     deals: 1, value: '$15K',  color: 'bg-blue-400' },
  { label: 'Discovery',     deals: 2, value: '$60K',  color: 'bg-violet-400' },
  { label: 'Proposal Sent', deals: 2, value: '$50K',  color: 'bg-amber-400' },
  { label: 'Negotiation',   deals: 1, value: '$40K',  color: 'bg-orange' },
  { label: 'Closed Won',    deals: 0, value: '$0',    color: 'bg-emerald-500' },
]

const DEALS = [
  { name: 'Cathedral Holdings',           stage: 'Proposal Sent', amount: 25000 },
  { name: 'Carport Central Hollow Metal', stage: 'Discovery',     amount: 50000 },
  { name: 'J L Smith Co',                stage: 'Negotiation',   amount: 40000 },
  { name: 'SylvanSport',                 stage: 'Proposal Sent', amount: 25000 },
  { name: 'Attivo Group',                stage: 'Qualified',     amount: 15000 },
  { name: 'Shredr.ai',                   stage: 'Discovery',     amount: 10000 },
]

export default function PipelinePage() {
  return (
    <PageShell
      title="Pipeline"
      description="Live HubSpot deal board — all open opportunities"
      icon={TrendingUp}
      color="orange"
    >
      {/* Stage summary bar */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {STAGES.map(({ label, deals, value, color }) => (
          <div key={label} className="card p-3 flex flex-col gap-1">
            <div className={`h-1 w-full rounded-full ${color} mb-1`} />
            <div className="text-[10px] text-ink-3 font-semibold uppercase tracking-wide">{label}</div>
            <div className="font-display text-xl text-ink">{value}</div>
            <div className="text-xs text-ink-4">{deals} deal{deals !== 1 ? 's' : ''}</div>
          </div>
        ))}
      </div>

      {/* Kanban columns */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {STAGES.map(({ label, color }) => {
          const stageDeals = DEALS.filter(d => d.stage === label)
          return (
            <div key={label} className="flex-shrink-0 w-56">
              <div className="flex items-center gap-2 mb-2 px-1">
                <div className={`h-2 w-2 rounded-full ${color}`} />
                <span className="text-xs font-semibold text-ink-2 uppercase tracking-wide">{label}</span>
                <span className="ml-auto text-[10px] text-ink-4 bg-surface-3 px-1.5 py-0.5 rounded-full">
                  {stageDeals.length}
                </span>
              </div>
              <div className="space-y-2">
                {stageDeals.map(({ name, amount }) => (
                  <div key={name} className="card p-3 cursor-pointer hover:shadow-card-lg hover:-translate-y-0.5 transition-all duration-150">
                    <div className="text-sm font-medium text-ink leading-tight">{name}</div>
                    <div className="text-xs text-orange font-semibold mt-1.5">
                      ${amount.toLocaleString()}
                    </div>
                  </div>
                ))}
                {stageDeals.length === 0 && (
                  <div className="h-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                    <span className="text-xs text-ink-4">Empty</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </PageShell>
  )
}
