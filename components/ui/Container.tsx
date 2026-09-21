import React, { forwardRef } from 'react';
import clsx from 'clsx';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: 'default' | 'wide' | 'reading';
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ width = 'default', className, children, ...props }, ref) => {
    const widthClasses = {
      default: "max-w-[1280px]",
      wide: "max-w-[1440px]",
      reading: "max-w-[720px]",
    };

    return (
      <div
        ref={ref}
        className={clsx("mx-auto px-4 md:px-6 lg:px-8 w-full", widthClasses[width], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
export default Container;
