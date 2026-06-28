import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import AdminPage from '../../components/admin/AdminPage'
import Timeline from '../../components/ui/Timeline'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

const RECORD_TYPES = ['Consultation', 'Blood Test', 'Urine Test', 'X-Ray', 'ECG', 'Ultrasound', 'Other']
const DOCTORS = ['Dr. R. Venkatasubbaiah Yadav', 'Dr. B. Gouthami']
const EMPTY_HISTORY = { record_type: 'Consultation', doctor_name: DOCTORS[0], summary: '', remarks: '', record_date: new Date().toISOString().slice(0, 10) }
const TABS = ['Profile', 'History', 'Bills']

const PatientDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState('Profile')
  const [patient, setPatient] = useState(null)
  const [history, setHistory] = useState([])
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [historySort, setHistorySort] = useState('newest')
  const [modalOpen, setModalOpen] = useState(false)
  const [histForm, setHistForm] = useState(EMPTY_HISTORY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
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
    fetchAll()
  }, [id, refreshKey])

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
    setRefreshKey(k => k + 1)
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )

  if (!patient) return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center flex-col gap-4 text-slate-400">
      <p className="text-5xl">👤</p>
      <p className="font-medium">Patient not found.</p>
      <Button onClick={() => navigate('/admin/patients')}>← Back to Patients</Button>
    </div>
  )

  return (
    <>
      <AdminPage title={patient.name} backPath="/admin/patients" backLabel="← Patients" actions={<Button size="sm" onClick={() => navigate(`/admin/billing/new?patient=${id}`)}>+ New Bill</Button>}>
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-lg p-1 mb-6 w-fit">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${tab === t ? 'bg-white text-healthcare-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Profile tab */}
        {tab === 'Profile' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 max-w-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-healthcare-100 rounded-lg flex items-center justify-center text-healthcare-900 font-bold text-2xl">
                {patient.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{patient.name}</h2>
                <p className="text-slate-600 text-sm">{patient.doctor_name}</p>
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
                <div key={row.label} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600 text-sm">{row.label}</span>
                  <span className="text-slate-900 text-sm font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History tab */}
        {tab === 'History' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Sort:</span>
                <select
                  value={historySort}
                  onChange={e => setHistorySort(e.target.value)}
                  className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-healthcare-500 bg-white font-medium"
                >
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
              <div className="text-center py-16 text-slate-400">
                <p className="text-5xl mb-3">🧾</p>
                <p className="font-medium">No bills generated yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bills.map(b => (
                  <div
                    key={b.id}
                    onClick={() => navigate(`/admin/billing/${b.id}`)}
                    className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4 cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center text-success text-lg flex-shrink-0 group-hover:bg-success/20 transition-colors">🧾</div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm group-hover:text-healthcare-900">{b.bill_number}</p>
                      <p className="text-slate-500 text-xs">{new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <p className="font-bold text-slate-900">₹{Number(b.grand_total).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </AdminPage>

      {/* Add History Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add History Record">
        <div className="space-y-4">
          {error && <div className="text-emergency text-sm bg-emergency/10 px-3 py-2 rounded-lg border border-emergency/20">{error}</div>}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Record Type *</label>
            <select
              value={histForm.record_type}
              onChange={e => setHistForm({ ...histForm, record_type: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-healthcare-500 bg-white"
            >
              {RECORD_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Doctor</label>
            <select
              value={histForm.doctor_name}
              onChange={e => setHistForm({ ...histForm, doctor_name: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-healthcare-500 bg-white"
            >
              {DOCTORS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Record Date *</label>
            <input
              type="date"
              value={histForm.record_date}
              onChange={e => setHistForm({ ...histForm, record_date: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-healthcare-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Summary * <span className="text-slate-500 font-normal">({histForm.summary.length}/250)</span>
            </label>
            <textarea
              value={histForm.summary}
              onChange={e => setHistForm({ ...histForm, summary: e.target.value })}
              rows={3}
              maxLength={250}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-healthcare-500 resize-none bg-white"
              placeholder="Diagnosis, findings, treatment given..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Remarks <span className="text-slate-500 font-normal">({histForm.remarks.length}/150)</span>
            </label>
            <textarea
              value={histForm.remarks}
              onChange={e => setHistForm({ ...histForm, remarks: e.target.value })}
              rows={2}
              maxLength={150}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-healthcare-500 resize-none bg-white"
              placeholder="Additional notes or follow-up..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleAddHistory} disabled={saving} className="flex-1">
              {saving ? 'Saving...' : 'Add Record'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default PatientDetail