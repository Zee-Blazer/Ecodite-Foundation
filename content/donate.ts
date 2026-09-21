import type { DonateData } from '../types/content';

export const donateData: DonateData = {
  headline: { value: '[DONATE HEADLINE]', isPlaceholder: true },
  message: { value: '[DONATE MESSAGE]', isPlaceholder: true },
  amounts: [
    { value: 5000, label: '₦5,000' },
    { value: 10000, label: '₦10,000' },
    { value: 25000, label: '₦25,000' },
    { value: 50000, label: '₦50,000' }
  ],
  currency: 'NGN',
  currencySymbol: '₦',
  howGiftIsUsed: { value: '[HOW GIFT IS USED]', isPlaceholder: true },
  isPlaceholder: true
};
