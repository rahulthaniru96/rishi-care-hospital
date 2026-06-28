import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        navigate('/admin/dashboard', { replace: true })
      }
    }
    checkSession()
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.error(error)
      setError(error.message)
      setLoading(false)
      return
    } else {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-healthcare-50 to-slate-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-healthcare-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-healthcare-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="card card-lg">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-healthcare-900 to-healthcare-700 rounded-2xl flex items-center justify-center !text-black font-bold text-2xl mx-auto mb-4 shadow-lg">
              R
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome Back</h1>
            <p className="text-slate-600 text-sm">Rishi Care Hospital Admin</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-emergency/10 border border-emergency/20 rounded-lg flex gap-3">
              <svg className="w-5 h-5 text-emergency flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-emergency font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@rishicare.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-healthcare-900 focus:ring-1 focus:ring-healthcare-900 transition-colors"
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-healthcare-900 focus:ring-1 focus:ring-healthcare-900 transition-colors"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-healthcare-900 !text-black font-semibold rounded-lg hover:bg-healthcare-800 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500 mt-6 pt-6 border-t border-slate-200">
            Rishi Care Hospital © {new Date().getFullYear()} | Admin Portal
          </p>

          {/* Demo Credentials Hint (for development) */}
          <div className="mt-6 p-3 bg-healthcare-50 border border-healthcare-200 rounded-lg text-xs text-slate-600 text-center">
            <p className="text-slate-700 font-medium mb-1">Secure Login</p>
            <p>Use your authorized credentials to access the admin panel.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login