import { doctors } from '../../data/doctors'
import { hospitalInfo } from '../../data/hospitalInfo'

const Doctors = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero with image */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1551190822-a9ce113ac100?w=1600&h=600&fit=crop" alt="Medical team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C4A6E]/90 to-[#0C4A6E]/70" />
        </div>
        <div className="container relative z-10 text-center text-white">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/20 rounded-full text-xs font-semibold mb-4">EXPERT TEAM</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Specialists</h1>
          <p className="max-w-2xl mx-auto text-lg text-white/80">Experienced physicians dedicated to delivering compassionate, evidence-based healthcare.</p>
        </div>
      </section>

      {/* Doctor Cards */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctors.map(doc => (
              <div key={doc.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="h-64 relative overflow-hidden">
                  <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">{doc.specialization}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h2>
                  <p className="text-sm font-semibold text-[#0C4A6E] mb-3">{doc.qualifications}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-slate-100">
                    {doc.specialties.map(s => (
                      <span key={s} className="px-2.5 py-1 bg-sky-50 text-[#0C4A6E] text-xs font-medium rounded-full border border-sky-100">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-5 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                    <span className="text-amber-600 text-sm">🕐</span>
                    <div>
                      <p className="text-[11px] text-amber-700 font-semibold uppercase">Availability</p>
                      <p className="text-sm text-slate-700">{doc.available}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <a href={`tel:${hospitalInfo.phone}`} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0C4A6E] text-white font-semibold text-sm rounded-lg hover:bg-[#0A3D5C] transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      Call
                    </a>
                    <a href={`https://wa.me/${hospitalInfo.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-semibold text-sm rounded-lg hover:bg-emerald-700 transition-colors">
                      💬 Chat
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&h=400&fit=crop" alt="Hospital" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0C4A6E]/90" />
        </div>
        <div className="container relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Schedule Your Consultation?</h2>
          <p className="text-lg text-white/80 mb-8">Our doctors are ready to help you achieve your health goals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${hospitalInfo.phone}`} className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0C4A6E] font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg">
              Call Now: {hospitalInfo.phone}
            </a>
            <a href={`https://wa.me/${hospitalInfo.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all shadow-lg">
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Doctors
