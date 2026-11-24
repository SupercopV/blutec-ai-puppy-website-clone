import React, { useState } from 'react';
import PupBuddy from '../components/PupBuddy';
import { SITE_CONFIG } from '../data/siteData';

const FAQ_ITEMS = [
  {
    id: 'vaccines',
    q: 'Are your puppies vaccinated and health-checked?',
    a: 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
    tilt: '-1.6deg',
    pin: 'var(--color-toffee)',
  },
  {
    id: 'meet',
    q: 'Can I meet a puppy before I decide?',
    a: 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.',
    tilt: '1.2deg',
    pin: 'var(--color-sky-deep)',
  },
  {
    id: 'sameday',
    q: 'Can I take my puppy home the same day?',
    a: 'Local puppies are available immediately, so you can take your puppy home the same day.',
    tilt: '-0.8deg',
    pin: '#d9a13c',
  },
  {
    id: 'import',
    q: 'Do you import puppies from abroad?',
    a: 'Yes. Through our Order Upon Request service we source rare and premium teacup breeds from the most reputable, certified breeders across Europe, Korea, and beyond — and we handle the import for you.',
    tilt: '1.8deg',
    pin: '#c45a6a',
  },
  {
    id: 'travel',
    q: 'How does an imported puppy travel to Dubai?',
    a: 'We manage every part of the import process, including health checks, travel arrangements, and the necessary documentation, so your puppy arrives happy, healthy, and stress-free.',
    tilt: '-1.2deg',
    pin: 'var(--color-toffee)',
  },
  {
    id: 'transparency',
    q: 'Will I see photos and health details first?',
    a: 'Yes. Photos, videos, and health certificates are shared before your puppy travels, and our team sends real photos and health details directly on WhatsApp.',
    tilt: '0.7deg',
    pin: 'var(--color-sky-deep)',
  },
  {
    id: 'delivery',
    q: 'Do you deliver?',
    a: 'Yes. We deliver within Dubai, and our trusted international cargo partners deliver puppies safely to loving homes all around the world.',
    tilt: '-1.9deg',
    pin: '#d9a13c',
  },
  {
    id: 'breeds',
    q: 'Which breeds do you usually have?',
    a: 'Breeds we regularly have include Maltipoo, Pomeranian, Poodle and Bichon, plus rare teacup lines such as Korean teacup poodles, Maltese, Pom and Yorkie.',
    tilt: '1.4deg',
    pin: '#c45a6a',
  },
  {
    id: 'aftercare',
    q: 'Is there help after my puppy comes home?',
    a: 'Yes. Our team is available 24/7 and offers advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.',
    tilt: '-1.6deg',
    pin: 'var(--color-toffee)',
  },
];

function highlightMatch(text, query) {
  if (!query || !query.trim()) return text;
  const escaped = query.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    part.toLowerCase() === query.trim().toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      part
    )
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
  });

  return (
    <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
      <div data-page="faq" className="tp-page">
        {/* Schema.org FAQ structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ_ITEMS.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              })),
            }),
          }}
        />

        {/* Dark Room Scene */}
        <section
          data-pup-scene="true"
          data-tone="dark"
          className="tp-scene tp-faqroom overflow-hidden"
          style={{ '--sky-top': '#a95e32', '--sky-bottom': '#331c11' }}
          aria-labelledby="faq-title"
        >
          <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
            <header className="max-w-4xl">
              <h1 id="faq-title" className="font-plush text-giant">
                Questions &amp; answers
              </h1>
              <p className="text-lede mt-6 max-w-[52ch] text-[var(--ink-soft)]">
                Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.
              </p>
            </header>

            <div className="mt-12 md:mt-16">
              <div className="tp-notes" data-open={openId !== null ? 'true' : undefined}>
                {/* Left Sidebar */}
                <aside className="tp-notes__side" aria-label="Find a question">
                  <label htmlFor="faq-search" className="font-scrawl tp-notes__label">
                    sniff out a question
                  </label>
                  <div className="tp-notes__search">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="tp-notes__lens">
                      <circle cx="10.5" cy="10.5" r="6.5" />
                      <path d="m15.5 15.5 5 5" />
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

                  <div className="tp-notes__teddy">
                    <span aria-hidden="true" className="tp-notes__bubble font-plush">
                      <span className="tp-notes__q">?</span>
                      <span className="tp-notes__a">!</span>
                    </span>
                    <div className="pup-buddy" data-facing="right">
                      <PupBuddy facing="right" pose="sit" />
                    </div>
                  </div>

                  <a
                    href={SITE_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp tp-notes__ask"
                  >
                    Ask your own question
                  </a>
                </aside>

                {/* Right Corkboard */}
                <div className="tp-notes__board">
                  <ul className="tp-notes__list">
                    {filteredFaqs.length === 0 ? (
                      <li className="tp-note tp-note--empty">
                        <p className="font-plush text-lg">No notes matched your sniff</p>
                        <p className="mt-2 text-sm text-[var(--ink-soft)]">
                          Try searching for "delivery", "Korea", or "vaccinated" — or message us directly on WhatsApp!
                        </p>
                      </li>
                    ) : (
                      filteredFaqs.map((faq, index) => {
                        const isOpen = openId === faq.id;
                        return (
                          <li
                            key={faq.id}
                            className="tp-note"
                            data-reveal="true"
                            data-unfolded={isOpen ? 'true' : undefined}
                            style={{
                              '--tilt': faq.tilt,
                              '--pin': faq.pin,
                              '--i': index,
                            }}
                          >
                            <span aria-hidden="true" className="tp-note__pin" />
                            <h2 className="tp-note__q">
                              <button
                                type="button"
                                id={`q-${faq.id}`}
                                aria-expanded={isOpen}
                                aria-controls={`a-${faq.id}`}
                                onClick={() => setOpenId(isOpen ? null : faq.id)}
                              >
                                <span className="font-plush-text">
                                  {highlightMatch(faq.q, searchQuery)}
                                </span>
                                <span aria-hidden="true" className="tp-note__chevron" />
                              </button>
                            </h2>
                            <div
                              id={`a-${faq.id}`}
                              role="region"
                              aria-labelledby={`q-${faq.id}`}
                              className="tp-note__answer"
                              inert={isOpen ? undefined : ''}
                            >
                              <div className="tp-note__flap">
                                <p>{highlightMatch(faq.a, searchQuery)}</p>
                              </div>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
