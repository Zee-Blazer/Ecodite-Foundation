import React from 'react';
import type { Metadata } from 'next';
import PageHero from '@/components/hero/PageHero';
import ProgramsShowcase from '@/components/sections/ProgramsShowcase';

export const metadata: Metadata = {
  title: 'All Programs',
  description: 'Creating pathways for learning, creativity and growth.',
};

export default function ProgramsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        title="All Programs"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'All Programs', href: '/programs' },
        ]}
        compact
      />
      
      <div>
        <ProgramsShowcase
          showHeading={false}
          introText="Creating pathways for learning, creativity and growth."
        />
      </div>
    </div>
  );
}
