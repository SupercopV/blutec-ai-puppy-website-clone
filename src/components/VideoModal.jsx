import React from 'react';
import { X, Play, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export default function VideoModal({ puppy, onClose }) {
  if (!puppy) return null;

  return (
    <div className="tp-modal-overlay" onClick={onClose}>
      <div 
        className="relative bg-[#fffdf8] border-3 border-[#2a170e] rounded-3xl p-6 max-w-lg w-full shadow-[8px_12px_0px_#2a170e] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-[#2a170e] text-[#fffdf8] flex items-center justify-center hover:bg-[#c2622b] transition-colors shadow-md cursor-pointer"
          aria-label="Close video preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <span className="font-scrawl text-sm text-[#8e3f15]">
            meet {puppy.name} in motion 🧸
          </span>
          <h3 className="font-plush text-2xl font-bold text-[#2a170e]">
            {puppy.name} · {puppy.breed}
          </h3>
          <p className="text-xs text-[#5a3a28]">
            {puppy.age} · {puppy.gender} · {puppy.origin}
          </p>
        </div>

        {/* Video Player Container / Simulated Video Preview */}
        <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-[#2a170e] bg-black shadow-inner flex items-center justify-center">
          <img
            src={puppy.primaryImage}
            alt={puppy.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4 text-center">
            <div className="w-14 h-14 rounded-full bg-[#c2622b] flex items-center justify-center shadow-lg mb-3 animate-pulse">
              <Play className="w-7 h-7 fill-white translate-x-0.5" />
            </div>
            <p className="font-semibold text-sm drop-shadow">
              HD Video clip available on WhatsApp
            </p>
            <p className="font-scrawl text-xs text-[#fbe3b4] mt-1">
              Recorded live in our Dubai showroom
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/919898124987?text=Hi%20TeddyPups%20UAE%2C%20please%20send%20me%20the%20video%20of%20${encodeURIComponent(puppy.name)}%20(${encodeURIComponent(puppy.breed)})!`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex-1 py-3 rounded-full text-center flex items-center justify-center gap-2 font-semibold text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Request HD Video on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
