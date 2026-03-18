export function Spinner({ size = 'md', className = '' }) {
  const s = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' }[size]
  return (
    <div className={`${s} ${className} rounded-full border-2 border-border border-t-orange animate-spin`} />
  )
}

export function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <Spinner size="lg" />
      <span className="text-sm text-ink-3">{message}</span>
    </div>
  )
}

export function ErrorCard({ message, onRetry }) {
  return (
    <div className="card border-red-100 bg-red-50 flex flex-col items-center py-10 text-center max-w-md mx-auto">
      <div className="text-2xl mb-2">⚠️</div>
      <div className="font-semibold text-red-700 mb-1">Failed to load data</div>
      <div className="text-sm text-red-500 mb-4 font-mono">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  )
}
