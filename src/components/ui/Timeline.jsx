import Badge from './Badge'

// Record type color mapping with healthcare theme
const typeColors = {
  Consultation: 'info',
  'Blood Test': 'warning',
  'Urine Test': 'warning',
  'X-Ray': 'gray',
  ECG: 'danger',
  Ultrasound: 'gray',
  Other: 'gray',
}

// Patient history timeline component with healthcare theme
const Timeline = ({ records }) => {
  if (!records || records.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p className="text-5xl mb-3">📋</p>
        <p className="text-sm font-medium">No history records yet.</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />

      <div className="space-y-6">
        {records.map((record, index) => (
          <div key={record.id || index} className="relative flex gap-4 pl-10">
            {/* Dot */}
            <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-healthcare-900 border-2 border-white shadow" />

            {/* Card */}
            <div className="flex-1 bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant={typeColors[record.record_type] || 'gray'}>
                  {record.record_type}
                </Badge>
                <span className="text-xs text-slate-500">
                  {new Date(record.record_date).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </span>
                {record.doctor_name && (
                  <span className="text-xs text-slate-600 ml-auto font-medium">
                    👨‍⚕️ {record.doctor_name}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-900 font-medium">{record.summary}</p>
              {record.remarks && (
                <p className="text-xs text-slate-600 mt-2 italic">{record.remarks}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline