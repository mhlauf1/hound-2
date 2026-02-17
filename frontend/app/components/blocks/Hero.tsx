import Image from '@/app/components/SanityImage'
import Button from '@/app/components/ui/Button'
import {FadeIn} from '@/app/components/ui/FadeIn'
import {linkResolver} from '@/sanity/lib/utils'

interface HeroProps {
  block: {
    headline?: string
    subtext?: string
    backgroundImage?: any
    cta?: {buttonText?: string; link?: any}
    overlay?: string
  }
}

export default function Hero({block}: HeroProps) {
  const {headline, subtext, backgroundImage, cta, overlay = 'light'} = block

  const ctaHref = cta?.link ? linkResolver(cta.link) : null

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[85vh] flex items-center">
      {backgroundImage && (
        <Image
          id={backgroundImage._id || backgroundImage.asset?._ref}
          hotspot={backgroundImage.hotspot}
          crop={backgroundImage.crop}
          className="absolute inset-0 w-full h-full object-cover"
          alt={headline || ''}
          width={2400}
          sizes="100vw"
          queryParams={{q: 100}}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative container pb-16 lg:pb-24">
        <div className="max-w-xl flex flex-col items-center pt-[7vh] lg:max-w-2xl">
          {headline && (
            <FadeIn>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-center font-normal text-text-inverse leading-[1.1] tracking-tight mb-6">
                {headline}
              </h1>
            </FadeIn>
          )}
          {subtext && (
            <FadeIn delay={0.1}>
              <p className="text-lg lg:text-xl text-center font-sans font-normal md:max-w-xl text-text-inverse leading-relaxed mb-8 ">
                {subtext}
              </p>
            </FadeIn>
          )}
          {cta?.buttonText && ctaHref && (
            <FadeIn delay={0.2}>
              <Button href={ctaHref} variant="secondary">
                {cta.buttonText}
              </Button>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  )
}
