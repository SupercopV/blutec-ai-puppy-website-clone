import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PuppyCard from '../components/PuppyCard';
import VideoModal from '../components/VideoModal';
import PupBuddy from '../components/PupBuddy';
import { PUPPIES_DATA } from '../data/puppiesData';

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
        matchesOrigin = p.originType === 'imported' || p.origin?.toLowerCase().includes('imported') || p.origin?.toLowerCase().includes('korea');
      } else if (selectedOrigin === 'korean teacup') {
        matchesOrigin = p.origin?.toLowerCase().includes('korea') || p.name?.toLowerCase().includes('korean') || p.name?.toLowerCase().includes('teacup');
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
    <main className="relative pt-[var(--header-h)] outline-none min-h-screen">
      <section aria-labelledby="pups-title" className="tp-sketchbook">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
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
              <PupBuddy facing="left" />
              <span className="font-scrawl tp-sketchbook__caption">self-portrait</span>
            </div>
          </div>

          {/* Filter Notepad matching user reference Image 1 */}
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
                    { label: 'Korean Teacup', value: 'korean teacup' }
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
                  {[
                    'Maltipoo',
                    'Pomeranian',
                    'Poodle',
                    'Cavapoo',
                    'Shih Tzu'
                  ].map((breed) => {
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
                    { label: 'Girls', value: 'girl' }
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

          {/* Active Filter Info / Reset */}
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

          {/* Sketches Grid */}
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
              <PupBuddy facing="left" className="mx-auto w-32 mb-4" />
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
