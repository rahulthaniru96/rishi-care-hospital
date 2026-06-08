import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import Sidebar from '../../components/admin/Sidebar'
import SearchInput from '../../components/ui/SearchInput'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

const DOCTORS = ['Dr. R. Venkatasubbaiah Yadav', 'Dr. B. Gouthami']
const GENDERS = ['Male', 'Female', 'Other']
const EMPTY_FORM = { name: '', phone: '', age: '', gender: 'Male', doctor_name: DOCTORS[0] }

const Patients = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editPatient, setEditPatient] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchPatients() }, [])

  const fetchPatients = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('patients')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    setPatients(data || [])
    setLoading(false)
  }

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  )

  const openAdd = () => {
    setEditPatient(null)
    setForm(EMPTY_FORM)
    setError('')
    setModalOpen(true)
  }

  const openEdit = (patient) => {
    setEditPatient(patient)
    setForm({ name: patient.name, phone: patient.phone, age: patient.age, gender: patient.gender, doctor_name: patient.doctor_name })
    setError('')
    setModalOpen(true)
  }

  const handleSave = async () => {
    setError('')
    if (!form.name.trim() || !form.phone.trim() || !form.age) {
      setError('Name, phone, and age are required.')
      return
    }
    if (isNaN(form.age) || form.age < 1 || form.age > 149) {
      setError('Please enter a valid age.')
      return
    }
    setSaving(true)
    if (editPatient) {
      const { error } = await supabase.from('patients').update({ ...form, age: parseInt(form.age) }).eq('id', editPatient.id)
      if (error) { setError('Failed to update patient.'); setSaving(false); return }
    } else {
      const { error } = await supabase.from('patients').insert({ ...form, age: parseInt(form.age) })
      if (error) { setError('Failed to add patient.'); setSaving(false); return }
    }
    setSaving(false)
    setModalOpen(false)
    fetchPatients()
  }

  const handleSoftDelete = async (id) => {
    if (!confirm('Remove this patient? Their history and bills will be preserved.')) return
    await supabase.from('patients').update({ is_active: false }).eq('id', id)
    fetchPatients()
  }

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
          <h1 className="font-bold text-gray-900 text-lg flex-1">Patients</h1>
          <Button onClick={openAdd}>+ Add Patient</Button>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name or phone..." className="mb-5 max-w-md" />

          {loading ? (
            <Spinner size="lg" className="mt-20" />
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">👥</p>
              <p>{search ? 'No patients match your search.' : 'No patients yet. Add your first patient!'}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(p => (
                <div key={p.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg flex-shrink-0">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{p.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{p.phone} · {p.age}y · {p.gender}</p>
                    <p className="text-gray-400 text-xs">{p.doctor_name}</p>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/patients/${p.id}`)}>View</Button>
                    <Button size="sm" variant="secondary" onClick={() => openEdit(p)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleSoftDelete(p.id)}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editPatient ? 'Edit Patient' : 'Add Patient'}>
        <div className="space-y-4">
          {error && <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Patient full name" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+91 9XXXXXXXXX" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
              <input type="number" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} min={1} max={149}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Age" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {GENDERS.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Doctor *</label>
            <select value={form.doctor_name} onChange={e => setForm({ ...form, doctor_name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              {DOCTORS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="flex-1">
              {saving ? 'Saving...' : editPatient ? 'Update' : 'Add Patient'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Patients