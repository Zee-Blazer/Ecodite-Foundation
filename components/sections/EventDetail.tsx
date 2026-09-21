import React from 'react';
import Image from 'next/image';
import type { EcoditeEvent } from '../../types/content';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import Button from '../ui/Button';

export default function EventDetail({ event }: { event: EcoditeEvent }) {
  const startDate = new Date(event.date);
  const endDate = event.endDate ? new Date(event.endDate) : undefined;
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <article className="py-16 md:py-24 bg-white">
      <Container width="reading" className="space-y-12">
        <Reveal>
          {event.image && (
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden bg-sage-100 mb-12">
              {event.image.isPlaceholder ? (
                <MediaPlaceholder
                  label="Event Image"
                  description={event.image.description}
                  ratio={event.image.ratio || "16:9"}
                  className="w-full h-full"
                />
              ) : (
                <Image
                  src={event.image.src}
                  alt={event.image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 720px, 100vw"
                  priority
                />
              )}
            </div>
          )}

          <div className="bg-sage-50 border border-line p-8 rounded-sm mb-12 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-sun-700 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-semibold text-green-950">{formatDate(startDate)}</p>
                  <p className="text-sm text-ink-muted">{formatTime(startDate)} {endDate && `- ${formatTime(endDate)}`}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-sun-700 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-semibold text-green-950">{event.location.value}</p>
                </div>
              </div>
            </div>
            
            {event.status === 'upcoming' && (
              <div className="w-full md:w-auto shrink-0">
                <Button className="w-full md:w-auto" variant="primary">
                  Register Now
                </Button>
              </div>
            )}
          </div>

          <div className="prose prose-lg prose-green max-w-none text-ink-muted">
            <h3 className="text-h3 text-green-900 mb-4">About this Event</h3>
            <p className="whitespace-pre-wrap">{event.description.value}</p>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
