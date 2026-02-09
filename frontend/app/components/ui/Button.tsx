import Link from 'next/link'
import CircleIconButton from './CircleIconButton'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'textArrow'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: ButtonVariant
  onClick?: () => void
  className?: string
  target?: string
  rel?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-brown text-center text-brand-white rounded-[12px] px-7 py-3.5 font-sans font-medium text-base hover:opacity-90 transition-opacity',
  secondary:
    'bg-brand-white text-center text-brand-brown rounded-[12px] px-7 py-3.5 font-sans font-medium text-base hover:shadow-card transition-shadow',
  ghost:
    'bg-transparent text-center text-brand-brown border border-border-medium rounded-[12px] px-7 py-3.5 font-sans font-medium text-base hover:bg-brand-cream transition-colors',
  inverse:
    'bg-brand-white text-center text-brand-brown rounded-[12px] px-7 py-3.5 font-sans font-medium text-base hover:opacity-90 transition-opacity',
  textArrow:
    'inline-flex items-center gap-2 font-sans font-medium text-base hover:underline transition-all',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  onClick,
  className = '',
  target,
  rel,
}: ButtonProps) {
  const styles = `${variantStyles[variant]} ${className}`

  const content =
    variant === 'textArrow' ? (
      <>
        {children}
        <CircleIconButton icon="arrow-right" size="sm" as="span" />
      </>
    ) : (
      children
    )

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <Link
        href={href}
        className={styles}
        target={target || (isExternal ? '_blank' : undefined)}
        rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
      >
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={styles}>
      {content}
    </button>
  )
}
