import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Sparkles } from 'lucide-react';
import { HAPPY_FAMILIES_DATA, SITE_CONFIG } from '../data/siteData';

export default function HappyFamilies() {
  return (
    <main className="relative pt-[var(--header-h)] pb-24 outline-none bg-[#fffdf8] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#fff8ea] border-b-2 border-[#2a170e] py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="font-scrawl text-base text-[#8e3f15] font-semibold flex items-center justify-center gap-1.5">
            <Heart className="w-4 h-4 fill-current text-[#c2622b]" />
            <span>our wall of happy endings</span>
          </p>
          <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-[#2a170e] mt-1 mb-4">
            Happy families
          </h1>
          <p className="text-base sm:text-lg text-[#5a3a28] max-w-2xl mx-auto leading-relaxed">
            Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
          </p>
        </div>
      </section>

      {/* Grid of Family Memories */}
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {HAPPY_FAMILIES_DATA.map((item, idx) => (
            <div
              key={item.id}
              className="group bg-white border-3 border-[#2a170e] rounded-3xl p-4 shadow-[6px_8px_0px_#2a170e] transition-all duration-300 hover:-translate-y-1.5"
              style={{
                transform: `rotate(${idx % 2 === 0 ? '-1deg' : '1.2deg'})`
              }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#fff8ea] border border-[#2a170e]/20 mb-4">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-[#2a170e]/20 flex items-center justify-center shadow-sm">
                  <Heart className="w-4 h-4 text-[#c2622b] fill-current" />
                </div>
              </div>

              <div className="px-1">
                <p className="font-plush font-bold text-lg text-[#2a170e] leading-snug">
                  {item.caption}
                </p>
                <p className="font-scrawl text-xs text-[#8e3f15] mt-1.5 flex items-center gap-1">
                  <span>🐾</span>
                  <span>{item.family}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 bg-[#fff8ea] border-3 border-[#2a170e] rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-[6px_8px_0px_#2a170e]">
          <h2 className="font-plush text-2xl sm:text-4xl font-extrabold text-[#2a170e] mb-3">
            Ready to welcome your own teddy puppy?
          </h2>
          <p className="text-sm sm:text-base text-[#5a3a28] max-w-xl mx-auto mb-6">
            Join hundreds of delighted families across Dubai and the world. Browse available pups today or let us source your dream breed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/puppies"
              className="btn btn-primary px-8 py-3 rounded-full font-bold text-sm shadow-[0_4px_0px_#2a170e]"
            >
              See available puppies
            </Link>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp px-8 py-3 rounded-full font-bold text-sm shadow-[0_4px_0px_#2a170e] flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat with us</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
