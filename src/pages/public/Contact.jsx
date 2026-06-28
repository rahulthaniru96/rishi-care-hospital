import { hospitalInfo } from '../../data/hospitalInfo'

const Contact = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Header */}
      <section className="relative py-20 md:py-28 overflow-hidden text-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=600&fit=crop" alt="Hospital reception" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C4A6E]/90 to-[#0C4A6E]/70" />
        </div>
        <div className="container relative z-10 max-w-5xl mx-auto px-4 text-white">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold tracking-wide text-white/90 mb-4">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            We're available 24/7 for emergencies. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Quick Contact Buttons */}
      <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <a
              href={`tel:${hospitalInfo.phone}`}
              className="border border-slate-200 rounded-xl bg-white p-4 text-center group hover:shadow-md hover:border-[#0C4A6E]/30 transition-all"
            >
              <p className="text-3xl mb-2">📞</p>
              <p className="font-semibold text-slate-900 text-sm mb-0.5">Call Now</p>
              <p className="text-xs text-slate-500">Immediate assistance</p>
            </a>
            <a
              href={`https://wa.me/${hospitalInfo.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="border border-slate-200 rounded-xl bg-white p-4 text-center group hover:shadow-md hover:border-[#0C4A6E]/30 transition-all"
            >
              <p className="text-3xl mb-2">💬</p>
              <p className="font-semibold text-slate-900 text-sm mb-0.5">WhatsApp</p>
              <p className="text-xs text-slate-500">Quick messaging</p>
            </a>
            <a
              href={`sms:${hospitalInfo.phone}`}
              className="border border-slate-200 rounded-xl bg-white p-4 text-center group hover:shadow-md hover:border-[#0C4A6E]/30 transition-all"
            >
              <p className="text-3xl mb-2">✉️</p>
              <p className="font-semibold text-slate-900 text-sm mb-0.5">SMS</p>
              <p className="text-xs text-slate-500">Text message</p>
            </a>
            <a
              href={hospitalInfo.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="border border-slate-200 rounded-xl bg-white p-4 text-center group hover:shadow-md hover:border-[#0C4A6E]/30 transition-all"
            >
              <p className="text-3xl mb-2">📍</p>
              <p className="font-semibold text-slate-900 text-sm mb-0.5">Directions</p>
              <p className="text-xs text-slate-500">Get directions</p>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Hospital Information</h2>

              {/* Address */}
              <div className="flex gap-4 mb-6">
                <div className="w-11 h-11 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#0C4A6E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1 text-sm">Address</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{hospitalInfo.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 mb-6">
                <div className="w-11 h-11 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#0C4A6E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.02.04.048.082.074.124 1.476 2.214 3.76 4.498 5.974 5.974.042.026.084.054.124.074l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1 text-sm">Phone</p>
                  <a href={`tel:${hospitalInfo.phone}`} className="text-[#0C4A6E] hover:text-[#1E6B94] font-semibold text-sm">
                    {hospitalInfo.phone}
                  </a>
                  <p className="text-slate-500 text-xs mt-1">Call for appointments & emergencies</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 mb-6">
                <div className="w-11 h-11 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#0C4A6E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1 text-sm">Email</p>
                  <a href={`mailto:${hospitalInfo.email}`} className="text-[#0C4A6E] hover:text-[#1E6B94] font-semibold text-sm break-all">
                    {hospitalInfo.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="w-11 h-11 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#0C4A6E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="w-full">
                  <p className="font-semibold text-slate-900 mb-3 text-sm">Working Hours</p>
                  <div className="space-y-2">
                    {hospitalInfo.hours.map(h => (
                      <div key={h.day} className="flex justify-between items-center text-sm bg-slate-50 p-2.5 rounded-lg">
                        <span className="text-slate-700 font-medium">{h.day}</span>
                        <span className="text-slate-900 font-semibold">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Location</h2>
              <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 h-96">
                <iframe
                  src="https://www.google.com/maps?q=17.39220101772486,78.59767307229966&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Hospital Location"
                />
              </div>
              <p className="text-center text-xs text-slate-500 mt-3">
                Map not loading?{' '}
                <a
                  href={hospitalInfo.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0C4A6E] hover:text-[#1E6B94] font-semibold"
                >
                  Open in Google Maps →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="py-8 md:py-10 bg-red-50 border-y border-red-100">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-4 max-w-3xl mx-auto">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-red-700 text-lg">Medical Emergency?</p>
              <p className="text-slate-700 text-sm">
                Call <a href={`tel:${hospitalInfo.phone}`} className="font-semibold text-red-600 hover:underline">{hospitalInfo.phone}</a> immediately. We're available 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
