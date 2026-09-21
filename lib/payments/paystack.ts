/**
 * Paystack Payment Adapter
 * Server-side only — never import this in client code.
 * Handles: transaction initialization, verification, webhook signature verification.
 */

import crypto from 'crypto'
import type {
  PaymentProvider,
  PaymentInitParams,
  PaymentInitResult,
  PaymentVerifyResult,
  WebhookResult,
} from '@/types/content'

const PAYSTACK_API = 'https://api.paystack.co'

interface PaystackInitResponse {
  status: boolean
  message: string
  data?: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

interface PaystackVerifyResponse {
  status: boolean
  message: string
  data?: {
    status: string
    reference: string
    amount: number
    currency: string
  }
}

export class PaystackAdapter implements PaymentProvider {
  private secretKey: string

  constructor(secretKey: string) {
    this.secretKey = secretKey
  }

  async initialize(params: PaymentInitParams): Promise<PaymentInitResult> {
    try {
      const response = await fetch(`${PAYSTACK_API}/transaction/initialize`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: params.email,
          amount: params.amount, // Already in kobo/cents
          currency: params.currency,
          callback_url: params.callbackUrl,
          plan: params.plan,
          metadata: params.metadata,
        }),
      })

      const data = (await response.json()) as PaystackInitResponse

      if (data.status && data.data) {
        return {
          success: true,
          authorizationUrl: data.data.authorization_url,
          reference: data.data.reference,
        }
      }

      return {
        success: false,
        error: data.message || 'Failed to initialize payment.',
      }
    } catch (error) {
      console.error('[Paystack] Initialize error:', error)
      return {
        success: false,
        error: 'Payment service is temporarily unavailable.',
      }
    }
  }

  async verify(reference: string): Promise<PaymentVerifyResult> {
    try {
      const response = await fetch(
        `${PAYSTACK_API}/transaction/verify/${encodeURIComponent(reference)}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        }
      )

      const data = (await response.json()) as PaystackVerifyResponse

      if (data.status && data.data) {
        const statusMap: Record<string, PaymentVerifyResult['status']> = {
          success: 'success',
          failed: 'failed',
          pending: 'pending',
          abandoned: 'abandoned',
        }

        return {
          success: data.data.status === 'success',
          status: statusMap[data.data.status] || 'failed',
          amount: data.data.amount,
          currency: data.data.currency,
          reference: data.data.reference,
        }
      }

      return {
        success: false,
        status: 'failed',
        error: data.message || 'Verification failed.',
      }
    } catch (error) {
      console.error('[Paystack] Verify error:', error)
      return {
        success: false,
        status: 'failed',
        error: 'Payment verification service unavailable.',
      }
    }
  }

  async handleWebhook(body: string, signature: string): Promise<WebhookResult> {
    // Verify HMAC SHA512 signature
    const hash = crypto
      .createHmac('sha512', this.secretKey)
      .update(body)
      .digest('hex')

    if (hash !== signature) {
      return { valid: false }
    }

    try {
      const payload = JSON.parse(body) as { event: string; data: Record<string, unknown> }
      return {
        valid: true,
        event: payload.event,
        data: payload.data,
      }
    } catch {
      return { valid: false }
    }
  }
}
