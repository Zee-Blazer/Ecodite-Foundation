/**
 * Newsletter Provider Interface
 * Defines the contract for newsletter/email list providers.
 * Default: stub (logs to console).
 */

import type { EmailProvider } from '@/types/content'

export type { EmailProvider }

/** Stub provider — logs subscription and returns success */
class StubNewsletterProvider implements EmailProvider {
  async subscribe(email: string): Promise<{ success: boolean; message: string }> {
    console.log(`[Newsletter Stub] Subscription request for: ${email}`)
    return {
      success: true,
      message: 'Thank you for subscribing! You will receive a confirmation email shortly.',
    }
  }

  async unsubscribe(email: string): Promise<{ success: boolean }> {
    console.log(`[Newsletter Stub] Unsubscribe request for: ${email}`)
    return { success: true }
  }
}

export function getNewsletterProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER || 'stub'

  switch (provider) {
    case 'stub':
    default:
      return new StubNewsletterProvider()
  }
}
