import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export interface ArrowLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: 'default' | 'light';
}

const ArrowLink: React.FC<ArrowLinkProps> = ({
  href,
  children,
  variant = 'default',
  className,
  ...props
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        "group inline-flex items-center gap-1.5 font-medium transition-colors",
        variant === 'light' ? "text-cream hover:text-cream/80" : "text-green-800 hover:text-green-900",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
        →
      </span>
    </Link>
  );
};

export default ArrowLink;
