# AI DEVELOPMENT & ENGINEERING LOG

**Project**: TeddyPups U.A.E. Website Clone  
**Role**: Senior Full-Stack Developer, UI/UX Designer, and QA Engineer  
**Reference Website**: [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)  
**Client / Assessment**: Blutec AI Technical Assignment  

---

## 1. Reference Website Analysis

### 1.1 Brand Identity & Concept
- **Brand**: TeddyPups U.A.E. (Boutique teacup puppy adoption and import concierge in Downtown Dubai).
- **Aesthetic**: Warm, nostalgic, whimsical editorial design. The site blends luxury boutique pet adoption with playful stationery elements: watercolor washes, postage stamps, handwritten notes, boarding passes ("tickets home"), and animated puppy paw prints.
- **Color Palette**:
  - `--color-milk`: `#fffdf8` (Warm cream primary background)
  - `--color-cocoa`: `#2a170e` (Deep espresso typography & bold borders)
  - `--color-cocoa-soft`: `#5a3a28` (Secondary copy & captions)
  - `--color-toffee`: `#c2622b` (Warm terracotta accent)
  - `--color-toffee-deep`: `#a24a1a` (Primary action button fill)
  - `--color-toffee-ink`: `#8e3f15` (Handwritten kicker headers)
  - `--color-honey`: `#f2be6b` (Sun glow & highlight yellow)
  - `--color-honey-soft`: `#fbe3b4` (Paper wash & badge background)
  - `--color-blush`: `#f9cdbf` (Girl puppy badge & pastel wash)
  - `--color-sky`: `#bfddf5` (Boy puppy badge & light accent wash)
  - `--color-sky-deep`: `#2f6e9e` (Deep cyan accent)

### 1.2 Typography
- **Editorial Display / Headings**: `Fraunces` (Google Fonts variable serif, optical sizes 9-144). Provides high-fashion, storybook character for headlines (`.font-plush`).
- **Body & Controls**: `Figtree` (Google Fonts sans-serif, weights 300 to 900). Crisp legibility across all screen densities (`.font-sans`).
- **Playful Accents & Notes**: `Shantell Sans` (Google Fonts cursive handwritten font). Used for kicked subtitles, stamps, letter notes, and chapter markers (`.font-scrawl`).

### 1.3 Discovered Pages & Routing Architecture
Through comprehensive DOM and RSC stream analysis, the full site architecture was mapped:
1. `/` (Homepage — 8 major scenes)
2. `/puppies` (Available Puppies catalogue with breed, origin, and search filters)
3. `/puppies/:slug` (Bespoke storybook puppy profile with gallery, passport specs, chapter story, and letterform inquiry)
4. `/how-it-works` (Adoption walkthrough, delivery options, and puppy health guarantee)
5. `/happy-families` (Client photo memory wall and testimonials)
6. `/gone-home` (Vintage boarding pass tickets for adopted puppies)
7. `/faq` (9-item interactive adoption and care accordion)
8. `/contact` (Postcard letterform with inline prose inputs, Dubai showroom address, and direct WhatsApp links)

---

## 2. Project Architecture & Decisions

### 2.1 Technology Stack Selection
- **React.js & Vite**: Selected for ultra-fast Hot Module Replacement (HMR), tree-shaking, and lightweight production bundle size (zero overhead).
- **JavaScript (JSX)**: Strictly followed the requirement to avoid TypeScript complexity, keeping code transparent and maintainable.
- **Frontend-First (No Unnecessary Backend)**: As required, avoided creating redundant databases, Django, FastAPI, or Node.js backends. Client-side state and mock asynchronous promises were implemented for form interactions, search filtering, and video modals.
- **Asset Independence**: Downloaded all 129 website images and SVGs into `public/puppies/` and `public/brand/`. This ensures the site never breaks due to remote CDN downtime, cross-origin referrers, or link rot.
- **React Router Dom (v6)**: Enables direct client-side routing between all pages, supported by `ScrollToTop` for instant page scroll resets upon navigation.
- **Vercel SPA Configuration**: Added `vercel.json` with rewrite rules (`"source": "/(.*)", "destination": "/index.html"`) so deep URLs reload seamlessly in production.

