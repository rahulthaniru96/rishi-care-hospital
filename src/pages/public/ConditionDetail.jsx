import { useParams, Link } from 'react-router-dom'
import { conditions } from '../../data/conditions'
import { hospitalInfo } from '../../data/hospitalInfo'

const ConditionDetail = () => {
  const { slug } = useParams()
  const condition = conditions.find(c => c.slug === slug)

  if (!condition) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 pb-20 lg:pb-0">
        <div className="text-6xl">🏥</div>
        <h2 className="text-3xl font-bold text-slate-900">Condition Not Found</h2>
        <p className="text-slate-600 text-center max-w-md">
          The condition you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/conditions"
          className="mt-2 rounded-xl bg-[#0C4A6E] px-6 py-3 font-semibold text-white hover:bg-[#1E6B94] transition-all duration-300"
        >
          ← Back to Conditions
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=600&fit=crop" alt="Medical consultation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C4A6E]/90 to-[#0C4A6E]/70" />
        </div>
        <div className="container relative z-10 max-w-4xl mx-auto px-4 text-white">
          <Link to="/conditions" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition mb-4">
            ← All Conditions
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {condition.title}
          </h1>
        </div>
      </section>

      <div className="container max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Overview */}
        <div className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-4">
            📋 Overview
          </h2>
          <p className="leading-7 text-slate-600">
            {condition.overview}
          </p>
        </div>

        {/* Symptoms */}
        <div className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-5">
            🤒 Symptoms
          </h2>
          <ul className="space-y-3">
            {condition.symptoms.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-red-500 flex-shrink-0"></span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Remedies */}
        <div className="border border-slate-200 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 mb-5">
            🌿 Home Remedies & Prevention
          </h2>
          <ul className="space-y-3">
            {condition.remedies.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs font-bold flex-shrink-0">
                  ✓
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="border border-amber-200 rounded-xl bg-amber-50 p-5">
          <h3 className="font-bold text-amber-800 mb-2">⚠️ Medical Disclaimer</h3>
          <p className="text-amber-700 leading-7 text-sm">
            These are general health tips. Always consult a qualified doctor for proper diagnosis and treatment. Self-medication is not recommended.
          </p>
        </div>

        {/* CTA */}
        <div className="border border-slate-200 rounded-xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Experiencing These Symptoms?
          </h2>
          <p className="mx-auto max-w-xl text-slate-600 mb-6">
            Visit Rishi Care Hospital for proper diagnosis and expert medical treatment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`tel:${hospitalInfo.phone}`}
              className="rounded-xl bg-[#0C4A6E] px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#1E6B94] hover:-translate-y-1 hover:shadow-lg"
            >
              📞 Call Hospital
            </a>
            <a
              href={`https://wa.me/${hospitalInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:-translate-y-1 hover:shadow-lg"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConditionDetail
