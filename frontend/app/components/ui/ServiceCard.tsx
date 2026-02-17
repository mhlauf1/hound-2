import Image from '@/app/components/SanityImage'
import Button from '@/app/components/ui/Button'
import {linkResolver} from '@/sanity/lib/utils'

interface ServiceCardProps {
  title?: string
  slug?: string
  priceLabel?: string
  description?: string
  image?: any
  cta?: {buttonText?: string; link?: any}
}

export default function ServiceCard({
  title,
  slug,
  priceLabel,
  description,
  image,
  cta,
}: ServiceCardProps) {
  const learnMoreHref = slug ? `/services/${slug}` : null

  return (
    <div className="flex flex-col rounded-lg shadow-card hover:shadow-card-hover transition-shadow duration-slow overflow-hidden h-full bg-brand-white cursor-pointer">
      {image && (
        <div className="aspect-square relative overflow-hidden">
          <Image
            id={image._id || image.asset?._ref}
            hotspot={image.hotspot}
            crop={image.crop}
            className="absolute inset-0 w-full h-full object-cover"
            alt={title || ''}
            width={600}
            queryParams={{q: 80}}
          />
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5  flex-col flex items-start gap-2">
            {priceLabel && (
              <span className="bg-white/20 text-white text-xs md:text-sm font-sans font-medium rounded-full px-3 py-1.5 whitespace-nowrap backdrop-blur-sm">
                {priceLabel}
              </span>
            )}
            {title && (
              <h3 className="text-3xl lg:text-4xl font-serif font-normal text-white">{title}</h3>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1 p-5">
        {description && (
          <p className="text-lg font-sans text-text-secondary leading-relaxed mb-4 flex-1">
            {description}
          </p>
        )}
        {learnMoreHref && (
          <Button href={learnMoreHref} variant="primary">
            Learn More
          </Button>
        )}
      </div>
    </div>
  )
}
