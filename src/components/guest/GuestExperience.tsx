'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Navigation, 
  Calendar, 
  Copy, 
  Check, 
  Plane, 
  Train, 
  SunMedium, 
  MessageCircle, 
  Sparkles, 
  Download,
  Clock,
  Compass
} from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { SectionHeading, OrnamentalDivider } from '@/components/ui';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function GuestExperience() {
  const [activeVenue, setActiveVenue] = useState<'bodhgaya' | 'noida'>('bodhgaya');
  const [copiedLink, setCopiedLink] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  // Calculate live countdown to The Sacred Wedding (3 Dec 2026, 20:30 IST)
  useEffect(() => {
    const targetWedding = new Date('2026-12-03T20:30:00+05:30').getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const diff = targetWedding - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        isPast: false,
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const shareText = `🌸 *Mansi weds Abhinav — A Story in Bloom* 🌸\n\nWith great joy, our families invite you to celebrate our wedding ceremonies!\n\n✨ *Mehendi & Sangeet:* 2 Dec 2026 (Buddha Heritage Resort, Bodhgaya)\n✨ *Haldi & Sacred Wedding:* 3 Dec 2026 (Buddha Heritage Resort, Bodhgaya)\n\nPlease view our wedding itinerary and venue directions here:\n${typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://mansiwedsabhinav.vercel.app'}`;

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
      } catch {
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
    <section id="travel" className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden border-t border-gold-400/20">
      
      {/* Chapter Four Heading */}
      <SectionHeading
        kicker="Chapter Four"
        title="Join Us"
        hindiTitle="॥ सस्नेह निमन्त्रणम् • यात्रा एवं दिशा-निर्देश ॥"
        description="Everything you need to celebrate with us: verified venue maps, airport transit guides, and instant travel planning."
        dividerVariant="lotus"
      />

      {/* Wedding Countdown Banner */}
      <div className="max-w-4xl mx-auto mb-12 relative z-10">
        <div className="stationery-card p-5 sm:p-6 rounded-3xl border border-gold-400/40 shadow-stationery text-center bg-paper-50 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-sans font-semibold tracking-widest uppercase text-gold-700">
            <Clock className="w-3.5 h-3.5 text-ruby-600" />
            <span>Countdown to The Sacred Wedding • Bodhgaya</span>
          </div>

          {!timeLeft.isPast ? (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto pt-1">
              <div className="p-2 sm:p-3 rounded-2xl bg-paper-100/90 border border-gold-300/40">
                <span className="font-serif text-2xl sm:text-4xl font-bold text-ink-title block leading-none">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-ink-secondary">
                  Days
                </span>
              </div>
              <div className="p-2 sm:p-3 rounded-2xl bg-paper-100/90 border border-gold-300/40">
                <span className="font-serif text-2xl sm:text-4xl font-bold text-ink-title block leading-none">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-ink-secondary">
                  Hours
                </span>
              </div>
              <div className="p-2 sm:p-3 rounded-2xl bg-paper-100/90 border border-gold-300/40">
                <span className="font-serif text-2xl sm:text-4xl font-bold text-ink-title block leading-none">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-ink-secondary">
                  Minutes
                </span>
              </div>
              <div className="p-2 sm:p-3 rounded-2xl bg-paper-100/90 border border-gold-300/40">
                <span className="font-serif text-2xl sm:text-4xl font-bold text-ruby-600 block leading-none">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-ink-secondary">
                  Seconds
                </span>
              </div>
            </div>
          ) : (
            <p className="font-serif italic text-lg text-emerald-800">
              The wedding celebrations are taking place! May God bless Abhinav &amp; Mansi!
            </p>
          )}

          <p className="font-serif italic text-xs text-ink-secondary">
            Thursday, 3rd December 2026 • 8:30 PM Onwards • Buddha Heritage Resort, Bodhgaya
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Interactive Venue Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="stationery-card p-6 sm:p-10 rounded-3xl border border-gold-400/40 shadow-stationery-deep bg-paper-50">
            
            <div className="flex flex-wrap items-center justify-between border-b border-gold-300/30 pb-4 mb-6 gap-3">
              <div>
                <span className="font-serif italic text-xs text-gold-700 font-semibold tracking-wider block">
                  Wedding Destination
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-title">
                  {activeVenue === 'bodhgaya' ? 'Buddha Heritage Resort' : 'The Royal Palace Banquet'}
                </h3>
              </div>

              {/* Venue Switcher Tabs */}
              <div className="inline-flex p-1 rounded-full bg-paper-100 border border-gold-400/30 text-xs shadow-inner">
                <button
                  onClick={() => setActiveVenue('bodhgaya')}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                    activeVenue === 'bodhgaya'
                      ? 'bg-ruby-600 text-white shadow-sm font-semibold'
                      : 'text-ink-secondary hover:text-ruby-600 font-medium'
                  }`}
                >
                  Bodhgaya (Dec 2–3)
                </button>
                <button
                  onClick={() => setActiveVenue('noida')}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all ${
                    activeVenue === 'noida'
                      ? 'bg-ruby-600 text-white shadow-sm font-semibold'
                      : 'text-ink-secondary hover:text-ruby-600 font-medium'
                  }`}
                >
                  Noida (Oct 20)
                </button>
              </div>
            </div>

            {activeVenue === 'bodhgaya' ? (
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-gold-800 text-xs sm:text-sm font-sans font-semibold">
                    <MapPin className="w-4 h-4 text-ruby-600 flex-shrink-0 mt-0.5" />
                    <span>Fifty meter before Thai Temple, Opp. Maya Sarovar, Bodhgaya, Bihar 824231</span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-ink-primary leading-relaxed">
                    The serene sanctuary of Bodhgaya serves as the main wedding venue for all ceremonies: Mehendi, Sangeet, Haldi, Ghudchadhi, Baraat, and the Sacred Wedding Pheras.
                  </p>
                </div>

                {/* Celebrations Hosted Here */}
                <div className="p-4 bg-paper-100/90 rounded-2xl border border-gold-300/40 space-y-2">
                  <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-ink-title block">
                    Ceremonies Hosted at this Venue:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-ink-title">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                      <span>Mehendi (Dec 2 • 11:00 AM)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                      <span>Sangeet (Dec 2 • 07:00 PM)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                      <span>Haldi (Dec 3 • 11:00 AM)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600"></span>
                      <span>Ghudchadhi &amp; Baraat (Dec 3 • 07:00 PM)</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:col-span-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-ruby-600"></span>
                      <strong className="text-ruby-700">The Sacred Wedding &amp; Varmala (Dec 3 • 08:30 PM)</strong>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Buddha+Heritage+Resort+Bodhgaya+Bihar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-full bg-ruby-600 text-white text-xs font-sans font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:bg-ruby-700 transition-all hover:scale-102 border border-gold-400/40"
                  >
                    <Navigation className="w-4 h-4 text-gold-300" />
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href="https://maps.apple.com/?q=Buddha+Heritage+Resort+Bodhgaya+Bihar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-full bg-paper-100 hover:bg-paper-200 text-ink-primary border border-gold-400/40 text-xs font-sans font-semibold tracking-wider uppercase transition-all"
                  >
                    Apple Maps
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-gold-800 text-xs sm:text-sm font-sans font-semibold">
                    <MapPin className="w-4 h-4 text-ruby-600 flex-shrink-0 mt-0.5" />
                    <span>Near JBM Global School, Block-B, Sector 132, Noida, Uttar Pradesh 201304</span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-ink-primary leading-relaxed">
                    The Promise Night and engagement ring ceremony was celebrated in Noida with the gracious presence of elders and loved ones.
                  </p>
                </div>

                <div className="p-4 bg-paper-50 rounded-2xl border border-paper-300 text-xs space-y-1.5">
                  <span className="font-semibold block text-ink-title">Location &amp; Access:</span>
                  <p className="text-ink-secondary text-xs leading-relaxed font-sans">
                    Located on the Noida-Greater Noida Expressway near JBM Global School. Easily accessible from Delhi NCR, Noida Sector 137 Metro, and IGI Airport.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=The+Royal+Palace+Banquet+Sector+132+Noida"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-full bg-ruby-600 text-white text-xs font-sans font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:bg-ruby-700 transition-all hover:scale-102 border border-gold-400/40"
                  >
                    <Navigation className="w-4 h-4 text-gold-300" />
                    <span>Open in Google Maps</span>
                  </a>
                  <a
                    href="https://maps.apple.com/?q=The+Royal+Palace+Banquet+Sector+132+Noida"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-full bg-paper-100 hover:bg-paper-200 text-ink-primary border border-gold-400/40 text-xs font-sans font-semibold tracking-wider uppercase transition-all"
                  >
                    Apple Maps
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Transit & WhatsApp Share (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Travel & Connectivity Guide */}
          <div className="stationery-card p-6 sm:p-7 rounded-3xl border border-gold-400/40 shadow-stationery space-y-4 bg-paper-50">
            <h4 className="font-serif text-lg font-bold text-ink-title border-b border-gold-300/30 pb-2.5 flex items-center gap-2">
              <Plane className="w-4 h-4 text-gold-700" />
              <span>Travel &amp; Transit Guide</span>
            </h4>

            <div className="space-y-3.5 text-xs font-sans">
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
                  className="w-full py-2.5 px-4 rounded-xl bg-paper-100 hover:bg-paper-200 text-ink-primary border border-gold-400/40 text-xs font-sans font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-sm"
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
                className="py-2.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-sans font-semibold tracking-wider uppercase flex items-center gap-2 shadow-md transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share on WhatsApp</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="py-2.5 px-4 rounded-full bg-paper-100 hover:bg-paper-200 text-ink-primary border border-gold-400/40 text-xs font-sans font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-all"
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

      {/* Central Botanical Transition to Chapter Seven */}
      <div className="mt-16 text-center">
        <OrnamentalDivider variant="lotus" width="w-48 sm:w-64" className="mx-auto" />
      </div>

    </section>
  );
}