### 2.2 Component Hierarchy
```
App
├── Curtain (Scalloped blanket transition curtain with animated running puppy & paw prints)
├── ScrollToTop (Scroll reset on route changes)
├── Header (Sticky navigation, animated paw hover, mobile drawer)
├── Routes
│   ├── Home (8 distinct narrative sections, 3D doors, hero quilt, photowall)
│   ├── Puppies (Sketchbook catalogue with authentic .tp-sketch cards & filters)
│   ├── PuppyDetail (Storybook presentation, gallery, swinging brass tag, PupBuddy)
│   ├── HowItWorks (Two ways home, delivery & collection, guarantees)
│   ├── HappyFamilies (Masonry polaroid photo wall with paw prints & lightbox)
│   ├── GoneHome (Boarding pass ticket collection with perforated borders)
│   ├── FAQ (Notice board with pushpin sticky notes and PupBuddy mascot)
│   └── Contact (Interactive postcard letterform)
├── FloatingBar (Persistent mobile/desktop quick action dock)
├── VideoModal (Simulated live video preview dialog)
├── Toast (Non-intrusive feedback notification system)
└── Footer (Curtain scallop divider, explore links, showroom details)
```

---

## 3. Important Implementation Decisions

### 3.1 The Bespoke "Letterform" Contact Form
Unlike standard generic contact forms with stacked inputs, the reference website features a whimsical letter written from the prospective puppy parent to TeddyPups:
> *"Dear TeddyPups, my name is [name], and you can reach me on [phone] or by email at [email]. I live in [area], and I'm curious about [puppyId]. [message]. with love, a future puppy parent"*

**Implementation**:
- Built custom inline editable input fields with dynamic underlines and focus rings.
- Implemented real-time form validation checking for non-empty names, valid phone numbers, RFC-compliant email formatting, and UAE area locations.
- Designed a "Post my letter" submit button with animated loading states and an automatic confirmation toast notification.

### 3.2 Storybook Puppy Profiles (`/puppies/:slug`)
Each puppy is presented with an individual narrative chapter:
- Dynamic route `/puppies/:slug` matching slugs like `copper-male`, `korean-teacup-maltipoo-female`, and `maltipoo-max-male`.
- Interactive photo switcher supporting multiple images and video clips.
- A "Puppy Passport" component rendered as a swinging brass luggage tag (`.tp-tag`, `animation: tp-tag-swing`) with the mascot puppy (`PupBuddy.jsx`) perched on top.
- Detailed specifications table: Breed, Gender, Age, Status, Color, Adult Weight, Origin, and Price.

### 3.3 Boarding Pass Tickets (`/gone-home`)
For puppies that have already joined their forever homes, the site renders them as vintage travel tickets:
- Styled with notched circular borders and perforated vertical dividers (`border-dashed`).
- Includes departure location ("Dubai showroom" vs. "TeddyPups"), puppy name, breed, gender, and "Admit One" stub.
- Features smooth `clip-path` slide-in entry animation (`tp-ticket`).

---

## 4. Animation & Motion Architecture

### 4.1 Signature Curtain & Running Mascot (`Curtain.jsx` & `RunningPuppy.jsx`)
- **Discovery**: In the reference site, a full-viewport scalloped blanket (`.tp-curtain`) covers the screen during initial boot and route transitions, revealing the content with a smooth lift (`tp-curtain-lift`). Across the blanket, an articulated cartoon puppy trots leaving paw prints (`.tp-curtain__prints`).
- **Implementation**:
  - Reconstructed the complete articulated SVG containing `tp-runner` with shadow, legs (`tp-runner__leg--bf`, `tp-runner__leg--ff`, `tp-runner__leg--bn`, `tp-runner__leg--fn`), tail, bobbing head, and twitching ears.
  - Linked native CSS keyframes (`tp-runner-x`, `tp-runner-leg-a`, `tp-runner-leg-b`, `tp-runner-bob`, `tp-runner-wag`, `tp-runner-ear`).
  - Integrated into `App.jsx` with lifecycle states (`intro` -> `idle`, and route change transitions).

