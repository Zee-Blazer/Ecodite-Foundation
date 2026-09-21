import React from 'react';
import clsx from 'clsx';
import Rays from './Rays';
import Eyebrow from './Eyebrow';

export interface MediaPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  description: string;
  ratio: string;
  size?: 'sm' | 'md' | 'lg';
  dark?: boolean;
  /** Where the label/description sits. Use 'top' when real foreground copy is anchored to the bottom of the same box (e.g. the hero), so the two never overlap. */
  contentPosition?: 'center' | 'top';
}

const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  label,
  description,
  ratio,
  size = 'md',
  dark = false,
  contentPosition = 'center',
  className,
  ...props
}) => {
  const [w, h] = ratio.split(':').map(Number);
  const aspectRatio = w && h ? `${w}/${h}` : '16/9';

  return (
    <div
      className={clsx(
        "relative flex flex-col items-center overflow-hidden rounded-sm text-center p-6",
        contentPosition === 'top' ? "justify-start pt-16" : "justify-center",
        dark ? "bg-green-800 border border-line-dark" : "bg-sage-100 border border-line",
        className
      )}
      style={{ aspectRatio }}
      {...props}
    >
      <Rays opacity={dark ? 0.15 : 0.05} scale={1.5} className={dark ? "text-cream" : "text-green-950"} />
      <div className="relative z-10 flex flex-col items-center gap-2 max-w-xs">
        <Eyebrow className={dark ? "text-sun-500" : ""}>{label}</Eyebrow>
        <p className={clsx(
          "text-balance",
          size === 'sm' ? "text-sm" : size === 'md' ? "text-base" : "text-lg",
          dark ? "text-cream/80" : "text-ink-muted"
        )}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default MediaPlaceholder;
