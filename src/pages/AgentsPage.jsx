import PageShell from '@/components/ui/PageShell'
import { Bot, Play, Clock, CheckCircle, Circle } from 'lucide-react'

const AGENTS = [
  { name: 'morning-briefing',       category: 'Chief of Staff', status: 'ok',    last: 'Today 7:00 AM',   schedule: 'Weekdays 7AM ET' },
  { name: 'hubspot-notion-sync',    category: 'Revenue Ops',   status: 'ok',    last: 'Today 6:00 AM',   schedule: 'Daily 6AM ET' },
  { name: 'pipeline-dashboard',     category: 'VP Sales',      status: 'ok',    last: 'On demand',       schedule: 'Manual' },
  { name: 'email-summary',          category: 'Chief of Staff', status: 'ok',    last: 'Today 7:02 AM',   schedule: 'Weekdays 7AM ET' },
  { name: 'pre-meeting-intel',      category: 'VP Sales',      status: 'idle',  last: '2 days ago',      schedule: 'Manual' },
  { name: 'katana-mrp',             category: 'Plant Manager', status: 'idle',  last: 'Yesterday',       schedule: 'Manual' },
  { name: 'enrich',                 category: 'VP Sales',      status: 'idle',  last: '3 days ago',      schedule: 'Manual' },
  { name: 'sow-drafter',            category: 'Revenue Ops',   status: 'idle',  last: 'Last week',       schedule: 'Manual' },
  { name: 'meeting-debrief',        category: 'Chief of Staff', status: 'idle',  last: '4 days ago',      schedule: 'Manual' },
  { name: 'daily-briefing',         category: 'Chief of Staff', status: 'ok',    last: 'Today 7:00 AM',   schedule: 'Weekdays 7AM ET' },
]

const CATEGORY_COLOR = {
  'Chief of Staff': 'bg-violet-50 text-violet-700',
  'VP Sales':       'bg-orange/10 text-orange',
  'Revenue Ops':    'bg-blue-50 text-blue-700',
  'Plant Manager':  'bg-emerald-50 text-emerald-700',
}

export default function AgentsPage() {
  const ok   = AGENTS.filter(a => a.status === 'ok').length
  const idle = AGENTS.filter(a => a.status === 'idle').length

  return (
    <PageShell
      title="Agent Registry"
      description="All BIZ IL skills and their live status"
      icon={Bot}
      color="orange"
    >
      {/* Summary */}
      <div className="flex gap-6 mb-5 px-1">
        <div>
          <div className="text-xs text-ink-3 font-medium">Total Agents</div>
          <div className="font-display text-3xl text-ink">{AGENTS.length}</div>
        </div>
        <div>
          <div className="text-xs text-ink-3 font-medium">Active</div>
          <div className="font-display text-3xl text-emerald-600">{ok}</div>
        </div>
        <div>
          <div className="text-xs text-ink-3 font-medium">Idle</div>
          <div className="font-display text-3xl text-ink-4">{idle}</div>
        </div>
      </div>

      {/* Agent table */}
      <div className="card overflow-hidden p-0 max-w-4xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2">
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide">Agent</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide hidden md:table-cell">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide hidden lg:table-cell">Last Run</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink-3 uppercase tracking-wide hidden lg:table-cell">Schedule</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {AGENTS.map(({ name, category, status, last, schedule }) => (
              <tr key={name} className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
                <td className="px-4 py-3">
                  <span className="font-mono text-xs font-medium text-ink-2">{name}</span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`stat-pill ${CATEGORY_COLOR[category] ?? 'bg-surface-3 text-ink-3'}`}>{category}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {status === 'ok'
                      ? <CheckCircle size={13} className="text-emerald-500" />
                      : <Circle size={13} className="text-ink-4" />
                    }
                    <span className={`text-xs font-medium ${status === 'ok' ? 'text-emerald-600' : 'text-ink-4'}`}>
                      {status === 'ok' ? 'Active' : 'Idle'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-xs text-ink-3 flex items-center gap-1"><Clock size={11} /> {last}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-xs text-ink-3">{schedule}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-orange/10 text-ink-4 hover:text-orange transition-colors">
                    <Play size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  )
}
