import {PortableText} from '@portabletext/react'
import Image from '@/app/components/SanityImage'
import SectionLabel from '@/app/components/ui/SectionLabel'
import Button from '@/app/components/ui/Button'
import {linkResolver} from '@/sanity/lib/utils'

interface SplitFeatureProps {
  block: {
    sectionLabel?: string
    headline?: string
    body?: any[]
    image?: any
    imagePosition?: string
    cta?: {buttonText?: string; link?: any}
  }
}

export default function SplitFeature({block}: SplitFeatureProps) {
  const {sectionLabel, headline, body, image, imagePosition = 'right', cta} = block
  const ctaHref = cta?.link ? linkResolver(cta.link) : null

  const textContent = (
    <div className="flex flex-col justify-center">
      {sectionLabel && <SectionLabel>{sectionLabel}</SectionLabel>}
      {headline && (
        <h2 className="text-4xl lg:text-5xl xl:text-[64px] font-serif font-normal text-text-primary leading-[0.9] tracking-tight mb-6">
          {headline}
        </h2>
      )}
      {body && (
        <div className="text-lg lg:text-xl font-sans font-light text-text-secondary leading-relaxed mb-6 prose prose-lg max-w-none">
          <PortableText value={body} />
        </div>
      )}
      {cta?.buttonText && ctaHref && (
        <div>
          <Button href={ctaHref} variant="textArrow">
            {cta.buttonText}
          </Button>
        </div>
      )}
    </div>
  )

  const imageContent = image && (
    <div className="relative">
      <Image
        id={image._id || image.asset?._ref}
        hotspot={image.hotspot}
        crop={image.crop}
        className="w-full h-full object-cover rounded-[12px]"
        alt={headline || ''}
        width={640}
        queryParams={{q: 80}}
      />
    </div>
  )

  return (
    <section className="py-section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {imagePosition === 'left' ? (
            <>
              {imageContent}
              {textContent}
            </>
          ) : (
            <>
              {textContent}
              {imageContent}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