### 4.2 Scroll-Driven IntersectionObserver System (`useScrollReveal.js`)
- **Discovery**: The reference site uses `data-reveal="true"`, `data-armed="true"`, and `data-revealed="true"` attributes to stage and trigger animations as elements enter the viewport.
- **Implementation**:
  - Authored a custom hook `useScrollReveal.js` watching `[data-reveal]`, `.tp-sketch`, `.tp-note`, `.tp-tag`, `.tp-ticket`, and `.tp-wall__item`.
  - On mount, elements receive `data-armed="true"`, setting their initial CSS state (pre-transformed, zero opacity, or clipped).
  - When the element intersects the viewport (`threshold: 0.12, rootMargin: '0px 0px -30px 0px'`), it receives `data-revealed="true"`, smoothly initiating keyframe animations without jank or cumulative layout shifts.

### 4.3 3D Perspective Showroom Doors
- In Scene 2 (`Home.jsx`), the showroom doors use CSS 3D perspective (`perspective: 700px; transform-origin: 0;`).
- On hover or when `data-open="true"`, `.tp-door__leaf` rotates open (`rotateY(78deg)`), revealing the puppy inside their cozy room behind the door.

### 4.4 Authentic Sketchbook Cards (`.tp-sketch`)
- Each card in `/puppies` features:
  - Circular clip-path mask (`.tp-sketch__photo`)
  - Watercolor wash SVG behind the photo (`.tp-sketch__wash`)
  - Retraced ink outlines with hand-drawn character (`.tp-sketch__ink`, `.tp-sketch__line`)
  - Playful doodles that hop when hovered (`tp-doodle-hop`)
  - Alternating staggered vertical offsets (`.tp-sketches > li:nth-child(2n) { translate: 0 2.4rem }`).

---

## 5. Challenges Encountered & Solutions

### Challenge 1: Next.js App Router RSC Payload Extraction
- **Issue**: The original website is a Next.js server-rendered application. Static HTML scraping missed dynamically streamed props and state embedded within `self.__next_f.push(...)` chunks.
- **Solution**: Developed a custom Python extraction script (`inspect_rsc.py` and `extract_all_puppies.py`) that parsed React Server Component (RSC) serialized trees, successfully retrieving the complete dataset of 15 available puppies, their exact specs, stories, and image URLs.

### Challenge 2: Asset Availability & Hash Determinism
- **Issue**: Early scrapers used Python's non-deterministic `hash()` for local filenames, resulting in hash mismatches across different script runs.
- **Solution**: Built `scripts/analysis/image_url_map.json` mapping original media URLs to clean canonical files in `public/puppies/`. Ran `patch_datasets_cleanly.py` ensuring every single referenced image exists on disk (verified: 25/25 active dataset paths exist).

### Challenge 3: Lucide React Missing Brand Icons
- **Issue**: `Instagram` icon was not exported in the installed version of `lucide-react`, causing Rollup build errors during `npm run build`.
- **Solution**: Replaced with a lightweight, accessible inline SVG component matching Lucide's exact 24x24 stroke aesthetic.

### Challenge 4: Deep Route Reloads on Production Hosting
- **Issue**: In Single-Page Applications (SPAs), navigating directly to `/puppies/copper-male` or reloading on a subpage returns a 404 on traditional static servers because the physical file does not exist on disk.
- **Solution**: Created `vercel.json` with URL rewrite rules directing all path requests to `/index.html`, allowing React Router to manage route resolution cleanly.

---

## 6. Testing & Quality Assurance Performed

1. **Production Build Verification**:
   - Command: `npm run build`
   - Result: Successful build in 2.90s (`dist/index.html` 1.19 kB, `index.css` 146.28 kB, `index.js` 312.32 kB).
   - Exit code: 0, 0 compiler warnings.

2. **Navigation & Deep Linking**:
   - Verified that every header and footer link navigates to the correct view:
     - `/` -> Home
     - `/puppies` -> Catalog
     - `/puppies/copper-male` -> Dynamic detail
     - `/how-it-works` -> Process guide
     - `/happy-families` -> Testimonials
     - `/gone-home` -> Boarding passes
     - `/faq` -> Accordion
     - `/contact` -> Postcard form
   - Tested scroll restoration on page change (always resets to top).

