import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Container from '@/components/ui/Container';
import { getLegalPage } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPolicyPage() {
  const pageData = getLegalPage('privacy-policy');

  if (!pageData) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-green-800 py-12 text-cream">
        <Container width="reading">
          <h1 className="text-display-lg font-display mb-4">{pageData.title}</h1>
          <p className="text-sage-100">Last updated: {new Date(pageData.lastUpdated).toLocaleDateString()}</p>
        </Container>
      </section>

      <div className="bg-sage-50 py-4 border-b border-line mb-12">
        <Container width="reading">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy Policy', href: '/privacy' },
            ]}
          />
        </Container>
      </div>

      <section className="pb-24">
        <Container width="reading">
          <div className="mb-12 p-4 bg-sun-500/10 border-l-4 border-sun-500 text-ink">
            <strong>Warning:</strong> This privacy policy is a placeholder and requires review by qualified legal counsel before publication.
          </div>
          
          <div className="prose prose-lg text-ink max-w-none">
            {pageData.content.value}
          </div>
        </Container>
      </section>
    </div>
  );
}
