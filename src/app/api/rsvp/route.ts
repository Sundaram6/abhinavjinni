import { NextRequest, NextResponse } from 'next/server';
import { saveRSVP, getRSVPs } from '@/lib/storage';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  try {
    const rsvps = await getRSVPs();
    const totalGuests = rsvps.reduce((acc, curr) => acc + (Number(curr.guestsCount) || 1), 0);
    return NextResponse.json({
      success: true,
      count: rsvps.length,
      totalGuests,
    });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch RSVP stats' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, guestsCount, eventsAttending, dietaryNotes, personalNote } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Please enter your full name.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 6) {
      return NextResponse.json({ success: false, error: 'Please enter a valid phone number.' }, { status: 400 });
    }

    const events = Array.isArray(eventsAttending) && eventsAttending.length > 0
      ? eventsAttending
      : ['all'];

    const count = Math.max(1, Math.min(20, Number(guestsCount) || 1));

    // Persist locally
    const saved = await saveRSVP({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      guestsCount: count,
      eventsAttending: events,
      dietaryNotes: dietaryNotes ? dietaryNotes.trim() : undefined,
      personalNote: personalNote ? personalNote.trim() : undefined,
    });

    // Mirror to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('rsvps').insert([
          {
            name: saved.name,
            phone: saved.phone,
            email: saved.email,
            guests_count: saved.guestsCount,
            events_attending: saved.eventsAttending,
            dietary_notes: saved.dietaryNotes,
            personal_note: saved.personalNote,
            created_at: saved.createdAt,
          }
        ]);
      } catch (sbErr) {
        console.warn('Supabase mirror note (local persisted successfully):', sbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your RSVP has been graciously received.',
      rsvp: saved,
    });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save RSVP. Please try again.' },
      { status: 500 }
    );
  }
}
