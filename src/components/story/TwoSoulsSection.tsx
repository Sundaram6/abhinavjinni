'use client';

import React from 'react';
import { SectionHeading, OrnamentalDivider, RoyalPhotoFrame } from '@/components/ui';

export default function TwoSoulsSection() {
  return (
    <section id="two-souls" className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden border-t border-gold-400/20">
      
      {/* Chapter Heading */}
      <SectionHeading
        kicker="Chapter Two"
        title="Two Souls, One Story"
        hindiTitle="॥ रूपं रूपं प्रतिरूपो बभूव • वर-वधू परिचय ॥"
        description="Two journeys nurtured by family, tradition, and profound love, converging to embark upon a lifetime of shared dreams."
        dividerVariant="lotus"
      />

      {/* Main Two-Portrait Editorial Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start relative z-10">
        
        {/* ================= CARD 1: THE BRIDE — MANSI SHARMA ================= */}
        <RoyalPhotoFrame
          src="/assets/photos/mansi_solo.jpg"
          alt="Mansi Sharma — The Bride"
          aspectRatioClass="aspect-[3/4]"
          objectPosition="object-top"
          sizes="(max-width: 1024px) 100vw, 550px"
          overlayBadge={{
            text: "The Bride",
            hindiText: "॥ सौभाग्यवती कन्या ॥",
          }}
          overlayCaption={{
            title: "Mansi Sharma",
            subtitle: "Grace, Serenity & Poise",
          }}
        >
          {/* Lineage & Sentiment */}
          <div className="space-y-3 text-center sm:text-left">
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
        </RoyalPhotoFrame>

        {/* ================= CARD 2: THE GROOM — ABHINAV PAL ================= */}
        <RoyalPhotoFrame
          src="/assets/photos/abhinav_solo.jpg"
          alt="Abhinav Pal — The Groom"
          aspectRatioClass="aspect-[3/4]"
          objectPosition="object-top"
          sizes="(max-width: 1024px) 100vw, 550px"
          overlayBadge={{
            text: "The Groom",
            hindiText: "॥ चिरंजीव वर ॥",
          }}
          overlayCaption={{
            title: "Abhinav Pal",
            subtitle: "Devotion, Warmth & Noble Joy",
          }}
          className="lg:mt-6"
        >
          {/* Lineage & Sentiment */}
          <div className="space-y-3 text-center sm:text-left">
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
        </RoyalPhotoFrame>

      </div>

      {/* Central Botanical Transition to Chapter Three */}
      <div className="mt-16 text-center">
        <OrnamentalDivider variant="lotus" width="w-48 sm:w-64" className="mx-auto" />
      </div>

    </section>
  );
}
