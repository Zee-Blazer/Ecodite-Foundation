import React from 'react';
import { getHomeChairmanPreview } from '@/lib/content';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import ArrowLink from '../ui/ArrowLink';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import Image from 'next/image';

export default function ChairmanPreview() {
  const data = getHomeChairmanPreview();

  return (
    <section className="section-cream py-[var(--section-padding)]">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
            {/* Left Image (5 cols) */}
            <div className="md:col-span-5 relative">
              <div className="relative aspect-[4/5] z-10">
                {data.portrait.isPlaceholder ? (
                  <MediaPlaceholder
                    label="PORTRAIT"
                    description={data.portrait.description}
                    ratio={data.portrait.ratio}
                    className="w-full h-full"
                  />
                ) : (
                  <Image
                    src={data.portrait.src}
                    alt={data.portrait.alt}
                    fill
                    className="object-cover rounded-[var(--radius-image)]"
                  />
                )}
              </div>
              {/* Offset frame decoration */}
              <div className="absolute top-[12px] left-[12px] right-[-12px] bottom-[-12px] border border-sun-500 z-0 pointer-events-none rounded-[var(--radius-image)]" />
            </div>

            {/* Right Content (7 cols) */}
            <div className="md:col-span-7 flex flex-col gap-8 md:pl-8">
              <div className="flex flex-col gap-4">
                <span className="text-eyebrow text-ink-muted">
                  {data.eyebrow}
                </span>
                <h2 className="text-h2 text-ink">
                  {data.welcomeHeadline}
                </h2>
              </div>

              <blockquote className="text-h3 font-display italic text-ink border-l-2 border-sun-500 pl-6 py-2">
                &ldquo;{data.quote.value}&rdquo;
              </blockquote>

              <div className="flex flex-col gap-1">
                {data.signature.value !== '[SIGNATURE]' && (
                  <div className="font-display italic text-2xl text-ink-muted mb-2">
                    {data.signature.value}
                  </div>
                )}
                <div className="font-semibold text-ink">
                  {data.name.value}
                </div>
                <div className="text-ink-muted">
                  {data.title}
                </div>
              </div>

              <div className="pt-4">
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
