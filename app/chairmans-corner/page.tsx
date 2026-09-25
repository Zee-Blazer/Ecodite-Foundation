import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getChairmanData } from '@/lib/content';
import PageHero from '@/components/hero/PageHero';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';
import VideoPlaceholder from '@/components/ui/VideoPlaceholder';

export const metadata: Metadata = {
  title: "Chairman's Corner | Edith Chukwuyem Osiagwu",
  description: "Official welcome message from Edith Chukwuyem Osiagwu, Founder of Ecodite Educational Foundation.",
};

export default function ChairmansCornerPage() {
  const data = getChairmanData();
  const paragraphs = data.welcomeMessage.value.split('\n\n').filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Chairman's Corner"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: "Chairman's Corner", href: '/chairmans-corner' },
        ]}
        compact
      />

      <section className="py-20 md:py-24 bg-cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (5/12) - Sticky Portrait */}
            <div className="lg:col-span-5 relative lg:sticky lg:top-28">
              <Reveal direction="right">
                <div className="relative z-10 w-[92%] lg:w-full ml-auto">
                  <div className="aspect-[4/5] relative overflow-hidden bg-sage-100 rounded-[var(--radius-image)] shadow-sm">
                    {data.portrait.isPlaceholder ? (
                      <MediaPlaceholder
                        label="Founder & Chairman Portrait"
                        description={data.portrait.description}
                        ratio={data.portrait.ratio || "4:5"}
                        className="w-full h-full"
                      />
                    ) : (
                      <Image
                        src={data.portrait.src}
                        alt={data.portrait.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 40vw, 90vw"
                        priority
                      />
                    )}
                  </div>
                </div>
                
                {/* Offset Frame */}
                <div className="absolute top-6 bottom-6 left-0 right-[4%] lg:-right-6 border border-sun-500/40 z-0 hidden md:block rounded-[var(--radius-image)] pointer-events-none" />
              </Reveal>

              {data.video && (
                <Reveal delay={200} className="mt-10 hidden lg:block">
                  <VideoPlaceholder
                    label="Message from the Founder"
                    description={data.video.description}
                    ratio={data.video.ratio || "16:9"}
                  />
                </Reveal>
              )}
            </div>

            {/* Right Column (7/12) - Message Content */}
            <div className="lg:col-span-7">
              <Reveal direction="left" stagger className="space-y-8">
                {/* Header Block */}
                <div className="space-y-3 border-b border-line pb-8">
                  <span className="text-eyebrow text-sun-700">Chairman&apos;s Corner</span>
                  <h1 className="text-h2 md:text-display-lg text-green-950 font-display">
                    {data.welcomeHeadline || 'Welcome to Ecodite Educational Foundation'}
                  </h1>
                  <p className="text-body text-ink-muted">
                    A welcome address by <span className="font-semibold text-ink">{data.name.value}</span>, {data.title.value}
                  </p>
                </div>
                
                {/* Letter Body */}
                <div className="space-y-6 text-body-lg text-ink-muted leading-relaxed">
                  {paragraphs.map((paragraph, index) => {
                    // Pullquote treatment for the core philosophy paragraph
                    if (index === 1) {
                      return (
                        <blockquote
                          key={index}
                          className="my-8 pl-6 border-l-2 border-sun-500 font-display text-h3 italic text-green-900 bg-sage-50/60 py-4 pr-4 rounded-r-[var(--radius-card)]"
                        >
                          &ldquo;{paragraph}&rdquo;
                        </blockquote>
                      );
                    }
                    return (
                      <p key={index} className="text-ink">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Optional Biography */}
                {data.biography && !data.biography.isPlaceholder && (
                  <div className="pt-8 border-t border-line">
                    <h3 className="text-h3 text-green-900 mb-4">Biography</h3>
                    <p className="whitespace-pre-wrap text-body-lg text-ink-muted leading-relaxed">
                      {data.biography.value}
                    </p>
                  </div>
                )}

                {/* Optional Philosophy */}
                {data.philosophy && !data.philosophy.isPlaceholder && (
                  <div className="pt-8 border-t border-line">
                    <h3 className="text-h3 text-green-900 mb-4">Leadership Philosophy</h3>
                    <p className="whitespace-pre-wrap text-body-lg text-ink-muted leading-relaxed">
                      {data.philosophy.value}
                    </p>
                  </div>
                )}

                {/* Optional Vision */}
                {data.foundationVision && !data.foundationVision.isPlaceholder && (
                  <div className="pt-8 border-t border-line">
                    <h3 className="text-h3 text-green-900 mb-4">Foundation Vision</h3>
                    <p className="whitespace-pre-wrap text-body-lg text-ink-muted leading-relaxed">
                      {data.foundationVision.value}
                    </p>
                  </div>
                )}
                
                {/* Sign-off Block */}
                <div className="pt-8 mt-12 border-t border-line">
                  {data.signature && !data.signature.isPlaceholder ? (
                    <div className="relative w-48 h-16 mb-2">
                      <Image
                        src={data.signature.src}
                        alt={data.signature.alt || "Founder's signature"}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  ) : (
                    <div className="font-display text-2xl md:text-3xl italic text-green-950 mb-2">
                      {data.name.value}
                    </div>
                  )}
                  <p className="text-base font-semibold text-sun-700">
                    {data.title.value}
                  </p>
                  <p className="text-sm text-ink-muted">
                    Ecodite Educational Foundation
                  </p>
                </div>
              </Reveal>

              {data.video && (
                <Reveal delay={200} className="mt-12 block lg:hidden">
                  <VideoPlaceholder
                    label="Message from the Founder"
                    description={data.video.description}
                    ratio={data.video.ratio || "16:9"}
                  />
                </Reveal>
              )}
            </div>
            
          </div>
        </Container>
      </section>
    </div>
  );
}
