import React from 'react';
import clsx from 'clsx';

export interface SkipToContentProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId?: string;
}

const SkipToContent: React.FC<SkipToContentProps> = ({
  targetId = 'main-content',
  className,
  ...props
}) => {
  return (
    <a
      href={`#${targetId}`}
      className={clsx(
        "sr-only focus:not-sr-only",
        "focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sun-500 focus:text-green-950 focus:font-semibold focus:rounded-md",
        className
      )}
      {...props}
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
