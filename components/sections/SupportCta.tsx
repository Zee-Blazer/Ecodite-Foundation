import React from 'react';
import { getHomeSupportCta } from '@/lib/content';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import Rays from '../ui/Rays';

export default function SupportCta() {
  const data = getHomeSupportCta();

  return (
    <section className="relative bg-green-900 text-cream py-[var(--section-padding)] overflow-hidden">
      {/* Decorative Rays */}
      <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 w-[800px] h-[800px] z-0 pointer-events-none">
        <Rays opacity={0.04} className="text-cream" scale={1.5} />
      </div>

      <Container className="relative z-10">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left side statement */}
            <div>
              <h2 className="text-display-lg text-cream max-w-xl font-medium">
                {data.headline.value}
              </h2>
            </div>
            
            {/* Right side CTAs */}
            <div className="flex flex-col gap-4 md:pl-12 border-t md:border-t-0 md:border-l border-line-dark pt-8 md:pt-0">
              <Button href={data.donateCta.href} variant="accent" className="w-full md:w-auto self-start mb-2 text-[14px]">
                {data.donateCta.label}
              </Button>
              <Button href={data.partnerCta.href} variant="secondary" onDark className="w-full md:w-auto self-start">
                {data.partnerCta.label}
              </Button>
              <Button href={data.volunteerCta.href} variant="secondary" onDark className="w-full md:w-auto self-start">
                {data.volunteerCta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
