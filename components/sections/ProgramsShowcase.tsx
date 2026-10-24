import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { getPrograms } from '@/lib/content';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import type { Program } from '@/types/content';

function ProgramCard({ program, className }: { program: Program; className?: string }) {
  return (
    <Link href={`/programs/${program.slug}`} className={clsx("group flex flex-col h-full", className)}>
      <div className="relative w-full aspect-[4/3] rounded-[var(--radius-card)] overflow-hidden mb-5">
        <div className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]">
          {program.image.isPlaceholder ? (
            <MediaPlaceholder
              label={program.category}
              description={program.image.description}
              ratio={program.image.ratio}
              className="w-full h-full bg-cream"
              size="sm"
            />
          ) : (
            <Image
              src={program.image.src}
              alt={program.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
          )}
        </div>
      </div>
      
      <div className="flex flex-col flex-1 justify-between gap-3 transition-transform duration-300 group-hover:translate-y-0.5">
        <div>
          <h3 className="text-h3 text-ink mb-2">
            {program.title.value}
          </h3>
          <p className="text-body text-ink-muted leading-relaxed">
            {program.description.value}
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 font-medium text-green-800 pt-2 border-t border-line/60">
          <span>Learn more</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export interface ProgramsShowcaseProps {
  showHeading?: boolean;
  heading?: string;
  introText?: string;
  className?: string;
  variant?: 'sage' | 'cream';
}

export default function ProgramsShowcase({
  showHeading = true,
  heading = 'Our programs',
  introText,
  className,
  variant = 'cream',
}: ProgramsShowcaseProps = {}) {
  const programs = getPrograms();
  if (!programs.length) return null;

  return (
    <section className={clsx(variant === 'sage' ? 'section-sage-50' : 'section-cream', 'py-[var(--section-padding)]', className)}>
      <Container>
        {(showHeading || introText) && (
          <Reveal>
            <div className="mb-12 md:mb-16 max-w-3xl">
              {showHeading && (
                <SectionHeading 
                  heading={heading} 
                  className={introText ? "mb-4" : ""}
                />
              )}
              {introText && (
                <p className="text-body-lg text-ink-muted leading-relaxed">
                  {introText}
                </p>
              )}
            </div>
          </Reveal>
        )}

        <Reveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-stretch">
            {programs.map((program) => (
              <div key={program.slug} className="h-full">
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
