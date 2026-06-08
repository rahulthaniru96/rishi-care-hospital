import { Link } from 'react-router-dom'
import { hospitalInfo } from '../../data/hospitalInfo'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

        {/* Brand */}
        <div>
          <h3 className="text-white font-bold text-lg mb-2">Rishi Care Hospital</h3>
          <p className="text-sm text-gray-400 mb-4">You Are In Safe Hands. Providing trusted healthcare to Peerzadiguda and surrounding areas.</p>
          <div className="flex gap-3">
            <a href={`tel:${hospitalInfo.phone}`} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg transition-colors">📞 Call</a>
            <a href={`https://wa.me/${hospitalInfo.whatsapp}`} target="_blank" rel="noreferrer" className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-2 rounded-lg transition-colors">💬 WhatsApp</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: '/doctors', label: 'Our Doctors' },
              { to: '/services', label: 'Services' },
              { to: '/conditions', label: 'Conditions Treated' },
              { to: '/lab-tests', label: 'Lab Tests' },
              { to: '/contact', label: 'Contact Us' },
            ].map(link => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-white transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">Contact</h4>
          <p className="text-sm mb-2">📍 {hospitalInfo.address}</p>
          <p className="text-sm mb-2">📞 {hospitalInfo.phone}</p>
          <div className="mt-3 space-y-1">
            {hospitalInfo.hours.map(h => (
              <p key={h.day} className="text-xs text-gray-400">
                <span className="text-gray-300">{h.day}:</span> {h.time}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Rishi Care Hospital. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer