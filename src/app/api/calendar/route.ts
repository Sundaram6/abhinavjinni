import { NextRequest, NextResponse } from 'next/server';
import { WEDDING_DATA } from '@/data/weddingData';

function formatICSDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function escapeICS(str: string): string {
  return str.replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const eventId = searchParams.get('event');

  let eventsToExport = WEDDING_DATA.events;
  if (eventId && eventId !== 'all') {
    eventsToExport = WEDDING_DATA.events.filter(e => e.id === eventId);
  }

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Abhinav and Mansi Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Abhinav & Mansi Wedding Celebrations',
  ];

  for (const ev of eventsToExport) {
    const startDate = new Date(ev.isoDate);
    // End date 3.5 hours later
    const endDate = new Date(startDate.getTime() + 3.5 * 60 * 60 * 1000);

    icsLines.push(
      'BEGIN:VEVENT',
      `UID:wedding-${ev.id}-2026@abhinav-mansi.wedding`,
      `DTSTAMP:${formatICSDate(new Date().toISOString())}`,
      `DTSTART:${formatICSDate(startDate.toISOString())}`,
      `DTEND:${formatICSDate(endDate.toISOString())}`,
      `SUMMARY:Abhinav & Mansi: ${escapeICS(ev.title)} (${escapeICS(ev.subTitle)})`,
      `DESCRIPTION:${escapeICS(ev.note || ev.title)}\\nVenue: ${escapeICS(ev.venueName)}\\nAddress: ${escapeICS(ev.venueAddress)}`,
      `LOCATION:${escapeICS(ev.venueName)}, ${escapeICS(ev.venueAddress)}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT24H',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: Abhinav & Mansi's ${escapeICS(ev.title)} tomorrow!`,
      'END:VALARM',
      'END:VEVENT'
    );
  }

  icsLines.push('END:VCALENDAR');

  const icsContent = icsLines.join('\r\n');
  const filename = eventId && eventId !== 'all' ? `abhinav-mansi-${eventId}.ics` : `abhinav-mansi-wedding-events.ics`;

  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-cache',
    },
  });
}
