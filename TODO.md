# Production Checklist — Hound Around Resort

> Status key: `[ ]` todo, `[~]` in progress, `[x]` done, `[!]` blocked

---

## 1. Design Polish — Per Section

### 1.1 Hero
- [ ] Match text positioning to design: headline bottom-left ~40% width, subtext center-aligned below
- [ ] Tune gradient overlay opacity — currently generic, design shows subtle bottom-left gradient
- [ ] Add responsive image `sizes` attribute instead of hardcoded `width={1920}`
- [ ] Test text contrast against various hero images (WCAG AA minimum 4.5:1)
- [ ] Add image loading priority (`fetchPriority="high"`) — hero is above the fold
- [ ] Mobile: text should overlay full-width with stronger gradient per spec
- [ ] Tablet: text overlay should be centered per spec

### 1.2 Services Accordion
- [ ] Fix mobile layout — right image column is completely hidden below `lg`, needs mobile fallback (show active service image below accordion)
- [ ] Verify blue active state matches design: `bg-brand-blue` with `rounded-[12px]`, `p-8` padding
- [ ] Match collapsed item styling: title serif bold, subtle bottom border, plus icon right-aligned
- [ ] Tune crossfade timing — design shows smooth 400ms opacity swap
- [ ] Sticky image `top-[96px]` is hardcoded — should calculate from nav + announcement bar height
- [ ] Add "Sign Up" button inside expanded accordion item per design (currently uses CTA from Sanity)
- [ ] First item should be expanded on load (verify `defaultOpen` prop flows from Sanity)

### 1.3 Stats Bar
- [ ] Match serif number size to design — currently `text-5xl lg:text-[56px]`, design shows larger
- [ ] Add horizontal separators on mobile stack (design only shows vertical dividers on desktop)
- [ ] Verify star icons match design — should be blue filled, inline with the number "4.4"
- [ ] Check vertical alignment of value + label within each column
- [ ] Border styling: top and bottom borders on section, vertical dividers between columns

### 1.4 Split Feature (Why Hound Around)
- [ ] Match body text alignment — spec says "centered within left column"
- [ ] Tune image corner radius — design shows `rounded-[12px]` on visible corners, bleeds right
- [ ] Image should bleed to right edge on desktop (no right padding)
- [ ] Verify section label is blue uppercase, 16px margin-bottom before heading
- [ ] PortableText body needs proper prose styling matching sans light 20px

### 1.5 Feature Grid
- [ ] Fix border logic — `colIndex % columns` doesn't handle the last row cleanly
- [ ] Match design: title + blue circle-plus icon right-aligned per cell
- [ ] Grid lines between all cells (both horizontal and vertical borders)
- [ ] Verify 3×2 on desktop, 2×3 on tablet, 1×6 on mobile
- [ ] Expanded description should appear below the title within the cell, not push other cells
- [ ] Reduced `pb-section` spacing currently applied — may need section gap from split feature above

### 1.6 Testimonial Carousel
- [ ] Add card hover effect: `translateY(-2px)` + shadow on hover (250ms ease-out)
- [ ] Match paw icon to design — white circle with paw SVG, ~40px
- [ ] Verify card min-width matches design: ~280px mobile → ~320px desktop
- [ ] Left padding calc `lg:pl-[max(...)]` — test on various viewport widths
- [ ] Verify edge peek effect: partial card visible on both left and right edges
- [ ] Responsive card count: 4-5 desktop, 2-3 tablet, 1.2 mobile
- [ ] Add scroll indicator or subtle drag hint on mobile

### 1.7 CTA Banner (Plans & Pricing)
- [ ] Fix brown background text color — `isLight` binary doesn't handle brown (text should be white)
- [ ] Match design: text left ~50%, image right ~50%, image has slight radius
- [ ] "View Our Pricing" should be textArrow style: white text + circle-arrow icon
- [ ] Verify blue background matches `bg-brand-blue`
- [ ] Section label should be white uppercase on blue background

### 1.8 Two Column Section (Social + Embark)
- [ ] Left column: match design center-aligned text, social icons with labels inline
- [ ] Right column: phone mockup image should be positioned bottom-right, smaller than full column
- [ ] Match "Learn more about Embark" to textArrow style with circle-arrow icon
- [ ] Team photo on left should be full-width of column with subtle or no radius
- [ ] Verify vertical divider between columns on desktop (design reference shows subtle separation)

### 1.9 FAQ Accordion
- [ ] Match question text styling: sans medium 18-20px (currently `text-lg font-medium`)
- [ ] Verify circle-plus icon matches design: blue, right-aligned, rotates to × on expand
- [ ] Full-width bottom border between each item
- [ ] Expanded answer: sans light, body size, with top padding
- [ ] Centered narrow container (800px max) matches `container-narrow`
- [ ] No FAQ is open by default — all collapsed on page load

### 1.10 Announcement Bar
- [ ] Add dismiss animation (fade out, then collapse height)
- [ ] Match height to ~44px per spec
- [ ] Verify text centered, "Explore Careers" right-aligned
- [ ] X button should be small and unobtrusive

### 1.11 Navigation
- [ ] Match logo wordmark: "Hound Around" in serif, "RESORT" in small-caps tracked sans below
- [ ] Add active link styling for current page
- [ ] Nav should account for announcement bar height when sticky
- [ ] Subtle bottom border matches `border-border-default`
- [ ] Phone number: sans 16px, match design placement
- [ ] "Book Now" button: brown bg, white text, 12px radius, ~40px height

