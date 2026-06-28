import { services } from '../../data/services'
import { hospitalInfo } from '../../data/hospitalInfo'

const Services = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Header */}
      <section className="relative py-20 md:py-28 overflow-hidden text-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=1600&h=600&fit=crop" alt="Medical equipment" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C4A6E]/90 to-[#0C4A6E]/70" />
        </div>
        <div className="container relative z-10 max-w-5xl mx-auto px-4 text-white">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold tracking-wide text-white/90 mb-4">
            WHAT WE OFFER
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Medical Services
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Comprehensive healthcare delivered with excellence. State-of-the-art facilities and expert care under one roof.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {services.map(s => (
              <div
                key={s.id}
                className="border border-slate-200 rounded-xl bg-white p-5 group hover:shadow-lg hover:border-[#0C4A6E]/30 transition-all duration-300 flex flex-col"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                <h3 className="font-bold text-base text-slate-900 mb-2 group-hover:text-[#0C4A6E] transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-sky-50 text-[#0C4A6E] rounded-full text-xs font-semibold tracking-wide mb-3">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Healthcare Excellence</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              We're committed to providing the highest standard of medical care with compassion and professionalism.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { icon: '👨‍⚕️', title: 'Expert Doctors', description: 'Internationally trained specialists with decades of experience in their fields.' },
              { icon: '🏥', title: 'Modern Facilities', description: 'State-of-the-art diagnostic and treatment equipment for accurate care.' },
              { icon: '⏰', title: '24/7 Emergency', description: 'Always available when you need us, day or night for emergency care.' },
              { icon: '💙', title: 'Patient-Focused', description: 'Your comfort and health are our highest priorities in every interaction.' },
              { icon: '🔬', title: 'Latest Technology', description: 'Advanced diagnostic tools and treatment methods for optimal outcomes.' },
              { icon: '🌟', title: 'Premium Care', description: 'Compassionate, professional service that exceeds expectations.' },
            ].map((benefit, i) => (
              <div key={i} className="border border-slate-200 rounded-xl bg-white p-5 text-center hover:shadow-md transition-shadow">
                <p className="text-3xl mb-3">{benefit.icon}</p>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{benefit.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#0C4A6E] to-[#1A7AB5] text-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Specific Service?</h2>
            <p className="text-lg text-white/80 mb-8">
              Our healthcare professionals are ready to help guide you to the right care. Contact us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${hospitalInfo.phone}`}
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0C4A6E] font-semibold rounded-lg hover:bg-slate-50 transition-all shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call: {hospitalInfo.phone}
              </a>
              <a
                href={`https://wa.me/${hospitalInfo.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                </svg>
                Message WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
