import React from 'react';
import { getHomeStatement } from '@/lib/content';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import Rays from '../ui/Rays';
import Image from 'next/image';

export default function Statement() {
  const data = getHomeStatement();

  return (
    <section className="relative bg-green-900 text-cream py-32 md:py-48 overflow-hidden">
      {/* Optional Background Image */}
      {data.image && !data.image.isPlaceholder && (
        <div className="absolute inset-0 z-0">
          <Image
            src={data.image.src}
            alt={data.image.alt || ''}
            fill
            className="object-cover opacity-30 mix-blend-overlay"
          />
        </div>
      )}
      
      {/* Decorative Rays */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-[600px] h-[600px] z-0 pointer-events-none">
        <Rays opacity={0.06} className="text-cream" scale={1.2} />
      </div>

      <Container width="reading" className="relative z-10">
        <Reveal>
          <h2 className="text-display-lg text-cream font-medium">
            {data.text.value}
          </h2>
        </Reveal>
      </Container>
    </section>
  );
}