### 1.12 Mobile Menu
- [ ] Add slide-in animation (from left or right)
- [ ] Add Escape key to close
- [ ] Add focus trap — Tab key cycles within menu
- [ ] Verify link sizing: large serif text for main links

### 1.13 Footer
- [ ] Match newsletter headline serif styling from design
- [ ] Newsletter input: white bg, rounded-full, blue circle submit arrow inline-right
- [ ] Link column headers: uppercase labels matching design
- [ ] Adapt link columns for Hound Around (currently: SERVICES, RESOURCES, COMPANY)
- [ ] Bottom bar: copyright left, privacy/terms right, border-top white/20%
- [ ] Match blue background to `bg-brand-blue`

---

## 2. Accessibility

- [ ] Add `aria-expanded` to all accordion toggle buttons
- [ ] Add `aria-controls` linking accordion buttons to their content panels
- [ ] Add `role="region"` and `aria-labelledby` to accordion content areas
- [ ] Add focus ring styles to all interactive elements (buttons, links, inputs)
- [ ] Add skip-to-main-content link at top of page
- [ ] Verify color contrast ratios meet WCAG AA (4.5:1 text, 3:1 large text)
- [ ] Add `aria-label` to icon-only buttons (CircleIconButton, mobile hamburger, footer submit)
- [ ] Add `<blockquote>` or `role="doc-quote"` to testimonial quotes
- [ ] MobileMenu: trap focus, close on Escape
- [ ] Footer newsletter: associate label with input, add form submission feedback
- [ ] Test full keyboard navigation flow through all interactive sections
- [ ] Add `prefers-reduced-motion` media query to disable animations

---

## 3. Animations & Interactions

- [ ] Wrap each homepage section in `ScrollReveal` for fade-up entrance
- [ ] Stagger scroll reveal timing for sections that enter together
- [ ] Testimonial card hover: `translateY(-2px)` + `shadow-card-hover` at 250ms
- [ ] AnnouncementBar dismiss: fade-out + height collapse animation
- [ ] MobileMenu: slide-in/slide-out transition
- [ ] Nav links: hover opacity transition (70%, 150ms)
- [ ] Footer links: underline on hover transition
- [ ] Button hover states per spec: primary=opacity 90%, secondary=light shadow, ghost=cream bg
- [ ] Verify all accordion animations use `cubic-bezier(0.16, 1, 0.3, 1)` consistently

---

## 4. Content & CMS Integration

- [ ] Create "Home" page document in Sanity Studio (slug: `home`)
- [ ] Populate all homepage blocks with spec content
- [ ] Upload image assets: hero bg, 4 service images, facility interior, team photo, phone mockup, CTA interior
- [ ] Create 5-8 testimonial documents with real reviews
- [ ] Create 6 FAQ documents per spec content
- [ ] Update settings singleton: site title, description, OG image
- [ ] Consider moving announcement bar text to Sanity settings
- [ ] Consider moving nav links + footer links to Sanity settings
- [ ] Consider moving phone number to Sanity settings

---

## 5. SEO & Meta

- [ ] Add structured data (JSON-LD) for Organization schema
- [ ] Add FAQ structured data to FAQ section for rich results
- [ ] Add canonical URLs via metadata
- [ ] Add `og:type`, `og:site_name` to Open Graph tags
- [ ] Add favicon and apple-touch-icon to layout
- [ ] Verify sitemap.xml includes homepage and all pages
- [ ] Add `robots.txt` if not present

---

## 6. Performance

- [ ] Add `priority` to hero image (above the fold)
- [ ] Lazy load all images below the fold
- [ ] Verify all images use proper `sizes` attribute for responsive srcset
- [ ] Review bundle size — ensure Iconify tree-shakes unused icons
- [ ] Consider code-splitting client components (ServicesAccordion, TestimonialCarousel, FeatureGrid)
- [ ] Run Lighthouse audit: target 90+ on Performance, Accessibility, SEO
- [ ] Verify CLS (cumulative layout shift) — hero image, font loading, announcement bar

---

## 7. Error Handling & Edge Cases

- [ ] Add error boundary around PageBuilder (catch per-block render failures)
- [ ] Handle missing/null data gracefully in all block components
- [ ] Add fallback UI for images that fail to load
- [ ] Test with empty page builder (no blocks added)
- [ ] Test with partially filled blocks (e.g., hero with no CTA, stats with 1 item)
- [ ] Test with very long text content (headline wrapping, description overflow)

---

## 8. Build & Deploy

- [ ] `npm run type-check` passes (currently: ✓)
- [ ] `npm run lint` passes (check for warnings)
- [ ] `npm run build --workspace=frontend` passes (currently: ✓)
- [ ] Side-by-side visual QA against `docs/design/` screenshots at 375px, 768px, 1440px
- [ ] Test Sanity visual editing: draft mode, live updates, click-to-edit
- [ ] Deploy Studio: `npm run deploy --workspace=studio`
- [ ] Deploy frontend to Vercel
- [ ] Verify production build with real Sanity content
- [ ] Delete `Onboarding.tsx` template artifact (still exists, imported by nothing)

---

## 9. Future Enhancements (Post-Launch)

- [ ] Inner pages: About, Services (daycare/boarding/grooming/self-wash), Pricing, Contact, Webcams
- [ ] Blog/post pages with updated brand styling
- [ ] Newsletter form integration (webhook or email service)
- [ ] Contact form with validation and submission
- [ ] Dynamic nav links from Sanity settings
- [ ] Dark mode support (tokens defined in CSS but no implementation)
- [ ] Analytics: event tracking for CTA clicks, carousel engagement, FAQ opens
