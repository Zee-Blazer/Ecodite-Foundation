import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Rays from '@/components/ui/Rays'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-cream overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <Rays opacity={0.04} scale={1.5} animate={false} />
      </div>
      <Container className="relative z-10 py-24 text-center">
        <p className="text-eyebrow text-ink-muted mb-6">404</p>
        <h1 className="text-display-lg text-ink mb-6">
          Looks like this page took a different path.
        </h1>
        <p className="text-body-lg text-ink-muted mx-auto mb-10 max-w-[45ch]">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>
        <Button href="/" variant="primary" arrow>
          Return Home
        </Button>
      </Container>
    </section>
  )
}
