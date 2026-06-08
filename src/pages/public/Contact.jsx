import { hospitalInfo } from '../../data/hospitalInfo'

const Contact = () => {
  return (
    <div className="pb-24 lg:pb-0">

      <section className="bg-blue-700 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-blue-200 text-sm">We're available 24/7 for emergencies</p>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Quick actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href={`tel:${hospitalInfo.phone}`}
              className="bg-blue-600 text-white rounded-2xl p-4 text-center hover:bg-blue-700 transition-colors">
              <span className="text-2xl block mb-1">📞</span>
              <span className="text-xs font-semibold">Call Now</span>
            </a>
            <a href={`https://wa.me/${hospitalInfo.whatsapp}`} target="_blank" rel="noreferrer"
              className="bg-green-500 text-white rounded-2xl p-4 text-center hover:bg-green-600 transition-colors">
              <span className="text-2xl block mb-1">💬</span>
              <span className="text-xs font-semibold">WhatsApp</span>
            </a>
            <a href={`sms:${hospitalInfo.phone}`}
              className="bg-yellow-500 text-white rounded-2xl p-4 text-center hover:bg-yellow-600 transition-colors">
              <span className="text-2xl block mb-1">✉️</span>
              <span className="text-xs font-semibold">SMS</span>
            </a>
            <a href={hospitalInfo.googleMapsUrl} target="_blank" rel="noreferrer"
              className="bg-red-500 text-white rounded-2xl p-4 text-center hover:bg-red-600 transition-colors">
              <span className="text-2xl block mb-1">📍</span>
              <span className="text-xs font-semibold">Directions</span>
            </a>
          </div>

          {/* Info card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">📍</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Address</p>
                <p className="text-gray-500 text-sm mt-0.5">{hospitalInfo.address}</p>
              </div>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex items-center gap-3">
              <span className="text-xl">📞</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Phone</p>
                <a href={`tel:${hospitalInfo.phone}`} className="text-blue-700 text-sm hover:underline">{hospitalInfo.phone}</a>
              </div>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex items-start gap-3">
              <span className="text-xl">🕐</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-2">Working Hours</p>
                {hospitalInfo.hours.map(h => (
                  <div key={h.day} className="flex justify-between gap-6 text-sm py-1 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600">{h.day}</span>
                    <span className="text-gray-900 font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Google Maps embed */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <iframe
                src="https://www.google.com/maps?q=17.39220101772486,78.59767307229966&z=17&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
            />
          </div>

          {/* Note about maps */}
          <p className="text-center text-xs text-gray-400">
            Map not loading?{' '}
            <a href={hospitalInfo.googleMapsUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              Open in Google Maps →
            </a>
          </p>

        </div>
      </section>

    </div>
  )
}

export default Contact