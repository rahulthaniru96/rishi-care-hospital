import { hospitalInfo } from '../../data/hospitalInfo'

// Floating quick-action buttons for mobile
const FloatingActions = () => {
  const actions = [
    {
      label: 'Call',
      icon: '📞',
      href: `tel:${hospitalInfo.phone}`,
      bg: 'bg-blue-600',
    },
    {
      label: 'WhatsApp',
      icon: '💬',
      href: `https://wa.me/${hospitalInfo.whatsapp.replace(/\D/g, '')}`,
      bg: 'bg-green-500',
    },
    {
      label: 'SMS',
      icon: '✉️',
      href: `sms:${hospitalInfo.phone}`,
      bg: 'bg-yellow-500',
    },
    {
      label: 'Directions',
      icon: '📍',
      href: hospitalInfo.googleMapsUrl,
      bg: 'bg-red-500',
    },
  ]

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-3 lg:hidden">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          target={
            action.label === 'WhatsApp' || action.label === 'Directions'
              ? '_blank'
              : undefined
          }
          rel="noreferrer"
          className={`${action.bg} text-white flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl shadow-lg text-xs font-medium active:scale-95 transition-transform`}
        >
          <span className="text-xl">{action.icon}</span>
          {action.label}
        </a>
      ))}
    </div>
  )
}

export default FloatingActions