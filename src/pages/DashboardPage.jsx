import { TrendingUp, Users, DollarSign, CalendarDays, Bot, Zap, ArrowUpRight, Clock } from 'lucide-react'
import { clsx } from 'clsx'

const STATS = [
  { label: 'Open Pipeline',   value: '$165K', delta: '+$25K',  up: true,  icon: TrendingUp,  color: 'orange' },
  { label: 'Active Deals',    value: '6',     delta: '2 new',  up: true,  icon: DollarSign,  color: 'blue' },
  { label: 'Active Clients',  value: '4',     delta: 'stable', up: null,  icon: Users,       color: 'emerald' },
  { label: "Today's Meetings", value: '2',    delta: 'Next: 2pm', up: null, icon: CalendarDays, color: 'violet' },
]

const DEALS = [
  { name: 'Cathedral Holdings',            stage: 'Proposal Sent',   amount: '$25K', days: 12, rag: 'yellow' },
  { name: 'Carport Central Hollow Metal',  stage: 'Discovery',       amount: '$50K', days: 5,  rag: 'green' },
  { name: 'J L Smith Co',                  stage: 'Negotiation',     amount: '$40K', days: 21, rag: 'red' },
  { name: 'SylvanSport',                   stage: 'Proposal Sent',   amount: '$25K', days: 8,  rag: 'yellow' },
  { name: 'Attivo Group',                  stage: 'Qualified',       amount: '$15K', days: 3,  rag: 'green' },
  { name: 'Shredr.ai',                     stage: 'Discovery',       amount: '$10K', days: 6,  rag: 'green' },
]

const AGENTS = [
  { name: 'morning-briefing',   status: 'ok',      last: '7:00 AM' },
  { name: 'hubspot-notion-sync',status: 'ok',      last: '6:00 AM' },
  { name: 'pipeline-dashboard', status: 'ok',      last: 'On demand' },
  { name: 'katana-mrp',         status: 'idle',    last: 'Yesterday' },
  { name: 'email-summary',      status: 'ok',      last: '7:02 AM' },
  { name: 'pre-meeting-intel',  status: 'idle',    last: '2 days ago' },
]

const RAG = { green: 'dot-green', yellow: 'dot-yellow', red: 'dot-red' }
const COLOR_MAP = {
  orange:  'bg-orange/10 text-orange',
  blue:    'bg-blue-500/10 text-blue-600',
  emerald: 'bg-emerald-500/10 text-emerald-600',
  violet:  'bg-violet-500/10 text-violet-600',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, delta, up, icon: Icon, color }) => (
          <div key={label} className="card flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-ink-3 uppercase tracking-wide">{label}</span>
              <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center', COLOR_MAP[color])}>
                <Icon size={15} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="font-display text-3xl text-ink tracking-wide">{value}</span>
              <span className={clsx(
                'text-xs font-medium px-2 py-0.5 rounded-full',
                up === true  ? 'bg-emerald-50 text-emerald-600' :
                up === false ? 'bg-red-50 text-red-600' :
                               'bg-surface-3 text-ink-3'
              )}>
                {delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Pipeline deals */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-ink">Open Deals</h3>
            <a href="/pipeline" className="flex items-center gap-1 text-xs text-orange font-medium hover:underline">
              View pipeline <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="space-y-2">
            {DEALS.map(({ name, stage, amount, days, rag }) => (
              <div key={name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-2 transition-colors cursor-pointer">
                <div className={RAG[rag]} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink truncate">{name}</div>
                  <div className="text-xs text-ink-3">{stage}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-ink">{amount}</div>
                  <div className="text-xs text-ink-4 flex items-center gap-1 justify-end">
                    <Clock size={9} /> {days}d
                  </div>
                </div>
              </div>
            ))}
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
            <div className="space-y-2">
              {AGENTS.map(({ name, status, last }) => (
                <div key={name} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <div className={status === 'ok' ? 'dot-green' : 'dot-gray'} />
                    <span className="text-xs font-mono text-ink-2">{name}</span>
                  </div>
                  <span className="text-[10px] text-ink-4">{last}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="card">
            <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
              <Zap size={15} className="text-orange" /> Quick Actions
            </h3>
            <div className="space-y-1.5">
              {[
                'Run Morning Briefing',
                'Sync Pipeline to Notion',
                'Generate Proposals Report',
                'Check Katana MRP',
                'Email Summary',
              ].map((action) => (
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
