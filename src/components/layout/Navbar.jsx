import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navigationLinks = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/services', label: 'Services' },
  { to: '/conditions', label: 'Conditions' },
  { to: '/lab-tests', label: 'Lab Tests' },
  { to: '/health-tips', label: 'Health Tips' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      } border-b border-slate-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Logo — always show name */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0C4A6E] to-[#1E6B94] flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              R
            </div>
            <div>
              <div className="text-base font-bold text-slate-900 leading-tight">
                Rishi Care
              </div>
              <div className="text-[11px] font-medium text-[#0C4A6E] leading-tight tracking-wide">
                Hospital
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[#0C4A6E] bg-sky-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side: CTA + hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="tel:+919391156294"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#0C4A6E] text-white text-sm font-semibold rounded-lg hover:bg-[#0A3D5C] transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="lg:hidden border-t border-slate-100 py-3 animate-slide-in">
            <div className="flex flex-col gap-1">
              {navigationLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-sky-50 text-[#0C4A6E]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="border-t border-slate-100 mt-2 pt-2">
                <Link
                  to="/admin/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
