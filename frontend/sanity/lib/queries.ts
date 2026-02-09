import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current,
    "service": service->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

const buttonFields = /* groq */ `
  button {
    ...,
    ${linkFields}
  }
`

const ctaButtonFields = /* groq */ `
  cta {
    ...,
    ${linkFields}
  }
`

const pageBuilderProjection = /* groq */ `
  "pageBuilder": pageBuilder[]{
    ...,
    _type == "callToAction" => {
      ...,
      ${buttonFields}
    },
    _type == "infoSection" => {
      content[]{
        ...,
        markDefs[]{
          ...,
          ${linkReference}
        }
      }
    },
    _type == "hero" => {
      ...,
      ${ctaButtonFields}
    },
    _type == "servicesAccordion" => {
      ...,
      services[]->{
        _id,
        title,
        "slug": slug.current,
        "description": excerpt,
        priceLabel,
        "image": coverImage,
        ${ctaButtonFields}
      }
    },
    _type == "statsBar" => {
      ...
    },
    _type == "splitFeature" => {
      ...,
      ${ctaButtonFields}
    },
    _type == "featureGrid" => {
      ...,
      features[]{
        ...,
        image {
          ...,
          asset->
        }
      }
    },
    _type == "testimonialCarousel" => {
      ...,
      testimonials[]->{
        _id,
        quote,
        authorName,
        authorDescription
      }
    },
    _type == "ctaBanner" => {
      ...,
      ${ctaButtonFields}
    },
    _type == "twoColumnSection" => {
      ...,
      rightColumn {
        ...,
        ${ctaButtonFields}
      }
    },
    _type == "faqAccordion" => {
      ...,
      faqs[]->{
        _id,
        question,
        answer
      }
    },
  }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    ${pageBuilderProjection}
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export const servicePagesSlugs = defineQuery(`
  *[_type == "service" && defined(slug.current)]
  {"slug": slug.current}
`)

export const getServiceQuery = defineQuery(`
  *[_type == 'service' && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    excerpt,
    coverImage,
    ${pageBuilderProjection}
  }
`)
