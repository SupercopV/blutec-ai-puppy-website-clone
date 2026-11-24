import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Ticket } from 'lucide-react';
import { GONE_HOME_TICKETS, SITE_CONFIG } from '../data/siteData';

export default function GoneHome() {
  return (
    <main className="relative pt-[var(--header-h)] pb-24 outline-none bg-[#fffdf8] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#fff8ea] border-b-2 border-[#2a170e] py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="font-scrawl text-base text-[#8e3f15] font-semibold flex items-center justify-center gap-1.5">
            <Ticket className="w-4 h-4 text-[#c2622b]" />
            <span>tickets home</span>
          </p>
          <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-[#2a170e] mt-1 mb-4 flex items-center justify-center gap-3">
            <span>Gone home</span>
            <span className="text-[#c2622b] text-3xl sm:text-5xl">♥</span>
          </h1>
          <p className="text-base sm:text-lg text-[#5a3a28] max-w-2xl mx-auto leading-relaxed mb-6">
            Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match.
          </p>
          <Link
            to="/puppies"
            className="btn btn-primary px-8 py-3 rounded-full font-bold text-sm shadow-[0_4px_0px_#2a170e] inline-block"
          >
            See available puppies
          </Link>
        </div>
      </section>

      {/* Boarding Pass Tickets Grid */}
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GONE_HOME_TICKETS.map((ticket, idx) => {
            const tilt = (idx % 3 === 0 ? '-1.2deg' : idx % 3 === 1 ? '1.5deg' : '-0.6deg');
            return (
              <div
                key={ticket.id}
                className="tp-ticket relative transition-all duration-300 hover:scale-105"
                style={{ '--tilt': tilt, transform: `rotate(${tilt})` }}
              >
                {/* Boarding Pass Ticket Container */}
                <div className="relative bg-[#fff8ea] border-3 border-[#2a170e] rounded-2xl p-5 shadow-[6px_8px_0px_#2a170e] flex items-center justify-between overflow-hidden">
                  
                  {/* Left Notch & Perforation */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#fffdf8] border-r-3 border-[#2a170e]" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#fffdf8] border-l-3 border-[#2a170e]" />

                  {/* Main Ticket Info */}
                  <div className="pl-4 flex-1">
                    <span className="font-scrawl text-xs font-semibold text-[#8e3f15] uppercase tracking-wider">
                      one ticket home
                    </span>
                    <h3 className="font-plush text-2xl font-extrabold text-[#2a170e] mt-0.5">
                      {ticket.name}
                    </h3>
                    <p className="text-xs text-[#5a3a28] font-medium mt-0.5">
                      {ticket.breed}, {ticket.gender}
                    </p>
                    <p className="text-[11px] font-scrawl text-[#c2622b] mt-2">
                      Departure: {ticket.location}
                    </p>
                  </div>

                  {/* Perforated Vertical Divider */}
                  <div className="mx-4 h-16 border-r-2 border-dashed border-[#2a170e]/30" />

                  {/* Right Stub (Admit One) */}
                  <div className="pr-4 text-center shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#1f7a4d] text-white uppercase tracking-wider mb-1">
                      home ♥
                    </span>
                    <p className="font-scrawl text-[11px] text-[#2a170e] font-bold">
                      TeddyPups
                    </p>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-[#8e3f15]/80 mt-1">
                      admit one
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Request Banner */}
        <div className="mt-16 text-center">
          <p className="font-scrawl text-sm text-[#8e3f15] mb-2">fell in love with one of our past puppies?</p>
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp px-8 py-3 rounded-full font-bold text-sm shadow-[0_4px_0px_#2a170e] inline-flex items-center gap-2"
          >
            <span>Request a puppy just like them</span>
          </a>
        </div>
      </div>
    </main>
  );
}
