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
    sm: 36,
    md: 48,
    lg: 56,
  };
  
  const imgSize = sizeMap[size];

  return (
    <div className={clsx("flex items-center gap-3", className)} {...props}>
      <div
        className={clsx(
          "rounded-full overflow-hidden shrink-0 bg-white ring-1 ring-black/5 shadow-xs flex items-center justify-center p-0.5",
          size === 'sm' ? "w-9 h-9" : size === 'md' ? "w-12 h-12" : "w-14 h-14"
        )}
      >
        <Image
          src="/brand/logo.jpg"
          alt="Ecodite Educational Foundation Emblem"
          width={imgSize}
          height={imgSize}
          className="rounded-full object-cover w-full h-full"
          priority
        />
      </div>
      {showWordmark && (
        <span
          className={clsx(
            "font-display font-semibold tracking-tight",
            variant === 'light' ? "text-cream" : "text-ink",
            size === 'sm' ? "text-xl" : size === 'md' ? "text-2xl" : "text-3xl"
          )}
        >
          Ecodite Foundation
        </span>
      )}
    </div>
  );
};

export default Logo;
