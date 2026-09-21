'use client';

import React, { useState, useEffect } from 'react';
import SearchDialog from '@/components/sections/SearchDialog';

export default function SearchTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open on '/' if not typing in an input/textarea
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-ink hover:text-green-800 transition-colors rounded-full hover:bg-sage-50 flex items-center gap-2"
        aria-label="Search"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <kbd className="hidden md:inline-block text-[10px] font-sans px-1.5 py-0.5 border border-line rounded bg-sage-50 text-ink-muted">
          /
        </kbd>
      </button>

      <SearchDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
