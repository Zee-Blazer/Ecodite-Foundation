import React from 'react';
import { getImpactStats } from '@/lib/content';
import Container from '../ui/Container';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function ImpactStats() {
  const stats = getImpactStats();

  return (
    <section className="bg-green-800 text-cream py-14 md:py-20 border-y border-line-dark/40">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line-dark">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="flex flex-col items-center sm:items-start py-8 sm:py-2 px-4 sm:px-8 text-center sm:text-left"
            >
              <div className="text-h1 md:text-display-xl font-bold text-sun-500 mb-2 font-display">
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
      </Container>
    </section>
  );
}

