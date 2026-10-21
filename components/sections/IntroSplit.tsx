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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Content (cols 1-7) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <span className="text-eyebrow text-ink-muted">
                {data.eyebrow}
              </span>
              <h2 className="text-display-lg text-ink font-medium leading-tight">
                {data.headline.value}
              </h2>
              {data.body?.value && (
                <p className="text-body-lg text-ink-muted max-w-xl">
                  {data.body.value}
                </p>
              )}
              <div className="pt-2">
                <ArrowLink href={data.link.href}>
                  {data.link.label}
                </ArrowLink>
              </div>
            </div>

            {/* Right Visual (cols 8-12) */}
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] sm:aspect-[4/5] rounded-[var(--radius-image)] overflow-hidden shadow-sm">
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
                    sizes="(min-width: 1024px) 38vw, (min-width: 640px) 50vw, 92vw"
                    className="object-cover" 
                  />
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
