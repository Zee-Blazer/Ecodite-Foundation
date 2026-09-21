import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { getNewsletterProvider } from '@/lib/newsletter/provider';

const newsletterSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rateLimit = await checkRateLimit(`newsletter_${ip}`, {
    maxRequests: 3,
    windowMs: 600000, // 10 minutes
  });

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = newsletterSchema.parse(body);

    const provider = getNewsletterProvider();
    const result = await provider.subscribe(parsed.email);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: result.message });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
