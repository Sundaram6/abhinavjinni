'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

export default function Finale() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-24 pb-16 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-paper-100 to-paper-200/90 text-center border-t border-gold-400/35">
      
      {/* Background Ganesh Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-[0.04]">
        <Image
          src="/assets/ganesh_art.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-10">
        
        {/* Top Ganesh Emblem & Sanskrit Shloka */}
        <div className="space-y-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto relative">
            <Image
              src="/assets/ganesh_transparent.png"
              alt="Lord Ganesha"
              fill
              className="object-contain"
            />
          </div>

          <p className="font-hindi text-base sm:text-xl text-ink-title font-semibold tracking-normal max-w-lg mx-auto leading-relaxed">
            विघ्नहरण मंगल करण श्री गणपति महाराज।<br />
            प्रथम निमन्त्रण आपको पूरण करियो काज ॥
          </p>

          <p className="font-serif italic text-xs sm:text-sm text-ink-secondary max-w-md mx-auto">
            Our foremost prayer is offered to Lord Ganesha, blessing every step of this sacred journey with auspicious joy.
          </p>
        </div>

        {/* Both Families Greeting & Blessings */}
        <div className="stationery-card p-8 sm:p-12 rounded-3xl border border-gold-400/40 shadow-stationery max-w-3xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="space-y-1">
              <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-gold-700">
                Groom&apos;s Parents
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-ink-title">
                {WEDDING_DATA.family.groomParents}
              </h4>
              <p className="font-serif italic text-xs text-ink-secondary">
                With love, blessings &amp; gratitude
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-gold-700">
                Bride&apos;s Parents
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-ink-title">
                {WEDDING_DATA.family.brideParents}
              </h4>
              <p className="font-serif italic text-xs text-ink-secondary">
                With heartfelt joy &amp; warm welcome
              </p>
            </div>
          </div>
        </div>

        {/* Monogram Seal & Farewell */}
        <div className="space-y-3 pt-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-burgundy-900 border-2 border-gold-400 text-paper-50 font-serif font-bold text-base shadow-md">
            A &amp; M
          </div>
          <h3 className="font-serif text-2xl font-bold text-ink-title">
            Abhinav &amp; Mansi
          </h3>
          <p className="font-serif italic text-2xl text-gold-700">
            A Story in Bloom • 2026
          </p>
          <p className="text-xs font-sans text-ink-muted leading-relaxed">
            Designed with devotion, love, and sacred joy for all our honored guests.
          </p>
        </div>

        {/* Back to top button */}
        <div className="pt-6">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-paper-100 hover:bg-paper-200 text-ink-primary border border-gold-400/40 text-xs font-sans font-semibold tracking-wider uppercase shadow-sm transition-all hover:scale-105"
            aria-label="Back to top of wedding website"
          >
            <ArrowUp className="w-3.5 h-3.5 text-gold-700" />
            <span>Return to Top</span>
          </button>
        </div>
      </div>

      {/* Bottom Botanical Floral Artwork Border */}
      <div className="relative w-full h-24 sm:h-36 mt-12 opacity-85 pointer-events-none">
        <Image
          src="/assets/floral_border.png"
          alt="Botanical floral border"
          fill
          className="object-cover object-top"
        />
      </div>
    </footer>
  );
}
