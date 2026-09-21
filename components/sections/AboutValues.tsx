import React from 'react';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import type { AboutValue } from '../../types/content';
import SectionHeading from '../ui/SectionHeading';

export default function AboutValues({ values }: { values: AboutValue[] }) {
  const actualValues = values.filter(v => !v.isPlaceholder);
  if (actualValues.length === 0) return null;

  return (
    <section className="py-24 bg-cream text-ink">
      <Container>
        <SectionHeading heading="Our Values" align="center" className="mb-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Reveal stagger>
            {actualValues.map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[8px] border border-line flex flex-col gap-4">
                <h3 className="text-h3 text-green-900">{value.title.value}</h3>
                <p className="text-body text-ink-muted leading-relaxed">
                  {value.description.value}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
