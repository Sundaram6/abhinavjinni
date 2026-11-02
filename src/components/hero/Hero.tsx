'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, ChevronDown } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';
import SacredTransformation from './SacredTransformation';

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

  const currentTargetEvent = WEDDING_DATA.events.find(e => e.id === selectedEventId) || WEDDING_DATA.events[5];

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
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
      
      {/* Decorative Corner Florals from Scanned Invitation */}
      <div className="absolute top-0 left-0 w-36 sm:w-64 h-36 sm:h-64 pointer-events-none opacity-45 -translate-x-6 -translate-y-6">
        <Image
          src="/assets/floral_corner_left.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="absolute top-0 right-0 w-36 sm:w-64 h-36 sm:h-64 pointer-events-none opacity-45 translate-x-6 -translate-y-6">
        <Image
          src="/assets/floral_corner_right.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Header Sacred Blessings */}
      <div className="text-center space-y-1 relative z-10 max-w-2xl mx-auto pt-6">
        <p className="font-hindi text-burgundy-900 text-sm sm:text-base font-semibold tracking-wider">
          ॥ श्री गणेशाय नमः ॥
        </p>
        <p className="font-serif italic text-ink-secondary text-xs sm:text-sm tracking-wide">
          Together with their families
        </p>
      </div>

      {/* Main Couple Names & Tagline */}
      <div className="text-center relative z-10 my-3 sm:my-5 max-w-4xl mx-auto space-y-3">
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-burgundy-900 font-bold tracking-tight leading-none drop-shadow-sm">
          Abhinav <span className="font-script text-gold-600 font-normal text-3xl sm:text-5xl md:text-6xl mx-1 sm:mx-2">&amp;</span> Mansi
        </h1>

        <div className="flex items-center justify-center gap-3 pt-1">
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-gold-400"></span>
          <span className="font-script text-2xl sm:text-3xl text-burgundy-800">
            A Story in Bloom
          </span>
          <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-gold-400"></span>
        </div>

        <p className="font-serif text-ink-secondary text-sm sm:text-base max-w-xl mx-auto pt-1">
          Celebrating a sacred union of love, laughter, and lifelong devotion.
        </p>
      </div>

      {/* 3. Sacred Metamorphosis: Lord Shiva & Goddess Parvati hands transforming into Couple Engagement Rings */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <SacredTransformation />
      </div>

      {/* Interactive Countdown */}
      <div className="relative z-10 w-full max-w-xl mx-auto text-center space-y-4 pt-2">
        
        {/* Celebration selector tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <button
            onClick={() => setSelectedEventId('wedding')}
            className={`px-3 py-1 rounded-full border transition-all ${
              selectedEventId === 'wedding'
                ? 'bg-burgundy-900 text-gold-200 border-gold-400 font-medium shadow-sm'
                : 'bg-paper-50/70 text-ink-secondary border-gold-300/40 hover:bg-paper-100'
            }`}
          >
            The Sacred Wedding (Dec 3)
          </button>
          <button
            onClick={() => setSelectedEventId('sangeet')}
            className={`px-3 py-1 rounded-full border transition-all ${
              selectedEventId === 'sangeet'
                ? 'bg-burgundy-900 text-gold-200 border-gold-400 font-medium shadow-sm'
                : 'bg-paper-50/70 text-ink-secondary border-gold-300/40 hover:bg-paper-100'
            }`}
          >
            Sangeet &amp; Mehandi (Dec 2)
          </button>
          <button
            onClick={() => setSelectedEventId('promise-night')}
            className={`px-3 py-1 rounded-full border transition-all ${
              selectedEventId === 'promise-night'
                ? 'bg-burgundy-900 text-gold-200 border-gold-400 font-medium shadow-sm'
                : 'bg-paper-50/70 text-ink-secondary border-gold-300/40 hover:bg-paper-100'
            }`}
          >
            The Promise Night (Oct 20)
          </button>
        </div>

        {/* Target celebration title */}
        <p className="font-serif text-sm sm:text-base text-burgundy-950 font-medium">
          Counting down to <span className="font-semibold text-burgundy-800">{currentTargetEvent.title}</span> ({currentTargetEvent.dateString})
        </p>

        {/* Countdown Digit Boxes */}
        {timeLeft.isPast ? (
          <div className="p-4 rounded-xl bg-paper-50/80 border border-gold-400/40 text-burgundy-900 font-serif">
            <p className="text-base font-semibold">This celebration has joyfully taken place!</p>
            <p className="text-xs text-ink-secondary mt-1">Cherishing the memories and looking forward to the sacred wedding ceremonies in Bodhgaya.</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
            <div className="stationery-card p-2 sm:p-3 rounded-xl border border-gold-400/40 shadow-sm text-center">
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-burgundy-900">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="block text-[10px] sm:text-xs font-sans tracking-widest uppercase text-gold-700 font-medium">
                Days
              </span>
            </div>

            <div className="stationery-card p-2 sm:p-3 rounded-xl border border-gold-400/40 shadow-sm text-center">
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-burgundy-900">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="block text-[10px] sm:text-xs font-sans tracking-widest uppercase text-gold-700 font-medium">
                Hours
              </span>
            </div>

            <div className="stationery-card p-2 sm:p-3 rounded-xl border border-gold-400/40 shadow-sm text-center">
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-burgundy-900">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="block text-[10px] sm:text-xs font-sans tracking-widest uppercase text-gold-700 font-medium">
                Mins
              </span>
            </div>

            <div className="stationery-card p-2 sm:p-3 rounded-xl border border-gold-400/40 shadow-sm text-center">
              <span className="block font-serif text-2xl sm:text-4xl font-bold text-burgundy-900">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="block text-[10px] sm:text-xs font-sans tracking-widest uppercase text-gold-700 font-medium">
                Secs
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <a
            href="#travel"
            className="px-6 py-3 rounded-full bg-burgundy-900 hover:bg-burgundy-800 text-gold-100 font-serif text-sm tracking-widest uppercase shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gold-400/40"
          >
            Venues &amp; Travel Guide
          </a>
          <a
            href="#celebrations"
            className="px-6 py-3 rounded-full bg-paper-50 hover:bg-paper-100 text-burgundy-900 font-serif text-sm tracking-widest uppercase shadow-sm border border-gold-400/40 transition-all hover:scale-105"
          >
            Explore Itinerary
          </a>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="pt-8 text-center text-ink-muted">
        <a
          href="#celebrations"
          className="group inline-flex flex-col items-center gap-1.5 text-xs font-serif tracking-widest uppercase hover:text-burgundy-900 transition-colors"
          aria-label="Scroll to celebrations itinerary"
        >
          <span>Celebrations</span>
          <ChevronDown className="w-4 h-4 text-gold-600 transition-transform duration-300 group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
