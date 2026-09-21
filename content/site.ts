import type { SiteConfig } from '../types/content';

export const siteConfig: SiteConfig = {
  name: 'Ecodite Foundation',
  legalName: 'Ecodite Educational Foundation',
  description: 'Creating opportunities for young people to learn, discover their potential, develop practical skills and build a future shaped by creativity and knowledge.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ecoditefoundation.org',
  contact: {
    address: { value: 'Placeholder Address', isPlaceholder: true },
    email: { value: 'placeholder@example.com', isPlaceholder: true },
    phone: { value: '+2340000000000', isPlaceholder: true },
  },
  socialLinks: [
    { platform: 'twitter', url: '', label: 'Twitter' },
    { platform: 'instagram', url: '', label: 'Instagram' },
    { platform: 'facebook', url: '', label: 'Facebook' },
    { platform: 'linkedin', url: '', label: 'LinkedIn' },
    { platform: 'youtube', url: '', label: 'YouTube' },
  ],
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: "Chairman's Corner", href: '/chairmans-corner' },
    { label: 'Our Programs', href: '/programs' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'News & Updates', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ],
  donateEnabled: true,
  paymentsEnabled: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === 'true',
  searchEnabled: true,
  showPlaceholders: process.env.SHOW_PLACEHOLDERS !== 'false',
};
