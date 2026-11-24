import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Heart, Phone } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const PawIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 64 64" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z M20.5 24c3 0 5.5-3.1 5.5-7s-2.5-7-5.5-7-5.5 3.1-5.5 7 2.5 7 5.5 7z M43.5 24c3 0 5.5-3.1 5.5-7s-2.5-7-5.5-7-5.5 3.1-5.5 7 2.5 7 5.5 7z M11 35c2.5 0 4.5-2.7 4.5-6s-2-6-4.5-6S6.5 25.7 6.5 29s2 6 4.5 6z M53 35c2.5 0 4.5-2.7 4.5-6s-2-6-4.5-6-4.5 2.7-4.5 6 2 6 4.5 6z" />
  </svg>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Puppies', path: '/puppies' },
    { name: 'Happy families', path: '/happy-families' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Visit & contact', path: '/contact' }
  ];

  return (
    <header className={`tp-header fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#fffdf8]/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
    }`}>
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/brand/logo.png" 
              alt="TeddyPups U.A.E." 
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <span className="font-plush text-2xl font-bold tracking-tight text-[#2a170e]">
              TeddyPups
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8 bg-white/70 backdrop-blur-md px-6 py-2.5 rounded-full border border-[#2a170e]/10 shadow-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`tp-nav-link text-[0.95rem] font-medium transition-colors relative py-1 ${
                    isActive ? 'text-[#c2622b] font-semibold active' : 'text-[#2a170e] hover:text-[#c2622b]'
                  }`}
                >
                  <PawIcon className="tp-nav-link__paw w-3.5 h-3.5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* WhatsApp CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp us</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full border-2 border-[#2a170e] text-[#2a170e] bg-white/80 hover:bg-[#fbe3b4] transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[var(--header-h)] bg-[#fffdf8] border-b-2 border-[#2a170e] shadow-xl p-6 transition-all duration-300">
          <p className="font-scrawl text-sm text-[#8e3f15] mb-4">where to, friend?</p>
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-medium px-4 py-2.5 rounded-xl flex items-center justify-between ${
                    isActive 
                      ? 'bg-[#fbe3b4] text-[#8e3f15] font-bold' 
                      : 'text-[#2a170e] hover:bg-[#fff8ea]'
                  }`}
                >
                  <span>{link.name}</span>
                  <PawIcon className="w-4 h-4 text-[#c2622b] opacity-70" />
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-[#2a170e]/15 flex flex-col gap-3">
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full py-3 rounded-full text-center flex items-center justify-center gap-2 font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp us</span>
            </a>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="text-center font-scrawl text-[#5a3a28] text-sm flex items-center justify-center gap-1.5 py-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#c2622b]" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
