import React from 'react';
import Image from 'next/image';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import type { LeadershipMember } from '../../types/content';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import SectionHeading from '../ui/SectionHeading';

export default function LeadershipGrid({ members }: { members: LeadershipMember[] }) {
  if (members.length === 0) return null;

  return (
    <section className="py-24 bg-sage-50 text-ink">
      <Container>
        <SectionHeading heading="Leadership" align="center" className="mb-16" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <Reveal stagger>
            {members.map((member, idx) => (
              <div key={idx} className="flex flex-col gap-6 group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-sage-100">
                  {member.image.isPlaceholder ? (
                    <MediaPlaceholder
                      label="Portrait"
                      description={member.image.description}
                      ratio={member.image.ratio || "3:4"}
                      className="w-full h-full"
                    />
                  ) : (
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  )}
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-h3 text-green-950">{member.name.value}</h3>
                  <p className="text-body text-ink-muted">{member.role.value}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
