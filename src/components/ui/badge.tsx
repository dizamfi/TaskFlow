import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary-100 text-primary-800 border border-primary-200',
        secondary: 'bg-gray-100 text-gray-800 border border-gray-200',
        destructive: 'bg-danger-100 text-danger-800 border border-danger-200',
        outline: 'text-gray-950 border border-gray-200',
        success: 'bg-success-100 text-success-800 border border-success-200',
        warning: 'bg-warning-100 text-warning-800 border border-warning-200',
        pending: 'bg-gray-100 text-gray-700 border border-gray-200',
        'in-progress': 'bg-primary-100 text-primary-700 border border-primary-200',
        completed: 'bg-success-100 text-success-700 border border-success-200',
        low: 'bg-gray-100 text-gray-700 border border-gray-200',
        medium: 'bg-warning-100 text-warning-700 border border-warning-200',
        high: 'bg-danger-100 text-danger-700 border border-danger-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };