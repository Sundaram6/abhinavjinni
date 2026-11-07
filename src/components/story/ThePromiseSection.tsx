'use client';

import React from 'react';
import { Calendar, MapPin, Check } from 'lucide-react';
import { SectionHeading, OrnamentalDivider, RoyalPhotoFrame } from '@/components/ui';

export default function ThePromiseSection() {
  return (
    <section id="the-promise" className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden border-t border-gold-400/20">
      
      {/* Chapter Five Heading */}
      <SectionHeading
        kicker="Chapter Five"
        title="The Promise Night"
        hindiTitle="॥ मुद्रिका परिणय संस्कार • The Engagement ॥"
        description="A cherished memory of golden chandeliers, shared vows, and the sacred exchange of engagement rings."
        dividerVariant="lotus"
      />

      {/* Main Feature Container */}
      <div className="max-w-4xl mx-auto relative z-10">
        
        <RoyalPhotoFrame
          src="/assets/photos/couple_rings.jpg"
          alt="Abhinav & Mansi authentic engagement rings on The Promise Night"
          aspectRatioClass="aspect-[16/10] sm:aspect-[16/9]"
          objectPosition="object-center"
          sizes="(max-width: 768px) 100vw, 850px"
          overlayBadge={{
            text: "Tuesday, 20 October 2026",
            hindiText: "॥ विगत स्मृति • मंगल परिणय ॥",
          }}
          overlayCaption={{
            title: "The Sacred Promise Rings",
            subtitle: "Hands united in bridal henna, kundan bangles, and everlasting devotion.",
          }}
        >
          {/* Emotional Romantic Caption & Verified Details */}
          <div className="space-y-5 text-center sm:text-left pt-1">
            
            <p className="font-serif italic text-base sm:text-lg text-ink-primary leading-relaxed text-center max-w-2xl mx-auto">
              &ldquo;Under golden chandeliers and surrounded by the warm embrace of our elders, our hands united in an eternal promise of love, devotion, and lifelong companionship.&rdquo;
            </p>

            {/* Verified Venue & Memory Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-gold-300/30 text-xs font-sans">
              <div className="p-3.5 rounded-xl bg-paper-100/80 border border-gold-300/40 flex items-start gap-3">
                <Calendar className="w-4 h-4 text-ruby-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-ink-title block">The Promise Night</span>
                  <p className="text-ink-secondary text-[11px] leading-relaxed">
                    Tuesday, 20 October 2026 • 7:00 PM Onwards<br />
                    Ring ceremony &amp; celebratory dinner in Noida.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-paper-100/80 border border-gold-300/40 flex items-start gap-3">
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
        </RoyalPhotoFrame>

      </div>

      {/* Bottom Flourish Transition to Wedding Celebrations */}
      <div className="mt-16 text-center">
        <OrnamentalDivider variant="lotus" width="w-48 sm:w-64" className="mx-auto" />
      </div>

    </section>
  );
}
