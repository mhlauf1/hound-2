import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {testimonial} from './documents/testimonial'
import {faq} from './documents/faq'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'
import {hero} from './objects/hero'
import {servicesAccordion} from './objects/servicesAccordion'
import {statsBar} from './objects/statsBar'
import {splitFeature} from './objects/splitFeature'
import {featureGrid} from './objects/featureGrid'
import {testimonialCarousel} from './objects/testimonialCarousel'
import {ctaBanner} from './objects/ctaBanner'
import {twoColumnSection} from './objects/twoColumnSection'
import {faqAccordion} from './objects/faqAccordion'

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  testimonial,
  faq,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
  hero,
  servicesAccordion,
  statsBar,
  splitFeature,
  featureGrid,
  testimonialCarousel,
  ctaBanner,
  twoColumnSection,
  faqAccordion,
]
