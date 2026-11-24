# TeddyPups U.A.E. — Premium Teacup Puppies Website Clone

A pixel-accurate, fully responsive, frontend-first clone of the reference boutique pet website [TeddyPups U.A.E.](https://puppy.instabizweb.com/). Developed as part of the **Blutec AI Technical Hiring Assignment**.

---

## 🐶 Project Overview

TeddyPups U.A.E. is a luxury Dubai-based teacup and miniature puppy boutique specializing in ethically raised companion dogs (Maltipoos, Pomeranians, Poodles, Cavapoos, and Shih Tzus), offering showroom visits in Downtown Dubai as well as worldwide climate-controlled cargo and bespoke concierge imports from elite breeders in South Korea and Europe.

This application recreates the complete visual design, warm whimsical editorial branding, responsive layouts, interactive elements, and multi-page routing of the reference website.

---

## 🛠️ Technology Stack

- **React.js (v18.3.1)**: Modern component-driven UI library.
- **Vite (v5.4.2)**: Blazing fast build tool and development server.
- **JavaScript (JSX)**: Clean, modular, standards-compliant ES6+ JavaScript.
- **React Router (v6.26.2)**: Multi-page client-side routing with instant scroll restoration.
- **HTML5 & CSS3**: Custom design system, CSS variables, and bespoke illustrations.
- **Lucide React**: Modern, scalable icon set.
- **Google Fonts**:
  - `Fraunces`: Editorial serif display font for plush headings.
  - `Figtree`: Clean modern geometric sans-serif for body typography.
  - `Shantell Sans`: Handwritten cursive accent font for playful notes and stamps.
- **Git & GitHub**: Version control.
- **Vercel**: Production deployment with single-page routing rewrites (`vercel.json`).

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

### 3. Homepage (`/`)
- **Hero Section (`tp-hero`)**: Sunrise radial ambient gradient, "every puppy is family" kicker badge, plush typography, dual CTAs, and featured puppies showcase.
- **Meet the Pups (`tp-meet`)**: Real-time breed filter tabs (All, Maltipoo, Pomeranian, Poodle, Cavapoo, Shih Tzu) with interactive cards.
- **Two Ways Home (`tp-paths`)**: Side-by-side comparison cards for Downtown Dubai Showroom visits vs. Exclusive Korean Imports.
- **Your Puppy Journey (`tp-chat`)**: 3-step concierge process with an interactive simulated WhatsApp live chat preview.
- **Why Families Trust TeddyPups (`tp-passport`)**: 4 trust pillars highlighting certified health records, ethical breeding, 24/7 care, and international cargo.
- **Happy Families Gallery (`tp-dusk`)**: Client polaroids with heartwarming adopted puppy photos and testimonials.
- **Questions, Answered (`tp-night`)**: Interactive FAQ accordion with expand/collapse states.
- **Ready to Meet Your Best Friend? (`tp-home`)**: Final call-to-action banner.

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
- Official TeddyPups Passport checklist (Vaccines, Health Certificate, Deworming, Pedigree).
- Interactive "Enquire about [Name]" letterform with automated feedback toast.
- Direct WhatsApp inquiry button with prefilled message.

### 6. How It Works Page (`/how-it-works`)
- Comprehensive walkthrough of showroom adoption vs. custom reservations.
- Delivery & collection breakdown: Same-day Dubai collection, doorstep courier, and safe international cargo.
- Premium puppy promise & health guarantees.

### 7. Happy Families Wall (`/happy-families`)
- Photo memory wall featuring real client adoption stories, heartwarming moments, and family names.

### 8. Gone Home Boarding Passes (`/gone-home`)
- Vintage travel boarding pass cards with perforated dashed dividers, "admit one" ticket stubs, and departure details for 25+ adopted puppies.

### 9. FAQ Page (`/faq`)
- Complete searchable accordion containing all 9 official adoption and care questions.

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
│   │   └── logo.png              # Official TeddyPups logo
│   ├── cursor/
│   │   ├── paw.svg               # Custom paw cursor
│   │   └── paw-press.svg         # Click state cursor
│   └── puppies/                  # 120+ downloaded high-res assets
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FloatingBar.jsx       # Pinned bottom quick actions
│   │   ├── Footer.jsx            # Multi-column footer & copyright
│   │   ├── Header.jsx            # Sticky navigation & mobile drawer
│   │   ├── PuppyCard.jsx         # Watercolor wash sketch puppy card
│   │   ├── ScrollToTop.jsx       # Route change scroll reset
│   │   ├── Toast.jsx             # Notification toast component
│   │   └── VideoModal.jsx        # Video preview modal dialog
│   ├── data/
│   │   ├── puppiesData.js        # Available puppies dataset
│   │   └── siteData.js           # FAQs, testimonials, tickets, config
│   ├── pages/
│   │   ├── Contact.jsx           # Postcard contact letterform & showroom
│   │   ├── FAQ.jsx               # Searchable FAQ accordion
│   │   ├── GoneHome.jsx          # Boarding pass ticket archive
│   │   ├── HappyFamilies.jsx     # Client photo gallery
│   │   ├── Home.jsx              # Complete 8-section homepage
│   │   ├── HowItWorks.jsx        # Concierge process & delivery guide
│   │   ├── Puppies.jsx           # Puppies directory with filters & search
│   │   └── PuppyDetail.jsx       # Storybook detail page
│   ├── styles/
│   │   ├── global.css            # Base typography & design variables
│   │   ├── original.css          # Core visual system & animations
│   │   └── responsive.css        # Breakpoints & mobile refinements
│   ├── App.jsx                   # Root router configuration
│   └── main.jsx                  # React DOM entry point
├── .gitignore
├── DEVELOPMENT_LOG.md            # Detailed engineering & decision log
├── index.html                    # HTML5 entry with Google Fonts
├── package.json                  # Dependencies & scripts
├── README.md                     # Documentation
├── vercel.json                   # Vercel SPA rewrite configuration
└── vite.config.js                # Vite build configuration
```

---

## 🚀 Installation & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended; developed on Node v22.17.1)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/blutec-ai-teddypups-clone.git
cd blutec-ai-teddypups-clone
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build locally
```bash
npm run preview
```

---

## 🌐 Deployment to Vercel

This project is fully prepared for zero-configuration Vercel deployment.

### Method 1: Using the Vercel CLI
```bash
npm install -g vercel
vercel
```

### Method 2: Via GitHub Integration
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete TeddyPups website clone"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Navigate to [Vercel Dashboard](https://vercel.com/dashboard).
3. Click **"Add New"** > **"Project"**.
4. Import your GitHub repository.
5. Framework preset will automatically detect **Vite**.
6. Click **"Deploy"**.

The included `vercel.json` ensures that all React Router dynamic routes (`/puppies/:slug`, `/how-it-works`, `/contact`, etc.) work seamlessly without 404 errors on direct reloads.

---

## 📋 Quality Assurance & Verification

- ✅ **Build Status**: Verified with `npm run build` (Exit code 0, 0 errors).
- ✅ **Assets**: 100% of logos, icons, and puppy photography are stored locally in `public/`, eliminating third-party CDN failure risks.
- ✅ **Typography**: Exact editorial pairing of `Fraunces`, `Figtree`, and `Shantell Sans`.
- ✅ **Responsiveness**: Tested across mobile (375px+), tablet (768px+), laptop (1024px+), and desktop (1440px+).
- ✅ **Interactivity**: Working mobile menu, filter pills, search input, video modal, accordion toggle, and letterform submission feedback.

---

## 📄 Documentation

For an in-depth breakdown of architectural choices, challenges encountered, solutions implemented, and technical explanations for the interview, please refer to [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md).
