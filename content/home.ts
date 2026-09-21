import type { HeroData, HomeIntro, HomeStatement, HomeChairmanPreview, HomeSupportCta, HomeNewsletterContent } from '../types/content';

export const heroData: HeroData = {
  eyebrow: 'ECODITE FOUNDATION',
  headline: { value: 'Create. Learn. Become.', isPlaceholder: false, status: 'draft' },
  supportCopy: { value: 'Creating opportunities for young people to learn, discover their potential, develop practical skills and build a future shaped by creativity and knowledge.', isPlaceholder: false, status: 'draft' },
  primaryCta: { label: 'EXPLORE OUR PROGRAMS', href: '/programs' },
  secondaryCta: { label: 'SUPPORT OUR MISSION', href: '/donate' },
  media: { src: '/videos/ecodite-hero.mp4', alt: 'Ecodite Foundation students and mentors at work', ratio: '16:9', description: 'Documentary-style hero video or image: young Nigerian people in a workshop or classroom, natural light, warm grade. Candid, not posed.', isPlaceholder: false }
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
  portrait: { src: '/images/leadership/founder-portrait.png', alt: 'Portrait of the Ecodite Foundation Chairman', ratio: '4:5', description: 'Portrait of Chairman', isPlaceholder: false },
  eyebrow: "Chairman's corner",
  welcomeHeadline: 'Welcome to Ecodite Foundation',
  quote: { value: "[CHAIRMAN'S MESSAGE]", isPlaceholder: true },
  signature: { value: '[SIGNATURE]', isPlaceholder: true },
  name: { value: '[CHAIRMAN NAME]', isPlaceholder: true },
  title: 'Chairman, Board of Trustees',
  link: { label: 'Read the full message', href: '/chairmans-corner' }
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
