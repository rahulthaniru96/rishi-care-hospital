import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import AdminPage from '../../components/admin/AdminPage'
import SearchInput from '../../components/ui/SearchInput'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

const DOCTORS = ['Dr. R. Venkatasubbaiah Yadav', 'Dr. B. Gouthami']
const GENDERS = ['Male', 'Female', 'Other']
const EMPTY_FORM = { name: '', phone: '', age: '', gender: 'Male', doctor_name: DOCTORS[0] }

const Patients = () => {
  const navigate = useNavigate()
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [editPatient, setEditPatient] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
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
    fetchPatients()
  }, [refreshKey])

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
    setRefreshKey(k => k + 1)
  }

  const handleSoftDelete = async (id) => {
    if (!confirm('Remove this patient? Their history and bills will be preserved.')) return
    await supabase.from('patients').update({ is_active: false }).eq('id', id)
    setRefreshKey(k => k + 1)
  }

  return (
    <>
      <AdminPage title="Patients" actions={<Button onClick={openAdd}>+ Add Patient</Button>}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name or phone..." className="mb-6 max-w-md" />

        {loading ? (
          <Spinner size="lg" className="mt-20" />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-5xl mb-4">👥</p>
            <p className="font-medium">{search ? 'No patients match your search.' : 'No patients yet. Add your first patient!'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(p => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4 group"
              >
                {/* Avatar */}
                <div className="w-11 h-11 bg-healthcare-100 rounded-lg flex items-center justify-center text-healthcare-900 font-bold text-lg flex-shrink-0 group-hover:bg-healthcare-200 transition-colors">
                  {p.name.charAt(0).toUpperCase()}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate group-hover:text-healthcare-900">{p.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{p.phone} · {p.age}y · {p.gender}</p>
                  <p className="text-slate-400 text-xs truncate">{p.doctor_name}</p>
                </div>
                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="secondary" onClick={() => navigate(`/admin/patients/${p.id}`)}>View</Button>
                  <Button size="sm" variant="outline" onClick={() => openEdit(p)}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleSoftDelete(p.id)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminPage>

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editPatient ? 'Edit Patient' : 'Add Patient'}>
        <div className="space-y-4">
          {error && <div className="text-emergency text-sm bg-emergency/10 px-3 py-2 rounded-lg border border-emergency/20">{error}</div>}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Full Name *</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all"
              placeholder="Patient full name"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Phone *</label>
            <input
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all"
              placeholder="+91 9XXXXXXXXX"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Age *</label>
              <input
                type="number"
                value={form.age}
                onChange={e => setForm({ ...form, age: e.target.value })}
                min={1}
                max={149}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all"
                placeholder="Age"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Gender *</label>
              <select
                value={form.gender}
                onChange={e => setForm({ ...form, gender: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all"
              >
                {GENDERS.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Assigned Doctor *</label>
            <select
              value={form.doctor_name}
              onChange={e => setForm({ ...form, doctor_name: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all"
            >
              {DOCTORS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="flex-1">
              {saving ? 'Saving...' : editPatient ? 'Update' : 'Add Patient'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Patients