import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLatestNews, getSiteConfig } from '@/lib/content';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import ArrowLink from '../ui/ArrowLink';
import MediaPlaceholder from '../ui/MediaPlaceholder';

export default function NewsPreview() {
  const articles = getLatestNews(4);
  const config = getSiteConfig();

  if (!articles.length && !config.showPlaceholders) {
    return null;
  }

  const leadArticle = articles[0];
  const compactArticles = articles.slice(1);

  return (
    <section className="section-cream py-[var(--section-padding)]">
      <Container>
        <Reveal>
          <div className="flex justify-between items-end mb-12">
            <SectionHeading heading="News & updates" />
            <ArrowLink href="/news" className="hidden md:inline-flex">
              View all news
            </ArrowLink>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Lead Article (Cols 1-7) */}
          {leadArticle && (
            <div className="md:col-span-7">
              <Reveal>
                <Link href={`/news/${leadArticle.slug}`} className="group block">
                  <div className="relative aspect-[16/9] w-full rounded-[var(--radius-card)] overflow-hidden mb-6">
                    {leadArticle.featuredImage.isPlaceholder ? (
                      <MediaPlaceholder
                        label="NEWS"
                        description={leadArticle.featuredImage.description}
                        ratio="16:9"
                        className="w-full h-full bg-sage-50"
                      />
                    ) : (
                      <Image
                        src={leadArticle.featuredImage.src}
                        alt={leadArticle.featuredImage.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider mb-3">
                    <span className="text-sun-700">{leadArticle.category}</span>
                    <span className="text-line-dark w-1 h-1 rounded-full bg-line" />
                    <span className="text-ink-muted">
                      {new Date(leadArticle.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-h2 text-ink mb-3 group-hover:text-green-800 transition-colors">
                    {leadArticle.title.value}
                  </h3>
                  <p className="text-body text-ink-muted mb-4 line-clamp-2">
                    {leadArticle.excerpt.value}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-medium text-green-800 group-hover:text-green-900 transition-colors">
                    Read article <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            </div>
          )}

          {/* Compact Articles (Cols 8-12) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            {compactArticles.map((article, i) => (
              <Reveal key={article.slug} delay={i * 100} className="flex-1">
                <Link 
                  href={`/news/${article.slug}`} 
                  className="group flex flex-col py-6 border-b border-line last:border-b-0 h-full justify-center"
                >
                  <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider mb-2">
                    <span className="text-sun-700">{article.category}</span>
                    <span className="text-ink-muted">
                      {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-h3 text-ink group-hover:text-green-800 transition-colors line-clamp-3">
                    {article.title.value}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
