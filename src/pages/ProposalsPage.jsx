import PageShell from '@/components/ui/PageShell'
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const PROPOSALS = [
  { name: 'Cathedral Holdings',  sent: '12 days ago', amount: '$25K', status: 'pending',  stage: 'Awaiting Decision' },
  { name: 'SylvanSport',         sent: '8 days ago',  amount: '$25K', status: 'pending',  stage: 'Under Review' },
  { name: 'J L Smith Co',        sent: '2 days ago',  amount: '$60K', status: 'review',   stage: 'SOW Feedback' },
  { name: 'Reliant M&A Advisors',sent: '1 day ago',   amount: '$15K', status: 'new',      stage: 'Just Sent' },
]

const STATUS = {
  new:     { icon: FileText,     color: 'text-blue-500',    badge: 'bg-blue-50 text-blue-700',    label: 'Sent' },
  pending: { icon: Clock,        color: 'text-amber-500',   badge: 'bg-amber-50 text-amber-700',  label: 'Pending' },
  review:  { icon: AlertCircle,  color: 'text-orange',      badge: 'bg-orange/10 text-orange',    label: 'Needs Attn' },
  won:     { icon: CheckCircle,  color: 'text-emerald-500', badge: 'bg-emerald-50 text-emerald-700', label: 'Won' },
}

export default function ProposalsPage() {
  return (
    <PageShell
      title="Proposals"
      description="Sent proposals with aging scores and recommended next actions"
      icon={FileText}
      color="violet"
    >
      <div className="space-y-3 max-w-3xl">
        {PROPOSALS.map(({ name, sent, amount, status, stage }) => {
          const s = STATUS[status]
          const Icon = s.icon
          return (
            <div key={name} className="card flex items-center gap-4 cursor-pointer hover:shadow-card-lg transition-shadow">
              <div className={`w-9 h-9 rounded-xl bg-surface-3 flex items-center justify-center flex-shrink-0 ${s.color}`}>
                <Icon size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-ink text-sm">{name}</div>
                <div className="text-xs text-ink-3 mt-0.5">{stage} · Sent {sent}</div>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <div className="font-semibold text-ink text-sm">{amount}</div>
                <span className={`stat-pill ${s.badge}`}>{s.label}</span>
              </div>
            </div>
          )
        })}

        <div className="pt-2 text-center">
          <button className="text-sm font-semibold text-orange hover:underline">
            + Draft New Proposal
          </button>
        </div>
      </div>
    </PageShell>
  )
}
