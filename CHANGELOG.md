# Changelog

## [0.1.0] — 2026-02-05

### Overview

Replaced the `sanity-template-nextjs-clean` demo site with the full Hound Around Resort homepage infrastructure. This includes a complete design system, 10 page builder block types, 6 UI primitives, 4 global layout components, 11 new Sanity schemas, and updated GROQ queries. The production build passes cleanly with zero TypeScript errors.

---

### Added

**Design System (`frontend/app/globals.css`)**
- Brand color tokens: cream `#F5F0E3`, blue `#8BABE5`, brown `#341D04`, plus light/dark blue variants
- Semantic text colors (primary, secondary, inverse, inverse-muted)
- Semantic border colors (default, medium, dark)
- Font family tokens: serif (Libre Caslon Text), sans (Geist), mono (Geist Mono)
- Section spacing scale: `section-xs` (48px) through `section-xl` (160px)
- Border radius scale: sm (8px), DEFAULT (12px), lg (16px), xl (24px), full
- Transition tokens: ease-out-expo cubic-bezier, duration vars (fast/default/slow/slower)
- Container max-widths: content (1280px), narrow (800px), wide (1440px)
- Three `@utility` container classes with responsive padding breakpoints
- Base layer: body sets cream bg + brown text + sans font; headings set serif

**Fonts (`frontend/app/layout.tsx`)**
- Libre Caslon Text (serif, 400+700, normal+italic) via `next/font/google`
- Geist Sans + Geist Mono via `geist/font/sans` and `geist/font/mono` npm package
- Font CSS variables: `--font-libre-caslon`, `--font-geist-sans`, `--font-geist-mono`

**UI Primitives (6 components)**
- `SectionLabel` — uppercase 13px label with onCream/onBlue color variants
- `CircleIconButton` — 32-36px circle icon (plus/arrow-right/close), blue/white variants, 45deg rotation on active
- `Button` — 5 variants (primary, secondary, ghost, inverse, textArrow), renders as `<Link>` or `<button>`
- `Container` — max-width wrapper with default/narrow/wide options
- `AccordionItem` — expand/collapse with `grid-template-rows: 0fr→1fr` animation, 3 variants (service/feature/faq)
- `ScrollReveal` — IntersectionObserver wrapper with fade-up 20px + opacity animation at 600ms

**Global Layout Components (4 components)**
- `AnnouncementBar` — client component, blue bg, centered text, "Explore Careers" link, X dismiss with sessionStorage persistence
- `Navigation` — sticky top-0, white bg, 72px height, 3-col layout (nav links | logo wordmark | phone + Book Now CTA), bottom border
- `MobileMenu` — full-screen overlay at md breakpoint, same links as nav, body scroll lock, close button
- `Footer` — blue bg, 4-col grid (newsletter form with pill input + circle submit | SERVICES links | RESOURCES links | COMPANY links), bottom bar with copyright + privacy/terms

**Page Builder Block Components (9 new blocks)**
- `Hero` — full-viewport bg image with gradient overlay, headline (display size/serif/white), subtext, CTA button
- `ServicesAccordion` — 2-col (55/45), left accordion with blue active state, right sticky image panel with crossfade
- `StatsBar` — 3-col grid with vertical dividers, serif stat numbers, blue star icons via Iconify
- `SplitFeature` — 50/50 text + image, reversible via imagePosition, PortableText body, optional CTA
- `FeatureGrid` — 3-col (responsive 2→1) expandable grid with border separators
- `TestimonialCarousel` — Embla carousel, blue cards with paw icon + quote + author, edge peek effect
- `CTABanner` — full-width colored section (cream/blue/brown), headline + textArrow CTA + image
- `TwoColumnSection` — social (left) + embark (right), platform icons via Iconify, social link labels
- `FAQAccordion` — centered narrow container, expandable FAQ items with PortableText answers

**Sanity Document Types (2 new)**
- `testimonial` — quote (text), authorName (string), authorDescription (string)
- `faq` — question (string), answer (blockContentTextOnly)

**Sanity Object Types (9 new)**
- `hero` — headline, subtext, backgroundImage (image+hotspot), cta (button type), overlay (none/light/dark)
- `servicesAccordion` — sectionLabel, headline, services[] (title, description, image, cta), defaultOpen
- `statsBar` — stats[] (value, label, showStars, starCount)
- `splitFeature` — sectionLabel, headline, body (blockContentTextOnly), image, imagePosition, cta
- `featureGrid` — features[] (title, description, icon), columns (2|3)
- `testimonialCarousel` — sectionLabel, headline, testimonials[] (references → testimonial)
- `ctaBanner` — sectionLabel, headline, cta, image, backgroundColor (cream/blue/brown)
- `twoColumnSection` — leftColumn (social fields) + rightColumn (embark fields with cta)
- `faqAccordion` — sectionLabel, headline, faqs[] (references → faq)

**GROQ Queries (`frontend/sanity/lib/queries.ts`)**
- Added `ctaButtonFields` and `buttonFields` helpers for CTA link dereferencing
- Extended `getPageQuery` with type-specific projections for all 9 new block types
- Testimonial references dereferenced: `testimonials[]->{ _id, quote, authorName, authorDescription }`
- FAQ references dereferenced: `faqs[]->{ _id, question, answer }`

**Project Config**
- `CLAUDE.md` — development instructions and architecture reference
- `SPEC.md` — full design specification with component specs, color system, typography, responsive behavior
- `docs/design/` — 9 design reference screenshots (hero, services, stats, why-hound, testimonials, our-plans, social+embark, faqs, footer)

### Changed

- `frontend/app/layout.tsx` — replaced Inter + IBM Plex Mono fonts with Libre Caslon Text + Geist; restructured body to AnnouncementBar → Navigation → main → Footer
- `frontend/app/page.tsx` — replaced template demo page with page-builder homepage fetching slug `"home"`
- `frontend/app/[slug]/page.tsx` — removed template styling, removed Onboarding import, brand-consistent fallback UI
- `frontend/app/components/BlockRenderer.tsx` — added 9 new block type → component mappings
- `frontend/app/globals.css` — complete `@theme` rewrite from template cyan/gray/red palette to brand cream/blue/brown
- `frontend/sanity/lib/demo.ts` — title to "Hound Around Resort", description updated
- `studio/src/schemaTypes/index.ts` — registered all 11 new types (2 documents + 9 objects)
- `studio/src/schemaTypes/documents/page.ts` — expanded pageBuilder `of` array with 9 new block types, made `heading` field optional
- `frontend/package.json` — added `geist`, `@iconify/react`, `embla-carousel-react` dependencies

### Removed

- `frontend/tailwind.config.ts` — consolidated into `@theme` in globals.css (Tailwind v4 best practice)
- `frontend/app/components/Header.tsx` — replaced by `global/Navigation.tsx`
- `frontend/app/components/Footer.tsx` — replaced by `global/Footer.tsx`
- `frontend/app/components/GetStartedCode.tsx` — template demo artifact
- `frontend/app/components/SideBySideIcons.tsx` — template demo artifact
