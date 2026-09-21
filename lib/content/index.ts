import { filterPlaceholders } from '../placeholder';
import { siteConfig } from '../../content/site';
import { heroData, homeIntro, homeStatement, homeChairmanPreview, homeSupportCta, homeNewsletter } from '../../content/home';
import { programs } from '../../content/programs';
import { impactStats } from '../../content/impact';
import { articles } from '../../content/news';
import { events } from '../../content/events';
import { galleryItems } from '../../content/gallery';
import { leadership } from '../../content/leadership';
import { chairmanData } from '../../content/chairman';
import { aboutData } from '../../content/about';
import { donateData } from '../../content/donate';
import { privacyPolicy, termsOfService, cookiePolicy } from '../../content/legal';

import type { SiteConfig, HeroData, HomeIntro, HomeStatement, HomeChairmanPreview, HomeSupportCta, HomeNewsletterContent, Program, ImpactStat, NewsArticle, EcoditeEvent, GalleryItem, LeadershipMember, ChairmanData, AboutData, DonateData, LegalPage, GalleryCategory } from '../../types/content';

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

export function getHeroData(): HeroData {
  return heroData;
}

export function getHomeIntro(): HomeIntro {
  return homeIntro;
}

export function getHomeStatement(): HomeStatement {
  return homeStatement;
}

export function getHomeChairmanPreview(): HomeChairmanPreview {
  return homeChairmanPreview;
}

export function getHomeSupportCta(): HomeSupportCta {
  return homeSupportCta;
}

export function getHomeNewsletter(): HomeNewsletterContent {
  return homeNewsletter;
}

export function getPrograms(): Program[] {
  return filterPlaceholders(programs);
}

export function getProgramBySlug(slug: string): Program | undefined {
  const all = getPrograms();
  return all.find(p => p.slug === slug);
}

export function getFeaturedPrograms(): Program[] {
  return getPrograms().filter(p => p.featured);
}

export function getNews(): NewsArticle[] {
  return filterPlaceholders(articles);
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  const all = getNews();
  return all.find(n => n.slug === slug);
}

export function getLatestNews(count: number): NewsArticle[] {
  return getNews().slice(0, count);
}

export function getEvents(): EcoditeEvent[] {
  const now = new Date();
  const all = filterPlaceholders(events);
  
  return all.map(event => {
    const eventDate = new Date(event.date);
    let status = event.status;
    
    if (event.endDate) {
      const endDate = new Date(event.endDate);
      if (now > endDate) {
        status = 'past';
      } else if (now >= eventDate && now <= endDate) {
        status = 'ongoing';
      } else {
        status = 'upcoming';
      }
    } else {
      if (now > eventDate) {
        status = 'past';
      } else {
        status = 'upcoming';
      }
    }
    
    return { ...event, status };
  });
}

export function getEventBySlug(slug: string): EcoditeEvent | undefined {
  const all = getEvents();
  return all.find(e => e.slug === slug);
}

export function getUpcomingEvents(): EcoditeEvent[] {
  return getEvents().filter(e => e.status === 'upcoming');
}

export function getGalleryItems(): GalleryItem[] {
  return filterPlaceholders(galleryItems);
}

export function getGalleryByCategory(cat: GalleryCategory): GalleryItem[] {
  const all = getGalleryItems();
  if (cat === 'All') return all;
  return all.filter(g => g.category === cat);
}

export function getLeadership(): LeadershipMember[] {
  return filterPlaceholders(leadership);
}

export function getImpactStats(): ImpactStat[] {
  return filterPlaceholders(impactStats);
}

export function getChairmanData(): ChairmanData {
  return chairmanData;
}

export function getAboutData(): AboutData {
  return aboutData;
}

export function getDonateData(): DonateData {
  return donateData;
}

export function getLegalPage(slug: string): LegalPage | undefined {
  if (slug === privacyPolicy.slug) return privacyPolicy;
  if (slug === termsOfService.slug) return termsOfService;
  if (slug === cookiePolicy.slug) return cookiePolicy;
  return undefined;
}
