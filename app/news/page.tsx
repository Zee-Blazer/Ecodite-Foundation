import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getNews, getSiteConfig } from '@/lib/content';
import PageHero from '@/components/hero/PageHero';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';
import MediaPlaceholder from '@/components/ui/MediaPlaceholder';
import ArrowLink from '@/components/ui/ArrowLink';

export const metadata: Metadata = {
  title: 'News & Updates',
  description: 'Latest news and updates from the foundation.',
};

export default function NewsPage() {
  const articles = getNews();
  const config = getSiteConfig();

  const renderEmptyState = () => (
    <Container className="py-24 text-center">
      <p className="text-ink-muted text-lg">No news articles yet.</p>
    </Container>
  );

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <PageHero
        title="News & Updates"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'News', href: '/news' },
        ]}
        compact
      />

      {articles.length === 0 && !config.showPlaceholders ? (
        renderEmptyState()
      ) : (
        <section className="py-16 md:py-24">
          <Container>
            {/* Lead Article */}
            {articles[0] && (
              <Reveal>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 md:mb-24">
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-sage-100">
                    {articles[0].featuredImage.isPlaceholder ? (
                      <MediaPlaceholder
                        label="Featured Image"
                        description={articles[0].featuredImage.description}
                        ratio={articles[0].featuredImage.ratio || "4:3"}
                        className="w-full h-full"
                      />
                    ) : (
                      <Image
                        src={articles[0].featuredImage.src}
                        alt={articles[0].featuredImage.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority
                      />
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-sm font-semibold tracking-wider uppercase text-sun-700">
                      <span>{new Date(articles[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="w-1 h-1 rounded-full bg-line-dark" aria-hidden="true" />
                      <span>{articles[0].category}</span>
                    </div>
                    
                    <h2 className="text-display-lg text-green-950">
                      <Link href={`/news/${articles[0].slug}`} className="hover:text-sun-500 transition-colors">
                        {articles[0].title.value}
                      </Link>
                    </h2>
                    
                    <p className="text-body-lg text-ink-muted leading-relaxed line-clamp-3">
                      {articles[0].excerpt.value}
                    </p>
                    
                    <div className="pt-2">
                      <ArrowLink href={`/news/${articles[0].slug}`}>Read Article</ArrowLink>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Remaining Articles */}
            {articles.length > 1 && (
              <div className="max-w-4xl border-t border-line">
                <Reveal stagger>
                  {articles.slice(1).map((article) => (
                    <article key={article.slug} className="py-8 border-b border-line group">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start">
                        <div className="md:col-span-1 text-sm font-semibold tracking-wider uppercase text-ink-muted">
                          <p>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          <p className="text-sun-700 mt-1">{article.category}</p>
                        </div>
                        
                        <div className="md:col-span-3 space-y-3">
                          <h3 className="text-h2 text-green-950 group-hover:text-sun-500 transition-colors">
                            <Link href={`/news/${article.slug}`}>
                              {article.title.value}
                            </Link>
                          </h3>
                          <ArrowLink href={`/news/${article.slug}`}>Read More</ArrowLink>
                        </div>
                      </div>
                    </article>
                  ))}
                </Reveal>
              </div>
            )}
          </Container>
        </section>
      )}
    </div>
  );
}
