import {defineField, defineType, defineArrayMember} from 'sanity'
import {InlineIcon} from '@sanity/icons'

export const featureGrid = defineType({
  name: 'featureGrid',
  title: 'Feature Grid',
  type: 'object',
  icon: InlineIcon,
  fields: [
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'Revealed when the feature is expanded',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Optional Iconify icon name (e.g. "mdi:webcam")',
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      initialValue: 3,
      options: {
        list: [
          {title: '2 Columns', value: 2},
          {title: '3 Columns', value: 3},
        ],
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Feature Grid',
      }
    },
  },
})
