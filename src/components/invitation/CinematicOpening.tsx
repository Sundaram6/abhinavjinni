'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface CinematicOpeningProps {
  isOpen: boolean;
  onOpen: () => void;
}

export default function CinematicOpening({ isOpen, onOpen }: CinematicOpeningProps) {
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteractedSound, setHasInteractedSound] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  // 1. Check preferences and URL query params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      // Check if user explicitly wants to bypass intro via URL
      const isExplicitSkip =
        window.location.search.includes('skip=1') ||
        window.location.search.includes('opened=1');

      if (isExplicitSkip) {
        onOpen();
      }
    }
    setHasCheckedStorage(true);
  }, [onOpen]);

  // 2. Play or reset video when opening is active
  useEffect(() => {
    if (!isOpen && hasCheckedStorage && !prefersReducedMotion) {
      setIsFadingOut(false);
      setShowEnterButton(false);
      setProgress(0);

      // Trigger video play
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((err) => {
          console.warn('Video autoplay policy check:', err);
          // If browser blocked sound autoplay, force muted and retry
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }

      if (bgVideoRef.current) {
        bgVideoRef.current.currentTime = 0;
        bgVideoRef.current.play().catch(() => {});
      }
    }
  }, [isOpen, hasCheckedStorage, prefersReducedMotion]);

  // 3. Track video playback progress and trigger Enter CTA near the end
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 9.5;
    setProgress((current / duration) * 100);

    // When the rings and couple reveal appears (~6.8s+), show Enter Celebration button
    if (current >= 6.8 && !showEnterButton) {
      setShowEnterButton(true);
    }
  };

  // 4. Toggle sound on user tap/click
  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    setHasInteractedSound(true);

    if (!nextMuted) {
      // Ensure video continues playing with sound
      videoRef.current.play().catch(() => {});
    }
  };

  // 5. Complete intro and dissolve into wedding celebration
  const handleComplete = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);

    // Stop video elements gracefully
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.pause();
    }

    // Trigger authentic wedding Shehnai / Sitar music
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('wedding_invitation_unfolded'));
    }

    setTimeout(() => {
      onOpen();
      setIsFadingOut(false);
    }, 650);
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!hasCheckedStorage || isOpen) {
    return null;
  }

  // Fallback for users with prefers-reduced-motion
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-burgundy-950/95 backdrop-blur-md">
        <div className="relative w-full max-w-md p-8 rounded-3xl bg-paper-50 border-2 border-gold-400 text-center space-y-4 shadow-2xl">
          <p className="font-hindi text-burgundy-900 font-semibold">॥ श्री गणेशाय नमः ॥</p>
          <h2 className="font-serif text-3xl text-burgundy-950 font-bold">Abhinav &amp; Mansi</h2>
          <p className="text-xs uppercase tracking-widest text-gold-700">Together, Forever • 03 December 2026</p>
          <button
            onClick={handleComplete}
            className="w-full py-3 rounded-full bg-burgundy-900 text-gold-100 font-serif tracking-wider uppercase text-xs hover:bg-burgundy-800 transition-colors shadow-md"
          >
            Enter Celebration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 scale-[1.02] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Abhinav &amp; Mansi Cinematic Wedding Opening"
    >
      {/* ================= AMBIENT SYNCHRONIZED BACKDROP (AMBILIGHT EFFECT) ================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-35 filter blur-3xl scale-110 pointer-events-none transition-opacity duration-1000">
        <video
          ref={bgVideoRef}
          src="/assets/cinematic_opening/cinematic_opening.mp4"
          muted
          playsInline
          loop
          autoPlay
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Vignette Overlay for Luxury Contrast */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-10 opacity-70"></div>

      {/* ================= TOP CONTROLS BAR ================= */}
      <div className="absolute top-4 inset-x-4 sm:top-6 sm:inset-x-8 z-40 flex items-center justify-between pointer-events-none">
        {/* Sound Toggle Button (Clickable) */}
        <button
          onClick={toggleSound}
          className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-gold-200 border border-gold-400/40 backdrop-blur-md text-[11px] font-serif tracking-wider shadow-lg transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-400"
          aria-label={isMuted ? 'Turn on sound' : 'Mute sound'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              <span>Sound Off {!hasInteractedSound && '(Tap for sound)'}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-gold-300" />
              <span className="text-gold-100">Sound On</span>
            </>
          )}
        </button>

        {/* Immediate Skip Action */}
        <button
          onClick={handleSkip}
          className="pointer-events-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-paper-50/90 hover:bg-paper-50 text-burgundy-950 border border-gold-400/50 backdrop-blur-md text-xs font-serif tracking-widest uppercase shadow-xl transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold-400"
          aria-label="Skip introduction and enter website"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5 text-gold-700" />
        </button>
      </div>

      {/* ================= MAIN CINEMATIC THEATRE CONTAINER ================= */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center p-4 z-20">
        
        {/* Sacred Benedictory Heading on Mobile for Balanced Framing */}
        <div className="sm:hidden text-center mb-2.5">
          <p className="font-hindi text-[13px] tracking-widest text-gold-300/90 font-medium drop-shadow-sm">
            ॥ श्री गणेशाय नमः ॥
          </p>
        </div>

        {/* The 16:9 Video Canvas */}
        <div
          onClick={toggleSound}
          className="relative w-full aspect-video flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-gold-400/40 shadow-[0_0_90px_rgba(0,0,0,0.95)] bg-black cursor-pointer group"
        >
          {/* The Exact User Video Element */}
          <video
            ref={videoRef}
            poster="/assets/cinematic_opening/poster_frame.jpg"
            playsInline
            autoPlay
            muted={isMuted}
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleComplete}
            className="w-full h-full object-contain"
          >
            <source src="/assets/cinematic_opening/cinematic_opening.mp4" type="video/mp4" />
            <source src="/assets/cinematic_opening/cinematic_opening.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>

          {/* Subtle Decorative Golden Framing Inset */}
          <div className="absolute inset-2 sm:inset-3 border border-gold-400/20 rounded-lg sm:rounded-xl pointer-events-none z-30"></div>

          {/* Delicate Golden Playback Progress Bar */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-30 pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-gold-500 via-amber-300 to-gold-400 transition-[width] duration-150 ease-linear"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
          </div>

          {/* Quick Tap-To-Unmute Hint Overlay on Initial Start */}
          {isMuted && !hasInteractedSound && progress < 40 && (
            <div className="absolute bottom-3 left-3 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold-400/30 text-[11px] text-gold-200 pointer-events-none animate-fade-in">
              <VolumeX className="w-3 h-3 text-gold-400" />
              <span>Click anywhere to play with sound</span>
            </div>
          )}
        </div>

        {/* Dedicated Action Area Below Video: Zero Obstruction of Rings or Calligraphy */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center justify-center min-h-[48px] transition-all duration-700">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleComplete();
            }}
            className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-burgundy-900/95 hover:bg-burgundy-900 text-gold-100 border border-gold-400/60 backdrop-blur-md shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 text-xs sm:text-sm font-serif tracking-widest uppercase font-semibold ${
              showEnterButton
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
            }`}
          >
            <span>Enter Celebration</span>
            <ArrowRight className="w-4 h-4 text-gold-300" />
          </button>
        </div>

      </div>
    </div>
  );
}
