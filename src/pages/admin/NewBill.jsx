import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { generateBillPDF } from '../../lib/generatePDF'
import AdminPage from '../../components/admin/AdminPage'
import SearchInput from '../../components/ui/SearchInput'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'

const NewBill = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // Patient selection
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [patientSearch, setPatientSearch] = useState('')

  // Medicine selection
  const [medicines, setMedicines] = useState([])
  const [medSearch, setMedSearch] = useState('')
  const [billItems, setBillItems] = useState([])

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: pats }, { data: meds }] = await Promise.all([
        supabase.from('patients').select('*').eq('is_active', true).order('name'),
        supabase.from('medicines').select('*').eq('is_active', true).order('medicine_name'),
      ])
      setPatients(pats || [])
      setMedicines(meds || [])

      const preId = searchParams.get('patient')
      if (preId && pats) {
        const pre = pats.find(p => p.id === preId)
        if (pre) setSelectedPatient(pre)
      }
      setLoading(false)
    }
    fetchData()
  }, [searchParams])

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    p.phone.includes(patientSearch)
  )

  const filteredMedicines = medicines.filter(m =>
    m.medicine_name.toLowerCase().includes(medSearch.toLowerCase())
  )

  // Add medicine to bill
  const addItem = (medicine) => {
    const existing = billItems.find(i => i.medicine_id === medicine.id)
    if (existing) {
      updateQty(medicine.id, existing.quantity + 1)
    } else {
      setBillItems(prev => [...prev, {
        medicine_id: medicine.id,
        medicine_name: medicine.medicine_name,
        unit_price: medicine.price,
        gst_percent: medicine.gst_percent,
        quantity: 1,
        available: medicine.quantity,
      }])
    }
  }

  const updateQty = (medicineId, qty) => {
    if (qty <= 0) {
      setBillItems(prev => prev.filter(i => i.medicine_id !== medicineId))
      return
    }
    setBillItems(prev => prev.map(i =>
      i.medicine_id === medicineId ? { ...i, quantity: qty } : i
    ))
  }

  const removeItem = (medicineId) => {
    setBillItems(prev => prev.filter(i => i.medicine_id !== medicineId))
  }

  // Calculate totals
  const calcLineTotal = (item) => item.quantity * item.unit_price * (1 + item.gst_percent / 100)
  const calcLineBase = (item) => item.quantity * item.unit_price
  const calcLineGST = (item) => item.quantity * item.unit_price * (item.gst_percent / 100)

  const subtotal = billItems.reduce((acc, i) => acc + calcLineBase(i), 0)
  const gstTotal = billItems.reduce((acc, i) => acc + calcLineGST(i), 0)
  const grandTotal = subtotal + gstTotal

  const handleSaveBill = async () => {
    setError('')
    if (!selectedPatient) { setError('Please select a patient.'); return }
    if (billItems.length === 0) { setError('Please add at least one medicine.'); return }

    // Validate stock
    for (const item of billItems) {
      if (item.quantity > item.available) {
        setError(`Insufficient stock for ${item.medicine_name}. Available: ${item.available}`)
        return
      }
    }

    setSaving(true)
    try {
      // Call atomic RPC
      const { data, error: rpcError } = await supabase.rpc('create_bill', {
        p_patient_id: selectedPatient.id,
        p_items: billItems.map(i => ({
          medicine_id: i.medicine_id,
          medicine_name: i.medicine_name,
          quantity: i.quantity,
          unit_price: i.unit_price,
          gst_percent: i.gst_percent,
          line_total: calcLineTotal(i),
          gst_amount: calcLineGST(i),
        })),
      })

      if (rpcError) throw rpcError

      // Fetch the created bill for PDF
      const { data: bill } = await supabase.from('bills').select('*').eq('id', data).single()

      // Generate PDF
      generateBillPDF(bill, selectedPatient, billItems.map(i => ({
        ...i,
        line_total: calcLineTotal(i),
      })))

      navigate(`/admin/billing/${data}`)
    } catch (err) {
      setError(err.message || 'Failed to create bill. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )

  return (
    <AdminPage title="New Bill" backPath="/admin/billing" backLabel="← Billing">
      {error && (
        <div className="bg-emergency/10 border border-emergency/20 text-emergency text-sm rounded-lg px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <div className="section-label mb-4">1. Select Patient</div>
            {selectedPatient ? (
              <div className="flex items-center gap-3 bg-healthcare-50 border border-healthcare-200 rounded-lg p-4">
                <div className="w-10 h-10 bg-healthcare-900 rounded-lg flex items-center justify-center text-white font-bold">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{selectedPatient.name}</p>
                  <p className="text-sm text-slate-600">{selectedPatient.phone} · {selectedPatient.doctor_name}</p>
                </div>
                <button onClick={() => setSelectedPatient(null)} className="text-slate-400 hover:text-emergency text-sm transition-colors">✕</button>
              </div>
            ) : (
              <>
                <SearchInput value={patientSearch} onChange={setPatientSearch} placeholder="Search patient by name or phone..." className="mb-4" />
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {filteredPatients.map(p => (
                    <button key={p.id} onClick={() => { setSelectedPatient(p); setPatientSearch('') }}
                      className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200 hover:border-healthcare-200">
                      <div className="w-8 h-8 bg-healthcare-100 rounded-lg flex items-center justify-center text-healthcare-900 font-bold text-sm">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{p.name}</p>
                        <p className="text-slate-600 text-xs">{p.phone}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <div className="section-label mb-4">2. Add Medicines</div>
            <SearchInput value={medSearch} onChange={setMedSearch} placeholder="Search medicine..." className="mb-4" />
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredMedicines.map(m => {
                const inBill = billItems.find(i => i.medicine_id === m.id)
                const outOfStock = m.quantity === 0
                return (
                  <div key={m.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${inBill ? 'border-healthcare-200 bg-healthcare-50' : 'border-slate-200 hover:bg-slate-50'} ${outOfStock ? 'opacity-50' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 text-sm truncate">{m.medicine_name}</p>
                      <p className="text-slate-600 text-xs">₹{Number(m.price).toFixed(2)} · GST {m.gst_percent}% · Stock: {m.quantity}</p>
                    </div>
                    {outOfStock ? (
                      <Badge variant="danger">Out of Stock</Badge>
                    ) : (
                      <button onClick={() => addItem(m)}
                        className="bg-healthcare-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-healthcare-800 transition-colors flex-shrink-0">
                        {inBill ? '+ Add More' : '+ Add'}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sticky top-24">
            <div className="section-label mb-4">3. Bill Summary</div>

            {billItems.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-8 font-medium">No medicines added yet.</p>
            ) : (
              <div className="space-y-3 mb-4">
                {billItems.map(item => {
                  const lineTotal = calcLineTotal(item)
                  const overStock = item.quantity > item.available
                  return (
                    <div key={item.medicine_id} className={`p-3 rounded-lg border ${overStock ? 'border-emergency/20 bg-emergency/5' : 'border-slate-200'}`}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-sm font-semibold text-slate-900 flex-1 leading-tight">{item.medicine_name}</p>
                        <button onClick={() => removeItem(item.medicine_id)} className="text-slate-400 hover:text-emergency text-xs flex-shrink-0 transition-colors">✕</button>
                      </div>
                      {overStock && <p className="text-emergency text-xs mb-2 font-medium">⚠️ Only {item.available} in stock</p>}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.medicine_id, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold flex items-center justify-center transition-colors">-</button>
                          <span className="text-sm font-semibold w-6 text-center text-slate-900">{item.quantity}</span>
                          <button onClick={() => updateQty(item.medicine_id, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold flex items-center justify-center transition-colors">+</button>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">₹{lineTotal.toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        ₹{item.unit_price} × {item.quantity} + {item.gst_percent}% GST
                      </p>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-slate-600 font-medium">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 font-medium">
                <span>GST</span>
                <span>₹{gstTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-base pt-2 border-t border-slate-200">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={handleSaveBill}
              disabled={saving || billItems.length === 0 || !selectedPatient}
              className="w-full mt-5"
              size="lg"
            >
              {saving ? 'Generating Bill...' : '🧾 Generate Bill & PDF'}
            </Button>
          </div>
        </div>
      </div>
    </AdminPage>
  )
}

export default NewBill
