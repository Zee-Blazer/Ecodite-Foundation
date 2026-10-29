import type { HeroData, HomeIntro, HomeStatement, HomeChairmanPreview, HomeSupportCta, HomeNewsletterContent } from '../types/content';

export const heroData: HeroData = {
  eyebrow: 'ECODITE FOUNDATION',
  headline: { value: 'Learn, Create, Become.', isPlaceholder: false, status: 'draft' },
  supportCopy: { value: 'Creating opportunities for young people to learn, discover their potential, develop practical skills and build a future shaped by knowledge and creativity.', isPlaceholder: false, status: 'draft' },
  primaryCta: { label: 'EXPLORE OUR PROGRAMS', href: '/programs' },
  media: { src: '/videos/hero-vid-2.mp4', alt: 'Secondary school students in uniform actively learning robotics and technology in the classroom', ratio: '16:9', description: 'Video of secondary school students engaged in technology and practical learning.', isPlaceholder: false }
};

export const homeIntro: HomeIntro = {
  eyebrow: 'Who we are',
  headline: { value: 'Building people. Building possibilities. Building tomorrow.', isPlaceholder: false, status: 'draft' },
  body: { value: '', isPlaceholder: false },
  link: { label: 'Learn more about us', href: '/about' },
  image: {
    src: '/images/home/secondary-students-robotics-car.jpeg',
    alt: 'Nigerian secondary school students in uniform collaborating on assembling and fixing a toy robotic car',
    ratio: '4:5',
    description: 'Students in uniform fixing and assembling a toy robotic car kit',
    isPlaceholder: false,
  },
};

export const homeStatement: HomeStatement = {
  text: { value: 'Every young person carries an idea. Our role is to help them discover what they can do with it.', isPlaceholder: false, status: 'draft' }
};

export const homeChairmanPreview: HomeChairmanPreview = {
  portrait: {
    src: '/images/leadership/edith-osiagwu.jpg',
    alt: 'Portrait of Edith Osiagwu, Founder of Ecodite Educational Foundation',
    ratio: '4:5',
    description: 'Portrait of Edith Osiagwu',
    isPlaceholder: false,
  },
  eyebrow: "Chairman's Corner",
  welcomeHeadline: 'Welcome to Ecodite Educational Foundation',
  quote: {
    value: 'At Ecodite, we believe that every child deserves the opportunity to learn, grow, and discover their potential to build a meaningful future.',
    isPlaceholder: false,
  },
  signature: { value: 'Edith Osiagwu', isPlaceholder: false },
  name: { value: 'Edith Osiagwu', isPlaceholder: false },
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
