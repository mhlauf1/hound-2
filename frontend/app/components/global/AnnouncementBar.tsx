'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
    if (sessionStorage.getItem('announcement-dismissed') === 'true') {
      setDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('announcement-dismissed', 'true')
  }

  if (!hydrated || dismissed) return null

  return (
    <div className="bg-brand-blue text-text-inverse">
      <div className="container flex items-center justify-between py-3">
        <div className="flex-1" />
        <p className="text-sm font-sans text-center">
          New self-serve dog wash now open — try it today!
        </p>
        <div className="flex-1 flex items-center justify-end gap-4">
          <Link
            href="/careers"
            className="text-sm font-sans underline underline-offset-2 hover:opacity-80 transition-opacity hidden sm:inline"
          >
            Explore Careers
          </Link>
          <button
            onClick={handleDismiss}
            className="text-text-inverse hover:opacity-70 transition-opacity"
            aria-label="Dismiss announcement"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
