import PageShell from '@/components/ui/PageShell'
import { Users, ArrowUpRight } from 'lucide-react'

const CLIENTS = [
  {
    name: 'J L Smith & Co',
    subtitle: 'Musical instrument mfr/distributor · Charlotte, NC',
    health: 'yellow',
    tier: 'Transform',
    lastTouch: '3 days ago',
    nextAction: 'SOW review call',
  },
  {
    name: '$50M Plastic Film Extruder',
    subtitle: 'Plastics manufacturing · ERP eval in progress',
    health: 'green',
    lastTouch: 'Today',
    tier: 'Transform',
    nextAction: 'Acumatica demo prep',
  },
  {
    name: 'Cathedral Holdings',
    subtitle: 'Proposal sent · $25K opportunity',
    health: 'yellow',
    lastTouch: '12 days ago',
    tier: 'Operate',
    nextAction: 'Follow up on proposal',
  },
  {
    name: 'Reliant M&A Advisors',
    subtitle: 'Active prospect · Venture Partner Program',
    health: 'green',
    lastTouch: '1 day ago',
    tier: 'Essentials',
    nextAction: 'Tech stack demo scheduled',
  },
]

const HEALTH = {
  green:  { dot: 'dot-green',  label: 'Healthy',    badge: 'bg-emerald-50 text-emerald-700' },
  yellow: { dot: 'dot-yellow', label: 'Needs Attn', badge: 'bg-amber-50 text-amber-700' },
  red:    { dot: 'dot-red',    label: 'At Risk',     badge: 'bg-red-50 text-red-700' },
}

const TIER_COLOR = {
  Essentials: 'bg-ink-4/15 text-ink-3',
  Operate:    'bg-blue-50 text-blue-700',
  Transform:  'bg-orange/10 text-orange',
}

export default function ClientsPage() {
  return (
    <PageShell
      title="Clients"
      description="Active client relationships and health scores"
      icon={Users}
      color="emerald"
    >
      <div className="space-y-3 max-w-3xl">
        {CLIENTS.map(({ name, subtitle, health, tier, lastTouch, nextAction }) => {
          const h = HEALTH[health]
          return (
            <div key={name} className="card flex items-start gap-4 cursor-pointer hover:shadow-card-lg transition-shadow">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className={h.dot} />
                  <span className="font-semibold text-ink text-sm">{name}</span>
                  <span className={`stat-pill ${TIER_COLOR[tier]}`}>{tier}</span>
                </div>
                <div className="text-xs text-ink-3 mb-2">{subtitle}</div>
                <div className="flex items-center gap-4 text-xs text-ink-4">
                  <span>Last touch: <strong className="text-ink-3">{lastTouch}</strong></span>
                  <span className="text-border">|</span>
                  <span>Next: <strong className="text-ink-2">{nextAction}</strong></span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className={`stat-pill ${h.badge}`}>{h.label}</span>
                <button className="text-xs text-orange font-medium flex items-center gap-0.5 hover:underline">
                  View <ArrowUpRight size={11} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </PageShell>
  )
}
