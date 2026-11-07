'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Navigation, 
  Sparkles, 
  Download, 
  ChevronDown, 
  ExternalLink,
  Music,
  Flame,
  Sun,
  Crown
} from 'lucide-react';
import { WEDDING_DATA, EventDetail } from '@/data/weddingData';
import { SectionHeading, OrnamentalDivider } from '@/components/ui';

// Custom Ceremony Emblems / Authentic Event Logos
function CeremonyEmblem({ event }: { event: EventDetail }) {
  if (event.logo) {
    return (
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-gold-400/80 shadow-md ring-2 ring-gold-200/50 flex-shrink-0 transition-transform duration-300">
        <Image
          src={event.logo}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 56px, 64px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
      </div>
    );
  }

  switch (event.id) {
    case 'mehandi':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 border border-emerald-300/60 flex items-center justify-center text-emerald-800 shadow-sm flex-shrink-0">
          <span className="text-xl">🌿</span>
        </div>
      );
    case 'sangeet':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-50 border border-purple-300/60 flex items-center justify-center text-purple-800 shadow-sm flex-shrink-0">
          <Music className="w-7 h-7 text-purple-700" />
        </div>
      );
    case 'haldi':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 border border-amber-300/60 flex items-center justify-center text-amber-800 shadow-sm flex-shrink-0">
          <Sun className="w-7 h-7 text-amber-600" />
        </div>
      );
    case 'ghruchari-barat':
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-50 border border-rose-300/60 flex items-center justify-center text-rose-800 shadow-sm flex-shrink-0">
          <Crown className="w-7 h-7 text-rose-700" />
        </div>
      );
    case 'wedding':
    default:
      return (
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-burgundy-50 border border-burgundy-300/60 flex items-center justify-center text-burgundy-900 shadow-sm flex-shrink-0">
          <Flame className="w-7 h-7 text-ruby-600" />
        </div>
      );
  }
}

