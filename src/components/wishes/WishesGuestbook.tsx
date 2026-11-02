'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, MessageSquareHeart, Check, Filter } from 'lucide-react';
import { WishRecord } from '@/lib/storage';
import confetti from 'canvas-confetti';

export default function WishesGuestbook() {
  const [wishes, setWishes] = useState<WishRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  // Form State
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Friend');
  const [blessingTag, setBlessingTag] = useState('Sada Saubhagya Vati Bhava');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch wishes from API
  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const res = await fetch('/api/wishes');
        const data = await res.json();
        if (data.success && Array.isArray(data.wishes)) {
          setWishes(data.wishes);
        }
      } catch (err) {
        console.error('Error loading wishes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishes();
  }, []);

  const handleLike = async (id: string) => {
    // Optimistic update
    setWishes(prev =>
      prev.map(w => (w.id === id ? { ...w, likes: (w.likes || 0) + 1 } : w))
    );

    try {
      await fetch('/api/wishes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error('Error liking wish:', err);
    }
  };

  const handleAddWish = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please share your name.');
      return;
    }

    if (!message.trim() || message.length < 3) {
      setErrorMessage('Please write a heartfelt blessing for Abhinav & Mansi.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          relationship,
          blessingTag,
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (data.success && data.wish) {
        setWishes(prev => [data.wish, ...prev]);
        setName('');
        setMessage('');
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 5000);

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#D4AF37', '#C89B53', '#AD1351', '#3D072B', '#00664E'],
          });
        } catch {}
      } else {
        setErrorMessage(data.error || 'Failed to submit wish. Please try again.');
      }
    } catch (err) {
      console.error('Wish submit error:', err);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredWishes = wishes.filter(w => {
    if (filter === 'all') return true;
    if (filter === 'family') return w.relationship.toLowerCase().includes('family') || w.relationship.toLowerCase().includes('pal') || w.relationship.toLowerCase().includes('sharma');
    if (filter === 'friends') return !w.relationship.toLowerCase().includes('family');
    return true;
  });

  return (
    <section id="wishes" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-paper-100/50">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-16 relative z-10">
        <h2 className="font-serif text-3xl sm:text-5xl text-burgundy-900 font-bold tracking-tight">
          Words of Love for Abhinav &amp; Mansi
        </h2>

        <p className="font-serif italic text-ink-secondary text-sm sm:text-base max-w-xl mx-auto">
          Leave your sacred blessings, memories, and joyful wishes for the bride and groom.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 relative z-10">
        
        {/* Left Form: Leave a Blessing (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="stationery-card p-6 sm:p-8 rounded-3xl border border-gold-400/40 shadow-stationery sticky top-20">
            <h3 className="font-serif text-2xl font-bold text-burgundy-900 mb-1">
              Send Your Blessings
            </h3>
            <p className="font-serif italic text-xs text-ink-secondary mb-5">
              Your words will be cherished in their wedding album.
            </p>

            {submitSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-paper-100 border border-gold-500 text-xs text-burgundy-900 flex items-center gap-2">
                <Check className="w-4 h-4 text-green-700 flex-shrink-0" />
                <span>Your blessing has been posted to the guestbook!</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-burgundy-100 border border-burgundy-300 text-xs text-burgundy-900">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleAddWish} className="space-y-4">
              <div>
                <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-burgundy-950 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Surender Pal / Anita &amp; Friends"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold-400/40 bg-paper-50 text-sm font-serif text-ink-primary focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-burgundy-950 mb-1">
                    Relationship
                  </label>
                  <select
                    value={relationship}
                    onChange={e => setRelationship(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gold-400/40 bg-paper-50 text-xs font-serif text-ink-primary focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="Friend">Friend</option>
                    <option value="Family">Family / Relative</option>
                    <option value="Pal Family">Pal Family</option>
                    <option value="Sharma Family">Sharma Family</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Well-wisher">Well-wisher</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-burgundy-950 mb-1">
                    Blessing Tag
                  </label>
                  <select
                    value={blessingTag}
                    onChange={e => setBlessingTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gold-400/40 bg-paper-50 text-xs font-serif text-ink-primary focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    <option value="Sada Saubhagya Vati Bhava">सदा सौभाग्यवती भव</option>
                    <option value="Shubh Vivah">शुभ विवाह मंगलमय हो</option>
                    <option value="Eternal Togetherness">Eternal Togetherness</option>
                    <option value="Joy & Prosperity">Joy &amp; Prosperity</option>
                    <option value="Love & Blessings">Love &amp; Blessings</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold tracking-wider uppercase text-burgundy-950 mb-1">
                  Your Message or Blessing *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your prayers, sweet memories, and warm wishes..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gold-400/40 bg-paper-50 text-sm font-serif text-ink-primary focus:outline-none focus:ring-2 focus:ring-gold-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-full bg-burgundy-900 hover:bg-burgundy-800 text-gold-100 font-serif text-xs font-semibold tracking-widest uppercase shadow-md transition-all hover:scale-102 flex items-center justify-center gap-2 border border-gold-400/40"
              >
                {isSubmitting ? (
                  <span>Posting Blessing...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-gold-300" />
                    <span>Post in Wedding Guestbook</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Feed: Wishes List (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Filter Bar */}
          <div className="flex items-center justify-between border-b border-gold-300/30 pb-3">
            <span className="font-serif italic text-sm text-burgundy-900">
              {filteredWishes.length} Blessings Recorded
            </span>
            <div className="inline-flex p-1 rounded-full bg-paper-200 border border-gold-400/30 text-xs">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
                  filter === 'all'
                    ? 'bg-burgundy-900 text-gold-200 shadow-sm font-semibold'
                    : 'text-ink-secondary hover:text-burgundy-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('family')}
                className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
                  filter === 'family'
                    ? 'bg-burgundy-900 text-gold-200 shadow-sm font-semibold'
                    : 'text-ink-secondary hover:text-burgundy-900'
                }`}
              >
                Family
              </button>
              <button
                onClick={() => setFilter('friends')}
                className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
                  filter === 'friends'
                    ? 'bg-burgundy-900 text-gold-200 shadow-sm font-semibold'
                    : 'text-ink-secondary hover:text-burgundy-900'
                }`}
              >
                Friends
              </button>
            </div>
          </div>

          {/* List */}
          {isLoading ? (
            <div className="py-12 text-center text-ink-muted font-serif">
              <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <span>Gathering blessings...</span>
            </div>
          ) : filteredWishes.length === 0 ? (
            <div className="stationery-card p-8 rounded-2xl text-center text-ink-secondary font-serif">
              Be the first to share a blessing for Abhinav &amp; Mansi!
            </div>
          ) : (
            <div className="space-y-4">
              {filteredWishes.map(wish => (
                <div
                  key={wish.id}
                  className="stationery-card p-5 sm:p-6 rounded-2xl border border-gold-400/35 shadow-sm hover:shadow-stationery transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-burgundy-900 leading-tight">
                        {wish.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-sans font-semibold tracking-wider uppercase text-gold-800 bg-gold-100/60 px-2 py-0.5 rounded-full border border-gold-300/40">
                          {wish.relationship}
                        </span>
                        {wish.blessingTag && (
                          <span className="text-[11px] font-hindi text-burgundy-700 italic">
                            {wish.blessingTag}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleLike(wish.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-paper-100 hover:bg-blush-100/60 border border-gold-300/40 text-burgundy-800 text-xs font-sans transition-all active:scale-95"
                      title="Send love / heart"
                    >
                      <Heart className="w-3.5 h-3.5 text-burgundy-700 fill-burgundy-700" />
                      <span className="font-semibold text-[11px]">{wish.likes || 0}</span>
                    </button>
                  </div>

                  <p className="font-serif text-ink-primary text-sm leading-relaxed mt-3">
                    &ldquo;{wish.message}&rdquo;
                  </p>

                  <div className="mt-3 pt-2 border-t border-paper-200 text-[10px] font-sans text-ink-muted flex items-center justify-between">
                    <span>A Story in Bloom • Wedding Blessings</span>
                    <span>{new Date(wish.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
