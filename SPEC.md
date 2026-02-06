# Template 2: "Modern Resort" — Full Project Spec

## Design Direction

**Editorial-clean, premium pet resort.** Inspired by Modern Animal's veterinary clinic aesthetic — lots of breathing room, serif-forward typography, warm cream backgrounds with soft periwinkle blue accents. Feels like a boutique hotel website that happens to be for dogs. The design leans heavily on accordion/expandable interactions and a restrained 3-color palette.

**Mood keywords:** Elevated, editorial, warm, trustworthy, calm, boutique, premium-casual

---

## Tech Stack

- **Framework:** Next.js (App Router) via [sanity-template-nextjs-clean](https://github.com/sanity-io/sanity-template-nextjs-clean)
- **CMS:** Sanity Studio (monorepo: `/frontend` + `/studio`, npm workspaces)
- **Styling:** Tailwind CSS (included with template)
- **Fonts:** Google Fonts (Libre Caslon Text) + `geist` npm package
- **Icons:** Iconify (via `@iconify/react`)
- **Deployment:** Vercel

### Monorepo Structure

This project uses npm workspaces with the root `package.json` managing both `/frontend` (Next.js) and `/studio` (Sanity Studio). All additional frontend dependencies should be installed from the **frontend workspace**:

```bash
# Install frontend deps from project root
npm install geist @iconify/react embla-carousel-react --workspace=frontend

# Or cd into frontend
cd frontend && npm install geist @iconify/react embla-carousel-react
```

### Root package.json (already initialized)

```json
{
  "name": "hound-2",
  "workspaces": ["studio", "frontend"],
  "scripts": {
    "dev": "npm-run-all --parallel --print-label dev:*",
    "dev:next": "npm run dev --workspace=frontend",
    "dev:studio": "npm run dev --workspace=studio",
    "format": "prettier --cache --write .",
    "import-sample-data": "cd studio && sanity dataset import sample-data.tar.gz --replace",
    "lint": "npm run lint --workspace=frontend",
    "type-check": "npm run type-check --workspaces"
  },
  "devDependencies": {
    "@sanity/prettier-config": "^2.0.2",
    "npm-run-all2": "^5.0.2",
    "prettier": "^3.7.3"
  }
}
```

> **Do NOT install project dependencies at the root level.** Frontend deps go in `/frontend/package.json`, studio deps go in `/studio/package.json`. The root only has dev tooling (prettier, npm-run-all2).

---

## Design Reference Screenshots

**Before starting, create a `/docs/design` folder at the project root and add all homepage screenshots there.** Claude Code can view these images directly to reference the design while building.

```bash
mkdir -p docs/design
# Copy your screenshots into this folder:
# docs/design/hero.png
# docs/design/services.png
# docs/design/stats.png
# docs/design/why-hound.png
# docs/design/testimonials.png
# docs/design/our-plans.png
# docs/design/social-embark.png
# docs/design/faqs.png
# docs/design/footer.png
```

When prompting Claude Code, reference these directly: _"Look at `docs/design/hero.png` for the hero section layout"_ — Claude Code can open and analyze these images to match spacing, layout, and visual details.

---

## Color System

### Tailwind Config Colors

```js
colors: {
  brand: {
    cream:       '#F5F0E3',  // Main page background
    blue:        '#8BABE5',  // Primary accent — buttons, cards, badges, section bgs
    'blue-light':'#A8C1ED',  // Hover/lighter blue variant
    'blue-dark': '#6B8FD4',  // Active/pressed state
    brown:       '#341D04',  // Primary text, headings, borders
    white:       '#FFFFFF',  // Card backgrounds, nav bar, button fills
  },
  text: {
    primary:     '#341D04',        // Headings, body text on cream
    secondary:   'rgba(52,29,4,0.7)', // Muted body text, descriptions (brown/70%)
    inverse:     '#FFFFFF',        // Text on blue backgrounds
    'inverse-muted': 'rgba(255,255,255,0.8)', // Muted text on blue backgrounds
  },
  border: {
    DEFAULT:     'rgba(52,29,4,0.15)', // Subtle dividers (cream sections)
    medium:      'rgba(52,29,4,0.25)', // Accordion borders, grid lines
    dark:        '#341D04',            // Strong borders when needed
  },
  surface: {
    cream:       '#F5F0E3',  // Default page bg
    white:       '#FFFFFF',  // Elevated cards, nav
    blue:        '#8BABE5',  // Blue section backgrounds
  }
}
```

### CSS Custom Properties

```css
:root {
  /* Core palette */
  --color-cream: #f5f0e3;
  --color-blue: #8babe5;
  --color-blue-light: #a8c1ed;
  --color-blue-dark: #6b8fd4;
  --color-brown: #341d04;
  --color-white: #ffffff;

  /* Semantic tokens */
  --bg-primary: var(--color-cream);
  --bg-elevated: var(--color-white);
  --bg-accent: var(--color-blue);
  --text-primary: var(--color-brown);
  --text-secondary: rgba(52, 29, 4, 0.7);
  --text-inverse: var(--color-white);
  --border-subtle: rgba(52, 29, 4, 0.15);
  --border-medium: rgba(52, 29, 4, 0.25);

  /* Component tokens */
  --nav-bg: var(--color-white);
  --announcement-bg: var(--color-blue);
  --card-testimonial-bg: var(--color-blue);
  --accordion-active-bg: var(--color-blue);
  --footer-bg: var(--color-blue);
  --faq-bg: var(--color-cream);
  --pricing-bg: var(--color-blue);
  --icon-circle-bg: var(--color-blue);
  --icon-circle-border: rgba(52, 29, 4, 0.2);
}
```

---

## Typography

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap"
  rel="stylesheet"
/>
```

**Note:** Geist is available via `next/font/local` or the `geist` npm package (already common in Next.js projects). Install via `npm install geist` and import in layout.

### Tailwind Font Config

```js
fontFamily: {
  serif: ['"Libre Caslon Text"', 'Georgia', 'Times New Roman', 'serif'],
  sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
  mono: ['var(--font-geist-mono)', 'monospace'],
}
```

### Type Scale

| Token     | Font  | Size             | Weight       | Line Height | Letter Spacing | Usage                            |
| --------- | ----- | ---------------- | ------------ | ----------- | -------------- | -------------------------------- |
| `display` | Serif | 84px (5.25rem)   | 400 (normal) | 90% (0.9)   | -1px           | Hero headline                    |
| `h1`      | Serif | 64px (4rem)      | 400          | 90%         | -0.5px         | Section headlines                |
| `h2`      | Serif | 48px (3rem)      | 400          | 95%         | -0.5px         | Sub-section heads                |
| `h3`      | Serif | 32px (2rem)      | 400          | 100%        | 0              | Card titles, small headings      |
| `h4`      | Serif | 24px (1.5rem)    | 700          | 110%        | 0              | Accordion titles (bold)          |
| `body-lg` | Sans  | 24px (1.5rem)    | 300 (light)  | 150%        | 0              | Hero subtext, lead paragraphs    |
| `body`    | Sans  | 20px (1.25rem)   | 300          | 150%        | 0              | General body, descriptions       |
| `body-sm` | Sans  | 16px (1rem)      | 400          | 150%        | 0              | Smaller body text, nav links     |
| `label`   | Sans  | 13px (0.8125rem) | 400          | 100%        | 10% (0.1em)    | Section labels, uppercase badges |
| `caption` | Sans  | 14px (0.875rem)  | 400          | 140%        | 0              | Footer links, metadata           |
| `stat`    | Serif | 56px (3.5rem)    | 400          | 100%        | -1px           | Stats numbers (12+, 4.4, 8,800)  |

### Type Rules

- **All headings:** Serif font, normal weight (400) unless noted — the font's natural weight carries the visual authority
- **Section labels:** Sans-serif, uppercase, 10% letter-spacing, use `text-brand-blue` on cream backgrounds and `text-white` on blue backgrounds
- **Body text:** Sans-serif, light weight (300), generous line-height
- **Accordion item titles:** Serif, bold weight (700) when expanded, medium/regular when collapsed
- **Nav links:** Sans-serif, regular weight (400), 16px
- **Button text:** Sans-serif, medium weight (500), 16px

---

## Layout & Spacing

### Container & Grid

```js
// Tailwind config extend
screens: {
  'xs': '475px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1440px',
},
container: {
  center: true,
  padding: {
    DEFAULT: '1.5rem',  // 24px mobile
    sm: '2rem',         // 32px
    lg: '4rem',         // 64px
    xl: '5rem',         // 80px
    '2xl': '6rem',      // 96px
  },
},
maxWidth: {
  'content': '1280px',     // Main content max
  'narrow': '800px',       // Text-heavy sections
  'wide': '1440px',        // Full-bleed sections with padding
}
```

### Spacing Scale (Section Rhythm)

```js
spacing: {
  'section-xs': '3rem',    // 48px — tight sections
  'section-sm': '4rem',    // 64px
  'section':    '6rem',    // 96px — default section padding
  'section-lg': '8rem',    // 128px — generous sections
  'section-xl': '10rem',   // 160px — hero-level breathing room
}
```

| Context           | Vertical Padding      | Notes                      |
| ----------------- | --------------------- | -------------------------- |
| Announcement bar  | 12px                  | Compact utility bar        |
| Nav bar           | 16px-20px             | Comfortable but tight      |
| Hero section      | 120-160px top/bottom  | Generous — image fills     |
| Standard sections | 96px (6rem)           | Default rhythm             |
| Stats bar         | 48px                  | Compact data strip         |
| Footer            | 80px top, 24px bottom | Generous top, tight bottom |

### Border Radius

```js
borderRadius: {
  'sm': '8px',
  'DEFAULT': '12px',     // Primary radius — buttons, cards, inputs, images
  'lg': '16px',
  'xl': '24px',
  'full': '9999px',      // Circle icons, pill buttons
}
```

---

## Component Specifications

### Announcement Bar

- **Position:** Fixed top, full-width
- **Background:** `brand-blue`
- **Text:** White, sans-serif, 14px, centered
- **Layout:** Text left-center, "Explore Careers" link right
- **Height:** ~44px
- **Link styling:** White, underlined

### Navigation Bar

- **Position:** Sticky below announcement bar
- **Background:** White
- **Height:** ~72px
- **Layout:** 3-column — left nav links | center logo | right phone + CTA
- **Logo:** "Hound Around" wordmark in serif font, "RESORT" in small caps/tracked sans below
- **Nav links:** Sans-serif, 16px, regular weight, `text-brown`, no underline, hover opacity
- **Phone:** Sans-serif, 16px, `text-brown`
- **CTA button:** "Book Now" — dark brown bg, white text, 12px radius, ~40px height, hover: slight opacity or blue shift
- **Border:** Subtle bottom border `border-subtle`
- **Mobile:** Hamburger menu at `md` breakpoint (768px)

### Hero Section

- **Layout:** Full-viewport-height (or near it), background image with overlay
- **Image:** Full-bleed photo (woman with black lab, blue sky) — image should extend full width, slight warm/sepia filter
- **Content position:** Bottom-left quadrant, ~40% width
- **Headline:** `display` size (84px), serif, white text, 3-4 lines max
- **Subtext:** `body-lg` (24px), sans light, white, centered under headline
- **CTA:** White bg, dark brown text, 12px radius, generous padding (16px 32px), "Schedule Free Orientation"
- **Text alignment:** Left-aligned headline, center-aligned subtext (as shown)
- **Overlay:** Very subtle — possibly a gradient from bottom-left to transparent (to ensure text readability)

### Section Label (Reusable)

- **Pattern:** Appears above every section headline
- **Font:** Sans-serif, uppercase, `label` size (13px), 10% letter-spacing
- **Color:** `brand-blue` on cream, `white` on blue backgrounds
- **Margin bottom:** 16px before heading

### Services Accordion Section

- **Section bg:** Cream
- **Layout:** Two-column — left accordion list (55%) | right image (45%)
- **Section label:** "WHAT TO EXPECT"
- **Headline:** Serif, h1 size, "Care that does more for your pet. And you."
- **Accordion items:**
  - **Collapsed:** Title (serif, h4/bold) + subtle bottom border + blue circle-plus icon, right-aligned
  - **Expanded (active):** Blue background fill (`brand-blue`), 12px radius, padding 32px, shows: title (white, serif bold) + description (white, sans light) + "Sign Up" button (white bg, brown text, 12px radius)
  - **Transition:** Smooth expand/collapse, bg color transition
- **Image panel:** Large photo, 12px radius, swaps on accordion change with crossfade
- **Items:** Daycare (default expanded), Boarding, Grooming, Self-Wash

### Stats Bar

- **Layout:** 3-column grid with vertical dividers
- **Background:** Cream (same as page) or very slight elevation
- **Borders:** Left/right vertical dividers between items using `border-medium`
- **Stats:**
  - "12+" — serif, `stat` size | "Years of Experience" — sans, body-sm
  - "4.4 ★★★★★" — serif stat + blue star icons inline | "Based on 3,000+ Google Reviews"
  - "8,800" — serif, stat | "Sq Ft Play Space"
- **Star icons:** Blue filled stars, inline with number
- **Alignment:** Center-aligned per column

### Why Hound Around Section

- **Layout:** Split — left text (50%) + right image (50%) top, then 3x2 feature grid below
- **Section label:** "WHY HOUND AROUND" (blue, uppercase)
- **Headline:** Serif, h1, "Suites, not kennels. There's a difference."
- **Body:** Sans light, body size, centered within left column
- **Image:** Interior facility photo (warm tones, leash on hook), 12px radius on visible corners, bleeds to right edge
- **Feature grid:**
  - 3 columns × 2 rows
  - Each cell: Title (sans, bold, 18-20px) + blue circle-plus icon right-aligned
  - Borders: grid lines between cells (`border-medium`)
  - **Expand behavior:** Clicking reveals description paragraph below the title within the cell
  - Items: Live Webcams, Suites Not Kennels, Genuine Care, Expert Staff, Play Included, Family Owned

### Testimonials Section

- **Section bg:** Cream
- **Section label:** "MEMBER STORIES" (blue)
- **Headline:** Serif, h1, "Trusted by hundreds of Minnesota families."
- **Layout:** Horizontal scrolling carousel of cards
- **Cards:**
  - Background: `brand-blue`
  - Border radius: 12px
  - Padding: 32px
  - Min-width: ~280px
  - Content: Paw icon (white, top-left) → quote text (white, sans, 16-18px) → author name + descriptor (white, sans, 14px, bottom)
  - Paw icon: White circle with paw SVG inside, ~40px
- **Carousel:** Horizontal scroll snap, no nav arrows in design (swipe/drag), slight peek of edge cards
- **Overflow:** Cards bleed off edges on both sides

### Plans & Pricing Section

- **Full-width background:** `brand-blue`
- **Layout:** Split — left text (50%) | right image (50%)
- **Section label:** "PLANS AND PRICING" (white, uppercase)
- **Headline:** Serif, h1, white, "You'll love our competitive prices and fun atmosphere"
- **CTA:** "View Our Pricing" text link (white) + blue circle-arrow icon
- **Image:** Interior photo (reception area with dog), sharp rectangle, no radius (bleeds to edge) or subtle radius
- **Note:** This is a CTA/teaser section, not a full pricing table — links to `/pricing`

### Social Section (Independent Block)

- **Background:** Cream
- **Layout:** 50% width block (left side of 2-col layout)
- **Section label:** "FOLLOW ALONG" (blue, uppercase)
- **Headline:** Serif, h2, "Meet the team behind the mission."
- **Body:** Sans light, body size
- **Social links:** Instagram + Twitter icons with labels, inline
- **Image:** Team photo below text, full-width of the block, no radius (or slight)

### Embark Section (Independent Block)

- **Background:** Cream
- **Layout:** 50% width block (right side of 2-col layout)
- **Section label:** "GET THE MODERN ANIMAL APP" (blue, uppercase) — **NOTE: Update this label for Hound Around context, e.g., "PART OF EMBARK PET SERVICES"**
- **Headline:** Serif, h2, "Backed by the best"
- **Body:** Sans light, body size, description of Embark/Cadence backing
- **CTA:** "Learn more about Embark" text + circle-arrow icon
- **Image:** Phone mockup showing Embark app, positioned bottom-right

### FAQ Accordion Section

- **Background:** Cream
- **Section label:** "FREQUENTLY ASKED QUESTIONS" (blue, uppercase)
- **Headline:** Serif, h1, "Get the answers you need for your Dog"
- **Layout:** Single column, full-width accordion (max-width narrow ~800px, centered)
- **Accordion items:**
  - Title: Sans-serif, medium weight, 18-20px
  - Divider: Full-width bottom border `border-medium`
  - Icon: Blue circle-plus, right-aligned (rotates to × or minus on expand)
  - **Expanded:** Answer text appears below, sans light, body size, with padding
- **Items:**
  - What vaccinations are required?
  - What happens at new customer orientation?
  - What is a typical day at Hound Around?
  - What do I need to bring for doggie daycare?
  - What do I need to bring for overnight boarding?
  - What if I have an older or special needs pup?

### Footer

- **Background:** `brand-blue`
- **Layout:** 4-column grid
- **Column 1 (wider):** Newsletter signup — serif headline "Get offers, updates, and more right in your inbox." + email input field (white bg, rounded, blue arrow submit button)
- **Columns 2-4:** Link lists with uppercase labels (CITIES, SERVICES, COMMUNITY, COMPANY)
  - **Note:** Adapt columns for Hound Around — probably: SERVICES, RESOURCES, COMPANY
- **Links:** White text, sans, 14-16px, hover: underline or opacity
- **Bottom bar:** Copyright "© 2026 Hound Around Resort. Part of the Embark Pet Services family." left | "Privacy Policy" + "Terms of Service" right
- **Input field:** White bg, rounded (full radius), placeholder "Email", blue circle submit button inline-right

### Reusable: Circle Icon Button

- **Used everywhere:** Accordion expand, CTA arrows, FAQ expand
- **Size:** 32-36px diameter
- **Background:** `brand-blue`
- **Icon color:** White
- **Border:** None (or very subtle `border-medium` in some contexts like features grid)
- **States:**
  - Default: Blue bg, white icon
  - Hover: Slightly darker blue (`blue-dark`)
  - Active/expanded: Rotate icon 45° (plus → ×) or swap to minus

### Buttons

| Variant    | Background  | Text    | Border              | Radius | Padding   | Hover        |
| ---------- | ----------- | ------- | ------------------- | ------ | --------- | ------------ |
| Primary    | `brown`     | `white` | none                | 12px   | 14px 28px | opacity 90%  |
| Secondary  | `white`     | `brown` | none                | 12px   | 14px 28px | light shadow |
| Ghost      | transparent | `brown` | 1px `border-medium` | 12px   | 14px 28px | cream bg     |
| Inverse    | `white`     | `brown` | none                | 12px   | 14px 28px | opacity 90%  |
| Text+Arrow | transparent | inherit | none                | none   | 0         | underline    |

---

## Homepage Section Map (Top to Bottom)

| #   | Block ID              | Section                             | Background |
| --- | --------------------- | ----------------------------------- | ---------- |
| 1   | `announcementBar`     | Self-wash promo + Careers link      | Blue       |
| 2   | `navigation`          | Logo + nav + phone + Book Now       | White      |
| 3   | `hero`                | Full-image hero with headline + CTA | Image      |
| 4   | `servicesAccordion`   | "What to Expect" — 4 services       | Cream      |
| 5   | `statsBar`            | 12+ years / 4.4 stars / 8,800 sqft  | Cream      |
| 6   | `splitFeature`        | "Why Hound Around" — text + image   | Cream      |
| 7   | `featureGrid`         | 3×2 expandable features             | Cream      |
| 8   | `testimonialCarousel` | "Member Stories" scrolling cards    | Cream      |
| 9   | `ctaBanner`           | "Plans and Pricing" with image      | Blue       |
| 10  | `socialBlock`         | "Follow Along" — team + social      | Cream      |
| 11  | `embarkBlock`         | "Backed by the best" — Embark info  | Cream      |
| 12  | `faqAccordion`        | 6 FAQ items                         | Cream      |
| 13  | `footer`              | Newsletter + links + legal          | Blue       |

---

## Sanity Schema: Page Builder Blocks

Each block should be a Sanity object type registered in the page builder array. Here's the schema shape for each:

```ts
// Shared: Section Label pattern
sectionLabel: { type: 'string', title: 'Section Label' }  // e.g., "WHAT TO EXPECT"

// hero
{
  _type: 'hero',
  headline: string,
  subtext: string,
  backgroundImage: image,
  cta: { label: string, url: string },
  overlay: 'none' | 'light' | 'dark'
}

// servicesAccordion
{
  _type: 'servicesAccordion',
  sectionLabel: string,
  headline: string,
  services: [{
    title: string,
    description: string,
    image: image,
    cta: { label: string, url: string }
  }],
  defaultOpen: number  // index of initially expanded item
}

// statsBar
{
  _type: 'statsBar',
  stats: [{
    value: string,      // "12+", "4.4", "8,800"
    label: string,      // "Years of Experience"
    icon: string,       // optional — for star ratings
    showStars: boolean,
    starCount: number
  }]
}

// splitFeature
{
  _type: 'splitFeature',
  sectionLabel: string,
  headline: string,
  body: portableText,
  image: image,
  imagePosition: 'left' | 'right',
  cta: { label: string, url: string }  // optional
}

// featureGrid
{
  _type: 'featureGrid',
  features: [{
    title: string,
    description: string,  // revealed on expand
    icon: string          // optional iconify icon name
  }],
  columns: 2 | 3
}

// testimonialCarousel
{
  _type: 'testimonialCarousel',
  sectionLabel: string,
  headline: string,
  testimonials: [reference -> testimonial]
}

// ctaBanner
{
  _type: 'ctaBanner',
  sectionLabel: string,
  headline: string,
  cta: { label: string, url: string },
  image: image,
  backgroundColor: 'cream' | 'blue' | 'brown'
}

// socialBlock
{
  _type: 'socialBlock',
  sectionLabel: string,
  headline: string,
  body: string,
  socialLinks: [{ platform: string, url: string }],
  image: image
}

// embarkBlock
{
  _type: 'embarkBlock',
  sectionLabel: string,
  headline: string,
  body: portableText,
  cta: { label: string, url: string },
  image: image  // phone mockup or brand image
}

// faqAccordion
{
  _type: 'faqAccordion',
  sectionLabel: string,
  headline: string,
  faqs: [reference -> faq] | [{ question: string, answer: portableText }]
}
```

---

## Image Asset Requirements

| Image                | Dimensions    | Aspect Ratio | Notes                                 |
| -------------------- | ------------- | ------------ | ------------------------------------- |
| Hero background      | 1920×1080 min | 16:9         | Woman with dog, blue sky, warm filter |
| Service images (×4)  | 800×1000      | 4:5          | One per service, authentic feel       |
| Facility interior    | 800×600       | 4:3          | Warm tones, golden hour light         |
| Team photo           | 800×600       | 4:3          | Staff in uniform, friendly            |
| Phone mockup         | 400×800       | 1:2          | Embark app on iPhone                  |
| Testimonial paw icon | 40×40 SVG     | 1:1          | White paw in circle                   |
| Star icon            | 24×24 SVG     | 1:1          | Filled star, blue                     |
| Plus/expand icon     | 32×32 SVG     | 1:1          | Via Iconify                           |
| Arrow icon           | 20×20 SVG     | 1:1          | Right arrow in circle, via Iconify    |

---

## Animation & Interaction Specs

```js
// Tailwind config
transitionDuration: {
  'fast': '150ms',
  'DEFAULT': '250ms',
  'slow': '400ms',
  'slower': '600ms',
}
transitionTimingFunction: {
  'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
}
```

| Interaction               | Animation                     | Duration | Easing        |
| ------------------------- | ----------------------------- | -------- | ------------- |
| Accordion expand/collapse | Height + opacity + bg color   | 400ms    | ease-out-expo |
| Accordion image swap      | Crossfade opacity             | 400ms    | ease-out      |
| Plus icon rotation        | Rotate 45°                    | 250ms    | ease-out      |
| Card hover (testimonials) | translateY(-2px) + shadow     | 250ms    | ease-out      |
| Scroll reveal (sections)  | Fade up 20px + opacity        | 600ms    | ease-out-expo |
| Button hover              | Opacity or bg shift           | 150ms    | ease-out      |
| Carousel drag             | CSS scroll-snap with momentum | native   | native        |
| Nav sticky transition     | Background opacity on scroll  | 250ms    | ease-out      |

---

## Responsive Breakpoints & Behavior

| Element              | Desktop (1280+)                     | Tablet (768-1279)                 | Mobile (<768)                                   |
| -------------------- | ----------------------------------- | --------------------------------- | ----------------------------------------------- |
| Hero                 | Full viewport, text bottom-left 40% | Full width, text overlay centered | Stack: image top, text below                    |
| Services accordion   | 2-col (55/45 split)                 | 2-col (50/50)                     | Stack: accordion full-width, image below active |
| Stats bar            | 3-col inline                        | 3-col inline                      | Stack vertical                                  |
| Why Hound split      | 2-col (50/50)                       | 2-col (50/50)                     | Stack: text then image                          |
| Feature grid         | 3×2                                 | 2×3                               | 1×6 stack                                       |
| Testimonial carousel | 5 cards visible, peek edges         | 3 cards visible                   | 1.2 cards visible                               |
| Social + Embark      | Side-by-side 50/50                  | Side-by-side 50/50                | Stack vertically                                |
| FAQ                  | Centered narrow (800px)             | Full width padded                 | Full width                                      |
| Footer               | 4-col                               | 2×2 grid                          | Stack single column                             |
| Nav                  | Full horizontal                     | Hamburger menu                    | Hamburger menu                                  |

---

## Claude Code Implementation Notes

### Project Setup Sequence

The project is already initialized from the sanity-template-nextjs-clean starter. The root `package.json` is set with workspaces for `/frontend` and `/studio`.

```bash
# 1. Install additional frontend dependencies (from project root)
npm install geist @iconify/react embla-carousel-react --workspace=frontend

# 2. (Optional) Import sample data to get started with Sanity content
npm run import-sample-data

# 3. Start dev servers (Next.js on :3000, Sanity Studio on :3333)
npm run dev
```

> **Important:** Do not run `npm install` at root for frontend packages. Always use `--workspace=frontend`.

### Build Order

1. **Global setup:** Tailwind config (colors, fonts, spacing, radius), CSS custom properties, layout component with Geist + Libre Caslon Text loaded
2. **Global components:** AnnouncementBar, Navigation, Footer — these frame every page
3. **Reusable primitives:** SectionLabel, CircleIconButton, AccordionItem, Button variants
4. **Homepage sections in order:** Hero → ServicesAccordion → StatsBar → SplitFeature → FeatureGrid → TestimonialCarousel → CTABanner → SocialBlock → EmbarkBlock → FAQAccordion
5. **Sanity schemas:** Register all block types, create page builder field on Page document
6. **Inner pages:** Scaffold route structure, reuse blocks

### Key Implementation Gotchas

- **Geist font:** Import via `geist/font/sans` and `geist/font/mono` in root layout, apply CSS variables
- **Accordion component:** Build ONE reusable `<Accordion>` component with variants for services (with image), features (with description), and FAQ (simple). Use `data-state="open|closed"` for styling
- **Testimonial carousel:** Use Embla Carousel for touch-friendly horizontal scroll. CSS `scroll-snap-type: x mandatory` as fallback
- **Stats bar stars:** Use Iconify `mdi:star` icon, render count dynamically
- **Circle icon button:** This appears ~15 times across the page — make it a proper component with `variant` (blue/white), `icon` (plus/arrow/close), and `size` (sm/md) props
- **Section backgrounds alternate:** Most sections are cream, but pricing and footer are blue. The Social+Embark block sits in cream but renders as two side-by-side independent blocks
- **Footer newsletter input:** Use a form with rounded input + absolute-positioned submit button inside. Connect to Sanity or a webhook later
- **Announcement bar:** Should be dismissible (X button), with the nav becoming the sticky top element after dismissal

### File Structure

```
hound-2/
├── package.json              # Root workspace config (DO NOT add frontend deps here)
├── docs/
│   └── design/               # ← Design reference screenshots for Claude Code
│       ├── hero.png
│       ├── services.png
│       ├── stats.png
│       ├── why-hound.png
│       ├── testimonials.png
│       ├── our-plans.png
│       ├── social-embark.png
│       ├── faqs.png
│       └── footer.png
├── frontend/
│   ├── package.json          # Frontend deps (geist, @iconify/react, embla, etc.)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx          # Root layout with fonts + global styles
│   │   │   ├── page.tsx            # Homepage (fetches page builder blocks)
│   │   │   ├── about/page.tsx
│   │   │   ├── services/
│   │   │   │   ├── boarding/page.tsx
│   │   │   │   ├── grooming/page.tsx
│   │   │   │   ├── daycare/page.tsx
│   │   │   │   └── self-wash/page.tsx
│   │   │   ├── webcams/page.tsx
│   │   │   ├── pricing/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── components/
│   │   │   ├── global/
│   │   │   │   ├── AnnouncementBar.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── MobileMenu.tsx
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── SectionLabel.tsx
│   │   │   │   ├── CircleIconButton.tsx
│   │   │   │   ├── Accordion.tsx
│   │   │   │   └── Container.tsx
│   │   │   └── blocks/
│   │   │       ├── Hero.tsx
│   │   │       ├── ServicesAccordion.tsx
│   │   │       ├── StatsBar.tsx
│   │   │       ├── SplitFeature.tsx
│   │   │       ├── FeatureGrid.tsx
│   │   │       ├── TestimonialCarousel.tsx
│   │   │       ├── CTABanner.tsx
│   │   │       ├── SocialBlock.tsx
│   │   │       ├── EmbarkBlock.tsx
│   │   │       ├── FAQAccordion.tsx
│   │   │       └── BlockRenderer.tsx  # Maps Sanity block types to components
│   │   ├── lib/
│   │   │   └── sanity/
│   │   │       ├── client.ts
│   │   │       └── queries.ts
│   │   └── styles/
│   │       └── globals.css           # CSS custom properties + base styles
├── studio/
│   ├── package.json          # Studio deps (sanity, plugins, etc.)
│   ├── sanity.config.ts
│   └── src/
│       └── schemaTypes/      # Sanity document & object schemas
```

---

## Template Metadata

| Field             | Value                                                  |
| ----------------- | ------------------------------------------------------ |
| Template Name     | Modern Resort                                          |
| Template Category | Boutique / Editorial / Service Business                |
| Industries        | Pet care, hospitality, wellness, spas, boutique retail |
| Design Aesthetic  | Warm editorial with serif typography                   |
| Accent Pattern    | Soft periwinkle blue on warm cream                     |
| Key Component     | Multi-variant accordion system                         |
| Interaction Level | Medium — accordions, carousel, scroll reveals          |