3. **Interactive Features**:
   - Curtain lifts smoothly with running puppy and paw prints on initial mount.
   - Breed and origin filters in `/puppies` update visible puppy cards in real time.
   - Search input dynamically filters by name, breed, or color.
   - Clicking "▶ video" launches the VideoModal preview dialog.
   - FAQ items open and close independently with Chevron rotation.
   - Contact letterform performs input validation and triggers a toast notification on submission.
   - Polaroid wall opens lightbox photo modal.

4. **Responsive Testing**:
   - **Mobile (375px - 480px)**: Compact header, collapsible drawer, single-column cards, floating quick action dock.
   - **Tablet (768px - 1024px)**: 2-column grid for puppies and tickets.
   - **Desktop (1280px - 1920px)**: Full 4-column layout, sticky storybook gallery, dual-column contact layout.

---

## 7. Instructions for the Interview & Loom Explanation

When recording your Loom video walkthrough for the hiring team, highlight the following key technical points:

1. **Source of Truth Approach**:
   - Explain how you inspected the real live website rather than inventing a generic template.
   - Mention discovering that the original was a Next.js App Router application with embedded RSC streams, from which you parsed the actual data (15 available puppies, stories, passport specs, 25+ gone-home tickets, and 9 FAQs).
2. **Frontend-First Architecture**:
   - Emphasize that in line with requirements, you did not introduce an unnecessary backend, database, or server; instead, you created a fast, clean, modular React + Vite architecture.
3. **100% Local Asset Independence**:
   - Point out that all 120+ photos and brand logos were downloaded directly into `public/`, ensuring high performance, zero CDN failures, and zero broken image links.
4. **Pixel-Accurate Design System & Animations**:
   - Demonstrate the signature scalloped opening curtain with the running mascot puppy.
   - Show how the IntersectionObserver scroll reveal arms elements and triggers animations on scroll.
   - Show the 3D perspective doors on the homepage that swing open to reveal puppies.
   - Show the hand-drawn sketchbook cards with ink retraces, watercolor washes, and doodle hopping.
   - Show the masonry polaroid photo wall with dropped paw prints and lightbox viewer.
5. **Interactive Polish & UX**:
   - Demonstrate working navigation, real-time breed/origin/search filters on `/puppies`, video modal, the "Dear TeddyPups" inline letterform with validation, and the floating action dock.
6. **Production Readiness**:
   - Show the passing `npm run build` output and explain the inclusion of `vercel.json` with SPA URL rewrites for seamless deployment.

---

## 8. Header, Footer, Puppies Filter Notepad & Landing Page Animations Update

### Header Recreation (Exact Match to Reference Site)
- **Scalloped Bottom Hem SVG**: Integrated `<svg class="tp-header__hem">` with a repeating pattern (`pattern id="tp-hem"` width 44 height 14) rendering the scalloped cloth hem along the bottom of the header.
- **Active Navigation Indicator**: Built custom paw print indicator (`<svg class="tp-nav-link__paw">`) positioned directly below the active nav link with scale and opacity transition, matching `original.css`.
- **Dynamic Scroll States**: Connected `data-scrolled` and `data-home` attributes so the header hem appears on scroll on the homepage and remains persistent across internal pages.
- **Header Actions**: WhatsApp direct button (`btn-whatsapp`) and mobile dialog menu with `where to, friend?` drawer.

### Footer Recreation (Exact Match to Reference Site)
- **Night Atmosphere Styling**: Implemented `--night: #24130b` dark cocoa background with the top hill curve SVG (`.tp-footer__hill`, `viewBox="0 0 1440 80"`).
- **Twinkling Stars & Crescent Moon**: Implemented `.tp-moon` crescent with inset box-shadow and 9 positioned `.tp-twinkle` star SVGs with staggered CSS animation delays.
- **Woven Basket Pup Mascot**: Built `.tp-basket` containing `.tp-basket__back` hollow rim, animated snug puppy mascot (`<PupBuddy facing="right" pose="snug" />`), and front woven wicker body (`.tp-basket__front`).
- **Footer Navigation & Socials**: "Explore" links column with "Happy families" highlighted in honey, "Say hello" column with Dubai address and pill buttons for Instagram, TikTok, and Facebook.
- **Bottom Bar**: Brand emblem + "© 2026 TeddyPups U.A.E." on left, and hand-scrawled "every puppy is family" on the right.

