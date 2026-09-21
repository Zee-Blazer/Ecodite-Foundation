import { NextResponse } from 'next/server';
import { getPaymentProvider } from '@/lib/payments/provider';

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('x-paystack-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const bodyText = await req.text();
    const provider = getPaymentProvider();
    
    const result = await provider.handleWebhook(bodyText, signature);
    
    if (result.valid) {
      console.log('[Webhook] Paystack event received:', result.event);
      // Process event asynchronously in the background in a real scenario
    } else {
      console.warn('[Webhook] Invalid signature received');
    }
    
    // Always return 200 OK to Paystack
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('[Webhook] Error processing webhook:', error);
    return NextResponse.json({ status: 'ok' }, { status: 200 }); // Still return 200
  }
}
