'use client';

import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export interface AnimatedCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  target: number | null;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 900,
  prefix = '',
  suffix = '',
  className,
  ...props
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (target === null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            setCount(target);
            return;
          }

          let startTime: number;
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            setCount(Math.floor(easeOut(progress) * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    const el = ref.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [target, duration])

  if (target === null) {
    return <span className={clsx("font-display tabular-nums", className)} {...props}>—</span>;
  }

  return (
    <span ref={ref} className={clsx("font-display tabular-nums", className)} {...props}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