### Puppies Page Filter Notepad (`.tp-sketchpad`)
- **Authentic Paper & Washi Tape**: Styled container with hand-drawn rounded borders, drop-shadow (`5px 7px #2a170e1f`), and tilted pastel washi tape (`.tp-sketchpad:before`).
- **3-Row Sticker Chip Matrix**:
  1. `where`: [Everywhere] (active default), [Imported], [Korean Teacup].
  2. `breed`: [Maltipoo], [Pomeranian], [Poodle], [Cavapoo], [Shih Tzu].
  3. `boy or girl`: [Boys], [Girls].
- **State & Animation**: Controlled `aria-pressed` states on `.tp-sticker-chip` buttons, toggling cocoa fill with subtle rotation and hop transitions.
- **Self-Portrait Frame**: Positioned circular portrait on top right (`.tp-sketchbook__self`) featuring Teddy with caption "self-portrait".

### Homepage Mascot Animations
- Integrated all 8 interactive `pup-stop` mascot instances across homepage scenes:
  1. Hero Quilt: Mascot peeking out from behind the quilt (`data-pose="peek"`).
  2. Scene 2 (Showroom Doors): Mascot sitting on the showroom floor (`data-pose="sit"`).
  3. Scene 3 (Origins Fork): Mascot sitting at the local/imported junction.
  4. Scene 4 (Chat): Mascot sitting beside the WhatsApp consultation console.
  5. Scene 5 (Passport): Mascot sitting next to the health guarantee booklet.
  6. Scene 6 (Dusk): Mascot sitting beside the happy families wall.
  7. Scene 7 (Night FAQ): Mascot with `?` wonder badge tilting head (`data-act="tilt"`).
  8. Scene 8 (Cozy House): Mascot bowing on the "welcome home" doormat (`data-pose="bow"`).

---

## 9. Screen Recording Video Animation Analysis & Implementations

### Analysis of Uploaded Video (`Screen_Recording_2026-09-18_181525.mp4`)
- **Video Metadata**: 48.10s duration, 30.00 FPS, 1443 frames, 1920x916 resolution.
- **Content Observed**: Walkthrough of an Airbnb listing (*"Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"* in Goa).
- **Core Animation & UI Interaction Patterns Observed**:
  1. *Photo Tour Modal (0:02 - 0:15)*: Clicking "Show all photos" opens a categorized full-screen modal with smooth slide-in, sticky back arrow header, and categorized high-resolution photography.
  2. *Sticky Widget Beside Scrolling Content (0:16 - 0:21)*: Price and booking card fixed while page content smoothly scrolls underneath.
  3. *Review Category Pills (0:22 - 0:33)*: Interactive category chips (Comfort, Accuracy, Hot tub, Cleanliness, Hospitality) with active counts.
  4. *Card Carousel with Pagination (0:40 - 0:48)*: "More stays nearby" horizontal slider with page count indicator (`1 / 2`) and circular `<` / `>` slide navigation buttons smoothly moving card groups.

### Features Implemented to Match Both Reference Video & Reference Site
1. **Showroom Carousel Slider (`Home.jsx` Scene 2)**:
   - Added horizontal slide pagination controls (`1 / 2`) with styled circular `<` and `>` buttons.
   - Enabled smooth horizontal scroll transitions on `.tp-meet__track` with touch and click support.
2. **Full-Screen Photo Tour Modal (`PuppyDetail.jsx`)**:
   - Added a "Show all photos" button with grid icon on the main photo card.
   - Built a full-screen `PhotoTourModal` with sticky header, back button, share icon, and categorized portraits.
3. **Interactive Review & Memory Category Filter Pills (`HappyFamilies.jsx`)**:
   - Added filter chips with pill counts (`All memories`, `Dubai families`, `Maltipoo`, `Pomeranian`, `Teacup`, `International delivery`).
   - Integrated next/previous photo navigation arrows into the photo lightbox viewer.




