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
    <Link href={`/programs/${program.slug}`} className={clsx("group block", className)}>
      <div className="relative w-full aspect-[4/5] rounded-[var(--radius-card)] overflow-hidden mb-6">
        <div className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]">
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
            />
          )}
        </div>
      </div>
      
      <div className="flex flex-col gap-3 transition-transform duration-300 group-hover:translate-y-1">
        <span className="text-eyebrow text-sun-700">
          {program.category}
        </span>
        <h3 className="text-h3 text-ink">
          {program.title.value}
        </h3>
        <p className="text-body text-ink-muted line-clamp-2">
          {program.description.value}
        </p>
        <div className="inline-flex items-center gap-1.5 font-medium text-green-800 mt-2">
          <span>Learn more</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProgramsShowcase() {
  const programs = getPrograms();
  if (!programs.length) return null;

  return (
    <section className="section-sage-50 py-[var(--section-padding)]">
      <Container>
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <SectionHeading 
              heading="Our programs" 
              className="w-full md:w-1/2"
            />
            <p className="text-body-lg text-ink-muted w-full md:w-1/2 md:text-right max-w-md ml-auto">
              Creating pathways for learning, creativity and growth.
            </p>
          </div>
        </Reveal>

        <Reveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-x-6 md:gap-y-16 items-start">
            {programs.map((program, i) => {
              // Asymmetric grid logic
              let colClasses = "md:col-span-6";
              if (programs.length === 1) {
                colClasses = "md:col-span-10 md:col-start-2";
              } else if (programs.length === 2) {
                colClasses = i === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-24";
              } else if (programs.length >= 3) {
                if (i === 0) colClasses = "md:col-span-7";
                else if (i === 1) colClasses = "md:col-span-5";
                else if (i === 2) colClasses = "md:col-span-5 md:col-start-8 -mt-24";
                else colClasses = "md:col-span-4";
              }

              return (
                <div key={program.slug} className={colClasses}>
                  <ProgramCard program={program} />
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
