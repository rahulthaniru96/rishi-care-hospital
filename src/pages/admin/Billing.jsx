import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import Sidebar from '../../components/admin/Sidebar'
import SearchInput from '../../components/ui/SearchInput'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

const Billing = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [bills, setBills] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchBills() }, [])

  const fetchBills = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('bills')
      .select('*, patients(name, phone)')
      .order('created_at', { ascending: false })
    setBills(data || [])
    setLoading(false)
  }

  const filtered = bills.filter(b =>
    b.bill_number.toLowerCase().includes(search.toLowerCase()) ||
    b.patients?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="font-bold text-gray-900 text-lg flex-1">Billing</h1>
          <Button onClick={() => navigate('/admin/billing/new')}>+ New Bill</Button>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by bill number or patient..." className="mb-5 max-w-md" />

          {loading ? (
            <Spinner size="lg" className="mt-20" />
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🧾</p>
              <p>{search ? 'No bills match your search.' : 'No bills yet. Create your first bill!'}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(b => (
                <div
                  key={b.id}
                  onClick={() => navigate(`/admin/billing/${b.id}`)}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center text-green-700 text-xl flex-shrink-0">🧾</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{b.bill_number}</p>
                    <p className="text-gray-500 text-xs mt-0.5 truncate">{b.patients?.name} · {b.patients?.phone}</p>
                    <p className="text-gray-400 text-xs">
                      {new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-900">₹{Number(b.grand_total).toFixed(2)}</p>
                    <p className="text-xs text-gray-400">GST: ₹{Number(b.gst_amount).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Billing