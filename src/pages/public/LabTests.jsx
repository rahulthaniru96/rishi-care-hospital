import { labTests } from '../../data/labTests'
import { hospitalInfo } from '../../data/hospitalInfo'

const LabTests = () => {
  return (
    <div className="pb-24 lg:pb-0">

      <section className="bg-blue-700 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Lab Tests</h1>
        <p className="text-blue-200 text-sm">In-house diagnostic laboratory for accurate, fast results</p>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {labTests.map(test => (
            <div key={test.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                {test.id}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{test.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{test.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
          <p className="text-gray-700 text-sm mb-3">For test availability and pricing, please contact us.</p>
          <a href={`tel:${hospitalInfo.phone}`}
            className="bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-800 transition-colors inline-block">
            📞 Contact Lab
          </a>
        </div>
      </section>

    </div>
  )
}

export default LabTests