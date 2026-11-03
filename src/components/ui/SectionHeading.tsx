'use client';

import React from 'react';
import OrnamentalDivider from './OrnamentalDivider';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  hindiTitle?: string;
  shloka?: string;
  description?: string;
  align?: 'center' | 'left';
  dividerVariant?: 'lotus' | 'minimal' | 'mandala' | 'none';
  className?: string;
}

export default function SectionHeading({
  kicker,
  title,
  hindiTitle,
  shloka,
  description,
  align = 'center',
  dividerVariant = 'lotus',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`space-y-3 mb-12 sm:mb-16 relative z-10 ${
        isCenter ? 'text-center max-w-4xl mx-auto' : 'text-left max-w-2xl'
      } ${className}`}
    >
      {/* 1. Kicker / Chapter Tag */}
      {kicker && (
        <div className={`flex items-center gap-2.5 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <span className="h-[1px] w-6 sm:w-8 bg-gold-400/50"></span>
          <span className="w-1 h-1 rotate-45 bg-gold-600/80"></span>
          <span className="font-serif italic text-xs tracking-widest text-gold-700 font-semibold uppercase px-1">
            {kicker}
          </span>
          <span className="w-1 h-1 rotate-45 bg-gold-600/80"></span>
          <span className="h-[1px] w-6 sm:w-8 bg-gold-400/50"></span>
        </div>
      )}

      {/* 2. Primary English Title */}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink-title font-bold tracking-tight leading-tight">
        {title}
      </h2>

      {/* 3. Hindi Title / Traditional Expression */}
      {hindiTitle && (
        <p className="font-hindi text-sm sm:text-base text-gold-800 font-semibold tracking-normal leading-relaxed">
          {hindiTitle}
        </p>
      )}

      {/* 4. Traditional Shloka Card (if provided) */}
      {shloka && (
        <div className="my-2 p-3 sm:p-4 rounded-2xl bg-paper-100/70 border border-gold-400/30 max-w-lg mx-auto shadow-sm">
          <p className="font-hindi text-xs sm:text-sm text-ink-primary leading-relaxed tracking-normal">
            {shloka}
          </p>
        </div>
      )}

      {/* 5. Editorial Supporting Description */}
      {description && (
        <p className="font-sans text-xs sm:text-sm md:text-base text-ink-secondary max-w-2xl mx-auto leading-relaxed pt-0.5">
          {description}
        </p>
      )}

      {/* 6. Unified Traditional Lotus Divider */}
      {dividerVariant !== 'none' && (
        <div className={`pt-2 ${isCenter ? 'flex justify-center' : 'flex justify-start'}`}>
          <OrnamentalDivider variant={dividerVariant} />
        </div>
      )}
    </div>
  );
}
