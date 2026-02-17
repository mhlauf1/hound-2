'use client'

import {Icon} from '@iconify/react'
import Image from '@/app/components/SanityImage'
import SectionLabel from '@/app/components/ui/SectionLabel'
import Button from '@/app/components/ui/Button'
import {linkResolver} from '@/sanity/lib/utils'
import {FadeIn} from '@/app/components/ui/FadeIn'

const platformIcons: Record<string, string> = {
  instagram: 'mdi:instagram',
  twitter: 'mdi:twitter',
  facebook: 'mdi:facebook',
  tiktok: 'ic:baseline-tiktok',
}

const platformLabels: Record<string, string> = {
  instagram: 'Instagram',
  twitter: 'Twitter',
  facebook: 'Facebook',
  tiktok: 'TikTok',
}

interface TwoColumnSectionProps {
  block: {
    leftColumn?: {
      sectionLabel?: string
      headline?: string
      body?: string
      socialLinks?: {_key: string; platform?: string; url?: string}[]
      image?: any
    }
    rightColumn?: {
      sectionLabel?: string
      headline?: string
      body?: string
      cta?: {buttonText?: string; link?: any}
      image?: any
    }
  }
}

export default function TwoColumnSection({block}: TwoColumnSectionProps) {
  const {leftColumn, rightColumn} = block
  const ctaHref = rightColumn?.cta?.link ? linkResolver(rightColumn.cta.link) : null

  return (
    <section className="overflow-hidden">
      {/* 2x3 grid: left-text | divider | right-text on top row, left-image | divider | right-image on bottom */}
      <div className="mt-6 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] lg:grid-rows-[auto_auto]">
          {/* Top-left — text content */}
          {leftColumn && (
            <div className="flex flex-col items-center justify-center text-center px-6 lg:px-12 py-12 lg:py-16">
              <FadeIn>
                {leftColumn.sectionLabel && <SectionLabel>{leftColumn.sectionLabel}</SectionLabel>}
                {leftColumn.headline && (
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl mt-2 font-serif md:max-w-[16ch] font-normal text-text-primary leading-[1.1] tracking-tight mb-4">
                    {leftColumn.headline}
                  </h2>
                )}
                {leftColumn.body && (
                  <p className="text-lg font-sans font-light text-text-secondary leading-relaxed mb-6 max-w-md">
                    {leftColumn.body}
                  </p>
                )}
                {leftColumn.socialLinks && leftColumn.socialLinks.length > 0 && (
                  <div className="flex items-center justify-center gap-6">
                    {leftColumn.socialLinks.map((social) => (
                      <a
                        key={social._key}
                        href={social.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-primary hover:opacity-70 transition-opacity"
                      >
                        {social.platform && (
                          <Icon
                            icon={platformIcons[social.platform] || 'mdi:link'}
                            width={20}
                            height={20}
                          />
                        )}
                        <span className="text-base font-sans">
                          {social.platform ? platformLabels[social.platform] : 'Link'}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </FadeIn>
            </div>
          )}

          {/* Divider — spans both rows */}
          <div className="hidden lg:block bg-border-dark row-span-2" />

          {/* Top-right — text content */}
          {rightColumn && (
            <div className="flex flex-col items-center justify-center text-center px-6 lg:px-12 py-12 lg:py-16">
              <FadeIn delay={0.1}>
                {rightColumn.sectionLabel && (
                  <SectionLabel>{rightColumn.sectionLabel}</SectionLabel>
                )}
                {rightColumn.headline && (
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif mt-2 font-normal text-text-primary leading-[1.1] tracking-tight mb-4">
                    {rightColumn.headline}
                  </h2>
                )}
                {rightColumn.body && (
                  <p className="text-lg font-sans font-light text-text-secondary leading-relaxed mb-6 max-w-md">
                    {rightColumn.body}
                  </p>
                )}
                {rightColumn.cta?.buttonText && ctaHref && (
                  <Button href={ctaHref} variant="textArrow">
                    {rightColumn.cta.buttonText}
                  </Button>
                )}
              </FadeIn>
            </div>
          )}

          {/* Bottom-left — image */}
          {leftColumn?.image && (
            <FadeIn delay={0.15} className="h-full">
              <div className="relative h-full min-h-[300px] sm:min-h-[400px] overflow-hidden">
                <Image
                  id={leftColumn.image._id || leftColumn.image.asset?._ref}
                  hotspot={leftColumn.image.hotspot}
                  crop={leftColumn.image.crop}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={leftColumn.headline || ''}
                  width={700}
                  queryParams={{q: 80}}
                />
              </div>
            </FadeIn>
          )}

          {/* Bottom-right — phone image */}
          {rightColumn?.image && (
            <FadeIn delay={0.2} className="hidden lg:block">
              <div className="flex items-end justify-center px-6 lg:px-12">
                <Image
                  id={rightColumn.image._id || rightColumn.image.asset?._ref}
                  hotspot={rightColumn.image.hotspot}
                  crop={rightColumn.image.crop}
                  className="h-auto max-w-[400px] w-full object-contain object-bottom"
                  alt={rightColumn.headline || ''}
                  width={540}
                  queryParams={{q: 80}}
                />
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  )
}
