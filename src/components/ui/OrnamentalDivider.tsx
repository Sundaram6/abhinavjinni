'use client';

import React from 'react';
import Image from 'next/image';

interface OrnamentalDividerProps {
  variant?: 'flourish' | 'minimal' | 'swirl' | 'floral';
  className?: string;
  width?: string;
}

export default function OrnamentalDivider({
  variant = 'flourish',
  className = '',
  width = 'w-48 sm:w-64',
}: OrnamentalDividerProps) {
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center gap-2 ${width} ${className} opacity-75`}>
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold-400"></span>
        <span className="w-1.5 h-1.5 rotate-45 bg-gold-600 rounded-[1px]"></span>
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold-400"></span>
      </div>
    );
  }

  if (variant === 'swirl') {
    return (
      <div className={`relative h-6 ${width} ${className} opacity-80 flex items-center justify-center`}>
        <Image
          src="/assets/swirl_transparent.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>
    );
  }

  if (variant === 'floral') {
    return (
      <div className={`flex items-center justify-center gap-3 ${width} ${className}`}>
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-400 to-gold-500"></span>
        <svg
          className="w-5 h-5 text-gold-600 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a4 4 0 0 0-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 0 0-4-4Z" />
          <path d="M12 14c-2.5 0-5 2-5 5s2.5 3 5 3 5-1 5-3-2.5-5-5-5Z" />
        </svg>
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-400 to-gold-500"></span>
      </div>
    );
  }

  // Default: 'flourish' (Central royal medallion with tapering golden lines)
  return (
    <div className={`flex items-center justify-center gap-2.5 ${width} ${className}`}>
      <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-300 to-gold-500"></span>
      <div className="flex items-center gap-1 text-gold-600">
        <span className="w-1 h-1 rounded-full bg-gold-400"></span>
        <svg
          className="w-4 h-4 fill-gold-600"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
        <span className="w-1 h-1 rounded-full bg-gold-400"></span>
      </div>
      <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-300 to-gold-500"></span>
    </div>
  );
}
