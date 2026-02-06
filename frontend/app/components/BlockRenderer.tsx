import React from 'react'

import Cta from '@/app/components/Cta'
import Info from '@/app/components/InfoSection'
import Hero from '@/app/components/blocks/Hero'
import ServicesAccordion from '@/app/components/blocks/ServicesAccordion'
import StatsBar from '@/app/components/blocks/StatsBar'
import SplitFeature from '@/app/components/blocks/SplitFeature'
import FeatureGrid from '@/app/components/blocks/FeatureGrid'
import TestimonialCarousel from '@/app/components/blocks/TestimonialCarousel'
import CTABanner from '@/app/components/blocks/CTABanner'
import TwoColumnSection from '@/app/components/blocks/TwoColumnSection'
import FAQAccordion from '@/app/components/blocks/FAQAccordion'
import {dataAttr} from '@/sanity/lib/utils'
import {PageBuilderSection} from '@/sanity/lib/types'

type BlockProps = {
  index: number
  block: PageBuilderSection
  pageId: string
  pageType: string
}

type BlocksType = {
  [key: string]: React.FC<BlockProps>
}

const Blocks = {
  callToAction: Cta,
  infoSection: Info,
  hero: Hero,
  servicesAccordion: ServicesAccordion,
  statsBar: StatsBar,
  splitFeature: SplitFeature,
  featureGrid: FeatureGrid,
  testimonialCarousel: TestimonialCarousel,
  ctaBanner: CTABanner,
  twoColumnSection: TwoColumnSection,
  faqAccordion: FAQAccordion,
} as BlocksType

export default function BlockRenderer({block, index, pageId, pageType}: BlockProps) {
  if (typeof Blocks[block._type] !== 'undefined') {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block: block,
          index: index,
          pageId: pageId,
          pageType: pageType,
        })}
      </div>
    )
  }
  return React.createElement(
    () => (
      <div className="w-full bg-brand-cream text-center text-text-secondary p-20 rounded-[12px]">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    {key: block._key},
  )
}
