'use client';

import React from 'react';
import { PhotoSlot } from '@/data/photographyConfig';
import { Sparkles } from 'lucide-react';

interface IllustratedPlaceholderProps {
  slot: PhotoSlot;
  className?: string;
}

export default function IllustratedPlaceholder({
  slot,
  className = '',
}: IllustratedPlaceholderProps) {
  const { placeholder, slotNumber } = slot;

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 bg-gradient-to-b from-heritage-ivory via-heritage-champagne to-paper-100 border border-gold-400/35 overflow-hidden select-none text-center ${className}`}
    >
      {/* Decorative Guilloche / Mandala Background Ring */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-dashed border-gold-600 animate-spin-very-slow"></div>
        <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-gold-600"></div>
      </div>

      {/* Ornate Corner Flourishes */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold-500/50 pointer-events-none"></div>
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold-500/50 pointer-events-none"></div>
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold-500/50 pointer-events-none"></div>
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold-500/50 pointer-events-none"></div>

      {/* Top Header: Slot Tag & Sanskrit Benediction */}
      <div className="relative z-10 space-y-1 pt-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-50/80 border border-gold-400/40 text-gold-700 font-sans text-[10px] font-semibold tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3 h-3 text-gold-600" />
          <span>Slot {slotNumber} • Heirloom Gallery</span>
        </span>

        <p className="font-hindi text-xs sm:text-sm text-burgundy-900 font-semibold tracking-normal pt-1">
          {placeholder.devaText}
        </p>
      </div>

      {/* Center Motif / Traditional Emblem */}
      <div className="relative z-10 my-4 flex flex-col items-center justify-center space-y-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-paper-50 border border-gold-400/50 flex items-center justify-center shadow-inner relative group">
          <div className="text-2xl sm:text-3xl filter drop-shadow">
            {placeholder.symbol}
          </div>
          {/* Subtle Golden Halo */}
          <div className="absolute inset-0 rounded-full border border-gold-300 animate-ping opacity-20 pointer-events-none"></div>
        </div>

        <div className="space-y-1 max-w-xs">
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-ink-title leading-tight">
            {placeholder.heading}
          </h4>
          <p className="font-serif italic text-xs text-ink-secondary">
            {placeholder.subheading}
          </p>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="relative z-10 pt-2 border-t border-gold-300/30 w-full max-w-xs">
        <p className="font-sans text-[10px] text-ink-muted uppercase tracking-wider">
          {slot.caption}
        </p>
      </div>
    </div>
  );
}
