'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function SacredTransformation() {
  const [activeView, setActiveView] = useState<'couple' | 'shiva-parvati'>('couple');

  return (
    <div className="relative w-full max-w-xl mx-auto my-8 px-2 select-none">
      
      {/* Archival Museum Gilded Frame */}
      <div className="relative p-3 sm:p-5 rounded-3xl stationery-card border-2 border-gold-400/40 shadow-stationery-deep bg-paper-50 overflow-hidden">
        
        {/* Ornate Gold Filigree Inner Border */}
        <div className="absolute inset-2 sm:inset-3 border border-gold-400/30 rounded-2xl pointer-events-none z-20"></div>

        {/* Corner Flourish Accents */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-500/60 pointer-events-none z-20"></div>
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-500/60 pointer-events-none z-20"></div>
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-500/60 pointer-events-none z-20"></div>
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-500/60 pointer-events-none z-20"></div>

        {/* Image Canvas Container */}
        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-burgundy-950/20 shadow-inner">
          
          {/* Layer 1: Divine Shiva & Parvati Blessing */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
              activeView === 'shiva-parvati' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src="/assets/shiva_parvati.png"
              alt="Lord Shiva and Goddess Parvati Sacred Hands"
              fill
              className="object-cover object-center filter saturate-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/75 via-transparent to-black/20"></div>
          </div>

          {/* Layer 2: Abhinav & Mansi Authentic Engagement Rings Photograph */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
              activeView === 'couple' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src="/assets/couple_rings.jpg"
              alt="Abhinav & Mansi Engagement Rings"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/75 via-transparent to-black/20"></div>

            {/* Specular Glint on Diamond Solitaire */}
            <div className="absolute top-[22%] left-[41.5%] w-5 h-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-spin-very-slow">
              <div className="w-full h-full relative flex items-center justify-center">
                <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_8px_#ffffff]"></div>
                <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_8px_#ffffff]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#ffffff]"></div>
              </div>
            </div>
          </div>

          {/* Bottom Inscription */}
          <div className="absolute bottom-4 inset-x-4 z-20 text-center text-paper-50 space-y-0.5">
            <h4 className="font-serif text-base sm:text-lg font-bold tracking-wide drop-shadow-md text-gold-100">
              {activeView === 'couple'
                ? 'Hands of Love & Lifelong Devotion'
                : 'Primordial Union of Shiva & Shakti'}
            </h4>
            <p className="font-serif italic text-xs text-paper-200/90 drop-shadow">
              {activeView === 'couple'
                ? 'The Promise Night — 20 October 2026'
                : 'May their union be blessed with cosmic harmony'}
            </p>
          </div>
        </div>

        {/* Refined Understated View Toggle */}
        <div className="mt-4 pt-3 border-t border-gold-300/30 flex items-center justify-center gap-2">
          <div className="inline-flex p-1 rounded-full bg-paper-100 border border-gold-400/30">
            <button
              onClick={() => setActiveView('couple')}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all ${
                activeView === 'couple'
                  ? 'bg-ruby-600 text-white shadow-sm font-semibold'
                  : 'text-ink-secondary hover:text-ruby-600'
              }`}
            >
              The Promise Rings
            </button>
            <button
              onClick={() => setActiveView('shiva-parvati')}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all ${
                activeView === 'shiva-parvati'
                  ? 'bg-ruby-600 text-white shadow-sm font-semibold'
                  : 'text-ink-secondary hover:text-ruby-600'
              }`}
            >
              Divine Blessings
            </button>
          </div>
        </div>

      </div>

      {/* Narrative Shloka / Subtitle */}
      <div className="text-center mt-3">
        <p className="font-hindi text-sm text-gold-700 font-medium">
          ॥ शिव-पार्वती पाणिग्रहणम् से अनन्त प्रेम का साक्षात्कार ॥
        </p>
      </div>

    </div>
  );
}
