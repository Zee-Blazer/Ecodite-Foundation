/**
 * CAPTCHA Verification
 * Interface for Cloudflare Turnstile (or other CAPTCHA providers).
 * Verification only runs if CAPTCHA keys are configured.
 */

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export interface CaptchaResult {
  success: boolean
  error?: string
}

/**
 * Verify a CAPTCHA token server-side.
 * Returns success: true if CAPTCHA is not configured (no secret key).
 */
export async function verifyCaptcha(token: string | null): Promise<CaptchaResult> {
  const secretKey = process.env.CAPTCHA_SECRET_KEY

  // If CAPTCHA is not configured, skip verification
  if (!secretKey) {
    return { success: true }
  }

  if (!token) {
    return { success: false, error: 'CAPTCHA token is required.' }
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json() as { success: boolean; 'error-codes'?: string[] }

    if (data.success) {
      return { success: true }
    }

    return {
      success: false,
      error: `CAPTCHA verification failed: ${data['error-codes']?.join(', ') || 'unknown error'}`,
    }
  } catch {
    return { success: false, error: 'CAPTCHA verification service unavailable.' }
  }
}

/** Check if CAPTCHA is configured */
export function isCaptchaEnabled(): boolean {
  return Boolean(process.env.CAPTCHA_SECRET_KEY && process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY)
}
