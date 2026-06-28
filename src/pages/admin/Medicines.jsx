import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import AdminPage from '../../components/admin/AdminPage'
import SearchInput from '../../components/ui/SearchInput'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Spinner from '../../components/ui/Spinner'

const EMPTY_FORM = { medicine_name: '', price: '', quantity: '', gst_percent: '0', expiry_date: '', minimum_stock: '10' }

const Medicines = () => {
  const [medicines, setMedicines] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [editMed, setEditMed] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('medicines')
        .select('*')
        .eq('is_active', true)
        .order('medicine_name', { ascending: true })
      setMedicines(data || [])
      setLoading(false)
    }
    fetchMedicines()
  }, [refreshKey])

  const filtered = medicines.filter(m =>
    m.medicine_name.toLowerCase().includes(search.toLowerCase())
  )

  // Check if medicine is near expiry (within 30 days)
  const isNearExpiry = (expiryDate) => {
    if (!expiryDate) return false
    const today = new Date()
    const exp = new Date(expiryDate)
    const diff = (exp - today) / (1000 * 60 * 60 * 24)
    return diff <= 30 && diff >= 0
  }

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
  }

  const openAdd = () => {
    setEditMed(null)
    setForm(EMPTY_FORM)
    setError('')
    setModalOpen(true)
  }

  const openEdit = (med) => {
    setEditMed(med)
    setForm({
      medicine_name: med.medicine_name,
      price: med.price,
      quantity: med.quantity,
      gst_percent: med.gst_percent,
      expiry_date: med.expiry_date || '',
      minimum_stock: med.minimum_stock,
    })
    setError('')
    setModalOpen(true)
  }

  const handleSave = async () => {
    setError('')
    if (!form.medicine_name.trim()) { setError('Medicine name is required.'); return }
    if (!form.price || isNaN(form.price) || form.price < 0) { setError('Enter a valid price.'); return }
    if (!form.quantity || isNaN(form.quantity) || form.quantity < 0) { setError('Enter a valid quantity.'); return }

    setSaving(true)
    const payload = {
      medicine_name: form.medicine_name.trim(),
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
      gst_percent: parseFloat(form.gst_percent) || 0,
      expiry_date: form.expiry_date || null,
      minimum_stock: parseInt(form.minimum_stock) || 10,
    }

    if (editMed) {
      const { error } = await supabase.from('medicines').update(payload).eq('id', editMed.id)
      if (error) { setError('Failed to update medicine.'); setSaving(false); return }
    } else {
      const { error } = await supabase.from('medicines').insert(payload)
      if (error) { setError('Failed to add medicine.'); setSaving(false); return }
    }
    setSaving(false)
    setModalOpen(false)
    setRefreshKey(k => k + 1)
  }

  const handleSoftDelete = async (id) => {
    if (!confirm('Remove this medicine? It will be hidden but existing bills are preserved.')) return
    await supabase.from('medicines').update({ is_active: false }).eq('id', id)
    setRefreshKey(k => k + 1)
  }

  return (
    <>
      <AdminPage title="Medicines" actions={<Button onClick={openAdd}>+ Add Medicine</Button>}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search medicines..." className="mb-6 max-w-md" />

        {loading ? (
          <Spinner size="lg" className="mt-20" />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-5xl mb-4">💊</p>
            <p className="font-medium">{search ? 'No medicines match your search.' : 'No medicines yet. Add your first medicine!'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(m => {
              const lowStock = m.quantity < m.minimum_stock
              const nearExpiry = isNearExpiry(m.expiry_date)
              const expired = isExpired(m.expiry_date)

              return (
                <div key={m.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 group">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-healthcare-100 rounded-lg flex items-center justify-center text-healthcare-900 text-lg flex-shrink-0 group-hover:bg-healthcare-200 transition-colors">💊</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <p className="font-semibold text-slate-900 group-hover:text-healthcare-900">{m.medicine_name}</p>
                        {lowStock && <Badge variant="warning">⚠️ Low Stock</Badge>}
                        {expired && <Badge variant="emergency">❌ Expired</Badge>}
                        {!expired && nearExpiry && <Badge variant="warning">📅 Near Expiry</Badge>}
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-slate-600 font-medium">
                        <span className="text-slate-900 font-semibold">₹{Number(m.price).toFixed(2)}</span>
                        <span>Qty: <strong className={lowStock ? 'text-emergency' : 'text-slate-900'}>{m.quantity}</strong></span>
                        <span>GST: {m.gst_percent}%</span>
                        <span>Min: {m.minimum_stock}</span>
                        {m.expiry_date && (
                          <span className={expired ? 'text-emergency font-bold' : nearExpiry ? 'text-warning font-bold' : ''}>
                            Exp: {new Date(m.expiry_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button size="sm" variant="outline" onClick={() => openEdit(m)}>Edit</Button>
                      <Button size="sm" variant="danger" onClick={() => handleSoftDelete(m.id)}>Remove</Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </AdminPage>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editMed ? 'Edit Medicine' : 'Add Medicine'}>
        <div className="space-y-4">
          {error && <div className="text-emergency text-sm bg-emergency/10 px-3 py-2 rounded-lg border border-emergency/20">{error}</div>}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Medicine Name *</label>
            <input
              value={form.medicine_name}
              onChange={e => setForm({ ...form, medicine_name: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all"
              placeholder="e.g. Paracetamol 500mg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Price (₹) *</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Quantity *</label>
              <input
                type="number"
                min="0"
                value={form.quantity}
                onChange={e => setForm({ ...form, quantity: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">GST (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={form.gst_percent}
                onChange={e => setForm({ ...form, gst_percent: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Min Stock Alert</label>
              <input
                type="number"
                min="1"
                value={form.minimum_stock}
                onChange={e => setForm({ ...form, minimum_stock: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all"
                placeholder="10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">Expiry Date</label>
            <input
              type="date"
              value={form.expiry_date}
              onChange={e => setForm({ ...form, expiry_date: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setModalOpen(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="flex-1">
              {saving ? 'Saving...' : editMed ? 'Update' : 'Add Medicine'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Medicines