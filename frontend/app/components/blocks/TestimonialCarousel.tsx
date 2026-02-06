'use client'

import {useCallback, useEffect, useState} from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import SectionLabel from '@/app/components/ui/SectionLabel'

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
  const {sectionLabel, headline, testimonials} = block

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
  })

  if (!testimonials?.length) return null

  return (
    <section className="py-section overflow-hidden">
      <div className="container mb-10">
        {sectionLabel && <SectionLabel className="justify-center text-center">{sectionLabel}</SectionLabel>}
        {headline && (
          <h2 className="text-4xl lg:text-5xl xl:text-[64px] font-serif font-normal text-text-primary leading-[0.9] tracking-tight text-center max-w-3xl mx-auto">
            {headline}
          </h2>
        )}
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 pl-6 sm:pl-8 lg:pl-[max(2rem,calc((100vw-1280px)/2+4rem))]">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[320px]"
            >
              <div className="bg-brand-blue rounded-[12px] p-8 h-full flex flex-col min-h-[320px]">
                {/* Paw icon */}
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M8.35 3C9.53 2.83 10.78 4.12 11.14 5.9C11.5 7.67 10.85 9.25 9.67 9.43C8.5 9.6 7.24 8.31 6.88 6.54C6.5 4.76 7.18 3.18 8.35 3ZM15.5 3C16.69 3.18 17.35 4.76 17 6.54C16.62 8.31 15.37 9.6 14.19 9.43C13.03 9.25 12.37 7.67 12.72 5.9C13.08 4.12 14.33 2.83 15.5 3ZM3 7.6C4.14 7.11 5.69 8 6.5 9.55C7.26 11.13 7 12.79 5.87 13.28C4.74 13.77 3.2 12.89 2.41 11.31C1.63 9.73 1.86 8.08 3 7.6ZM21 7.6C22.14 8.08 22.37 9.73 21.59 11.31C20.8 12.89 19.26 13.77 18.13 13.28C17 12.79 16.74 11.13 17.5 9.55C18.31 8 19.86 7.11 21 7.6ZM12 12C14.5 12 16.5 16 16.5 18C16.5 20 14.5 22 12 22C9.5 22 7.5 20 7.5 18C7.5 16 9.5 12 12 12Z" />
                  </svg>
                </div>

                {/* Quote */}
                <p className="text-base font-sans text-text-inverse leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <p className="text-sm font-sans font-medium text-text-inverse">
                    {testimonial.authorName}
                  </p>
                  {testimonial.authorDescription && (
                    <p className="text-sm font-sans text-text-inverse-muted">
                      {testimonial.authorDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
