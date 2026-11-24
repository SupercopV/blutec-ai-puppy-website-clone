import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Sparkles, X } from 'lucide-react';
import PuppyCard from '../components/PuppyCard';
import VideoModal from '../components/VideoModal';
import PupBuddy from '../components/PupBuddy';
import { PUPPIES_DATA, BREEDS_LIST, ORIGINS_LIST } from '../data/puppiesData';

export default function Puppies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const breedParam = searchParams.get('breed');
  const originParam = searchParams.get('origin');

  const [selectedBreed, setSelectedBreed] = useState(
    breedParam ? (breedParam.charAt(0).toUpperCase() + breedParam.slice(1)) : 'All'
  );
  const [selectedOrigin, setSelectedOrigin] = useState(originParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
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
      const matchesOrigin =
        selectedOrigin === 'all' ||
        p.originType === selectedOrigin;

      // Search query
      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.color.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesBreed && matchesOrigin && matchesSearch;
    });
  }, [selectedBreed, selectedOrigin, searchQuery]);

  const handleBreedClick = (breed) => {
    setSelectedBreed(breed);
    if (breed === 'All') {
      searchParams.delete('breed');
    } else {
      searchParams.set('breed', breed.toLowerCase());
    }
    setSearchParams(searchParams);
  };

  const handleOriginClick = (origin) => {
    setSelectedOrigin(origin);
    if (origin === 'all') {
      searchParams.delete('origin');
    } else {
      searchParams.set('origin', origin);
    }
    setSearchParams(searchParams);
  };

  const handleReset = () => {
    setSelectedBreed('All');
    setSelectedOrigin('all');
    setSearchQuery('');
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

            {/* Self-Portrait Mascot */}
            <div className="tp-sketchbook__self" data-reveal="true">
              <PupBuddy facing="left" />
              <span className="font-scrawl tp-sketchbook__caption">self-portrait</span>
            </div>
          </div>

          {/* Controls and Filters */}
          <div className="tp-sketchpad mt-12 bg-white/80 border-2 border-[#2a170e] rounded-3xl p-5 sm:p-6 shadow-[5px_7px_0px_#2a170e]">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a3a28]/60" />
                <input
                  type="text"
                  placeholder="Search by name, breed, or color..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border border-[#2a170e]/30 bg-[#fffdf8] text-sm text-[#2a170e] placeholder:text-[#5a3a28]/50 focus:outline-none focus:ring-2 focus:ring-[#c2622b]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5a3a28]/60 hover:text-[#2a170e]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Origin Radio / Tabs */}
              <div className="flex items-center gap-1.5 bg-[#fff8ea] p-1 rounded-full border border-[#2a170e]/20 self-start lg:self-auto">
                {ORIGINS_LIST.map((origin) => (
                  <button
                    key={origin.value}
                    onClick={() => handleOriginClick(origin.value)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      selectedOrigin === origin.value
                        ? 'bg-[#2a170e] text-[#fffdf8] shadow-sm'
                        : 'text-[#5a3a28] hover:text-[#2a170e]'
                    }`}
                  >
                    {origin.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Breed Filter Pills */}
            <div className="mt-5 pt-4 border-t border-[#2a170e]/10 flex flex-wrap items-center gap-2">
              <span className="font-scrawl text-xs text-[#8e3f15] mr-2">Breed:</span>
              {BREEDS_LIST.map((breed) => (
                <button
                  key={breed}
                  onClick={() => handleBreedClick(breed)}
                  className={`px-4 py-1 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedBreed === breed
                      ? 'bg-[#c2622b] text-white shadow-sm'
                      : 'bg-[#fff8ea] text-[#2a170e] border border-[#2a170e]/20 hover:bg-[#fbe3b4]'
                  }`}
                >
                  {breed}
                </button>
              ))}
            </div>
          </div>

          {/* Results Counter and Active Filters */}
          <div className="flex items-center justify-between mt-8 mb-4 px-1">
            <p className="font-plush font-bold text-lg text-[#2a170e]">
              Showing {filteredPuppies.length} {filteredPuppies.length === 1 ? 'puppy' : 'puppies'}
            </p>

            {(selectedBreed !== 'All' || selectedOrigin !== 'all' || searchQuery) && (
              <button
                onClick={handleReset}
                className="text-xs font-bold text-[#c2622b] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Reset all filters
              </button>
            )}
          </div>

          {/* Puppies Grid with staggered layout */}
          {filteredPuppies.length > 0 ? (
            <ul className="tp-sketches mt-12">
              {filteredPuppies.map((puppy, i) => (
                <li key={puppy.id}>
                  <PuppyCard
                    puppy={puppy}
                    index={i}
                    onOpenVideo={(p) => setActiveVideoPuppy(p)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-[#fff8ea] border-2 border-dashed border-[#2a170e]/30 rounded-3xl p-12 text-center max-w-lg mx-auto mt-12">
              <Sparkles className="w-10 h-10 text-[#c2622b] mx-auto mb-3" />
              <h3 className="font-plush text-2xl font-bold text-[#2a170e]">
                No puppies found
              </h3>
              <p className="text-sm text-[#5a3a28] mt-2 mb-6">
                We couldn't find any puppies matching your exact criteria. Would you like to reset your filters or request a custom breed?
              </p>
              <button
                onClick={handleReset}
                className="btn btn-primary px-6 py-2.5 rounded-full text-sm font-semibold"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* ALREADY GONE HOME CALLOUT STRIP */}
          <section aria-labelledby="gone-title" className="tp-gone-strip mt-28 border-t-2 border-[#2a170e]/15 pt-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 bg-[#fff8ea] border-3 border-[#2a170e] rounded-3xl p-8 sm:p-10 shadow-[6px_8px_0px_#2a170e]">
              <div className="md:w-1/2">
                <span className="font-scrawl text-sm text-[#8e3f15] font-semibold">tickets home</span>
                <h2 className="font-plush text-3xl sm:text-4xl font-extrabold text-[#2a170e] mt-1" id="gone-title">
                  Already gone home
                </h2>
                <p className="mt-2 text-base text-[#5a3a28]">
                  These puppies have found their families. Looking for one just like them? Tell us — we'll help you find your match.
                </p>
                <Link className="btn btn-primary mt-6 inline-block" to="/gone-home">
                  See the puppies who've gone home
                </Link>
              </div>

              <div className="flex items-center gap-4 overflow-x-auto pb-2">
                <div className="w-28 sm:w-32 aspect-square rounded-2xl overflow-hidden border-2 border-[#2a170e] bg-white shadow-sm shrink-0 -rotate-2">
                  <img src="/puppies/asset_207692.jpeg" alt="Adopted puppy Ace" className="w-full h-full object-cover" />
                </div>
                <div className="w-28 sm:w-32 aspect-square rounded-2xl overflow-hidden border-2 border-[#2a170e] bg-white shadow-sm shrink-0 rotate-3">
                  <img src="/puppies/asset_217798.jpeg" alt="Adopted puppy Leo" className="w-full h-full object-cover" />
                </div>
                <div className="w-28 sm:w-32 aspect-square rounded-2xl overflow-hidden border-2 border-[#2a170e] bg-white shadow-sm shrink-0 -rotate-1">
                  <img src="/puppies/asset_676678.jpeg" alt="Adopted puppy Mia" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>
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
