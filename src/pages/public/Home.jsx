import { Link } from 'react-router-dom'
import { hospitalInfo } from '../../data/hospitalInfo'
import { doctors } from '../../data/doctors'
import { services } from '../../data/services'
import { conditions } from '../../data/conditions'
import { healthTips } from '../../data/healthTips'

const tipImages = {
  'prevent-kidney-stones': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=400&fit=crop',
  'diabetes-awareness': 'https://images.unsplash.com/photo-1593491034932-844ab981ed7c?w=600&h=400&fit=crop',
  'bp-management': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
  'dengue-prevention': '',
}

const tipCategories = {
  'prevent-kidney-stones': 'Kidney Health',
  'diabetes-awareness': 'Diabetes',
  'bp-management': 'Heart Care',
  'dengue-prevention': 'Prevention',
}

const Home = () => {
  return (
    <div>
      {/* ─── HERO WITH IMAGE ─── */}
      <section className="relative min-h-[520px] md:min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop"
            alt="Modern hospital interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0C4A6E]/[0.92]" />
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full text-sm font-medium !text-white mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Trusted Healthcare Since 2020
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
              Your Health,<br />
              <span className="text-emerald-300">Our Purpose</span>
            </h1>

            <p className="text-lg text-white leading-relaxed mb-8 max-w-lg drop-shadow-sm">
              World-class medical care delivered with compassion. Trusted by thousands of families across Hyderabad.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href={`tel:${hospitalInfo.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0C4A6E] font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call Now
              </a>
              <a
                href={`https://wa.me/${hospitalInfo.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
                WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 max-w-md">
              {[
                { label: 'Specialists', value: '2' },
                { label: 'Services', value: '7+' },
                { label: 'Conditions', value: '20+' },
                { label: 'Emergency', value: '24/7' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center border border-white/20">
                  <p className="text-xl font-bold text-white drop-shadow-sm">{stat.value}</p>
                  <p className="text-[10px] text-white drop-shadow-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SPECIALISTS ─── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-emerald-600 tracking-wider uppercase mb-2">Expert Team</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Meet Our Specialists</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Experienced physicians with decades of expertise and a patient-first approach.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {doctors.map(doc => (
              <div key={doc.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={doc.id === 1
                      ? 'https://lh3.googleusercontent.com/pw/AP1GczM8KLUft2t272IVv_YNS_cFAKLIkPylzuvkZ2klp0SdXML_HM_mJ7-BIJ7t1JIdbEqUqcK3CaZB-mfIkr9oCyWXchqyIjW_CMe3MkECDGFoTbSPRUnHMTLScYoq-8AzJpmMDcY9SubTKrsB3910C9Uv=w727-h730-s-no-gm'
                      : 'https://lh3.googleusercontent.com/pw/AP1GczM1JGp9S10MPWD-d0mSrgfadMBdA7GBMBLKmQ-Nme1N5AuwZTro-eLMAHgGU5X7fuji8hqP9ZsApa_pOEUnNu5ftXQ_pXYtRrnWukFswUBMFI2MLklnoNRDEpX2eLiZCe1WRVlyYnImuklrJ51E74N1=w724-h747-s-no-gm'}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">{doc.specialization}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{doc.name}</h3>
                  <p className="text-sm text-[#0C4A6E] font-medium mb-3">{doc.qualifications}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {doc.specialties.map(s => (
                      <span key={s} className="px-2.5 py-0.5 bg-sky-50 text-[#0C4A6E] text-[11px] font-medium rounded-full border border-sky-100">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-500">🕐 {doc.available}</span>
                    <Link to="/doctors" className="text-sm font-semibold text-[#0C4A6E] hover:text-emerald-600 transition-colors">
                      View Profile →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#0C4A6E] tracking-wider uppercase mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Our Medical Services</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Comprehensive healthcare under one roof.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {services.map((s, i) => {
              const colors = ['bg-sky-50 text-sky-600 border-sky-100', 'bg-emerald-50 text-emerald-600 border-emerald-100', 'bg-rose-50 text-rose-600 border-rose-100', 'bg-amber-50 text-amber-600 border-amber-100', 'bg-violet-50 text-violet-600 border-violet-100', 'bg-teal-50 text-teal-600 border-teal-100', 'bg-orange-50 text-orange-600 border-orange-100']
              const colorClass = colors[i % colors.length]
              return (
                <div key={s.id} className="bg-white border border-slate-200 rounded-xl p-5 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 ${colorClass} rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 border group-hover:scale-110 transition-transform`}>
                    {s.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-[#0C4A6E] hover:text-[#0C4A6E] transition-all">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CONDITIONS ─── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-amber-50/50">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-semibold text-rose-500 tracking-wider uppercase mb-2">Conditions Treated</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Expertise Across Specialties</h2>
            </div>
            <Link to="/conditions" className="text-sm font-semibold text-[#0C4A6E] hover:text-emerald-600 transition-colors shrink-0">
              View all conditions →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {conditions.slice(0, 6).map((c, i) => {
              const accents = ['border-l-sky-500', 'border-l-emerald-500', 'border-l-rose-500', 'border-l-amber-500', 'border-l-violet-500', 'border-l-teal-500']
              return (
                <Link
                  key={c.slug}
                  to={`/conditions/${c.slug}`}
                  className={`group bg-white border border-slate-200 border-l-4 ${accents[i % accents.length]} rounded-xl p-5 hover:shadow-md transition-all duration-300`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 group-hover:text-[#0C4A6E] transition-colors">{c.title}</h3>
                    <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-3">{c.overview}</p>
                  <div className="flex gap-2">
                    <span className="text-[11px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-medium">{c.symptoms.length} Symptoms</span>
                    <span className="text-[11px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">{c.remedies.length} Remedies</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── HEALTH TIPS WITH IMAGES ─── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-emerald-50/60 to-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-amber-600 tracking-wider uppercase mb-2">Wellness Blog</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Health Tips & Advice</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Evidence-based tips for a healthier lifestyle.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {healthTips.map(tip => (
              <Link
                key={tip.slug}
                to={`/health-tips/${tip.slug}`}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-40 relative overflow-hidden">
                  {tipImages[tip.slug] ? (
                    <img
                      src={tipImages[tip.slug]}
                      alt={tip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-teal-100 to-emerald-200 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500">
                      🦟
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-slate-700 rounded-full">
                      {tipCategories[tip.slug] || 'Health'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 text-sm mb-1.5 group-hover:text-[#0C4A6E] transition-colors leading-snug">{tip.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">{tip.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-600">Read Article →</span>
                    <span className="text-[10px] text-slate-400">2 min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-violet-50/40 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-violet-600 tracking-wider uppercase mb-2">Patient Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Trusted by Our Community</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { text: "Excellent care and professional staff. The diagnosis was quick and accurate. Highly recommend!", author: "Rajesh Kumar", role: "Patient, 2025", avatar: "RK", color: "bg-sky-100 text-sky-700" },
              { text: "Very compassionate team. They made my daughter comfortable during treatment.", author: "Priya Sharma", role: "Parent, 2025", avatar: "PS", color: "bg-rose-100 text-rose-700" },
              { text: "Best care in the area. Recovery has been smooth. Thank you to the entire team!", author: "Manish Bhat", role: "Post-operative, 2025", avatar: "MB", color: "bg-emerald-100 text-emerald-700" },
            ].map((review, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative">
                <svg className="w-8 h-8 text-slate-100 absolute top-4 right-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{review.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-xs font-bold`}>{review.avatar}</div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{review.author}</p>
                    <p className="text-xs text-slate-400">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/reviews" className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-[#0C4A6E] hover:text-[#0C4A6E] transition-all">
              View All Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA WITH IMAGE ─── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&h=600&fit=crop"
            alt="Hospital building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C4A6E]/95 to-[#0C4A6E]/80" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Premium Care?</h2>
            <p className="text-lg text-white/80 mb-8">Contact us today to schedule your appointment or visit our clinic.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`tel:${hospitalInfo.phone}`} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#0C4A6E] font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg">
                📞 Call: {hospitalInfo.phone}
              </a>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-all border border-white/25">
                📍 Get Directions
              </Link>
            </div>
            <p className="text-sm text-white/50 mt-8">{hospitalInfo.address}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
