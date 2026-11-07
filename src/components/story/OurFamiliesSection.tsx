'use client';

import React from 'react';
import { SectionHeading, OrnamentalDivider, RoyalPhotoFrame } from '@/components/ui';
import { WEDDING_DATA } from '@/data/weddingData';

export default function OurFamiliesSection() {
  return (
    <section id="families" className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden border-t border-gold-400/20">
      
      {/* Chapter Five Heading */}
      <SectionHeading
        kicker="Chapter Five"
        title="Our Families"
        hindiTitle="॥ कुलदीपकः कुलप्रदीपः • माता-पिता आशीर्वाद ॥"
        description="Two revered families united by deep tradition, mutual respect, and boundless love for their children."
        dividerVariant="lotus"
      />

      {/* Side-by-Side Heirloom Family Frames */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start relative z-10">
        
        {/* ================= FAMILY 1: THE SHARMA FAMILY (BRIDE'S PARENTS) ================= */}
        <RoyalPhotoFrame
          src="/assets/photos/mansi_family.jpg"
          alt="Sh. Mahabir Prasad Sharma & Smt. Babita Sharma"
          aspectRatioClass="aspect-[3/4]"
          objectPosition="object-top"
          sizes="(max-width: 1024px) 100vw, 550px"
          overlayBadge={{
            text: "Bride's Family",
            hindiText: "॥ वधू पक्ष स्नेह ॥",
          }}
          overlayCaption={{
            title: WEDDING_DATA.family.brideParents,
            subtitle: "Warm Welcome & Affection",
          }}
        >
          {/* Lineage & Blessing Sentiment */}
          <div className="space-y-3 text-center sm:text-left">
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
        </RoyalPhotoFrame>

        {/* ================= FAMILY 2: THE PAL FAMILY (GROOM'S PARENTS) ================= */}
        <RoyalPhotoFrame
          src="/assets/photos/abhinav_family.jpg"
          alt="Sh. Inder Pal & Smt. Nirmala"
          aspectRatioClass="aspect-[3/4]"
          objectPosition="object-top"
          sizes="(max-width: 1024px) 100vw, 550px"
          overlayBadge={{
            text: "Groom's Family",
            hindiText: "॥ वर पक्ष आशीर्वाद ॥",
          }}
          overlayCaption={{
            title: WEDDING_DATA.family.groomParents,
            subtitle: "Blessings, Honor & Devotion",
          }}
          className="lg:mt-6"
        >
          {/* Lineage & Blessing Sentiment */}
          <div className="space-y-3 text-center sm:text-left">
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
        </RoyalPhotoFrame>

      </div>

      {/* Central Botanical Transition to Chapter Five */}
      <div className="mt-16 text-center">
        <OrnamentalDivider variant="lotus" width="w-48 sm:w-64" className="mx-auto" />
      </div>

    </section>
  );
}
