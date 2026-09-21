/**
 * Payment Provider Interface
 * Defines the contract for payment providers.
 * Implementations: Paystack (paystack.ts), Stub (stub.ts)
 */

import type { PaymentProvider } from '@/types/content'

export type { PaymentProvider }

export function getPaymentProvider(): PaymentProvider {
  const isEnabled = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === 'true'

  if (!isEnabled) {
    // Return the stub provider
    return getStubProvider()
  }

  // Default to Paystack
  return getPaystackProvider()
}

function getStubProvider(): PaymentProvider {
  return {
    async initialize() {
      return {
        success: false,
        error: 'Payments are not yet configured. Please check back soon.',
      }
    },
    async verify() {
      return {
        success: false,
        status: 'failed' as const,
        error: 'Payments are not yet configured.',
      }
    },
    async handleWebhook() {
      return { valid: false }
    },
  }
}

function getPaystackProvider(): PaymentProvider {
  const secretKey = process.env.PAYSTACK_SECRET_KEY

  if (!secretKey) {
    console.error('[Payments] PAYSTACK_SECRET_KEY is not set')
    return getStubProvider()
  }

  /* eslint-disable @typescript-eslint/no-require-imports */
  // Dynamic import to avoid loading Paystack code when not needed
  const { PaystackAdapter } = require('./paystack') as { PaystackAdapter: new (key: string) => PaymentProvider }
  return new PaystackAdapter(secretKey)
}
