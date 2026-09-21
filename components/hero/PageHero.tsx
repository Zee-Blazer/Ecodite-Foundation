import React from 'react';
import Image from 'next/image';
import Container from '../ui/Container';
import Breadcrumbs from '../layout/Breadcrumbs';
import Reveal from '../ui/Reveal';
import type { MediaSlot } from '../../types/content';
import MediaPlaceholder from '../ui/MediaPlaceholder';

export interface PageHeroProps {
  title: string;
  description?: string;
  image?: MediaSlot;
  breadcrumbs: { label: string; href: string }[];
  compact?: boolean;
}

export default function PageHero({
  title,
  description,
  image,
  breadcrumbs,
  compact = false,
}: PageHeroProps) {
  if (image && !compact) {
    return (
      <section className="relative flex flex-col min-h-[50vh] bg-green-950 text-cream pt-24 lg:pt-32 pb-16">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {image.isPlaceholder ? (
            <MediaPlaceholder
              label="Hero Image"
              description={image.description}
              ratio={image.ratio || "16:9"}
              dark
              contentPosition="top"
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/60 to-transparent" />
        </div>
        
        <Container className="relative z-10 flex flex-col justify-end flex-grow mt-auto gap-8">
          <Breadcrumbs items={breadcrumbs} />
          
          <Reveal className="max-w-3xl space-y-4">
            <h1 className="text-display-lg text-cream">{title}</h1>
            {description && (
              <p className="text-body-lg text-cream/80 max-w-2xl">{description}</p>
            )}
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-green-800 text-cream pt-24 lg:pt-32 pb-12 lg:pb-16 border-b border-green-700">
      <Container className="space-y-8">
        <Breadcrumbs items={breadcrumbs} />
        
        <Reveal className="max-w-3xl space-y-4">
          <h1 className="text-display-lg">{title}</h1>
          {description && (
            <p className="text-body-lg text-cream/80 max-w-2xl">{description}</p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
