import { useParams, Link } from 'react-router-dom'
import { healthTips } from '../../data/healthTips'
import { hospitalInfo } from '../../data/hospitalInfo'

const tipImages = {
  'prevent-kidney-stones': 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1600&h=600&fit=crop',
  'diabetes-awareness': 'https://images.unsplash.com/photo-1593491034932-844ab981ed7c?w=1600&h=600&fit=crop',
  'bp-management': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=600&fit=crop',
  'dengue-prevention': '',
}

const tipStyles = {
  '✅': {
    card: 'border-l-4 border-green-500 bg-white',
    icon: 'bg-green-100 text-green-600',
    title: 'Recommended',
  },
  '❌': {
    card: 'border-l-4 border-red-500 bg-white',
    icon: 'bg-red-100 text-red-600',
    title: 'Avoid',
  },
  '⚠️': {
    card: 'border-l-4 border-amber-500 bg-white',
    icon: 'bg-amber-100 text-amber-600',
    title: 'Important',
  },
}

const HealthTipDetail = () => {
  const { slug } = useParams()
  const tip = healthTips.find((t) => t.slug === slug)

  if (!tip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-4 pb-20 lg:pb-0">
        <div className="text-6xl">💡</div>
        <h2 className="text-3xl font-bold text-slate-800">Health Tip Not Found</h2>
        <p className="text-slate-500 text-center max-w-md">
          The article you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/health-tips"
          className="mt-2 rounded-xl bg-[#0C4A6E] px-6 py-3 font-semibold text-white hover:bg-[#1E6B94] transition"
        >
          ← Back to Health Tips
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-20 lg:pb-0">
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          {tipImages[tip.slug] ? (
            <img src={tipImages[tip.slug]} alt={tip.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0C4A6E] to-[#1A7AB5]" />
          )}
          <div className="absolute inset-0 bg-[#0C4A6E]/80" />
        </div>
        <div className="container relative z-10 max-w-4xl mx-auto text-white">
          <Link to="/health-tips" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition mb-6">← Back to Health Tips</Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{tip.title}</h1>
          <p className="text-lg text-white/80 leading-relaxed">{tip.summary}</p>
        </div>
      </section>

      {/* Content */}
      <div className="container max-w-5xl mx-auto px-4 py-12 space-y-5">
        {tip.tips.map((item, i) => {
          const style =
            tipStyles[item.icon] || {
              card: 'border-l-4 border-slate-400 bg-white',
              icon: 'bg-slate-100 text-slate-600',
              title: 'Health Tip',
            }

          return (
            <div
              key={i}
              className={`${style.card} border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-xl ${style.icon}`}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wide text-slate-600 mb-2">
                    {style.title}
                  </span>
                  <p className="text-sm leading-7 text-slate-700">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {/* Medical Note */}
        {tip.note && (
          <div className="border-l-4 border-[#0C4A6E] border border-sky-100 rounded-xl bg-sky-50 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0C4A6E] text-white text-lg flex-shrink-0">
                📌
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0C4A6E] mb-1">Medical Note</h3>
                <p className="leading-7 text-slate-700 text-sm">{tip.note}</p>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-xl bg-gradient-to-r from-[#0C4A6E] to-[#1A7AB5] p-8 text-center shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Need Professional Medical Advice?
          </h2>
          <p className="mx-auto max-w-xl text-white/80 mb-6">
            Consult our experienced doctors for proper diagnosis and treatment. Contact us today for trusted healthcare services.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={`tel:${hospitalInfo.phone}`}
              className="rounded-xl bg-white px-8 py-3 font-semibold text-[#0C4A6E] transition hover:bg-slate-100"
            >
              📞 Call Hospital
            </a>
            <a
              href={`https://wa.me/${hospitalInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthTipDetail
