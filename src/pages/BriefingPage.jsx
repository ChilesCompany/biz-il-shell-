import PageShell from '@/components/ui/PageShell'
import { Newspaper, Sun, TrendingUp, Mail, CalendarDays, Bot } from 'lucide-react'
import { format } from 'date-fns'

const SECTIONS = [
  {
    icon: Sun, color: 'amber', label: 'Good Morning',
    content: 'Today is ' + format(new Date(), 'EEEE, MMMM d, yyyy') + '. You have 2 meetings and 6 open deals totaling $165K.',
  },
  {
    icon: CalendarDays, color: 'blue', label: 'Calendar',
    content: '2:00 PM — SylvanSport discovery call\n4:30 PM — Internal pipeline review',
  },
  {
    icon: Mail, color: 'violet', label: 'Email Summary',
    content: '12 unread across biltmorema.com + chilesand.co. 3 flagged: Cathedral Holdings follow-up, J L Smith SOW feedback, Campfire.ai intro.',
  },
  {
    icon: TrendingUp, color: 'orange', label: 'Pipeline Health',
    content: '$165K open pipeline across 6 deals. J L Smith (21 days in Negotiation) needs attention. Cathedral Holdings proposal aging at 12 days.',
  },
  {
    icon: Bot, color: 'emerald', label: 'Agent Status',
    content: 'All 5 scheduled agents ran successfully this morning. Katana sync last ran yesterday — consider refreshing before the SylvanSport call.',
  },
]

const COLOR_MAP = {
  amber:  'bg-amber-50 text-amber-600 border-amber-200',
  blue:   'bg-blue-50 text-blue-600 border-blue-200',
  violet: 'bg-violet-50 text-violet-600 border-violet-200',
  orange: 'bg-orange/8 text-orange border-orange/20',
  emerald:'bg-emerald-50 text-emerald-600 border-emerald-200',
}

export default function BriefingPage() {
  return (
    <PageShell
      title="Daily Briefing"
      description="Your morning operational digest — auto-generated at 7:00 AM ET"
      icon={Newspaper}
      color="amber"
    >
      <div className="space-y-4 max-w-3xl">
        {SECTIONS.map(({ icon: Icon, color, label, content }) => (
          <div key={label} className="card flex gap-4">
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 mt-0.5 ${COLOR_MAP[color]}`}>
              <Icon size={17} />
            </div>
            <div>
              <div className="font-semibold text-ink text-sm mb-1">{label}</div>
              <p className="text-sm text-ink-2 leading-relaxed whitespace-pre-line">{content}</p>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-ink-4">Last generated: Today at 7:00 AM ET</span>
          <button className="text-xs font-semibold text-orange hover:underline">
            Regenerate Briefing →
          </button>
        </div>
      </div>
    </PageShell>
  )
}
