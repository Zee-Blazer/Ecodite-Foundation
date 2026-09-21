'use client';

import React, { useState } from 'react';
import { getHomeNewsletter } from '@/lib/content';
import Container from '../ui/Container';
import Button from '../ui/Button';

export default function Newsletter() {
  const data = getHomeNewsletter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      console.log('Newsletter subscription submitted for:', email);
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="bg-sage-100 py-12 border-t border-line">
      <Container width="reading">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-xl font-semibold text-ink text-center md:text-left flex-1">
            {data.headline}
          </h2>
          
          <div className="w-full md:w-auto flex-1 md:flex-none">
            {status === 'success' ? (
              <div 
                className="bg-green-500/10 text-green-800 px-6 py-3 rounded-md text-sm font-medium text-center"
                aria-live="polite"
              >
                Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={data.placeholder}
                  disabled={status === 'submitting'}
                  className="min-h-[48px] px-4 rounded-[6px] border border-line bg-white text-ink placeholder:text-ink-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 disabled:opacity-50 w-full sm:w-64"
                />
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto whitespace-nowrap"
                >
                  {status === 'submitting' ? '...' : data.buttonLabel}
                </Button>
              </form>
            )}
            {status === 'error' && (
              <div className="text-red-600 text-sm mt-2" aria-live="polite">
                Something went wrong. Please try again.
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
