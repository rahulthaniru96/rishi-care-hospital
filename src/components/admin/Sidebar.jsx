import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const navItems = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/patients', icon: '👥', label: 'Patients' },
  { to: '/admin/medicines', icon: '💊', label: 'Medicines' },
  { to: '/admin/billing', icon: '🧾', label: 'Billing' },
]

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-healthcare-900 text-white shadow-2xl z-30
        flex flex-col transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none
      `}>
        {/* Logo area */}
        <div className="p-6 border-b border-healthcare-700">
          <div className="flex items-center gap-3">
            <div className="!text-[#000080] w-12 h-12 bg-white rounded-lg flex items-center justify-center text-healthcare-900 font-bold text-lg shadow-md">
              R
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight !text-[#000080]">Rishi Care</p>
              <p className="text-xs text-healthcare-200 !text-[#000080]">Hospital Admin</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 !text-[#000080]
                ${isActive
                  ? 'bg-white text-healthcare-900 shadow-lg'
                  : 'text-healthcare-100 hover:bg-healthcare-800 hover:!text-black'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-healthcare-700">
          <button
            onClick={handleLogout}
            className="!text-[#000080] hover:!text-black w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-emergency hover:bg-emergency/20 transition-all duration-200"
          >
            <span className="text-lg">🚪</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar