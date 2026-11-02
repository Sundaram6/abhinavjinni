import { NextRequest, NextResponse } from 'next/server';
import { getWishes, addWish, likeWish } from '@/lib/storage';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  try {
    const wishes = await getWishes();
    return NextResponse.json({
      success: true,
      wishes,
    });
  } catch (error) {
    console.error('Error fetching wishes:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch wishes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, relationship, blessingTag, message } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Please share your name.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 3) {
      return NextResponse.json({ success: false, error: 'Please write a heartfelt message or blessing.' }, { status: 400 });
    }

    const saved = await addWish({
      name: name.trim(),
      relationship: relationship ? relationship.trim() : 'Well-wisher',
      blessingTag: blessingTag ? blessingTag.trim() : 'Blessings & Love',
      message: message.trim(),
    });

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('wishes').insert([
          {
            name: saved.name,
            relationship: saved.relationship,
            blessing_tag: saved.blessingTag,
            message: saved.message,
            likes: saved.likes,
            status: saved.status,
            created_at: saved.createdAt,
          }
        ]);
      } catch (sbErr) {
        console.warn('Supabase mirror note (local persisted successfully):', sbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your blessing has been posted to Abhinav & Mansi’s guestbook!',
      wish: saved,
    });
  } catch (error) {
    console.error('Error adding wish:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to post blessing. Please try again.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Wish ID required' }, { status: 400 });
    }

    const updated = await likeWish(id);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Wish not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      likes: updated.likes,
    });
  } catch (error) {
    console.error('Error liking wish:', error);
    return NextResponse.json({ success: false, error: 'Failed to update like' }, { status: 500 });
  }
}
