'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { SearchResult } from '@/types/content';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small timeout to allow transition
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setTimeout(() => {
        setQuery('');
        setResults([]);
      }, 0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setTimeout(() => {
        setResults([]);
        setIsLoading(false);
      }, 0);
      return;
    }

    setTimeout(() => setIsLoading(true), 0);
    const delayDebounceFn = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          setResults(data.results || []);
          setSelectedIndex(0);
        })
        .finally(() => setIsLoading(false));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        router.push(results[selectedIndex].href);
        onClose();
      }
    }
  }, [results, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-green-950/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Dialog */}
      <div 
        className="relative bg-white w-full max-w-2xl rounded-[8px] border border-line flex flex-col max-h-[80vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div className="p-4 border-b border-line flex items-center gap-3">
          <svg className="w-5 h-5 text-ink-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 text-[16px] bg-transparent focus:outline-none placeholder:text-ink-muted text-ink"
            placeholder="Search programs, news, and events..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {isLoading && (
            <div className="w-5 h-5 border-2 border-line border-t-green-800 rounded-full animate-spin flex-shrink-0" />
          )}
          <button 
            onClick={onClose}
            className="p-1 text-ink-muted hover:text-ink transition-colors flex-shrink-0"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-2">
          {query.trim().length >= 2 && results.length === 0 && !isLoading ? (
            <div className="p-8 text-center text-ink-muted">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((result, index) => (
                <li key={`${result.type}-${result.slug}`}>
                  <button
                    onClick={() => {
                      router.push(result.href);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left p-3 rounded-[8px] transition-colors flex flex-col gap-1 ${
                      index === selectedIndex ? 'bg-sage-50' : 'hover:bg-sage-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-white border border-line rounded-[4px] text-green-900">
                        {result.type}
                      </span>
                      <span className="font-medium text-green-950 truncate">{result.title}</span>
                    </div>
                    <span className="text-[13px] text-ink-muted line-clamp-1">{result.excerpt}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-3 border-t border-line bg-sage-50 flex items-center justify-between text-[11px] text-ink-muted">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-line rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-line rounded">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-line rounded">↵</kbd>
              to select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white border border-line rounded">esc</kbd>
            to close
          </span>
        </div>
      </div>
    </div>
  );
}
