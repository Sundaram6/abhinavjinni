'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Heart } from 'lucide-react';
import { SectionHeading } from '@/components/ui';
import { WEDDING_DATA } from '@/data/weddingData';

export default function OurFamiliesSection() {
  return (
    <section id="families" className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden bg-heritage-ivory/80">
      
      {/* Decorative Archival Floral Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-gradient from-gold-400/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl"></div>

      {/* Chapter Four Heading */}
      <SectionHeading
        kicker="Chapter Four"
        title="Our Families"
        hindiTitle="॥ कुलदीपकः कुलप्रदीपः • माता-पिता आशीर्वाद ॥"
        description="Two revered families united by deep tradition, mutual respect, and boundless love for their children."
        dividerVariant="flourish"
      />

      {/* Side-by-Side Heirloom Family Frames */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-14 items-start relative z-10">
        
        {/* ================= FAMILY 1: THE SHARMA FAMILY (BRIDE'S PARENTS) ================= */}
        <div className="stationery-card p-5 sm:p-8 rounded-3xl border border-gold-400/40 shadow-stationery hover:shadow-stationery-deep transition-all duration-500 bg-paper-50 group">
          
          {/* Inner Filigree Accent */}
          <div className="absolute inset-2 sm:inset-3 border border-gold-400/25 rounded-2xl pointer-events-none"></div>

          {/* Top Label */}
          <div className="flex items-center justify-between border-b border-gold-300/30 pb-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 text-ruby-600 border border-ruby-200 text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-ruby-600" />
              <span>Bride&apos;s Family</span>
            </span>

            <p className="font-hindi text-xs sm:text-sm text-gold-700 font-semibold tracking-normal">
              ॥ वधू पक्ष स्नेह ॥
            </p>
          </div>

          {/* Heirloom Photograph Canvas */}
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-burgundy-950/15 shadow-inner border border-gold-400/30 mb-5">
            <Image
              src="/assets/photos/mansi_family.jpg"
              alt="Sh. Mahabir Prasad Sharma & Smt. Babita Sharma"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105 filter saturate-105"
            />
            {/* Subtle Vignette for Archival Feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/65 via-transparent to-transparent pointer-events-none"></div>

            {/* Inset Gold Archival Hairline */}
            <div className="absolute inset-2.5 sm:inset-3 border border-gold-400/30 rounded-xl pointer-events-none"></div>

            {/* Bottom Caption on Image */}
            <div className="absolute bottom-3 inset-x-4 text-center text-paper-50 space-y-0.5 z-20">
              <span className="font-serif italic text-xs text-gold-200 tracking-wider block">
                Warm Welcome &amp; Affection
              </span>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-gold-100 leading-tight">
                {WEDDING_DATA.family.brideParents}
              </h3>
            </div>
          </div>

          {/* Lineage & Blessing Sentiment */}
          <div className="space-y-3 text-center sm:text-left px-1">
            <div className="border-b border-gold-300/25 pb-3">
              <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-gold-700 block">
                The Sharma Family
              </span>
              <p className="font-serif text-base sm:text-lg font-bold text-ink-title">
                Sh. Mahabir Prasad Sharma &amp; Smt. Babita Sharma
              </p>
            </div>

            <p className="font-serif italic text-sm sm:text-base text-ink-primary leading-relaxed">
              &ldquo;With profound gratitude and joyous hearts, we welcome our honored guests to join us as our daughter Mansi begins this auspicious chapter of love and companionship.&rdquo;
            </p>
          </div>

        </div>

        {/* ================= FAMILY 2: THE PAL FAMILY (GROOM'S PARENTS) ================= */}
        <div className="stationery-card p-5 sm:p-8 rounded-3xl border border-gold-400/40 shadow-stationery hover:shadow-stationery-deep transition-all duration-500 bg-paper-50 group lg:mt-6">
          
          {/* Inner Filigree Accent */}
          <div className="absolute inset-2 sm:inset-3 border border-gold-400/25 rounded-2xl pointer-events-none"></div>

          {/* Top Label */}
          <div className="flex items-center justify-between border-b border-gold-300/30 pb-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Groom&apos;s Family</span>
            </span>

            <p className="font-hindi text-xs sm:text-sm text-gold-700 font-semibold tracking-normal">
              ॥ वर पक्ष आशीर्वाद ॥
            </p>
          </div>

          {/* Heirloom Photograph Canvas */}
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-burgundy-950/15 shadow-inner border border-gold-400/30 mb-5">
            <Image
              src="/assets/photos/abhinav_family.jpg"
              alt="Sh. Inder Pal & Smt. Nirmala"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105 filter saturate-105"
            />
            {/* Subtle Vignette for Archival Feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/65 via-transparent to-transparent pointer-events-none"></div>

            {/* Inset Gold Archival Hairline */}
            <div className="absolute inset-2.5 sm:inset-3 border border-gold-400/30 rounded-xl pointer-events-none"></div>

            {/* Bottom Caption on Image */}
            <div className="absolute bottom-3 inset-x-4 text-center text-paper-50 space-y-0.5 z-20">
              <span className="font-serif italic text-xs text-gold-200 tracking-wider block">
                Blessings, Honor &amp; Devotion
              </span>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-gold-100 leading-tight">
                {WEDDING_DATA.family.groomParents}
              </h3>
            </div>
          </div>

          {/* Lineage & Blessing Sentiment */}
          <div className="space-y-3 text-center sm:text-left px-1">
            <div className="border-b border-gold-300/25 pb-3">
              <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-gold-700 block">
                The Pal Family
              </span>
              <p className="font-serif text-base sm:text-lg font-bold text-ink-title">
                Sh. Inder Pal &amp; Smt. Nirmala
              </p>
            </div>

            <p className="font-serif italic text-sm sm:text-base text-ink-primary leading-relaxed">
              &ldquo;With boundless happiness and the blessings of our elders, we celebrate Abhinav and Mansi stepping into a lifetime of shared dreams, harmony, and eternal togetherness.&rdquo;
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
