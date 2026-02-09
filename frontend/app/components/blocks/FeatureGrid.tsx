import Image from '@/app/components/SanityImage'

interface Feature {
  _key: string
  title?: string
  description?: string
  icon?: string
  image?: any
}

interface FeatureGridProps {
  block: {
    features?: Feature[]
    columns?: number
  }
}

export default function FeatureGrid({block}: FeatureGridProps) {
  const {features, columns = 3} = block

  if (!features?.length) return null

  const colClass = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="pb-section">
      <div className="">
        <div className={`grid grid-cols-1 ${colClass} border-t border-border-medium`}>
          {features.map((feature, index) => {
            const colIndex = index % columns
            const showLeftBorder = colIndex > 0

            return (
              <div
                key={feature._key}
                className={`px-10 md:px-16 py-8 border-b border-border-medium ${showLeftBorder ? 'md:border-l md:border-border-medium' : ''}`}
              >
                {feature.image && (
                  <div className="mb-3 w-10 h-10 relative">
                    <Image
                      id={
                        feature.image._id || feature.image.asset?._ref || feature.image.asset?._id
                      }
                      hotspot={feature.image.hotspot}
                      crop={feature.image.crop}
                      className="w-full h-full object-contain"
                      alt={feature.title || ''}
                      width={80}
                      queryParams={{q: 80}}
                    />
                  </div>
                )}
                {feature.title && (
                  <h3 className="text-xl lg:text-2xl font-sans font-medium text-text-primary mb-2">
                    {feature.title}
                  </h3>
                )}
                {feature.description && (
                  <p className="text-base font-sans w-[95%] md:w-[80%] text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
