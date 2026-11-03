'use client';

import React from 'react';
import Image from 'next/image';

interface RoyalPhotoFrameProps {
  src: string;
  alt: string;
  aspectRatioClass?: string; // e.g. 'aspect-[3/2]' for couple, 'aspect-[3/4]' for portraits
  objectPosition?: string;   // e.g. 'object-top' or 'object-center'
  priority?: boolean;
  sizes?: string;
  overlayBadge?: {
    text: string;
    hindiText?: string;
  };
  overlayCaption?: {
    title?: string;
    subtitle?: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export default function RoyalPhotoFrame({
  src,
  alt,
  aspectRatioClass = 'aspect-[3/4]',
  objectPosition = 'object-top',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 600px',
  overlayBadge,
  overlayCaption,
  className = '',
  children,
}: RoyalPhotoFrameProps) {
  return (
    <div
      className={`stationery-card p-4 sm:p-6 rounded-3xl border border-gold-400/35 shadow-stationery hover:shadow-stationery-deep transition-all duration-500 bg-paper-50 group relative ${className}`}
    >
      {/* Top Badge & Traditional Expression (if provided) */}
      {overlayBadge && (
        <div className="flex items-center justify-between border-b border-gold-300/30 pb-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-paper-100 text-ruby-700 border border-gold-300/40 text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider uppercase">
            <span>{overlayBadge.text}</span>
          </span>

          {overlayBadge.hindiText && (
            <p className="font-hindi text-xs sm:text-sm text-gold-800 font-semibold tracking-normal">
              {overlayBadge.hindiText}
            </p>
          )}
        </div>
      )}

      {/* The Central Photograph Canvas */}
      <div
        className={`relative ${aspectRatioClass} w-full rounded-2xl overflow-hidden bg-burgundy-950/10 shadow-inner border border-gold-400/30`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${objectPosition} transition-transform duration-700 group-hover:scale-102`}
        />

        {/* Subtle Archival Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/60 via-transparent to-transparent pointer-events-none"></div>

        {/* Coordinated Thin Gold Inset Rule */}
        <div className="absolute inset-2 sm:inset-2.5 border border-gold-400/30 rounded-xl pointer-events-none"></div>

        {/* Subtle Traditional Indian Temple Corner Accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold-400/70 pointer-events-none"></div>
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-gold-400/70 pointer-events-none"></div>
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-gold-400/70 pointer-events-none"></div>
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold-400/70 pointer-events-none"></div>

        {/* In-Photo Bottom Caption Plaque (if provided) */}
        {overlayCaption && (
          <div className="absolute bottom-3 inset-x-3 text-center text-paper-50 space-y-0.5 z-20">
            {overlayCaption.subtitle && (
              <span className="font-serif italic text-xs text-gold-200 tracking-wider block drop-shadow-sm">
                {overlayCaption.subtitle}
              </span>
            )}
            {overlayCaption.title && (
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-gold-100 leading-tight drop-shadow-sm">
                {overlayCaption.title}
              </h3>
            )}
          </div>
        )}
      </div>

      {/* Content / Narrative Area Below Photograph */}
      {children && <div className="mt-5 space-y-3 px-1">{children}</div>}
    </div>
  );
}
