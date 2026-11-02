'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Sparkles, BookOpen, Edit3, Check } from 'lucide-react';
import { WEDDING_DATA } from '@/data/weddingData';

export default function OurStory() {
  const [stories, setStories] = useState(WEDDING_DATA.story);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleStartEdit = (id: string, currentText: string) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleSaveEdit = (id: string) => {
    setStories(prev =>
      prev.map(item => (item.id === id ? { ...item, excerpt: editText } : item))
    );
    setEditingId(null);
  };

  return (
    <section id="story" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-16 relative z-10">
        <h2 className="font-serif text-3xl sm:text-5xl text-ink-title font-bold tracking-tight">
          Our Story in Bloom
        </h2>

        <p className="font-serif italic text-ink-secondary text-sm sm:text-base max-w-xl mx-auto">
          &ldquo;Love does not consist in gazing at each other, but in looking outward together in the same direction.&rdquo;
        </p>

        <div className="w-24 h-5 mx-auto relative opacity-60">
          <Image
            src="/assets/swirl_transparent.png"
            alt="Divider"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Central Connecting Vine / Line in Royal Gold & Jewel Plum */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-gold-400 via-burgundy-900 to-gold-400 pointer-events-none hidden sm:block"></div>

        <div className="space-y-12 sm:space-y-16">
          {stories.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-12 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-paper-50 border-2 border-gold-500 shadow-sm items-center justify-center z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-ruby-600 shadow-sm"></span>
                </div>

                {/* Content Card */}
                <div className="w-full sm:w-[calc(50%-2rem)]">
                  <div className="stationery-card p-6 sm:p-8 rounded-2xl border border-gold-400/35 shadow-stationery hover:shadow-stationery-deep transition-all duration-300">
                    
                    {/* Header with Tag & Year */}
                    <div className="flex items-center justify-between gap-2 border-b border-gold-300/30 pb-3 mb-4">
                      <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        {item.tag}
                      </span>
                      <span className="font-serif italic text-xs text-ink-muted">
                        {item.year}
                      </span>
                    </div>

                    {/* Milestone Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink-title mb-2">
                      {item.title}
                    </h3>

                    {/* Excerpt / Editable Caption */}
                    {editingId === item.id ? (
                      <div className="space-y-2 my-2">
                        <textarea
                          value={editText}
                          onChange={e => setEditText(e.target.value)}
                          className="w-full p-2 text-sm font-sans border border-gold-400 rounded-lg bg-paper-50 text-ink-primary focus:outline-none focus:ring-2 focus:ring-gold-500 leading-relaxed"
                          rows={3}
                        />
                        <button
                          onClick={() => handleSaveEdit(item.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ruby-600 text-white text-xs font-sans font-semibold uppercase tracking-wider"
                        >
                          <Check className="w-3 h-3" />
                          <span>Save Caption</span>
                        </button>
                      </div>
                    ) : (
                      <p className="font-serif text-ink-primary text-sm sm:text-base leading-relaxed mb-3">
                        {item.excerpt}
                      </p>
                    )}

                    {/* Extended narrative details */}
                    <p className="font-sans text-xs text-ink-secondary leading-relaxed pt-2 border-t border-paper-200">
                      {item.content}
                    </p>

                    {/* Caption edit trigger */}
                    <div className="mt-4 flex items-center justify-between text-[11px] text-ink-muted pt-2">
                      <span className="italic">Abhinav &amp; Mansi Chronicles</span>
                      <button
                        onClick={() => handleStartEdit(item.id, item.excerpt)}
                        className="hover:text-burgundy-900 inline-flex items-center gap-1 transition-colors"
                        title="Personalize or edit this caption"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit caption</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Imagery / Illustration Plate */}
                <div className="w-full sm:w-[calc(50%-2rem)]">
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden stationery-card border border-gold-400/30 shadow-stationery group">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4 text-paper-50 flex items-center justify-between text-xs font-serif">
                      <span>{item.title}</span>
                      <BookOpen className="w-3.5 h-3.5 text-gold-300" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
