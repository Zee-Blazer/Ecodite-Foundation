import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { verifyCaptcha } from '@/lib/captcha';
import { getEmailProvider, sanitizeInput } from '@/lib/email';
import { siteConfig } from '@/content/site';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
  website: z.string().optional(), // Honeypot
  captchaToken: z.string().optional(),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rateLimit = await checkRateLimit(`contact_${ip}`, {
    maxRequests: 3,
    windowMs: 300000, // 5 minutes
  });

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = contactSchema.parse(body);

    // Honeypot check
    if (parsed.website) {
      // Silently reject
      return NextResponse.json({ success: true });
    }

    // CAPTCHA check
    if (parsed.captchaToken) {
      const captchaResult = await verifyCaptcha(parsed.captchaToken);
      if (!captchaResult.success) {
        return NextResponse.json({ error: 'Invalid CAPTCHA' }, { status: 400 });
      }
    }

    const htmlContent = `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${sanitizeInput(parsed.name)}</p>
      <p><strong>Email:</strong> ${sanitizeInput(parsed.email)}</p>
      <p><strong>Phone:</strong> ${sanitizeInput(parsed.phone || 'N/A')}</p>
      <p><strong>Subject:</strong> ${sanitizeInput(parsed.subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${sanitizeInput(parsed.message).replace(/\n/g, '<br/>')}</p>
    `;

    const emailProvider = getEmailProvider();
    const result = await emailProvider.send({
      to: siteConfig.contact.email.value,
      from: `noreply@${new URL(siteConfig.url).hostname}`,
      subject: `Contact Form: ${sanitizeInput(parsed.subject)}`,
      text: `Name: ${parsed.name}\nEmail: ${parsed.email}\nSubject: ${parsed.subject}\nMessage: ${parsed.message}`,
      html: htmlContent,
      replyTo: parsed.email,
    });

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
