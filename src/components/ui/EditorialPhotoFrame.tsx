'use client';

import React from 'react';
import Image from 'next/image';
import { PhotoSlot, PhotoSlotId, getPhotoSlot } from '@/data/photographyConfig';
import IllustratedPlaceholder from './IllustratedPlaceholder';

interface EditorialPhotoFrameProps {
  slotId?: PhotoSlotId;
  slot?: PhotoSlot;
  priority?: boolean;
  className?: string;
  showCaption?: boolean;
}

export default function EditorialPhotoFrame({
  slotId,
  slot: customSlot,
  priority = false,
  className = '',
  showCaption = true,
}: EditorialPhotoFrameProps) {
  const currentSlot = customSlot || (slotId ? getPhotoSlot(slotId) : null);

  if (!currentSlot) {
    return null;
  }

  const { title, imageSrc, isPlaceholder, aspectClass, alt, caption, storySnippet } = currentSlot;

  return (
    <figure className={`flex flex-col stationery-card p-3 sm:p-5 rounded-3xl border border-gold-400/35 shadow-stationery hover:shadow-stationery-deep transition-all duration-500 bg-heritage-ivory ${className}`}>
      
      {/* Visual Canvas Container */}
      <div className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden bg-paper-200 border border-gold-400/25 shadow-inner`}>
        
        {/* Render either real photograph or the authentic heirloom placeholder */}
        {imageSrc && !isPlaceholder ? (
          <>
            <Image
              src={imageSrc}
              alt={alt}
              fill
              priority={priority}
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle Vignette for Archival Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/60 via-transparent to-transparent pointer-events-none"></div>

            {/* Inset Gold Filigree Border */}
            <div className="absolute inset-2 sm:inset-3 border border-gold-400/30 rounded-xl pointer-events-none"></div>
          </>
        ) : (
          <IllustratedPlaceholder slot={currentSlot} />
        )}
      </div>

      {/* Editorial Caption Underneath */}
      {showCaption && (
        <figcaption className="mt-4 px-2 space-y-1 text-center">
          <h4 className="font-serif text-lg sm:text-xl font-bold text-ink-title leading-snug">
            {title}
          </h4>
          <p className="font-sans text-xs text-ink-secondary leading-relaxed">
            {caption}
          </p>
          {storySnippet && (
            <p className="font-serif italic text-[11px] text-gold-700 pt-0.5">
              {storySnippet}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
