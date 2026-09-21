import React from 'react';
import clsx from 'clsx';

export interface StatusTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'upcoming' | 'ongoing' | 'past';
}

const StatusTag: React.FC<StatusTagProps> = ({ status, className, ...props }) => {
  const statusConfig = {
    upcoming: {
      classes: "bg-green-500/10 text-green-800",
      label: "UPCOMING",
    },
    ongoing: {
      classes: "bg-sun-500/10 text-sun-700",
      label: "ONGOING",
    },
    past: {
      classes: "bg-ink/5 text-ink-muted",
      label: "PAST",
    },
  };

  const { classes, label } = statusConfig[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center text-xs uppercase tracking-[0.1em] font-semibold px-3 py-1 rounded-full",
        classes,
        className
      )}
      {...props}
    >
      {label}
    </span>
  );
};

export default StatusTag;
