import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import VideoModal from '../components/VideoModal';
import { PUPPIES_DATA } from '../data/puppiesData';
import { SITE_CONFIG, FAQ_DATA } from '../data/siteData';

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeVideoPuppy, setActiveVideoPuppy] = useState(null);

  // Lineup puppies for Hero Quilt
  const heroLineup = [
    { slug: 'maltipoo-max-male', name: 'Max', breed: 'Maltipoo', img: '/puppies/asset_70474.webp', x: '8%', w: '8.6rem', peek: '0.62', tilt: '-5deg', i: 0 },
    { slug: 'korean-teacup-maltipoo-female', name: 'Korean Teacup', breed: 'Maltipoo', img: '/puppies/asset_316919.jpg', x: '22%', w: '8.2rem', peek: '0.58', tilt: '3deg', i: 1 },
    { slug: 'korean-teacup-poodle-female', name: 'Korean Teacup', breed: 'Poodle', img: '/puppies/asset_359302.jpg', x: '36%', w: '8.8rem', peek: '0.65', tilt: '-2deg', i: 2 },
    { slug: 'maltipoo-cavapoo-male', name: 'Maltipoo & Cavapoo', breed: 'Cavapoo', img: '/puppies/asset_200548.jpg', x: '50%', w: '9.2rem', peek: '0.6', tilt: '4deg', i: 3 },
    { slug: 'toy-poodle-male-female', name: 'Toy Poodle', breed: 'Poodle', img: '/puppies/asset_400624.jpg', x: '64%', w: '8.4rem', peek: '0.55', tilt: '-3deg', i: 4 },
    { slug: 'maltipoo-female-2', name: 'Maltipoo', breed: 'Maltipoo', img: '/puppies/asset_54838.jpg', x: '78%', w: '8.6rem', peek: '0.62', tilt: '2deg', i: 5 },
    { slug: 'pomeranian-female', name: 'Pomeranian', breed: 'Pomeranian', img: '/puppies/asset_365543.jpg', x: '92%', w: '8rem', peek: '0.56', tilt: '-4deg', i: 6 }
  ];

  // Meet the Pups Doors
  const doorColors = ['#a24a1a', '#2f6e9e', '#8e3f15', '#a24a1a', '#2f6e9e', '#8e3f15', '#a24a1a', '#2f6e9e'];

  // Dusk Memories Polaroids
  const duskPolaroids = [
    { id: 1, name: 'Lulu 🧸 with her new mummy ❤️', img: '/puppies/asset_351586.jpg', tilt: '-2.2deg', tape: '#f6d79a' },
    { id: 2, name: 'Adorable Maltipoo baby 🧸❤️', img: '/puppies/asset_391444.jpg', tilt: '1.8deg', tape: '#f8c2b0' },
    { id: 3, name: 'My new teddy puppy 🥰🧸', img: '/puppies/asset_400624.jpg', tilt: '-1.4deg', tape: '#d6e8f8' },
    { id: 4, name: 'Our new puppies 🧸🥰🤗', img: '/puppies/asset_489622.jpg', tilt: '2.5deg', tape: '#f6d79a' },
    { id: 5, name: 'New puppy 🧸😍', img: '/puppies/asset_200548.jpg', tilt: '-2deg', tape: '#f8c2b0' }
  ];

  return (
    <main id="main" className="relative pt-[var(--header-h)] outline-none overflow-x-hidden" tabIndex="-1">
      
      {/* ==================== SCENE 1: HERO ==================== */}
      <section 
        aria-labelledby="hero-title" 
        className="tp-scene tp-hero" 
        data-pup-scene="true" 
        data-tone="light" 
        style={{ '--sky-top': '#fffdf8', '--sky-bottom': '#fff1d8', '--quilt': '#fff1d8' }}
      >
        <span aria-hidden="true" className="tp-hero__sun" />
        
        <div className="tp-hero__copy gutter">
          <p className="tp-hero__note font-scrawl">
            every puppy is family
            <svg aria-hidden="true" className="absolute -bottom-2 left-0 h-3 w-full text-toffee" preserveAspectRatio="none" viewBox="0 0 220 24">
              <path d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
            </svg>
          </p>
          <h1 className="tp-hero__title font-plush" id="hero-title">
            <span className="tp-hero__line">Premium teacup</span>{' '}
            <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
          </h1>
          <p className="tp-hero__lede">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>
          <div className="tp-hero__actions">
            <Link className="btn btn-primary" to="/puppies">
              View available puppies
            </Link>
            <a 
              className="btn btn-ghost" 
              href={SITE_CONFIG.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        {/* Hero Quilt Lineup of Puppies */}
        <div className="tp-hero__stage">
          <ul aria-label="Some of the puppies in our showroom" className="tp-lineup">
            {heroLineup.map((pup, idx) => (
              <li 
                key={idx} 
                className="tp-lineup__seat" 
                style={{ '--x': pup.x, '--w': pup.w, '--peek': pup.peek, '--tilt': pup.tilt, '--i': pup.i }}
              >
                <Link 
                  to={`/puppies/${pup.slug}`} 
                  className="tp-lineup__pup" 
                  aria-label={`Meet ${pup.name}, ${pup.breed}`}
                >
                  <span className="tp-lineup__photo">
                    <img src={pup.img} alt={pup.name} loading="eager" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="tp-lineup tp-lineup--tags" aria-hidden="true">
            {heroLineup.map((pup, idx) => (
              <li 
                key={idx} 
                className="tp-lineup__tag font-scrawl text-xs font-bold text-[#8e3f15]" 
                style={{ left: pup.x, transform: 'translateX(-50%)' }}
              >
                {pup.name}
              </li>
            ))}
          </ul>

          {/* Cozy Bed Quilt SVG Edge */}
          <div className="tp-quilt" aria-hidden="true">
            <svg className="tp-quilt__edge" viewBox="0 0 1440 40" preserveAspectRatio="none">
              <path d="M0 20 Q 36 0 72 20 T 144 20 T 216 20 T 288 20 T 360 20 T 432 20 T 504 20 T 576 20 T 648 20 T 720 20 T 792 20 T 864 20 T 936 20 T 1008 20 T 1080 20 T 1152 20 T 1224 20 T 1296 20 T 1368 20 T 1440 20 L 1440 40 L 0 40 Z" fill="var(--sky-bottom)" />
            </svg>
          </div>
        </div>
      </section>


      {/* ==================== SCENE 2: MEET THE PUPS ==================== */}
      <section 
        aria-labelledby="meet-title" 
        className="tp-scene tp-meet" 
        data-pup-scene="true" 
        data-tone="light" 
        style={{ '--sky-top': '#fff1d8', '--sky-bottom': '#fbe3b4' }}
      >
        <div className="tp-meet__stage">
          <header className="tp-meet__head gutter">
            <div>
              <h2 className="font-plush text-huge" id="meet-title">
                Meet the pups
              </h2>
              <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft)]">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <Link className="btn btn-primary shrink-0" to="/puppies">
              See all available puppies
            </Link>
          </header>

          <div className="tp-meet__hall">
            <ol aria-label="Puppies looking for a family" className="tp-meet__track">
              {PUPPIES_DATA.slice(0, 8).map((puppy, idx) => (
                <li key={puppy.id} className="tp-door" data-open="true">
                  <Link 
                    className="tp-door__link" 
                    to={`/puppies/${puppy.slug}`} 
                    style={{ '--door': doorColors[idx % doorColors.length] }}
                  >
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">
                        {puppy.name}
                      </span>
                      <span className="tp-door__meta">
                        {puppy.breed}, {puppy.gender}, {puppy.age}{puppy.hasVideo ? ', with video' : ''}
                      </span>
                    </span>

                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <img 
                          alt={puppy.name} 
                          src={puppy.primaryImage} 
                          loading="lazy" 
                        />
                      </span>
                      <svg aria-hidden="true" className="tp-door__peephole" viewBox="0 0 40 40">
                        <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        <circle cx="20" cy="20" r="4" fill="currentColor" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>


      {/* ==================== SCENE 3: TWO WAYS TO MEET YOUR PUPPY ==================== */}
      <section 
        aria-labelledby="paths-title" 
        className="tp-scene tp-paths" 
        data-pup-scene="true" 
        data-tone="light" 
        style={{ '--sky-top': '#fbe3b4', '--sky-bottom': '#f7d18d' }}
      >
        <div className="gutter mx-auto max-w-[110rem]">
          <h2 className="tp-paths__title font-plush text-huge text-center" id="paths-title">
            Two ways to meet your puppy
          </h2>

          <div className="tp-fork">
            <div aria-hidden="true" className="tp-fork__post" />

            {/* Way Left: Puppies in Dubai */}
            <article aria-labelledby="way-local" className="tp-way tp-way--left">
              <h3 className="tp-sign tp-sign--left font-plush" id="way-local">
                Puppies in Dubai
              </h3>
              <div className="tp-way__scene">
                {/* Burj Khalifa / Dubai Skyline SVG */}
                <svg aria-hidden="true" className="tp-way__skyline" viewBox="0 0 300 120">
                  <path d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
                </svg>

                <figure className="tp-window">
                  <span className="tp-window__glass">
                    <img 
                      alt="Puppy in Dubai showroom" 
                      src="/puppies/asset_443424.jpg" 
                      loading="lazy" 
                    />
                  </span>
                </figure>
              </div>

              <p className="tp-way__copy text-lede">
                See them, love them, take them home. Come meet our locally available puppies before you decide.
              </p>
              <div className="tp-way__cta">
                <Link className="btn btn-primary" to="/puppies?origin=local">
                  Meet local puppies
                </Link>
              </div>
            </article>

            {/* Way Right: Imported for you */}
            <article aria-labelledby="way-import" className="tp-way tp-way--right">
              <h3 className="tp-sign tp-sign--right font-plush" id="way-import">
                Imported for you
              </h3>
              <div className="tp-way__scene">
                <figure className="tp-window">
                  <span className="tp-window__glass">
                    <img 
                      alt="Korean teacup puppy ready for import" 
                      src="/puppies/asset_316919.jpg" 
                      loading="lazy" 
                    />
                  </span>
                </figure>
              </div>

              <p className="tp-way__copy text-lede">
                Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.
              </p>
              <div className="tp-way__cta">
                <Link className="btn btn-primary" to="/puppies?origin=imported">
                  See imported puppies
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>


      {/* ==================== SCENE 4: YOUR PUPPY JOURNEY ==================== */}
      <section 
        aria-labelledby="journey-title" 
        className="tp-scene tp-chat" 
        data-pup-scene="true" 
        data-tone="light" 
        style={{ '--sky-top': '#f7d18d', '--sky-bottom': '#f0b866' }}
      >
        <div className="tp-chat__grid gutter">
          <div className="tp-chat__story">
            <h2 className="font-plush text-huge" id="journey-title">
              Your puppy journey
            </h2>
            <p className="text-lede mt-4 max-w-[44ch] text-[var(--ink-soft)]">
              A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
            </p>

            <ol className="tp-chat__steps">
              <li className="tp-chat__step">
                <span className="tp-chat__step-n font-plush">1</span>
                <div>
                  <h3 className="font-plush text-xl font-bold">Choose your breed</h3>
                  <p className="text-sm text-[var(--ink-soft)] mt-1">
                    Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.
                  </p>
                </div>
              </li>
              <li className="tp-chat__step">
                <span className="tp-chat__step-n font-plush">2</span>
                <div>
                  <h3 className="font-plush text-xl font-bold">Get photos & details</h3>
                  <p className="text-sm text-[var(--ink-soft)] mt-1">
                    Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                  </p>
                </div>
              </li>
              <li className="tp-chat__step">
                <span className="tp-chat__step-n font-plush">3</span>
                <div>
                  <h3 className="font-plush text-xl font-bold">Secure & safe delivery</h3>
                  <p className="text-sm text-[var(--ink-soft)] mt-1">
                    Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-8">
              <Link className="btn btn-primary" to="/how-it-works">
                How it works
              </Link>
            </div>
          </div>

          {/* Interactive Simulated WhatsApp Phone Screen */}
          <div className="tp-chat__side">
            <div className="max-w-md mx-auto bg-[#e5ddd5] rounded-3xl border-3 border-[#2a170e] shadow-[8px_12px_0px_#2a170e] overflow-hidden">
              <div className="bg-[#075e54] text-white px-5 py-4 flex items-center gap-3">
                <img src="/brand/logo.png" alt="TeddyPups" className="w-10 h-10 rounded-full bg-white p-1" />
                <div>
                  <p className="font-bold text-sm">TeddyPups Concierge</p>
                  <p className="text-[11px] text-[#25d366] font-medium">● Online | Downtown Dubai</p>
                </div>
              </div>

              <div className="p-4 space-y-3 font-sans text-xs sm:text-sm">
                <div className="bg-white text-[#2a170e] p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                  Hello! Welcome to TeddyPups UAE 🐾 Are you looking for a puppy in our Dubai showroom, or an imported teacup breed?
                </div>
                <div className="bg-[#dcf8c6] text-[#2a170e] p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] ml-auto text-right">
                  Hi! I'd love to know more about your teacup Maltipoo puppies!
                </div>
                <div className="bg-white text-[#2a170e] p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                  Wonderful choice! Here are live photos of Max (3 months) and our Korean teacup Maltipoo girl:
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <img src="/puppies/asset_70474.webp" alt="Preview" className="rounded-lg object-cover h-20 w-full" />
                    <img src="/puppies/asset_316919.jpg" alt="Preview" className="rounded-lg object-cover h-20 w-full" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white border-t border-[#2a170e]/10">
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full py-2.5 rounded-full text-center flex items-center justify-center gap-2 font-semibold text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Chat Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================== SCENE 5: WHY FAMILIES TRUST TEDDYPUPS ==================== */}
      <section 
        aria-labelledby="trust-title" 
        className="tp-scene tp-passport" 
        data-pup-scene="true" 
        data-tone="light" 
        style={{ '--sky-top': '#f0b866', '--sky-bottom': '#a65a30' }}
      >
        <div className="gutter mx-auto max-w-[96rem]">
          <div className="tp-book">
            {/* Left Page */}
            <div className="tp-book__page tp-book__page--left">
              <p aria-hidden="true" className="tp-book__kicker font-scrawl">
                puppy passport
              </p>
              <h2 className="font-plush tp-book__title" id="trust-title">
                Why families trust TeddyPups
              </h2>
              <div className="mt-8">
                <p className="text-sm sm:text-base text-[#5a3a28] leading-relaxed">
                  Every adoption comes with complete transparency, verified veterinary clearance, and lifetime care support.
                </p>
              </div>
            </div>

            {/* Right Page: 4 Passport Stamps */}
            <div className="tp-book__page tp-book__page--right">
              <ol className="tp-stamps">
                <li className="tp-stamp">
                  <span className="tp-stamp__badge">
                    <CheckCircle2 className="w-6 h-6 text-[#c2622b]" />
                  </span>
                  <p className="tp-stamp__copy">
                    Every puppy comes vaccinated, dewormed, and with a verified health certificate.
                  </p>
                </li>
                <li className="tp-stamp">
                  <span className="tp-stamp__badge">
                    <CheckCircle2 className="w-6 h-6 text-[#a24a1a]" />
                  </span>
                  <p className="tp-stamp__copy">
                    Trusted breeders, safe travel, and premium care from start to finish.
                  </p>
                </li>
                <li className="tp-stamp">
                  <span className="tp-stamp__badge">
                    <CheckCircle2 className="w-6 h-6 text-[#2f6e9e]" />
                  </span>
                  <p className="tp-stamp__copy">
                    Always here to help, from choosing your puppy to post-delivery support.
                  </p>
                </li>
                <li className="tp-stamp">
                  <span className="tp-stamp__badge">
                    <CheckCircle2 className="w-6 h-6 text-[#8e3f15]" />
                  </span>
                  <p className="tp-stamp__copy">
                    Puppies delivered to loving homes all around the world.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Sunset Horizon */}
        <div className="tp-horizon">
          <span className="tp-horizon__sun" />
          <svg aria-hidden="true" className="tp-horizon__city" viewBox="0 0 1200 80">
            <path d="M0 80 L0 50 L40 50 L40 30 L60 30 L60 50 L100 50 L120 20 L130 20 L140 50 L180 50 L200 10 L210 10 L220 50 L300 50 L320 35 L340 50 L420 50 L440 15 L450 15 L460 50 L560 50 L580 40 L600 50 L700 50 L720 25 L730 25 L740 50 L840 50 L860 10 L870 10 L880 50 L980 50 L1000 30 L1020 50 L1200 50 L1200 80 Z" fill="#2a170e" opacity="0.4" />
          </svg>
        </div>
      </section>


      {/* ==================== SCENE 6: HAPPY FAMILIES & PUPPIES (DUSK) ==================== */}
      <section 
        aria-labelledby="dusk-title" 
        className="tp-scene tp-dusk" 
        data-pup-scene="true" 
        data-tone="dark" 
        style={{ '--sky-top': '#a65a30', '--sky-bottom': '#4d2b19' }}
      >
        <div className="tp-dusk__sky gutter">
          <div className="tp-dusk__head">
            <h2 className="font-plush text-huge" id="dusk-title">
              Happy families & puppies
            </h2>
            <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
              We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
            </p>
          </div>

          {/* Testimonial Quote Note from Sarah M. */}
          <figure className="tp-dusk__note">
            <blockquote className="font-plush-text text-sm sm:text-base leading-relaxed text-[#2a170e]">
              “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
            </blockquote>
            <figcaption className="font-scrawl text-xs text-[#8e3f15] mt-2 font-bold">
              Sarah M., Dubai, UAE
            </figcaption>
          </figure>
        </div>

        {/* Polaroid Memory Photo Wall */}
        <div className="tp-photowall">
          <div className="tp-photowall__wall gutter">
            <ul aria-label="Photos from TeddyPups families" className="tp-photowall__prints flex flex-wrap gap-6 justify-center">
              {duskPolaroids.map((item, idx) => (
                <li key={item.id}>
                  <div 
                    className="tp-polaroid cursor-pointer transition-transform hover:scale-105" 
                    style={{ '--tilt': item.tilt, '--tape': item.tape, transform: `rotate(${item.tilt})` }}
                  >
                    <span aria-hidden="true" className="tp-polaroid__tape" />
                    <span className="tp-polaroid__photo block aspect-square w-48 sm:w-56 overflow-hidden rounded-lg bg-white p-2 shadow-lg">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded" />
                    </span>
                    <span className="tp-polaroid__caption font-scrawl text-xs text-[#2a170e] font-bold block pt-2 text-center">
                      {item.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mt-10">
            <Link className="btn btn-ghost" to="/happy-families">
              See every happy family
            </Link>
          </div>
        </div>
      </section>


      {/* ==================== SCENE 7: QUESTIONS, ANSWERED (NIGHT) ==================== */}
      <section 
        aria-labelledby="questions-title" 
        className="tp-scene tp-night" 
        data-pup-scene="true" 
        data-tone="dark" 
        style={{ '--sky-top': '#4d2b19', '--sky-bottom': '#2f1a10' }}
      >
        {/* Twinkling Golden Stars in Night Sky */}
        <div aria-hidden="true" className="pointer-events-none tp-night__stars">
          <svg aria-hidden="true" className="tp-twinkle absolute text-honey animate-pulse" style={{ left: '8%', top: '12%', width: '16px' }} viewBox="0 0 40 40">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
          <svg aria-hidden="true" className="tp-twinkle absolute text-honey animate-pulse" style={{ left: '22%', top: '30%', width: '10px' }} viewBox="0 0 40 40">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
          <svg aria-hidden="true" className="tp-twinkle absolute text-honey animate-pulse" style={{ left: '41%', top: '8%', width: '14px' }} viewBox="0 0 40 40">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
          <svg aria-hidden="true" className="tp-twinkle absolute text-honey animate-pulse" style={{ left: '57%', top: '22%', width: '11px' }} viewBox="0 0 40 40">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
          <svg aria-hidden="true" className="tp-twinkle absolute text-honey animate-pulse" style={{ left: '75%', top: '14%', width: '15px' }} viewBox="0 0 40 40">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
          <svg aria-hidden="true" className="tp-twinkle absolute text-honey animate-pulse" style={{ left: '88%', top: '35%', width: '12px' }} viewBox="0 0 40 40">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
        </div>

        <div className="tp-night__grid gutter">
          <div className="tp-night__intro">
            <h2 className="font-plush text-huge text-[#fffdf8]" id="questions-title">
              Questions, answered
            </h2>
            <div className="mt-8">
              <Link className="btn btn-ghost" to="/faq">
                Read all questions
              </Link>
            </div>
          </div>

          <div className="tp-night__list space-y-4">
            {FAQ_DATA.slice(0, 5).map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#fffdf8] text-[#2a170e] border-2 border-[#2a170e] rounded-2xl overflow-hidden shadow-[4px_5px_0px_#000] transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-plush font-bold text-base sm:text-lg text-[#2a170e] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#c2622b] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5a3a28] leading-relaxed border-t border-[#2a170e]/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ==================== SCENE 8: READY TO MEET YOUR NEW BEST FRIEND? ==================== */}
      <section 
        aria-labelledby="cta-title" 
        className="tp-scene tp-home" 
        data-pup-scene="true" 
        data-tone="dark" 
        style={{ '--sky-top': '#2f1a10', '--sky-bottom': '#24130b' }}
      >
        <div className="tp-home__copy gutter text-center">
          <h2 className="font-plush text-huge text-[#fffdf8]" id="cta-title">
            Ready to meet your new best friend?
          </h2>
          <p className="tp-home__lede text-[#fbe3b4]">
            Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
          </p>
        </div>

        {/* The Cozy House Doorway with Lamp & Max waiting inside */}
        <div className="tp-house" aria-hidden="true">
          <span className="tp-house__plant tp-house__plant--left" />
          <span className="tp-house__lamp" />
          <div className="tp-house__doorway">
            <span className="tp-house__inside">
              <img 
                alt="Max, waiting inside" 
                src="/puppies/asset_70474.webp" 
                loading="lazy" 
              />
            </span>
          </div>
          <span className="tp-house__plant tp-house__plant--right" />
          <span className="tp-house__mat font-scrawl">welcome home</span>
        </div>

        {/* Home Bottom Actions */}
        <div className="tp-home__actions gutter flex flex-wrap items-center justify-center gap-4 mt-6">
          <a 
            className="btn btn-whatsapp flex items-center gap-2" 
            href={SITE_CONFIG.whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Enquire on WhatsApp</span>
          </a>
          <Link className="btn btn-ghost tp-home__ghost" to="/contact">
            Visit & contact
          </Link>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideoPuppy && (
        <VideoModal
          puppy={activeVideoPuppy}
          onClose={() => setActiveVideoPuppy(null)}
        />
      )}
    </main>
  );
}
