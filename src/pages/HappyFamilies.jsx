import React, { useState, useEffect } from 'react';
import PupBuddy from '../components/PupBuddy';
import happyFamiliesData from '../data/happyFamiliesData.json';

export default function HappyFamilies() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) => (prev + 1) % happyFamiliesData.length);
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) => (prev - 1 + happyFamiliesData.length) % happyFamiliesData.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  return (
    <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
      <div data-page="families" className="tp-page">
        <section aria-labelledby="families-title" className="tp-memories">
          <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="tp-memories__head">
              <div>
                <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                  our wall of happy endings
                </p>
                <h1 id="families-title" className="font-plush text-giant tp-memories__title" data-reveal="true">
                  Happy families
                  <svg viewBox="0 0 48 44" className="tp-memories__heart" aria-hidden="true">
                    <path
                      d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </h1>
                <p className="text-lede mt-6 max-w-[50ch] text-cocoa-soft" data-reveal="true">
                  Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
                </p>
                <p className="font-scrawl mt-5 text-lg text-toffee-ink" data-reveal="true">
                  {happyFamiliesData.length} moments and counting
                </p>
              </div>

              {/* Sarah M. Testimonial Note */}
              <figure className="tp-memories__note" data-reveal="true">
                <span aria-hidden="true" className="tp-tape tp-tape--center" style={{ '--tape': '#cfe5f6' }} />
                <blockquote className="font-plush-text">
                  “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
                </blockquote>
                <figcaption className="font-scrawl">
                  Sarah M., Dubai, UAE
                </figcaption>
              </figure>
            </div>

            {/* Polaroid Photo Wall Grid */}
            <div className="mt-16 md:mt-20">
              <ul className="tp-wall" aria-label="Photos from TeddyPups families">
                {happyFamiliesData.map((item, index) => (
                  <li key={item.id} className="tp-wall__item" data-reveal="true" style={{ '--d': `${index * 20}ms` }}>
                    <button
                      type="button"
                      className="tp-wall__print"
                      aria-label={`Open photo ${index + 1} of ${happyFamiliesData.length}`}
                      onClick={() => setSelectedPhotoIndex(index)}
                    >
                      <span
                        className="tp-polaroid"
                        style={{
                          '--tilt': item.tilt,
                          '--tape': item.tape,
                          '--i': index,
                        }}
                      >
                        <span aria-hidden="true" className={`tp-tape ${item.tapeClass}`} />
                        <span className="tp-polaroid__photo">
                          <img
                            src={item.img}
                            alt={item.alt}
                            loading={index < 12 ? 'eager' : 'lazy'}
                            width="960"
                            height="1280"
                          />
                        </span>
                        {item.caption && (
                          <span className="tp-polaroid__caption font-scrawl">
                            {item.caption}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Footer Mascot */}
            <div className="tp-memories__foot">
              <div className="pup-buddy w-36 md:w-44" data-facing="left">
                <PupBuddy facing="left" pose="sit" />
              </div>
              <p className="font-scrawl text-lg text-cocoa-soft">
                every one of them was a Teddy Pup once
              </p>
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedPhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-[#2a170e]/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-[#fffefb] p-4 sm:p-6 rounded-2xl shadow-2xl border-4 border-[#2a170e]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#2a170e] text-[#fffefb] flex items-center justify-center font-bold text-lg hover:scale-110 transition-transform"
                onClick={() => setSelectedPhotoIndex(null)}
                aria-label="Close photo"
              >
                ✕
              </button>

              {/* Photo */}
              <div className="rounded-lg overflow-hidden bg-[#e8dfd3] shadow-inner max-h-[75vh] flex items-center justify-center">
                <img
                  src={happyFamiliesData[selectedPhotoIndex].img}
                  alt={happyFamiliesData[selectedPhotoIndex].alt}
                  className="w-full h-auto max-h-[75vh] object-contain"
                />
              </div>

              {/* Caption & Controls */}
              <div className="mt-4 flex items-center justify-between text-[#2a170e]">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full border-2 border-[#2a170e] font-plush font-bold hover:bg-[#f6d79a] transition-colors"
                  onClick={() =>
                    setSelectedPhotoIndex(
                      (selectedPhotoIndex - 1 + happyFamiliesData.length) % happyFamiliesData.length
                    )
                  }
                >
                  ← Previous
                </button>

                <div className="text-center">
                  <p className="font-scrawl text-sm text-[#8e3f15]">
                    Photo {selectedPhotoIndex + 1} of {happyFamiliesData.length}
                  </p>
                  {happyFamiliesData[selectedPhotoIndex].caption && (
                    <p className="font-plush-text text-sm font-semibold mt-1">
                      {happyFamiliesData[selectedPhotoIndex].caption}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className="px-4 py-2 rounded-full border-2 border-[#2a170e] font-plush font-bold hover:bg-[#f6d79a] transition-colors"
                  onClick={() =>
                    setSelectedPhotoIndex((selectedPhotoIndex + 1) % happyFamiliesData.length)
                  }
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
