// Reusable Button component
const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '', type = 'button', disabled = false }) => {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800 active:scale-95',
    secondary: 'bg-white text-blue-700 border border-blue-700 hover:bg-blue-50 active:scale-95',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-95',
    ghost: 'text-gray-600 hover:bg-gray-100 active:scale-95',
    success: 'bg-green-600 text-white hover:bg-green-700 active:scale-95',
    whatsapp: 'bg-green-500 text-white hover:bg-green-600 active:scale-95',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
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