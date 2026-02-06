interface ContainerProps {
  children: React.ReactNode
  width?: 'default' | 'narrow' | 'wide'
  className?: string
}

export default function Container({children, width = 'default', className = ''}: ContainerProps) {
  const widthClass =
    width === 'narrow'
      ? 'container-narrow'
      : width === 'wide'
        ? 'container-wide'
        : 'container'

  return <div className={`${widthClass} ${className}`}>{children}</div>
}
