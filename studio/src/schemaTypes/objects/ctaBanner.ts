import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const ctaBanner = defineType({
  name: 'ctaBanner',
  title: 'CTA Banner',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'button',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: 'blue',
      options: {
        list: [
          {title: 'Cream', value: 'cream'},
          {title: 'Blue', value: 'blue'},
          {title: 'Brown', value: 'brown'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        title: title || 'CTA Banner',
        subtitle: 'CTA Banner',
        media,
      }
    },
  },
})
