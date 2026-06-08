import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import Sidebar from '../../components/admin/Sidebar'
import StatCard from '../../components/admin/StatCard'
import Spinner from '../../components/ui/Spinner'

const Dashboard = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({ patients: 0, medicines: 0, bills: 0, lowStock: 0, nearExpiry: 0 })
  const [recentPatients, setRecentPatients] = useState([])
  const [recentBills, setRecentBills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Run all queries in parallel
      const [
        { count: patientCount },
        { count: medicineCount },
        { count: billCount },
        { data: medicines },
        { data: patients },
        { data: bills },
      ] = await Promise.all([
        supabase.from('patients').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('medicines').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('bills').select('*', { count: 'exact', head: true }),
        supabase.from('medicines').select('quantity, minimum_stock, expiry_date').eq('is_active', true),
        supabase.from('patients').select('id, name, phone, doctor_name, created_at').eq('is_active', true).order('created_at', { ascending: false }).limit(5),
        supabase.from('bills').select('id, bill_number, grand_total, created_at, patients(name)').order('created_at', { ascending: false }).limit(5),
      ])

      // Low stock count
      const lowStock = medicines?.filter(m => m.quantity < m.minimum_stock).length || 0

      // Near expiry count (within 30 days)
      const today = new Date()
      const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
      const nearExpiry = medicines?.filter(m => {
        if (!m.expiry_date) return false
        const exp = new Date(m.expiry_date)
        return exp <= in30Days && exp >= today
      }).length || 0

      setStats({
        patients: patientCount || 0,
        medicines: medicineCount || 0,
        bills: billCount || 0,
        lowStock,
        nearExpiry,
      })
      setRecentPatients(patients || [])
      setRecentBills(bills || [])
    } catch (err) {
      console.error('Dashboard fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h1 className="font-bold text-gray-900 text-lg">Dashboard</h1>
            <p className="text-gray-400 text-xs">Welcome back, Admin</p>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {loading ? (
            <Spinner size="lg" className="mt-20" />
          ) : (
            <>
              {/* Stat cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <StatCard title="Total Patients" value={stats.patients} icon="👥" color="blue" onClick={() => navigate('/admin/patients')} />
                <StatCard title="Medicines" value={stats.medicines} icon="💊" color="green" onClick={() => navigate('/admin/medicines')} />
                <StatCard title="Total Bills" value={stats.bills} icon="🧾" color="blue" onClick={() => navigate('/admin/billing')} />
                <StatCard title="Low Stock" value={stats.lowStock} icon="⚠️" color="yellow" onClick={() => navigate('/admin/medicines')} />
                <StatCard title="Near Expiry" value={stats.nearExpiry} icon="📅" color="red" onClick={() => navigate('/admin/medicines')} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent patients */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-900">Recent Patients</h2>
                    <button onClick={() => navigate('/admin/patients')} className="text-blue-700 text-xs font-medium hover:underline">View all</button>
                  </div>
                  {recentPatients.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-6">No patients yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {recentPatients.map(p => (
                        <div
                          key={p.id}
                          onClick={() => navigate(`/admin/patients/${p.id}`)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                            {p.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">{p.name}</p>
                            <p className="text-gray-400 text-xs">{p.phone} · {p.doctor_name}</p>
                          </div>
                          <p className="text-xs text-gray-400 flex-shrink-0">
                            {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent bills */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-900">Recent Bills</h2>
                    <button onClick={() => navigate('/admin/billing')} className="text-blue-700 text-xs font-medium hover:underline">View all</button>
                  </div>
                  {recentBills.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-6">No bills yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {recentBills.map(b => (
                        <div
                          key={b.id}
                          onClick={() => navigate(`/admin/billing/${b.id}`)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-lg flex-shrink-0">🧾</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm">{b.bill_number}</p>
                            <p className="text-gray-400 text-xs truncate">{b.patients?.name}</p>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 flex-shrink-0">₹{Number(b.grand_total).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard