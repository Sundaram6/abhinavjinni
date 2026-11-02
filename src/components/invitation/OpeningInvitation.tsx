'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, Play, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OpeningInvitationProps {
  onOpen: () => void;
  isOpen: boolean;
}

type Step = 'envelope' | 'transforming-shiva' | 'transforming-couple' | 'finished';

export default function OpeningInvitation({ onOpen, isOpen }: OpeningInvitationProps) {
  const [step, setStep] = useState<Step>('envelope');
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    // Check if previously opened or URL param requested direct view
    const openedBefore = localStorage.getItem('abhinav_mansi_invitation_opened');
    const isPreview = typeof window !== 'undefined' && (
      window.location.search.includes('opened=1') ||
      window.location.search.includes('preview=1')
    );

    if (openedBefore === 'true' || isPreview) {
      onOpen();
    }
    setHasCheckedStorage(true);
  }, [onOpen]);

  // When user taps the wax seal, launch the short transformation animation!
  const handleStartOpening = () => {
    // 1. Play original Shehnai music
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('wedding_invitation_unfolded'));
    }

    // 2. Initial golden confetti burst
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FAF6F0', '#8B263E'],
        disableForReducedMotion: true,
      });
    } catch {}

    // 3. Move to Shiva-Parvati hands step
    setStep('transforming-shiva');

    // 4. After 1.6s, transform into Abhinav & Mansi's real engagement ring hands!
    setTimeout(() => {
      setStep('transforming-couple');

      try {
        confetti({
          particleCount: 50,
          spread: 75,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#E8B4B8', '#FAF6F0', '#8B263E'],
          disableForReducedMotion: true,
        });
      } catch {}
    }, 1700);

    // 5. After 4.0s total, smoothly finish into the website
    setTimeout(() => {
      completeOpening();
    }, 4200);
  };

  const completeOpening = () => {
    setStep('finished');
    try {
      localStorage.setItem('abhinav_mansi_invitation_opened', 'true');
    } catch {}
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  const handleSkip = () => {
    // Trigger music if skipping directly
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('wedding_invitation_unfolded'));
    }
    completeOpening();
  };

  if (!hasCheckedStorage || isOpen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-700 ${
        step === 'finished' ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      } paper-grain bg-burgundy-900/80 backdrop-blur-md`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Opening Ceremony"
    >
      {/* Skip / Enter Action */}
      <button
        onClick={handleSkip}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-paper-50/90 hover:bg-paper-50 text-ink-title border border-gold-400/40 text-xs font-serif tracking-widest uppercase shadow-md transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-500"
      >
        <span>{step === 'envelope' ? 'Skip to Website' : 'Enter Website'}</span>
        <ArrowRight className="w-3.5 h-3.5 text-gold-700" />
      </button>

      {/* ================= STAGE 1: ENVELOPE WITH WAX SEAL ================= */}
      {step === 'envelope' && (
        <div className="relative w-full max-w-xl mx-auto rounded-3xl shadow-stationery-deep overflow-hidden stationery-card border-2 border-gold-400/40 p-6 sm:p-10 transition-transform duration-700 animate-fadeIn">
          
          {/* Inner Ornate Gilded Borders */}
          <div className="absolute inset-2 sm:inset-3 border border-gold-400/35 rounded-2xl pointer-events-none"></div>
          <div className="absolute inset-3 sm:inset-4 border border-dashed border-gold-400/20 rounded-xl pointer-events-none"></div>

          {/* Top Ganesh Blessing */}
          <div className="text-center relative z-10 pt-2 sm:pt-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto relative mb-2">
              <Image
                src="/assets/ganesh_transparent.png"
                alt="Lord Ganesha"
                fill
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>
            <p className="font-hindi text-burgundy-900 text-sm sm:text-base font-semibold tracking-wide">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="font-serif italic text-ink-secondary text-xs sm:text-sm mt-0.5">
              With the divine blessings of Almighty &amp; Our Elders
            </p>
          </div>

          {/* Central Cartouche Plaque */}
          <div className="my-5 sm:my-7 relative flex justify-center items-center">
            <div className="relative w-72 sm:w-96 h-28 sm:h-36 drop-shadow-md">
              <Image
                src="/assets/gold_plaque.png"
                alt="Abhinav weds Mansi Golden Plaque"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Invitation Lines */}
          <div className="text-center space-y-2 relative z-10 max-w-md mx-auto px-2">
            <p className="font-serif text-sm sm:text-base text-ink-title font-medium">
              Sh. Inder Pal &amp; Smt. Nirmala
            </p>
            <p className="text-xs sm:text-xs tracking-wider uppercase text-gold-700 font-sans font-semibold">
              cordially invite you to celebrate the marriage of their son
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink-title font-bold tracking-tight">
              Abhinav &amp; Mansi
            </h2>
            <p className="font-serif text-xs sm:text-sm text-ink-secondary italic">
              D/o Sh. Mahabir Prasad Sharma &amp; Smt. Babita Sharma
            </p>
          </div>

          {/* Interactive Wax Seal */}
          <div className="mt-8 mb-4 sm:mt-10 sm:mb-6 flex flex-col items-center justify-center relative z-20">
            <button
              onClick={handleStartOpening}
              className="group relative flex flex-col items-center focus:outline-none focus:ring-4 focus:ring-gold-400/50 rounded-full"
              aria-label="Break wax seal and open invitation"
            >
              <div className="absolute -inset-3 rounded-full bg-gold-400/25 group-hover:bg-gold-400/40 blur-md transition-all animate-pulse"></div>

              <div className="wax-seal-btn w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center relative z-10 cursor-pointer">
                <div className="border border-gold-300/40 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center">
                  <span className="font-display text-gold-200 text-lg sm:text-xl font-bold tracking-widest drop-shadow">
                    A &amp; M
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-gold-300/80 font-sans">
                    2026
                  </span>
                </div>
              </div>

              <div className="mt-3.5 flex items-center gap-1.5 text-burgundy-900 font-serif text-xs sm:text-sm font-semibold tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-very-slow" />
                <span>Tap Wax Seal to Open</span>
                <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-spin-very-slow" />
              </div>
              <p className="text-[11px] font-sans text-ink-muted">
                Experience the Sacred Metamorphosis
              </p>
            </button>
          </div>

          {/* Bottom Floral Illustration Bar */}
          <div className="relative w-full h-12 sm:h-16 mt-2 opacity-80 pointer-events-none">
            <Image
              src="/assets/floral_border.png"
              alt="Botanical floral border"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      )}

      {/* ================= STAGE 2: SACRED METAMORPHOSIS ANIMATION ================= */}
      {(step === 'transforming-shiva' || step === 'transforming-couple') && (
        <div className="relative w-full max-w-xl mx-auto rounded-3xl shadow-stationery-deep overflow-hidden stationery-card border-2 border-gold-400/50 p-6 sm:p-8 bg-paper-50 animate-fadeIn">
          
          {/* Ornate Gold Border Inner Accent */}
          <div className="absolute inset-2 sm:inset-3 border border-gold-400/35 rounded-2xl pointer-events-none z-30"></div>

          {/* Ceremony Header Badge */}
          <div className="text-center relative z-20 mb-4 space-y-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-100 border border-gold-400/40 text-burgundy-900 text-xs font-serif tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
              <span>Sacred Metamorphosis</span>
              <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
            </div>

            <p className="font-hindi text-sm sm:text-base text-gold-800 font-semibold tracking-wide transition-all duration-700">
              {step === 'transforming-shiva'
                ? '॥ शिव-पार्वती पाणिग्रहणम् ॥'
                : '॥ सदा सौभाग्यवती भव • पाणिग्रहण संस्कार ॥'}
            </p>
          </div>

          {/* Morphing Image Canvas Container */}
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-burgundy-950/20 shadow-inner border border-gold-400/30">
            
            {/* Layer 1: Lord Shiva & Goddess Parvati Sacred Hands */}
            <div
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                step === 'transforming-shiva'
                  ? 'opacity-100 scale-100 filter saturate-105'
                  : 'opacity-0 scale-105 filter blur-sm'
              }`}
            >
              <Image
                src="/assets/shiva_parvati.png"
                alt="Lord Shiva and Goddess Parvati Sacred Hands"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-transparent to-black/25"></div>
              
              {/* Divine Celestial Aura Light */}
              <div className="absolute inset-0 bg-radial-gold opacity-30 animate-pulse pointer-events-none"></div>

              {/* Tag for Shiva-Parvati */}
              <div className="absolute top-3 left-3 z-20">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold-400/40 text-gold-200 text-xs font-serif tracking-wider shadow">
                  🔱 Primordial Union of Shiva &amp; Shakti
                </span>
              </div>

              {/* Subtitle */}
              <div className="absolute bottom-3 inset-x-4 z-20 text-center text-paper-50 space-y-0.5">
                <h4 className="font-serif text-lg font-bold tracking-wide drop-shadow text-gold-100">
                  Divine Eternal Blessing
                </h4>
                <p className="font-serif italic text-xs text-paper-200 drop-shadow">
                  As ancient cosmic hands unite in eternal harmony...
                </p>
              </div>
            </div>

            {/* Layer 2: Abhinav & Mansi Real Engagement Ring Hands */}
            <div
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                step === 'transforming-couple'
                  ? 'opacity-100 scale-100 filter drop-shadow'
                  : 'opacity-0 scale-95'
              }`}
            >
              <Image
                src="/assets/couple_rings.jpg"
                alt="Abhinav & Mansi Real Engagement Ring Hands"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-transparent to-black/25"></div>

              {/* Romantic Sparkle Aura */}
              <div className="absolute inset-0 bg-radial-gold opacity-20 pointer-events-none"></div>

              {/* Tag for Couple */}
              <div className="absolute top-3 left-3 z-20">
                <span className="px-3 py-1 rounded-full bg-burgundy-900/80 backdrop-blur-md border border-gold-400/50 text-gold-200 text-xs font-serif tracking-wider shadow flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-gold-300 fill-gold-300" />
                  <span>Abhinav &amp; Mansi • The Promise Rings</span>
                </span>
              </div>

              {/* Subtitle */}
              <div className="absolute bottom-3 inset-x-4 z-20 text-center text-paper-50 space-y-0.5">
                <h4 className="font-serif text-lg font-bold tracking-wide drop-shadow text-gold-100">
                  The Sacred Vows of Love
                </h4>
                <p className="font-serif italic text-xs text-paper-200 drop-shadow">
                  ...So begins their eternal journey of devotion and joy.
                </p>
              </div>
            </div>

            {/* Glowing Golden Particle Flare During Transformation */}
            {step === 'transforming-couple' && (
              <div className="absolute inset-0 bg-gold-400/15 pointer-events-none animate-ping"></div>
            )}
          </div>

          {/* Progress / Status Bar Below */}
          <div className="mt-4 pt-3 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs font-serif text-burgundy-900">
              <span className={`transition-all duration-500 ${step === 'transforming-shiva' ? 'font-bold text-gold-700 scale-105' : 'text-ink-muted'}`}>
                1. Divine Shiva-Parvati
              </span>
              <span className="text-gold-500">→</span>
              <span className={`transition-all duration-500 ${step === 'transforming-couple' ? 'font-bold text-gold-700 scale-105' : 'text-ink-muted'}`}>
                2. Abhinav &amp; Mansi
              </span>
            </div>

            {/* Manual Enter Website Button */}
            <button
              onClick={completeOpening}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-ruby-600 hover:bg-ruby-700 text-white font-serif text-xs uppercase tracking-widest shadow-md transition-all hover:scale-105 border border-gold-400/40"
            >
              <span>Enter Wedding Website</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-300" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
