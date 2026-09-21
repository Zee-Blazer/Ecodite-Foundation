import React from 'react';
import type { Metadata } from 'next';
import { getAboutData, getLeadership } from '@/lib/content';
import PageHero from '@/components/hero/PageHero';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import AboutValues from '@/components/sections/AboutValues';
import LeadershipGrid from '@/components/sections/LeadershipGrid';
import SectionHeading from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about the Ecodite Educational Foundation, our mission, vision, and the people behind our work.',
};

export default function AboutPage() {
  const aboutData = getAboutData();
  const leadership = getLeadership();

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="About Us"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
        ]}
        image={aboutData.heroImage}
      />

      {/* Who We Are */}
      <section className="py-24 bg-cream">
        <Container width="reading">
          <Reveal>
            <SectionHeading heading="Who We Are" className="mb-8" />
            <div className="prose prose-lg prose-green max-w-none text-ink-muted">
              <p className="whitespace-pre-wrap">{aboutData.whoWeAre.value}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-24 bg-cream border-t border-line">
        <Container>
          <Reveal>
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <span className="text-eyebrow text-sun-700">Our Mission</span>
              <h2 className="text-display-lg text-green-950 text-balance leading-tight">
                {aboutData.mission.value}
              </h2>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Vision */}
      <section className="py-32 bg-sage-50">
        <Container>
          <Reveal delay={100}>
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <span className="text-eyebrow text-sun-700">Our Vision</span>
              <h2 className="text-display-lg text-green-950 text-balance leading-tight">
                {aboutData.vision.value}
              </h2>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <AboutValues values={aboutData.values} />

      {/* Approach */}
      <section className="py-24 bg-white border-t border-line">
        <Container width="reading">
          <Reveal>
            <SectionHeading heading="Our Approach" className="mb-8" />
            <div className="prose prose-lg prose-green max-w-none text-ink-muted">
              <p className="whitespace-pre-wrap">{aboutData.approach.value}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Leadership */}
      <LeadershipGrid members={leadership} />
    </div>
  );
}
