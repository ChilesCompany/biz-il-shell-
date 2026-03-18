import { useLocation } from 'react-router-dom'
import { Bell, Search, RefreshCw } from 'lucide-react'
import { format } from 'date-fns'

const PAGE_TITLES = {
  '/dashboard':  'Dashboard',
  '/briefing':   'Daily Briefing',
  '/pipeline':   'Pipeline',
  '/deals':      'Deals',
  '/proposals':  'Proposals',
  '/clients':    'Clients',
  '/meetings':   'Meetings',
  '/katana':     'Katana MRP',
  '/agents':     'Agent Registry',
  '/knowledge':  'Knowledge Base',
  '/settings':   'Settings',
}

export default function Topbar() {
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname] ?? 'BIZ IL'
  const today = format(new Date(), 'EEEE, MMMM d')

  return (
    <header className="flex items-center justify-between h-14 px-6 bg-surface border-b border-border flex-shrink-0">
      {/* Left: page title + date */}
      <div className="flex items-center gap-4">
        <h1 className="font-display text-2xl text-navy tracking-wider leading-none">{title}</h1>
        <span className="hidden sm:block text-xs text-ink-3 font-medium">{today}</span>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-lg hover:bg-surface-3 text-ink-3 hover:text-ink transition-colors">
          <Search size={16} />
        </button>
        <button className="p-2 rounded-lg hover:bg-surface-3 text-ink-3 hover:text-ink transition-colors">
          <RefreshCw size={16} />
        </button>
        <button className="relative p-2 rounded-lg hover:bg-surface-3 text-ink-3 hover:text-ink transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange" />
        </button>
        <div className="w-px h-5 bg-border mx-1" />
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-3 cursor-pointer transition-colors">
          <div className="w-6 h-6 rounded-full bg-orange flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">CC</span>
          </div>
          <span className="text-sm font-medium text-ink hidden sm:block">Chris</span>
        </div>
      </div>
    </header>
  )
}
