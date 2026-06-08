import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const leftLinks = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/services', label: 'Services' },
  { to: '/conditions', label: 'Conditions' },
]

const rightLinks = [
  { to: '/lab-tests', label: 'Lab Tests' },
  { to: '/health-tips', label: 'Health Tips' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]

const allLinks = [...leftLinks, ...rightLinks]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-blue-700' : 'text-gray-600 hover:text-blue-700'}`

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">

        {/* ── Mobile bar ── */}
        <div className="flex items-center justify-between h-16 lg:hidden">
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 hover:text-blue-700 p-2 rounded-lg"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Logo — right side on mobile */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-blue-700 font-bold text-lg leading-tight text-right">
              Rishi Care<br />
              <span className="text-red-600 text-sm font-semibold">Hospital</span>
            </span>
          </Link>
        </div>

        {/* ── Desktop bar ── */}
        <div className="hidden lg:flex items-center h-16 gap-6">
          {/* Left links */}
          <nav className="flex items-center gap-6 flex-1">
            {leftLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={linkClass}>{link.label}</NavLink>
            ))}
          </nav>

          {/* Center logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold">R</div>
            <span className="text-gray-900 font-bold text-base leading-tight">
              Rishi Care <span className="text-red-600">Hospital</span>
            </span>
          </Link>

          {/* Right links */}
          <nav className="flex items-center gap-6 flex-1 justify-end">
            {rightLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={linkClass}>{link.label}</NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {allLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar