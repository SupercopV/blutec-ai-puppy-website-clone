import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import PuppyCard from '../components/PuppyCard';
import VideoModal from '../components/VideoModal';
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
    <main className="relative pt-[var(--header-h)] pb-24 outline-none bg-[#fffdf8] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#fff8ea] border-b-2 border-[#2a170e] py-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[110rem] text-center">
          <span className="font-scrawl text-base text-[#8e3f15] font-semibold">
            healthy, loving & vet-certified
          </span>
          <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-[#2a170e] mt-1 mb-3">
            Available puppies
          </h1>
          <p className="text-base sm:text-lg text-[#5a3a28] max-w-2xl mx-auto">
            Browse our gorgeous teacup and miniature puppies ready for adoption in our Downtown Dubai showroom or imported upon request.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8 pt-10">
        {/* Controls and Filters */}
        <div className="bg-white border-2 border-[#2a170e] rounded-3xl p-5 sm:p-6 shadow-[5px_7px_0px_#2a170e] mb-10">
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
        <div className="flex items-center justify-between mb-6 px-1">
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

        {/* Puppies Grid */}
        {filteredPuppies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredPuppies.map((puppy) => (
              <PuppyCard
                key={puppy.id}
                puppy={puppy}
                onOpenVideo={(p) => setActiveVideoPuppy(p)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#fff8ea] border-2 border-dashed border-[#2a170e]/30 rounded-3xl p-12 text-center max-w-lg mx-auto">
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
      </div>

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
