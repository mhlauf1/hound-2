import {defineField, defineType, defineArrayMember} from 'sanity'
import {SquareIcon} from '@sanity/icons'

export const twoColumnSection = defineType({
  name: 'twoColumnSection',
  title: 'Two Column Section',
  type: 'object',
  icon: SquareIcon,
  fields: [
    defineField({
      name: 'leftColumn',
      title: 'Left Column (Social)',
      type: 'object',
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
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 4,
        }),
        defineField({
          name: 'socialLinks',
          title: 'Social Links',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Instagram', value: 'instagram'},
                      {title: 'Twitter', value: 'twitter'},
                      {title: 'Facebook', value: 'facebook'},
                      {title: 'TikTok', value: 'tiktok'},
                    ],
                  },
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                }),
              ],
              preview: {
                select: {title: 'platform'},
              },
            }),
          ],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),
    defineField({
      name: 'rightColumn',
      title: 'Right Column (Embark)',
      type: 'object',
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
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 4,
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
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Two Column Section',
        subtitle: 'Social + Embark',
      }
    },
  },
})
