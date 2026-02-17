'use client'

import {useCallback, useEffect, useRef, useState} from 'react'
import {FadeIn} from '@/app/components/ui/FadeIn'

const AUTO_PLAY_MS = 7000

interface Testimonial {
  _id: string
  quote?: string
  authorName?: string
  authorDescription?: string
}

interface TestimonialCarouselProps {
  block: {
    sectionLabel?: string
    headline?: string
    testimonials?: Testimonial[]
  }
}

export default function TestimonialCarousel({block}: TestimonialCarouselProps) {
  const {testimonials} = block
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [progressKey, setProgressKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const total = testimonials?.length ?? 0

  const goTo = useCallback(
    (index: number, dir: 'left' | 'right') => {
      if (isAnimating || total <= 1 || index === currentIndex) return
      setDirection(dir)
      setIsAnimating(true)

      timeoutRef.current = setTimeout(() => {
        setCurrentIndex(index)
        setIsAnimating(false)
        setProgressKey((k) => k + 1)
      }, 400)
    },
    [isAnimating, total, currentIndex],
  )

  const navigate = useCallback(
    (dir: 'left' | 'right') => {
      const next = dir === 'right' ? (currentIndex + 1) % total : (currentIndex - 1 + total) % total
      goTo(next, dir)
    },
    [currentIndex, total, goTo],
  )

  // Auto-play timer
  useEffect(() => {
    if (total <= 1 || paused) return

    autoPlayRef.current = setTimeout(() => {
      navigate('right')
    }, AUTO_PLAY_MS)

    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current)
    }
  }, [currentIndex, total, paused, navigate])

  // Cleanup animation timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  if (!testimonials?.length) return null

  const current = testimonials[currentIndex]

  return (
    <section
      className="pb-16 md:py-section-lg overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container flex flex-col items-center">
        {/* Decorative quotation marks */}
        <FadeIn>
          <div className="mb-10" aria-hidden="true">
            <svg
              width="120"
              height="90"
              viewBox="0 0 120 90"
              fill="none"
              className="text-brand-blue"
            >
              <path
                d="M8 90V58C8 38 16 22 36 10L42 18C30 26 24 38 22 50H36C44.8 50 52 57.2 52 66V82C52 86.4 48.4 90 44 90H8Z"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="currentColor"
              />
              <path
                d="M68 90V58C68 38 76 22 96 10L102 18C90 26 84 38 82 50H96C104.8 50 112 57.2 112 66V82C112 86.4 108.4 90 104 90H68Z"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="currentColor"
              />
            </svg>
          </div>
        </FadeIn>

        {/* Quote and author — animated region */}
        <FadeIn delay={0.1}>
          <div className="relative w-full max-w-4xl min-h-[200px] flex flex-col items-center justify-center">
            <div
              className="flex flex-col items-center transition-all duration-400 ease-out"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating
                  ? `translateY(${direction === 'right' ? '16px' : '-16px'})`
                  : 'translateY(0)',
              }}
            >
              {current?.quote && (
                <blockquote className="text-center mb-8">
                  <p className="text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] font-serif font-normal text-text-primary leading-snug">
                    {current.quote}
                  </p>
                </blockquote>
              )}

              {current?.authorName && (
                <p className="text-xs sm:text-sm font-medium font-sans text-brand-blue t  text-center">
                  {current.authorName}
                  {current.authorDescription && `, ${current.authorDescription}`}
                </p>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Progress indicators */}
        {total > 1 && (
          <div className="flex items-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  goTo(i, i > currentIndex ? 'right' : 'left')
                }}
                aria-label={`Go to testimonial ${i + 1}`}
                className="relative  h-1.5 rounded-full overflow-hidden transition-all duration-300"
                style={{width: i === currentIndex ? 40 : 10}}
              >
                {/* Track */}
                <span className="absolute inset-0 bg-brand-blue/20 rounded-full" />
                {/* Fill */}
                {i === currentIndex && (
                  <span
                    key={progressKey}
                    className="absolute inset-0 rounded-full bg-brand-blue origin-left"
                    style={{
                      animation: paused
                        ? 'none'
                        : `progress-fill ${AUTO_PLAY_MS}ms linear forwards`,
                    }}
                  />
                )}
                {i !== currentIndex && (
                  <span className="absolute inset-0 bg-brand-blue/20 rounded-full" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Navigation arrows */}
        {total > 1 && (
          <div className="flex items-center gap-2 mt-5">
            <button
              onClick={() => navigate('left')}
              disabled={isAnimating}
              aria-label="Previous testimonial"
              className="w-12 h-12 bg-brand-blue cursor-pointer text-white flex items-center justify-center rounded-sm hover:bg-brand-blue-dark transition-colors duration-200 disabled:opacity-50"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 4L7 10L13 16" />
              </svg>
            </button>
            <button
              onClick={() => navigate('right')}
              disabled={isAnimating}
              aria-label="Next testimonial"
              className="w-12 h-12 bg-brand-blue cursor-pointer text-white flex items-center justify-center rounded-sm hover:bg-brand-blue-dark transition-colors duration-200 disabled:opacity-50"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 4L13 10L7 16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Progress bar animation */}
      <style>{`
        @keyframes progress-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  )
}
