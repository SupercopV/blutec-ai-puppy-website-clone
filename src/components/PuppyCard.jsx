import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function PuppyCard({ puppy, onOpenVideo }) {
  const {
    id,
    slug,
    name,
    breed,
    gender,
    age,
    status = 'Available',
    hasVideo,
    primaryImage,
    washColor = '#fbe3b4',
    tilt = '1deg',
    origin,
    originType,
    price
  } = puppy;

  return (
    <div 
      className="group relative flex flex-col transition-transform duration-300 hover:-translate-y-1.5"
      style={{
        '--tilt': tilt,
        '--wash': washColor
      }}
    >
      <div 
        className="relative bg-white border-2 border-[#2a170e] rounded-2xl p-3 sm:p-4 shadow-[4px_6px_0px_#2a170e] transition-all duration-300 group-hover:shadow-[6px_9px_0px_#2a170e]"
        style={{
          transform: `rotate(${tilt})`
        }}
      >
        {/* Watercolor Wash Background SVG */}
        <div 
          className="absolute inset-2 -z-0 rounded-xl opacity-60 pointer-events-none transition-opacity duration-300 group-hover:opacity-85"
          style={{ backgroundColor: washColor }}
        />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between mb-2.5">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#2a170e] text-[#fffdf8]">
            {status}
          </span>

          {hasVideo && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenVideo && onOpenVideo(puppy);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#fffdf8] text-[#8e3f15] border border-[#2a170e]/20 hover:bg-[#fbe3b4] transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>video</span>
            </button>
          )}
        </div>

        {/* Photo Container */}
        <Link to={`/puppies/${slug}`} className="relative z-10 block aspect-square rounded-xl overflow-hidden border border-[#2a170e]/15 bg-[#fff8ea]">
          <img
            src={primaryImage}
            alt={`${name} - ${breed}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Puppy Information */}
        <div className="relative z-10 mt-3 flex flex-col">
          <div className="flex items-baseline justify-between gap-2">
            <Link to={`/puppies/${slug}`} className="hover:text-[#c2622b] transition-colors">
              <h3 className="font-plush text-lg sm:text-xl font-bold text-[#2a170e] leading-snug">
                {name}
              </h3>
            </Link>
            {price && (
              <span className="text-xs font-bold text-[#c2622b]">
                {price}
              </span>
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-[#5a3a28]">
            <span className="font-medium">{breed}</span>
            <span>·</span>
            <span className={`px-1.5 py-0.2 rounded font-semibold ${
              gender.includes('girl') ? 'text-[#a24a1a] bg-[#f9cdbf]/50' : 'text-[#2f6e9e] bg-[#bfddf5]/50'
            }`}>
              {gender}
            </span>
            <span>·</span>
            <span>{age}</span>
          </div>

          {origin && (
            <div className="mt-2 pt-2 border-t border-[#2a170e]/10 flex items-center justify-between text-[11px] text-[#5a3a28]/80 font-scrawl">
              <span>{origin}</span>
              <span className="text-[#c2622b] font-medium group-hover:underline">
                View profile →
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
