import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MessageCircle, Plane, Clock, Award, CheckCircle2, Heart, Sparkles, MapPin } from 'lucide-react';
import { HOW_IT_WORKS_DATA, SITE_CONFIG } from '../data/siteData';

export default function HowItWorks() {
  const { title, subtitle, kicker, twoWays, deliveryMethods, promises } = HOW_IT_WORKS_DATA;

  return (
    <main className="relative pt-[var(--header-h)] pb-24 outline-none bg-[#fffdf8] min-h-screen">
      {/* Top Banner */}
      <section className="bg-[#fff8ea] border-b-2 border-[#2a170e] py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          <span className="font-scrawl text-base text-[#8e3f15] font-semibold">
            {kicker}
          </span>
          <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-[#2a170e] mt-1 mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-[#5a3a28] max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      {/* TWO WAYS HOME */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[110rem]">
          <div className="text-center mb-16">
            <span className="font-scrawl text-sm text-[#8e3f15]">transparent & simple</span>
            <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-[#2a170e]">
              Two ways home
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {twoWays.map((way, idx) => (
              <div 
                key={idx}
                className="bg-white border-3 border-[#2a170e] rounded-3xl p-8 sm:p-10 shadow-[8px_10px_0px_#2a170e] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-scrawl text-xs font-bold px-3 py-1 rounded-full bg-[#fbe3b4] text-[#8e3f15]">
                      {way.tagline}
                    </span>
                    <span className="font-plush font-extrabold text-2xl text-[#c2622b]">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-plush text-2xl sm:text-3xl font-bold text-[#2a170e] mb-4">
                    {way.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#5a3a28] leading-relaxed mb-8">
                    {way.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    {way.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-3 text-sm text-[#2a170e]">
                        <span className="w-6 h-6 rounded-full bg-[#fbe3b4] border border-[#2a170e] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#2a170e]/15">
                  {idx === 0 ? (
                    <Link
                      to="/contact"
                      className="btn btn-primary w-full py-3.5 rounded-full font-bold text-center block text-sm"
                    >
                      Book a showroom appointment
                    </Link>
                  ) : (
                    <a
                      href={SITE_CONFIG.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp w-full py-3.5 rounded-full font-bold text-center block text-sm"
                    >
                      Chat with import concierge
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PREMIUM PUPPY PROMISE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#fff8ea] border-y-2 border-[#2a170e]">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-scrawl text-sm text-[#8e3f15] font-semibold">
            puppy passport
          </span>
          <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-[#2a170e] mt-1 mb-10">
            Our premium puppy promise
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {promises.map((p, idx) => (
              <div key={idx} className="bg-white border-2 border-[#2a170e] rounded-2xl p-6 shadow-[4px_6px_0px_#2a170e]">
                <div className="w-10 h-10 rounded-xl bg-[#fbe3b4] border border-[#2a170e] flex items-center justify-center mb-3 text-[#c2622b]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-plush text-lg font-bold text-[#2a170e] mb-1">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5a3a28] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY & COLLECTION */}
      <section id="delivery" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[110rem]">
          <div className="text-center mb-16">
            <span className="font-scrawl text-sm text-[#8e3f15]">safe travel guaranteed</span>
            <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-[#2a170e]">
              Delivery & collection
            </h2>
            <p className="text-sm sm:text-base text-[#5a3a28] mt-2 max-w-xl mx-auto">
              From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryMethods.map((dm, idx) => (
              <div key={idx} className="bg-[#fffdf8] border-2 border-[#2a170e] rounded-2xl p-6 shadow-[4px_6px_0px_#2a170e] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#bfddf5] border border-[#2a170e] flex items-center justify-center mb-4 text-[#2f6e9e]">
                    <Plane className="w-6 h-6" />
                  </div>
                  <h3 className="font-plush text-xl font-bold text-[#2a170e] mb-2">
                    {dm.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5a3a28] leading-relaxed">
                    {dm.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
