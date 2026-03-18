import PageShell from '@/components/ui/PageShell'
import { CalendarDays, Clock, User } from 'lucide-react'

const MEETINGS = [
  { title: 'SylvanSport Discovery Call',    time: 'Today 2:00 PM',    duration: '60 min', contact: 'SylvanSport',         status: 'upcoming', prep: true },
  { title: 'Internal Pipeline Review',      time: 'Today 4:30 PM',    duration: '30 min', contact: 'BMA Team',            status: 'upcoming', prep: false },
  { title: 'J L Smith SOW Review',          time: 'Tomorrow 10:00 AM',duration: '60 min', contact: 'J L Smith & Co',     status: 'scheduled', prep: false },
  { title: 'Campfire.ai Intro Call',        time: 'Mar 20 2:00 PM',   duration: '45 min', contact: 'John Glasgow',        status: 'scheduled', prep: false },
  { title: 'Reliant M&A Tech Stack Demo',   time: 'Mar 21 3:00 PM',   duration: '90 min', contact: 'Reliant M&A Advisors',status: 'scheduled', prep: false },
]

const STATUS_STYLE = {
  upcoming:  'bg-orange/10 text-orange',
  scheduled: 'bg-blue-50 text-blue-700',
  done:      'bg-surface-3 text-ink-4',
}

export default function MeetingsPage() {
  return (
    <PageShell
      title="Meetings"
      description="Upcoming meetings with one-click prep intelligence"
      icon={CalendarDays}
      color="blue"
    >
      <div className="space-y-3 max-w-3xl">
        {MEETINGS.map(({ title, time, duration, contact, status, prep }) => (
          <div key={title} className="card flex items-start gap-4 cursor-pointer hover:shadow-card-lg transition-shadow">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-ink text-sm">{title}</span>
                {prep && <span className="stat-pill bg-emerald-50 text-emerald-700 text-[10px]">Prep ready</span>}
              </div>
              <div className="flex items-center gap-3 text-xs text-ink-3 mt-1">
                <span className="flex items-center gap-1"><Clock size={11} /> {time}</span>
                <span className="text-border">·</span>
                <span>{duration}</span>
                <span className="text-border">·</span>
                <span className="flex items-center gap-1"><User size={11} /> {contact}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className={`stat-pill ${STATUS_STYLE[status]}`}>{status}</span>
              <button className="text-xs text-orange font-medium hover:underline">
                Prep →
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
