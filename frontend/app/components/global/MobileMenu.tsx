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

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[99] bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[100] w-[85%] max-w-[400px] bg-brand-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-end h-[72px] px-6">
          <button
            onClick={onClose}
            className="text-text-primary"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav content */}
        <nav className="flex flex-col justify-between h-[calc(100%-72px)] px-6 pb-10">
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

          <div className="flex flex-col gap-4">
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
    </>
  )
}
