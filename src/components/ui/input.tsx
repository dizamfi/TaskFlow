// import React from 'react';
// import { cn } from '@/lib/utils/utils';

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   error?: string;
//   label?: string;
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, error, label, id, ...props }, ref) => {
//     const inputId = id || `input-${Math.random().toString(36).substring(7)}`;

//     return (
//       <div className="w-full">
//         {label && (
//           <label
//             htmlFor={inputId}
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             {label}
//           </label>
//         )}
//         <input
//           id={inputId}
//           type={type}
//           className={cn(
//             'flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
//             error && 'border-danger-500 focus:ring-danger-500',
//             className
//           )}
//           ref={ref}
//           {...props}
//         />
//         {error && (
//           <p className="mt-1 text-sm text-danger-600">{error}</p>
//         )}
//       </div>
//     );
//   }
// );

// Input.displayName = 'Input';
// export { Input };






'use client';

import React from 'react';
import { cn } from '@/lib/index';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-11 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm transition-colors',
              'file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'placeholder:text-slate-500',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:border-blue-500',
              'disabled:cursor-not-allowed disabled:opacity-50',
              icon && 'pl-10',
              error && 'border-red-500 focus-visible:ring-red-500',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };