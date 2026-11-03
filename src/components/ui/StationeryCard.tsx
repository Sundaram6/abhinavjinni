'use client';

import React from 'react';

interface StationeryCardProps {
  children: React.ReactNode;
  className?: string;
  withInnerFrame?: boolean;
  withFlourishes?: boolean;
}

export default function StationeryCard({
  children,
  className = '',
  withInnerFrame = true,
  withFlourishes = false,
}: StationeryCardProps) {
  return (
    <div
      className={`stationery-card relative p-6 sm:p-8 md:p-10 rounded-3xl border border-gold-400/35 shadow-stationery hover:shadow-stationery-deep transition-all duration-300 bg-heritage-ivory overflow-hidden ${className}`}
    >
      {/* Optional Inner Filigree Inset Frame */}
      {withInnerFrame && (
        <div className="absolute inset-2 sm:inset-3 border border-gold-400/25 rounded-2xl pointer-events-none z-10"></div>
      )}

      {/* Optional Corner Flourish Brackets */}
      {withFlourishes && (
        <>
          <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-gold-500/50 pointer-events-none z-20"></div>
          <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-gold-500/50 pointer-events-none z-20"></div>
          <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-gold-500/50 pointer-events-none z-20"></div>
          <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-gold-500/50 pointer-events-none z-20"></div>
        </>
      )}

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
