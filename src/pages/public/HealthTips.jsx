import { Link } from 'react-router-dom'
import { healthTips } from '../../data/healthTips'

const iconMap = {
  'prevent-kidney-stones': '🫘',
  'diabetes-awareness': '🩸',
  'bp-management': '❤️',
  'dengue-prevention': '🦟',
}

const HealthTips = () => {
  return (
    <div className="pb-24 lg:pb-0">

      <section className="bg-blue-700 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Health Tips</h1>
        <p className="text-blue-200 text-sm">Simple, practical advice for a healthier life</p>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {healthTips.map(tip => (
            <Link
              key={tip.slug}
              to={`/health-tips/${tip.slug}`}
              className="bg-white border border-gray-100 hover:border-blue-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
            >
              <span className="text-4xl block mb-3">{iconMap[tip.slug] || '💡'}</span>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">{tip.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{tip.summary}</p>
              <p className="text-blue-700 text-xs font-semibold mt-4">Read tips →</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}

export default HealthTips