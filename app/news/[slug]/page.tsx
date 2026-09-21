import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNewsBySlug, getNews, getSiteConfig } from '@/lib/content';
import PageHero from '@/components/hero/PageHero';
import NewsArticle from '@/components/sections/NewsArticle';

export function generateStaticParams() {
  const articles = getNews();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getNewsBySlug(params.slug);
  if (!article) return { title: 'Not Found' };
  
  return {
    title: article.title.value,
    description: article.excerpt.value,
    openGraph: {
      type: 'article',
      publishedTime: article.date,
      authors: article.author ? [article.author.value] : undefined,
    }
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getNewsBySlug(params.slug);
  const config = getSiteConfig();
  
  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title.value,
    "image": article.featuredImage.isPlaceholder ? undefined : [
      `${config.url}${article.featuredImage.src}`
    ],
    "datePublished": article.date,
    "author": article.author ? [{
      "@type": "Person",
      "name": article.author.value
    }] : undefined
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col min-h-screen">
        <PageHero
          title={article.title.value}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'News', href: '/news' },
            { label: 'Article', href: `/news/${article.slug}` },
          ]}
          compact
        />
        <NewsArticle article={article} />
      </div>
    </>
  );
}
