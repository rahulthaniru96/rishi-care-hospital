// Search input with icon and healthcare theme
const SearchInput = ({ value, onChange, placeholder = 'Search...', className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-healthcare-500 focus:border-transparent bg-white shadow-sm hover:border-slate-400 transition-colors"
      />
    </div>
  )
}

export default SearchInput