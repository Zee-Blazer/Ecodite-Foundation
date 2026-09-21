import { NextResponse } from 'next/server';
import { getPaymentProvider } from '@/lib/payments/provider';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
  }

  try {
    const provider = getPaymentProvider();
    const result = await provider.verify(reference);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}
