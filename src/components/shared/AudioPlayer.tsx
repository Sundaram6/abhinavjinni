'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create and preload the authentic wedding shehnai audio
    const audio = new Audio('/assets/shehnai.mp3');
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const handlePlayEvent = () => setIsPlaying(true);
    const handlePauseEvent = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlayEvent);
    audio.addEventListener('pause', handlePauseEvent);

    // Listen for custom trigger to start music when invitation unfolds
    const handleInvitationOpened = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Autoplay prevented by browser:', err);
      });
    };

    window.addEventListener('wedding_invitation_unfolded', handleInvitationOpened);

    const handleInvitationReopened = () => {
      audio.pause();
      setIsPlaying(false);
    };
    window.addEventListener('wedding_invitation_reopened', handleInvitationReopened);

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlayEvent);
      audio.removeEventListener('pause', handlePauseEvent);
      window.removeEventListener('wedding_invitation_unfolded', handleInvitationOpened);
      window.removeEventListener('wedding_invitation_reopened', handleInvitationReopened);
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Play error:', err);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-5 z-40">
      <button
        onClick={toggleSound}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-serif tracking-widest uppercase transition-all duration-300 backdrop-blur-md border ${
          isPlaying
            ? 'bg-burgundy-900/95 text-paper-50 border-gold-400/60 shadow-gold-glow scale-105'
            : 'bg-paper-50/95 text-ink-primary border-gold-400/40 shadow-stationery hover:border-gold-500'
        }`}
        aria-label={isPlaying ? 'Mute Original Shehnai Music' : 'Play Original Shehnai Music'}
        title={isPlaying ? 'Pause Original Shehnai (Ustad Bismillah Khan)' : 'Play Original Wedding Shehnai'}
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3.5">
              <span className="w-0.5 h-full bg-gold-300 animate-pulse" style={{ animationDuration: '0.6s' }}></span>
              <span className="w-0.5 h-2 bg-gold-400 animate-pulse" style={{ animationDuration: '0.9s' }}></span>
              <span className="w-0.5 h-3.5 bg-gold-200 animate-pulse" style={{ animationDuration: '0.7s' }}></span>
              <span className="w-0.5 h-1.5 bg-gold-300 animate-pulse" style={{ animationDuration: '1.1s' }}></span>
            </div>
            <Volume2 className="w-4 h-4 text-gold-300 flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-sans font-bold leading-tight">Original Shehnai</span>
              <span className="text-[9px] font-serif text-gold-300/80 normal-case hidden sm:inline">Ustad Bismillah Khan</span>
            </div>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-ruby-600" />
            <VolumeX className="w-4 h-4 text-ink-muted" />
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-sans font-medium text-ink-secondary leading-tight">Original Shehnai</span>
              <span className="text-[9px] font-serif text-ink-muted normal-case hidden sm:inline">Tap to Play</span>
            </div>
          </>
        )}
      </button>
    </div>
  );
}
