import React from 'react';
import Image from 'next/image';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import type { MediaSlot } from '@/types/content';

export interface HeroMediaProps {
  media: MediaSlot;
}

export default function HeroMedia({ media }: HeroMediaProps) {
  if (media.isPlaceholder) {
    return (
      <div className="w-full h-full relative">
        <MediaPlaceholder
          label="HERO MEDIA"
          description={media.description}
          ratio={media.ratio || '16:9'}
          dark
          contentPosition="top"
          className="absolute inset-0 w-full h-full rounded-none"
        />
      </div>
    );
  }

  // Check if it's a video based on extension
  const isVideo = media.src.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Art direction: documentary style, candid, warm grade */}
      {isVideo ? (
        <video
          src={media.src}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          title={media.alt}
        />
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}
    </div>
  );
}
