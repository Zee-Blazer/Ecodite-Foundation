import React from 'react';
import Image from 'next/image';
import type { Program } from '../../types/content';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import SectionHeading from '../ui/SectionHeading';

export default function ProgramDetail({ program }: { program: Program }) {
  return (
    <article className="py-24 bg-cream min-h-screen">
      <Container width="reading" className="space-y-16">
        
        {/* Introduction */}
        {program.introduction && (
          <Reveal>
            <div className="prose prose-lg prose-green max-w-none text-ink-muted">
              <p className="text-xl leading-relaxed text-green-950 font-medium">
                {program.introduction.value}
              </p>
            </div>
          </Reveal>
        )}

        {/* What it does & Who it serves */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {program.whatItDoes && (
            <Reveal delay={100}>
              <h3 className="text-h3 text-green-900 mb-4">What the programme does</h3>
              <p className="text-ink-muted leading-relaxed">
                {program.whatItDoes.value}
              </p>
            </Reveal>
          )}
          
          {program.whoItServes && (
            <Reveal delay={200}>
              <h3 className="text-h3 text-green-900 mb-4">Who it serves</h3>
              <p className="text-ink-muted leading-relaxed">
                {program.whoItServes.value}
              </p>
            </Reveal>
          )}
        </div>

        {/* Objectives */}
        {program.objectives && program.objectives.length > 0 && (
          <Reveal>
            <div className="bg-sage-50 p-8 md:p-12 rounded-sm border border-line">
              <h3 className="text-h3 text-green-950 mb-6">Objectives</h3>
              <ul className="space-y-4">
                {program.objectives.map((obj, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-sun-500 font-bold">•</span>
                    <span className="text-ink-muted">{obj.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {/* Activities */}
        {program.activities && program.activities.length > 0 && (
          <Reveal>
            <h3 className="text-h3 text-green-900 mb-6">Key Activities</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {program.activities.map((act, i) => (
                <li key={i} className="bg-white p-6 rounded-sm border border-line flex items-start gap-4">
                  <span className="text-sun-500 text-lg">✦</span>
                  <span className="text-ink-muted leading-snug">{act.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Gallery */}
        {program.gallery && program.gallery.length > 0 && (
          <Reveal>
            <h3 className="text-h3 text-green-900 mb-6">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {program.gallery.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-sm overflow-hidden bg-sage-100">
                  {img.isPlaceholder ? (
                    <MediaPlaceholder
                      label="Program Image"
                      description={img.description}
                      ratio={img.ratio || "1:1"}
                      size="sm"
                      className="w-full h-full"
                    />
                  ) : (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 50vw"
                    />
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Support CTA */}
        <Reveal className="pt-16 border-t border-line text-center space-y-8">
          <SectionHeading heading="Support this programme" align="center" />
          <p className="text-ink-muted max-w-xl mx-auto">
            Your contribution helps us continue to provide these essential services to the community.
          </p>
          <Button href="/donate" variant="primary" arrow>
            Support Now
          </Button>
        </Reveal>
        
      </Container>
    </article>
  );
}
