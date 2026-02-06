'use client'

import CircleIconButton from './CircleIconButton'

interface AccordionItemProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
  variant?: 'service' | 'feature' | 'faq'
}

export default function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
  variant = 'faq',
}: AccordionItemProps) {
  if (variant === 'service') {
    return (
      <div
        className={`rounded-[12px] transition-colors ${
          isOpen ? 'bg-brand-blue' : ''
        }`}
        style={{transitionDuration: '400ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
      >
        <button
          onClick={onToggle}
          className={`w-full flex items-center justify-between p-6 text-left ${
            isOpen ? 'text-text-inverse' : 'text-text-primary border-b border-border-default'
          }`}
        >
          <span className="text-2xl font-serif font-bold">{title}</span>
          <CircleIconButton
            icon="plus"
            variant={isOpen ? 'white' : 'blue'}
            isActive={isOpen}
            as="span"
          />
        </button>
        <div
          className="grid transition-all"
          style={{
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            transitionDuration: '400ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-6">{children}</div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'feature') {
    return (
      <div className="border-b border-border-medium">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between py-5 px-4 text-left"
        >
          <span className="text-lg font-sans font-semibold text-text-primary">{title}</span>
          <CircleIconButton icon="plus" isActive={isOpen} as="span" />
        </button>
        <div
          className="grid transition-all"
          style={{
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            transitionDuration: '400ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="overflow-hidden">
            <div className="px-4 pb-5">{children}</div>
          </div>
        </div>
      </div>
    )
  }

  // FAQ variant (default)
  return (
    <div className="border-b border-border-medium">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="text-lg font-sans font-medium text-text-primary pr-4">{title}</span>
        <CircleIconButton icon="plus" isActive={isOpen} as="span" />
      </button>
      <div
        className="grid transition-all"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transitionDuration: '400ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="overflow-hidden">
          <div className="pb-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
