import React from 'react';
import Link from 'next/link';
import { getSiteConfig } from '../../lib/content';
import Logo from '../ui/Logo';
import Container from '../ui/Container';
import Rays from '../ui/Rays';

export default function Footer() {
  const config = getSiteConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-950 text-cream relative overflow-hidden pt-16 pb-8 lg:pt-24 lg:pb-12" role="contentinfo">
      <Rays className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] pointer-events-none opacity-[0.03]" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="flex flex-col gap-6">
            <Logo variant="light" size="lg" />
            <p className="text-body text-sage-100">{config.description}</p>
            <span className="text-eyebrow text-sun-500">Create. Learn. Become.</span>
          </div>

          <div>
            <h3 className="text-h3 mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/" className="hover:text-sun-500 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-sun-500 transition-colors">About Us</Link></li>
              <li><Link href="/programs" className="hover:text-sun-500 transition-colors">Our Programs</Link></li>
              <li><Link href="/gallery" className="hover:text-sun-500 transition-colors">Gallery</Link></li>
              <li><Link href="/news" className="hover:text-sun-500 transition-colors">News & Updates</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-h3 mb-6">Support</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/donate" className="hover:text-sun-500 transition-colors">Donate</Link></li>
              <li><Link href="/contact?subject=partnership" className="hover:text-sun-500 transition-colors">Partner With Us</Link></li>
              <li><Link href="/contact?subject=volunteer" className="hover:text-sun-500 transition-colors">Volunteer</Link></li>
              <li><Link href="/contact" className="hover:text-sun-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-h3 mb-6">Contact</h3>
            <address className="not-italic flex flex-col gap-3 text-sage-100 mb-6">
              <p>{config.contact.address.value}</p>
              <p><a href={`mailto:${config.contact.email.value}`} className="hover:text-sun-500 transition-colors">{config.contact.email.value}</a></p>
              <p><a href={`tel:${config.contact.phone.value}`} className="hover:text-sun-500 transition-colors">{config.contact.phone.value}</a></p>
            </address>
            <div className="flex gap-4">
              {config.socialLinks.filter(s => s.url).map(social => (
                <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-sun-500 transition-colors" aria-label={social.label}>
                  <span className="capitalize">{social.platform}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-line-dark mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sage-100/70">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Link href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms" className="hover:text-cream transition-colors">Terms & Conditions</Link>
            <span aria-hidden="true">|</span>
            <Link href="/cookies" className="hover:text-cream transition-colors">Cookie Policy</Link>
          </div>
          <p>© {currentYear} {config.legalName}. All rights reserved.</p>
        </div>
        
        <p className="text-center text-eyebrow text-sun-500 opacity-30 mt-12">
          Create. Learn. Become.
        </p>
      </Container>
    </footer>
  );
}
