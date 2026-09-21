import React from 'react';
import Image from 'next/image';
import type { NewsArticle as NewsArticleType } from '../../types/content';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import MediaPlaceholder from '../ui/MediaPlaceholder';
import ShareLinks from '../ui/ShareLinks';
import ArrowLink from '../ui/ArrowLink';
import { getNewsBySlug, getSiteConfig } from '../../lib/content';

export default function NewsArticle({ article }: { article: NewsArticleType }) {
  const config = getSiteConfig();
  const url = `${config.url}/news/${article.slug}`;

  // Find related posts
  const relatedPosts = article.relatedPosts 
    ? article.relatedPosts.map(slug => getNewsBySlug(slug)).filter(Boolean) as NewsArticleType[]
    : [];

  return (
    <article className="py-16 md:py-24 bg-white">
      <Container width="reading" className="space-y-12">
        <Reveal>
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold tracking-wider uppercase text-sun-700 mb-8 border-b border-line pb-4">
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span className="w-1 h-1 rounded-full bg-line-dark" aria-hidden="true" />
            <span>{article.category}</span>
            {article.author && (
              <>
                <span className="w-1 h-1 rounded-full bg-line-dark" aria-hidden="true" />
                <span className="text-ink-muted">By {article.author.value}</span>
              </>
            )}
          </div>
          
          {/* Featured Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden bg-sage-100 mb-12">
            {article.featuredImage.isPlaceholder ? (
              <MediaPlaceholder
                label="Featured Image"
                description={article.featuredImage.description}
                ratio={article.featuredImage.ratio || "16:9"}
                className="w-full h-full"
              />
            ) : (
              <Image
                src={article.featuredImage.src}
                alt={article.featuredImage.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 720px, 100vw"
                priority
              />
            )}
          </div>
          
          {/* Content */}
          <div className="prose prose-lg prose-green max-w-none text-ink-muted mb-12">
            <p className="whitespace-pre-wrap">{article.body.value}</p>
          </div>
          
          {/* Share */}
          <div className="border-y border-line py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="font-semibold uppercase tracking-wider text-sm text-ink-muted">Share this article</span>
            <ShareLinks url={url} title={article.title.value} />
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-line">
              <h3 className="text-h3 text-green-950 mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {relatedPosts.map(post => (
                  <div key={post.slug} className="space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sun-700">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <h4 className="text-xl font-display text-green-900 leading-tight">
                      <a href={`/news/${post.slug}`} className="hover:text-sun-500 transition-colors">
                        {post.title.value}
                      </a>
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-16">
            <ArrowLink href="/news">Back to News</ArrowLink>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
