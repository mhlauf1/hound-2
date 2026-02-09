import {HeartIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import type {Service} from '../../../sanity.types'

export const service = defineType({
  name: 'service',
  title: 'Service',
  icon: HeartIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for this service page',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short description for cards and meta tags',
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price Label',
      type: 'string',
      description: 'Short pricing text shown as a badge (e.g. "From $35", "$45/day")',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'button',
      description: 'Primary CTA button for this service (e.g. "Book Daycare" → booking link)',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              const document = context.document as Service
              if (document?.coverImage?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        },
      ],
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      of: [
        {type: 'hero'},
        {type: 'servicesAccordion'},
        {type: 'statsBar'},
        {type: 'splitFeature'},
        {type: 'featureGrid'},
        {type: 'testimonialCarousel'},
        {type: 'ctaBanner'},
        {type: 'twoColumnSection'},
        {type: 'faqAccordion'},
        {type: 'callToAction'},
        {type: 'infoSection'},
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
    prepare({title, media}) {
      return {title, media}
    },
  },
})
