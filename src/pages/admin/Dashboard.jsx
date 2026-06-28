import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import AdminPage from '../../components/admin/AdminPage'
import StatCard from '../../components/admin/StatCard'
import Spinner from '../../components/ui/Spinner'

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ patients: 0, medicines: 0, bills: 0, lowStock: 0, nearExpiry: 0 })
  const [recentPatients, setRecentPatients] = useState([])
  const [recentBills, setRecentBills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
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

        const lowStock = medicines?.filter(m => m.quantity < m.minimum_stock).length || 0

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
    fetchDashboardData()
  }, [])

  return (
    <AdminPage title="Dashboard">
      {loading ? (
        <Spinner size="lg" className="mt-20" />
      ) : (
        <>
          {/* Welcome Banner */}
          <div className="mb-8 rounded-lg border border-slate-200 bg-gradient-to-r from-healthcare-50 to-healthcare-50/50 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="text-4xl">👋</div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Welcome back, Admin</h2>
                <p className="text-slate-600 mt-1">Here's your hospital operations summary</p>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard
              title="Total Patients"
              value={stats.patients}
              icon="👥"
              color="healthcare"
              onClick={() => navigate('/admin/patients')}
            />
            <StatCard
              title="Medicines"
              value={stats.medicines}
              icon="💊"
              color="green"
              onClick={() => navigate('/admin/medicines')}
            />
            <StatCard
              title="Total Bills"
              value={stats.bills}
              icon="🧾"
              color="healthcare"
              onClick={() => navigate('/admin/billing')}
            />
            <StatCard
              title="Low Stock"
              value={stats.lowStock}
              icon="⚠️"
              color="yellow"
              onClick={() => navigate('/admin/medicines')}
            />
            <StatCard
              title="Near Expiry"
              value={stats.nearExpiry}
              icon="📅"
              color="red"
              onClick={() => navigate('/admin/medicines')}
            />
          </div>

          {/* Recent Data Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Patients */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="font-bold text-slate-900 text-lg">Recent Patients</h2>
                <button
                  onClick={() => navigate('/admin/patients')}
                  className="text-healthcare-900 text-sm font-semibold hover:text-healthcare-700 transition-colors flex items-center gap-1"
                >
                  View all
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="divide-y divide-slate-200">
                {recentPatients.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-8">No patients yet.</p>
                ) : (
                  recentPatients.map(p => (
                    <div
                      key={p.id}
                      onClick={() => navigate(`/admin/patients/${p.id}`)}
                      className="flex items-center gap-3 p-4 hover:bg-slate-50 cursor-pointer transition-colors group"
                    >
                      <div className="w-10 h-10 bg-healthcare-100 rounded-lg flex items-center justify-center text-healthcare-900 font-bold text-sm flex-shrink-0">
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm truncate group-hover:text-healthcare-900">{p.name}</p>
                        <p className="text-slate-500 text-xs">{p.phone} • {p.doctor_name}</p>
                      </div>
                      <p className="text-xs text-slate-400 flex-shrink-0">
                        {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Bills */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="font-bold text-slate-900 text-lg">Recent Bills</h2>
                <button
                  onClick={() => navigate('/admin/billing')}
                  className="text-healthcare-900 text-sm font-semibold hover:text-healthcare-700 transition-colors flex items-center gap-1"
                >
                  View all
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="divide-y divide-slate-200">
                {recentBills.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-8">No bills yet.</p>
                ) : (
                  recentBills.map(b => (
                    <div
                      key={b.id}
                      onClick={() => navigate(`/admin/billing/${b.id}`)}
                      className="flex items-center gap-3 p-4 hover:bg-slate-50 cursor-pointer transition-colors group"
                    >
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center text-success font-bold text-sm flex-shrink-0">
                        🧾
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm group-hover:text-healthcare-900">{b.bill_number}</p>
                        <p className="text-slate-500 text-xs truncate">{b.patients?.name}</p>
                      </div>
                      <p className="text-sm font-bold text-slate-900 flex-shrink-0">₹{Number(b.grand_total).toFixed(2)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </AdminPage>
  )
}

export default Dashboard