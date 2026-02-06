'use client'

import {useState} from 'react'
import {PortableText} from '@portabletext/react'
import SectionLabel from '@/app/components/ui/SectionLabel'
import AccordionItem from '@/app/components/ui/AccordionItem'

interface FAQ {
  _id: string
  question?: string
  answer?: any[]
}

interface FAQAccordionProps {
  block: {
    sectionLabel?: string
    headline?: string
    faqs?: FAQ[]
  }
}

export default function FAQAccordion({block}: FAQAccordionProps) {
  const {sectionLabel, headline, faqs} = block
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs?.length) return null

  return (
    <section className="py-section">
      <div className="container-narrow text-center">
        {sectionLabel && <SectionLabel className="justify-center">{sectionLabel}</SectionLabel>}
        {headline && (
          <h2 className="text-4xl lg:text-5xl xl:text-[64px] font-serif font-normal text-text-primary leading-[0.9] tracking-tight mb-12">
            {headline}
          </h2>
        )}
      </div>
      <div className="container-narrow">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq._id}
            title={faq.question || ''}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            variant="faq"
          >
            {faq.answer && (
              <div className="text-lg font-sans font-light text-text-secondary leading-relaxed prose prose-lg max-w-none">
                <PortableText value={faq.answer} />
              </div>
            )}
          </AccordionItem>
        ))}
      </div>
    </section>
  )
}
