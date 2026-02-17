'use client'

import {useState} from 'react'
import Link from 'next/link'
import MobileMenu from './MobileMenu'

const navLinks = [
  {label: 'Daycare', href: '/services/daycare'},
  {label: 'Boarding', href: '/services/boarding'},
  {label: 'Grooming', href: '/services/grooming'},
  {label: 'Self-Wash', href: '/services/self-wash'},
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 bg-brand-white border-b border-border-default">
        <div className="container flex items-center justify-between h-[72px]">
          {/* Left — Nav links (desktop) */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base font-sans text-text-primary hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Center — Logo */}
          <Link href="/" className="flex flex-col items-center">
            <span className="text-2xl font-serif text-text-primary leading-tight">
              Hound Around
            </span>
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-text-secondary -mt-0.5">
              Resort
            </span>
          </Link>

          {/* Right — Phone + CTA (desktop), Hamburger (mobile) */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+16516003200"
              className="hidden lg:inline text-base font-sans text-text-primary hover:opacity-70 transition-opacity"
            >
              (651) 600-3200
            </a>
            <Link
              href="/book"
              className="hidden md:inline-flex bg-brand-brown text-brand-white text-base font-sans font-medium px-6 py-2.5 rounded-[12px] hover:opacity-90 transition-opacity"
            >
              Book Now
            </Link>
            <button
              className="md:hidden text-text-primary"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />
    </>
  )
}
