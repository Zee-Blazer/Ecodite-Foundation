import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getEvents, getSiteConfig } from '@/lib/content';
import PageHero from '@/components/hero/PageHero';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import StatusTag from '@/components/ui/StatusTag';
import ArrowLink from '@/components/ui/ArrowLink';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Join us for upcoming events, workshops, and community gatherings.',
};

export default function EventsPage() {
  const events = getEvents();
  const config = getSiteConfig();

  const renderEmptyState = () => (
    <Container className="py-24 text-center">
      <p className="text-ink-muted text-lg">No events scheduled at the moment.</p>
    </Container>
  );

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        title="Events"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
        ]}
        compact
      />

      {events.length === 0 && !config.showPlaceholders ? (
        renderEmptyState()
      ) : (
        <section className="py-16 md:py-24">
          <Container width="reading">
            <div className="flex flex-col gap-6">
              <Reveal stagger>
                {events.map((event) => {
                  const eventDate = new Date(event.date);
                  
                  return (
                    <article key={event.slug} className="group relative block bg-white border border-line rounded-sm overflow-hidden hover:border-sun-500 transition-all">
                      <Link href={`/events/${event.slug}`} className="absolute inset-0 z-10">
                        <span className="sr-only">View {event.title.value}</span>
                      </Link>
                      
                      <div className="flex flex-col sm:flex-row">
                        {/* Date Block */}
                        <div className="flex flex-row sm:flex-col items-center sm:justify-center p-6 bg-sage-50 border-b sm:border-b-0 sm:border-r border-line sm:w-48 gap-4 sm:gap-1">
                          <span className="text-display-lg text-green-950 font-display">
                            {eventDate.getDate().toString().padStart(2, '0')}
                          </span>
                          <span className="text-sm font-semibold uppercase tracking-wider text-sun-700">
                            {eventDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-3">
                            <StatusTag status={event.status} />
                            <span className="text-sm font-medium text-ink-muted line-clamp-1">
                              {event.location.value}
                            </span>
                          </div>
                          <h3 className="text-h3 text-green-950 mb-4 group-hover:text-sun-700 transition-colors">
                            {event.title.value}
                          </h3>
                          <div className="mt-auto pt-2">
                            <ArrowLink href={`/events/${event.slug}`}>Event Details</ArrowLink>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </Reveal>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
