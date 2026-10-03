'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import type { MediaSlot } from '@/types/content';

export interface HeroMediaProps {
  media: MediaSlot;
}

const HERO_VIDEOS = [
  '/videos/hero-vid-1.mp4',
  '/videos/hero-vid-2.mp4',
];

export default function HeroMedia({ media }: HeroMediaProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const activeVideo = videoRefs.current[currentIdx];
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {
        // Autoplay may be deferred until user interaction on some mobile browsers
      });
    }
  }, [currentIdx]);

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

  return (
    <div className="w-full h-full relative overflow-hidden bg-green-950">
      {/* Seamless cross-playing hero videos */}
      {HERO_VIDEOS.map((src, idx) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[idx] = el;
          }}
          src={src}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentIdx === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          muted
          playsInline
          autoPlay={idx === 0}
          onEnded={() => {
            setCurrentIdx((prev) => (prev + 1) % HERO_VIDEOS.length);
          }}
          title={`Ecodite Foundation School Kids Video ${idx + 1}`}
        />
      ))}

      {/* Fallback image in case video fails to load or on data-saver */}
      <Image
        src="/images/home/children-watching-3d-printer.jpeg"
        alt={media.alt}
        fill
        priority
        className="object-cover -z-10"
        sizes="100vw"
      />
    </div>
  );
}
