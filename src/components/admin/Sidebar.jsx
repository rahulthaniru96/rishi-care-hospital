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
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 shadow-lg z-30
        flex flex-col transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none
      `}>
        {/* Logo area */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">R</div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-tight">Rishi Care</p>
              <p className="text-xs text-gray-400">Hospital Admin</p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
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