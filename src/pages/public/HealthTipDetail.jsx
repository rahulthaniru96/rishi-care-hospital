import { useParams, Link } from 'react-router-dom'
import { healthTips } from '../../data/healthTips'

const iconColors = {
  '✅': 'bg-green-50 border-green-200 text-green-800',
  '❌': 'bg-red-50 border-red-200 text-red-800',
  '⚠️': 'bg-yellow-50 border-yellow-200 text-yellow-800',
}

const HealthTipDetail = () => {
  const { slug } = useParams()
  const tip = healthTips.find(t => t.slug === slug)

  if (!tip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500 pb-24">
        <p className="text-5xl">💡</p>
        <p className="text-lg font-medium">Health tip not found</p>
        <Link to="/health-tips" className="text-blue-700 text-sm hover:underline">← Back to health tips</Link>
      </div>
    )
  }

  return (
    <div className="pb-24 lg:pb-0">

      <section className="bg-blue-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/health-tips" className="text-blue-200 text-sm hover:text-white mb-4 inline-block">← Health Tips</Link>
          <h1 className="text-3xl font-bold">{tip.title}</h1>
          <p className="text-blue-200 mt-2 text-sm">{tip.summary}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        {tip.tips.map((item, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 border rounded-2xl p-4 ${iconColors[item.icon] || 'bg-gray-50 border-gray-200 text-gray-800'}`}
          >
            <span className="text-2xl flex-shrink-0">{item.icon}</span>
            <p className="text-sm leading-relaxed font-medium">{item.text}</p>
          </div>
        ))}

        {tip.note && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-800 mt-4">
            📌 <strong>Note:</strong> {tip.note}
          </div>
        )}

        <div className="bg-blue-700 rounded-2xl p-6 text-white text-center mt-6">
          <h3 className="font-bold text-lg mb-2">Need medical advice?</h3>
          <p className="text-blue-200 text-sm mb-4">Our doctors are available 24/7 for consultations.</p>
          <a href="tel:+919391156294"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors inline-block">
            📞 Call Now
          </a>
        </div>
      </div>
    </div>
  )
}

export default HealthTipDetail