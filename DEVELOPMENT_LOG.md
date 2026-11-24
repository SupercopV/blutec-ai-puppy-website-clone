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
├── Header (Sticky navigation, animated paw hover, mobile drawer)
├── ScrollToTop (Scroll reset on route changes)
├── Routes
│   ├── Home (8 distinct narrative sections)
│   ├── Puppies (Multi-parameter filterable catalog)
│   ├── PuppyDetail (Storybook presentation, gallery, specs, enquiry)
│   ├── HowItWorks (Two ways home, delivery & collection, guarantees)
│   ├── HappyFamilies (Polaroid photo wall)
│   ├── GoneHome (Boarding pass ticket collection)
│   ├── FAQ (Searchable accordion)
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
Each puppy is not merely an e-commerce product; they are presented with an individual narrative chapter:
- Dynamic route `/puppies/:slug` matching slugs like `copper-male`, `korean-teacup-maltipoo-female`, and `maltipoo-max-male`.
- Interactive photo switcher supporting multiple images and video clips.
- A "Puppy Passport" component clearly presenting UAE vet health certifications, vaccination status, microchip information, and comprehensive warranties.

### 3.3 Boarding Pass Tickets (`/gone-home`)
For puppies that have already joined their forever homes, the site renders them as vintage travel tickets:
- Styled with notched circular borders and perforated vertical dividers (`border-dashed`).
- Includes departure location ("Dubai showroom" vs. "TeddyPups"), puppy name, breed, gender, and "Admit One" stub.

### 3.4 Watercolor Tilt Effects
Puppy cards on the homepage and catalog feature subtle random rotations (`--tilt: 1.47deg`, `-1.1deg`) and pastel background wash fills (`#fbe3b4`, `#f9cdbf`, `#bfddf5`), mimicking hand-drawn watercolor sketches in a scrapbook.

---

## 4. Challenges Encountered & Solutions

### Challenge 1: Next.js App Router RSC Payload Extraction
- **Issue**: The original website is a Next.js server-rendered application. Simple static HTML scraping missed dynamically streamed props and state embedded within `self.__next_f.push(...)` chunks.
- **Solution**: Developed a custom Python extraction script (`inspect_rsc.py` and `extract_all_puppies.py`) that parsed React Server Component (RSC) serialized trees, successfully retrieving the complete dataset of 15 available puppies, their exact specs, stories, and image URLs.

### Challenge 2: Asset Availability & Third-Party Reliance
- **Issue**: Relying on remote URLs from `https://puppy.instabizweb.com/_next/image?url=...` creates third-party dependencies, rate limits, and potential future 404s.
- **Solution**: Created `download_all_assets.py` which resolved 258 URL variants and downloaded all 129 unique high-resolution images locally into `public/puppies/` and `public/brand/logo.png`. Created an automated mapping script (`update_dataset_images.py`) ensuring zero broken images.

### Challenge 3: Lucide React Missing Brand Icons
- **Issue**: `Instagram` icon was not exported in the installed version of `lucide-react`, causing Rollup build errors during `npm run build`.
- **Solution**: Replaced with a lightweight, accessible inline SVG component matching Lucide's exact 24x24 stroke aesthetic.

### Challenge 4: Deep Route Reloads on Production Hosting
- **Issue**: In Single-Page Applications (SPAs), navigating directly to `/puppies/copper-male` or reloading on a subpage returns a 404 on traditional static servers because the physical file does not exist on disk.
- **Solution**: Created `vercel.json` with URL rewrite rules directing all path requests to `/index.html`, allowing React Router to manage route resolution cleanly.

---

## 5. Testing & Quality Assurance Performed

1. **Production Build Verification**:
   - Command: `npm run build`
   - Result: Successful build in 3.81s (`dist/index.html` 1.19 kB, `index.css` 146.28 kB, `index.js` 273.58 kB).
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
   - Mobile hamburger menu opens and closes smoothly.
   - Breed and origin filters in `/puppies` update visible puppy cards in real time.
   - Search input dynamically filters by name, breed, or color.
   - Clicking "▶ video" launches the VideoModal preview dialog.
   - FAQ items open and close independently with Chevron rotation.
   - Contact letterform performs input validation and triggers a toast notification on submission.

4. **Responsive Testing**:
   - **Mobile (375px - 480px)**: Compact header, collapsible drawer, single-column cards, floating quick action dock.
   - **Tablet (768px - 1024px)**: 2-column grid for puppies and tickets.
   - **Desktop (1280px - 1920px)**: Full 4-column layout, sticky storybook gallery, dual-column contact layout.

---

## 6. AI Development Tools & Prompts Used

### 6.1 Tools Utilized
- **Google Antigravity IDE (Gemini 3.8 Flash)**: High-speed reasoning, codebase inspection, multi-tool orchestration.
- **PowerShell / Terminal Tooling**: Build automation, file system management, package auditing.
- **Python 3.13 Scrapers**: BeautifulSoup4 and urllib for HTML/CSS/RSC analysis and asset downloading.

### 6.2 Key Prompts & Invocations
1. **Initial Inspection Prompt**:
   > *"Navigate to https://puppy.instabizweb.com/. Inspect the visual design, branding, logo, colors, font families, navigation bar, hero section, and all content sections down to the footer. Capture every section in detail, check all links, interactive elements, and typography."*
2. **Data & RSC Stream Parsing Prompt**:
   > *"Extract all puppy cards, FAQs, customer testimonials, and boarding passes from the scraped Next.js RSC chunks and save them into clean structured JSON datasets."*
3. **Asset Resolution Prompt**:
   > *"Download all 129 images locally into public/ and map them into puppiesData.js so the application is 100% self-sufficient and offline-resilient."*
4. **Build Optimization Prompt**:
   > *"Verify npm run build, resolve any missing icon exports, and configure vercel.json for seamless single-page routing."*

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
4. **Pixel-Accurate Design System**:
   - Show how you matched the exact editorial typography (`Fraunces`, `Figtree`, and `Shantell Sans`), custom color palette (`--color-milk`, `--color-cocoa`, `--color-toffee`), watercolor wash cards with subtle tilt rotations, and custom animated paw hover indicators.
5. **Interactive Polish**:
   - Demonstrate the working mobile navigation drawer, real-time breed/origin/search filters on `/puppies`, the video preview modal, the "Dear TeddyPups" inline letterform with validation, and the floating action dock.
6. **Production Readiness**:
   - Show the passing `npm run build` output and explain the inclusion of `vercel.json` with SPA URL rewrites for seamless deployment.
