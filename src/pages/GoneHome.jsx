import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PupBuddy from '../components/PupBuddy';
import ticketsData from '../data/goneHomeTicketsData.json';

function TicketCard({ ticket, index }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <li
      className="tp-ticket"
      data-reveal="true"
      style={{
        '--tilt': ticket.tilt,
        '--i': index
      }}
    >
      <Link className="tp-ticket__link" to={ticket.href}>
        <span className="tp-ticket__main">
          <span
            className="tp-ticket__photo"
            style={{
              backgroundColor: ticket.bgColor || '#f8e8e8'
            }}
          >
            <img
              alt={ticket.alt || `${ticket.name}, ${ticket.meta}`}
              loading="lazy"
              decoding="async"
              src={ticket.img}
              onLoad={() => setLoaded(true)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/puppies/copper-1.webp';
              }}
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                objectFit: 'cover',
                objectPosition: ticket.objectPosition || '50% 50%',
                transition: 'opacity 0.4s ease',
                opacity: loaded ? 1 : 0
              }}
            />
          </span>

          <span className="tp-ticket__body">
            <span className="font-scrawl tp-ticket__kicker">{ticket.kicker}</span>
            <span className="font-plush tp-ticket__name">{ticket.name}</span>
            <span className="tp-ticket__meta">{ticket.meta}</span>
            <span className="tp-ticket__route">
              <span>{ticket.from || 'TeddyPups'}</span>
              <svg viewBox="0 0 60 12" aria-hidden="true">
                <path d="M2 6h46" />
                <path d="M44 2l6 4-6 4" />
              </svg>
              <span>{ticket.to || 'home ♥'}</span>
            </span>
          </span>
        </span>

        <span aria-hidden="true" className="tp-ticket__stub">
          <span className="font-plush">admit one</span>
        </span>
      </Link>
    </li>
  );
}

export default function GoneHome() {
  return (
    <main id="main" tabIndex="-1" className="relative pt-[var(--header-h)] outline-none">
      <div data-page="gone" className="tp-page">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <header className="tp-boothhead">
            <div className="max-w-3xl">
              <h1 className="font-plush text-giant">
                Gone home
                <svg
                  viewBox="0 0 48 44"
                  className="ml-3 inline-block w-[0.45em] -translate-y-[0.15em] text-toffee"
                  aria-hidden="true"
                >
                  <path
                    d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h1>
              <p className="text-lede mt-6 text-cocoa-soft">
                Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match.
              </p>
              <Link className="btn btn-primary mt-8" to="/puppies">
                See available puppies
              </Link>
            </div>

            <div aria-hidden="true" className="tp-booth">
              <PupBuddy facing="right" pose="peek" className="tp-booth__teddy" />
              <div className="tp-booth__counter">
                <span className="font-plush">tickets home</span>
              </div>
            </div>
          </header>

          <div>
            <ul className="tp-tickets" aria-label="Puppies who have gone home">
              {ticketsData.map((ticket, index) => (
                <TicketCard key={ticket.id || index} ticket={ticket} index={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
