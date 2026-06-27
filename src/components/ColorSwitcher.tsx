'use client';

import React, { useState, useEffect } from 'react';

const swatches = [
  { accent: '#FFE500', text: '#0d0d0d' }, // Yellow
  { accent: '#FF2D2D', text: '#ffffff' }, // Red
  { accent: '#00FF85', text: '#0d0d0d' }, // Green
  { accent: '#3D8BFF', text: '#ffffff' }, // Blue
  { accent: '#FF6B00', text: '#ffffff' }, // Orange
  { accent: '#FF2D9B', text: '#ffffff' }, // Pink
  { accent: '#00E5FF', text: '#0d0d0d' }, // Cyan
  { accent: '#9B5DFF', text: '#ffffff' }, // Purple
];

export default function ColorSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAccent, setCurrentAccent] = useState('#FFE500');
  const [currentAccentText, setCurrentAccentText] = useState('#0d0d0d');
  
  // Track the user-selected (persisted) colors
  const [selectedAccent, setSelectedAccent] = useState('#FFE500');
  const [selectedAccentText, setSelectedAccentText] = useState('#0d0d0d');

  useEffect(() => {
    // Restore from localStorage
    const savedAccent = localStorage.getItem('portfolio-accent') || '#FFE500';
    const savedAccentText = localStorage.getItem('portfolio-accent-text') || '#0d0d0d';
    
    setCurrentAccent(savedAccent);
    setCurrentAccentText(savedAccentText);
    setSelectedAccent(savedAccent);
    setSelectedAccentText(savedAccentText);
    
    document.documentElement.style.setProperty('--accent', savedAccent);
    document.documentElement.style.setProperty('--accent-text', savedAccentText);
  }, []);

  const handleSelect = (accent: string, text: string) => {
    setSelectedAccent(accent);
    setSelectedAccentText(text);
    setCurrentAccent(accent);
    setCurrentAccentText(text);
    
    localStorage.setItem('portfolio-accent', accent);
    localStorage.setItem('portfolio-accent-text', text);
    
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accent-text', text);
  };

  const handleMouseEnter = (accent: string, text: string) => {
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--accent-text', text);
    setCurrentAccent(accent);
    setCurrentAccentText(text);
  };

  const handleMouseLeave = () => {
    document.documentElement.style.setProperty('--accent', selectedAccent);
    document.documentElement.style.setProperty('--accent-text', selectedAccentText);
    setCurrentAccent(selectedAccent);
    setCurrentAccentText(selectedAccentText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
      {/* Expanded Swatches List */}
      {isOpen && (
        <div 
          className="bg-[#161616] border border-[#222] rounded-[12px] p-3 flex flex-row gap-2.5 shadow-2xl transition-all duration-200 transform scale-100 origin-bottom-right"
          onMouseLeave={handleMouseLeave}
        >
          {swatches.map((swatch) => {
            const isActive = selectedAccent === swatch.accent;
            return (
              <button
                key={swatch.accent}
                onClick={() => handleSelect(swatch.accent, swatch.text)}
                onMouseEnter={() => handleMouseEnter(swatch.accent, swatch.text)}
                style={{ 
                  backgroundColor: swatch.accent,
                  boxShadow: isActive 
                    ? `0 0 0 3px #0d0d0d, 0 0 0 5px ${swatch.accent}`
                    : 'none'
                }}
                className="w-9 h-9 rounded-full transition-transform duration-150 hover:scale-110 cursor-pointer outline-none border-none"
                title={swatch.accent}
              />
            );
          })}
        </div>
      )}

      {/* Main Toggle Circle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: currentAccent,
          boxShadow: `0 0 16px 2px ${currentAccent}55` // Soft glow using hex alpha
        }}
        className="w-12 h-12 rounded-full border border-neutral-900 flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer outline-none"
      >
        <span 
          style={{ backgroundColor: currentAccentText }}
          className="w-2.5 h-2.5 rounded-full transition-colors duration-200"
        />
      </button>
    </div>
  );
}
