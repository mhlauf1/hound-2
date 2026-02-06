'use client'

import Link from 'next/link'

const serviceLinks = [
  {label: 'Daycare', href: '/services/daycare'},
  {label: 'Boarding', href: '/services/boarding'},
  {label: 'Grooming', href: '/services/grooming'},
  {label: 'Self-Wash', href: '/services/self-wash'},
  {label: 'Pricing', href: '/pricing'},
]

const resourceLinks = [
  {label: 'Webcams', href: '/webcams'},
  {label: 'FAQ', href: '/#faq'},
  {label: 'New Client Info', href: '/new-clients'},
]

const companyLinks = [
  {label: 'About', href: '/about'},
  {label: 'Careers', href: '/careers'},
  {label: 'Contact', href: '/contact'},
]

export default function Footer() {
  return (
    <footer className="bg-brand-blue">
      <div className="container py-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 — Newsletter */}
          <div className="lg:pr-8">
            <h3 className="text-2xl lg:text-3xl font-serif text-text-inverse leading-tight mb-6">
              Get offers, updates, and more right in your inbox.
            </h3>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative"
            >
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-brand-white text-text-primary rounded-full py-3 pl-5 pr-12 text-base font-sans placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-white/50"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center hover:bg-brand-blue-dark transition-colors"
                aria-label="Subscribe"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12m0 0L8 2m5 5L8 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-[0.1em] text-text-inverse mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-text-inverse hover:underline transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Resources */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-[0.1em] text-text-inverse mb-4">
              Resources
            </h4>
            <ul className="flex flex-col gap-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-text-inverse hover:underline transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Company */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-[0.1em] text-text-inverse mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-text-inverse hover:underline transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-sans text-text-inverse-muted">
            &copy; {new Date().getFullYear()} Hound Around Resort. Part of the{' '}
            <a href="https://embarkpetservices.com" className="underline hover:text-text-inverse transition-colors" target="_blank" rel="noopener noreferrer">
              Embark Pet Services
            </a>{' '}
            family.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm font-sans text-text-inverse-muted hover:text-text-inverse transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm font-sans text-text-inverse-muted hover:text-text-inverse transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
