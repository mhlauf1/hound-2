import {PortableText} from '@portabletext/react'
import Image from '@/app/components/SanityImage'
import SectionLabel from '@/app/components/ui/SectionLabel'
import Button from '@/app/components/ui/Button'
import {linkResolver} from '@/sanity/lib/utils'
import {FadeIn} from '@/app/components/ui/FadeIn'

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
    <FadeIn>
      <div className="flex flex-col justify-center">
        {sectionLabel && <SectionLabel>{sectionLabel}</SectionLabel>}
        {headline && (
          <h2 className="text-4xl mt-2 lg:text-5xl xl:text-[64px] font-serif font-normal text-text-primary leading-[1.1] tracking-tight mb-6">
            {headline}
          </h2>
        )}
        {body && (
          <div className="text-lg lg:text-lg font-sans text-text-secondary leading-relaxed mb-6 prose prose-lg max-w-[85%]">
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
    </FadeIn>
  )

  const imageContent = image && (
    <FadeIn delay={0.15}>
      <div className="relative aspect-square">
        <Image
          id={image._id || image.asset?._ref}
          hotspot={image.hotspot}
          crop={image.crop}
          className="w-full h-full object-cover rounded-lg"
          alt={headline || ''}
          width={640}
          queryParams={{q: 80}}
        />
      </div>
    </FadeIn>
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
