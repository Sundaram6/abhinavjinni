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
      'rgba(180, 20, 50, 0.60)',   // Deep Crimson Red Rose
      'rgba(195, 28, 68, 0.55)',   // Royal Ruby Rose
      'rgba(215, 38, 61, 0.55)',   // Classic Scarlet Rose Petal
      'rgba(138, 14, 42, 0.50)',   // Velvet Burgundy Rose
      'rgba(235, 95, 125, 0.50)',  // Soft Blush Romantic Rose
      'rgba(220, 70, 95, 0.52)',   // Coral Rose Blossom
      'rgba(212, 160, 48, 0.35)',  // Warm Marigold & Gold Spark
    ];

    const PETAL_COUNT = Math.min(26, Math.floor(window.innerWidth / 35));
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
