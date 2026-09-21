import React from 'react';
import clsx from 'clsx';
import MediaPlaceholder from './MediaPlaceholder';

export interface VideoPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  description: string;
  ratio: string;
  size?: 'sm' | 'md' | 'lg';
  dark?: boolean;
}

const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({
  label,
  description,
  ratio,
  size = 'md',
  dark = false,
  className,
  ...props
}) => {
  return (
    <div className={clsx("relative group", className)} {...props}>
      <MediaPlaceholder
        label={label}
        description={description}
        ratio={ratio}
        size={size}
        dark={dark}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={clsx(
          "flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110",
          size === 'sm' ? "w-12 h-12" : size === 'md' ? "w-16 h-16" : "w-20 h-20",
          dark ? "bg-sun-500 text-green-950" : "bg-green-800 text-cream"
        )}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-1/3 h-1/3 ml-1">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VideoPlaceholder;
