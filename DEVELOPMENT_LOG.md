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

