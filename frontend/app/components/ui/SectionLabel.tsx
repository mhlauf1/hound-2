interface SectionLabelProps {
  children: React.ReactNode
  variant?: 'onCream' | 'onBlue'
  className?: string
}

export default function SectionLabel({
  children,
  variant = 'onCream',
  className = '',
}: SectionLabelProps) {
  const colorClass = variant === 'onBlue' ? 'text-text-inverse' : 'text-brand-blue'

  return (
    <span
      className={`block text-[13px] font-sans font-semibold uppercase tracking-[0.1em] leading-none mb-4 ${colorClass} ${className}`}
    >
      {children}
    </span>
  )
}
