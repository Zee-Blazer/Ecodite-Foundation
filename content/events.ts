import type { EcoditeEvent } from '../types/content';

export const events: EcoditeEvent[] = [
  {
    slug: 'event-1',
    title: { value: 'Placeholder Event 1', isPlaceholder: true },
    description: { value: 'This is a placeholder description for event 1.', isPlaceholder: true },
    date: '2026-10-01T10:00:00Z',
    location: { value: 'Lagos, Nigeria', isPlaceholder: true },
    status: 'upcoming',
    isPlaceholder: true
  },
  {
    slug: 'event-2',
    title: { value: 'Placeholder Event 2', isPlaceholder: true },
    description: { value: 'This is a placeholder description for event 2.', isPlaceholder: true },
    date: '2026-11-15T09:00:00Z',
    location: { value: 'Virtual', isPlaceholder: true },
    status: 'upcoming',
    isPlaceholder: true
  }
];