## Phase 8: 100% Recreation of the "How It Works" Page (`https://puppy.instabizweb.com/how-it-works`)

- **Analysis & Extraction**:
  - Extracted the exact DOM structure and classes from the reference website.
  - Extracted 69 exact CSS rules and keyframe animations (`tp-plane-bob`, `tp-step-in`, `tp-stamp-in`) directly from the live CSS bundle.
- **Section-by-Section Recreation**:
  1. **Sky Gradient Scene (`.tp-scene`)**:
     - Custom properties `--sky-top: #fffbf3` and `--sky-bottom: #f6cc85` matching the warm sunrise aesthetic.
     - Headline `How it works` in Fraunces display font (`font-plush text-giant`) and wide lede text.
     - Sticky jump navigation with 4 anchor chips: `1 Two ways home`, `2 Our premium puppy promise`, `3 Delivery & collection`, `4 Why choose us`.
  2. **Two Ways Home Interactive Switch (`.tp-switch`)**:
     - Sliding organic thumb with spring curve: `translate: calc(var(--at) * 100%) 0; transition: translate .5s var(--ease-pounce)`.
     - Dual tabs (`In Dubai` / `meet in person` and `Imported` / `order upon request`).
     - Companion sitting mascot `<PupBuddy facing="right" pose="sit" />`.
     - Panel 1 ("In Dubai"): Downtown Dubai postcard with skyline SVG, Burj Khalifa silhouette, and 4 roadmap steps with colored icons.
     - Panel 2 ("Imported"): Flight route postcard with curved trajectory, animated airplane, and 4 import roadmap steps.
  3. **Puppy Promise Passport (`.tp-paper -rotate-[0.6deg]`)**:
     - Radial patterned notebook background with dashed inner border.
     - 3 tilted postal stamps (`tp-stamp`):
       - Round stamp: `Hand-selected breeders` (`--ink-stamp: #a24a1a`, `--tilt: -8deg`).
       - Ticket stamp: `Full transparency` (`--ink-stamp: #1f6b45`, `--tilt: 5deg`).
       - Oval stamp: `Safe, stress-free delivery` (`--ink-stamp: #5a3a28`, `--tilt: -4deg`).
  4. **Delivery & Collection Grid (`#delivery`)**:
     - 4 delivery methods with clear typography and spacing.
     - Flight path diagram with Korea -> Dubai trajectory and multi-piece airplane vector.
  5. **Why Choose Us (`#why`)**:
     - 3 value proposition rows with 64x64 illustrated vectors (`International cargo`, `Support 24/7`, `Health guarantee`).
  6. **Unique and High Quality Puppies CTA Board (`.tp-board`)**:
     - Dashed border inset, shadow, green WhatsApp action button, outlined catalog button.
     - Polite bowing mascot `<PupBuddy facing="left" pose="bow" />`.
- **Build & Verification**:
  - Vite production build cleanly verified (`dist/assets/`).
  - Hot Module Replacement active and verified on `http://localhost:3000/how-it-works`.


## Phase 9: 100% Recreation of the "Happy Families" Page (`https://puppy.instabizweb.com/happy-families`)

- **Analysis & Extraction**:
  - Extracted the exact DOM structure from `scraped_pages/happy-families.html`.
  - Identified all 64 real client memory items with their exact washi tape styles, colors, and polaroid tilts.
  - Downloaded all 64 authentic polaroid images directly to `public/media/` with zero missing assets.
  - Extracted the complete set of 46 CSS rules governing `.tp-memories`, `.tp-memories__note`, `.tp-wall`, `.tp-polaroid`, and `.tp-tape`.
- **Page Implementation**:
  - Warm lined canvas background with subtle vertical stripes and radial glow.
  - Header with Fraunces headline `Happy families` and custom heart SVG vector.
  - Sarah M. lined-paper testimonial note card (`.tp-memories__note`) with center pastel blue washi tape (`--tape: #cfe5f6`).
  - 4-column responsive masonry photo wall (`.tp-wall`) rendering all 64 polaroid cards.
  - Authentic jagged torn washi tape (`.tp-tape`) with realistic polygon clip path and positions (`--center`, `--left`, `--right`, `--tl`, `--tr`).
  - Hover animations with slight elevation, zero rotation, and authentic drop shadows.
  - Full-featured Lightbox viewer with Next, Previous, keyboard navigation (Left/Right/Esc), and photo counter (`Photo X of 64`).
  - Footer with seated mascot `<PupBuddy facing="left" pose="sit" />` and scrawl caption: *"every one of them was a Teddy Pup once"*.
