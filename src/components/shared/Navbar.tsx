'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Play, Calendar, MapPin, Heart, Sparkles } from 'lucide-react';

interface NavbarProps {
  onReopenInvitation: () => void;
}

export default function Navbar({ onReopenInvitation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Celebrations', href: '#celebrations' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Venues & Travel', href: '#travel' },
    { label: 'Blessings', href: '#wishes' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-paper-50/90 backdrop-blur-md shadow-sm border-b border-gold-400/30 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Monogram Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 group"
          aria-label="Abhinav & Mansi Home"
        >
          <div className="w-8 h-8 rounded-full bg-burgundy-900 border border-gold-400 text-paper-50 flex items-center justify-center font-display text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
            A&amp;M
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg font-bold text-ink-title leading-tight tracking-tight">
              Abhinav &amp; Mansi
            </span>
            <span className="text-[9px] font-sans font-semibold tracking-widest uppercase text-gold-700">
              Bodhgaya &amp; Noida • 2026
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-sans tracking-widest uppercase text-ink-primary font-medium">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-ruby-600 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-ruby-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action: Re-open Invitation & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onReopenInvitation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper-100 hover:bg-paper-200 text-ink-primary border border-gold-400/40 text-[11px] font-sans font-medium tracking-wider shadow-sm transition-all hover:scale-105"
            title="Replay the cinematic sacred transformation intro"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-700" />
            <span className="hidden sm:inline">Replay Intro</span>
          </button>

          <a
            href="#travel"
            className="hidden sm:inline-flex px-4 py-1.5 rounded-full bg-ruby-600 hover:bg-ruby-700 text-white text-xs font-sans font-semibold tracking-wider uppercase shadow-sm transition-all hover:scale-105 border border-gold-400/40"
          >
            Venues
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-paper-100 text-ink-primary border border-gold-400/30 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper-50/98 border-b border-gold-400/40 px-6 py-6 space-y-4 shadow-xl backdrop-blur-lg animate-fadeIn">
          <nav className="flex flex-col space-y-3 font-sans text-sm text-ink-title font-medium">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-paper-200/80 flex items-center justify-between hover:text-ruby-600 transition-colors uppercase tracking-wider text-xs"
              >
                <span>{link.label}</span>
                <span className="text-gold-600 text-xs">→</span>
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#travel"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center rounded-full bg-ruby-600 hover:bg-ruby-700 text-white font-sans text-xs uppercase tracking-wider font-semibold shadow-md border border-gold-400/40"
            >
              Venues &amp; Directions
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReopenInvitation();
              }}
              className="w-full py-2.5 text-center rounded-full bg-paper-100 border border-gold-400/40 text-ink-primary font-sans text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-700" />
              <span>Replay Cinematic Intro</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
