import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Spinner } from '@/components/ui/Loaders'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <Spinner size="lg" className="border-white/20 border-t-orange" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
