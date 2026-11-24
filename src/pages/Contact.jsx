import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Phone, Send, Clock, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';
import { PUPPIES_DATA } from '../data/puppiesData';
import Toast from '../components/Toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    puppyId: 'any puppy (not sure yet)',
    message: ''
  });

  const [toastMessage, setToastMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.phone.trim()) errs.phone = 'Please provide a valid phone number';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please provide a valid email address';
    if (!formData.area.trim()) errs.area = 'Please mention your city or area in UAE';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage('Your letter has been posted! A puppy concierge will contact you shortly.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        area: '',
        puppyId: 'any puppy (not sure yet)',
        message: ''
      });
      setTimeout(() => setToastMessage(''), 6000);
    }, 600);
  };

  return (
    <main className="relative pt-[var(--header-h)] pb-24 outline-none bg-[#fffdf8] min-h-screen">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      {/* Header Banner */}
      <section className="bg-[#fff8ea] border-b-2 border-[#2a170e] py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="font-scrawl text-base text-[#8e3f15] font-semibold">
            {SITE_CONFIG.tagline}
          </p>
          <h1 className="font-plush text-4xl sm:text-6xl font-extrabold text-[#2a170e] mt-1 mb-4">
            Visit & contact
          </h1>
          <p className="text-base sm:text-lg text-[#5a3a28] max-w-2xl mx-auto leading-relaxed">
            Have questions about our puppies or adoption process? Fill out our letter below or book a private appointment in Downtown Dubai.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: THE POSTCARD LETTERFORM */}
          <div className="lg:col-span-7">
            <div className="tp-letterform relative border-3 border-[#2a170e] bg-white rounded-3xl p-6 sm:p-10 shadow-[8px_12px_0px_#2a170e]">
              
              {/* Postage Stamp */}
              <div className="tp-letter__stamp absolute -top-4 right-6 w-16 h-16 rounded-xl border-2 border-dashed border-[#c2622b] bg-[#fbe3b4] flex flex-col items-center justify-center rotate-6 shadow-sm">
                <span className="text-lg">🐾</span>
                <span className="text-[9px] font-mono font-bold uppercase text-[#8e3f15] tracking-widest mt-0.5">
                  Dubai
                </span>
              </div>

              {/* Letter Greeting */}
              <p className="tp-letterform__greeting font-plush text-2xl font-bold text-[#8e3f15] mb-6">
                Dear TeddyPups,
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Prose Input Style matching original site */}
                <div className="text-base sm:text-lg text-[#2a170e] leading-loose">
                  <span>my name is </span>
                  <input
                    type="text"
                    required
                    placeholder="your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`border-b-2 bg-transparent px-2 py-0.5 font-bold text-[#c2622b] focus:outline-none focus:border-[#2a170e] ${
                      errors.name ? 'border-red-500' : 'border-[#c2622b]/50'
                    }`}
                  />
                  <span>, and you can reach me on </span>
                  <input
                    type="tel"
                    required
                    placeholder="phone / WhatsApp"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`border-b-2 bg-transparent px-2 py-0.5 font-bold text-[#c2622b] focus:outline-none focus:border-[#2a170e] ${
                      errors.phone ? 'border-red-500' : 'border-[#c2622b]/50'
                    }`}
                  />
                  <span> or by email at </span>
                  <input
                    type="email"
                    required
                    placeholder="email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`border-b-2 bg-transparent px-2 py-0.5 font-bold text-[#c2622b] focus:outline-none focus:border-[#2a170e] ${
                      errors.email ? 'border-red-500' : 'border-[#c2622b]/50'
                    }`}
                  />
                  <span>.</span>

                  <br className="my-2" />

                  <span>I live in </span>
                  <input
                    type="text"
                    required
                    placeholder="city or area (e.g. Dubai Marina)"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className={`border-b-2 bg-transparent px-2 py-0.5 font-bold text-[#c2622b] focus:outline-none focus:border-[#2a170e] ${
                      errors.area ? 'border-red-500' : 'border-[#c2622b]/50'
                    }`}
                  />
                  <span>, and I'm curious about </span>
                  <select
                    value={formData.puppyId}
                    onChange={(e) => setFormData({ ...formData, puppyId: e.target.value })}
                    className="border-b-2 border-[#c2622b]/50 bg-transparent px-2 py-0.5 font-bold text-[#c2622b] focus:outline-none focus:border-[#2a170e] cursor-pointer"
                  >
                    <option value="any puppy (not sure yet)">any puppy (not sure yet)</option>
                    {PUPPIES_DATA.map((p) => (
                      <option key={p.id} value={`${p.name} (${p.breed}, ${p.gender})`}>
                        {p.name} ({p.breed}, {p.gender})
                      </option>
                    ))}
                  </select>
                  <span>.</span>
                </div>

                {/* Additional Note */}
                <div className="pt-2">
                  <label className="block font-scrawl text-xs text-[#8e3f15] mb-1">
                    Anything special you'd like us to know?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your home, previous experience with pets, or any specific questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 rounded-2xl border-2 border-[#2a170e]/20 bg-[#fffdf8] text-sm text-[#2a170e] focus:outline-none focus:border-[#2a170e]"
                  />
                </div>

                {/* Sign-off */}
                <p className="font-scrawl text-sm text-[#8e3f15] italic pt-2">
                  with love, a future puppy parent
                </p>

                {/* Error Banner if any */}
                {Object.keys(errors).length > 0 && (
                  <p className="text-xs text-red-600 font-bold">
                    Please fill out all required fields before posting.
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-[0_6px_0px_#2a170e] cursor-pointer hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Posting your letter...' : 'Post my letter'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: SHOWROOM & CONTACT INFO */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Showroom Card */}
            <div className="bg-white border-3 border-[#2a170e] rounded-3xl p-6 sm:p-8 shadow-[6px_8px_0px_#2a170e]">
              <span className="font-scrawl text-sm text-[#8e3f15] font-bold">
                by appointment
              </span>
              <h2 className="font-plush text-2xl font-bold text-[#2a170e] mt-1 mb-3">
                Visit us in Downtown Dubai
              </h2>
              <p className="text-sm text-[#5a3a28] leading-relaxed mb-6">
                {SITE_CONFIG.showroomDescription}
              </p>

              <div className="space-y-4 text-sm text-[#2a170e] pb-6 border-b border-[#2a170e]/15">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#c2622b] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Showroom Address</p>
                    <p className="text-xs text-[#5a3a28]">{SITE_CONFIG.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#c2622b] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Opening Hours</p>
                    <p className="text-xs text-[#5a3a28]">{SITE_CONFIG.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#c2622b] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Direct Phone</p>
                    <a href={`tel:${SITE_CONFIG.phone}`} className="text-xs text-[#c2622b] hover:underline font-semibold">
                      {SITE_CONFIG.displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#c2622b] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Email</p>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-xs text-[#c2622b] hover:underline font-semibold">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="mt-6">
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp w-full py-3.5 rounded-full font-bold text-center flex items-center justify-center gap-2 text-sm shadow-[0_4px_0px_#2a170e]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat directly on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Simulated Map / Location Graphic */}
            <div className="bg-[#fff8ea] border-2 border-[#2a170e] rounded-3xl p-6 text-center shadow-[4px_6px_0px_#2a170e]">
              <div className="w-12 h-12 rounded-full bg-[#fbe3b4] border border-[#2a170e] flex items-center justify-center mx-auto mb-3 text-[#c2622b]">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-plush font-bold text-lg text-[#2a170e]">Downtown Dubai Lounge</h3>
              <p className="text-xs text-[#5a3a28] mt-1 mb-4">Private parking and valet available for visitors.</p>
              <a
                href="https://maps.google.com/?q=Downtown+Dubai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#c2622b] hover:underline"
              >
                Open location in Google Maps →
              </a>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
