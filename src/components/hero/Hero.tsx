'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function Hero() {
  const [selectedEventId, setSelectedEventId] = useState<string>('wedding');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const currentTargetEvent =
    WEDDING_DATA.events.find(e => e.id === selectedEventId) || WEDDING_DATA.events[5];

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(currentTargetEvent.isoDate).getTime();
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
  }, [currentTargetEvent.isoDate]);

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-between pt-16 pb-16 px-4 sm:px-6 overflow-hidden">
      
      {/* Decorative Archival Corner Florals from Scanned Invitation */}
      <div className="absolute top-0 left-0 w-40 sm:w-72 h-40 sm:h-72 pointer-events-none opacity-45 -translate-x-6 -translate-y-6">
        <Image
          src="/assets/floral_corner_left.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="absolute top-0 right-0 w-40 sm:w-72 h-40 sm:h-72 pointer-events-none opacity-45 translate-x-6 -translate-y-6">
        <Image
          src="/assets/floral_corner_right.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Chapter Marker & Header Inscription */}
      <div className="text-center space-y-1.5 relative z-10 max-w-2xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-paper-100/90 border border-gold-400/40 text-gold-700 font-serif italic text-xs font-semibold tracking-wider uppercase shadow-sm">
          <Sparkles className="w-3 h-3 text-gold-600" />
          <span>Chapter One • A Beautiful Beginning</span>
          <Sparkles className="w-3 h-3 text-gold-600" />
        </div>

        <p className="font-hindi text-burgundy-900 text-sm sm:text-base font-semibold tracking-normal leading-relaxed pt-1">
          ॥ श्री गणेशाय नमः ॥
        </p>
        <p className="font-serif italic text-ink-secondary text-xs sm:text-sm">
          Together with their families
        </p>
      </div>

      {/* Main Couple Headline */}
      <div className="text-center relative z-10 my-4 sm:my-6 max-w-5xl mx-auto space-y-3">
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-ink-title font-bold tracking-tight leading-none drop-shadow-sm">
          Abhinav <span className="font-serif italic text-gold-600 font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl mx-1 sm:mx-3">&amp;</span> Mansi
        </h1>

        {/* Romantic Editorial Tagline */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <span className="h-[1px] w-8 sm:w-20 bg-gradient-to-r from-transparent to-gold-400"></span>
          <span className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-ruby-600">
            A Story in Bloom
          </span>
          <span className="h-[1px] w-8 sm:w-20 bg-gradient-to-l from-transparent to-gold-400"></span>
        </div>

        <p className="font-serif text-ink-primary text-sm sm:text-base md:text-lg max-w-xl mx-auto pt-1 leading-relaxed">
          Two souls bound by destiny, stepping hand in hand into a lifetime of love, laughter, and sacred devotion.
        </p>
      </div>

      {/* Exceptional Couple Photograph Framing */}
      <div className="relative z-10 w-full max-w-3xl mx-auto my-4 sm:my-6">
        <div className="stationery-card p-4 sm:p-7 rounded-3xl border-2 border-gold-400/40 shadow-stationery-deep bg-paper-50 overflow-hidden">
          
          {/* Inner Golden Filigree Accent */}
          <div className="absolute inset-2 sm:inset-3 border border-gold-400/25 rounded-2xl pointer-events-none z-20"></div>
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-500/50 pointer-events-none z-20"></div>
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-500/50 pointer-events-none z-20"></div>
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-500/50 pointer-events-none z-20"></div>
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-500/50 pointer-events-none z-20"></div>

          {/* Central Image Canvas: Authentic Couple Photograph */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-burgundy-950/20 shadow-inner">
            <Image
              src="/assets/photos/couple_main.jpg"
              alt="Abhinav & Mansi looking lovingly at each other"
              fill
              priority
              className="object-cover object-center filter saturate-105"
            />
            {/* Subtle Vignette for Archival Tone */}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/75 via-transparent to-transparent"></div>

            {/* Bottom Inscription Plaque */}
            <div className="absolute bottom-4 inset-x-4 z-20 text-center text-paper-50 space-y-0.5">
              <h3 className="font-serif text-lg sm:text-2xl font-bold tracking-wide drop-shadow text-gold-100">
                Abhinav &amp; Mansi
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-paper-200/90 drop-shadow">
                Under golden chandeliers, two hearts unite into one eternal bond.
              </p>
            </div>
          </div>

          {/* Verified Date & Location Badge Plaque */}
          <div className="mt-4 pt-3 border-t border-gold-300/35 grid grid-cols-1 sm:grid-cols-2 gap-3 text-center sm:text-left text-xs font-sans">
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

        </div>
      </div>

      {/* Dual Core Actions & Interactive Countdown */}
      <div className="relative z-10 w-full max-w-xl mx-auto text-center space-y-4 pt-2">
        
        {/* Core Actions: View Celebrations & Get Directions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#celebrations"
            className="px-6 py-3 rounded-full bg-ruby-600 hover:bg-ruby-700 text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gold-400/40"
          >
            View Celebrations
          </a>
          <a
            href="#travel"
            className="px-6 py-3 rounded-full bg-paper-100 hover:bg-paper-200 text-ink-primary font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-sm border border-gold-400/40 transition-all hover:scale-105"
          >
            Get Directions
          </a>
        </div>

        {/* Celebration selector tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-sans pt-2">
          <button
            onClick={() => setSelectedEventId('wedding')}
            className={`px-3 py-1 rounded-full border transition-all ${
              selectedEventId === 'wedding'
                ? 'bg-ruby-600 text-white border-gold-400 font-medium shadow-sm'
                : 'bg-paper-100/80 text-ink-primary border-gold-300/40 hover:bg-paper-200'
            }`}
          >
            The Sacred Wedding (Dec 3)
          </button>
          <button
            onClick={() => setSelectedEventId('sangeet')}
            className={`px-3 py-1 rounded-full border transition-all ${
              selectedEventId === 'sangeet'
                ? 'bg-ruby-600 text-white border-gold-400 font-medium shadow-sm'
                : 'bg-paper-100/80 text-ink-primary border-gold-300/40 hover:bg-paper-200'
            }`}
          >
            Sangeet &amp; Mehandi (Dec 2)
          </button>
          <button
            onClick={() => setSelectedEventId('promise-night')}
            className={`px-3 py-1 rounded-full border transition-all ${
              selectedEventId === 'promise-night'
                ? 'bg-ruby-600 text-white border-gold-400 font-medium shadow-sm'
                : 'bg-paper-100/80 text-ink-primary border-gold-300/40 hover:bg-paper-200'
            }`}
          >
            The Promise Night (Oct 20)
          </button>
        </div>

        {/* Target celebration title */}
        <p className="font-sans text-xs sm:text-sm text-ink-primary font-medium">
          Counting down to <span className="font-serif font-bold text-ruby-600">{currentTargetEvent.title}</span> ({currentTargetEvent.dateString})
        </p>

        {/* Countdown Digit Boxes */}
        {timeLeft.isPast ? (
          <div className="p-4 rounded-xl bg-paper-100/90 border border-gold-400/40 text-ink-title font-sans">
            <p className="text-base font-semibold font-serif">This celebration has joyfully taken place!</p>
            <p className="text-xs text-ink-secondary mt-1">
              Cherishing the memories and looking forward to the sacred wedding ceremonies in Bodhgaya.
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
