import React from 'react';
import Link from 'next/link';
import { getSiteConfig } from '../../lib/content';
import Container from '../ui/Container';

export default function Footer() {
  const config = getSiteConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-950 text-cream py-14 lg:py-16 border-t border-line-dark/20" role="contentinfo">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col gap-3 max-w-md">
            <span className="font-display text-xl font-bold tracking-tight text-cream">
              {config.name}
            </span>
            <p className="text-sm text-sage-100/80 leading-relaxed">
              {config.description}
            </p>
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-sun-500 mt-1">
              Learn, Create, Become.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-cream/60 font-semibold mb-4">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-sage-100/90">
              <li><Link href="/" className="hover:text-sun-500 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-sun-500 transition-colors">About Us</Link></li>
              <li><Link href="/chairmans-corner" className="hover:text-sun-500 transition-colors">Chairman&apos;s Corner</Link></li>
              <li><Link href="/programs" className="hover:text-sun-500 transition-colors">Our Programs</Link></li>
              <li><Link href="/gallery" className="hover:text-sun-500 transition-colors">Gallery</Link></li>
              <li><Link href="/news" className="hover:text-sun-500 transition-colors">News &amp; Updates</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-cream/60 font-semibold mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-sage-100/90">
              <Link href="/contact" className="hover:text-sun-500 transition-colors">Contact Us</Link>
              <Link href="/donate" className="hover:text-sun-500 transition-colors">Donate &amp; Support</Link>
              {config.contact.email.value && !config.contact.email.isPlaceholder && (
                <a href={`mailto:${config.contact.email.value}`} className="hover:text-sun-500 transition-colors break-all">
                  {config.contact.email.value}
                </a>
              )}
              {config.contact.phone.value && !config.contact.phone.isPlaceholder && (
                <a href={`tel:${config.contact.phone.value}`} className="hover:text-sun-500 transition-colors">
                  {config.contact.phone.value}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-line-dark/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-sage-100/60">
          <p>© {currentYear} {config.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-cream transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-cream transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-cream transition-colors">Cookies</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
