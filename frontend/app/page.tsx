import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getPageQuery} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'

export default async function Page() {
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params: {slug: 'home'},
  })

  if (!page?._id) {
    return (
      <div className="container py-section text-center">
        <h1 className="text-4xl font-serif text-text-primary mb-4">
          Welcome to Hound Around Resort
        </h1>
        <p className="text-lg font-sans text-text-secondary">
          Create a page with the slug &ldquo;home&rdquo; in Sanity Studio to get started.
        </p>
      </div>
    )
  }

  return <PageBuilderPage page={page as GetPageQueryResult} />
}
