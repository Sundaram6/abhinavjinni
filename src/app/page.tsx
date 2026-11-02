'use client';

import React, { useState } from 'react';
import CinematicOpening from '@/components/invitation/CinematicOpening';
import Navbar from '@/components/shared/Navbar';
import Hero from '@/components/hero/Hero';
import PetalCanvas from '@/components/shared/PetalCanvas';
import WeddingCelebrations from '@/components/events/WeddingCelebrations';
import PhotoGallery from '@/components/gallery/PhotoGallery';
import GuestExperience from '@/components/guest/GuestExperience';
import WishesGuestbook from '@/components/wishes/WishesGuestbook';
import Finale from '@/components/shared/Finale';
import AudioPlayer from '@/components/shared/AudioPlayer';

export default function WeddingPage() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
  };

  const handleReopenInvitation = () => {
    setIsInvitationOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('wedding_invitation_reopened'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Ensure anchor links scroll reliably after hydration
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'auto' });
        }
      }, 100);
    }
  }, [isInvitationOpen]);

  return (
    <main className="relative min-h-screen overflow-x-hidden selection:bg-ruby-100 selection:text-burgundy-950 paper-grain">
      
      {/* 1. Cinematic Sacred Opening Animation: Shiva-Parvati to Real Rings */}
      <CinematicOpening
        isOpen={isInvitationOpen}
        onOpen={handleOpenInvitation}
      />

      {/* Floating Ambient Sitar/Shehnai Audio Player */}
      <AudioPlayer />

      {/* 2. Floating Petal Canvas (Hero & Background Animation) */}
      <PetalCanvas />

      {/* 3. Luxury Stationery Navbar */}
      <Navbar onReopenInvitation={handleReopenInvitation} />

      {/* 4. Hero Section */}
      <Hero />

      {/* 5. Wedding Celebrations Itinerary */}
      <WeddingCelebrations />

      {/* 7. Stationery & Photo Album Gallery */}
      <PhotoGallery />

      {/* 8. Guest Experience: RSVP, Venue Directions, Travel & WhatsApp */}
      <GuestExperience />

      {/* 9. Wishes & Sacred Blessings Guestbook */}
      <WishesGuestbook />

      {/* 10. Finale & Family Blessings */}
      <Finale />
    </main>
  );
}
