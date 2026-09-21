'use client'

import { useEffect } from 'react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <section className="min-h-[60vh] flex items-center bg-cream">
      <Container className="py-24 text-center">
        <p className="text-eyebrow text-ink-muted mb-6">Something went wrong</p>
        <h1 className="text-display-lg text-ink mb-6">
          We hit an unexpected problem.
        </h1>
        <p className="text-body-lg text-ink-muted mx-auto mb-10 max-w-[50ch]">
          Something didn&apos;t work as expected. You can try again, or head
          back to the homepage.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center min-h-[48px] px-8 text-[13px] uppercase tracking-[.08em] font-semibold rounded-[6px] bg-green-800 text-cream hover:bg-green-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 focus-visible:ring-offset-2"
          >
            Try Again
          </button>
          <Button href="/" variant="secondary">
            Return Home
          </Button>
        </div>
      </Container>
    </section>
  )
}
