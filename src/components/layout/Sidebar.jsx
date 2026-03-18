import { NavLink, useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'
import {
  LayoutDashboard, TrendingUp, Newspaper, Users, Handshake,
  FileText, CalendarDays, Factory, Bot, BookOpen, Settings,
  Zap, LogOut
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

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
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'CC'

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col bg-navy border-r border-navy-mid h-full">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-white/10">
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
                      ? 'text-orange'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  )
                }
                style={({ isActive }) => isActive ? { backgroundColor: 'rgba(224,92,42,0.12)' } : {}}>
                  <Icon size={15} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg">
          <div className="w-7 h-7 rounded-full bg-orange/20 border border-orange/40 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-orange">{initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-white/70 truncate">
              {user?.email ?? 'Chris Chiles'}
            </div>
            <div className="text-[10px] text-white/25">Managing Partner</div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all text-xs font-medium"
        >
          <LogOut size={13} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
