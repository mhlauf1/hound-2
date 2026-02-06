'use client'

import {useState} from 'react'
import AccordionItem from '@/app/components/ui/AccordionItem'

interface Feature {
  _key: string
  title?: string
  description?: string
  icon?: string
}

interface FeatureGridProps {
  block: {
    features?: Feature[]
    columns?: number
  }
}

export default function FeatureGrid({block}: FeatureGridProps) {
  const {features, columns = 3} = block
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!features?.length) return null

  const colClass = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="pb-section">
      <div className="container">
        <div className={`grid grid-cols-1 ${colClass} border-t border-border-medium`}>
          {features.map((feature, index) => {
            const colIndex = index % columns
            const showLeftBorder = colIndex > 0

            return (
              <div
                key={feature._key}
                className={`${showLeftBorder ? 'md:border-l md:border-border-medium' : ''}`}
              >
                <AccordionItem
                  title={feature.title || ''}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                  variant="feature"
                >
                  {feature.description && (
                    <p className="text-base font-sans font-light text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </AccordionItem>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
