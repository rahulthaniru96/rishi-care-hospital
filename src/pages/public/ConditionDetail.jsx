import { useParams, Link } from 'react-router-dom'
import { conditions } from '../../data/conditions'

const ConditionDetail = () => {
  const { slug } = useParams()
  const condition = conditions.find(c => c.slug === slug)

  if (!condition) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500 pb-24">
        <p className="text-5xl">🏥</p>
        <p className="text-lg font-medium">Condition not found</p>
        <Link to="/conditions" className="text-blue-700 text-sm hover:underline">← Back to conditions</Link>
      </div>
    )
  }

  return (
    <div className="pb-24 lg:pb-0">

      {/* Header */}
      <section className="bg-blue-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/conditions" className="text-blue-200 text-sm hover:text-white mb-4 inline-block">← All Conditions</Link>
          <h1 className="text-3xl font-bold">{condition.title}</h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* Overview */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            📋 Overview
          </h2>
          <p className="text-gray-600 leading-relaxed">{condition.overview}</p>
        </div>

        {/* Symptoms */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            🤒 Symptoms
          </h2>
          <ul className="space-y-2">
            {condition.symptoms.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="mt-0.5 text-red-400 flex-shrink-0">●</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Home Remedies */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            🌿 Home Remedies & Prevention
          </h2>
          <ul className="space-y-3">
            {condition.remedies.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                <span className="mt-0.5 text-green-500 flex-shrink-0 font-bold">✓</span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-sm text-yellow-800">
          ⚠️ <strong>Note:</strong> These are general health tips. Always consult a doctor for proper diagnosis and treatment.
        </div>

        {/* CTA */}
        <div className="bg-blue-700 rounded-2xl p-6 text-white text-center">
          <h3 className="font-bold text-lg mb-2">Experiencing these symptoms?</h3>
          <p className="text-blue-200 text-sm mb-4">Visit Rishi Care Hospital — we're available 24/7.</p>
          <a href="tel:+919391156294"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors inline-block">
            📞 Call Now
          </a>
        </div>

      </div>
    </div>
  )
}

export default ConditionDetail