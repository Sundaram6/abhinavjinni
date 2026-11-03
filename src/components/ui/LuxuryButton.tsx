'use client';

import React from 'react';

interface LuxuryButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'wax-seal' | 'ghost' | 'emerald';
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  title?: string;
}

export default function LuxuryButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  target,
  rel,
  download,
  type = 'button',
  disabled = false,
  title,
}: LuxuryButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-full font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400 select-none';

  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses =
        'bg-ruby-600 hover:bg-ruby-700 text-white border border-gold-400/40 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 px-5 py-2.5';
      break;
    case 'secondary':
      variantClasses =
        'bg-paper-100 hover:bg-paper-200 text-ink-primary border border-gold-400/40 shadow-sm hover:border-gold-500 hover:scale-105 active:scale-95 px-5 py-2.5';
      break;
    case 'emerald':
      variantClasses =
        'bg-emerald-700 hover:bg-emerald-800 text-white border border-emerald-500/40 shadow-sm hover:scale-105 active:scale-95 px-5 py-2.5';
      break;
    case 'wax-seal':
      variantClasses =
        'wax-seal-btn text-white px-6 py-3 font-serif tracking-widest hover:scale-105 active:scale-95';
      break;
    case 'ghost':
      variantClasses =
        'text-ink-primary hover:text-ruby-600 underline-offset-4 hover:underline px-2 py-1 normal-case';
      break;
  }

  const combinedClasses = `${baseClasses} ${variantClasses} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
  }`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        title={title}
        className={combinedClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}
