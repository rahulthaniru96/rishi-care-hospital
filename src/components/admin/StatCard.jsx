// Dashboard summary stat card with premium styling
const StatCard = ({ title, value, icon, color = 'healthcare', onClick }) => {
  const colors = {
    healthcare: 'bg-healthcare-100 text-healthcare-900',
    blue: 'bg-healthcare-100 text-healthcare-900',
    green: 'bg-success/10 text-success',
    yellow: 'bg-warning/10 text-warning',
    red: 'bg-emergency/10 text-emergency',
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4 ${onClick ? 'cursor-pointer hover:border-healthcare-200' : ''}`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-semibold ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <p className="text-2xl md:text-3xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  )
}

export default StatCard