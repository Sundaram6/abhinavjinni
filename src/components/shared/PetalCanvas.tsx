'use client';

import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  opacity: number;
}

export default function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalColors = [
      'rgba(179, 18, 82, 0.45)',   // Rich Ruby Magenta (#B31252)
      'rgba(197, 158, 89, 0.45)',  // Antique Warm Gold (#C59E59)
      'rgba(74, 14, 78, 0.35)',    // Deep Regal Plum (#4A0E4E)
      'rgba(250, 241, 238, 0.60)', // Blush Ivory (#FAF1EE)
      'rgba(12, 90, 72, 0.28)',    // Emerald Green (#0C5A48)
    ];

    const PETAL_COUNT = Math.min(22, Math.floor(window.innerWidth / 40));
    const petals: Petal[] = [];

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 9 + 8,
        speedY: Math.random() * 0.7 + 0.4,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.2,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.02 + 0.01,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.4 + 0.4,
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(Math.sin(p.flip), 1);

      ctx.beginPath();
      // Soft organic curved petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size * 0.5, -p.size * 0.4, p.size * 0.9, -p.size * 0.1, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.9, -p.size * 0.1, -p.size * 0.5, -p.size * 0.4, 0, 0);

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.005) * 0.4;
        p.rotation += p.rotSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      aria-hidden="true"
    />
  );
}
