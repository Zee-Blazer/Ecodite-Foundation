'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import clsx from 'clsx';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import Lightbox from './Lightbox';
import type { GalleryItem, GalleryCategory } from '../../types/content';

const CATEGORIES: GalleryCategory[] = ['All', 'Education', 'Programs', 'Events', 'Community', 'Workshops'];

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const activeCategory = (searchParams.get('category') as GalleryCategory) || 'All';
  
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const isLightboxOpen = lightboxIndex !== -1;

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  const handleCategoryChange = (category: GalleryCategory) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="py-12 bg-cream min-h-screen">
      <Container>
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sun-500 focus:ring-offset-2",
                activeCategory === category
                  ? "bg-green-800 text-cream"
                  : "bg-white text-green-900 border border-line hover:bg-sage-50"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {filteredItems.map((item, idx) => {
            // Asymmetric spans for editorial look
            const isLarge = idx % 7 === 0;
            const isTall = idx % 5 === 2;
            const isWide = idx % 6 === 3;
            
            return (
              <Reveal
                key={item.id}
                className={clsx(
                  "relative group cursor-pointer overflow-hidden rounded-sm bg-sage-100",
                  isLarge ? "col-span-2 row-span-2" :
                  isTall ? "col-span-1 row-span-2" :
                  isWide ? "col-span-2 row-span-1" :
                  "col-span-1 row-span-1"
                )}
                onClick={() => setLightboxIndex(idx)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </Reveal>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24 text-ink-muted">
            <p>No images found in this category.</p>
          </div>
        )}
      </Container>

      <Lightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setLightboxIndex(-1)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
