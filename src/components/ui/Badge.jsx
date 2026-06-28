// Badge for status labels like Low Stock, Near Expiry, etc.
const Badge = ({ children, variant = 'info', className = '' }) => {
  const variants = {
    info: 'bg-healthcare-100 text-healthcare-900',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-emergency/10 text-emergency',
    emergency: 'bg-emergency/10 text-emergency',
    gray: 'bg-slate-100 text-slate-700',
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge