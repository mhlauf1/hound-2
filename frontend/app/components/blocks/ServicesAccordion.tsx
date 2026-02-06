'use client'

import {useState} from 'react'
import Image from '@/app/components/SanityImage'
import SectionLabel from '@/app/components/ui/SectionLabel'
import AccordionItem from '@/app/components/ui/AccordionItem'
import Button from '@/app/components/ui/Button'
import {linkResolver} from '@/sanity/lib/utils'

interface Service {
  _key: string
  title?: string
  description?: string
  image?: any
  cta?: {buttonText?: string; link?: any}
}

interface ServicesAccordionProps {
  block: {
    sectionLabel?: string
    headline?: string
    services?: Service[]
    defaultOpen?: number
  }
}

export default function ServicesAccordion({block}: ServicesAccordionProps) {
  const {sectionLabel, headline, services, defaultOpen = 0} = block
  const [activeIndex, setActiveIndex] = useState(defaultOpen)

  if (!services?.length) return null

  const activeService = services[activeIndex]

  return (
    <section className="py-section">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          {sectionLabel && <SectionLabel className="justify-center">{sectionLabel}</SectionLabel>}
          {headline && (
            <h2 className="text-4xl lg:text-5xl xl:text-[64px] font-serif font-normal text-text-primary leading-[0.9] tracking-tight max-w-2xl mx-auto">
              {headline}
            </h2>
          )}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12">
          {/* Left — Accordion */}
          <div>
            {services.map((service, index) => {
              const ctaHref = service.cta?.link ? linkResolver(service.cta.link) : null
              return (
                <AccordionItem
                  key={service._key}
                  title={service.title || ''}
                  isOpen={activeIndex === index}
                  onToggle={() => setActiveIndex(index)}
                  variant="service"
                >
                  {service.description && (
                    <p className="text-base font-sans font-light text-text-inverse-muted leading-relaxed mb-4">
                      {service.description}
                    </p>
                  )}
                  {service.cta?.buttonText && ctaHref && (
                    <Button href={ctaHref} variant="inverse">
                      {service.cta.buttonText}
                    </Button>
                  )}
                </AccordionItem>
              )
            })}
          </div>

          {/* Right — Image */}
          <div className="relative hidden lg:block">
            <div className="sticky top-[96px] aspect-[4/5] rounded-[12px] overflow-hidden">
              {services.map((service, index) => (
                service.image && (
                  <div
                    key={service._key}
                    className="absolute inset-0 transition-opacity"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      transitionDuration: '400ms',
                      transitionTimingFunction: 'ease-out',
                    }}
                  >
                    <Image
                      id={service.image._id || service.image.asset?._ref}
                      hotspot={service.image.hotspot}
                      crop={service.image.crop}
                      className="w-full h-full object-cover"
                      alt={service.title || ''}
                      width={600}
                      queryParams={{q: 80}}
                    />
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
