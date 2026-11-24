import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Sparkles, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export default function FloatingBar() {
  return (
    <div className="tp-floating-bar" role="complementary" aria-label="Quick Actions">
      <Link
        to="/puppies"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-[#2a170e] hover:bg-[#fbe3b4] transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#c2622b]" />
        <span>Available pups</span>
      </Link>

      <div className="w-px h-5 bg-[#2a170e]/20" />

      <Link
        to="/contact"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[#2a170e] hover:bg-[#fbe3b4] transition-colors hide-on-mobile"
      >
        <MapPin className="w-3.5 h-3.5 text-[#c2622b]" />
        <span>Visit Showroom</span>
      </Link>

      <div className="w-px h-5 bg-[#2a170e]/20 hide-on-mobile" />

      <a
        href={SITE_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#1f7a4d] text-white shadow-sm hover:bg-[#18623e] transition-all hover:scale-105"
      >
        <MessageCircle className="w-3.5 h-3.5 fill-current" />
        <span>WhatsApp us</span>
      </a>
    </div>
  );
}
