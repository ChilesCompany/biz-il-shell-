import { NavLink, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import {
  LayoutDashboard, TrendingUp, Newspaper, Users, Handshake,
  FileText, CalendarDays, Factory, Bot, BookOpen, Settings, Zap
} from 'lucide-react'

const NAV = [
  {
    group: 'COMMAND',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/briefing',  icon: Newspaper,       label: 'Briefing' },
    ],
  },
  {
    group: 'SALES',
    items: [
      { to: '/pipeline',  icon: TrendingUp,  label: 'Pipeline' },
      { to: '/deals',     icon: Handshake,   label: 'Deals' },
      { to: '/proposals', icon: FileText,    label: 'Proposals' },
      { to: '/clients',   icon: Users,       label: 'Clients' },
    ],
  },
  {
    group: 'OPS',
    items: [
      { to: '/meetings', icon: CalendarDays, label: 'Meetings' },
      { to: '/katana',   icon: Factory,      label: 'Katana MRP' },
    ],
  },
  {
    group: 'PLATFORM',
    items: [
      { to: '/agents',    icon: Bot,      label: 'Agents' },
      { to: '/knowledge', icon: BookOpen, label: 'Knowledge' },
      { to: '/settings',  icon: Settings, label: 'Settings' },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside className="w-56 flex-shrink-0 flex flex-col bg-navy border-r border-navy-mid h-full">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-navy-mid/60">
        <div className="w-8 h-8 rounded-md bg-orange flex items-center justify-center shadow-orange flex-shrink-0">
          <Zap size={16} className="text-white" fill="white" />
        </div>
        <div>
          <div className="font-display text-xl text-white tracking-widest leading-none">BIZ IL</div>
          <div className="text-[10px] text-white/30 tracking-wider mt-0.5">by BMA</div>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {NAV.map(({ group, items }) => (
          <div key={group}>
            <div className="text-[9px] font-semibold tracking-[0.15em] text-white/20 px-3 mb-1.5">
              {group}
            </div>
            <div className="space-y-0.5">
              {items.map(({ to, icon: Icon, label }) => (
                <NavLink key={to} to={to} className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer',
                    isActive
                      ? 'bg-orange/15 text-orange'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  )
                }>
                  <Icon size={15} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-navy-mid/60">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
          <div className="w-7 h-7 rounded-full bg-orange/20 border border-orange/40 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-orange">CC</span>
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white/70 truncate">Chris Chiles</div>
            <div className="text-[10px] text-white/25 truncate">Managing Partner</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
