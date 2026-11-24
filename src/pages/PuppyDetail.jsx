import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck, Heart, ArrowLeft, Play, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { PUPPIES_DATA } from '../data/puppiesData';
import { SITE_CONFIG } from '../data/siteData';
import VideoModal from '../components/VideoModal';
import Toast from '../components/Toast';
import PupBuddy from '../components/PupBuddy';

export default function PuppyDetail() {
  const { slug } = useParams();
  const puppy = PUPPIES_DATA.find((p) => p.slug === slug) || PUPPIES_DATA[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: `Hi TeddyPups, I'm very interested in meeting ${puppy.name} (${puppy.breed})!`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Gallery array
  const gallery = puppy.gallery && puppy.gallery.length > 0 ? puppy.gallery : [puppy.primaryImage];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage(`Your letter about ${puppy.name} has been posted! Our team will reach out shortly.`);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setToastMessage(''), 5000);
    }, 600);
  };

  const whatsappInquiryUrl = `https://wa.me/919898124987?text=Hi%20TeddyPups%20UAE%2C%20I'm%20interested%20in%20${encodeURIComponent(puppy.name)}%20(${encodeURIComponent(puppy.breed)})!%20Could%20you%20share%20more%20details%3F`;

  return (
    <main className="relative pt-[var(--header-h)] pb-24 outline-none bg-[#fffdf8] min-h-screen">
      {/* Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      {/* Top Breadcrumb */}
      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <Link 
          to="/puppies" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#8e3f15] hover:text-[#c2622b] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all available puppies</span>
        </Link>
      </div>

      {/* STORYBOOK HERO ARTICLE */}
      <article className="tp-storybook mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT: GALLERY & VIDEO */}
          <div className="lg:col-span-6">
            <div className="sticky top-24">
              {/* Main Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden border-3 border-[#2a170e] bg-white shadow-[6px_9px_0px_#2a170e]">
                <div className="aspect-square bg-[#fff8ea]">
                  <img
                    src={gallery[activeImageIndex] || puppy.primaryImage}
                    alt={`${puppy.name} preview`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {puppy.hasVideo && (
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs bg-[#2a170e] text-[#fffdf8] shadow-md hover:bg-[#c2622b] transition-all hover:scale-105 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Video</span>
                  </button>
                )}
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx 
                          ? 'border-[#c2622b] scale-105 shadow-md' 
                          : 'border-[#2a170e]/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: STORYBOOK CHAPTER & SPECIFICATIONS */}
          <div className="lg:col-span-6 flex flex-col">
            
            <div className="border-b-2 border-[#2a170e]/15 pb-6">
              <span className="font-scrawl text-sm text-[#8e3f15] uppercase tracking-wider">
                1 · hello, it's me
              </span>
              <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-[#2a170e] mt-1">
                {puppy.name}
              </h1>
              <p className="font-semibold text-lg sm:text-xl text-[#c2622b] mt-1">
                {puppy.breed}
              </p>
              {puppy.price && (
                <p className="font-plush text-2xl font-bold text-[#2a170e] mt-2">
                  {puppy.price}
                </p>
              )}
            </div>

            {/* Specifications DL Grid */}
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 bg-white border-2 border-[#2a170e] rounded-2xl p-5 shadow-[4px_6px_0px_#2a170e]">
              <div>
                <dt className="font-scrawl text-xs text-[#8e3f15]">Breed</dt>
                <dd className="font-semibold text-sm text-[#2a170e]">{puppy.breed}</dd>
              </div>
              <div>
                <dt className="font-scrawl text-xs text-[#8e3f15]">Gender</dt>
                <dd className="font-semibold text-sm text-[#2a170e] capitalize">{puppy.gender}</dd>
              </div>
              <div>
                <dt className="font-scrawl text-xs text-[#8e3f15]">Age</dt>
                <dd className="font-semibold text-sm text-[#2a170e]">{puppy.age}</dd>
              </div>
              <div>
                <dt className="font-scrawl text-xs text-[#8e3f15]">Status</dt>
                <dd className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[#1f7a4d] text-white">
                  {puppy.status}
                </dd>
              </div>
              <div>
                <dt className="font-scrawl text-xs text-[#8e3f15]">Color</dt>
                <dd className="font-semibold text-sm text-[#2a170e]">{puppy.color}</dd>
              </div>
              <div>
                <dt className="font-scrawl text-xs text-[#8e3f15]">Estimated Adult</dt>
                <dd className="font-semibold text-sm text-[#2a170e]">{puppy.weight}</dd>
              </div>
              <div className="col-span-2 pt-2 border-t border-[#2a170e]/10">
                <dt className="font-scrawl text-xs text-[#8e3f15]">Origin & Availability</dt>
                <dd className="font-semibold text-sm text-[#2a170e]">{puppy.origin}</dd>
              </div>
            </dl>

            {/* Direct Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp py-3.5 px-6 rounded-full font-bold text-center flex items-center justify-center gap-2 text-sm shadow-[0_6px_0px_#2a170e]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Ask about {puppy.name} on WhatsApp</span>
              </a>

              <Link
                to="/contact"
                className="btn btn-primary py-3.5 px-6 rounded-full font-bold text-center flex items-center justify-center gap-2 text-sm shadow-[0_6px_0px_#2a170e]"
              >
                <span>Book showroom visit</span>
              </Link>
            </div>

            {/* CHAPTER 1 STORY PAPER */}
            <div className="tp-paper mt-8 -rotate-1 bg-[#fff8ea] border-2 border-[#2a170e] rounded-2xl p-6 shadow-[5px_7px_0px_#2a170e]">
              <div className="flex items-center gap-2 mb-2 font-scrawl text-xs text-[#8e3f15] font-bold">
                <Heart className="w-3.5 h-3.5 fill-current text-[#c2622b]" />
                <span>Chapter 1: The Puppy Story</span>
              </div>
              <p className="text-sm sm:text-base text-[#2a170e] leading-relaxed">
                {puppy.story}
              </p>
              <p className="mt-3 text-xs sm:text-sm font-semibold text-[#8e3f15]">
                Personality: <span className="font-normal text-[#5a3a28]">{puppy.personality}</span>
              </p>
            </div>

            {/* OFFICIAL PUPPY PASSPORT / SWINGING BRASS TAG */}
            <div 
              className="tp-tag tp-board mt-12 !rounded-[2.2rem_2.2rem_2.2rem_0.6rem] !p-7 md:!p-8 relative bg-white border-2 border-[#2a170e] shadow-[4px_6px_0px_#2a170e]" 
              data-reveal="true"
            >
              <span aria-hidden="true" className="tp-tag__ring" />
              
              <div className="absolute -top-[4.2rem] right-4 w-28 hidden sm:block pointer-events-none">
                <PupBuddy facing="right" />
              </div>

              <div className="flex items-center gap-2 font-plush font-bold text-lg text-[#2a170e] mb-4">
                <ShieldCheck className="w-5 h-5 text-[#c2622b]" />
                <span>TeddyPups Official Passport & Care</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#5a3a28]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1f7a4d] shrink-0" />
                  <span>{puppy.passport?.vaccinated || 'Vaccinated with official passport and microchip'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1f7a4d] shrink-0" />
                  <span>{puppy.passport?.healthCheck || 'Licensed veterinarian health certified'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1f7a4d] shrink-0" />
                  <span>{puppy.passport?.dewormed || 'Complete anti-parasite and deworming course'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1f7a4d] shrink-0" />
                  <span>{puppy.passport?.guarantee || 'Comprehensive health and pedigree guarantee'}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ENQUIRE LETTER FORM SECTION */}
        <section className="tp-letter mt-20 border-3 border-[#2a170e] bg-white rounded-3xl p-6 sm:p-10 shadow-[8px_12px_0px_#2a170e]">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="font-scrawl text-sm text-[#8e3f15]">send an inquiry</span>
              <h2 className="font-plush text-3xl font-extrabold text-[#2a170e] mt-1">
                Enquire about {puppy.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#5a3a28] mt-1">
                Fill out the note below and our concierge team will reply immediately on WhatsApp or email.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-scrawl text-xs text-[#8e3f15] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Al-Saleh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2a170e]/30 bg-[#fffdf8] text-sm focus:outline-none focus:ring-2 focus:ring-[#c2622b]"
                  />
                </div>
                <div>
                  <label className="block font-scrawl text-xs text-[#8e3f15] mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#2a170e]/30 bg-[#fffdf8] text-sm focus:outline-none focus:ring-2 focus:ring-[#c2622b]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-scrawl text-xs text-[#8e3f15] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="maya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2a170e]/30 bg-[#fffdf8] text-sm focus:outline-none focus:ring-2 focus:ring-[#c2622b]"
                />
              </div>

              <div>
                <label className="block font-scrawl text-xs text-[#8e3f15] mb-1">Personal Note</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#2a170e]/30 bg-[#fffdf8] text-sm focus:outline-none focus:ring-2 focus:ring-[#c2622b]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full py-3.5 rounded-full font-bold text-center flex items-center justify-center gap-2 cursor-pointer shadow-[0_6px_0px_#2a170e]"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Posting your letter...' : `Post my letter about ${puppy.name}`}</span>
              </button>
            </form>
          </div>
        </section>
      </article>

      {/* Video Modal */}
      {showVideoModal && (
        <VideoModal
          puppy={puppy}
          onClose={() => setShowVideoModal(false)}
        />
      )}
    </main>
  );
}
