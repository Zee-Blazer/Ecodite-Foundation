'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import type { PaymentVerifyResult } from '@/types/content';

function VerifyContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(!reference ? 'error' : 'loading');
  const [result, setResult] = useState<PaymentVerifyResult | null>(null);

  useEffect(() => {
    if (!reference) {
      return;
    }

    fetch(`/api/donate/verify?reference=${encodeURIComponent(reference)}`)
      .then(res => res.json())
      .then((data: PaymentVerifyResult) => {
        if (data.success && data.status === 'success') {
          setStatus('success');
        } else {
          setStatus('error');
        }
        setResult(data);
      })
      .catch(() => {
        setStatus('error');
      });
  }, [reference]);

  return (
    <div className="max-w-xl mx-auto py-24 text-center">
      {status === 'loading' && (
        <div className="space-y-6">
          <div className="w-16 h-16 border-4 border-sage-100 border-t-green-800 rounded-full animate-spin mx-auto" />
          <h1 className="text-h2 font-display text-green-950">Verifying your contribution...</h1>
          <p className="text-ink-muted">Please wait a moment.</p>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-8 bg-sage-50 p-12 rounded-[8px]">
          <div className="w-20 h-20 bg-green-100 text-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-display-lg font-display text-green-950">Thank You!</h1>
          <p className="text-body-lg text-ink">
            Your generous contribution has been received. Thank you for supporting our mission to empower the next generation.
          </p>
          {result?.amount && (
            <p className="text-ink-muted text-sm font-medium">
              Reference: {reference}
            </p>
          )}
          <div className="pt-6">
            <Button href="/">Return to Home</Button>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-6">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-h2 font-display text-green-950">Verification Failed</h1>
          <p className="text-ink-muted">
            {result?.error || 'We could not verify your payment at this time. If your account was charged, please contact us.'}
          </p>
          <div className="pt-6 flex justify-center gap-4">
            <Button href="/donate" variant="secondary">Try Again</Button>
            <Button href="/contact">Contact Support</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container>
        <Suspense fallback={<div className="text-center py-24">Loading...</div>}>
          <VerifyContent />
        </Suspense>
      </Container>
    </div>
  );
}
