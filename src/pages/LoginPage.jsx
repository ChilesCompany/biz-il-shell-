import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const { signIn }          = useAuth()
  const navigate            = useNavigate()
  const [email, setEmail]   = useState('')
  const [pass, setPass]     = useState('')
  const [show, setShow]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, pass)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      {/* Background texture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-orange/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange/5 blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange shadow-orange mb-4">
            <Zap size={24} className="text-white" fill="white" />
          </div>
          <div className="font-display text-4xl text-white tracking-widest">BIZ IL</div>
          <div className="text-sm text-white/30 mt-1 tracking-wider">Business Intelligence Layer</div>
          <div className="text-xs text-white/20 mt-1">by Biltmore Management Advisors</div>
        </div>

        {/* Card */}
        <div className="bg-navy-mid border border-white/10 rounded-2xl p-6 shadow-card-lg">
          <h2 className="font-semibold text-white mb-1">Welcome back</h2>
          <p className="text-sm text-white/40 mb-6">Sign in to your BIZ IL workspace</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5 mb-4">
              <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
              <span className="text-xs text-red-400">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="chris@biltmorema.com"
                required
                className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2.5 pr-10 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-orange hover:bg-orange-dark text-white font-semibold text-sm rounded-lg shadow-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          BIZ IL · Biltmore Management Advisors · biltmorema.com
        </p>
      </div>
    </div>
  )
}
