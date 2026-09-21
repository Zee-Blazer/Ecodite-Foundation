import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getGalleryItems } from '@/lib/content';
import PageHero from '@/components/hero/PageHero';
import GalleryGrid from '@/components/sections/GalleryGrid';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore our gallery of events, programs, and community initiatives.',
};

export default function GalleryPage() {
  const items = getGalleryItems();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Gallery"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Gallery', href: '/gallery' },
        ]}
        compact
      />
      
      <Suspense fallback={
        <Container className="py-24 text-center">
          <div className="animate-pulse flex space-x-4 justify-center">
            <div className="h-10 w-24 bg-sage-100 rounded-full"></div>
            <div className="h-10 w-24 bg-sage-100 rounded-full"></div>
            <div className="h-10 w-24 bg-sage-100 rounded-full"></div>
          </div>
        </Container>
      }>
        <GalleryGrid items={items} />
      </Suspense>
    </div>
  );
}
