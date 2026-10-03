import type { HeroData, HomeIntro, HomeStatement, HomeChairmanPreview, HomeSupportCta, HomeNewsletterContent } from '../types/content';

export const heroData: HeroData = {
  eyebrow: 'ECODITE FOUNDATION',
  headline: { value: 'Learn, Create, Become.', isPlaceholder: false, status: 'draft' },
  supportCopy: { value: 'Creating opportunities for young people to learn, discover their potential, develop practical skills and build a future shaped by creativity and knowledge.', isPlaceholder: false, status: 'draft' },
  primaryCta: { label: 'EXPLORE OUR PROGRAMS', href: '/programs' },
  media: { src: '/videos/hero-vid-1.mp4', alt: 'School kids actively learning and collaborating with computers', ratio: '16:9', description: 'Video of school kids engaged in study, technology, and learning sessions.', isPlaceholder: false }
};

export const homeIntro: HomeIntro = {
  eyebrow: '01 / Who we are',
  headline: { value: 'Building people. Building possibilities. Building tomorrow.', isPlaceholder: false, status: 'draft' },
  body: { value: '[FOUNDATION INTRODUCTION]', isPlaceholder: true },
  link: { label: 'Learn more about us', href: '/about' },
  image: { src: '/images/home/young-adults-collaborating-at-whiteboard.jpeg', alt: 'Young adults collaborating at a whiteboard', ratio: '4:5', description: 'Intro visual', isPlaceholder: false }
};

export const homeStatement: HomeStatement = {
  text: { value: 'Every young person carries an idea. Our role is to help them discover what they can do with it.', isPlaceholder: false, status: 'draft' }
};

export const homeChairmanPreview: HomeChairmanPreview = {
  portrait: {
    src: '/images/leadership/edith-chukwuyem-osiagwu.jpg',
    alt: 'Portrait of Edith Chukwuyem Osiagwu, Founder of Ecodite Educational Foundation',
    ratio: '4:5',
    description: 'Portrait of Edith Chukwuyem Osiagwu',
    isPlaceholder: false,
  },
  eyebrow: "Chairman's Corner",
  welcomeHeadline: 'Welcome to Ecodite Educational Foundation',
  quote: {
    value: 'At Ecodite, we believe that every child deserves an opportunity to learn, grow, discover their potential and build a meaningful future.',
    isPlaceholder: false,
  },
  signature: { value: 'Edith Chukwuyem Osiagwu', isPlaceholder: false },
  name: { value: 'Edith Chukwuyem Osiagwu', isPlaceholder: false },
  title: 'Founder, Ecodite Educational Foundation',
  link: { label: 'Read the full message', href: '/chairmans-corner' },
};

export const homeSupportCta: HomeSupportCta = {
  headline: { value: 'Help a young person find their path. Your support makes learning, creativity and growth possible.', isPlaceholder: false, status: 'draft' },
  donateCta: { label: 'DONATE', href: '/donate' },
  partnerCta: { label: 'PARTNER WITH US', href: '/contact?subject=partnership' },
  volunteerCta: { label: 'VOLUNTEER', href: '/contact?subject=volunteer' }
};

export const homeNewsletter: HomeNewsletterContent = {
  headline: 'Stay connected with Ecodite Foundation.',
  placeholder: 'Enter your email address',
  buttonLabel: 'SUBSCRIBE'
};
