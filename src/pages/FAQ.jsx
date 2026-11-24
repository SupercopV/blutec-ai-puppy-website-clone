import React, { useState } from 'react';
import { HelpCircle, MessageCircle } from 'lucide-react';
import PupBuddy from '../components/PupBuddy';
import { FAQ_DATA, SITE_CONFIG } from '../data/siteData';

const TILTS = ['-1.6deg', '1.2deg', '-1.1deg', '1.8deg', '-0.9deg', '1.4deg', '-1.5deg', '0.8deg', '-1.2deg'];
const PINS = [
  'var(--color-toffee)',
  'var(--color-sky-deep)',
  'var(--color-berry)',
  'var(--color-honey)',
  'var(--color-mint)',
  'var(--color-toffee-deep)',
  'var(--color-sky-deep)',
  'var(--color-berry)',
  'var(--color-honey)'
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_DATA.filter((faq) =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="relative pt-[var(--header-h)] pb-24 outline-none min-h-screen">
      <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
        {/* Top Header */}
        <header className="max-w-[50rem]">
          <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
            9 notes on the board
          </p>
          <h1 className="font-plush text-giant" data-reveal="true">
            Questions & answers
          </h1>
          <p className="text-lede mt-5 max-w-[44ch] text-cocoa-soft" data-reveal="true">
            Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.
          </p>
        </header>

        {/* Authentic Sticky Notes Board */}
        <div className="mt-12 md:mt-16">
          <div className="tp-notes">
            {/* Side Search & Mascot */}
            <aside className="tp-notes__side" aria-label="Find a question">
              <label htmlFor="faq-search" className="font-scrawl tp-notes__label">
                sniff out a question
              </label>
              <div className="tp-notes__search">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="tp-notes__lens">
                  <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <path d="m15.5 15.5 5 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <input
                  id="faq-search"
                  type="search"
                  placeholder="delivery, Korea, vaccinated…"
                  autoComplete="off"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <p className="tp-notes__count" aria-live="polite">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'note' : 'notes'} on the board
              </p>

              <div className="tp-notes__teddy hidden md:block">
                <span aria-hidden="true" className="tp-notes__bubble font-plush">
                  <span className="tp-notes__q">?</span>
                  <span className="tp-notes__a">!</span>
                </span>
                <PupBuddy facing="right" />
              </div>
            </aside>

            {/* Sticky Notes Grid */}
            <div className="tp-notes__board">
              <ul className="tp-notes__list">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  const tilt = TILTS[index % TILTS.length];
                  const pin = PINS[index % PINS.length];

                  return (
                    <li
                      key={index}
                      className="tp-note"
                      data-reveal="true"
                      style={{
                        '--tilt': tilt,
                        '--pin': pin,
                        '--i': index
                      }}
                    >
                      <span aria-hidden="true" className="tp-note__pin" />
                      
                      <h2 className="tp-note__q">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenIndex(isOpen ? -1 : index)}
                          className="w-full text-left flex items-center justify-between cursor-pointer"
                        >
                          <span className="font-plush-text">{faq.q}</span>
                          <span aria-hidden="true" className="tp-note__chevron" />
                        </button>
                      </h2>

                      <div 
                        className="tp-note__answer" 
                        style={{ display: isOpen ? 'block' : 'none' }}
                      >
                        <div className="tp-note__flap">
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {filteredFaqs.length === 0 && (
                <div className="bg-[#fff8ea] border-2 border-dashed border-[#2a170e]/30 rounded-3xl p-10 text-center">
                  <HelpCircle className="w-8 h-8 text-[#c2622b] mx-auto mb-2" />
                  <p className="font-plush font-bold text-lg text-[#2a170e]">
                    No answers matched your search
                  </p>
                  <p className="text-sm text-[#5a3a28] mt-1 mb-4">
                    Feel free to message our team directly on WhatsApp!
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="btn btn-primary px-6 py-2 rounded-full text-xs font-semibold"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 bg-[#fff8ea] border-3 border-[#2a170e] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-[6px_8px_0px_#2a170e]">
          <h3 className="font-plush text-2xl sm:text-3xl font-extrabold text-[#2a170e] mb-2">
            Still have questions?
          </h3>
          <p className="text-sm sm:text-base text-[#5a3a28] max-w-xl mx-auto mb-6">
            Our puppy concierge is happy to guide you 24/7 on WhatsApp.
          </p>
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp px-8 py-3 rounded-full font-bold text-sm shadow-[0_4px_0px_#2a170e] inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </main>
  );
}
