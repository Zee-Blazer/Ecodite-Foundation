import React from 'react';
import { getHeroData } from '@/lib/content';
import Container from '../ui/Container';
import Button from '../ui/Button';
import HeroMedia from './HeroMedia';

export default function Hero() {
  const data = getHeroData();

  return (
    <section data-hero className="relative w-full min-h-[92vh] min-h-[92svh] flex items-end">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <HeroMedia media={data.media} />
        {/* Dark green scrim gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pb-16 md:pb-24 pt-32">
        <Container>
          <div className="max-w-[720px] lg:w-8/12 flex flex-col gap-6">
            <span 
              className="text-eyebrow text-sun-500 motion-safe-slide-up"
              style={{ animationDelay: '0ms' }}
            >
              {data.eyebrow}
            </span>
            
            <h1 
              className="text-display-xl text-cream motion-safe-slide-up"
              style={{ animationDelay: '150ms' }}
            >
              {data.headline.value}
            </h1>
            
            <p 
              className="text-body-lg text-cream/90 motion-safe-slide-up max-w-2xl"
              style={{ animationDelay: '400ms' }}
            >
              {data.supportCopy.value}
            </p>
            
            <div 
              className="flex flex-wrap gap-4 pt-4 motion-safe-slide-up"
              style={{ animationDelay: '600ms' }}
            >
              <Button href={data.primaryCta.href} variant="inverse">
                {data.primaryCta.label}
              </Button>
              <Button href={data.secondaryCta.href} variant="secondary" onDark>
                {data.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
