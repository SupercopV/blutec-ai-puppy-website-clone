import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Sparkles, ShieldCheck, Heart, Plane, CheckCircle2, ChevronRight, ChevronDown, Award, Clock } from 'lucide-react';
import PuppyCard from '../components/PuppyCard';
import VideoModal from '../components/VideoModal';
import { PUPPIES_DATA, BREEDS_LIST } from '../data/puppiesData';
import { SITE_CONFIG, FAQ_DATA, HAPPY_FAMILIES_DATA } from '../data/siteData';

export default function Home() {
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [activeVideoPuppy, setActiveVideoPuppy] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Filtered puppies for "Meet the pups" section
  const filteredPuppies = selectedBreed === 'All'
    ? PUPPIES_DATA.slice(0, 8)
    : PUPPIES_DATA.filter(p => p.breed.toLowerCase() === selectedBreed.toLowerCase());

  return (
    <main className="relative pt-[var(--header-h)] outline-none overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="tp-scene tp-hero relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 pt-12 pb-20 overflow-hidden bg-gradient-to-b from-[#fff8ea] via-[#fffdf8] to-[#fff8ea]">
        {/* Sunrise Ambient Glow */}
        <div className="tp-hero__sun absolute pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fbe3b4] border border-[#c2622b]/30 text-[#8e3f15] font-scrawl text-sm sm:text-base mb-6 shadow-sm">
            <Heart className="w-4 h-4 fill-current text-[#c2622b]" />
            <span>every puppy is family</span>
          </div>

          {/* Heading */}
          <h1 className="font-plush text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#2a170e] leading-[1.08] max-w-3xl">
            Premium teacup <br className="hidden sm:inline" />
            <span className="text-[#c2622b]">puppies</span> in Dubai
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-[#5a3a28] max-w-2xl leading-relaxed">
            Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/puppies"
              className="btn btn-primary px-8 py-3.5 rounded-full font-bold text-base shadow-[0_8px_0px_#2a170e] hover:-translate-y-1 transition-transform flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Meet available pups</span>
            </Link>

            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp px-8 py-3.5 rounded-full font-bold text-base shadow-[0_8px_0px_#2a170e] hover:-translate-y-1 transition-transform flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp us</span>
            </a>
          </div>

          {/* Cute Trust Note */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-[#5a3a28]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#c2622b]" />
              Vaccinated & Vet-Certified
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#c2622b]" />
              Same-Day Dubai Handover
            </span>
            <span className="flex items-center gap-1.5">
              <Plane className="w-4 h-4 text-[#c2622b]" />
              Worldwide Climate-Controlled Travel
            </span>
          </div>

          {/* Hero Featured Puppy Cards Peek */}
          <div className="mt-12 w-full max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-4 px-2">
            {PUPPIES_DATA.slice(0, 4).map((p, idx) => (
              <div key={p.id} className="transform hover:scale-105 transition-transform">
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#2a170e] bg-white shadow-[4px_6px_0px_#2a170e] p-2">
                  <div className="aspect-square rounded-xl overflow-hidden bg-[#fff8ea]">
                    <img src={p.primaryImage} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="pt-2 text-left">
                    <p className="font-plush font-bold text-sm text-[#2a170e]">{p.name}</p>
                    <p className="text-[11px] text-[#5a3a28]">{p.breed} · {p.gender}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* SECTION 2: MEET THE PUPS */}
      <section className="tp-scene tp-meet py-20 px-4 sm:px-6 lg:px-8 bg-[#fffdf8] border-t-2 border-[#2a170e]">
        <div className="mx-auto max-w-[110rem]">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#2a170e]/15">
            <div>
              <p className="font-scrawl text-lg text-[#8e3f15] mb-1">
                our current litter
              </p>
              <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-[#2a170e]">
                Meet the pups
              </h2>
              <p className="mt-2 text-[#5a3a28] text-base max-w-xl">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {BREEDS_LIST.map((breed) => (
                <button
                  key={breed}
                  onClick={() => setSelectedBreed(breed)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    selectedBreed === breed
                      ? 'bg-[#c2622b] text-white shadow-sm'
                      : 'bg-[#fff8ea] text-[#2a170e] border border-[#2a170e]/20 hover:bg-[#fbe3b4]'
                  }`}
                >
                  {breed}
                </button>
              ))}
            </div>
          </div>

          {/* Puppies Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredPuppies.map((puppy) => (
              <PuppyCard
                key={puppy.id}
                puppy={puppy}
                onOpenVideo={(p) => setActiveVideoPuppy(p)}
              />
            ))}
          </div>

          {/* Bottom View All Link */}
          <div className="mt-16 text-center">
            <Link
              to="/puppies"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-base border-2 border-[#2a170e] bg-[#fff8ea] text-[#2a170e] shadow-[4px_6px_0px_#2a170e] hover:-translate-y-1 transition-transform"
            >
              <span>Explore all 15 available puppies</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* SECTION 3: TWO WAYS TO MEET YOUR PUPPY */}
      <section className="tp-scene tp-paths py-20 px-4 sm:px-6 lg:px-8 bg-[#fff8ea] border-t-2 border-[#2a170e]">
        <div className="mx-auto max-w-[110rem]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-scrawl text-lg text-[#8e3f15]">choose your experience</p>
            <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-[#2a170e] mt-1">
              Two ways to meet your puppy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Card 1: Dubai Showroom */}
            <div className="relative bg-[#fffdf8] border-3 border-[#2a170e] rounded-3xl p-8 shadow-[8px_10px_0px_#2a170e] flex flex-col justify-between">
              <div>
                <span className="font-scrawl text-sm text-[#8e3f15] uppercase tracking-wider">
                  Option 1
                </span>
                <h3 className="font-plush text-2xl sm:text-3xl font-bold text-[#2a170e] mt-2 mb-4">
                  Puppies in Dubai
                </h3>
                <p className="text-[#5a3a28] text-base leading-relaxed mb-6">
                  See them, love them, take them home. Come meet our locally available puppies before you decide.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-sm text-[#2a170e]">
                    <CheckCircle2 className="w-5 h-5 text-[#c2622b] shrink-0 mt-0.5" />
                    <span>Private bonding session in our comfortable Downtown Dubai lounge</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#2a170e]">
                    <CheckCircle2 className="w-5 h-5 text-[#c2622b] shrink-0 mt-0.5" />
                    <span>Same-day handover with verified health records</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#2a170e]">
                    <CheckCircle2 className="w-5 h-5 text-[#c2622b] shrink-0 mt-0.5" />
                    <span>Doorstep delivery available across all Emirates</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/contact"
                className="btn btn-primary w-full py-3.5 rounded-full font-bold text-center block"
              >
                Book a showroom visit
              </Link>
            </div>

            {/* Card 2: Imported for You */}
            <div className="relative bg-[#fffdf8] border-3 border-[#2a170e] rounded-3xl p-8 shadow-[8px_10px_0px_#2a170e] flex flex-col justify-between">
              <div>
                <span className="font-scrawl text-sm text-[#8e3f15] uppercase tracking-wider">
                  Option 2
                </span>
                <h3 className="font-plush text-2xl sm:text-3xl font-bold text-[#2a170e] mt-2 mb-4">
                  Imported for you
                </h3>
                <p className="text-[#5a3a28] text-base leading-relaxed mb-6">
                  Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-sm text-[#2a170e]">
                    <CheckCircle2 className="w-5 h-5 text-[#c2622b] shrink-0 mt-0.5" />
                    <span>Direct access to Seoul's elite teacup Maltese, Poodle & Pom lines</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#2a170e]">
                    <CheckCircle2 className="w-5 h-5 text-[#c2622b] shrink-0 mt-0.5" />
                    <span>Full concierge import handling: health checks, flights, customs clearance</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#2a170e]">
                    <CheckCircle2 className="w-5 h-5 text-[#c2622b] shrink-0 mt-0.5" />
                    <span>Pre-flight video calls and health guarantee documentation</span>
                  </li>
                </ul>
              </div>

              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full py-3.5 rounded-full font-bold text-center block"
              >
                Enquire about custom imports
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 4: YOUR PUPPY JOURNEY */}
      <section className="tp-scene tp-chat py-20 px-4 sm:px-6 lg:px-8 bg-[#fffdf8] border-t-2 border-[#2a170e]">
        <div className="mx-auto max-w-[110rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Steps text */}
            <div className="lg:col-span-6">
              <p className="font-scrawl text-lg text-[#8e3f15]">seamless concierge service</p>
              <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-[#2a170e] mt-1 mb-6">
                Your puppy journey
              </h2>
              <p className="text-[#5a3a28] text-base sm:text-lg mb-8 leading-relaxed">
                A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#fbe3b4] border-2 border-[#2a170e] font-plush font-bold text-lg flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-plush text-xl font-bold text-[#2a170e]">
                      Choose your breed
                    </h3>
                    <p className="text-sm text-[#5a3a28] mt-1">
                      Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#fbe3b4] border-2 border-[#2a170e] font-plush font-bold text-lg flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-plush text-xl font-bold text-[#2a170e]">
                      Get photos & details
                    </h3>
                    <p className="text-sm text-[#5a3a28] mt-1">
                      Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#fbe3b4] border-2 border-[#2a170e] font-plush font-bold text-lg flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-plush text-xl font-bold text-[#2a170e]">
                      Secure & safe delivery
                    </h3>
                    <p className="text-sm text-[#5a3a28] mt-1">
                      Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive WhatsApp concierge preview card */}
            <div className="lg:col-span-6">
              <div className="max-w-md mx-auto bg-[#e5ddd5] rounded-3xl border-3 border-[#2a170e] shadow-[8px_12px_0px_#2a170e] overflow-hidden">
                {/* Chat Header */}
                <div className="bg-[#075e54] text-white px-5 py-4 flex items-center gap-3">
                  <img src="/brand/logo.png" alt="TeddyPups" className="w-10 h-10 rounded-full bg-white p-1" />
                  <div>
                    <p className="font-bold text-sm">TeddyPups Concierge</p>
                    <p className="text-[11px] text-[#25d366] font-medium">● Online | Downtown Dubai</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-3 font-sans text-xs sm:text-sm">
                  <div className="bg-white text-[#2a170e] p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                    Hello! Welcome to TeddyPups UAE 🐾 Are you looking for a puppy in our Dubai showroom, or an imported teacup breed?
                  </div>
                  <div className="bg-[#dcf8c6] text-[#2a170e] p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] ml-auto text-right">
                    Hi! I'd love to know more about your teacup Maltipoo and Cavapoo puppies!
                  </div>
                  <div className="bg-white text-[#2a170e] p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%]">
                    Wonderful choice! Here are live photos and video clips of Max (3 months) and our Korean teacup Maltipoo girl:
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <img src="/puppies/asset_556841b9.jpg" alt="Preview" className="rounded-lg object-cover h-20 w-full" />
                      <img src="/puppies/asset_50f0ae67.jpg" alt="Preview" className="rounded-lg object-cover h-20 w-full" />
                    </div>
                  </div>
                </div>

                {/* Chat CTA Footer */}
                <div className="p-3 bg-white border-t border-[#2a170e]/10">
                  <a
                    href={SITE_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp w-full py-2.5 rounded-full text-center flex items-center justify-center gap-2 font-semibold text-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat Now</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* SECTION 5: WHY FAMILIES TRUST TEDDYPUPS */}
      <section className="tp-scene tp-passport py-20 px-4 sm:px-6 lg:px-8 bg-[#fff8ea] border-t-2 border-[#2a170e]">
        <div className="mx-auto max-w-[110rem]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#fbe3b4] text-[#8e3f15] font-scrawl text-sm font-semibold mb-2">
              puppy passport
            </span>
            <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-[#2a170e]">
              Why families trust TeddyPups
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#fffdf8] border-2 border-[#2a170e] rounded-2xl p-6 shadow-[4px_6px_0px_#2a170e]">
              <div className="w-12 h-12 rounded-xl bg-[#fbe3b4] border border-[#2a170e] flex items-center justify-center mb-4 text-[#c2622b]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-plush text-xl font-bold text-[#2a170e] mb-2">
                Health Guarantee
              </h3>
              <p className="text-sm text-[#5a3a28] leading-relaxed">
                Every puppy comes vaccinated, dewormed, and with a verified health certificate from licensed vets.
              </p>
            </div>

            <div className="bg-[#fffdf8] border-2 border-[#2a170e] rounded-2xl p-6 shadow-[4px_6px_0px_#2a170e]">
              <div className="w-12 h-12 rounded-xl bg-[#f9cdbf] border border-[#2a170e] flex items-center justify-center mb-4 text-[#a24a1a]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-plush text-xl font-bold text-[#2a170e] mb-2">
                Ethical Breeders
              </h3>
              <p className="text-sm text-[#5a3a28] leading-relaxed">
                Trusted breeders, safe travel, and premium care from start to finish. We visit and vet our partners.
              </p>
            </div>

            <div className="bg-[#fffdf8] border-2 border-[#2a170e] rounded-2xl p-6 shadow-[4px_6px_0px_#2a170e]">
              <div className="w-12 h-12 rounded-xl bg-[#bfddf5] border border-[#2a170e] flex items-center justify-center mb-4 text-[#2f6e9e]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-plush text-xl font-bold text-[#2a170e] mb-2">
                24/7 Concierge
              </h3>
              <p className="text-sm text-[#5a3a28] leading-relaxed">
                Always here to help, from choosing your puppy to post-delivery nutrition, training and acclimation support.
              </p>
            </div>

            <div className="bg-[#fffdf8] border-2 border-[#2a170e] rounded-2xl p-6 shadow-[4px_6px_0px_#2a170e]">
              <div className="w-12 h-12 rounded-xl bg-[#fbe3b4] border border-[#2a170e] flex items-center justify-center mb-4 text-[#8e3f15]">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="font-plush text-xl font-bold text-[#2a170e] mb-2">
                Worldwide Delivery
              </h3>
              <p className="text-sm text-[#5a3a28] leading-relaxed">
                Puppies delivered to loving homes across the UAE and all around the world with flight nannies and certified cargo.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 6: HAPPY FAMILIES */}
      <section className="tp-scene tp-dusk py-20 px-4 sm:px-6 lg:px-8 bg-[#fffdf8] border-t-2 border-[#2a170e]">
        <div className="mx-auto max-w-[110rem]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-scrawl text-lg text-[#8e3f15]">wall of joy</p>
              <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-[#2a170e]">
                Happy families & puppies
              </h2>
              <p className="mt-2 text-[#5a3a28] text-base max-w-xl">
                We are truly honored to see our puppies become cherished members of loving families.
              </p>
            </div>

            <Link
              to="/happy-families"
              className="font-bold text-[#c2622b] hover:underline flex items-center gap-1.5"
            >
              <span>View all happy families</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Testimonial Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HAPPY_FAMILIES_DATA.slice(0, 4).map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white border-2 border-[#2a170e] rounded-2xl p-4 shadow-[5px_7px_0px_#2a170e] transform hover:-translate-y-1 transition-transform"
                style={{ transform: `rotate(${index % 2 === 0 ? '-1deg' : '1.5deg'})` }}
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-[#fff8ea] border border-[#2a170e]/20 mb-3">
                  <img src={item.image} alt={item.caption} className="w-full h-full object-cover" />
                </div>
                <p className="font-plush font-bold text-base text-[#2a170e] mb-1">
                  {item.caption}
                </p>
                <p className="font-scrawl text-xs text-[#8e3f15]">
                  {item.family}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 7: QUESTIONS, ANSWERED */}
      <section className="tp-scene tp-night py-20 px-4 sm:px-6 lg:px-8 bg-[#fff8ea] border-t-2 border-[#2a170e]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p className="font-scrawl text-lg text-[#8e3f15]">got queries?</p>
            <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-[#2a170e]">
              Questions, answered
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.slice(0, 5).map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#fffdf8] border-2 border-[#2a170e] rounded-2xl overflow-hidden shadow-[4px_5px_0px_#2a170e] transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-plush font-bold text-lg text-[#2a170e] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#c2622b] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-[#5a3a28] leading-relaxed border-t border-[#2a170e]/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="font-bold text-[#c2622b] hover:underline inline-flex items-center gap-1.5"
            >
              <span>Read all 9 questions & answers</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* SECTION 8: READY TO MEET YOUR NEW BEST FRIEND? */}
      <section className="tp-scene tp-home py-20 px-4 text-center bg-[#fffdf8] border-t-2 border-[#2a170e]">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-plush text-3xl sm:text-5xl font-extrabold text-[#2a170e] mb-4">
            Ready to meet your new best friend?
          </h2>
          <p className="text-base sm:text-lg text-[#5a3a28] leading-relaxed mb-8">
            Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/puppies"
              className="btn btn-primary px-8 py-3.5 rounded-full font-bold text-base shadow-[0_6px_0px_#2a170e] hover:-translate-y-1 transition-transform"
            >
              Explore all puppies
            </Link>

            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp px-8 py-3.5 rounded-full font-bold text-base shadow-[0_6px_0px_#2a170e] hover:-translate-y-1 transition-transform flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideoPuppy && (
        <VideoModal
          puppy={activeVideoPuppy}
          onClose={() => setActiveVideoPuppy(null)}
        />
      )}
    </main>
  );
}
