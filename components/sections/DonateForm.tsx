'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import type { DonateData } from '@/types/content';
import { siteConfig } from '@/content/site';
import clsx from 'clsx';

const donateSchema = z.object({
  amount: z.number().min(100, 'Minimum donation is 100'),
  frequency: z.enum(['one-time', 'monthly']),
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  country: z.string().min(2, 'Please enter your country'),
});

type DonateFormData = z.infer<typeof donateSchema>;

export default function DonateForm({ data }: { data: DonateData }) {
  const [formData, setFormData] = useState<DonateFormData>({
    amount: data.amounts[0].value,
    frequency: 'one-time',
    email: '',
    name: '',
    phone: '',
    country: data.currency === 'NGN' ? 'Nigeria' : '',
  });
  const [customAmount, setCustomAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!siteConfig.paymentsEnabled) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-100 text-green-800 mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-h3 font-display mb-2 text-green-950">Payments Coming Soon</h3>
        <p className="text-ink-muted">We are currently setting up our payment processing. Please check back later to support our mission.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const parsed = donateSchema.parse(formData);
      
      const res = await fetch('/api/donate/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...parsed,
          currency: data.currency
        }),
      });

      const result = await res.json();
      
      if (!res.ok) throw new Error(result.error || 'Failed to initialize payment');
      
      if (result.authorizationUrl) {
        window.location.href = result.authorizationUrl;
      }
    } catch (err) {
      setStatus('error');
      if (err instanceof z.ZodError) {
        setErrorMessage(err.issues[0].message);
      } else {
        setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex bg-sage-50 rounded-[6px] p-1">
        {(['one-time', 'monthly'] as const).map((freq) => (
          <button
            key={freq}
            type="button"
            onClick={() => setFormData({ ...formData, frequency: freq })}
            className={clsx(
              "flex-1 py-2 text-[14px] font-medium rounded-[6px] transition-colors capitalize",
              formData.frequency === freq ? "bg-white text-green-900" : "text-ink-muted hover:text-ink"
            )}
          >
            {freq.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-[14px] font-medium text-green-950 mb-3">Select Amount</label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {data.amounts.map((amt) => (
            <button
              key={amt.value}
              type="button"
              onClick={() => {
                setFormData({ ...formData, amount: amt.value });
                setCustomAmount('');
              }}
              className={clsx(
                "py-3 px-4 border rounded-[6px] text-center transition-colors text-[16px] font-semibold",
                formData.amount === amt.value && !customAmount
                  ? "border-green-800 bg-green-800/5 text-green-900"
                  : "border-line text-ink hover:border-green-800/30"
              )}
            >
              {amt.label}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted font-medium">
            {data.currencySymbol}
          </span>
          <input
            type="number"
            min="100"
            step="100"
            placeholder="Custom Amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setFormData({ ...formData, amount: Number(e.target.value) });
            }}
            className="w-full pl-10 pr-4 py-3 bg-white border border-line rounded-[6px] focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-line">
        <div>
          <label htmlFor="name" className="block text-[14px] font-medium text-green-950 mb-1">Full Name</label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-line rounded-[6px] focus:outline-none focus:ring-2 focus:ring-green-800 transition-all"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[14px] font-medium text-green-950 mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-white border border-line rounded-[6px] focus:outline-none focus:ring-2 focus:ring-green-800 transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-[14px] font-medium text-green-950 mb-1">Phone Number</label>
            <input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-line rounded-[6px] focus:outline-none focus:ring-2 focus:ring-green-800 transition-all"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-[14px] font-medium text-green-950 mb-1">Country</label>
            <input
              id="country"
              type="text"
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-line rounded-[6px] focus:outline-none focus:ring-2 focus:ring-green-800 transition-all"
            />
          </div>
        </div>
      </div>

      {status === 'error' && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-[6px]" role="alert">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        variant="accent"
        className="w-full text-[15px]"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'PROCESSING...' : `DONATE ${data.currencySymbol}${formData.amount.toLocaleString()}`}
      </Button>
      <p className="text-[12px] text-center text-ink-muted">
        Payments are secure and encrypted.
      </p>
    </form>
  );
}
