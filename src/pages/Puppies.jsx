import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PuppyCard from '../components/PuppyCard';
import VideoModal from '../components/VideoModal';
import PupBuddy from '../components/PupBuddy';
import { PUPPIES_DATA } from '../data/puppiesData';
import goneHomeStripData from '../data/goneHomeStripData.json';

export default function Puppies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const breedParam = searchParams.get('breed');
  const originParam = searchParams.get('origin');
  const genderParam = searchParams.get('gender');

  const [selectedBreed, setSelectedBreed] = useState(
    breedParam ? (breedParam.charAt(0).toUpperCase() + breedParam.slice(1)) : 'All'
  );
  const [selectedOrigin, setSelectedOrigin] = useState(originParam || 'all');
  const [selectedGender, setSelectedGender] = useState(genderParam || 'all');
  const [activeVideoPuppy, setActiveVideoPuppy] = useState(null);

  // Filter logic
  const filteredPuppies = useMemo(() => {
    return PUPPIES_DATA.filter((p) => {
      // Breed filter
      const matchesBreed =
        selectedBreed === 'All' ||
        p.breed.toLowerCase() === selectedBreed.toLowerCase() ||
        (selectedBreed === 'Shih Tzu' && p.breed.toLowerCase().includes('shih'));

      // Origin filter
      let matchesOrigin = true;
      if (selectedOrigin === 'imported') {
        matchesOrigin =
          p.originType === 'imported' ||
          p.origin?.toLowerCase().includes('imported') ||
          p.origin?.toLowerCase().includes('korea');
      } else if (selectedOrigin === 'korean teacup') {
        matchesOrigin =
          p.origin?.toLowerCase().includes('korea') ||
          p.name?.toLowerCase().includes('korean') ||
          p.name?.toLowerCase().includes('teacup');
      }

      // Gender filter
      let matchesGender = true;
      if (selectedGender !== 'all') {
        matchesGender = p.gender?.toLowerCase() === selectedGender.toLowerCase();
      }

      return matchesBreed && matchesOrigin && matchesGender;
    });
  }, [selectedBreed, selectedOrigin, selectedGender]);

  const handleOriginClick = (value) => {
    const nextValue = selectedOrigin === value ? 'all' : value;
    setSelectedOrigin(nextValue);
    if (nextValue === 'all') {
      searchParams.delete('origin');
    } else {
      searchParams.set('origin', nextValue);
    }
    setSearchParams(searchParams);
  };

  const handleBreedClick = (breed) => {
    const nextBreed = selectedBreed.toLowerCase() === breed.toLowerCase() ? 'All' : breed;
    setSelectedBreed(nextBreed);
    if (nextBreed === 'All') {
      searchParams.delete('breed');
    } else {
      searchParams.set('breed', nextBreed.toLowerCase());
    }
    setSearchParams(searchParams);
  };

  const handleGenderClick = (gender) => {
    const nextGender = selectedGender === gender ? 'all' : gender;
    setSelectedGender(nextGender);
    if (nextGender === 'all') {
      searchParams.delete('gender');
    } else {
      searchParams.set('gender', nextGender);
    }
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setSelectedBreed('All');
    setSelectedOrigin('all');
    setSelectedGender('all');
    setSearchParams({});
  };

  return (
    <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none min-h-screen">
      <div data-page="pups" className="tp-page">
        {/* Main Sketchbook Section */}
        <section aria-labelledby="pups-title" className="tp-sketchbook">
          <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
            {/* Sketchbook Header */}
            <div className="tp-sketchbook__head">
              <div className="tp-sketchbook__words">
                <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
                  from Teddy's sketchbook
                </p>
                <h1 id="pups-title" className="font-plush text-giant tp-sketchbook__title" data-reveal="true">
                  Available puppies
                  <svg aria-hidden="true" viewBox="0 0 400 24" preserveAspectRatio="none" className="tp-sketchbook__underline">
                    <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" pathLength="1" />
                  </svg>
                </h1>
                <p className="tp-sketchbook__lede text-lede mt-6 max-w-[46ch] text-cocoa-soft" data-reveal="true">
                  Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
                </p>
              </div>

              {/* Self-Portrait Mascot Frame */}
              <div className="tp-sketchbook__self" data-reveal="true">
                <div className="pup-buddy" data-facing="left">
                  <PupBuddy facing="left" pose="sit" />
                </div>
                <span className="font-scrawl tp-sketchbook__caption">self-portrait</span>
              </div>
            </div>

            {/* Filter Notepad matching Reference Image 1 */}
            <div className="tp-sketchpad mt-10">
              <div className="flex flex-col gap-5 sm:gap-6">
                {/* Row 1: where */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <span className="w-24 sm:w-28 shrink-0 font-medium text-cocoa text-[0.95rem] tracking-wide">
                    where
                  </span>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {[
                      { label: 'Everywhere', value: 'all' },
                      { label: 'Imported', value: 'imported' },
                      { label: 'Korean Teacup', value: 'korean teacup' },
                    ].map((item) => {
                      const isPressed = selectedOrigin === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          className="tp-sticker-chip"
                          aria-pressed={isPressed}
                          onClick={() => handleOriginClick(item.value)}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 2: breed */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <span className="w-24 sm:w-28 shrink-0 font-medium text-cocoa text-[0.95rem] tracking-wide">
                    breed
                  </span>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'].map((breed) => {
                      const isPressed = selectedBreed.toLowerCase() === breed.toLowerCase();
                      return (
                        <button
                          key={breed}
                          type="button"
                          className="tp-sticker-chip"
                          aria-pressed={isPressed}
                          onClick={() => handleBreedClick(breed)}
                        >
                          {breed}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 3: boy or girl */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <span className="w-24 sm:w-28 shrink-0 font-medium text-cocoa text-[0.95rem] tracking-wide">
                    boy or girl
                  </span>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {[
                      { label: 'Boys', value: 'boy' },
                      { label: 'Girls', value: 'girl' },
                    ].map((item) => {
                      const isPressed = selectedGender === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          className="tp-sticker-chip"
                          aria-pressed={isPressed}
                          onClick={() => handleGenderClick(item.value)}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filter Counter / Reset Indicator */}
            {(selectedBreed !== 'All' || selectedOrigin !== 'all' || selectedGender !== 'all') && (
              <div className="mt-6 flex items-center justify-between px-2">
                <p className="text-sm text-cocoa-soft">
                  Showing <strong className="text-cocoa">{filteredPuppies.length}</strong> matching puppies
                </p>
                <button
                  onClick={handleReset}
                  className="font-scrawl text-sm text-[#c2622b] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Staggered Sketches Grid */}
            <ul className="tp-sketches mt-14 sm:mt-20">
              {filteredPuppies.map((puppy, index) => (
                <li key={puppy.id}>
                  <PuppyCard
                    puppy={puppy}
                    index={index}
                    onPlayVideo={(p) => setActiveVideoPuppy(p)}
                  />
                </li>
              ))}
            </ul>

            {/* Empty State */}
            {filteredPuppies.length === 0 && (
              <div className="mt-16 text-center py-16 bg-[#fffdf8] rounded-3xl border-2 border-dashed border-[#2a170e]/20 max-w-lg mx-auto">
                <div className="pup-buddy mx-auto w-32 mb-4" data-facing="left">
                  <PupBuddy facing="left" pose="sit" />
                </div>
                <p className="font-plush text-2xl text-cocoa">No puppies found</p>
                <p className="font-scrawl text-toffee text-sm mt-2">
                  Teddy couldn't find any pups matching these exact filters!
                </p>
                <button
                  onClick={handleReset}
                  className="btn btn-primary mt-6 inline-block"
                >
                  Show all available puppies
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ALREADY GONE HOME SHOWCASE STRIP */}
        <section aria-labelledby="gone-title" className="tp-gone-strip">
          <div className="gutter mx-auto flex max-w-[110rem] flex-col gap-10 md:flex-row md:items-center px-4 sm:px-6 lg:px-8">
            <div className="md:w-1/3" data-reveal="true">
              <h2 id="gone-title" className="font-plush text-big">
                Already gone home
              </h2>
              <p className="mt-3 text-cocoa-soft">
                These puppies have found their families.
              </p>
              <Link className="btn btn-primary mt-6" to="/gone-home">
                See the puppies who've gone home
              </Link>
            </div>

            <ul className="tp-gone-strip__row" aria-label="Some puppies who have gone home">
              {goneHomeStripData.map((gonePup, idx) => (
                <li key={idx}>
                  <Link
                    to={gonePup.href}
                    className="tp-sketch tp-sketch--small"
                    data-reveal="true"
                    style={{
                      '--tilt': gonePup.tilt,
                      '--d': `${idx * 40}ms`,
                      '--wash': gonePup.wash,
                    }}
                    aria-label={gonePup.ariaLabel}
                  >
                    <span className="tp-sketch__frame">
                      <svg aria-hidden="true" viewBox="0 0 100 100" className="tp-sketch__wash" style={{ translate: '-1.9% 4.3%' }}>
                        <path d="M95.32 50.00C95.09 52.40 94.65 54.77 94.13 57.08C93.60 59.40 92.93 61.66 92.16 63.88C91.38 66.10 90.51 68.28 89.49 70.39C88.46 72.50 87.33 74.57 86.03 76.53C84.73 78.49 83.29 80.39 81.70 82.13Z" />
                      </svg>
                      <span className="tp-sketch__photo">
                        <img src={gonePup.img} alt={gonePup.name} width="240" height="240" loading="lazy" />
                      </span>
                      <span className="tp-sketch__sticker tp-sketch__sticker--home font-scrawl">
                        gone home
                      </span>
                    </span>
                    <span className="tp-sketch__name font-plush">{gonePup.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Video Modal */}
        {activeVideoPuppy && (
          <VideoModal
            puppy={activeVideoPuppy}
            onClose={() => setActiveVideoPuppy(null)}
          />
        )}
      </div>
    </main>
  );
}
