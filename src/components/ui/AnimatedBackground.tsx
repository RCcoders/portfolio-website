'use client';

import React, { useEffect, useRef } from 'react';

interface Orb {
    x: number;
    y: number;
    radius: number;
    baseOpacity: number;
    angleX: number;
    angleY: number;
    speedX: number;
    speedY: number;
    amplitudeX: number;
    amplitudeY: number;
}

interface ScanLine {
    y: number;
    speed: number;
    delay: number;
    timer: number;
}

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        // Hex to RGB parser for Canvas styling
        const hexToRgb = (hex: string): string => {
            const cleaned = hex.replace('#', '').trim();
            if (cleaned.length === 3) {
                const r = parseInt(cleaned[0] + cleaned[0], 16);
                const g = parseInt(cleaned[1] + cleaned[1], 16);
                const b = parseInt(cleaned[2] + cleaned[2], 16);
                return `${r}, ${g}, ${b}`;
            } else if (cleaned.length === 6) {
                const r = parseInt(cleaned.substring(0, 2), 16);
                const g = parseInt(cleaned.substring(2, 4), 16);
                const b = parseInt(cleaned.substring(4, 6), 16);
                return `${r}, ${g}, ${b}`;
            }
            return '255, 229, 0'; // Yellow fallback
        };

        // Effect States
        const gridOffset = { x: 0, y: 0 };
        let frameCount = 0;
        let accentColor = '#FFE500';

        // Layer 2: Orbs
        const orbs: Orb[] = [
            {
                x: 0, y: 0, radius: 260, baseOpacity: 0.05,
                angleX: 0, angleY: 0,
                speedX: (2 * Math.PI) / (25 * 60), // 25s loop
                speedY: (2 * Math.PI) / (30 * 60),
                amplitudeX: 180, amplitudeY: 140
            },
            {
                x: 0, y: 0, radius: 220, baseOpacity: 0.06,
                angleX: Math.PI / 3, angleY: Math.PI / 4,
                speedX: (2 * Math.PI) / (20 * 60), // 20s loop
                speedY: (2 * Math.PI) / (28 * 60),
                amplitudeX: 220, amplitudeY: 180
            },
            {
                x: 0, y: 0, radius: 320, baseOpacity: 0.04,
                angleX: Math.PI / 2, angleY: Math.PI / 6,
                speedX: (2 * Math.PI) / (28 * 60), // 28s loop
                speedY: (2 * Math.PI) / (22 * 60),
                amplitudeX: 150, amplitudeY: 220
            }
        ];

        // Layer 3: Sweeping scan lines
        const scanLines: ScanLine[] = [
            { y: -10, speed: 0.7, delay: 0, timer: 0 },
            { y: -10, speed: 1.1, delay: 240, timer: 0 }, // 4s delay
            { y: -10, speed: 0.8, delay: 480, timer: 0 }  // 8s delay
        ];

        let animationFrameId: number;

        const updateAndRender = () => {
            ctx.clearRect(0, 0, width, height);

            // Re-read Accent CSS Variable every 60 frames
            if (frameCount % 60 === 0) {
                try {
                    const computed = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
                    if (computed) accentColor = computed;
                } catch {}
            }
            frameCount++;

            const rgbAccent = hexToRgb(accentColor);

            // --- LAYER 1: Drifting Dot Grid ---
            gridOffset.x = (gridOffset.x + 0.2) % 40;
            gridOffset.y = (gridOffset.y + 0.2) % 40;

            const startX = -40 + gridOffset.x;
            const startY = -40 + gridOffset.y;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            for (let x = startX; x < width + 40; x += 40) {
                for (let y = startY; y < height + 40; y += 40) {
                    ctx.beginPath();
                    ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // --- LAYER 2: Accent Glow Orbs ---
            orbs.forEach((orb, i) => {
                orb.angleX += orb.speedX;
                orb.angleY += orb.speedY;

                // Orbit center points based on segment partitions
                const centerX = width * (0.2 + 0.3 * i);
                const centerY = height * (0.3 + 0.2 * i);

                orb.x = centerX + Math.sin(orb.angleX) * orb.amplitudeX;
                orb.y = centerY + Math.cos(orb.angleY) * orb.amplitudeY;

                const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
                grad.addColorStop(0, `rgba(${rgbAccent}, ${orb.baseOpacity})`);
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // --- LAYER 3: Staggered Scan Lines ---
            scanLines.forEach((line) => {
                if (line.timer < line.delay) {
                    line.timer++;
                    return;
                }

                line.y += line.speed;
                if (line.y > height + 10) {
                    line.y = -10;
                    line.speed = 0.6 + Math.random() * 0.5; // slight speed variation
                }

                const grad = ctx.createLinearGradient(0, line.y, width, line.y);
                grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
                grad.addColorStop(0.5, `rgba(${rgbAccent}, 0.06)`);
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.strokeStyle = grad;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(0, line.y);
                ctx.lineTo(width, line.y);
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(updateAndRender);
        };

        window.addEventListener('resize', resize);
        resize();
        
        // Start loop
        updateAndRender();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 z-0 pointer-events-none w-screen h-screen bg-[#0d0d0d]"
        />
    );
}
