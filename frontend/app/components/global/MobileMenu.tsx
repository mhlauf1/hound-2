'use client'

import {useEffect} from 'react'
import Link from 'next/link'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: {label: string; href: string}[]
}

export default function MobileMenu({isOpen, onClose, links}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-brand-white">
      <div className="container flex items-center justify-between h-[72px]">
        <Link href="/" onClick={onClose} className="flex flex-col items-center">
          <span className="text-2xl font-serif text-text-primary leading-tight">
            Hound Around
          </span>
          <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-text-secondary -mt-0.5">
            Resort
          </span>
        </Link>
        <button
          onClick={onClose}
          className="text-text-primary"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav className="container mt-8">
        <ul className="flex flex-col gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="text-3xl font-serif text-text-primary hover:opacity-70 transition-opacity"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-4">
          <a
            href="tel:+16516003200"
            className="text-lg font-sans text-text-primary"
          >
            (651) 600-3200
          </a>
          <Link
            href="/book"
            onClick={onClose}
            className="bg-brand-brown text-brand-white text-base font-sans font-medium px-6 py-3 rounded-[12px] text-center hover:opacity-90 transition-opacity"
          >
            Book Now
          </Link>
        </div>
      </nav>
    </div>
  )
}
