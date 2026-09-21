import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { getGalleryByCategory } from '@/lib/content';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import MediaPlaceholder from '../ui/MediaPlaceholder';

export default function GalleryPreview() {
  const items = getGalleryByCategory('All').slice(0, 6);
  if (!items.length) return null;

  // Pre-defined composition template for 6 items in 12 cols
  // Row 1: span-4 (3:4), span-5 (16:9), span-3 (1:1)
  // Row 2: span-3 (1:1), span-6 (4:3), span-3 (4:5)
  const template = [
    { cols: "md:col-span-4", ratio: "3:4" },
    { cols: "md:col-span-5", ratio: "16:9" },
    { cols: "md:col-span-3", ratio: "1:1" },
    { cols: "md:col-span-3", ratio: "1:1" },
    { cols: "md:col-span-6", ratio: "4:3" },
    { cols: "md:col-span-3", ratio: "4:5" },
  ];

  return (
    <section className="section-cream py-[var(--section-padding)]">
      <Container>
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <SectionHeading heading="A glimpse of our work" />
            <Button href="/gallery" variant="secondary" className="hidden md:inline-flex">
              VIEW GALLERY
            </Button>
          </div>
        </Reveal>

        <Reveal stagger>
          <div className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-4 auto-rows-min">
            {items.map((item, i) => {
              const layout = template[i % template.length];
              return (
                <div 
                  key={item.id} 
                  className={clsx("relative rounded-[2px] overflow-hidden", layout.cols)}
                >
                  {item.isPlaceholder ? (
                    <MediaPlaceholder
                      label="GALLERY"
                      description={item.caption || 'Gallery Image'}
                      ratio={layout.ratio}
                      className="w-full h-full bg-sage-50"
                      size="sm"
                    />
                  ) : (
                    <div className="relative w-full h-full min-h-[150px]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center md:hidden">
          <Button href="/gallery" variant="secondary">
            VIEW GALLERY
          </Button>
        </div>
      </Container>
    </section>
  );
}
