import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import { HAPPY_FAMILIES_DATA, SITE_CONFIG } from '../data/siteData';

const TAPE_COLORS = ['#f6d79a', '#f9cdbf', '#d8eaee', '#eed8be', '#e2d8ea'];
const TILTS = ['-2.2deg', '1.6deg', '-1.2deg', '2.4deg', '-1.8deg', '1.1deg', '-2.6deg', '1.9deg'];

export default function HappyFamilies() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <main className="relative pt-[var(--header-h)] pb-24 outline-none min-h-screen">
      <section className="tp-memories">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <header className="max-w-[50rem]">
            <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
              our wall of happy endings
            </p>
            <h1 className="font-plush text-giant" data-reveal="true">
              Happy families
            </h1>
            <p className="text-lede mt-5 max-w-[44ch] text-cocoa-soft" data-reveal="true">
              Nothing makes us happier than seeing our puppies settled with their families. Here are some of the photos and messages our owners send us from all over the world.
            </p>
          </header>

          {/* Authentic Polaroid Masonry Wall */}
          <div className="mt-16 md:mt-20">
            <ul className="tp-wall" aria-label="Photos from TeddyPups families">
              {HAPPY_FAMILIES_DATA.map((item, idx) => {
                const tilt = TILTS[idx % TILTS.length];
                const tapeColor = TAPE_COLORS[idx % TAPE_COLORS.length];
                const delayMs = (idx % 6) * 110;

                return (
                  <li 
                    key={item.id} 
                    className="tp-wall__item" 
                    data-reveal="true" 
                    style={{ '--d': `${delayMs}ms` }}
                  >
                    <button
                      type="button"
                      className="tp-wall__print cursor-pointer"
                      onClick={() => setSelectedPhoto(item)}
                      aria-label={`Open photo: ${item.caption || 'Happy family'}`}
                    >
                      <span 
                        className="tp-polaroid" 
                        style={{ 
                          '--tilt': tilt, 
                          '--tape': tapeColor, 
                          '--i': idx 
                        }}
                      >
                        <span aria-hidden="true" className="tp-tape tp-tape--center" />
                        <span className="tp-polaroid__photo">
                          <img
                            src={item.image}
                            alt={item.caption || 'A happy TeddyPups family with their new puppy'}
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/puppies/copper-1.webp';
                            }}
                          />
                        </span>
                        {item.caption && (
                          <span className="tp-polaroid__caption font-scrawl">
                            {item.caption}
                          </span>
                        )}
                      </span>

                      {/* Animated Paw Print Pat */}
                      <svg viewBox="0 0 64 64" className="tp-wall__paw" aria-hidden="true" fill="currentColor">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-20 bg-[#fff8ea] border-3 border-[#2a170e] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-[6px_8px_0px_#2a170e]">
            <h2 className="font-plush text-2xl sm:text-4xl font-extrabold text-[#2a170e] mb-3">
              Ready to welcome your own teddy puppy?
            </h2>
            <p className="text-sm sm:text-base text-[#5a3a28] max-w-xl mx-auto mb-6">
              Join hundreds of delighted families across Dubai and the world. Browse available pups today or let us source your dream breed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/puppies"
                className="btn btn-primary px-8 py-3 rounded-full font-bold text-sm shadow-[0_4px_0px_#2a170e]"
              >
                See available puppies
              </Link>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp px-8 py-3 rounded-full font-bold text-sm shadow-[0_4px_0px_#2a170e] flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat with us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox / Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-xl w-full bg-[#fffdf8] border-3 border-[#2a170e] rounded-3xl p-4 sm:p-6 shadow-[8px_12px_0px_#2a170e]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-3 -right-3 w-10 h-10 bg-[#2a170e] text-white rounded-full flex items-center justify-center hover:bg-[#c2622b] transition-colors cursor-pointer shadow-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#fff8ea] border border-[#2a170e]/20 mb-4">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.caption || 'Family photo'}
                className="w-full h-full object-cover"
              />
            </div>

            {selectedPhoto.caption && (
              <p className="font-plush text-lg sm:text-xl font-bold text-[#2a170e] text-center">
                {selectedPhoto.caption}
              </p>
            )}
            {selectedPhoto.family && (
              <p className="font-scrawl text-sm text-[#8e3f15] text-center mt-1">
                🐾 {selectedPhoto.family}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
