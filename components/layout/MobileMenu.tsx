'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { NavItem, SocialLink } from '../../types/content';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  socialLinks: SocialLink[];
}

export default function MobileMenu({ isOpen, onClose, navItems, socialLinks }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-scroll-locked');
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.classList.remove('body-scroll-locked');
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable || focusable.length === 0) return;
    
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    
    first.focus();
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-50 bg-green-900 text-cream flex flex-col motion-safe-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-end h-[80px] px-4 md:px-6 shrink-0">
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center -mr-2 text-cream"
          aria-label="Close Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 pb-24 flex flex-col">
        <div className="flex flex-col gap-2 my-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-display-lg min-h-[48px] flex items-center hover:text-sun-500 transition-colors"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
        
        <div className="mt-8 flex flex-col gap-8 shrink-0">
          <Button href="/donate" variant="accent" onClick={onClose} className="w-full">
            DONATE
          </Button>
          
          <div className="flex gap-6 justify-center">
            {socialLinks.filter(s => s.url).map(social => (
              <a 
                key={social.platform} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-sun-500 transition-colors uppercase text-sm font-medium tracking-wider" 
                aria-label={social.label}
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
