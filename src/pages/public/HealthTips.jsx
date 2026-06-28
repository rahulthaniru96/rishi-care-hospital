import { Link } from 'react-router-dom'
import { healthTips } from '../../data/healthTips'

const tipImages = {
  'prevent-kidney-stones': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=600&h=400&fit=crop',
  'diabetes-awareness': 'https://images.unsplash.com/photo-1593491034932-844ab981ed7c?w=600&h=400&fit=crop',
  'bp-management': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
  'dengue-prevention': '',
}

const categoryMap = {
  'prevent-kidney-stones': { label: 'Kidney Health', color: 'bg-amber-100 text-amber-700' },
  'diabetes-awareness': { label: 'Diabetes', color: 'bg-rose-100 text-rose-700' },
  'bp-management': { label: 'Heart Care', color: 'bg-red-100 text-red-700' },
  'dengue-prevention': { label: 'Prevention', color: 'bg-emerald-100 text-emerald-700' },
}

const HealthTips = () => {
  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1600&h=600&fit=crop" alt="Health and wellness" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C4A6E]/90 to-[#0C4A6E]/70" />
        </div>
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Health Tips</h1>
          <p className="text-lg text-white/80">Simple, practical advice for a healthier life.</p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthTips.map(tip => {
              const cat = categoryMap[tip.slug] || { label: 'Health', color: 'bg-slate-100 text-slate-700' }
              return (
                <Link
                  key={tip.slug}
                  to={`/health-tips/${tip.slug}`}
                  className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-48 relative overflow-hidden">
                    {tipImages[tip.slug] ? (
                      <img
                        src={tipImages[tip.slug]}
                        alt={tip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-teal-100 to-emerald-200 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                        🦟
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 ${cat.color} text-xs font-semibold rounded-full`}>{cat.label}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#0C4A6E] transition-colors">{tip.title}</h3>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">{tip.summary}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-sm font-semibold text-emerald-600">Read Full Article →</span>
                      <span className="text-xs text-slate-400">2 min read</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HealthTips
