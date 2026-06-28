import { Link } from 'react-router-dom'
import { conditions } from '../../data/conditions'
import { hospitalInfo } from '../../data/hospitalInfo'

const Conditions = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Header */}
      <section className="relative py-20 md:py-28 overflow-hidden text-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=600&fit=crop" alt="Medical research" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C4A6E]/90 to-[#0C4A6E]/70" />
        </div>
        <div className="container relative z-10 max-w-5xl mx-auto px-4 text-white">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold tracking-wide text-white/90 mb-4">
            CONDITIONS TREATED
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Expertise Across Specialties
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            We provide expert diagnosis and treatment for a wide range of medical conditions. Click on any condition to learn about symptoms and remedies.
          </p>
        </div>
      </section>

      {/* Conditions Grid */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {conditions.map(c => (
              <Link
                key={c.slug}
                to={`/conditions/${c.slug}`}
                className="border border-slate-200 rounded-xl bg-white p-5 group hover:shadow-lg hover:border-[#0C4A6E]/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#0C4A6E] transition-colors flex-grow leading-tight">
                    {c.title}
                  </h3>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-[#0C4A6E] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                  {c.overview}
                </p>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 text-xs bg-sky-50 text-[#0C4A6E] px-2.5 py-1 rounded-full font-medium">
                    {c.symptoms.length} Symptoms
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium">
                    {c.remedies.length} Remedies
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fallback CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Don't See Your Condition?</h2>
            <p className="text-lg text-slate-600 mb-8">
              Our experienced doctors can help diagnose and treat a wide range of health conditions. If you have concerns about a specific condition not listed, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${hospitalInfo.phone}`}
                className="inline-flex items-center justify-center px-8 py-3 bg-[#0C4A6E] text-white font-semibold rounded-lg hover:bg-[#1E6B94] transition-all shadow-md hover:shadow-lg"
              >
                Call for Consultation
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#0C4A6E] text-[#0C4A6E] font-semibold rounded-lg hover:bg-[#0C4A6E] hover:text-white transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Conditions
