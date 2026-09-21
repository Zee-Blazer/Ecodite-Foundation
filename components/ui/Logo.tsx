import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'light';
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  showWordmark = true,
  size = 'md',
  className,
  ...props
}) => {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 56,
  };
  
  const imgSize = sizeMap[size];

  return (
    <div className={clsx("flex items-center gap-3", className)} {...props}>
      <Image
        src="/brand/logo-placeholder.svg"
        alt="Ecodite Foundation Emblem"
        width={imgSize}
        height={imgSize}
        className="shrink-0"
      />
      {showWordmark && (
        <span className={clsx(
          "font-display font-semibold tracking-tight",
          variant === 'light' ? "text-cream" : "text-ink",
          size === 'sm' ? "text-xl" : size === 'md' ? "text-2xl" : "text-3xl"
        )}>
          Ecodite Foundation
        </span>
      )}
    </div>
  );
};

export default Logo;
