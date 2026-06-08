import { doctors } from '../../data/doctors'
import { hospitalInfo } from '../../data/hospitalInfo'

const Doctors = () => {
  return (
    <div className="pb-24 lg:pb-0">

      {/* Header */}
      <section className="bg-blue-700 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Our Doctors</h1>
        <p className="text-blue-200 text-sm">Meet the experienced physicians at Rishi Care Hospital</p>
      </section>

      {/* Doctors */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {doctors.map(doc => (
            <div key={doc.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-36 h-36 rounded-2xl object-cover border-4 border-blue-50 self-center md:self-start flex-shrink-0"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{doc.name}</h2>
                  <p className="text-blue-700 font-semibold text-sm mt-0.5">{doc.qualifications}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{doc.specialization}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {doc.specialties.map(s => (
                      <span key={s} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">{s}</span>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-xl text-sm text-gray-600 flex items-center gap-2">
                    🕐 <span><strong>Available:</strong> {doc.available}</span>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <a href={`tel:${hospitalInfo.phone}`}
                      className="bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors">
                      📞 Book Appointment
                    </a>
                    <a href={`https://wa.me/${hospitalInfo.whatsapp}`} target="_blank" rel="noreferrer"
                      className="bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-green-600 transition-colors">
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Doctors