- **Build Verification**:
  - Vite production build cleanly passed in 2.28s.
  - Git committed under commit `2c03852`.


## Phase 10: 100% Recreation of the "Puppies" Page & Typography (`https://puppy.instabizweb.com/puppies`)

- **Typography & Exact Font Assets**:
  - Downloaded all **10 exact variable `.woff2` font files** directly from the live reference bundle:
    - `Fraunces` variable with custom axes `SOFT` 100, `WONK` 0, `opsz` 36.
    - `Figtree` variable weights 300 to 900.
    - `Shantell Sans` handwritten variable weights 300 to 800.
  - Linked locally in `public/fonts/` and imported through `src/styles/fonts.css` with fallbacks (`Times New Roman`, `Arial`).
  - Active throughout CSS via `--font-display`, `--font-sans`, `--font-hand`, `.font-plush`, and `.font-scrawl`.
- **Sketchbook Page Layout (`.tp-sketchbook`)**:
  - Exact radial dotted grid background (`#2a170e17` 1px at 26px interval) over warm cream gradient.
  - Headline `Available puppies` with organic hand-drawn wavy underline SVG (`.tp-sketchbook__underline`).
  - Lede description and circular self-portrait mascot frame (`.tp-sketchbook__self`) with double-sketched border and handwritten `self-portrait` caption.
- **3-Row Filter Notepad (`.tp-sketchpad`)**:
  - Soft cream paper pad with angled washi tape at top-left.
  - Row 1: `where` (`Everywhere`, `Imported`, `Korean Teacup`).
  - Row 2: `breed` (`Maltipoo`, `Pomeranian`, `Poodle`, `Cavapoo`, `Shih Tzu`).
  - Row 3: `boy or girl` (`Boys`, `Girls`).
  - Smooth sticker chip toggle interactions (`.tp-sticker-chip`) with dark cocoa active states (`aria-pressed`).
- **Puppy Sketch Cards & Masonry Grid (`.tp-sketches`)**:
  - Staggered column grid with even cards offset down by `2.4rem`.
  - Watercolor wash backgrounds (`.tp-sketch__wash`), circular mask photos (`clip-path`), hand-drawn ink loops (`.tp-sketch__line`), and hopping doodles (`.tp-sketch__doodle`).
  - Status sticker badges, play video buttons, and direct detail routing.
- **"Already Gone Home" Strip (`.tp-gone-strip`)**:
  - Honey-soft dotted background section at the bottom.
  - Left column: `Already gone home` heading, description, and link button to `/gone-home`.
  - Right column: Grid row of small sketch cards (`.tp-sketch--small`) showcasing 5 adopted puppies (Ace, Leo, Mia, Sadie, Pomeranian) with `gone home` badges and sepia/saturate filters.
- **Build Verification**:
  - Production build clean (`npm run build` in 5.68s, 0 errors).
  - Git committed under commit `ea08bc6`.


## Phase 11: 100% Recreation of the "Gone Home" Boarding Ticket Booth Page (`https://puppy.instabizweb.com/gone-home`)

- **DOM Analysis & Extraction**:
  - Extracted 100,920 bytes of reference `<main>` markup from `https://puppy.instabizweb.com/gone-home` into `scripts/extracted_gone_home.html`.
  - Identified all 27 adopted puppy boarding pass tickets with exact metadata, tilts, and image URLs into `src/data/goneHomeTicketsData.json`.
  - Downloaded all **27 authentic high-resolution puppy photos** locally to `public/media/` with zero missing assets.
  - Extracted and integrated the 28 exact CSS rules for `.tp-boothhead`, `.tp-booth`, `.tp-booth__counter`, `.tp-tickets`, `.tp-ticket`, `.tp-ticket__main`, `.tp-ticket__stub`, and radial tear cutouts.
