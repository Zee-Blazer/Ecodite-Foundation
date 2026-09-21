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
  title: "Chairman's Corner",
  description: "A message from the Chairman of the Ecodite Educational Foundation.",
};

export default function ChairmansCornerPage() {
  const data = getChairmanData();

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

      <section className="py-24 bg-cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column (5/12) */}
            <div className="lg:col-span-5 relative">
              <Reveal direction="right">
                <div className="relative z-10 w-[90%] lg:w-full ml-auto">
                  <div className="aspect-[3/4] relative overflow-hidden bg-sage-100">
                    {data.portrait.isPlaceholder ? (
                      <MediaPlaceholder
                        label="Chairman Portrait"
                        description={data.portrait.description}
                        ratio={data.portrait.ratio || "3:4"}
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
                <div className="absolute top-8 bottom-8 left-0 right-[5%] lg:-right-8 border-2 border-green-800/10 z-0 hidden md:block rounded-sm pointer-events-none" />
              </Reveal>

              {data.video && (
                <Reveal delay={200} className="mt-12 hidden lg:block">
                  <VideoPlaceholder
                    label="Message from the Chairman"
                    description={data.video.description}
                    ratio={data.video.ratio || "16:9"}
                  />
                </Reveal>
              )}
            </div>

            {/* Right Column (7/12) */}
            <div className="lg:col-span-7">
              <Reveal direction="left" stagger className="space-y-12">
                <div className="space-y-4 border-b border-line pb-8">
                  <h2 className="text-display-lg text-green-950">
                    {data.name.value}
                  </h2>
                  <p className="text-h3 text-sun-700">{data.title.value}</p>
                </div>
                
                <div className="prose prose-lg prose-green max-w-none text-ink-muted">
                  <h3 className="text-h3 text-green-900 mt-8 mb-4">Welcome Message</h3>
                  <p className="whitespace-pre-wrap">{data.welcomeMessage.value}</p>
                  
                  <h3 className="text-h3 text-green-900 mt-12 mb-4">Biography</h3>
                  <p className="whitespace-pre-wrap">{data.biography.value}</p>
                  
                  <h3 className="text-h3 text-green-900 mt-12 mb-4">Leadership Philosophy</h3>
                  <p className="whitespace-pre-wrap">{data.philosophy.value}</p>
                  
                  <h3 className="text-h3 text-green-900 mt-12 mb-4">Foundation Vision</h3>
                  <p className="whitespace-pre-wrap">{data.foundationVision.value}</p>
                </div>
                
                {/* Signature */}
                <div className="pt-8 mt-12 border-t border-line">
                  {data.signature && !data.signature.isPlaceholder ? (
                    <div className="relative w-48 h-16">
                      <Image
                        src={data.signature.src}
                        alt={data.signature.alt || "Chairman's signature"}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  ) : (
                    <div className="font-display text-3xl italic text-green-950">
                      {data.name.value}
                    </div>
                  )}
                  <p className="text-sm font-semibold tracking-wider uppercase text-ink-muted mt-2">
                    {data.title.value}
                  </p>
                </div>
              </Reveal>

              {data.video && (
                <Reveal delay={200} className="mt-12 block lg:hidden">
                  <VideoPlaceholder
                    label="Message from the Chairman"
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
