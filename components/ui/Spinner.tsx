import React from 'react';
import { cn } from '../../lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-12',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Spinner({ size, show, children, className }: SpinnerContentProps) {
  return (
    <>
      {/* Overlay for fading background */}
      <div
        className={cn(
          spinnerVariants({ show }),
          'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'
        )}
      >
        <div className="bg-background flex flex-col items-center justify-center p-10 relative rounded-lg">
          <Loader2 className={cn(loaderVariants({ size }), className)} />
          {children}
        </div>
      </div>
    </>
  );
}
