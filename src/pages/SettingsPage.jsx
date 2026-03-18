import PageShell from '@/components/ui/PageShell'
import { Settings, CheckCircle, XCircle } from 'lucide-react'

const INTEGRATIONS = [
  { name: 'HubSpot',         status: 'connected', detail: 'Hub ID 8890447 · Gold Partner' },
  { name: 'Notion',          status: 'connected', detail: 'Workspace: BIZ IL Home' },
  { name: 'Supabase',        status: 'connected', detail: 'Project: gjfwpwjbwgamtwtjqlbx' },
  { name: 'Katana MRP',      status: 'connected', detail: 'Edge function: katana-proxy' },
  { name: 'Outlook / MS365', status: 'connected', detail: 'chris@biltmorema.com' },
  { name: 'Gmail',           status: 'connected', detail: 'chris@chilesand.co' },
  { name: 'Google Calendar', status: 'connected', detail: 'Primary calendar' },
  { name: 'QuickBooks Online',status: 'pending',  detail: 'QBO sync edge function not yet built' },
  { name: 'Shopify',         status: 'pending',   detail: 'shopify-proxy — evaluation in progress' },
]

const SETTINGS_SECTIONS = [
  {
    title: 'Briefing Schedule',
    items: [
      { label: 'Weekday briefing time', value: '7:00 AM ET' },
      { label: 'Briefing recipients',  value: 'chris@biltmorema.com' },
    ],
  },
  {
    title: 'Sync Preferences',
    items: [
      { label: 'HubSpot → Notion sync',  value: 'Daily 6:00 AM ET' },
      { label: 'Sync open deals only',    value: 'Yes' },
      { label: 'Closed Won/Lost sync',    value: 'Disabled' },
    ],
  },
]

export default function SettingsPage() {
  return (
    <PageShell
      title="Settings"
      description="Integrations, schedules, and platform configuration"
      icon={Settings}
      color="orange"
    >
      <div className="max-w-2xl space-y-6">

        {/* Integrations */}
        <div>
          <h3 className="font-semibold text-ink mb-3">Integrations</h3>
          <div className="card p-0 overflow-hidden">
            {INTEGRATIONS.map(({ name, status, detail }, i) => (
              <div key={name} className={`flex items-center gap-3 px-4 py-3 ${i < INTEGRATIONS.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-ink">{name}</div>
                  <div className="text-xs text-ink-3 mt-0.5">{detail}</div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {status === 'connected'
                    ? <><CheckCircle size={14} className="text-emerald-500" /><span className="text-xs text-emerald-600 font-medium">Connected</span></>
                    : <><XCircle size={14} className="text-ink-4" /><span className="text-xs text-ink-4 font-medium">Pending</span></>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings sections */}
        {SETTINGS_SECTIONS.map(({ title, items }) => (
          <div key={title}>
            <h3 className="font-semibold text-ink mb-3">{title}</h3>
            <div className="card p-0 overflow-hidden">
              {items.map(({ label, value }, i) => (
                <div key={label} className={`flex items-center justify-between px-4 py-3 ${i < items.length - 1 ? 'border-b border-border' : ''}`}>
                  <span className="text-sm text-ink-2">{label}</span>
                  <span className="text-sm font-medium text-ink">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
