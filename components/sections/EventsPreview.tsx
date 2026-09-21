import React from 'react';
import Link from 'next/link';
import { getUpcomingEvents, getSiteConfig } from '@/lib/content';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import StatusTag from '../ui/StatusTag';

export default function EventsPreview() {
  const events = getUpcomingEvents().slice(0, 4);
  const config = getSiteConfig();

  if (!events.length && !config.showPlaceholders) {
    return null;
  }

  return (
    <section className="section-sage-50 py-[var(--section-padding)]">
      <Container width="reading">
        <Reveal>
          <SectionHeading heading="Upcoming events" className="mb-12" />
        </Reveal>

        <div className="flex flex-col border-t border-line">
          {events.map((event, i) => {
            const d = new Date(event.date);
            const month = d.toLocaleString('en-US', { month: 'short' });
            const day = d.getDate();

            return (
              <Reveal key={event.slug} delay={i * 100}>
                <Link 
                  href={`/events/${event.slug}`}
                  className="group flex flex-col md:flex-row md:items-center gap-6 py-8 border-b border-line hover:bg-white/50 transition-colors px-4 -mx-4 rounded-sm"
                >
                  <div className="flex flex-col items-center justify-center min-w-[80px] bg-white rounded-[6px] py-3 text-center">
                    <span className="text-xs uppercase font-semibold text-sun-700 tracking-wider">
                      {month}
                    </span>
                    <span className="font-display text-2xl text-ink">
                      {day}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-ink group-hover:text-green-800 transition-colors">
                      {event.title.value}
                    </h3>
                    <div className="text-ink-muted text-sm flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {event.location.value}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <StatusTag status={event.status} />
                    <span className="text-green-800 transition-transform duration-300 group-hover:translate-x-1 hidden md:block">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
