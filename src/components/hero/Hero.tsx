'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import { OrnamentalDivider, RoyalPhotoFrame } from '@/components/ui';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const weddingDateIso = WEDDING_DATA.dates.wedding;

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(weddingDateIso).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [weddingDateIso]);

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between pt-20 sm:pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
      
      {/* Chapter Marker & Sacred Inscription */}
      <div className="text-center space-y-2 relative z-10 max-w-2xl mx-auto pt-4">
        {/* Unified Kicker */}
        <div className="flex items-center justify-center gap-2.5">
          <span className="h-[1px] w-6 sm:w-10 bg-gold-400/50"></span>
          <span className="w-1 h-1 rotate-45 bg-gold-600/80"></span>
          <span className="font-serif italic text-xs tracking-widest text-gold-700 font-semibold uppercase px-1">
            Chapter One • A Beautiful Beginning
          </span>
          <span className="w-1 h-1 rotate-45 bg-gold-600/80"></span>
          <span className="h-[1px] w-6 sm:w-10 bg-gold-400/50"></span>
        </div>

        <p className="font-hindi text-gold-800 text-sm sm:text-base font-semibold tracking-normal leading-relaxed pt-1">
          ॥ श्री गणेशाय नमः ॥
        </p>
        <p className="font-serif italic text-ink-secondary text-xs sm:text-sm">
          Together with their families
        </p>
      </div>

      {/* Main Couple Headline */}
      <div className="text-center relative z-10 my-4 sm:my-6 max-w-4xl mx-auto space-y-3">
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-ink-title font-bold tracking-tight leading-none">
          Abhinav <span className="font-serif italic text-gold-600 font-normal text-4xl sm:text-6xl md:text-7xl mx-1 sm:mx-3">&amp;</span> Mansi
        </h1>

        {/* Romantic Editorial Tagline & Sacred Lotus Divider */}
        <div className="pt-1 pb-1">
          <p className="font-serif italic text-2xl sm:text-3xl text-ruby-600 mb-2">
            A Story in Bloom
          </p>
          <OrnamentalDivider variant="lotus" className="mx-auto" />
        </div>

        <p className="font-serif text-ink-primary text-sm sm:text-base md:text-lg max-w-xl mx-auto pt-1 leading-relaxed">
          Two souls bound by destiny, stepping hand in hand into a lifetime of love, laughter, and sacred devotion.
        </p>
      </div>

      {/* Exceptional Couple Photograph Framing */}
      <div className="relative z-10 w-full max-w-3xl mx-auto my-4 sm:my-6">
        <RoyalPhotoFrame
          src="/assets/photos/couple_main.jpg"
          alt="Abhinav & Mansi looking lovingly at each other"
          aspectRatioClass="aspect-[3/2]"
          objectPosition="object-top"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 768px"
          overlayCaption={{
            title: 'Abhinav & Mansi',
            subtitle: 'Under golden chandeliers, two hearts unite into one eternal bond.',
          }}
        >
          {/* Verified Date & Location Badge Plaque */}
          <div className="pt-2 border-t border-gold-300/35 grid grid-cols-1 sm:grid-cols-2 gap-3 text-center sm:text-left text-xs font-sans">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-paper-100/80 border border-gold-300/40">
              <Calendar className="w-4 h-4 text-ruby-600 flex-shrink-0" />
              <div>
                <span className="block font-semibold text-ink-title">The Sacred Wedding</span>
                <span className="text-ink-secondary text-[11px]">Thursday, 3rd December 2026 • 8:30 PM</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-paper-100/80 border border-gold-300/40">
              <MapPin className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <div>
                <span className="block font-semibold text-ink-title">Buddha Heritage Resort</span>
                <span className="text-ink-secondary text-[11px]">Opp. Maya Sarovar, Bodhgaya, Bihar</span>
              </div>
            </div>
          </div>
        </RoyalPhotoFrame>
      </div>

      {/* Dual Core Actions & Countdown */}
      <div className="relative z-10 w-full max-w-xl mx-auto text-center space-y-4 pt-2">
        
        {/* Core Actions: View Celebrations & Get Directions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#celebrations"
            className="px-6 py-3 rounded-full bg-ruby-600 hover:bg-ruby-700 text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all hover:scale-102 border border-gold-400/40"
          >
            View Celebrations
          </a>
          <a
            href="#travel"
            className="px-6 py-3 rounded-full bg-paper-100 hover:bg-paper-200 text-ink-primary font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-sm border border-gold-400/40 transition-all hover:scale-102"
          >
            Get Directions
          </a>
        </div>

        {/* Target Celebration Title */}
        <p className="font-sans text-xs sm:text-sm text-ink-primary font-medium pt-1">
          Counting down to <span className="font-serif font-bold text-ruby-600">The Sacred Wedding</span> (3rd December 2026)
        </p>

        {/* Countdown Digit Boxes */}
        {timeLeft.isPast ? (
          <div className="p-4 rounded-xl bg-paper-100/90 border border-gold-400/40 text-ink-title font-sans">
            <p className="text-base font-semibold font-serif">This celebration has joyfully taken place!</p>
            <p className="text-xs text-ink-secondary mt-1">
              Cherishing the memories of the sacred wedding ceremonies in Bodhgaya.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            <div className="stationery-card p-2 sm:p-3 rounded-xl border border-gold-400/40 shadow-sm text-center">
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-ink-title">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="block text-[10px] sm:text-xs font-sans tracking-widest uppercase text-gold-700 font-medium">
                Days
              </span>
            </div>

            <div className="stationery-card p-2 sm:p-3 rounded-xl border border-gold-400/40 shadow-sm text-center">
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-ink-title">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="block text-[10px] sm:text-xs font-sans tracking-widest uppercase text-gold-700 font-medium">
                Hours
              </span>
            </div>

            <div className="stationery-card p-2 sm:p-3 rounded-xl border border-gold-400/40 shadow-sm text-center">
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-ink-title">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="block text-[10px] sm:text-xs font-sans tracking-widest uppercase text-gold-700 font-medium">
                Mins
              </span>
            </div>

            <div className="stationery-card p-2 sm:p-3 rounded-xl border border-gold-400/40 shadow-sm text-center">
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-ink-title">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="block text-[10px] sm:text-xs font-sans tracking-widest uppercase text-gold-700 font-medium">
                Secs
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Down Scroll Indicator to Chapter Two */}
      <div className="pt-8 text-center text-ink-muted">
        <a
          href="#two-souls"
          className="group inline-flex flex-col items-center gap-1.5 text-xs font-sans font-medium tracking-widest uppercase hover:text-ruby-600 transition-colors"
          aria-label="Scroll to Chapter Two: Two Souls, One Story"
        >
          <span>The Love Story</span>
          <ChevronDown className="w-4 h-4 text-gold-600 transition-transform duration-300 group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
