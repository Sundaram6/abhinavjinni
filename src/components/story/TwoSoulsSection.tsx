'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Heart } from 'lucide-react';
import { SectionHeading, OrnamentalDivider } from '@/components/ui';

export default function TwoSoulsSection() {
  return (
    <section id="two-souls" className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden bg-heritage-ivory/60">
      
      {/* Decorative Archival Floral Undertones */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-gradient from-gold-400/5 via-transparent to-transparent pointer-events-none rounded-full blur-2xl"></div>

      {/* Chapter Heading */}
      <SectionHeading
        kicker="Chapter Two"
        title="Two Souls, One Story"
        hindiTitle="॥ रूपं रूपं प्रतिरूपो बभूव • वर-वधू परिचय ॥"
        description="Two journeys nurtured by family, tradition, and profound love, converging to embark upon a lifetime of shared dreams."
        dividerVariant="flourish"
      />

      {/* Main Two-Portrait Editorial Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start relative z-10">
        
        {/* ================= CARD 1: THE BRIDE — MANSI SHARMA ================= */}
        <div className="stationery-card p-5 sm:p-8 rounded-3xl border border-gold-400/35 shadow-stationery hover:shadow-stationery-deep transition-all duration-500 bg-paper-50 group lg:translate-y-2">
          
          {/* Inner Filigree Accent */}
          <div className="absolute inset-2 sm:inset-3 border border-gold-400/25 rounded-2xl pointer-events-none"></div>

          {/* Top Tag & Traditional Inscription */}
          <div className="flex items-center justify-between border-b border-gold-300/30 pb-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 text-ruby-600 border border-ruby-200 text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-ruby-600" />
              <span>The Bride</span>
            </span>

            <p className="font-hindi text-xs sm:text-sm text-gold-700 font-semibold tracking-normal">
              ॥ सौभाग्यवती कन्या ॥
            </p>
          </div>

          {/* Portrait Photograph: Mansi Sharma */}
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-burgundy-950/15 shadow-inner border border-gold-400/30 mb-5">
            <Image
              src="/assets/photos/mansi_solo.jpg"
              alt="Mansi Sharma — The Bride"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105 filter saturate-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/65 via-transparent to-transparent pointer-events-none"></div>

            {/* Inset Gold Archival Hairline */}
            <div className="absolute inset-2.5 sm:inset-3 border border-gold-400/30 rounded-xl pointer-events-none"></div>

            {/* Name Plaque on Image Bottom */}
            <div className="absolute bottom-3 inset-x-4 text-center text-paper-50 space-y-0.5 z-20">
              <span className="font-serif italic text-xs text-gold-200 tracking-wider block">
                Grace, Serenity &amp; Poise
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-100 leading-tight">
                Mansi Sharma
              </h3>
            </div>
          </div>

          {/* Lineage & Sentiment */}
          <div className="space-y-3 text-center sm:text-left px-1">
            <div className="border-b border-gold-300/25 pb-3">
              <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-gold-700 block">
                Daughter of
              </span>
              <p className="font-serif text-base sm:text-lg font-bold text-ink-title">
                Sh. Mahabir Prasad Sharma &amp; Smt. Babita Sharma
              </p>
            </div>

            <blockquote className="space-y-1">
              <p className="font-serif italic text-sm sm:text-base text-ink-primary leading-relaxed">
                &ldquo;In every quiet smile, shared laugh, and gentle conversation, I found a love that feels like coming home. Stepping into this sacred union surrounded by our families is my greatest joy.&rdquo;
              </p>
              <footer className="font-sans text-[11px] font-semibold text-gold-700 uppercase tracking-wider pt-1">
                — Mansi
              </footer>
            </blockquote>
          </div>

        </div>

        {/* ================= CARD 2: THE GROOM — ABHINAV PAL ================= */}
        <div className="stationery-card p-5 sm:p-8 rounded-3xl border border-gold-400/35 shadow-stationery hover:shadow-stationery-deep transition-all duration-500 bg-paper-50 group lg:mt-8">
          
          {/* Inner Filigree Accent */}
          <div className="absolute inset-2 sm:inset-3 border border-gold-400/25 rounded-2xl pointer-events-none"></div>

          {/* Top Tag & Traditional Inscription */}
          <div className="flex items-center justify-between border-b border-gold-300/30 pb-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>The Groom</span>
            </span>

            <p className="font-hindi text-xs sm:text-sm text-gold-700 font-semibold tracking-normal">
              ॥ चिरंजीव वर ॥
            </p>
          </div>

          {/* Portrait Photograph: Abhinav Pal */}
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-burgundy-950/15 shadow-inner border border-gold-400/30 mb-5">
            <Image
              src="/assets/photos/abhinav_solo.jpg"
              alt="Abhinav Pal — The Groom"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105 filter saturate-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/65 via-transparent to-transparent pointer-events-none"></div>

            {/* Inset Gold Archival Hairline */}
            <div className="absolute inset-2.5 sm:inset-3 border border-gold-400/30 rounded-xl pointer-events-none"></div>

            {/* Name Plaque on Image Bottom */}
            <div className="absolute bottom-3 inset-x-4 text-center text-paper-50 space-y-0.5 z-20">
              <span className="font-serif italic text-xs text-gold-200 tracking-wider block">
                Devotion, Warmth &amp; Noble Joy
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gold-100 leading-tight">
                Abhinav Pal
              </h3>
            </div>
          </div>

          {/* Lineage & Sentiment */}
          <div className="space-y-3 text-center sm:text-left px-1">
            <div className="border-b border-gold-300/25 pb-3">
              <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-gold-700 block">
                Son of
              </span>
              <p className="font-serif text-base sm:text-lg font-bold text-ink-title">
                Sh. Inder Pal &amp; Smt. Nirmala
              </p>
            </div>

            <blockquote className="space-y-1">
              <p className="font-serif italic text-sm sm:text-base text-ink-primary leading-relaxed">
                &ldquo;From our earliest talks to this momentous milestone, our bond grew naturally on trust, mutual respect, and laughter. With the blessings of our elders, I look forward to cherishing every chapter together.&rdquo;
              </p>
              <footer className="font-sans text-[11px] font-semibold text-gold-700 uppercase tracking-wider pt-1">
                — Abhinav
              </footer>
            </blockquote>
          </div>

        </div>

      </div>

      {/* Central Botanical Transition to Chapter Three */}
      <div className="mt-16 text-center">
        <OrnamentalDivider variant="minimal" width="w-36 sm:w-48" className="mx-auto" />
      </div>

    </section>
  );
}
