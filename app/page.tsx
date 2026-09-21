import Hero from '@/components/hero/Hero'
import IntroSplit from '@/components/sections/IntroSplit'
import Statement from '@/components/sections/Statement'
import ChairmanPreview from '@/components/sections/ChairmanPreview'
import ProgramsShowcase from '@/components/sections/ProgramsShowcase'
import ImpactStats from '@/components/sections/ImpactStats'
import VisualStory from '@/components/sections/VisualStory'
import GalleryPreview from '@/components/sections/GalleryPreview'
import EventsPreview from '@/components/sections/EventsPreview'
import NewsPreview from '@/components/sections/NewsPreview'
import SupportCta from '@/components/sections/SupportCta'
import Newsletter from '@/components/sections/Newsletter'
import { getSiteConfig } from '@/lib/content'

function OrganizationJsonLd() {
  const config = getSiteConfig()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: config.legalName,
    alternateName: config.name,
    url: config.url,
    description: config.description,
    logo: `${config.url}/brand/logo-placeholder.svg`,
    sameAs: config.socialLinks
      .filter((link) => link.url)
      .map((link) => link.url),
    ...(config.contact.address.isPlaceholder
      ? {}
      : {
          address: {
            '@type': 'PostalAddress',
            streetAddress: config.contact.address.value,
          },
        }),
    ...(config.contact.email.isPlaceholder
      ? {}
      : { email: config.contact.email.value }),
    ...(config.contact.phone.isPlaceholder
      ? {}
      : { telephone: config.contact.phone.value }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function WebSiteJsonLd() {
  const config = getSiteConfig()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    url: config.url,
    description: config.description,
    potentialAction: config.searchEnabled
      ? {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${config.url}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        }
      : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Who we are */}
      <IntroSplit />

      {/* 3. Statement */}
      <Statement />

      {/* 4. Chairman's Corner */}
      <ChairmanPreview />

      {/* 5. Programs */}
      <ProgramsShowcase />

      {/* 6. Impact */}
      <ImpactStats />

      {/* 7. Visual story */}
      <VisualStory />

      {/* 8. Gallery preview */}
      <GalleryPreview />

      {/* 9. Upcoming events */}
      <EventsPreview />

      {/* 10. News & updates */}
      <NewsPreview />

      {/* 11. Support CTA */}
      <SupportCta />

      {/* 12. Newsletter */}
      <Newsletter />
    </>
  )
}
