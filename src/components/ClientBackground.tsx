'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import LightRays (WebGL/OGL component) with SSR disabled
const LightRays = dynamic(() => import('@/components/LightRays'), { ssr: false });

export default function ClientBackground() {
  const [accentColor, setAccentColor] = useState('#FFE500');

  useEffect(() => {
    const updateAccent = () => {
      try {
        const val = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        if (val && val.startsWith('#')) {
          setAccentColor(val);
        }
      } catch {
        // Fallback in case of SSR or layout compute delay
      }
    };

    updateAccent();

    // Observe changes to the document element style attribute (e.g. when ColorSwitcher sets --accent)
    const observer = new MutationObserver(updateAccent);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen bg-[#0d0d0d]">
      <LightRays
        raysOrigin="top-center"
        raysColor={accentColor}
        raysSpeed={1.0}
        lightSpread={0.5}
        rayLength={3.0}
        pulsating={false}
        fadeDistance={1.0}
        saturation={1.0}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.0}
        distortion={0.0}
      />
    </div>
  );
}
