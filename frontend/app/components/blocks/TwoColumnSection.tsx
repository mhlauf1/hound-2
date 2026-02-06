'use client'

import {Icon} from '@iconify/react'
import Image from '@/app/components/SanityImage'
import SectionLabel from '@/app/components/ui/SectionLabel'
import Button from '@/app/components/ui/Button'
import {linkResolver} from '@/sanity/lib/utils'

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
    <section className="py-section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Social */}
          {leftColumn && (
            <div>
              {leftColumn.sectionLabel && (
                <SectionLabel>{leftColumn.sectionLabel}</SectionLabel>
              )}
              {leftColumn.headline && (
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-normal text-text-primary leading-[0.95] tracking-tight mb-4">
                  {leftColumn.headline}
                </h2>
              )}
              {leftColumn.body && (
                <p className="text-lg font-sans font-light text-text-secondary leading-relaxed mb-6">
                  {leftColumn.body}
                </p>
              )}
              {leftColumn.socialLinks && leftColumn.socialLinks.length > 0 && (
                <div className="flex items-center gap-6 mb-8">
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
              {leftColumn.image && (
                <Image
                  id={leftColumn.image._id || leftColumn.image.asset?._ref}
                  hotspot={leftColumn.image.hotspot}
                  crop={leftColumn.image.crop}
                  className="w-full h-auto rounded-[12px]"
                  alt={leftColumn.headline || ''}
                  width={600}
                  queryParams={{q: 80}}
                />
              )}
            </div>
          )}

          {/* Right — Embark */}
          {rightColumn && (
            <div>
              {rightColumn.sectionLabel && (
                <SectionLabel>{rightColumn.sectionLabel}</SectionLabel>
              )}
              {rightColumn.headline && (
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-normal text-text-primary leading-[0.95] tracking-tight mb-4">
                  {rightColumn.headline}
                </h2>
              )}
              {rightColumn.body && (
                <p className="text-lg font-sans font-light text-text-secondary leading-relaxed mb-6">
                  {rightColumn.body}
                </p>
              )}
              {rightColumn.cta?.buttonText && ctaHref && (
                <div className="mb-8">
                  <Button href={ctaHref} variant="textArrow">
                    {rightColumn.cta.buttonText}
                  </Button>
                </div>
              )}
              {rightColumn.image && (
                <Image
                  id={rightColumn.image._id || rightColumn.image.asset?._ref}
                  hotspot={rightColumn.image.hotspot}
                  crop={rightColumn.image.crop}
                  className="w-full h-auto"
                  alt={rightColumn.headline || ''}
                  width={600}
                  queryParams={{q: 80}}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
