import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import PupBuddy from '../components/PupBuddy';
import PupRunner from '../components/PupRunner';
import { HERO_LINEUP, MEET_DOORS, DUSK_POLAROIDS, NIGHT_FAQS } from '../data/homeData';
import { SITE_CONFIG } from '../data/siteData';

const PAW_PATH = "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

function ImageWithLoader({ src, alt, className = '', style = {}, bgColor = '#f8e8e8', objectPosition = '50% 50%' }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor, ...style }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/puppies/copper-1.webp';
        }}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          objectFit: 'cover',
          objectPosition,
          transition: 'opacity 0.45s ease',
          opacity: loaded ? 1 : 0
        }}
      />
    </div>
  );
}

export default function Home() {
  // Scene 2: Meet the pups pinned horizontal scroll state
  const [isMeetPinned, setIsMeetPinned] = useState(false);
  const [meetMaxScroll, setMeetMaxScroll] = useState(0);
  const [meetTrackX, setMeetTrackX] = useState(0);
  const meetContainerRef = useRef(null);
  const meetHallRef = useRef(null);
  const meetTrackRef = useRef(null);

  // Puppy Journey interactive phone animation state
  const [journeyStep, setJourneyStep] = useState(0);
  const [journeyTyping, setJourneyTyping] = useState(false);
  const journeyStepsRef = useRef(null);
  const prevJourneyStepRef = useRef(-1);

  // Measure Scene 2 hallway layout and track dimensions
  useEffect(() => {
    const updateMeetLayout = () => {
      const isDesktop = window.innerWidth >= 1024;
      setIsMeetPinned(isDesktop);
      if (isDesktop && meetTrackRef.current && meetHallRef.current) {
        const stageEl = meetHallRef.current.parentElement;
        const headEl = stageEl?.querySelector('.tp-meet__head');
        const headHeight = headEl ? headEl.offsetTop + headEl.offsetHeight : 0;
        const floorEl = meetHallRef.current.querySelector('.tp-meet__floor');
        const floorHeight = floorEl ? floorEl.offsetHeight : 0;
        const stageH = stageEl?.clientHeight || window.innerHeight;
        const doorW = Math.max(128, Math.min(256, 0.15 * window.innerWidth, (stageH - headHeight - floorHeight - 40) / 1.3));
        meetHallRef.current.style.setProperty('--door-w', `${doorW.toFixed(0)}px`);
        const scrollWidth = meetTrackRef.current.scrollWidth;
        const max = Math.max(0, scrollWidth - window.innerWidth + 250);
        setMeetMaxScroll(max);
      } else {
        meetHallRef.current?.style.removeProperty('--door-w');
      }
    };

    updateMeetLayout();
    const timer = setTimeout(updateMeetLayout, 400);
    window.addEventListener('resize', updateMeetLayout);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateMeetLayout);
    };
  }, []);

  // Handle scroll-driven horizontal track translation & 3D door opening
  useEffect(() => {
    if (!isMeetPinned || !meetContainerRef.current) return;

    const handleMeetScroll = () => {
      const rect = meetContainerRef.current.getBoundingClientRect();
      const pinDistance = 0.8 * meetMaxScroll;
      if (pinDistance <= 0) return;

      let progress = 0;
      if (rect.top <= 0) {
        progress = Math.min(1, Math.max(0, -rect.top / pinDistance));
      }

      const currentX = -progress * meetMaxScroll;
      setMeetTrackX(currentX);

      if (meetTrackRef.current) {
        meetTrackRef.current.style.transform = `translateX(${currentX.toFixed(1)}px)`;
      }

      if (meetHallRef.current) {
        meetHallRef.current.style.setProperty('--floor-x', `${(currentX % 176).toFixed(1)}px`);
      }

      // Update 3D swinging door data-open state
      if (meetTrackRef.current) {
        const doors = meetTrackRef.current.children;
        const threshold = 0.36 * window.innerWidth;
        for (let i = 0; i < doors.length; i++) {
          const door = doors[i];
          if (door.classList.contains('tp-door--all')) continue;
          const doorLeft = door.offsetLeft + currentX;
          const isOpen = doorLeft < threshold;
          if (door.dataset.open !== String(isOpen)) {
            door.dataset.open = String(isOpen);
          }
        }
      }
    };

    window.addEventListener('scroll', handleMeetScroll, { passive: true });
    handleMeetScroll();
    return () => window.removeEventListener('scroll', handleMeetScroll);
  }, [isMeetPinned, meetMaxScroll]);

  useEffect(() => {
    if (!journeyStepsRef.current) return;
    const isDesktop = window.innerWidth >= 1024;
    const stepEls = [...journeyStepsRef.current.children];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = stepEls.indexOf(entry.target);
            if (idx !== -1) {
              setJourneyStep(idx);
            }
          }
        }
      },
      { rootMargin: isDesktop ? '-28% 0px -62% 0px' : '-10% 0px -40% 0px' }
    );

    stepEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (journeyStep > prevJourneyStepRef.current && journeyStep >= 0) {
      prevJourneyStepRef.current = journeyStep;
      setJourneyTyping(true);
      const timer = setTimeout(() => {
        setJourneyTyping(false);
        const cueText = journeyStep === 1 ? 'ooh, photos!' : journeyStep === 2 ? 'home soon!' : undefined;
        if (cueText) {
          window.dispatchEvent(new CustomEvent('pup:cue', { detail: { say: cueText, secs: 1.5 } }));
        }
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [journeyStep]);

  const scrollTrack = (direction) => {
    if (trackRef.current) {
      const scrollAmount = trackRef.current.clientWidth * 0.75;
      trackRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
      setTrackPage(direction === 'next' ? 1 : 0);
    }
  };

  return (
    <main id="main" className="relative pt-[var(--header-h)] outline-none overflow-x-clip" tabIndex="-1">
      {/* Scroll-driven continuous mascot puppy runner */}
      <PupRunner />

      {/* ==================== SCENE 1: HERO ==================== */}
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-hero"
        style={{ '--sky-top': '#fffdf8', '--sky-bottom': '#fff1d8', '--quilt': '#fff1d8' }}
        aria-labelledby="hero-title"
      >
        <span aria-hidden="true" className="tp-hero__sun" />

        <div className="tp-hero__copy gutter">
          <p className="tp-hero__note font-scrawl">
            every puppy is family
            <svg viewBox="0 0 220 24" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-toffee" aria-hidden="true">
              <path d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>

          <h1 id="hero-title" className="tp-hero__title font-plush">
            <span className="tp-hero__line">Premium teacup</span>
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
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        {/* Hero Quilt Lineup of Puppies */}
        <div className="tp-hero__stage">
          <ul className="tp-lineup" aria-label="Some of the puppies in our showroom">
            {/* 6 puppy seats */}
            {HERO_LINEUP.map((pup, idx) => (
              <li
                key={pup.slug}
                className="tp-lineup__seat"
                style={{
                  '--x': pup.x,
                  '--w': pup.w,
                  '--peek': pup.peek,
                  '--tilt': pup.tilt,
                  '--i': pup.i
                }}
              >
                <Link
                  className="tp-lineup__pup"
                  data-pup-friend="true"
                  aria-label={pup.ariaLabel}
                  to={`/puppies/${pup.slug}`}
                >
                  <span className="tp-lineup__photo">
                    <ImageWithLoader
                      src={pup.img}
                      alt={pup.name}
                      bgColor={pup.bgColor}
                      objectPosition={pup.objectPosition}
                      className="w-full h-full"
                    />
                  </span>
                </Link>
              </li>
            ))}

            {/* 6 ghost name tags with exact Shantell Sans font */}
            {HERO_LINEUP.map((pup) => (
              <li
                key={`tag-${pup.slug}`}
                className="tp-lineup__seat"
                style={{
                  '--x': pup.x,
                  '--w': pup.w,
                  '--peek': pup.peek,
                  '--tilt': pup.tilt,
                  '--i': pup.i
                }}
              >
                <span className="tp-lineup__ghost">
                  <span className="tp-lineup__name font-scrawl">{pup.name}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Authentic Scallop Quilt Edge */}
          <div aria-hidden="true" className="tp-quilt">
            <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
              <defs>
                <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: 'var(--quilt)' }} />
                  <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
                  <path d="M11 33A27 19 0 0 1 65 33" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity=".42" />
                </pattern>
              </defs>
              <rect width="100%" height="40" fill="url(#tp-scallop)" />
            </svg>
          </div>

          {/* Mascot Teddy Peek Stop behind Hero Quilt */}
          <div
            data-pup-stop="true"
            data-pose="peek"
            data-facing="right"
            data-act="peekaboo"
            data-behind="true"
            data-lane="true"
            className="pup-stop tp-hero__teddy"
          >
            <PupBuddy facing="right" pose="peek" />
          </div>
        </div>
      </section>

      {/* ==================== SCENE 2: MEET THE PUPS ==================== */}
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-meet"
        data-pinned={isMeetPinned ? "true" : undefined}
        style={{ '--sky-top': '#fff1d8', '--sky-bottom': '#fbe3b4' }}
        aria-labelledby="meet-title"
      >
        <div
          ref={meetContainerRef}
          data-pin-range="true"
          style={{
            height: isMeetPinned ? `calc(100vh + ${Math.round(0.8 * meetMaxScroll)}px)` : undefined,
            '--pinned': isMeetPinned ? 1 : 0
          }}
        >
          <div className="tp-meet__stage">
            <header className="tp-meet__head gutter flex items-center justify-between gap-4">
              <div>
                <h2 id="meet-title" className="font-plush text-huge">
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

            <div ref={meetHallRef} className="tp-meet__hall">
              <ol
                ref={meetTrackRef}
                style={isMeetPinned ? { transform: `translateX(${meetTrackX}px)` } : undefined}
                className="tp-meet__track"
                data-treadmill="true"
                aria-label="Puppies looking for a family"
              >
                {MEET_DOORS.map((door) => {
                  if (door.isAll) {
                    return (
                      <li key="door-all" className="tp-door tp-door--all" data-open="true">
                        <Link className="tp-door__link" to={door.href}>
                          <span className="tp-door__frame tp-door__frame--all">
                            <span className="font-plush tp-door__all">{door.name}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={door.id} className="tp-door" data-open={isMeetPinned ? "false" : "true"}>
                      <Link
                        className="tp-door__link"
                        to={door.href}
                        style={{ '--door': door.doorColor }}
                      >
                        <span className="tp-door__plate">
                          <span className="font-plush tp-door__name">{door.name}</span>
                          <span className="tp-door__meta">{door.meta}</span>
                        </span>

                        <span className="tp-door__frame">
                          <span className="tp-door__room">
                            <ImageWithLoader
                              src={door.img}
                              alt={door.alt || door.name}
                              bgColor={door.bgColor}
                              objectPosition={door.objectPosition}
                              className="w-full h-full"
                            />
                          </span>

                          <span aria-hidden="true" className="tp-door__way">
                            <span className="tp-door__leaf">
                              <svg viewBox="0 0 64 64" className="tp-door__peephole" aria-hidden="true" fill="currentColor">
                                <path d={PAW_PATH} />
                              </svg>
                              <span className="tp-door__knob" />
                            </span>
                          </span>

                          <span className="tp-door__tag font-scrawl">{door.tag || 'Available'}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>

              {/* Showroom Wooden Floor & Mascot Stop */}
              <div aria-hidden="true" className="tp-meet__floor" />
              <div
                data-pup-stop="true"
                data-pose={isMeetPinned ? "walk" : "sit"}
                data-act={isMeetPinned ? "treadmill" : undefined}
                data-facing="right"
                className="pup-stop tp-meet__teddy"
              >
                <PupBuddy facing="right" pose={isMeetPinned ? "walk" : "sit"} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SCENE 3: TWO WAYS TO MEET YOUR PUPPY ==================== */}
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-paths"
        style={{ '--sky-top': '#fbe3b4', '--sky-bottom': '#f7d18d' }}
        aria-labelledby="paths-title"
      >
        <div className="gutter mx-auto max-w-[110rem]">
          <h2 id="paths-title" className="tp-paths__title font-plush text-huge">
            Two ways to meet your puppy
          </h2>

          <div className="tp-fork">
            <div aria-hidden="true" className="tp-fork__post" />

            {/* Way Left: Puppies in Dubai */}
            <article className="tp-way tp-way--left" aria-labelledby="way-local">
              <h3 id="way-local" className="tp-sign tp-sign--left font-plush">
                Puppies in Dubai
              </h3>

              <div className="tp-way__scene" data-pup-look="true">
                <svg viewBox="0 0 300 120" className="tp-way__skyline" aria-hidden="true">
                  <path d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <figure className="tp-window">
                  <span className="tp-window__glass">
                    <ImageWithLoader
                      src="/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                      alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                      bgColor="#685848"
                      objectPosition="54.3% 48.3%"
                      className="w-full h-full"
                    />
                  </span>
                  <figcaption className="font-scrawl">In our showroom</figcaption>
                </figure>
              </div>

              <p className="tp-way__text">
                See them, love them, take them home. Come meet our locally available puppies before you decide.
              </p>
              <Link className="btn btn-primary" to="/puppies?origin=local">
                Meet local puppies
              </Link>
            </article>

            {/* Way Right: Imported for you */}
            <article className="tp-way tp-way--right" aria-labelledby="way-imported">
              <h3 id="way-imported" className="tp-sign tp-sign--right font-plush">
                Imported for you
              </h3>

              <div className="tp-way__scene" data-pup-look="true">
                <div className="tp-flight">
                  <svg viewBox="0 0 660 300" role="img" aria-label="A plane bringing a Korean Teacup Maltipoo puppy from Korea to Dubai">
                    <defs>
                      <clipPath id="_R_flight_window_">
                        <circle r="25" />
                      </clipPath>
                    </defs>
                    <path d="M40 250 C 170 40, 470 20, 620 168" className="tp-flight__route" />
                    <circle cx="40" cy="250" r="7" className="tp-flight__dot" />
                    <circle cx="620" cy="168" r="7" className="tp-flight__dot" />
                    <text x="40" y="284" textAnchor="middle" className="tp-flight__label">Korea</text>
                    <text x="620" y="202" textAnchor="middle" className="tp-flight__label">Dubai</text>

                    {/* Airplane with puppy in circular window */}
                    <g transform="translate(410 70)">
                      <g transform="translate(-126 -78)">
                        <path d="M28 60 L8 26 L34 26 L60 54 Z" className="tp-flight__wing" />
                        <path d="M108 112 L142 156 L172 156 L158 112 Z" className="tp-flight__wing tp-flight__wing--far" />
                        <path d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z" className="tp-flight__body" />
                        <path d="M104 44 L138 2 L168 2 L154 44 Z" className="tp-flight__wing" />
                        <path d="M206 64 C215 67 221 73 224 80" className="tp-flight__line" />
                      </g>
                      <g transform="translate(10 2)">
                        <image
                          href="/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg"
                          x="-25"
                          y="-25"
                          width="50"
                          height="50"
                          clipPath="url(#_R_flight_window_)"
                          preserveAspectRatio="xMidYMid slice"
                        />
                        <circle r="25" fill="none" stroke="#2a170e" strokeWidth="3" />
                      </g>
                    </g>
                  </svg>
                </div>
                <figcaption className="font-scrawl">Flown from Korea &amp; worldwide</figcaption>
              </div>

              <p className="tp-way__text">
                Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.
              </p>
              <Link className="btn btn-primary" to="/puppies?origin=imported">
                See imported puppies
              </Link>
            </article>

            {/* Mascot Sit Stop at Fork */}
            <div data-pup-stop="true" data-pose="sit" data-facing="right" className="pup-stop tp-fork__teddy">
              <PupBuddy facing="right" pose="sit" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SCENE 4: YOUR PUPPY JOURNEY ==================== */}
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-chat"
        style={{ '--sky-top': '#f7d18d', '--sky-bottom': '#f0b866' }}
        aria-labelledby="journey-title"
      >
        <div className="tp-chat__grid gutter" data-pin-range="true">
          <div className="tp-chat__story">
            <h2 id="journey-title" className="font-plush text-huge">
              Your puppy journey
            </h2>
            <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
              A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
            </p>

            <ol ref={journeyStepsRef} className="tp-chat__steps">
              <li
                className="tp-chat__step"
                data-step="0"
                data-active={journeyStep === 0 ? "true" : undefined}
                data-done={journeyStep > 0 ? "true" : undefined}
              >
                <span className="tp-chat__num font-plush" aria-hidden="true">1</span>
                <div>
                  <h3 className="tp-chat__title font-plush">Choose your breed</h3>
                  <p className="tp-chat__text">
                    Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.
                  </p>
                </div>
              </li>
              <li
                className="tp-chat__step"
                data-step="1"
                data-active={journeyStep === 1 ? "true" : undefined}
                data-done={journeyStep > 1 ? "true" : undefined}
              >
                <span className="tp-chat__num font-plush" aria-hidden="true">2</span>
                <div>
                  <h3 className="tp-chat__title font-plush">Get photos &amp; details</h3>
                  <p className="tp-chat__text">
                    Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                  </p>
                </div>
              </li>
              <li
                className="tp-chat__step"
                data-step="2"
                data-active={journeyStep === 2 ? "true" : undefined}
                data-done={journeyStep > 2 ? "true" : undefined}
              >
                <span className="tp-chat__num font-plush" aria-hidden="true">3</span>
                <div>
                  <h3 className="tp-chat__title font-plush">Secure &amp; safe delivery</h3>
                  <p className="tp-chat__text">
                    Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                  </p>
                </div>
              </li>
            </ol>

            <Link to="/how-it-works" className="btn btn-ghost tp-chat__cta">
              See how it works
            </Link>
          </div>

          {/* Sticky Phone on Desktop / Streamlined Flow on Mobile */}
          <div className="tp-chat__side">
            <div className="tp-phone" aria-label="A WhatsApp conversation with TeddyPups U.A.E." role="group">
              <div className="tp-phone__bar">
                <img
                  alt="TeddyPups"
                  src="/brand/logo.png"
                  width="40"
                  height="40"
                  className="tp-phone__avatar"
                />
                <span>
                  <span className="tp-phone__name">TeddyPups U.A.E.</span>
                  <span className="tp-phone__status">
                    {journeyTyping ? 'typing…' : 'Online Concierge'}
                  </span>
                </span>
              </div>

              <div className="tp-phone__screen" aria-live="polite">
                {/* Greeting inquiry */}
                <p className="tp-msg tp-msg--me">
                  Looking for a Korean Teacup Maltipoo! What do you have available?
                </p>

                {/* Step 0: Reply with Breed Chips */}
                <div
                  className="tp-msg-group"
                  data-step="0"
                  data-show={journeyStep >= 0 ? "true" : "false"}
                >
                  <div className="tp-msg tp-msg--them">
                    <p>Hello! We have both local showroom puppies in Dubai and rare teacup imports available this week.</p>
                    <ul className="tp-chips" aria-label="Breeds we have now">
                      <li><Link to="/puppies?breed=maltipoo">Maltipoo</Link></li>
                      <li><Link to="/puppies?breed=pomeranian">Pomeranian</Link></li>
                      <li><Link to="/puppies?breed=poodle">Poodle</Link></li>
                      <li><Link to="/puppies?breed=cavapoo">Cavapoo</Link></li>
                      <li><Link to="/puppies?breed=shih-tzu">Shih Tzu</Link></li>
                    </ul>
                  </div>
                </div>

                {/* Step 1: Media Snaps */}
                <div
                  className="tp-msg-group"
                  data-step="1"
                  data-show={journeyStep >= 1 && (!journeyTyping || journeyStep > 1) ? "true" : "false"}
                >
                  <div className="tp-msg tp-msg--them tp-msg--media">
                    <div className="tp-snaps">
                      <span className="tp-snaps__one">
                        <img
                          src="/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg"
                          alt="Korean Teacup Maltipoo female"
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <span className="tp-clip">
                        <img
                          src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
                          alt="Max Maltipoo video clip"
                          className="w-full h-full object-cover"
                        />
                        <span className="tp-clip__play font-scrawl">
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-[#2a170e]">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </div>
                  <p className="tp-msg tp-msg--them">
                    Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                  </p>
                </div>

                {/* Step 2: Safe delivery flight route */}
                <div
                  className="tp-msg-group"
                  data-step="2"
                  data-show={journeyStep >= 2 && !journeyTyping ? "true" : "false"}
                >
                  <div className="tp-msg tp-msg--them">
                    <p>Safe travel directly to your door, fully vaccinated and certified.</p>
                    <svg viewBox="0 0 220 70" className="tp-route" aria-hidden="true">
                      <path d="M14 52 C 60 6, 120 70, 170 28" className="tp-route__line" />
                      <circle cx="14" cy="52" r="5" className="tp-route__dot" />
                      <path d="M164 32 l12 -12 l12 12 v14 h-24 z" className="tp-route__home" />
                      <path d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z" className="tp-route__heart" />
                      <path d={PAW_PATH} transform="translate(70 22) scale(.3) rotate(70 32 32)" className="tp-route__paw" />
                      <path d={PAW_PATH} transform="translate(104 38) scale(.3) rotate(100 32 32)" className="tp-route__paw" />
                    </svg>
                  </div>
                </div>

                {/* Animated Typing Indicator */}
                <p className="tp-typing" data-show={journeyTyping ? "true" : "false"} aria-hidden="true">
                  <span /><span /><span />
                </p>
              </div>

              {/* Compose bar */}
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tp-phone__compose"
              >
                <span>Say hello on WhatsApp</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
                </svg>
              </a>
            </div>

            {/* Mascot Sit Stop beside Phone */}
            <div data-pup-stop="true" data-pose="sit" data-facing="right" className="pup-stop tp-chat__teddy">
              <PupBuddy facing="right" pose="sit" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SCENE 5: WHY FAMILIES TRUST TEDDYPUPS ==================== */}
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene tp-passport"
        style={{ '--sky-top': '#f0b866', '--sky-bottom': '#a65a30' }}
        aria-labelledby="trust-title"
      >
        <div className="gutter mx-auto max-w-[96rem]">
          <div className="tp-book">
            {/* Left Page */}
            <div className="tp-book__page tp-book__page--left">
              <p aria-hidden="true" className="tp-book__kicker font-scrawl">
                puppy passport
              </p>
              <h2 id="trust-title" className="font-plush tp-book__title">
                Why families trust TeddyPups
              </h2>

              <div data-pup-stop="true" data-pose="sit" data-facing="right" className="pup-stop tp-book__teddy">
                <PupBuddy facing="right" pose="sit" />
              </div>
            </div>

            {/* Right Page: 4 Authentic Postal Stamps */}
            <div className="tp-book__page tp-book__page--right">
              <div className="tp-entry">
                <div className="tp-stamp tp-stamp--round">
                  <span className="tp-stamp__icon">🛡️</span>
                  <span className="tp-stamp__title font-plush">Health check</span>
                </div>
                <p className="tp-entry__text">
                  Every puppy comes vaccinated, dewormed, and with a verified health certificate.
                </p>
              </div>

              <div className="tp-entry">
                <div className="tp-stamp tp-stamp--ticket">
                  <span className="tp-stamp__icon">✈️</span>
                  <span className="tp-stamp__title font-plush">Safe travel</span>
                </div>
                <p className="tp-entry__text">
                  Trusted breeders, safe travel, and premium care from start to finish.
                </p>
              </div>

              <div className="tp-entry">
                <div className="tp-stamp tp-stamp--oval">
                  <span className="tp-stamp__icon">💬</span>
                  <span className="tp-stamp__title font-plush">Lifetime care</span>
                </div>
                <p className="tp-entry__text">
                  Always here to help, from choosing your puppy to post-delivery support.
                </p>
              </div>

              <div className="tp-entry">
                <div className="tp-stamp tp-stamp--scallop">
                  <span className="tp-stamp__icon">🌍</span>
                  <span className="tp-stamp__title font-plush">Worldwide</span>
                </div>
                <p className="tp-entry__text">
                  Puppies delivered to loving homes all around the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sunset Horizon with City Silhouette */}
        <div aria-hidden="true" className="tp-horizon">
          <span className="tp-horizon__sun" />
          <svg viewBox="0 0 1200 160" className="tp-horizon__city" preserveAspectRatio="none">
            <path
              d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* ==================== SCENE 6: HAPPY FAMILIES & PUPPIES (DUSK) ==================== */}
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-dusk"
        style={{ '--sky-top': '#a65a30', '--sky-bottom': '#4d2b19' }}
        aria-labelledby="dusk-title"
      >
        <div className="tp-dusk__sky gutter">
          <header className="tp-dusk__head">
            <h2 id="dusk-title" className="font-plush text-huge">
              Happy families &amp; puppies
            </h2>
            <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
              We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
            </p>
          </header>

          <aside aria-label="Customer review" className="tp-dusk__note font-plush-text">
            <p>
              "I was nervous about buying a puppy online, but TeddyPups made the entire process so easy and transparent. Our Korean teacup Maltipoo arrived healthy, happy, and even cuter than in the videos. Best decision ever!"
            </p>
            <cite className="font-scrawl">— Sarah M., Downtown Dubai</cite>
          </aside>
        </div>

        {/* 8 Authentic Washi-Tape Polaroids */}
        <div className="tp-photowall">
          <div className="tp-photowall__wall">
            <ul className="tp-photowall__prints" aria-label="Photos of puppies with their families">
              {DUSK_POLAROIDS.map((p, idx) => (
                <li key={p.id}>
                  <Link
                    to="/happy-families"
                    className="tp-photowall__print"
                    aria-label={`Open memory: ${p.caption}`}
                  >
                    <span
                      className="tp-polaroid"
                      style={{
                        '--tilt': p.tilt,
                        '--tape': p.tape,
                        '--i': idx
                      }}
                    >
                      <span aria-hidden="true" className={`tp-tape tp-tape--${p.tapePos}`} />
                      <span className="tp-polaroid__photo">
                        <ImageWithLoader
                          src={p.img}
                          alt={p.alt}
                          className="w-full h-full"
                        />
                      </span>
                      <span className="tp-polaroid__caption font-scrawl">
                        {p.caption}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dusk Facade Doorway & Ground */}
        <div className="tp-facade__ground">
          <div className="tp-facade__door" />
          <div className="tp-lamp">
            <span className="tp-lamp__light" />
          </div>
          <Link className="btn btn-primary tp-facade__cta" to="/happy-families">
            See every happy family
          </Link>

          {/* Mascot Sit Stop */}
          <div data-pup-stop="true" data-pose="sit" data-facing="right" className="pup-stop tp-dusk__teddy">
            <PupBuddy facing="right" pose="sit" />
          </div>
        </div>
        <div className="tp-street__pavement" aria-hidden="true" />
      </section>

      {/* ==================== SCENE 7: QUESTIONS, ANSWERED (NIGHT) ==================== */}
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-night"
        style={{ '--sky-top': '#4d2b19', '--sky-bottom': '#2f1a10' }}
        aria-labelledby="questions-title"
      >
        {/* Twinkling Golden Stars */}
        <div aria-hidden="true" className="pointer-events-none tp-night__stars">
          <svg viewBox="0 0 40 40" className="tp-twinkle absolute text-honey animate-pulse" style={{ left: '8%', top: '12%', width: '16.2px', animationDelay: '0s' }} aria-hidden="true">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 40 40" className="tp-twinkle absolute text-honey animate-pulse" style={{ left: '22%', top: '30%', width: '9px', animationDelay: '0.4s' }} aria-hidden="true">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 40 40" className="tp-twinkle absolute text-honey animate-pulse" style={{ left: '41%', top: '8%', width: '12.6px', animationDelay: '0.8s' }} aria-hidden="true">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 40 40" className="tp-twinkle absolute text-honey animate-pulse" style={{ left: '57%', top: '22%', width: '8.1px', animationDelay: '1.2s' }} aria-hidden="true">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 40 40" className="tp-twinkle absolute text-honey animate-pulse" style={{ left: '72%', top: '6%', width: '14.4px', animationDelay: '1.6s' }} aria-hidden="true">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 40 40" className="tp-twinkle absolute text-honey animate-pulse" style={{ left: '88%', top: '18%', width: '10.8px', animationDelay: '2.0s' }} aria-hidden="true">
            <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
          </svg>
        </div>

        <div className="tp-night__grid gutter">
          <div className="tp-night__intro">
            <h2 id="questions-title" className="font-plush text-huge">
              Questions, answered
            </h2>
            <Link className="btn btn-ghost tp-night__cta" to="/faq">
              Read all questions
            </Link>

            {/* Mascot Sit Stop with Question Wonder badge */}
            <div className="tp-night__pup">
              <span aria-hidden="true" className="tp-night__wonder font-plush">?</span>
              <div data-pup-stop="true" data-pose="sit" data-facing="right" data-act="tilt" className="pup-stop tp-night__teddy">
                <PupBuddy facing="right" pose="sit" />
              </div>
            </div>
          </div>

          {/* Authentic Q&A List with Star Icons */}
          <dl className="tp-night__list">
            {NIGHT_FAQS.map((faq) => (
              <div key={faq.id} className="tp-qa" data-pup-look="">
                <dt className="font-plush tp-qa__q">
                  <svg viewBox="0 0 40 40" className="tp-qa__star" aria-hidden="true">
                    <path d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z" fill="currentColor" />
                  </svg>
                  {faq.q}
                </dt>
                <dd className="tp-qa__a">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ==================== SCENE 8: READY TO MEET YOUR NEW BEST FRIEND? ==================== */}
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-home"
        style={{ '--sky-top': '#2f1a10', '--sky-bottom': '#24130b' }}
        aria-labelledby="cta-title"
      >
        <div className="tp-home__copy gutter">
          <h2 id="cta-title" className="font-plush text-huge">
            Ready to meet your new best friend?
          </h2>
          <p className="tp-home__lede">
            Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
          </p>
        </div>

        {/* Cozy House Doorway & Welcome Mat */}
        <div className="tp-house">
          <span aria-hidden="true" className="tp-house__plant tp-house__plant--left" />
          <span aria-hidden="true" className="tp-house__lamp" />

          <div className="tp-house__doorway">
            <span className="tp-house__inside">
              <ImageWithLoader
                src="/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp"
                alt="Max, waiting inside"
                bgColor="#785838"
                objectPosition="53.8% 44.3%"
                className="w-full h-full"
              />
            </span>
            <span aria-hidden="true" className="tp-house__door">
              <span className="tp-house__peep" />
              <span className="tp-house__knob" />
            </span>
          </div>

          <span aria-hidden="true" className="tp-house__plant tp-house__plant--right" />
          <span aria-hidden="true" className="tp-house__mat font-scrawl">
            welcome home
          </span>

          {/* Mascot Teddy Bowing Stop on the Welcome Mat */}
          <div data-pup-stop="true" data-pose="bow" data-facing="right" className="pup-stop tp-house__teddy">
            <PupBuddy facing="right" pose="bow" />
          </div>
        </div>

        {/* Bottom Contact Actions */}
        <div className="tp-home__actions gutter">
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Enquire on WhatsApp</span>
          </a>
          <Link className="btn btn-ghost tp-home__ghost" to="/contact">
            Visit &amp; contact
          </Link>
        </div>
      </section>
    </main>
  );
}
