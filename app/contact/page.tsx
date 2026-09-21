import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import ContactForm from '@/components/sections/ContactForm';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Ecodite Educational Foundation.',
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-sage-50">
      <section className="bg-green-800 py-12 md:py-16 text-cream">
        <Container>
          <h1 className="text-display-lg font-display mb-4">Get in touch</h1>
          <p className="text-body-lg text-sage-100 max-w-2xl">
            We&apos;d love to hear from you. Whether you have a question about our programs, want to partner with us, or just want to say hello.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <div className="bg-white p-8 rounded-[8px] border border-line mb-8">
                <h2 className="text-h3 font-display text-green-950 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[12px] uppercase tracking-wider text-ink-muted font-semibold mb-2">Address</h3>
                    <p className="text-ink">{siteConfig.contact.address.value}</p>
                  </div>
                  <div>
                    <h3 className="text-[12px] uppercase tracking-wider text-ink-muted font-semibold mb-2">Email</h3>
                    <a href={`mailto:${siteConfig.contact.email.value}`} className="text-green-800 hover:underline">
                      {siteConfig.contact.email.value}
                    </a>
                  </div>
                  <div>
                    <h3 className="text-[12px] uppercase tracking-wider text-ink-muted font-semibold mb-2">Phone</h3>
                    <a href={`tel:${siteConfig.contact.phone.value}`} className="text-green-800 hover:underline">
                      {siteConfig.contact.phone.value}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[8px] border border-line">
                <h2 className="text-h3 font-display text-green-950 mb-6">Follow Us</h2>
                <div className="flex gap-4">
                  {siteConfig.socialLinks.filter(l => l.url).map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-sage-50 rounded-[6px] text-[14px] font-medium text-green-800 hover:bg-green-800/10 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  {siteConfig.socialLinks.filter(l => l.url).length === 0 && (
                    <p className="text-ink-muted text-sm">Social links coming soon.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-[8px] border border-line">
              <h2 className="text-h3 font-display text-green-950 mb-8">Send us a message</h2>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
