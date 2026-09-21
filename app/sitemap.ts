import type { MetadataRoute } from 'next'
import { getPrograms, getNews, getEvents } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ecoditefoundation.org'
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/chairmans-corner`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/programs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/news`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/events`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/donate`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/cookies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic programme pages
  const programs = getPrograms()
  const programPages: MetadataRoute.Sitemap = programs.map((program) => ({
    url: `${siteUrl}/programs/${program.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic news pages
  const news = getNews()
  const newsPages: MetadataRoute.Sitemap = news.map((article) => ({
    url: `${siteUrl}/news/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Dynamic event pages
  const events = getEvents()
  const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: new Date(event.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...programPages, ...newsPages, ...eventPages]
}
