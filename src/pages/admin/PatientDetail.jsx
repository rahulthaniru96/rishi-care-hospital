import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import Sidebar from '../../components/admin/Sidebar'
import Timeline from '../../components/ui/Timeline'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Spinner from '../../components/ui/Spinner'

const RECORD_TYPES = ['Consultation', 'Blood Test', 'Urine Test', 'X-Ray', 'ECG', 'Ultrasound', 'Other']
const DOCTORS = ['Dr. R. Venkatasubbaiah Yadav', 'Dr. B. Gouthami']
const EMPTY_HISTORY = { record_type: 'Consultation', doctor_name: DOCTORS[0], summary: '', remarks: '', record_date: new Date().toISOString().slice(0, 10) }
const TABS = ['Profile', 'History', 'Bills']

const PatientDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState('Profile')
  const [patient, setPatient] = useState(null)
  const [history, setHistory] = useState([])
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [historySort, setHistorySort] = useState('newest')
  const [modalOpen, setModalOpen] = useState(false)
  const [histForm, setHistForm] = useState(EMPTY_HISTORY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchAll() }, [id])

  const fetchAll = async () => {
    setLoading(true)
    const [{ data: pat }, { data: hist }, { data: billData }] = await Promise.all([
      supabase.from('patients').select('*').eq('id', id).single(),
      supabase.from('patient_history').select('*').eq('patient_id', id).order('record_date', { ascending: false }),
      supabase.from('bills').select('*').eq('patient_id', id).order('created_at', { ascending: false }),
    ])
    setPatient(pat)
    setHistory(hist || [])
    setBills(billData || [])
    setLoading(false)
  }

  const sortedHistory = [...history].sort((a, b) => {
    const da = new Date(a.record_date), db = new Date(b.record_date)
    return historySort === 'newest' ? db - da : da - db
  })

  const handleAddHistory = async () => {
    setError('')
    if (!histForm.summary.trim()) { setError('Summary is required.'); return }
    if (histForm.summary.length > 250) { setError('Summary must be under 250 characters.'); return }
    if (histForm.remarks.length > 150) { setError('Remarks must be under 150 characters.'); return }
    setSaving(true)
    const { error: err } = await supabase.from('patient_history').insert({ ...histForm, patient_id: id })
    if (err) { setError('Failed to save record.'); setSaving(false); return }
    setSaving(false)
    setModalOpen(false)
    setHistForm(EMPTY_HISTORY)
    fetchAll()
  }

  if (loading) return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={false} onClose={() => {}} />
      <div className="flex-1 flex items-center justify-center"><Spinner size="lg" /></div>
    </div>
  )

  if (!patient) return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center flex-col gap-4 text-gray-400">
      <p className="text-5xl">👤</p>
      <p>Patient not found.</p>
      <Button onClick={() => navigate('/admin/patients')}>← Back to Patients</Button>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button onClick={() => navigate('/admin/patients')} className="text-gray-400 hover:text-gray-600 text-sm">←</button>
          <h1 className="font-bold text-gray-900 text-lg flex-1 truncate">{patient.name}</h1>
          <Button size="sm" onClick={() => navigate(`/admin/billing/new?patient=${id}`)}>+ New Bill</Button>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Profile tab */}
          {tab === 'Profile' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700 font-bold text-2xl">
                  {patient.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
                  <p className="text-gray-500 text-sm">{patient.doctor_name}</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Phone', value: patient.phone },
                  { label: 'Age', value: `${patient.age} years` },
                  { label: 'Gender', value: patient.gender },
                  { label: 'Doctor', value: patient.doctor_name },
                  { label: 'Registered', value: new Date(patient.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                ].map(row => (
                  <div key={row.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500 text-sm">{row.label}</span>
                    <span className="text-gray-900 text-sm font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History tab */}
          {tab === 'History' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort:</span>
                  <select value={historySort} onChange={e => setHistorySort(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
                <Button size="sm" onClick={() => { setHistForm(EMPTY_HISTORY); setError(''); setModalOpen(true) }}>
                  + Add Record
                </Button>
              </div>
              <Timeline records={sortedHistory} />
            </div>
          )}

          {/* Bills tab */}
          {tab === 'Bills' && (
            <div>
              {bills.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-4xl mb-3">🧾</p>
                  <p>No bills generated yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bills.map(b => (
                    <div key={b.id}
                      onClick={() => navigate(`/admin/billing/${b.id}`)}
                      className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-700 text-xl flex-shrink-0">🧾</div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{b.bill_number}</p>
                        <p className="text-gray-400 text-xs">{new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                      <p className="font-bold text-gray-900">₹{Number(b.grand_total).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add History Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add History Record">
        <div className="space-y-4">
          {error && <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Record Type *</label>
            <select value={histForm.record_type} onChange={e => setHistForm({ ...histForm, record_type: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              {RECORD_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select value={histForm.doctor_name} onChange={e => setHistForm({ ...histForm, doctor_name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              {DOCTORS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Record Date *</label>
            <input type="date" value={histForm.record_date} onChange={e => setHistForm({ ...histForm, record_date: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Summary * <span className="text-gray-400 font-normal">({histForm.summary.length}/250)</span>
            </label>
            <textarea value={histForm.summary} onChange={e => setHistForm({ ...histForm, summary: e.target.value })} rows={3} maxLength={250}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Diagnosis, findings, treatment given..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks <span className="text-gray-400 font-normal">({histForm.remarks.length}/150)</span>
            </label>
            <textarea value={histForm.remarks} onChange={e => setHistForm({ ...histForm, remarks: e.target.value })} rows={2} maxLength={150}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Additional notes or follow-up..." />
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleAddHistory} disabled={saving} className="flex-1">
              {saving ? 'Saving...' : 'Add Record'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PatientDetail