import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEventBySlug, getEvents, getSiteConfig } from '@/lib/content';
import PageHero from '@/components/hero/PageHero';
import EventDetail from '@/components/sections/EventDetail';

export function generateStaticParams() {
  const events = getEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = getEventBySlug(params.slug);
  if (!event) return { title: 'Not Found' };
  
  return {
    title: event.title.value,
    description: event.description.value,
  };
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  const config = getSiteConfig();
  
  if (!event) {
    notFound();
  }

  const startDate = new Date(event.date);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title.value,
    "startDate": startDate.toISOString(),
    "endDate": event.endDate ? new Date(event.endDate).toISOString() : undefined,
    "eventStatus": event.status === 'upcoming' ? "https://schema.org/EventScheduled" : 
                   event.status === 'past' ? "https://schema.org/EventMovedOnline" : "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": event.location.value
    },
    "description": event.description.value,
    "image": event.image && !event.image.isPlaceholder ? [`${config.url}${event.image.src}`] : undefined
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col min-h-screen">
        <PageHero
          title={event.title.value}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Events', href: '/events' },
            { label: 'Event Details', href: `/events/${event.slug}` },
          ]}
          compact
        />
        <EventDetail event={event} />
      </div>
    </>
  );
}
