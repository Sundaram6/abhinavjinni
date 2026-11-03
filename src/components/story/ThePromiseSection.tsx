'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Sparkles, Check, Heart } from 'lucide-react';
import { SectionHeading, OrnamentalDivider } from '@/components/ui';

export default function ThePromiseSection() {
  return (
    <section id="the-promise" className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden bg-paper-100/40">
      
      {/* Background Golden Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-radial-gradient from-gold-400/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl"></div>

      {/* Chapter Heading */}
      <SectionHeading
        kicker="Chapter Three"
        title="The Promise Night"
        hindiTitle="॥ मुद्रिका परिणय संस्कार • The Engagement ॥"
        description="A cherished memory of golden chandeliers, shared vows, and the sacred exchange of engagement rings."
        dividerVariant="flourish"
      />

      {/* Main Feature Container */}
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Archival Museum Gilded Frame */}
        <div className="stationery-card p-6 sm:p-10 md:p-12 rounded-3xl border-2 border-gold-400/45 shadow-stationery-deep bg-paper-50 overflow-hidden">
          
          {/* Inner Ornate Filigree Border */}
          <div className="absolute inset-2 sm:inset-3 border border-gold-400/25 rounded-2xl pointer-events-none z-30"></div>
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-500/60 pointer-events-none z-30"></div>
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-500/60 pointer-events-none z-30"></div>
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-500/60 pointer-events-none z-30"></div>
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-500/60 pointer-events-none z-30"></div>

          {/* Top Memory Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold-300/30 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-serif italic text-xs sm:text-sm text-gold-800 font-semibold tracking-wider">
                A Past Memory Joyfully Celebrated
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] sm:text-xs font-sans font-semibold tracking-wider uppercase">
              <Check className="w-3.5 h-3.5 text-emerald-700" />
              <span>Tuesday, 20 October 2026</span>
            </span>
          </div>

          {/* Central Image Canvas: Actual Engagement Photograph */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-burgundy-950/20 shadow-inner border border-gold-400/30 mb-6">
            <Image
              src="/assets/photos/couple_rings.jpg"
              alt="Abhinav & Mansi authentic engagement rings with bridal henna"
              fill
              className="object-cover object-center filter saturate-105"
            />
            {/* Subtle Vignette Overlay for Warmth */}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-transparent to-transparent"></div>

            {/* Specular Diamond Glint over Solitaire */}
            <div className="absolute top-[22%] left-[41.5%] w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-spin-very-slow">
              <div className="w-full h-full relative flex items-center justify-center">
                <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_10px_#ffffff]"></div>
                <div className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_10px_#ffffff]"></div>
                <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#ffffff]"></div>
              </div>
            </div>

            {/* In-Image Caption */}
            <div className="absolute bottom-4 inset-x-4 text-center text-paper-50 space-y-0.5 z-20">
              <p className="font-serif text-lg sm:text-2xl font-bold text-gold-100 drop-shadow">
                The Sacred Promise Rings
              </p>
              <p className="font-serif italic text-xs sm:text-sm text-paper-200/90 drop-shadow">
                Hands united in bridal henna, kundan bangles, and everlasting devotion.
              </p>
            </div>
          </div>

          {/* Emotional Romantic Caption & Verified Details */}
          <div className="space-y-5 text-center sm:text-left">
            
            <p className="font-serif italic text-base sm:text-lg text-ink-primary leading-relaxed text-center max-w-2xl mx-auto">
              &ldquo;Under golden chandeliers and surrounded by the warm embrace of our elders, our hands united in an eternal promise of love, devotion, and lifelong companionship.&rdquo;
            </p>

            {/* Verified Venue & Memory Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-gold-300/30 text-xs font-sans">
              <div className="p-3.5 rounded-xl bg-paper-100/90 border border-gold-300/40 flex items-start gap-3">
                <Calendar className="w-4 h-4 text-ruby-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ink-title block">The Promise Night</span>
                  <p className="text-ink-secondary text-[11px] leading-relaxed">
                    Tuesday, 20 October 2026 • 7:00 PM Onwards<br />
                    Ring ceremony &amp; celebratory toasts with family and friends.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-paper-100/90 border border-gold-300/40 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ink-title block">The Royal Palace Banquet (By KhanaK)</span>
                  <p className="text-ink-secondary text-[11px] leading-relaxed">
                    Near JBM Global School, Block-B, Sector 132, Noida, Uttar Pradesh 201304.
                  </p>
                </div>
              </div>
            </div>

            {/* Traditional Sanskrit Shloka from the Noida Invitation */}
            <div className="p-3.5 rounded-xl bg-paper-100/70 border border-gold-400/30 text-center">
              <p className="font-hindi text-xs sm:text-sm text-gold-800 font-medium tracking-normal leading-relaxed">
                ॥ ऋद्धि सिद्धि के सहित पधारो गौरी पुत्र गणेश। कुटुम्ब सहित सब देव पधारो ब्रह्मा विष्णु, महेश ॥
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Flourish Transition to Wedding Celebrations */}
      <div className="mt-16 text-center">
        <OrnamentalDivider variant="floral" width="w-48 sm:w-64" className="mx-auto" />
      </div>

    </section>
  );
}
