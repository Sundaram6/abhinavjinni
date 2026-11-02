'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Navigation, 
  Calendar, 
  Share2, 
  Copy, 
  Check, 
  Plane, 
  Train, 
  SunMedium, 
  MessageCircle, 
  Sparkles, 
  Compass, 
  Download,
  Building2
} from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

export default function GuestExperience() {
  const [activeVenue, setActiveVenue] = useState<'bodhgaya' | 'noida'>('bodhgaya');
  const [copiedLink, setCopiedLink] = useState(false);

  const shareText = `🌸 *Mansi weds Abhinav — A Story in Bloom* 🌸\n\nWith great joy, our families invite you to celebrate our wedding ceremonies!\n\n✨ *The Promise Night:* 20 Oct 2026 (The Royal Palace Banquet, Noida)\n✨ *Mehandi & Sangeet:* 2 Dec 2026 (Buddha Heritage Resort, Bodhgaya)\n✨ *Haldi & Sacred Wedding:* 3 Dec 2026 (Buddha Heritage Resort, Bodhgaya)\n\nPlease view our itinerary and venue directions here:\n${typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://mansiwedsabhinav.vercel.app'}`;

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Abhinav & Mansi Wedding Celebrations',
          text: shareText,
          url: window.location.href.split('#')[0],
        });
      } catch (err) {
        handleWhatsAppShare();
      }
    } else {
      handleWhatsAppShare();
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href.split('#')[0] : '');
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <section id="travel" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-16 relative z-10">
        <h2 className="font-serif text-3xl sm:text-5xl text-ink-title font-bold tracking-tight">
          Venues, Directions &amp; Travel
        </h2>

        <p className="font-serif italic text-ink-secondary text-sm sm:text-base max-w-2xl mx-auto">
          {WEDDING_DATA.invitationMessage}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Interactive Dual Venue Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="stationery-card p-6 sm:p-10 rounded-3xl border border-gold-400/40 shadow-stationery-deep">
            
            <div className="flex items-center justify-between border-b border-gold-300/30 pb-4 mb-6">
              <div>
                <span className="font-serif italic text-xs text-gold-700 font-semibold tracking-wider block">
                  Canonical Wedding Locations
                </span>
                <h3 className="font-serif text-2xl font-bold text-ink-title">
                  {activeVenue === 'bodhgaya' ? 'Buddha Heritage Resort' : 'The Royal Palace Banquet'}
                </h3>
              </div>

              {/* Venue Switcher Tabs */}
              <div className="inline-flex p-1 rounded-full bg-paper-100 border border-gold-400/30 text-xs shadow-inner">
                <button
                  onClick={() => setActiveVenue('bodhgaya')}
                  className={`px-4 py-1.5 rounded-full text-xs font-serif transition-all ${
                    activeVenue === 'bodhgaya'
                      ? 'bg-ruby-600 text-white shadow-sm font-semibold'
                      : 'text-ink-secondary hover:text-ruby-600'
                  }`}
                >
                  Bodhgaya (Dec 2–3)
                </button>
                <button
                  onClick={() => setActiveVenue('noida')}
                  className={`px-4 py-1.5 rounded-full text-xs font-serif transition-all ${
                    activeVenue === 'noida'
                      ? 'bg-ruby-600 text-white shadow-sm font-semibold'
                      : 'text-ink-secondary hover:text-ruby-600'
                  }`}
                >
                  Noida (Oct 20)
                </button>
              </div>
            </div>

            {activeVenue === 'bodhgaya' ? (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gold-700 text-xs font-sans font-semibold uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-ruby-600" />
                    <span>Fifty meter before Thai Temple, Opp. Maya Sarovar, Bodhgaya, Bihar 824231</span>
                  </div>
                  <p className="text-sm font-serif text-ink-primary leading-relaxed">
                    The spiritual and serene sanctuary of Bodhgaya serves as the sacred marriage venue for the Mehandi, Sangeet, Haldi, Ghruchari, Barat, and auspicious Wedding Ceremonies.
                  </p>
                </div>

                {/* Celebrations Hosted Here */}
                <div className="p-4 bg-paper-100/90 rounded-2xl border border-gold-300/40 space-y-2">
                  <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-ink-title block">
                    Celebrations Hosted at this Venue:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-serif text-ink-title">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                      <span>Mehandi (Dec 2, 11:00 AM)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                      <span>Sangeet (Dec 2, 07:00 PM)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                      <span>Haldi (Dec 3, 11:00 AM)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                      <span>Wedding &amp; Barat (Dec 3, 07:00 PM)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-paper-50 rounded-2xl border border-paper-300 text-xs space-y-1.5">
                  <span className="font-semibold block text-ink-title">Landmark &amp; Arrival:</span>
                  <p className="text-ink-secondary text-xs leading-relaxed">
                    Directly opposite the scenic Maya Sarovar lake, 50 meters before the Royal Thai Monastery. Ample valet parking and round-the-clock reception available for all honored guests.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Buddha+Heritage+Resort+Bodhgaya+Bihar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-full bg-ruby-600 text-white text-xs font-serif flex items-center justify-center gap-2 shadow-md hover:bg-ruby-700 transition-all hover:scale-102 border border-gold-400/40"
                  >
                    <Navigation className="w-4 h-4 text-gold-300" />
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href="https://maps.apple.com/?q=Buddha+Heritage+Resort+Bodhgaya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-full bg-paper-100 hover:bg-paper-200 text-ink-primary border border-gold-400/40 text-xs font-serif transition-all"
                  >
                    Apple Maps
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gold-700 text-xs font-sans font-semibold uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-ruby-600" />
                    <span>Near JBM Global School, Block-B, Sector 132, Noida, Uttar Pradesh 201304</span>
                  </div>
                  <p className="text-sm font-serif text-ink-primary leading-relaxed">
                    The Royal Palace Banquet (By KhanaK) hosted The Promise Night — the joyous engagement and ring ceremony celebrated with family blessings and toasts.
                  </p>
                </div>

                <div className="p-4 bg-paper-100/90 rounded-2xl border border-gold-300/40 space-y-2">
                  <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-ink-title block">
                    Celebration Hosted at this Venue:
                  </span>
                  <div className="text-xs font-serif text-ink-title space-y-1">
                    <p className="font-semibold">The Promise Night (Engagement Ceremony)</p>
                    <p className="text-ink-secondary text-[11px]">Tuesday, 20 October 2026 • Dinner: 7:00 PM Onwards • Ring Ceremony: 8:00 PM</p>
                  </div>
                </div>

                <div className="p-4 bg-paper-50 rounded-2xl border border-paper-300 text-xs space-y-1.5">
                  <span className="font-semibold block text-ink-title">Location &amp; Access:</span>
                  <p className="text-ink-secondary text-xs leading-relaxed">
                    Located on the Noida-Greater Noida Expressway near JBM Global School. Easily accessible from Delhi NCR, Noida Sector 137 Metro, and IGI Airport.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=The+Royal+Palace+Banquet+Sector+132+Noida"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-full bg-ruby-600 text-white text-xs font-serif flex items-center justify-center gap-2 shadow-md hover:bg-ruby-700 transition-all hover:scale-102 border border-gold-400/40"
                  >
                    <Navigation className="w-4 h-4 text-gold-300" />
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href="https://maps.apple.com/?q=The+Royal+Palace+Banquet+Sector+132+Noida"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-full bg-paper-100 hover:bg-paper-200 text-ink-primary border border-gold-400/40 text-xs font-serif transition-all"
                  >
                    Apple Maps
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Travel Concierge & WhatsApp Share (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Travel & Connectivity Guide */}
          <div className="stationery-card p-6 sm:p-7 rounded-3xl border border-gold-400/40 shadow-stationery space-y-4">
            <h4 className="font-serif text-lg font-bold text-ink-title border-b border-gold-300/30 pb-2.5 flex items-center gap-2">
              <Plane className="w-4 h-4 text-gold-700" />
              <span>Travel &amp; Transit Guide</span>
            </h4>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <Plane className="w-4 h-4 text-ruby-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ink-title block">Airports</span>
                  <p className="text-ink-secondary text-[11px] leading-relaxed">
                    <strong className="text-ink-title">Gaya Airport (GAY):</strong> ~10 km (15 mins drive).<br />
                    <strong className="text-ink-title">Patna Airport (PAT):</strong> ~115 km (2.5 hrs via NH22 with regular flight connectivity).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Train className="w-4 h-4 text-ruby-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ink-title block">Railway Stations</span>
                  <p className="text-ink-secondary text-[11px] leading-relaxed">
                    <strong className="text-ink-title">Gaya Junction (GAYA):</strong> ~13 km. Directly connected by Rajdhani, Vande Bharat, and express lines across major cities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <SunMedium className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ink-title block">December Climate in Bodhgaya</span>
                  <p className="text-ink-secondary text-[11px] leading-relaxed">
                    Pleasant sunny afternoons (~24°C) with cool, refreshing evenings (~11°C). Light woolens, blazers, and festive shawls are ideal.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-paper-200">
                <a
                  href="/api/calendar?event=all"
                  download="abhinav-mansi-wedding-events.ics"
                  className="w-full py-2.5 px-4 rounded-xl bg-paper-100 hover:bg-paper-200 text-ink-primary border border-gold-400/40 text-xs font-serif flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-gold-700" />
                  <span>Download Complete Calendar (.ics)</span>
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp Sharing Hub */}
          <div className="stationery-card p-6 sm:p-7 rounded-3xl border border-gold-400/40 shadow-stationery bg-paper-100 text-center space-y-3">
            <h4 className="font-serif text-lg font-bold text-ink-title">
              Share With Family &amp; Friends
            </h4>
            <p className="font-serif italic text-xs text-ink-secondary leading-relaxed">
              Forward the official itinerary and venue directions to family groups and well-wishers on WhatsApp.
            </p>

            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                onClick={handleNativeShare}
                className="py-2.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-sans font-semibold flex items-center gap-2 shadow-md transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share on WhatsApp</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="py-2.5 px-4 rounded-full bg-paper-100 hover:bg-paper-200 text-ink-primary border border-gold-400/40 text-xs font-serif flex items-center gap-1.5 transition-all"
                title="Copy website link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-[11px] text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-ruby-600" />
                    <span className="text-[11px]">Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
