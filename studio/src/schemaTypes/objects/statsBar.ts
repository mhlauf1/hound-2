import {defineField, defineType, defineArrayMember} from 'sanity'
import {BarChartIcon} from '@sanity/icons'

export const statsBar = defineType({
  name: 'statsBar',
  title: 'Stats Bar',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g. "12+", "4.4", "8,800"',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g. "Years of Experience"',
            }),
            defineField({
              name: 'showStars',
              title: 'Show Stars',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'starCount',
              title: 'Star Count',
              type: 'number',
              hidden: ({parent}) => !parent?.showStars,
              initialValue: 5,
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Stats Bar',
      }
    },
  },
})
