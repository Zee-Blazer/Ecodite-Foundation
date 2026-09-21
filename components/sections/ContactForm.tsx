'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import Button from '@/components/ui/Button';

const subjectFromParam: Record<string, string> = {
  partnership: 'Partnership inquiry',
  volunteer: 'Volunteering interest',
};

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  website: z.string().optional(), // Honeypot
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get('subject');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: subjectParam ? (subjectFromParam[subjectParam] ?? '') : '',
    message: '',
    website: '',
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    setFieldErrors({});

    try {
      const parsed = contactSchema.parse(formData);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Failed to send message');

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
    } catch (err) {
      setStatus('error');
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) errors[issue.path[0] as string] = issue.message;
        });
        setFieldErrors(errors);
        setErrorMessage('Please check the form for errors.');
      } else {
        setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
      }
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 bg-green-50 border border-green-200 rounded-[8px] text-center">
        <div className="w-16 h-16 bg-green-100 text-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-h3 font-display text-green-950 mb-2">Message Sent!</h3>
        <p className="text-green-800 mb-6">Thank you for reaching out. We will get back to you shortly.</p>
        <Button onClick={() => setStatus('idle')} variant="secondary">Send Another Message</Button>
      </div>
    );
  }

  const inputClass = "w-full min-h-[48px] px-4 bg-white border border-line rounded-[6px] focus:outline-none focus:ring-2 focus:ring-green-800 transition-all text-[15px]";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-[14px] font-medium text-green-950 mb-1">Name *</label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
          {fieldErrors.name && <p id="name-error" className="text-red-600 text-[12px] mt-1">{fieldErrors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-[14px] font-medium text-green-950 mb-1">Email *</label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          {fieldErrors.email && <p id="email-error" className="text-red-600 text-[12px] mt-1">{fieldErrors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-[14px] font-medium text-green-950 mb-1">Phone (optional)</label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-[14px] font-medium text-green-950 mb-1">Subject *</label>
          <input
            id="subject"
            type="text"
            required
            value={formData.subject}
            onChange={e => setFormData({ ...formData, subject: e.target.value })}
            className={inputClass}
            aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
          />
          {fieldErrors.subject && <p id="subject-error" className="text-red-600 text-[12px] mt-1">{fieldErrors.subject}</p>}
        </div>
      </div>

      {/* Honeypot field - visually hidden */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          value={formData.website}
          onChange={e => setFormData({ ...formData, website: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-[14px] font-medium text-green-950 mb-1">Message *</label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClass} py-3 resize-y`}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
        />
        {fieldErrors.message && <p id="message-error" className="text-red-600 text-[12px] mt-1">{fieldErrors.message}</p>}
      </div>

      {status === 'error' && (
        <div className="p-3 bg-red-50 text-red-700 text-[14px] rounded-[6px]" role="alert">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto"
      >
        {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
      </Button>
    </form>
  );
}
