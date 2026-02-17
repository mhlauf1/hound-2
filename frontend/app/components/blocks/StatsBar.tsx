'use client'

import {Icon} from '@iconify/react'
import {FadeIn} from '@/app/components/ui/FadeIn'

interface Stat {
  _key: string
  value?: string
  label?: string
  showStars?: boolean
  starCount?: number
}

interface StatsBarProps {
  block: {
    stats?: Stat[]
  }
}

export default function StatsBar({block}: StatsBarProps) {
  const {stats} = block

  if (!stats?.length) return null

  return (
    <section className="py-section border-y border-border-default">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat._key}
              className={`flex flex-col items-center text-center ${
                index > 0 ? 'md:border-l md:border-border-medium' : ''
              }`}
            >
              <FadeIn delay={index * 0.15}>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl lg:text-7xl font-serif text-text-primary leading-none tracking-tight">
                      {stat.value}
                    </span>
                    {stat.showStars && (
                      <div className="flex items-center gap-0.5">
                        {Array.from({length: stat.starCount || 5}).map((_, i) => (
                          <Icon
                            key={i}
                            icon="mdi:star"
                            className="text-brand-blue"
                            width={24}
                            height={24}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-base font-sans text-text-secondary">{stat.label}</span>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
