# TeddyPups U.A.E. — Premium Teacup Puppies Website Clone

A pixel-accurate, fully responsive, frontend-first clone of the reference boutique pet website [TeddyPups U.A.E.](https://puppy.instabizweb.com/). Developed as part of the **Blutec AI Technical Hiring Assignment**.

---

## 🐶 Project Overview

TeddyPups U.A.E. is a luxury Dubai-based teacup and miniature puppy boutique specializing in ethically raised companion dogs (Maltipoos, Pomeranians, Poodles, Cavapoos, and Shih Tzus), offering showroom visits in Downtown Dubai as well as worldwide climate-controlled cargo and bespoke concierge imports from elite breeders in South Korea and Europe.

This application recreates the complete visual design, warm whimsical editorial branding, responsive layouts, interactive elements, native animations, and multi-page routing of the reference website.

---

## 🛠️ Technology Stack

- **React.js (v18.3.1)**: Modern component-driven UI library.
- **Vite (v5.4.2)**: Blazing fast build tool and development server.
- **JavaScript (JSX)**: Clean, modular, standards-compliant ES6+ JavaScript (no TypeScript).
- **React Router (v6.26.2)**: Multi-page client-side routing with instant scroll restoration.
- **HTML5 & CSS3**: Complete extracted design system tokens, 46 native keyframe animations, and custom SVG illustrations.
- **Lucide React**: Modern, scalable icon set.
- **Google Fonts**:
  - `Fraunces`: Editorial serif display font for plush headings (`.font-plush`).
  - `Figtree`: Clean modern geometric sans-serif for body typography (`.font-sans`).
  - `Shantell Sans`: Handwritten cursive accent font for playful notes and stamps (`.font-scrawl`).
- **Git & GitHub**: Version control.
- **Vercel**: Production deployment with single-page routing rewrites (`vercel.json`).

---

## 🎨 Complete Animation & Motion System

1. **Page Curtain & Trotting Mascot (`Curtain.jsx` & `RunningPuppy.jsx`)**:
   - Signature scalloped blanket curtain (`tp-curtain`) with smooth opening lift (`tp-curtain-lift`) and route transition wipes.
   - Fully articulated running puppy SVG with animated running paws (`tp-runner-leg-a`, `tp-runner-leg-b`), bobbing head (`tp-runner-bob`), wagging tail (`tp-runner-wag`), and twitching ears.
   - Paws pat across the screen with progressive animation delays leaving paw prints.
2. **Scroll-Activated Reveal System (`useScrollReveal.js`)**:
   - Global IntersectionObserver hook monitoring elements with `[data-reveal]`, `.tp-sketch`, `.tp-note`, `.tp-tag`, `.tp-ticket`, and `.tp-wall__item`.
   - Arms elements with `data-armed="true"` on mount and automatically activates `data-revealed="true"` when scrolled into view, triggering authentic CSS keyframe transitions without layout shift.
3. **3D Showroom Doors (`Home.jsx`)**:
   - 3D perspective (`perspective: 700px`) doors with brass knobs and peep holes that swing open (`rotateY(var(--door-open))`) upon hover, revealing the puppy in their private room.
4. **Scrapbook Sketches with Retraced Ink (`PuppyCard.jsx`)**:
   - Authentic `.tp-sketch` cards with circular masks, watercolor wash backdrops, hand-drawn ink paths with retrace overlays, status stickers, and hopping doodles (`tp-doodle-hop`).
5. **Masonry Polaroid Memory Wall (`HappyFamilies.jsx`)**:
   - Real CSS multi-column masonry wall (`.tp-wall`) with polaroid prints, pastel washi tapes, and animated paw prints dropping down on scroll (`tp-print-bound`, `tp-paw-pat`). Includes an interactive lightbox modal.
6. **Luggage Tag & Mascot Perch (`PuppyDetail.jsx`)**:
   - Official health certification rendered as a swinging brass luggage tag (`.tp-tag`, `tp-tag-swing`) with the mascot puppy (`PupBuddy.jsx`) perched on top.
7. **Admit-One Boarding Passes (`GoneHome.jsx`)**:
   - Perforated tickets home with circular notches, departure destinations, and slide-in clip-path reveals (`tp-ticket`).
8. **Interactive Sticky Board Notes (`FAQ.jsx`)**:
   - Notice board with colored pushpins, organic angular tilts, live search filtering, and animated expand/collapse accordion flaps.

---

## ✨ Features & Pages Implemented

### 1. Header & Navigation (`/`)
- Brand logo with hover scale and title badge.
- Desktop pill navigation with animated puppy paw hover indicators.
- Direct "WhatsApp us" concierge action button.
- Responsive mobile drawer menu with smooth toggle.
- Sticky background blur on scroll.

### 2. Floating Action Bar
- Pinned bottom pill bar for quick navigation on both desktop and mobile:
  - "Available pups" shortcut
  - "Visit Showroom" shortcut
  - "WhatsApp us" quick trigger

### 3. Homepage (`/`) — 8 Narrative Scenes
- **Hero Quilt (`tp-hero`)**: Sunrise radial ambient gradient, "every puppy is family" badge, plush typography, dual CTAs, and 7 peeking puppies lineup in cozy bed quilt.
- **Meet the Pups (`tp-meet`)**: Showroom doors with 3D perspective open effects.
- **Two Ways Home (`tp-paths`)**: Side-by-side comparison for Downtown Dubai Showroom vs. Exclusive Korean Imports with airplane bobbing animation.
- **Your Puppy Journey (`tp-chat`)**: 3-step concierge process with interactive simulated WhatsApp live chat preview.
- **Why Families Trust TeddyPups (`tp-passport`)**: 4 trust pillars highlighting certified health records, ethical breeding, 24/7 care, and international cargo.
- **Happy Families Gallery (`tp-dusk`)**: Client polaroids with heartwarming adopted puppy photos and testimonials.
- **Questions, Answered (`tp-night`)**: Twinkling golden night stars and FAQ accordion.
- **Ready to Meet Your Best Friend? (`tp-home`)**: Cozy house doorway scene and final CTA.

### 4. Available Puppies Page (`/puppies`)
- Comprehensive listing of 15 available teacup puppies.
- Interactive multi-parameter filtering:
  - **Breed Filter**: Maltipoo, Pomeranian, Poodle, Cavapoo, Shih Tzu.
  - **Origin Filter**: All, In Dubai Showroom, Imported on Request.
  - **Live Search**: Instant keyword search by name, breed, or color.
- Video modal popup when clicking the "▶ video" pill.
- One-click filter reset.

### 5. Puppy Detail Storybook (`/puppies/:slug`)
- Dynamic routes for individual puppies (e.g., `/puppies/copper-male`, `/puppies/maltipoo-max-male`, `/puppies/korean-teacup-maltipoo-female`).
- Multi-image gallery with thumbnail selection and video trigger.
- Detailed specifications table: Breed, Gender, Age, Status, Color, Adult Weight, Origin, and Price.
- Chapter 1 narrative note: Biographical story and personality traits.
- Official TeddyPups Passport checklist (Vaccines, Health Certificate, Deworming, Pedigree) inside swinging brass luggage tag with PupBuddy mascot.
- Interactive "Enquire about [Name]" letterform with automated feedback toast.
- Direct WhatsApp inquiry button with prefilled message.

### 6. How It Works Page (`/how-it-works`)
- Comprehensive walkthrough of showroom adoption vs. custom reservations.
- Delivery & collection breakdown: Same-day Dubai collection, doorstep courier, and safe international cargo.
- Premium puppy promise & health guarantees.

### 7. Happy Families Wall (`/happy-families`)
- Photo memory wall featuring real client adoption stories, heartwarming moments, and family names with lightbox photo preview.

### 8. Gone Home Boarding Passes (`/gone-home`)
- Vintage travel boarding pass cards with perforated dashed dividers, "admit one" ticket stubs, and departure details for 25+ adopted puppies.

### 9. FAQ Page (`/faq`)
- Searchable sticky notes board with push pins and PupBuddy mascot.

### 10. Visit & Contact Page (`/contact`)
- Bespoke postcard / letterform ("Dear TeddyPups...") with live inline inputs.
- Input validation for name, phone, email, UAE area, and selected puppy.
- Showroom address, opening hours (10:00 AM – 10:00 PM Daily), phone, and direct map directions.

---

## 📁 Project Structure

```
Blutec Ai/
├── public/
│   ├── brand/
│   │   └── logo.png              # High-res boutique puppy brand logo
│   ├── cursor/
│   │   ├── paw.svg               # Custom paw cursor
│   │   └── paw-press.svg         # Active press paw cursor
│   └── puppies/                  # 129 local high-res images (0 broken links)
├── src/
│   ├── assets/                   # Static icons & vectors
│   ├── components/
│   │   ├── Curtain.jsx           # Animated opening curtain & route transition
│   │   ├── FloatingBar.jsx       # Pinned bottom quick action dock
│   │   ├── Footer.jsx            # Scalloped footer with social links & hours
│   │   ├── Header.jsx            # Sticky navigation bar with mobile drawer
│   │   ├── PupBuddy.jsx          # Interactive articulated puppy mascot SVG
│   │   ├── PuppyCard.jsx         # Authentic sketchbook sketch card with ink lines
│   │   ├── RunningPuppy.jsx      # Articulated animated running puppy SVG
│   │   ├── ScrollToTop.jsx       # Instant route scroll restoration
│   │   ├── Toast.jsx             # Feedback notification popup
│   │   └── VideoModal.jsx        # Simulated puppy video preview dialog
│   ├── data/
│   │   ├── puppiesData.js        # 15 puppies with specs, stories, and verified image paths
│   │   └── siteData.js           # FAQ data, reviews, boarding passes, showroom info
│   ├── hooks/
│   │   └── useScrollReveal.js    # IntersectionObserver scroll reveal hook
│   ├── pages/
│   │   ├── Contact.jsx           # Inline prose letterform with validation
│   │   ├── FAQ.jsx               # Notice board with pushpin sticky notes
│   │   ├── GoneHome.jsx          # Boarding pass tickets collection
│   │   ├── HappyFamilies.jsx     # Masonry polaroid photo wall with lightbox
│   │   ├── Home.jsx              # 8 narrative scenes matching original site
│   │   ├── HowItWorks.jsx        # Adoption walkthrough and guarantees
│   │   ├── Puppies.jsx           # Filterable catalog with staggered layout
│   │   └── PuppyDetail.jsx       # Storybook profile with swinging brass tag
│   ├── styles/
│   │   ├── fonts.css             # Local font declarations (Fraunces, Figtree, Shantell)
│   │   ├── original.css          # Design tokens & 46 keyframe animations
│   │   └── global.css            # Base styles and Tailwind utility mappings
│   ├── App.jsx                   # Root router, curtain, and scroll reveal provider
│   └── main.jsx                  # Application entry point
├── scripts/                      # Automated asset scrapers and verification tools
├── index.html                    # HTML5 shell with metadata and favicon
├── package.json                  # Dependencies and build scripts
├── vercel.json                   # SPA routing rewrites for Vercel
├── vite.config.js                # Vite build and dev server config
├── DEVELOPMENT_LOG.md            # Comprehensive AI engineering log
└── README.md                     # Project documentation
```

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation & Startup

1. **Clone or enter the project directory**:
   ```bash
   cd "Blutec Ai"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000/`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 🚢 Deploying to Vercel

The application is pre-configured with `vercel.json` for seamless zero-config Vercel deployment:

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy directly to Vercel
vercel
```

Or connect the repository via the [Vercel Dashboard](https://vercel.com/):
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
