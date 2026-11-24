import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import { GONE_HOME_TICKETS, SITE_CONFIG } from '../data/siteData';

const TILTS = ['-1.4deg', '1.2deg', '-0.8deg', '1.6deg', '-1.8deg', '0.9deg', '-1.1deg', '1.4deg'];

export default function GoneHome() {
  return (
    <main className="relative pt-[var(--header-h)] pb-24 outline-none min-h-screen">
      <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
        {/* Header Banner */}
        <header className="max-w-[50rem]">
          <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
            tickets home
          </p>
          <h1 className="font-plush text-giant flex items-center gap-3" data-reveal="true">
            <span>Gone home</span>
            <span className="text-[#c2622b] text-4xl sm:text-5xl">♥</span>
          </h1>
          <p className="text-lede mt-5 max-w-[46ch] text-cocoa-soft" data-reveal="true">
            Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match.
          </p>
          <div className="mt-8" data-reveal="true">
            <Link
              to="/puppies"
              className="btn btn-primary px-8 py-3 rounded-full font-bold text-sm shadow-[0_4px_0px_#2a170e] inline-block"
            >
              See available puppies
            </Link>
          </div>
        </header>

        {/* Authentic Boarding Pass Tickets Grid */}
        <div className="mt-16 md:mt-20">
          <ul className="tp-tickets" aria-label="Puppies who have gone home">
            {GONE_HOME_TICKETS.map((ticket, idx) => {
              const tilt = TILTS[idx % TILTS.length];
              return (
                <li
                  key={ticket.id}
                  className="tp-ticket"
                  data-reveal="true"
                  style={{
                    '--tilt': tilt,
                    '--i': idx
                  }}
                >
                  <a
                    className="tp-ticket__link"
                    href={ticket.slug ? `/puppies/${ticket.slug}` : '/puppies'}
                    onClick={(e) => {
                      if (!ticket.slug) e.preventDefault();
                    }}
                  >
                    <span className="tp-ticket__main">
                      <span className="tp-ticket__photo">
                        <img
                          alt={`${ticket.name}, ${ticket.breed}`}
                          src={ticket.image || '/puppies/copper-1.webp'}
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/puppies/copper-1.webp';
                          }}
                        />
                      </span>

                      <span className="tp-ticket__body">
                        <span className="font-plush tp-ticket__name">
                          {ticket.name}
                        </span>
                        <span className="tp-ticket__route font-scrawl">
                          Dubai ✈️ {ticket.location || 'Home'}
                        </span>
                        <span className="tp-ticket__meta">
                          {ticket.breed} · {ticket.gender} · {ticket.age || 'Puppy'}
                        </span>
                      </span>

                      <span className="tp-ticket__stub font-scrawl">
                        GONE HOME ♥
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Custom Request Banner */}
        <div className="mt-20 bg-[#fff8ea] border-3 border-[#2a170e] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-[6px_8px_0px_#2a170e]">
          <p className="font-scrawl text-sm text-[#8e3f15] mb-2">fell in love with one of our past puppies?</p>
          <h2 className="font-plush text-2xl sm:text-4xl font-extrabold text-[#2a170e] mb-3">
            Request a puppy just like them
          </h2>
          <p className="text-sm sm:text-base text-[#5a3a28] max-w-xl mx-auto mb-6">
            We partner with licensed, ethical breeders in South Korea, Russia, and Dubai. Tell us what you're looking for, and we'll bring your dream companion home.
          </p>
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp px-8 py-3 rounded-full font-bold text-sm shadow-[0_4px_0px_#2a170e] inline-flex items-center gap-2"
          >
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </main>
  );
}
