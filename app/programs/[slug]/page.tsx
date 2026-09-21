import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProgramBySlug, getPrograms } from '@/lib/content';
import PageHero from '@/components/hero/PageHero';
import ProgramDetail from '@/components/sections/ProgramDetail';

export function generateStaticParams() {
  const programs = getPrograms();
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const program = getProgramBySlug(params.slug);
  if (!program) return { title: 'Not Found' };
  
  return {
    title: program.title.value,
    description: program.description.value,
  };
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = getProgramBySlug(params.slug);
  
  if (!program) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title={program.title.value}
        description={program.description.value}
        image={program.image}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Programs', href: '/programs' },
          { label: program.title.value, href: `/programs/${program.slug}` },
        ]}
      />
      <ProgramDetail program={program} />
    </div>
  );
}
