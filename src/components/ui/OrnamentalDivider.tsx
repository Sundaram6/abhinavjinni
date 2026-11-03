'use client';

import React from 'react';

interface OrnamentalDividerProps {
  variant?: 'lotus' | 'minimal' | 'mandala';
  className?: string;
  width?: string;
}

export default function OrnamentalDivider({
  variant = 'lotus',
  className = '',
  width = 'w-48 sm:w-64',
}: OrnamentalDividerProps) {
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center gap-2 ${width} ${className} opacity-80`}>
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold-400/80"></span>
        <span className="w-1.5 h-1.5 rotate-45 bg-gold-600 rounded-[0.5px]"></span>
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold-400/80"></span>
      </div>
    );
  }

  if (variant === 'mandala') {
    return (
      <div className={`flex items-center justify-center gap-2.5 ${width} ${className}`}>
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-300 to-gold-500"></span>
        <div className="flex items-center gap-1.5 text-gold-600">
          <span className="w-1 h-1 rounded-full bg-gold-400"></span>
          <svg className="w-4 h-4 fill-gold-600" viewBox="0 0 24 24">
            <path d="M12 2L14.2 8.8L21.4 11L14.2 13.2L12 20L9.8 13.2L2.6 11L9.8 8.8L12 2Z" />
          </svg>
          <span className="w-1 h-1 rounded-full bg-gold-400"></span>
        </div>
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-300 to-gold-500"></span>
      </div>
    );
  }

  // Default: 'lotus' — Traditional Hindu Sacred Lotus & Temple Linework
  return (
    <div className={`flex items-center justify-center gap-2.5 ${width} ${className}`}>
      {/* Left Tapering Gold Line */}
      <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-300/80 to-gold-500"></span>
      
      {/* Traditional Indian Sacred Lotus Emblem */}
      <div className="flex items-center gap-1.5 text-gold-600 flex-shrink-0">
        <span className="w-1 h-1 rounded-full bg-gold-400"></span>
        <svg
          className="w-5 h-5 text-gold-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Central Lotus Petal */}
          <path d="M12 3C12 3 9.5 8 9.5 12C9.5 14.5 10.6 17 12 18C13.4 17 14.5 14.5 14.5 12C14.5 8 12 3 12 3Z" fill="rgba(197, 158, 89, 0.2)" />
          {/* Left Petal */}
          <path d="M10 7C8 9 5.5 12 5.5 14.5C5.5 16.5 7 18 8.5 18C10.5 18 11.5 15.5 11.5 15.5" />
          {/* Right Petal */}
          <path d="M14 7C16 9 18.5 12 18.5 14.5C18.5 16.5 17 18 15.5 18C13.5 18 12.5 15.5 12.5 15.5" />
          {/* Auspicious Base Arc */}
          <path d="M6 19C9.5 21 14.5 21 18 19" />
        </svg>
        <span className="w-1 h-1 rounded-full bg-gold-400"></span>
      </div>

      {/* Right Tapering Gold Line */}
      <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-300/80 to-gold-500"></span>
    </div>
  );
}
