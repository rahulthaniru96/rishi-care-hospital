import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { generateBillPDF } from '../../lib/generatePDF'
import Sidebar from '../../components/admin/Sidebar'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

const BillDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [bill, setBill] = useState(null)
  const [patient, setPatient] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchBill() }, [id])

  const fetchBill = async () => {
    const [{ data: billData }, { data: itemData }] = await Promise.all([
      supabase.from('bills').select('*, patients(*)').eq('id', id).single(),
      supabase.from('bill_items').select('*').eq('bill_id', id),
    ])
    setBill(billData)
    setPatient(billData?.patients)
    setItems(itemData || [])
    setLoading(false)
  }

  const handlePrint = () => {
    if (bill && patient && items) {
      generateBillPDF(bill, patient, items)
    }
  }

  if (loading) return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={false} onClose={() => {}} />
      <div className="flex-1 flex items-center justify-center"><Spinner size="lg" /></div>
    </div>
  )

  if (!bill) return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center flex-col gap-4 text-gray-400">
      <p className="text-5xl">🧾</p>
      <p>Bill not found.</p>
      <Button onClick={() => navigate('/admin/billing')}>← Back to Billing</Button>
    </div>
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
          <button onClick={() => navigate('/admin/billing')} className="text-gray-400 hover:text-gray-600 text-sm">←</button>
          <h1 className="font-bold text-gray-900 text-lg flex-1">{bill.bill_number}</h1>
          <Button onClick={handlePrint} variant="success">📄 Download PDF</Button>
        </header>

        <main className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full">

          {/* Bill header info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium mb-3">Patient</p>
                <p className="font-bold text-gray-900">{patient?.name}</p>
                <p className="text-gray-500 text-sm">{patient?.phone}</p>
                <p className="text-gray-500 text-sm">{patient?.age}y · {patient?.gender}</p>
                <p className="text-gray-500 text-sm">{patient?.doctor_name}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase font-medium mb-3">Bill Details</p>
                <p className="font-bold text-blue-700">{bill.bill_number}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(bill.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(bill.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>

          {/* Items table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
            <div className="bg-blue-700 text-white grid grid-cols-12 gap-2 px-4 py-3 text-xs font-semibold">
              <span className="col-span-5">Medicine</span>
              <span className="col-span-2 text-center">Qty</span>
              <span className="col-span-2 text-center">Price</span>
              <span className="col-span-1 text-center">GST</span>
              <span className="col-span-2 text-right">Total</span>
            </div>
            {items.map((item, i) => (
              <div key={item.id} className={`grid grid-cols-12 gap-2 px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <span className="col-span-5 font-medium text-gray-900">{item.medicine_name}</span>
                <span className="col-span-2 text-center text-gray-600">{item.quantity}</span>
                <span className="col-span-2 text-center text-gray-600">₹{Number(item.unit_price).toFixed(2)}</span>
                <span className="col-span-1 text-center text-gray-600">{item.gst_percent}%</span>
                <span className="col-span-2 text-right font-semibold text-gray-900">₹{Number(item.line_total).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="max-w-xs ml-auto space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{Number(bill.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>GST</span>
                <span>₹{Number(bill.gst_amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-lg border-t border-gray-100 pt-2 mt-2">
                <span>Grand Total</span>
                <span className="text-blue-700">₹{Number(bill.grand_total).toFixed(2)}</span>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default BillDetail