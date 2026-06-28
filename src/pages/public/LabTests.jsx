import { labTests } from '../../data/labTests'
import { hospitalInfo } from '../../data/hospitalInfo'

const LabTests = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Header */}
      <section className="relative py-20 md:py-28 overflow-hidden text-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=1600&h=600&fit=crop" alt="Laboratory testing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C4A6E]/90 to-[#0C4A6E]/70" />
        </div>
        <div className="container relative z-10 max-w-5xl mx-auto px-4 text-white">
          <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold tracking-wide text-white/90 mb-4">
            DIAGNOSTICS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Lab Tests
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            In-house diagnostic laboratory for accurate, fast results
          </p>
        </div>
      </section>

      {/* Tests List */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container max-w-3xl mx-auto px-4 space-y-4">
          {labTests.map(test => (
            <div key={test.id} className="border border-slate-200 rounded-xl bg-white p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-[#0C4A6E] font-bold text-sm flex-shrink-0">
                {test.id}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{test.name}</h3>
                <p className="text-slate-500 text-sm mt-1">{test.description}</p>
              </div>
            </div>
          ))}

          {/* Contact Lab CTA */}
          <div className="border border-sky-100 rounded-xl bg-sky-50 p-5 text-center mt-8">
            <p className="text-slate-700 text-sm mb-3">For test availability and pricing, please contact us.</p>
            <a
              href={`tel:${hospitalInfo.phone}`}
              className="inline-block bg-[#0C4A6E] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1E6B94] transition-colors"
            >
              📞 Contact Lab
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LabTests
