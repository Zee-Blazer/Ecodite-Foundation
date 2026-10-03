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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: 'Not Found' };

  return {
    title: program.title.value,
    description: program.description.value,
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

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
