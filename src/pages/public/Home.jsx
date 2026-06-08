import { Link } from 'react-router-dom'
import { hospitalInfo } from '../../data/hospitalInfo'
import { doctors } from '../../data/doctors'
import { services } from '../../data/services'
import { conditions } from '../../data/conditions'
import { healthTips } from '../../data/healthTips'

const Home = () => {
  return (
    <div className="pb-24 lg:pb-0">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-3">24/7 Healthcare Service</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Rishi Care Hospital
          </h1>
          <p className="text-blue-100 text-lg mb-2 font-medium">You Are In Safe Hands</p>
          <p className="text-blue-200 text-sm max-w-xl mx-auto mb-8">
            Trusted healthcare for families in Peerzadiguda and surrounding areas.
            Expert doctors, modern facilities, compassionate care.
          </p>
          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${hospitalInfo.phone}`}
              className="bg-white text-blue-700 font-semibold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2">
              📞 Call Now
            </a>
            <a href={`https://wa.me/${hospitalInfo.whatsapp}`} target="_blank" rel="noreferrer"
              className="bg-green-500 text-white font-semibold px-5 py-3 rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2">
              💬 WhatsApp
            </a>
            <a href={`sms:${hospitalInfo.phone}`}
              className="bg-blue-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-blue-500 transition-colors flex items-center gap-2">
              ✉️ SMS
            </a>
            <a href={hospitalInfo.googleMapsUrl} target="_blank" rel="noreferrer"
              className="bg-red-500 text-white font-semibold px-5 py-3 rounded-xl hover:bg-red-600 transition-colors flex items-center gap-2">
              📍 Directions
            </a>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">About Our Hospital</h2>
          <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
            Rishi Care Hospital is a trusted local clinic in Peerzadiguda, Hyderabad, offering comprehensive
            outpatient and inpatient services. With experienced doctors, modern diagnostic equipment,
            and a patient-first approach, we ensure quality healthcare is accessible to every family.
            We are available 24/7 for emergencies.
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Doctors', value: '2+' },
              { label: 'Services', value: '7+' },
              { label: 'Conditions Treated', value: '20+' },
              { label: 'Hours', value: '24/7' },
            ].map(stat => (
              <div key={stat.label} className="bg-blue-50 rounded-2xl p-4">
                <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Doctors ── */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">Our Doctors</h2>
          <p className="text-gray-500 text-center text-sm mb-8">Expert care from experienced physicians</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map(doc => (
              <div key={doc.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col items-center p-6 text-center">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 mb-4"
                />
                <h3 className="font-bold text-gray-900 text-lg">{doc.name}</h3>
                <p className="text-blue-700 text-sm font-medium">{doc.qualifications}</p>
                <p className="text-gray-500 text-sm mt-1">{doc.specialization}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {doc.specialties.map(s => (
                    <span key={s} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/doctors" className="text-blue-700 font-medium text-sm hover:underline">View full doctor profiles →</Link>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">Our Services</h2>
          <p className="text-gray-500 text-center text-sm mb-8">Comprehensive healthcare under one roof</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map(s => (
              <div key={s.id} className="bg-gray-50 rounded-2xl p-4 text-center hover:bg-blue-50 transition-colors">
                <span className="text-3xl">{s.icon}</span>
                <p className="font-semibold text-gray-800 text-sm mt-2">{s.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/services" className="text-blue-700 font-medium text-sm hover:underline">View all services →</Link>
          </div>
        </div>
      </section>

      {/* ── Conditions ── */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">Conditions We Treat</h2>
          <p className="text-gray-500 text-center text-sm mb-8">Expert diagnosis and treatment for a wide range of conditions</p>
          <div className="flex flex-wrap justify-center gap-3">
            {conditions.map(c => (
              <Link
                key={c.slug}
                to={`/conditions/${c.slug}`}
                className="bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:text-blue-700 text-sm font-medium px-4 py-2 rounded-full transition-colors"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Health Tips preview ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">Health Tips</h2>
          <p className="text-gray-500 text-center text-sm mb-8">Simple advice for a healthier life</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthTips.slice(0, 2).map(tip => (
              <Link
                key={tip.slug}
                to={`/health-tips/${tip.slug}`}
                className="bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-2xl p-5 transition-colors"
              >
                <h3 className="font-bold text-gray-900 text-base mb-1">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.summary}</p>
                <p className="text-blue-700 text-xs font-medium mt-3">Read more →</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/health-tips" className="text-blue-700 font-medium text-sm hover:underline">View all health tips →</Link>
          </div>
        </div>
      </section>

      {/* ── Contact strip ── */}
      <section className="py-14 px-4 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Visit Us Today</h2>
          <p className="text-blue-200 text-sm mb-2">📍 {hospitalInfo.address}</p>
          <p className="text-blue-200 text-sm mb-6">📞 {hospitalInfo.phone}</p>
          <Link to="/contact" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            Get Directions & Hours
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home