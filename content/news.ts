import type { NewsArticle } from '../types/content';

export const articles: NewsArticle[] = [
  {
    slug: 'news-1',
    title: { value: 'Placeholder News Article 1', isPlaceholder: true },
    excerpt: { value: 'This is a placeholder excerpt for news article 1.', isPlaceholder: true },
    body: { value: 'This is the body for placeholder news article 1.', isPlaceholder: true },
    date: '2026-09-01T00:00:00Z',
    category: 'Update',
    featuredImage: { src: '/images/news/speaker-presenting-at-tech-hub.jpeg', alt: 'A speaker presenting at a tech hub', ratio: '16:9', description: 'News event', isPlaceholder: false },
    isPlaceholder: true
  },
  {
    slug: 'news-2',
    title: { value: 'Placeholder News Article 2', isPlaceholder: true },
    excerpt: { value: 'This is a placeholder excerpt for news article 2.', isPlaceholder: true },
    body: { value: 'This is the body for placeholder news article 2.', isPlaceholder: true },
    date: '2026-09-05T00:00:00Z',
    category: 'Announcement',
    featuredImage: { src: '/images/news/professional-handshake.jpeg', alt: 'A professional handshake symbolizing a new partnership', ratio: '16:9', description: 'News event', isPlaceholder: false },
    isPlaceholder: true
  },
  {
    slug: 'news-3',
    title: { value: 'Placeholder News Article 3', isPlaceholder: true },
    excerpt: { value: 'This is a placeholder excerpt for news article 3.', isPlaceholder: true },
    body: { value: 'This is the body for placeholder news article 3.', isPlaceholder: true },
    date: '2026-09-10T00:00:00Z',
    category: 'Press Release',
    featuredImage: { src: '/images/news/students-collaborating-on-robotics.jpeg', alt: 'Students collaborating on a robotics project', ratio: '16:9', description: 'News event', isPlaceholder: false },
    isPlaceholder: true
  },
  {
    slug: 'news-4',
    title: { value: 'Placeholder News Article 4', isPlaceholder: true },
    excerpt: { value: 'This is a placeholder excerpt for news article 4.', isPlaceholder: true },
    body: { value: 'This is the body for placeholder news article 4.', isPlaceholder: true },
    date: '2026-09-15T00:00:00Z',
    category: 'Community',
    featuredImage: { src: '/images/news/young-adults-showcasing-robotics.jpeg', alt: 'Young adults showcasing a robotics project', ratio: '16:9', description: 'News event', isPlaceholder: false },
    isPlaceholder: true
  }
];
