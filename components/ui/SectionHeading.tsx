import React from 'react';
import clsx from 'clsx';
import Eyebrow from './Eyebrow';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center';
  headingAs?: 'h1' | 'h2' | 'h3';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  headingAs: HeadingTag = 'h2',
  className,
  ...props
}) => {
  return (
    <div className={clsx("flex flex-col gap-4", align === 'center' ? "text-center items-center" : "text-left items-start", className)} {...props}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <HeadingTag className={clsx(
        "font-display text-ink",
        HeadingTag === 'h1' ? "text-display-xl" : HeadingTag === 'h2' ? "text-display-lg" : "text-h2"
      )}>
        {heading}
      </HeadingTag>
      {subheading && (
        <p className="text-body-lg text-ink-muted max-w-3xl">
          {subheading}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
