import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle, HelpCircle } from 'lucide-react';
import { FAQ_DATA, SITE_CONFIG } from '../data/siteData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_DATA.filter((faq) =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="relative pt-[var(--header-h)] pb-24 outline-none bg-[#fffdf8] min-h-screen">
      {/* Top Banner */}
      <section className="bg-[#fff8ea] border-b-2 border-[#2a170e] py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="font-scrawl text-base text-[#8e3f15] font-semibold flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#c2622b]" />
            <span>everything you need to know</span>
          </p>
          <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-[#2a170e] mt-1 mb-4">
            Questions & answers
          </h1>
          <p className="text-base sm:text-lg text-[#5a3a28] max-w-2xl mx-auto leading-relaxed">
            Have questions about health checks, showroom visits, or importing your dream puppy? Find clear answers below.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-12">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#5a3a28]/60" />
          <input
            type="text"
            placeholder="Type a question (e.g. vaccinations, delivery, showroom)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-[#2a170e] bg-white text-sm text-[#2a170e] placeholder:text-[#5a3a28]/50 focus:outline-none focus:ring-2 focus:ring-[#c2622b] shadow-[4px_5px_0px_#2a170e]"
          />
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white border-2 border-[#2a170e] rounded-2xl overflow-hidden shadow-[4px_6px_0px_#2a170e] transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-plush font-bold text-lg text-[#2a170e] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#c2622b] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-[#5a3a28] leading-relaxed border-t border-[#2a170e]/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-[#fff8ea] border-2 border-dashed border-[#2a170e]/30 rounded-2xl p-8 text-center">
              <p className="font-plush font-bold text-lg text-[#2a170e]">No answers matched your search</p>
              <p className="text-xs text-[#5a3a28] mt-1 mb-4">Feel free to message our team directly on WhatsApp!</p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn btn-primary px-6 py-2 rounded-full text-xs font-semibold"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-14 bg-[#fff8ea] border-2 border-[#2a170e] rounded-3xl p-6 sm:p-8 text-center shadow-[5px_7px_0px_#2a170e]">
          <h3 className="font-plush text-xl font-bold text-[#2a170e] mb-1">
            Still have questions?
          </h3>
          <p className="text-sm text-[#5a3a28] mb-4">
            Our puppy concierge is happy to guide you 24/7 on WhatsApp.
          </p>
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp px-6 py-2.5 rounded-full font-bold text-sm inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </main>
  );
}
