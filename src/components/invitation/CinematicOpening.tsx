'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CinematicOpeningProps {
  isOpen: boolean;
  onOpen: () => void;
}

type Stage = 'shiva-parvati' | 'couple-rings' | 'invitation-reveal';

export default function CinematicOpening({ isOpen, onOpen }: CinematicOpeningProps) {
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const [stage, setStage] = useState<Stage>('shiva-parvati');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 1. First-visit check: Returning visitors bypass intro immediately
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const hasSeenIntro = localStorage.getItem('abhinav_mansi_intro_seen');
      const isExplicitSkip =
        window.location.search.includes('skip=1') ||
        window.location.search.includes('opened=1');
      const isExplicitReplay = window.location.search.includes('replay=1');

      if ((hasSeenIntro === 'true' && !isExplicitReplay) || isExplicitSkip) {
        onOpen();
      }
    }
    setHasCheckedStorage(true);
  }, [onOpen]);

  // 2. Automated Sequence Choreography (Shiva-Parvati -> Real Rings -> Invitation Reveal)
  useEffect(() => {
    if (isOpen || !hasCheckedStorage || prefersReducedMotion) return;

    setStage('shiva-parvati');
    setIsFadingOut(false);

    // After 2.4s: transition to real couple engagement hands
    const timer1 = setTimeout(() => {
      setStage('couple-rings');
    }, 2400);

    // After 4.8s: reveal names, date, and Enter button
    const timer2 = setTimeout(() => {
      setStage('invitation-reveal');
    }, 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen, hasCheckedStorage, prefersReducedMotion]);

  // 3. Complete intro and record first visit in localStorage
  const handleComplete = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);

    try {
      localStorage.setItem('abhinav_mansi_intro_seen', 'true');
    } catch {}

    // Signal audio player to be ready
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('wedding_invitation_unfolded'));
    }

    setTimeout(() => {
      onOpen();
      setIsFadingOut(false);
    }, 600);
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!hasCheckedStorage || isOpen) {
    return null;
  }

  // Reduced motion accessible fallback
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-heritage-ivory/98 backdrop-blur-md">
        <div className="relative w-full max-w-md p-8 rounded-3xl stationery-card border-2 border-gold-400/50 text-center space-y-4 shadow-stationery-deep">
          <p className="font-hindi text-burgundy-900 font-semibold tracking-normal">॥ श्री गणेशाय नमः ॥</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink-title font-bold">Abhinav &amp; Mansi</h2>
          <p className="text-xs font-sans uppercase tracking-widest text-gold-700 font-semibold">
            3rd December 2026 • Bodhgaya, Bihar
          </p>
          <button
            onClick={handleComplete}
            className="w-full py-3 rounded-full bg-ruby-600 text-white font-sans font-semibold tracking-wider uppercase text-xs hover:bg-ruby-700 transition-colors shadow-md border border-gold-400/40"
          >
            Enter Celebration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#FAF6F0] overflow-hidden select-none transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Abhinav &amp; Mansi Cinematic Wedding Opening"
    >
      {/* Sophisticated Warm Ivory & Champagne Background Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F0] via-[#F5EBE1] to-[#FAF1EE] opacity-95"></div>

      {/* Subtle Antique Gold Ambient Halo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-radial-gradient from-gold-400/15 via-transparent to-transparent blur-3xl animate-pulse-gentle"></div>
      </div>

      {/* Floating Petal Accents */}
      <div className="petal-particle p1"></div>
      <div className="petal-particle p2"></div>
      <div className="petal-particle p3"></div>
      <div className="petal-particle p4"></div>
      <div className="petal-particle p5"></div>

      {/* Top Header Controls: Skip Button */}
      <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold-600 animate-ping"></span>
          <span className="font-serif italic text-xs sm:text-sm text-gold-800 tracking-wider">
            A Story in Bloom • A Divine Beginning
          </span>
        </div>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-paper-50/90 hover:bg-paper-100 text-ink-title border border-gold-400/40 backdrop-blur-md text-xs font-sans font-semibold tracking-wider uppercase shadow-sm transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-400"
          aria-label="Skip intro and view wedding website"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5 text-gold-700" />
        </button>
      </div>

      {/* Main Archival Canvas Container */}
      <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center z-20">
        
        {/* Archival Museum Gilded Frame */}
        <div className="relative w-full p-4 sm:p-6 rounded-3xl stationery-card border-2 border-gold-400/45 shadow-stationery-deep bg-paper-50 overflow-hidden">
          
          {/* Inner Ornate Filigree Border */}
          <div className="absolute inset-2 sm:inset-3 border border-gold-400/30 rounded-2xl pointer-events-none z-30"></div>
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-500/60 pointer-events-none z-30"></div>
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-500/60 pointer-events-none z-30"></div>
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-500/60 pointer-events-none z-30"></div>
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-500/60 pointer-events-none z-30"></div>

          {/* Top Traditional Benedictory Inscription */}
          <div className="text-center mb-3 relative z-20 space-y-0.5">
            <p className="font-hindi text-sm sm:text-base text-burgundy-900 font-semibold tracking-normal leading-relaxed">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <p className="font-serif italic text-xs text-ink-secondary">
              {stage === 'shiva-parvati'
                ? 'The Divine Beginning — Primordial Blessings'
                : 'The Sacred Vows of Love & Lifelong Devotion'}
            </p>
          </div>

          {/* Morphing Visual Canvas with Layered Match Cut */}
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-burgundy-950/15 shadow-inner border border-gold-400/30">
            
            {/* Layer 1: Divine Hands of Shiva & Parvati */}
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                stage === 'shiva-parvati' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Image
                src="/assets/shiva_parvati.png"
                alt="Divine Hands of Lord Shiva and Goddess Parvati"
                fill
                priority
                className="object-cover object-center filter saturate-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/70 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-3 inset-x-4 text-center text-paper-50 space-y-0.5 z-20">
                <p className="font-hindi text-xs sm:text-sm text-gold-200 font-medium tracking-normal">
                  ॥ शिव-पार्वती पाणिग्रहणम् ॥
                </p>
                <p className="font-serif italic text-[11px] text-paper-200/90">
                  As ancient cosmic hands unite in eternal harmony...
                </p>
              </div>
            </div>

            {/* Layer 2: Authentic Engagement Hands & Rings of Abhinav & Mansi */}
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                stage === 'couple-rings' || stage === 'invitation-reveal'
                  ? 'opacity-100'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <Image
                src="/assets/photos/couple_rings.jpg"
                alt="Abhinav & Mansi Real Engagement Rings"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/75 via-transparent to-transparent"></div>

              {/* Specular Diamond Glint */}
              <div className="absolute top-[22%] left-[41.5%] w-5 h-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-spin-very-slow">
                <div className="w-full h-full relative flex items-center justify-center">
                  <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_8px_#ffffff]"></div>
                  <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_8px_#ffffff]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#ffffff]"></div>
                </div>
              </div>

              <div className="absolute bottom-3 inset-x-4 text-center text-paper-50 space-y-0.5 z-20">
                <p className="font-serif text-sm sm:text-base font-bold text-gold-100">
                  Hands of Love &amp; Lifelong Devotion
                </p>
                <p className="font-serif italic text-[11px] text-paper-200/90">
                  The Promise Night • 20 October 2026
                </p>
              </div>
            </div>

          </div>

          {/* Reveal Area: Couple Names, Date & Enter Button */}
          <div className="mt-4 pt-3 border-t border-gold-300/35 text-center space-y-3">
            
            <div className="space-y-1">
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-ink-title tracking-tight">
                Abhinav <span className="font-serif italic text-gold-600 font-normal">&amp;</span> Mansi
              </h1>

              <div className="flex items-center justify-center gap-2 text-xs font-sans text-gold-800 font-semibold uppercase tracking-wider">
                <span>3rd December 2026 • Bodhgaya</span>
                <span className="w-1 h-1 rounded-full bg-gold-500"></span>
                <span>20th October 2026 • Noida</span>
              </div>
            </div>

            {/* Enter Celebration CTA Button */}
            <div className="pt-1">
              <button
                onClick={handleComplete}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-ruby-600 hover:bg-ruby-700 text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-gold-400/50"
              >
                <span>Enter Celebration</span>
                <ArrowRight className="w-4 h-4 text-gold-300" />
              </button>
            </div>

            {/* Sequence Status Indicator Dots */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <span
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  stage === 'shiva-parvati' ? 'bg-gold-600 scale-125' : 'bg-gold-300/60'
                }`}
                title="Divine Beginning"
              ></span>
              <span
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  stage === 'couple-rings' ? 'bg-gold-600 scale-125' : 'bg-gold-300/60'
                }`}
                title="The Promise Rings"
              ></span>
              <span
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  stage === 'invitation-reveal' ? 'bg-ruby-600 scale-125' : 'bg-gold-300/60'
                }`}
                title="Invitation"
              ></span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
