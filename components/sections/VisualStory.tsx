import React from 'react';
import Image from 'next/image';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import type { MediaSlot } from '@/types/content';

export default function VisualStory() {
  const media: MediaSlot = {
    src: '/images/home/children-watching-3d-printer.jpeg',
    alt: 'Children watching a 3D printer during a technology workshop',
    ratio: '21:9',
    description: '[IMPACT IMAGE/VIDEO] showing workshops, technology training, reading',
    isPlaceholder: false
  };

  return (
    <section className="w-full relative">
      <div className="w-full aspect-[16/9] md:aspect-[21/9] relative">
        {media.isPlaceholder ? (
          <MediaPlaceholder
            label="VISUAL STORY"
            description={media.description}
            ratio={media.ratio}
            className="w-full h-full rounded-none"
            dark
          />
        ) : (
          <>
            <Image
              src={media.src}
              alt={media.alt}
              fill
              className="object-cover"
            />
            {/* Subtle dark gradient for text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-cream text-sm font-medium">
              Ecodite Foundation at work
            </div>
          </>
        )}
      </div>
    </section>
  );
}
