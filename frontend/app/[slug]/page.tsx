import type {Metadata} from 'next'

import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getPageQuery, pagesSlugs} from '@/sanity/lib/queries'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: pagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params,
    stega: false,
  })

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata
}

export default async function Page(props: Props) {
  const params = await props.params
  const {data: page} = await sanityFetch({query: getPageQuery, params})

  if (!page?._id) {
    return (
      <div className="container py-section text-center">
        <h1 className="text-4xl font-serif text-text-primary mb-4">Page not found</h1>
        <p className="text-lg font-sans text-text-secondary">
          This page doesn&apos;t exist yet. Create it in Sanity Studio.
        </p>
      </div>
    )
  }

  return (
    <div>
      {page.heading && (
        <div className="container py-section-sm">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-text-primary">
              {page.heading}
            </h1>
            {page.subheading && (
              <p className="mt-4 text-lg leading-relaxed text-text-secondary font-light">
                {page.subheading}
              </p>
            )}
          </div>
        </div>
      )}
      <PageBuilderPage page={page} />
    </div>
  )
}
