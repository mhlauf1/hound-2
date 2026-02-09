import type {Metadata, ResolvingMetadata} from 'next'
import {notFound} from 'next/navigation'

import PageBuilderPage from '@/app/components/PageBuilder'
import Image from '@/app/components/SanityImage'
import {sanityFetch} from '@/sanity/lib/live'
import {getServiceQuery, servicePagesSlugs} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: servicePagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const {data: service} = await sanityFetch({
    query: getServiceQuery,
    params,
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(service?.coverImage)

  return {
    title: service?.title,
    description: service?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function ServicePage(props: Props) {
  const params = await props.params
  const {data: service} = await sanityFetch({query: getServiceQuery, params})

  if (!service?._id) {
    return notFound()
  }

  return (
    <div>
      {/* Cover Image Hero */}
      {service.coverImage?.asset?._ref && (
        <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
          <Image
            id={service.coverImage.asset._ref}
            alt={service.coverImage.alt || ''}
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
            mode="cover"
            hotspot={service.coverImage.hotspot}
            crop={service.coverImage.crop}
          />
          <div className="absolute inset-0 bg-brand-brown/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="container pb-12 lg:pb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-text-inverse">
                {service.title}
              </h1>
              {service.excerpt && (
                <p className="mt-4 text-lg lg:text-xl text-text-inverse-muted max-w-2xl font-sans">
                  {service.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fallback header when no cover image */}
      {!service.coverImage?.asset?._ref && (
        <div className="container py-section-sm">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-text-primary">
              {service.title}
            </h1>
            {service.excerpt && (
              <p className="mt-4 text-lg leading-relaxed text-text-secondary font-light">
                {service.excerpt}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Page Builder Blocks */}
      <PageBuilderPage page={service} />
    </div>
  )
}
