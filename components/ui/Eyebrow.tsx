import React from 'react';
import clsx from 'clsx';

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const Eyebrow: React.FC<EyebrowProps> = ({ children, className, ...props }) => {
  return (
    <span
      className={clsx("block text-xs uppercase tracking-[0.14em] font-semibold text-ink-muted", className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default Eyebrow;
