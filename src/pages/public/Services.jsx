import { services } from '../../data/services'
import { hospitalInfo } from '../../data/hospitalInfo'

const Services = () => {
  return (
    <div className="pb-24 lg:pb-0">

      <section className="bg-blue-700 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Our Services</h1>
        <p className="text-blue-200 text-sm">Comprehensive healthcare under one roof</p>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(s => (
            <div key={s.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
              <span className="text-4xl">{s.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{s.title}</h3>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-gray-900 text-lg mb-2">Need a specific service?</h3>
          <p className="text-gray-500 text-sm mb-4">Call us and we'll guide you to the right care.</p>
          <a href={`tel:${hospitalInfo.phone}`}
            className="bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors inline-block">
            📞 {hospitalInfo.phone}
          </a>
        </div>
      </section>

    </div>
  )
}

export default Services