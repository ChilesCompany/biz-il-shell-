import { clsx } from 'clsx'

export default function PageShell({ title, description, icon: Icon, color = 'orange', children }) {
  const colors = {
    orange:  'bg-orange/10 text-orange border-orange/20',
    blue:    'bg-blue-500/10 text-blue-600 border-blue-200',
    emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    violet:  'bg-violet-500/10 text-violet-600 border-violet-200',
    amber:   'bg-amber-500/10 text-amber-600 border-amber-200',
    rose:    'bg-rose-500/10 text-rose-600 border-rose-200',
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={clsx('w-10 h-10 rounded-xl border flex items-center justify-center', colors[color])}>
              <Icon size={20} />
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            {description && <p className="text-sm text-ink-3 mt-0.5">{description}</p>}
          </div>
        </div>
      </div>

      {/* Content */}
      {children ? children : <StubContent />}
    </div>
  )
}

function StubContent() {
  return (
    <div className="card flex flex-col items-center justify-center py-20 text-center border-dashed">
      <div className="text-4xl mb-3">🚧</div>
      <div className="font-semibold text-ink-2">Under Construction</div>
      <div className="text-sm text-ink-3 mt-1 max-w-xs">
        This view is scaffolded and ready to be wired to live data.
      </div>
    </div>
  )
}
