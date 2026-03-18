import PageShell from '@/components/ui/PageShell'
import { Factory, Package, ShoppingCart, Truck, AlertTriangle } from 'lucide-react'

const KPI = [
  { label: 'Open MOs',         value: '—', icon: Factory,      note: 'Sync to refresh' },
  { label: 'Low Stock Items',  value: '—', icon: AlertTriangle,note: 'Sync to refresh' },
  { label: 'Open Sales Orders',value: '—', icon: ShoppingCart, note: 'Sync to refresh' },
  { label: 'Open POs',         value: '—', icon: Truck,        note: 'Sync to refresh' },
]

export default function KatanaPage() {
  return (
    <PageShell
      title="Katana MRP"
      description="Manufacturing orders, inventory, and production schedule"
      icon={Factory}
      color="emerald"
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {KPI.map(({ label, value, icon: Icon, note }) => (
          <div key={label} className="card flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink-3 font-medium uppercase tracking-wide">{label}</span>
              <Icon size={14} className="text-ink-4" />
            </div>
            <div className="font-display text-3xl text-ink-4">{value}</div>
            <div className="text-[10px] text-ink-4">{note}</div>
          </div>
        ))}
      </div>

      {/* Sync prompt */}
      <div className="card border-dashed flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
        <Factory size={32} className="text-ink-4 mb-3" />
        <div className="font-semibold text-ink-2 mb-1">Katana data not loaded</div>
        <p className="text-sm text-ink-3 mb-4">
          Run the Katana sync to pull live manufacturing orders,<br />inventory levels, and purchase orders.
        </p>
        <button className="px-4 py-2 bg-orange text-white text-sm font-semibold rounded-lg hover:bg-orange-dark transition-colors shadow-orange">
          Run Katana Sync
        </button>
      </div>
    </PageShell>
  )
}
