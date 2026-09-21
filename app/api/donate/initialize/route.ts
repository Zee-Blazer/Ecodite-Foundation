import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { getPaymentProvider } from '@/lib/payments/provider';
import { siteConfig } from '@/content/site';

const initSchema = z.object({
  amount: z.number().positive(),
  email: z.string().email(),
  currency: z.enum(['NGN', 'USD']),
  frequency: z.enum(['one-time', 'monthly']),
  name: z.string().min(2),
  phone: z.string().min(7),
  country: z.string().min(2),
});

export async function POST(req: Request) {
  if (!siteConfig.paymentsEnabled) {
    return NextResponse.json({ error: 'Payments are not enabled' }, { status: 403 });
  }

  const ip = getClientIp(req);
  const rateLimit = await checkRateLimit(`donate_${ip}`, {
    maxRequests: 5,
    windowMs: 60000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = initSchema.parse(body);

    const provider = getPaymentProvider();
    const result = await provider.initialize({
      email: parsed.email,
      amount: parsed.amount * 100, // Convert to smallest currency unit (kobo/cents)
      currency: parsed.currency,
      metadata: {
        custom_fields: [
          { display_name: 'Name', variable_name: 'name', value: parsed.name },
          { display_name: 'Frequency', variable_name: 'frequency', value: parsed.frequency },
          { display_name: 'Phone', variable_name: 'phone', value: parsed.phone },
          { display_name: 'Country', variable_name: 'country', value: parsed.country },
        ]
      },
      callbackUrl: `${siteConfig.url}/donate/verify`,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
