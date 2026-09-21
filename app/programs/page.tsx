import React from 'react';
import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import ProgramsShowcase from '@/components/sections/ProgramsShowcase';

export const metadata: Metadata = {
  title: 'Our Programs',
  description: 'Creating pathways for learning, creativity and growth.',
};

export default function ProgramsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        title="Our Programs"
        description="Creating pathways for learning, creativity and growth."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Programs', href: '/programs' },
        ]}
        compact
      />
      
      <div className="py-24">
        <ProgramsShowcase />
      </div>
    </div>
  );
}
