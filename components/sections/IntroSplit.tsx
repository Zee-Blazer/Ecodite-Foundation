import React from 'react';
import { getHomeIntro } from '@/lib/content';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import ArrowLink from '../ui/ArrowLink';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import Image from 'next/image';

export default function IntroSplit() {
  const data = getHomeIntro();

  return (
    <section className="section-cream py-[var(--section-padding)] overflow-hidden">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center relative">
            {/* Left side (cols 1-6) */}
            <div className="md:col-span-6 flex flex-col gap-6 relative z-10">
              <span className="text-eyebrow text-ink-muted">
                {data.eyebrow}
              </span>
              <h2 className="text-display-lg text-ink">
                {data.headline.value}
              </h2>
            </div>
            
            {/* Image intersecting the gap */}
            <div className="hidden md:block absolute left-[45%] top-1/2 -translate-y-1/2 w-[22%] z-0">
              <div className="relative w-full aspect-[4/5]">
                {data.image.isPlaceholder ? (
                  <MediaPlaceholder 
                    label="INTRO VISUAL" 
                    description={data.image.description} 
                    ratio={data.image.ratio}
                    className="w-full h-full"
                    size="sm"
                  />
                ) : (
                  <Image 
                    src={data.image.src} 
                    alt={data.image.alt} 
                    fill 
                    className="object-cover rounded-sm" 
                  />
                )}
              </div>
            </div>

            {/* Right side (cols 8-12) */}
            <div className="md:col-span-5 md:col-start-8 flex flex-col gap-6 relative z-10">
              <p className="text-body-lg text-ink-muted">
                {data.body.value}
              </p>
              <div>
                <ArrowLink href={data.link.href}>
                  {data.link.label}
                </ArrowLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
