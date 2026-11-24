import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin, Globe } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="tp-footer relative bg-[#2a170e] text-[#fffdf8] pt-16 pb-[calc(var(--bar-h)+2.5rem)] md:pb-12 overflow-hidden">
      {/* Decorative Scallop Top Edge */}
      <div className="absolute top-0 inset-x-0 h-4 bg-repeat-x opacity-90" style={{
        backgroundImage: `radial-gradient(circle at 10px -5px, transparent 12px, #2a170e 13px)`,
        backgroundSize: '24px 16px'
      }} />

      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/brand/logo.png" alt="TeddyPups" className="h-12 w-auto invert brightness-200" />
              <span className="font-plush text-3xl font-bold tracking-tight text-[#fbe3b4]">
                TeddyPups
              </span>
            </Link>
            <p className="font-plush text-xl italic text-[#f2be6b]">
              Home, at last.
            </p>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium concierge services and worldwide shipping.
            </p>
            <div className="font-scrawl text-sm text-[#fbe3b4] mt-2">
              every puppy is family ♥
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h3 className="font-scrawl text-lg text-[#f2be6b] mb-1">
              Explore
            </h3>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm text-white/80">
              <li>
                <Link to="/puppies" className="hover:text-[#fbe3b4] transition-colors">
                  Available puppies
                </Link>
              </li>
              <li>
                <Link to="/gone-home" className="hover:text-[#fbe3b4] transition-colors">
                  Gone home
                </Link>
              </li>
              <li>
                <Link to="/happy-families" className="hover:text-[#fbe3b4] transition-colors">
                  Happy families
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#fbe3b4] transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#fbe3b4] transition-colors">
                  Delivery & collection
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#fbe3b4] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#fbe3b4] transition-colors">
                  Visit & contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Say Hello / Contact */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h3 className="font-scrawl text-lg text-[#f2be6b] mb-1">
              Say hello
            </h3>
            <div className="flex flex-col gap-2.5 text-sm text-white/80">
              <a 
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-[#fbe3b4] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#f2be6b]" />
                <span>WhatsApp: {SITE_CONFIG.phone}</span>
              </a>
              <a 
                href={`mailto:${SITE_CONFIG.email}`} 
                className="flex items-center gap-2 hover:text-[#fbe3b4] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#f2be6b]" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <div className="flex items-start gap-2 text-white/70">
                <MapPin className="w-4 h-4 text-[#f2be6b] shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.location}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              <a 
                href={SITE_CONFIG.socialLinks.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full bg-white/10 hover:bg-[#c2622b] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href={SITE_CONFIG.socialLinks.facebook} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full bg-white/10 hover:bg-[#c2622b] transition-colors"
                aria-label="Facebook"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a 
                href={SITE_CONFIG.whatsappUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full bg-[#1f7a4d] hover:bg-[#165a38] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© {new Date().getFullYear()} TeddyPups U.A.E. · All rights reserved.</p>
          <p className="font-scrawl text-sm text-[#fbe3b4]">
            Crafted with love for puppy families everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
