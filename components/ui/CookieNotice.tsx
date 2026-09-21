'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if there are non-essential cookies configured
    // For now, assume no non-essential cookies by default so we don't show it unless required
    const needsNotice = process.env.NEXT_PUBLIC_REQUIRE_COOKIE_CONSENT === 'true';
    if (!needsNotice) return;

    const hasConsented = localStorage.getItem('ecodite_cookie_consent');
    if (!hasConsented) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ecodite_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto bg-green-950 text-cream p-4 md:p-6 rounded-[8px] flex flex-col md:flex-row items-center justify-between gap-4 border border-green-800">
        <div className="text-[14px] flex-1">
          <p>
            We use cookies to improve your experience on our site and to analyze our traffic. 
            By clicking &quot;Accept&quot;, you consent to our use of cookies.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link 
            href="/cookies" 
            className="text-[13px] font-semibold tracking-wider uppercase text-sage-100 hover:text-white transition-colors whitespace-nowrap"
          >
            Manage
          </Link>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2.5 bg-sun-500 text-green-950 text-[13px] font-semibold tracking-wider uppercase rounded-[6px] hover:bg-sun-500/90 transition-colors whitespace-nowrap"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
