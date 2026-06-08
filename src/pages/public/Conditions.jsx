import { Link } from 'react-router-dom'
import { conditions } from '../../data/conditions'

const Conditions = () => {
  return (
    <div className="pb-24 lg:pb-0">

      <section className="bg-blue-700 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Conditions We Treat</h1>
        <p className="text-blue-200 text-sm">Click on any condition to learn more — symptoms, overview, and home remedies</p>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {conditions.map(c => (
            <Link
              key={c.slug}
              to={`/conditions/${c.slug}`}
              className="bg-white border border-gray-100 hover:border-blue-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{c.title}</h3>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">{c.overview}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                  {c.symptoms.length} symptoms
                </span>
                <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                  {c.remedies.length} remedies
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Conditions