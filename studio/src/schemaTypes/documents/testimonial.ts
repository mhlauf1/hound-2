import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorDescription',
      title: 'Author Description',
      type: 'string',
      description: 'e.g. "Multi-dog family" or "Daycare member since 2020"',
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'quote',
    },
  },
})
