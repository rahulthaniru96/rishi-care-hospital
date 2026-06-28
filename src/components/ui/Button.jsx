// Reusable Button component with premium healthcare styling
const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '', type = 'button', disabled = false }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-healthcare-500 active:scale-[0.98]'

  const variants = {
    // Primary: Dark healthcare blue
    primary: 'bg-healthcare-900 text-white shadow-md hover:bg-healthcare-800 hover:shadow-lg focus-visible:ring-healthcare-500',
    
    // Secondary: Light blue with borders
    secondary: 'bg-healthcare-50 text-healthcare-900 border-2 border-healthcare-200 hover:bg-healthcare-100 hover:border-healthcare-300 focus-visible:ring-healthcare-500',
    
    // Outline: Just borders
    outline: 'bg-white text-healthcare-900 border-2 border-healthcare-900 hover:bg-healthcare-50 focus-visible:ring-healthcare-500',
    
    // Danger: Red for critical actions
    danger: 'bg-emergency text-white shadow-md hover:bg-red-700 hover:shadow-lg focus-visible:ring-emergency',
    
    // Success: Green for confirmations
    success: 'bg-success text-white shadow-md hover:bg-green-700 hover:shadow-lg focus-visible:ring-success',
    
    // Ghost: Minimal style
    ghost: 'bg-transparent text-healthcare-900 hover:bg-slate-100 focus-visible:ring-healthcare-500',
    
    // WhatsApp: Green for messaging
    whatsapp: 'bg-green-500 text-white shadow-md hover:bg-green-600 hover:shadow-lg focus-visible:ring-green-500',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button