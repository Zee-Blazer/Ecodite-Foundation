'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

export interface LightboxItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const focusRevertRef = useRef<HTMLElement | null>(null);

  // Store trigger element
  useEffect(() => {
    if (isOpen) {
      focusRevertRef.current = document.activeElement as HTMLElement;
      overlayRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (focusRevertRef.current) {
        focusRevertRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      
      // Focus trap
      if (e.key === 'Tab') {
        const focusableElements = overlayRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        
        if (!focusableElements || focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Touch handlers
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStart(null);
  };

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm focus:outline-none"
      tabIndex={-1}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-modal="true"
      role="dialog"
      aria-label="Image gallery"
    >
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-sun-500 z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="absolute top-4 left-4 text-white/70 font-body text-sm z-10">
        {currentIndex + 1} / {items.length}
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-sun-500 hidden md:block z-10"
        onClick={handlePrev}
        aria-label="Previous image"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div className="relative w-full max-w-5xl max-h-[85vh] h-full flex flex-col items-center justify-center p-4">
        <div className="relative w-full h-full">
          <Image
            src={currentItem.src}
            alt={currentItem.alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
        {currentItem.caption && (
          <p className="text-white mt-4 text-center max-w-2xl font-body">
            {currentItem.caption}
          </p>
        )}
      </div>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 focus:outline-none focus:ring-2 focus:ring-sun-500 hidden md:block z-10"
        onClick={handleNext}
        aria-label="Next image"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      
      {/* Preload adjacent images */}
      <div className="hidden">
        <Image src={items[(currentIndex + 1) % items.length].src} alt="" width={1} height={1} unoptimized />
        <Image src={items[(currentIndex - 1 + items.length) % items.length].src} alt="" width={1} height={1} unoptimized />
      </div>
    </div>
  );
}
