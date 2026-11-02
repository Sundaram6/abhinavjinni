'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Sparkles, Download, Check, ExternalLink } from 'lucide-react';
import { WEDDING_DATA, EventDetail } from '@/data/weddingData';

export default function WeddingCelebrations() {
  const [filter, setFilter] = useState<'all' | 'noida' | 'bodhgaya'>('all');

  const filteredEvents = WEDDING_DATA.events.filter(event => {
    if (filter === 'noida') return event.city === 'Noida';
    if (filter === 'bodhgaya') return event.city === 'Bodhgaya';
    return true;
  });

  const getGoogleCalendarUrl = (event: EventDetail) => {
    const startDate = new Date(event.isoDate);
    const endDate = new Date(startDate.getTime() + 3.5 * 60 * 60 * 1000);
    const format = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Abhinav & Mansi: ${event.title}`,
      dates: `${format(startDate)}/${format(endDate)}`,
      details: `${event.note || event.title}\nVenue: ${event.venueName}, ${event.venueAddress}`,
      location: `${event.venueName}, ${event.venueAddress}`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <section id="celebrations" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-paper-100/60">
      
      {/* Ornate Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-12 relative z-10">
        <h2 className="font-serif text-3xl sm:text-5xl text-ink-title font-bold tracking-tight">
          Wedding Itinerary &amp; Ceremonies
        </h2>

        <p className="font-serif italic text-ink-secondary text-sm sm:text-base max-w-2xl mx-auto">
          Six joyous celebrations marking the journey from the promise of love to sacred marital vows.
        </p>

        {/* Filter & Global Calendar Download */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <div className="inline-flex p-1 rounded-full bg-paper-100 border border-gold-400/30">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all ${
                filter === 'all'
                  ? 'bg-ruby-600 text-white shadow-sm font-semibold'
                  : 'text-ink-secondary hover:text-ruby-600'
              }`}
            >
              All Celebrations (6)
            </button>
            <button
              onClick={() => setFilter('bodhgaya')}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all ${
                filter === 'bodhgaya'
                  ? 'bg-ruby-600 text-white shadow-sm font-semibold'
                  : 'text-ink-secondary hover:text-ruby-600'
              }`}
            >
              Bodhgaya (Dec 2–3)
            </button>
            <button
              onClick={() => setFilter('noida')}
              className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all ${
                filter === 'noida'
                  ? 'bg-ruby-600 text-white shadow-sm font-semibold'
                  : 'text-ink-secondary hover:text-ruby-600'
              }`}
            >
              Noida (Oct 20)
            </button>
          </div>

          <a
            href="/api/calendar?event=all"
            download="abhinav-mansi-wedding-events.ics"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-paper-50 hover:bg-paper-100 text-ink-primary border border-gold-400/40 text-xs font-serif tracking-wider uppercase shadow-sm transition-all hover:scale-105"
            title="Download full iCalendar (.ics) for all events"
          >
            <Download className="w-3.5 h-3.5 text-gold-700" />
            <span>Add All to Calendar (.ics)</span>
          </a>
        </div>
      </div>

      {/* Celebrations Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
        {filteredEvents.map(event => (
          <div
            key={event.id}
            className="stationery-card rounded-2xl border border-gold-400/35 p-6 sm:p-7 flex flex-col justify-between shadow-stationery hover:shadow-stationery-deep transition-all duration-300 relative group"
          >
            {/* Top Chapter Tag & Badge */}
            <div>
              <div className="flex items-center justify-between border-b border-gold-300/30 pb-3 mb-4">
                <span className="font-serif italic text-xs tracking-wider text-gold-700 font-semibold">
                  {event.chapter}
                </span>
                <span className={`text-[10px] font-sans font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full ${
                  event.id === 'wedding'
                    ? 'bg-burgundy-900 text-paper-50 border border-gold-400 shadow-sm'
                    : 'bg-emerald-700 text-white border border-emerald-600/40 shadow-sm'
                }`}>
                  {event.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-serif text-2xl font-bold text-ink-title group-hover:text-ruby-600 transition-colors">
                {event.title}
              </h3>
              <p className="font-serif italic text-sm text-ink-secondary mb-1">
                {event.subTitle}
              </p>
              {event.hindiTitle && (
                <p className="font-hindi text-xs text-gold-700 mb-3">
                  {event.hindiTitle}
                </p>
              )}

              {/* Shloka Quote if present */}
              {event.shloka && (
                <div className="my-3 p-3 rounded-xl bg-paper-50 border border-gold-300/40 text-center">
                  <p className="font-hindi text-xs text-ink-primary leading-relaxed">
                    {event.shloka}
                  </p>
                </div>
              )}

              {/* Date & Time block */}
              <div className="space-y-2 my-4 text-xs font-sans text-ink-primary bg-paper-50 p-3.5 rounded-xl border border-paper-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span className="font-semibold text-ink-title">{event.dateString}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-paper-200">
                  <MapPin className="w-4 h-4 text-ruby-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-ink-title">{event.venueName}</span>
                    <span className="text-[11px] text-ink-secondary leading-snug block">{event.venueAddress}</span>
                  </div>
                </div>
              </div>

              {/* Event Timeline Activities */}
              <div className="my-4 space-y-2">
                <p className="text-[11px] font-sans font-semibold tracking-wider uppercase text-gold-700">
                  Ceremony Flow:
                </p>
                <div className="space-y-1.5 pl-1">
                  {event.timeline.map((item, idx) => (
                    <div key={idx} className="text-xs flex items-start gap-2">
                      <span className="font-serif font-medium text-ruby-600 min-w-16 text-[11px]">
                        {item.time}
                      </span>
                      <div>
                        <span className="font-medium text-ink-primary">{item.activity}</span>
                        {item.description && (
                          <p className="text-[11px] text-ink-muted leading-tight">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attire & Palette */}
              <div className="my-4 pt-3 border-t border-paper-200">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-sans font-semibold text-ink-primary">Suggested Attire:</span>
                  <span className="font-serif italic text-ink-secondary text-[11px]">{event.attire}</span>
                </div>
                <div className="flex items-center gap-2">
                  {event.attirePalette.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                        style={{ backgroundColor: p.hex }}
                        title={p.name}
                      ></span>
                      <span className="text-[10px] text-ink-muted hidden sm:inline">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons: Add to Calendar & Directions */}
            <div className="mt-4 pt-4 border-t border-gold-300/30 flex items-center gap-2">
              <a
                href={getGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-ruby-600 hover:bg-ruby-700 text-white text-xs font-serif tracking-wider shadow-sm transition-all border border-gold-400/40"
                title="Add this event to Google Calendar"
              >
                <Calendar className="w-3.5 h-3.5 text-gold-300" />
                <span>Google Cal</span>
              </a>

              <a
                href={`/api/calendar?event=${event.id}`}
                download={`abhinav-mansi-${event.id}.ics`}
                className="py-2 px-2.5 rounded-lg bg-paper-100 hover:bg-paper-200 text-ink-primary border border-gold-400/40 text-xs font-serif transition-all"
                title="Download .ics for Apple / Outlook"
              >
                <Download className="w-3.5 h-3.5 text-gold-700" />
              </a>

              <a
                href={event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-paper-50 hover:bg-paper-100 text-ink-primary border border-gold-400/40 text-xs font-serif tracking-wider shadow-sm transition-all"
                title="Open Google Maps Directions"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
