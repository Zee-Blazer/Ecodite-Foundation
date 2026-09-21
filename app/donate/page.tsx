import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Container from '@/components/ui/Container';
import DonateForm from '@/components/sections/DonateForm';
import { getDonateData } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support the Ecodite Educational Foundation and help us create opportunities for young people.',
};

export default function DonatePage() {
  const donateData = getDonateData();

  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-green-800 py-16 md:py-24 text-cream">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-display-lg font-display mb-6">Support the future.</h1>
          </div>
        </Container>
      </section>

      <div className="bg-sage-50 py-4 border-b border-line">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Donate', href: '/donate' },
            ]}
          />
        </Container>
      </div>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div className="flex flex-col space-y-12">
              <div className="prose prose-lg text-ink">
                <p className="text-h3 font-display mb-6">
                  {donateData.headline.value}
                </p>
                <p>{donateData.message.value}</p>
              </div>

              <div className="bg-sage-100 p-8 rounded-[8px]">
                <h2 className="text-h3 font-display mb-4 text-green-950">How your gift is used</h2>
                <div className="text-ink-muted leading-relaxed">
                  {donateData.howGiftIsUsed.value}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[8px] border border-line">
              <DonateForm data={donateData} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
