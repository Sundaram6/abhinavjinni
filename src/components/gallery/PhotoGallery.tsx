'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Sparkles, X, ChevronLeft, ChevronRight, Maximize2, Download, Image as ImageIcon } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const categories = ['All', 'Stationery', 'The Promise Night', 'Portraits'];

  const filteredItems = WEDDING_DATA.galleryItems.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextImage(); // swiped left
      } else {
        prevImage(); // swiped right
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-12 relative z-10">
        <h2 className="font-serif text-3xl sm:text-5xl text-ink-title font-bold tracking-tight">
          Stationery &amp; Photo Album
        </h2>

        <p className="font-serif italic text-ink-secondary text-sm sm:text-base max-w-xl mx-auto">
          An editorial showcase of hand-crafted invitation suites, botanical motifs, and cherished moments.
        </p>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all ${
                activeCategory === cat
                  ? 'bg-ruby-600 text-white border-gold-400 shadow-sm font-semibold scale-105'
                  : 'bg-paper-100 text-ink-primary border border-gold-400/35 hover:bg-paper-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className="stationery-card rounded-2xl overflow-hidden border border-gold-400/35 shadow-stationery group cursor-pointer transition-all duration-300 hover:shadow-stationery-deep hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] bg-paper-200 overflow-hidden">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-burgundy-950/20 group-hover:bg-burgundy-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="p-3 rounded-full bg-paper-50/90 text-ruby-600 shadow-md transform scale-90 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-5 h-5" />
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 bg-paper-100 border-t border-gold-300/30">
              <div className="flex items-center justify-between text-[11px] font-sans font-semibold tracking-wider uppercase text-gold-700 mb-1">
                <span>{item.category}</span>
                <span className="italic font-serif normal-case text-ink-muted">View in Lightbox</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-ink-title leading-snug">
                {item.title}
              </h3>
              <p className="font-serif text-xs text-ink-secondary mt-1 line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fadeIn select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-paper-50 z-20">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-gold-400" />
              <span className="font-serif text-sm text-gold-200 tracking-wider">
                {lightboxIndex + 1} of {filteredItems.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={filteredItems[lightboxIndex].src}
                download
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Download high-resolution image"
              >
                <Download className="w-5 h-5" />
              </a>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Central Image with Prev / Next */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Prev Button */}
            <button
              onClick={e => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm transition-all focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="relative w-full h-full max-w-4xl max-h-[75vh] flex items-center justify-center">
              <Image
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={e => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-sm transition-all focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="text-center text-paper-50 max-w-2xl mx-auto z-20 space-y-1">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-gold-300">
              {filteredItems[lightboxIndex].title}
            </h4>
            <p className="font-serif text-xs sm:text-sm text-paper-200/90 leading-relaxed">
              {filteredItems[lightboxIndex].caption}
            </p>
            <p className="text-[11px] font-sans text-paper-300/60 uppercase tracking-widest pt-1">
              Swipe or use Arrow Keys to navigate • Esc to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
