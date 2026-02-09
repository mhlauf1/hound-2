import SectionLabel from '@/app/components/ui/SectionLabel'
import ServiceCard from '@/app/components/ui/ServiceCard'

interface Service {
  _id: string
  title?: string
  slug?: string
  priceLabel?: string
  description?: string
  image?: any
  cta?: {buttonText?: string; link?: any}
}

interface ServicesAccordionProps {
  block: {
    sectionLabel?: string
    headline?: string
    services?: Service[]
    defaultOpen?: number
  }
}

export default function ServicesAccordion({block}: ServicesAccordionProps) {
  const {sectionLabel, headline, services} = block

  const resolvedServices = services?.filter(Boolean) ?? []

  if (!resolvedServices.length) return null

  return (
    <section className="py-section">
      {/* Header */}
      <div className="container text-center mb-12 md:mb-16">
        {sectionLabel && (
          <SectionLabel className="justify-center mb-4">{sectionLabel}</SectionLabel>
        )}
        {headline && (
          <h2 className="text-4xl lg:text-5xl xl:text-[64px] font-serif font-normal text-text-primary tracking-tight max-w-2xl mx-auto">
            {headline}
          </h2>
        )}
      </div>

      {/* Cards Grid */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-4">
          {resolvedServices.map((service) => (
            <ServiceCard
              key={service._id}
              title={service.title}
              slug={service.slug}
              priceLabel={service.priceLabel}
              description={service.description}
              image={service.image}
              cta={service.cta}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
