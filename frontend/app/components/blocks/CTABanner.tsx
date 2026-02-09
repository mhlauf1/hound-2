import Image from '@/app/components/SanityImage'
import SectionLabel from '@/app/components/ui/SectionLabel'
import Button from '@/app/components/ui/Button'
import {linkResolver} from '@/sanity/lib/utils'

interface CTABannerProps {
  block: {
    sectionLabel?: string
    headline?: string
    cta?: {buttonText?: string; link?: any}
    image?: any
    backgroundColor?: string
  }
}

const bgMap: Record<string, string> = {
  cream: 'bg-brand-cream',
  blue: 'bg-brand-blue',
  brown: 'bg-brand-brown',
}

export default function CTABanner({block}: CTABannerProps) {
  const {sectionLabel, headline, cta, image, backgroundColor = 'blue'} = block
  const isLight = backgroundColor === 'cream'
  const ctaHref = cta?.link ? linkResolver(cta.link) : null

  return (
    <section className={`${bgMap[backgroundColor] || bgMap.blue}`}>
      <div className="container py-section-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center">
            {sectionLabel && (
              <SectionLabel variant={isLight ? 'onCream' : 'onBlue'}>{sectionLabel}</SectionLabel>
            )}
            {headline && (
              <h2
                className={`text-4xl lg:text-5xl xl:text-6xl mt-3 font-serif font-normal leading-[1.1] text-center tracking-tight mb-8 ${
                  isLight ? 'text-text-primary' : 'text-text-inverse'
                }`}
              >
                {headline}
              </h2>
            )}
            {cta?.buttonText && ctaHref && (
              <Button href={ctaHref} variant="inverse">
                {cta.buttonText}
              </Button>
            )}
          </div>

          {image && (
            <div className="relative">
              <Image
                id={image._id || image.asset?._ref}
                hotspot={image.hotspot}
                crop={image.crop}
                className="w-full h-auto rounded-[12px]"
                alt={headline || ''}
                width={640}
                queryParams={{q: 80}}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
