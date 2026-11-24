import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useScrollReveal
 * Watches elements with [data-reveal], .tp-sketch, .tp-note, .tp-tag, 
 * .tp-ticket, .tp-wall__item, .tp-lineup__seat, etc.
 * Arms them with data-armed="true" and marks data-revealed="true" when scrolled into view.
 * This triggers the native CSS animations from original.css.
 */
export default function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // If user prefers reduced motion, reveal everything immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const selectors = [
      '[data-reveal]',
      '.tp-sketch',
      '.tp-note',
      '.tp-tag',
      '.tp-ticket',
      '.tp-wall__item',
      '.tp-photowall li',
      '.tp-lineup__seat',
      '.tp-sketchbook__title'
    ].join(',');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    const elements = document.querySelectorAll(selectors);
    elements.forEach((el) => {
      if (prefersReducedMotion) {
        el.setAttribute('data-armed', 'true');
        el.setAttribute('data-revealed', 'true');
      } else {
        if (!el.hasAttribute('data-revealed')) {
          el.setAttribute('data-armed', 'true');
          observer.observe(el);
        }
      }
    });

    // Also run a small timeout to catch dynamically rendered elements
    const timer = setTimeout(() => {
      const laterElements = document.querySelectorAll(selectors);
      laterElements.forEach((el) => {
        if (!el.hasAttribute('data-revealed')) {
          el.setAttribute('data-armed', 'true');
          observer.observe(el);
        }
      });
    }, 150);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [location.pathname, location.search]);
}