export default function WeddingCelebrations() {
  const [expandedEventId, setExpandedEventId] = useState<string | null>('wedding');
  const [activeDay, setActiveDay] = useState<'all' | 'day1' | 'day2'>('all');

  // Filter only the Bodhgaya celebrations (Engagement remains permanently in Chapter Three)
  const bodhgayaEvents = WEDDING_DATA.events.filter(e => e.city === 'Bodhgaya');

  const day1Events = bodhgayaEvents.filter(e => e.dateString.includes('2nd December'));
  const day2Events = bodhgayaEvents.filter(e => e.dateString.includes('3rd December'));

  const toggleExpand = (id: string) => {
    setExpandedEventId(prev => (prev === id ? null : id));
  };

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
    <section id="celebrations" className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden border-t border-gold-400/20">
      
      {/* Chapter Five Heading */}
      <SectionHeading
        kicker="Chapter Five"
        title="The Celebrations"
        hindiTitle="॥ मङ्गल विवाहोत्सव कार्यक्रम • बोधगया ॥"
        description="A sacred two-day celebration of heritage, music, vibrant rituals, and eternal vows under the Bodhi sky."
        dividerVariant="lotus"
      />

      {/* Global Day Filter & Calendar Action Bar */}
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-12 relative z-10 px-2">
        {/* Day Tabs */}
        <div className="inline-flex p-1 rounded-full bg-paper-50 border border-gold-400/35 shadow-sm text-xs font-sans">
          <button
            onClick={() => setActiveDay('all')}
            className={`px-4 py-1.5 rounded-full tracking-wider uppercase transition-all ${
              activeDay === 'all'
                ? 'bg-ruby-600 text-white font-semibold shadow-sm'
                : 'text-ink-secondary hover:text-ruby-600 font-medium'
            }`}
          >
            All Ceremonies (5)
          </button>
          <button
            onClick={() => setActiveDay('day1')}
            className={`px-4 py-1.5 rounded-full tracking-wider uppercase transition-all ${
              activeDay === 'day1'
                ? 'bg-ruby-600 text-white font-semibold shadow-sm'
                : 'text-ink-secondary hover:text-ruby-600 font-medium'
            }`}
          >
            Day 1: Dec 2
          </button>
          <button
            onClick={() => setActiveDay('day2')}
            className={`px-4 py-1.5 rounded-full tracking-wider uppercase transition-all ${
              activeDay === 'day2'
                ? 'bg-ruby-600 text-white font-semibold shadow-sm'
                : 'text-ink-secondary hover:text-ruby-600 font-medium'
            }`}
          >
            Day 2: Dec 3 (Wedding)
          </button>
        </div>

        {/* Global iCal Download */}
        <a
          href="/api/calendar?event=all"
          download="abhinav-mansi-wedding-events.ics"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-paper-50 hover:bg-paper-100 text-ink-primary border border-gold-400/40 text-xs font-sans tracking-wider uppercase font-semibold shadow-sm transition-all hover:scale-105"
          title="Download complete wedding calendar"
        >
          <Download className="w-3.5 h-3.5 text-gold-700" />
          <span>Add Itinerary to Calendar (.ics)</span>
        </a>
      </div>

      {/* Two-Day Timeline Container */}
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* ================= DAY 1: WEDNESDAY, 2ND DECEMBER 2026 ================= */}
        {(activeDay === 'all' || activeDay === 'day1') && (
          <div className="space-y-6">
            
            {/* Day Header Banner */}
            <div className="flex items-center gap-4 pb-2 border-b-2 border-gold-400/30">
              <div className="w-9 h-9 rounded-full bg-ruby-600 text-white flex items-center justify-center font-serif font-bold text-sm shadow-sm">
                1
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-title">
                  Day One • Wednesday, 2nd December 2026
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-gold-800">
                  Henna traditions, acoustic folk songs, and the grand Sangeet night
                </p>
              </div>
            </div>

            {/* Day 1 Event Cards */}
            <div className="space-y-4">
              {day1Events.map(event => {
                const isExpanded = expandedEventId === event.id;
                return (
                  <div
                    key={event.id}
                    className="stationery-card rounded-2xl border border-gold-400/35 overflow-hidden bg-paper-50 shadow-stationery transition-all duration-300"
                  >
                    {/* Main Clickable Header */}
                    <div
                      onClick={() => toggleExpand(event.id)}
                      className="p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-gold-50/20 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        <CeremonyEmblem event={event} />
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-serif italic text-xs text-gold-700 font-semibold tracking-wider">
                              {event.chapter}
                            </span>
                            <span className="text-gold-300">•</span>
                            <span className="font-hindi text-xs text-burgundy-900 font-semibold">
                              {event.hindiTitle}
                            </span>
                          </div>
                          <h4 className="font-serif text-xl sm:text-2xl font-bold text-ink-title leading-tight">
                            {event.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-sans text-ink-secondary pt-1">
                            <span className="inline-flex items-center gap-1.5 font-semibold text-ruby-600">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{event.time}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-gold-600" />
                              <span>{event.venueName} ({event.venueTagline})</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="p-2 rounded-full hover:bg-paper-200/60 text-gold-700 transition-transform"
                          aria-label={isExpanded ? 'Collapse event' : 'Expand event details'}
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-ruby-600' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Details Tray */}
                    {isExpanded && (
                      <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-gold-300/30 space-y-5 bg-paper-100/40">
                        {/* Ceremony Photo Banner if available */}
                        {event.image && (
                          <div className="relative w-full h-52 sm:h-72 rounded-xl overflow-hidden border border-gold-400/50 shadow-md">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 768px"
                              className="object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between">
                              <span className="text-xs font-sans font-semibold tracking-widest uppercase text-gold-300">
                                {event.chapter} • {event.title}
                              </span>
                              <span className="text-xs font-serif italic text-paper-100 hidden sm:inline">
                                {event.subTitle}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Note / Sentiment */}
                        {event.note && (
                          <p className="font-serif italic text-sm sm:text-base text-ink-primary leading-relaxed">
                            &ldquo;{event.note}&rdquo;
                          </p>
                        )}

                        {/* Itinerary Timeline */}
                        {event.timeline && event.timeline.length > 0 && (
                          <div className="space-y-2 pt-2">
                            <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-gold-700 block">
                              Ceremony Schedule
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {event.timeline.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 rounded-xl bg-paper-50 border border-gold-300/30 text-xs font-sans space-y-0.5 shadow-xs"
                                >
                                  <span className="font-semibold text-ruby-600 block">{item.time}</span>
                                  <p className="font-semibold text-ink-title">{item.activity}</p>
                                  <p className="text-ink-secondary text-[11px] leading-tight">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Attire Guidance */}
                        {event.attire && (
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gold-300/20">
                            <div>
                              <span className="text-[10px] font-sans font-semibold tracking-widest uppercase text-gold-700 block">
                                Suggested Attire
                              </span>
                              <p className="font-serif italic text-sm text-ink-primary font-medium">
                                {event.attire}
                              </p>
                            </div>

                            {event.attirePalette && (
                              <div className="flex items-center gap-1.5">
                                {event.attirePalette.map((col, idx) => (
                                  <span
                                    key={idx}
                                    title={col.name}
                                    className="w-4 h-4 rounded-full border border-gold-400/40 shadow-xs inline-block"
                                    style={{ backgroundColor: col.hex }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <a
                            href={event.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ruby-600 hover:bg-ruby-700 text-white text-xs font-sans font-semibold tracking-wider uppercase shadow-sm transition-all hover:scale-105"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            <span>Get Directions</span>
                          </a>

                          <a
                            href={getGoogleCalendarUrl(event)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-paper-50 hover:bg-paper-100 text-ink-primary border border-gold-400/50 text-xs font-sans font-medium tracking-wider uppercase shadow-xs transition-all hover:scale-105"
                          >
                            <Calendar className="w-3.5 h-3.5 text-gold-600" />
                            <span>Google Calendar</span>
                          </a>

                          <a
                            href={`/api/calendar?event=${event.id}`}
                            download={`${event.id}.ics`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-transparent hover:bg-gold-50 text-gold-800 text-xs font-sans font-medium tracking-wider uppercase transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>.ICS</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ================= DAY 2: THURSDAY, 3RD DECEMBER 2026 ================= */}
        {(activeDay === 'all' || activeDay === 'day2') && (
          <div className="space-y-6 pt-4">
            
            {/* Day Header Banner */}
            <div className="flex items-center gap-4 pb-2 border-b-2 border-gold-400/30">
              <div className="w-9 h-9 rounded-full bg-gold-600 text-paper-50 flex items-center justify-center font-serif font-bold text-sm shadow-sm">
                2
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-title">
                  Day Two • Thursday, 3rd December 2026 (The Wedding)
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-gold-800">
                  Golden Haldi, Barat procession, and sacred Pheras around the Agni
                </p>
              </div>
            </div>

            {/* Day 2 Event Cards */}
            <div className="space-y-4">
              {day2Events.map(event => {
                const isExpanded = expandedEventId === event.id;
                const isSacredWedding = event.id === 'wedding';

                return (
                  <div
                    key={event.id}
                    className={`stationery-card rounded-2xl overflow-hidden bg-paper-50 shadow-stationery transition-all duration-300 ${
                      isSacredWedding
                        ? 'border-2 border-gold-500/70 shadow-stationery-deep ring-1 ring-gold-400/30'
                        : 'border border-gold-400/35'
                    }`}
                  >
                    {/* Main Clickable Header */}
                    <div
                      onClick={() => toggleExpand(event.id)}
                      className="p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-gold-50/20 transition-colors"
                    >
                      <div className="flex items-start sm:items-center gap-4">
                        <CeremonyEmblem event={event} />
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-serif italic text-xs text-gold-700 font-semibold tracking-wider">
                              {event.chapter}
                            </span>
                            <span className="text-gold-300">•</span>
                            <span className="font-hindi text-xs text-burgundy-900 font-semibold">
                              {event.hindiTitle}
                            </span>
                            {isSacredWedding && (
                              <span className="px-2.5 py-0.5 rounded-full bg-ruby-100 text-ruby-700 text-[10px] font-sans font-bold uppercase tracking-wider">
                                Grand Finale
                              </span>
                            )}
                          </div>
                          <h4 className="font-serif text-xl sm:text-2xl font-bold text-ink-title leading-tight">
                            {event.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-sans text-ink-secondary pt-1">
                            <span className="inline-flex items-center gap-1.5 font-semibold text-ruby-600">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{event.time}</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-gold-600" />
                              <span>{event.venueName} ({event.venueTagline})</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="p-2 rounded-full hover:bg-paper-200/60 text-gold-700 transition-transform"
                          aria-label={isExpanded ? 'Collapse event' : 'Expand event details'}
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 text-ruby-600' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Details Tray */}
                    {isExpanded && (
                      <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-gold-300/30 space-y-5 bg-paper-100/40">
                        {/* Ceremony Photo Banner if available */}
                        {event.image && (
                          <div className="relative w-full h-52 sm:h-72 rounded-xl overflow-hidden border border-gold-400/50 shadow-md">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 768px"
                              className="object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between">
                              <span className="text-xs font-sans font-semibold tracking-widest uppercase text-gold-300">
                                {event.chapter} • {event.title}
                              </span>
                              <span className="text-xs font-serif italic text-paper-100 hidden sm:inline">
                                {event.subTitle}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Shloka if wedding */}
                        {event.shloka && (
                          <div className="p-3.5 rounded-xl bg-gold-50/60 border border-gold-300/40 text-center">
                            <p className="font-hindi text-xs sm:text-sm text-burgundy-950 font-semibold leading-relaxed">
                              {event.shloka}
                            </p>
                          </div>
                        )}

                        {/* Note / Sentiment */}
                        {event.note && (
                          <p className="font-serif italic text-sm sm:text-base text-ink-primary leading-relaxed">
                            &ldquo;{event.note}&rdquo;
                          </p>
                        )}

                        {/* Itinerary Timeline */}
                        {event.timeline && event.timeline.length > 0 && (
                          <div className="space-y-2 pt-2">
                            <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-gold-700 block">
                              Ceremony Schedule
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                              {event.timeline.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 rounded-xl bg-paper-50 border border-gold-300/30 text-xs font-sans space-y-0.5 shadow-xs"
                                >
                                  <span className="font-semibold text-ruby-600 block">{item.time}</span>
                                  <p className="font-semibold text-ink-title">{item.activity}</p>
                                  <p className="text-ink-secondary text-[11px] leading-tight">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Attire Guidance */}
                        {event.attire && (
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gold-300/20">
                            <div>
                              <span className="text-[10px] font-sans font-semibold tracking-widest uppercase text-gold-700 block">
                                Suggested Attire
                              </span>
                              <p className="font-serif italic text-sm text-ink-primary font-medium">
                                {event.attire}
                              </p>
                            </div>

                            {event.attirePalette && (
                              <div className="flex items-center gap-1.5">
                                {event.attirePalette.map((col, idx) => (
                                  <span
                                    key={idx}
                                    title={col.name}
                                    className="w-4 h-4 rounded-full border border-gold-400/40 shadow-xs inline-block"
                                    style={{ backgroundColor: col.hex }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <a
                            href={event.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ruby-600 hover:bg-ruby-700 text-white text-xs font-sans font-semibold tracking-wider uppercase shadow-sm transition-all hover:scale-105"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            <span>Get Directions</span>
                          </a>

                          <a
                            href={getGoogleCalendarUrl(event)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-paper-50 hover:bg-paper-100 text-ink-primary border border-gold-400/50 text-xs font-sans font-medium tracking-wider uppercase shadow-xs transition-all hover:scale-105"
                          >
                            <Calendar className="w-3.5 h-3.5 text-gold-600" />
                            <span>Google Calendar</span>
                          </a>

                          <a
                            href={`/api/calendar?event=${event.id}`}
                            download={`${event.id}.ics`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-transparent hover:bg-gold-50 text-gold-800 text-xs font-sans font-medium tracking-wider uppercase transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>.ICS</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>

      {/* Central Botanical Transition to Gallery */}
      <div className="mt-16 text-center">
        <OrnamentalDivider variant="lotus" width="w-48 sm:w-64" className="mx-auto" />
      </div>

    </section>
  );
}
