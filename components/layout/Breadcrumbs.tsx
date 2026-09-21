import React from 'react';
import Link from 'next/link';
import { getSiteConfig } from '../../lib/content';

export interface BreadcrumbsProps {
  items: { label: string; href: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const config = getSiteConfig();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${config.url}${item.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
        <ol className="flex items-center flex-wrap gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-ink font-medium" aria-current="page">{item.label}</span>
                ) : (
                  <>
                    <Link href={item.href} className="hover:text-sun-500 transition-colors">
                      {item.label}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