- **Ticket Booth Header (`.tp-boothhead`)**:
  - Headline `Gone home` in Fraunces (`.font-plush`) with authentic heart SVG vector.
  - Lede description: *"Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match."*
  - Action link: `<Link class="btn btn-primary mt-8" to="/puppies">See available puppies</Link>`.
  - **Ticket Booth (`.tp-booth`)**:
    - Animated mascot Teddy `<PupBuddy facing="right" pose="peek" className="tp-booth__teddy" />` peering over the booth with paws resting on the counter ledge.
    - Counter bar (`.tp-booth__counter`) with authentic toffee-and-milk striped awning pattern and `"tickets home"` lettering in Fraunces.
- **Authentic Boarding Tickets Grid (`.tp-tickets`)**:
  - Responsive CSS grid (`repeat(auto-fill, minmax(min(100%, 21rem), 1fr))`) rendering all 27 puppies:
    1. Ace (Pomeranian, boy — TeddyPups ✈️ home ♥)
    2. Leo (Poodle, boy — TeddyPups ✈️ home ♥)
    3. Mia (Maltipoo, girl — Dubai showroom ✈️ home ♥)
    4. Sadie (Maltipoo, girl — TeddyPups ✈️ home ♥)
    5. Pomeranian (Boy — TeddyPups ✈️ home ♥)
    6. Ollie (Pomsky, boy — TeddyPups ✈️ home ♥)
    7. Bruno (Maltipoo, boy — Dubai showroom ✈️ home ♥)
    8. Buddy (Maltese, boy — Dubai showroom ✈️ home ♥)
    9. Charlie (Maltese, boy — TeddyPups ✈️ home ♥)
    10. Daisy (Pomeranian, girl — Dubai showroom ✈️ home ♥)
    11. Bella (Pomeranian, girl — TeddyPups ✈️ home ♥)
    12. Teddy (Poodle, boy — TeddyPups ✈️ home ♥)
    13. Molly (Cavapoo, girl — Dubai showroom ✈️ home ♥)
    14. Coco (Poodle, boy — TeddyPups ✈️ home ♥)
    15. Rosie (Maltipoo, girl — TeddyPups ✈️ home ♥)
    16. Leo (Pomeranian, boy — Dubai showroom ✈️ home ♥)
    17. Molly (Pomeranian, girl — TeddyPups ✈️ home ♥)
    18. Rocky (Maltipoo, boy — TeddyPups ✈️ home ♥)
    19. Sophie (Maltipoo, girl — Dubai showroom ✈️ home ♥)
    20. Lola (Poodle, girl — TeddyPups ✈️ home ♥)
    21. Rex (Cavapoo, boy — TeddyPups ✈️ home ♥)
    22. Finn (Poodle, boy — TeddyPups ✈️ home ♥)
    23. Zoe (Maltipoo, girl — Dubai showroom ✈️ home ♥)
    24. Mimi (Pomeranian, girl — Dubai showroom ✈️ home ♥)
    25. Bailey (Bichon, boy — Dubai showroom ✈️ home ♥)
    26. Maltipoo (Girl — TeddyPups ✈️ home ♥)
    27. Poodle (Girl — Dubai showroom ✈️ home ♥)
  - Individual tilt angle (`--tilt: -1.4deg`, `1.1deg`, etc.) with smooth leveling transition to `0deg` on hover.
  - Authentic radial mask cutouts (`mask: radial-gradient(...)`) on main body and stub edges producing circular notch tear perforations.
  - Circular photo frame (`.tp-ticket__photo`) with smooth fade-in loading state (`transition: opacity 0.4s ease`, `opacity: loaded ? 1 : 0`), exact background color placeholders (`bgColor`), and custom `objectPosition` focal alignment.
  - Perforated golden tear stub (`.tp-ticket__stub`) with vertical `"admit one"` text rotated 180° (`writing-mode: vertical-rl; rotate: 180deg`) that animates and tears open by `7deg` on ticket hover (`rotate: 7deg`).
- **Build Verification**:
  - Vite production build cleanly completed in 2.50s with zero errors (`dist/index.html`, `dist/assets/`).
