import type { Metadata } from 'next';
import { fraunces, instrumentSans } from './fonts';
import './globals.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SkipToContent from '../components/ui/SkipToContent';
import { getSiteConfig } from '../lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig();
  
  return {
    title: {
      default: `${config.name} | Create. Learn. Become.`,
      template: `%s | ${config.name}`
    },
    description: config.description,
    metadataBase: new URL(config.url),
    openGraph: {
      siteName: config.name,
      locale: 'en_NG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    icons: {
      icon: [
        { url: '/brand/logo-placeholder.svg', type: 'image/svg+xml' },
      ],
      apple: '/brand/logo-placeholder.svg',
    }
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrumentSans.variable}`}>
      <body>
        <SkipToContent />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
