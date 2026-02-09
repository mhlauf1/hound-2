import {defineField, defineType, defineArrayMember} from 'sanity'
import {ThLargeIcon} from '@sanity/icons'

export const servicesAccordion = defineType({
  name: 'servicesAccordion',
  title: 'Services Cards',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
      initialValue: 'WHAT TO EXPECT',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'service'}],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'defaultOpen',
      title: 'Default Open Index',
      type: 'number',
      initialValue: 0,
      description: 'Which service item is expanded by default (0 = first)',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    },
    prepare({title}) {
      return {
        title: title || 'Services Cards',
        subtitle: 'Services Cards',
      }
    },
  },
})
