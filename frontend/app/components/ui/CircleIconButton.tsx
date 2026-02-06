'use client'

import {Icon} from '@iconify/react'

interface CircleIconButtonProps {
  icon?: 'plus' | 'arrow-right' | 'close'
  variant?: 'blue' | 'white'
  size?: 'sm' | 'md'
  isActive?: boolean
  onClick?: () => void
  className?: string
  as?: 'button' | 'span'
}

const iconMap = {
  plus: 'mdi:plus',
  'arrow-right': 'mdi:arrow-right',
  close: 'mdi:close',
}

export default function CircleIconButton({
  icon = 'plus',
  variant = 'blue',
  size = 'md',
  isActive = false,
  onClick,
  className = '',
  as = 'button',
}: CircleIconButtonProps) {
  const sizeClass = size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'
  const iconSize = size === 'sm' ? 14 : 16

  const bgClass =
    variant === 'blue'
      ? 'bg-brand-blue text-brand-white hover:bg-brand-blue-dark'
      : 'bg-brand-white text-brand-brown hover:bg-brand-cream'

  const Tag = as

  return (
    <Tag
      onClick={onClick}
      className={`${sizeClass} rounded-full flex items-center justify-center transition-all ${bgClass} ${
        isActive ? 'rotate-45' : ''
      } ${className}`}
      style={{transitionDuration: '250ms', transitionTimingFunction: 'ease-out'}}
      aria-hidden={as === 'span'}
    >
      <Icon icon={iconMap[icon]} width={iconSize} height={iconSize} />
    </Tag>
  )
}
