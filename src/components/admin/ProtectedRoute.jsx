import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import Spinner from '../ui/Spinner'

// Wraps admin routes — redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Still checking
  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  // Not logged in
  if (!session) return <Navigate to="/admin/login" replace />

  return children
}

export default ProtectedRoute