import { NextResponse } from 'next/server';
import { getPrograms, getNews, getEvents } from '@/lib/content';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import type { SearchResult } from '@/types/content';
import { siteConfig } from '@/content/site';

export async function GET(req: Request) {
  if (!siteConfig.searchEnabled) {
    return NextResponse.json({ error: 'Search is disabled' }, { status: 403 });
  }

  const ip = getClientIp(req);
  const rateLimit = await checkRateLimit(`search_${ip}`, {
    maxRequests: 30,
    windowMs: 60000, // 1 minute
  });

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q')?.toLowerCase();

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results: SearchResult[] = [];

  // Search Programs
  const programs = getPrograms();
  programs.forEach(p => {
    if (
      p.title.value.toLowerCase().includes(query) ||
      p.description.value.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    ) {
      results.push({
        type: 'program',
        title: p.title.value,
        excerpt: p.description.value,
        slug: p.slug,
        href: `/programs/${p.slug}`,
        category: p.category,
      });
    }
  });

  // Search News
  const news = getNews();
  news.forEach(n => {
    if (
      n.title.value.toLowerCase().includes(query) ||
      n.excerpt.value.toLowerCase().includes(query) ||
      n.category.toLowerCase().includes(query)
    ) {
      results.push({
        type: 'news',
        title: n.title.value,
        excerpt: n.excerpt.value,
        slug: n.slug,
        href: `/news/${n.slug}`,
        date: n.date,
        category: n.category,
      });
    }
  });

  // Search Events
  const events = getEvents();
  events.forEach(e => {
    if (
      e.title.value.toLowerCase().includes(query) ||
      e.description.value.toLowerCase().includes(query) ||
      e.location.value.toLowerCase().includes(query)
    ) {
      results.push({
        type: 'event',
        title: e.title.value,
        excerpt: e.description.value,
        slug: e.slug,
        href: `/events/${e.slug}`,
        date: e.date,
      });
    }
  });

  // Limit total results
  const limitedResults = results.slice(0, 20);

  return NextResponse.json({ results: limitedResults });
}
