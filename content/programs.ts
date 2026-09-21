import type { Program } from '../types/content';

export const programs: Program[] = [
  {
    slug: 'digital-skills-training',
    title: { value: 'Digital Skills Training', isPlaceholder: true },
    description: { value: 'Empowering young minds with modern digital skills.', isPlaceholder: true },
    category: 'Digital Skills',
    image: { src: '/images/programs/woman-coding-on-laptop.jpeg', alt: 'A young woman coding on a laptop', ratio: '16:9', description: 'Students coding', isPlaceholder: false },
    featured: true,
    isPlaceholder: true
  },
  {
    slug: 'creative-arts-programme',
    title: { value: 'Creative Arts Programme', isPlaceholder: true },
    description: { value: 'Fostering creativity through various artistic mediums.', isPlaceholder: true },
    category: 'Creativity & Innovation',
    image: { src: '/images/programs/teenager-using-digital-drawing-tablet.jpeg', alt: 'A teenager using a digital drawing tablet', ratio: '16:9', description: 'Art session', isPlaceholder: false },
    featured: false,
    isPlaceholder: true
  },
  {
    slug: 'mentorship-network',
    title: { value: 'Mentorship Network', isPlaceholder: true },
    description: { value: 'Connecting emerging talent with seasoned professionals.', isPlaceholder: true },
    category: 'Mentorship & Personal Development',
    image: { src: '/images/programs/adults-reviewing-project-on-tablet.jpeg', alt: 'Adults reviewing a project on a tablet together', ratio: '16:9', description: 'Mentoring session', isPlaceholder: false },
    featured: false,
    isPlaceholder: true
  },
  {
    slug: 'community-learning-centres',
    title: { value: 'Community Learning Centres', isPlaceholder: true },
    description: { value: 'Providing accessible learning spaces in local communities.', isPlaceholder: true },
    category: 'Community Development',
    image: { src: '/images/programs/youths-collaborating-at-computers.jpeg', alt: 'Youths collaborating at computers in a learning centre', ratio: '16:9', description: 'Community center', isPlaceholder: false },
    featured: false,
    isPlaceholder: true
  }
];
