import React from 'react';
import { getImpactStats, getSiteConfig } from '@/lib/content';
import Container from '../ui/Container';
import AnimatedCounter from '../ui/AnimatedCounter';
import Eyebrow from '../ui/Eyebrow';

export default function ImpactStats() {
  const stats = getImpactStats();
  const config = getSiteConfig();
  
  // Check if all stats are placeholder null
  const allNull = stats.every(s => s.value === null);
  if (allNull && !config.showPlaceholders) {
    return null;
  }

  return (
    <section className="bg-green-800 text-cream py-[var(--section-padding)]">
      <Container>
        <div className="flex flex-col gap-16 md:gap-24">
          <div className="max-w-3xl">
            <Eyebrow className="text-sun-500 mb-6">Our impact</Eyebrow>
            <h2 className="text-display-lg text-cream">
              Change becomes visible when opportunity reaches people.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-line-dark">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="flex flex-col py-8 px-4 md:px-8 border-b md:border-b-0 border-r-0 md:border-r border-line-dark last:border-r-0 nth-[2n]:border-r-0 md:nth-[2n]:border-r"
              >
                <div className="text-h2 md:text-display-lg text-sun-500 mb-2">
                  <AnimatedCounter 
                    target={stat.value} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                  />
                </div>
                <div className="text-sm font-semibold uppercase tracking-wider text-cream/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
