import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import AdminPage from '../../components/admin/AdminPage'
import SearchInput from '../../components/ui/SearchInput'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

const Billing = () => {
  const navigate = useNavigate()
  const [bills, setBills] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('bills')
        .select('*, patients(name, phone)')
        .order('created_at', { ascending: false })
      setBills(data || [])
      setLoading(false)
    }
    fetchBills()
  }, [])

  const filtered = bills.filter(b =>
    b.bill_number.toLowerCase().includes(search.toLowerCase()) ||
    b.patients?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminPage title="Billing" actions={<Button onClick={() => navigate('/admin/billing/new')}>+ New Bill</Button>}>
      <SearchInput value={search} onChange={setSearch} placeholder="Search by bill number or patient..." className="mb-6 max-w-md" />

      {loading ? (
        <Spinner size="lg" className="mt-20" />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p className="text-5xl mb-4">🧾</p>
          <p className="font-medium">{search ? 'No bills match your search.' : 'No bills yet. Create your first bill!'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(b => (
            <div
              key={b.id}
              onClick={() => navigate(`/admin/billing/${b.id}`)}
              className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-11 h-11 bg-success/10 rounded-lg flex items-center justify-center text-success text-lg flex-shrink-0 group-hover:bg-success/20 transition-colors">🧾</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm group-hover:text-healthcare-900">{b.bill_number}</p>
                <p className="text-slate-600 text-xs mt-0.5 truncate">{b.patients?.name} · {b.patients?.phone}</p>
                <p className="text-slate-500 text-xs">
                  {new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-slate-900">₹{Number(b.grand_total).toFixed(2)}</p>
                <p className="text-xs text-slate-500">GST: ₹{Number(b.gst_amount).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminPage>
  )
}

export default Billing