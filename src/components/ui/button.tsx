// import React from 'react';
// import { cva, type VariantProps } from 'class-variance-authority';
// import { cn } from '@/lib/utils/utils';

// const buttonVariants = cva(
//   'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
//   {
//     variants: {
//       variant: {
//         default: 'bg-primary-600 text-white hover:bg-primary-700',
//         destructive: 'bg-danger-600 text-white hover:bg-danger-700',
//         outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
//         secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
//         ghost: 'hover:bg-accent hover:text-accent-foreground',
//         link: 'underline-offset-4 hover:underline text-primary-600',
//         success: 'bg-success-600 text-white hover:bg-success-700',
//         warning: 'bg-warning-600 text-white hover:bg-warning-700',
//       },
//       size: {
//         default: 'h-10 py-2 px-4',
//         sm: 'h-9 px-3 rounded-md',
//         lg: 'h-11 px-8 rounded-md',
//         icon: 'h-10 w-10',
//       },
//     },
//     defaultVariants: {
//       variant: 'default',
//       size: 'default',
//     },
//   }
// );

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean;
//   loading?: boolean;
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
//     return (
//       <button
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         disabled={disabled || loading}
//         {...props}
//       >
//         {loading && (
//           <svg
//             className="mr-2 h-4 w-4 animate-spin"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//         )}
//         {children}
//       </button>
//     );
//   }
// );

// Button.displayName = 'Button';
// export { Button, buttonVariants };






'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/index';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus-visible:ring-blue-500',
        destructive: 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:from-red-700 hover:to-red-800 hover:shadow-xl focus-visible:ring-red-500',
        outline: 'border-2 border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-slate-500',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-500',
        ghost: 'hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-500',
        link: 'text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };