/**
 * Email Delivery
 * Provider interface with a stub implementation.
 * Replace the stub with a real provider (SendGrid, Resend, etc.) when ready.
 */

export interface EmailMessage {
  to: string
  from: string
  subject: string
  text: string
  html?: string
  replyTo?: string
}

export interface EmailDeliveryProvider {
  send(message: EmailMessage): Promise<{ success: boolean; error?: string }>
}

/** Stub provider — logs to console, returns success */
class StubEmailProvider implements EmailDeliveryProvider {
  async send(message: EmailMessage): Promise<{ success: boolean; error?: string }> {
    console.log('[Email Stub] Would send email:', {
      to: message.to,
      from: message.from,
      subject: message.subject,
      textLength: message.text.length,
    })
    return { success: true }
  }
}

/** Get the configured email provider */
export function getEmailProvider(): EmailDeliveryProvider {
  const provider = process.env.EMAIL_PROVIDER || 'stub'

  switch (provider) {
    case 'stub':
    default:
      return new StubEmailProvider()
  }
}

/** Sanitize user input for email content */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .trim()
}
