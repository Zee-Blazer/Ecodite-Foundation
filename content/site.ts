import type { SiteConfig } from '../types/content';

export const siteConfig: SiteConfig = {
  name: 'Ecodite Foundation',
  legalName: 'Ecodite Educational Foundation',
  description: 'Creating opportunities for young people to learn, discover their potential, develop practical skills and build a future shaped by creativity and knowledge.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ecoditefoundation.org',
  contact: {
    address: { value: 'Placeholder Address', isPlaceholder: true },
    email: { value: 'info@ecoditefoundation.org', isPlaceholder: false },
    phone: { value: '08127982687', isPlaceholder: false },
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
    {
      label: 'About Us',
      href: '/about',
      children: [
        { label: 'Who We Are', href: '/about' },
        { label: "Chairman's Corner", href: '/chairmans-corner' },
      ],
    },
    {
      label: 'Our Programs',
      href: '/programs',
      children: [
        { label: 'All Programs', href: '/programs' },
        { label: 'Library', href: '/programs/library' },
        { label: 'Resource Center', href: '/programs/resource-center' },
        { label: 'Vocational Training', href: '/programs/vocational-training' },
        { label: 'Mentorship', href: '/programs/mentorship' },
      ],
    },
    {
      label: 'Media',
      href: '/gallery',
      children: [
        { label: 'Gallery', href: '/gallery' },
        { label: 'News & Updates', href: '/news' },
      ],
    },
    { label: 'Contact', href: '/contact' },
  ],
  donateEnabled: true,
  paymentsEnabled: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === 'true',
  searchEnabled: true,
  showPlaceholders: process.env.SHOW_PLACEHOLDERS !== 'false',
};
