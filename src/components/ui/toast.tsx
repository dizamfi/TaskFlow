// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { cn } from '@/lib/utils/utils';

// type ToastType = 'success' | 'error' | 'warning' | 'info';

// interface Toast {
//   id: string;
//   title: string;
//   message?: string;
//   type: ToastType;
//   duration?: number;
// }

// interface ToastContextType {
//   toasts: Toast[];
//   addToast: (toast: Omit<Toast, 'id'>) => void;
//   removeToast: (id: string) => void;
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// export function ToastProvider({ children }: { children: React.ReactNode }) {
//   const [toasts, setToasts] = useState<Toast[]>([]);

//   const addToast = (toast: Omit<Toast, 'id'>) => {
//     const id = Math.random().toString(36).substring(7);
//     setToasts((prev) => [...prev, { ...toast, id }]);

//     // Auto remove after duration
//     setTimeout(() => {
//       removeToast(id);
//     }, toast.duration || 5000);
//   };

//   const removeToast = (id: string) => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id));
//   };

//   return (
//     <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
//       {children}
//       <ToastContainer />
//     </ToastContext.Provider>
//   );
// }

// function ToastContainer() {
//   const { toasts, removeToast } = useToast();

//   return (
//     <div className="fixed top-4 right-4 z-50 space-y-2">
//       {toasts.map((toast) => (
//         <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
//       ))}
//     </div>
//   );
// }

// function ToastItem({ 
//   toast, 
//   onClose 
// }: { 
//   toast: Toast; 
//   onClose: (id: string) => void;
// }) {
//   const [isVisible, setIsVisible] = useState(true);

//   const handleClose = () => {
//     setIsVisible(false);
//     setTimeout(() => onClose(toast.id), 300);
//   };

//   const typeStyles = {
//     success: 'bg-success-50 border-success-200 text-success-800',
//     error: 'bg-danger-50 border-danger-200 text-danger-800',
//     warning: 'bg-warning-50 border-warning-200 text-warning-800',
//     info: 'bg-primary-50 border-primary-200 text-primary-800',
//   };

//   return (
//     <div
//       className={cn(
//         'min-w-80 rounded-lg border p-4 shadow-lg transition-all duration-300',
//         typeStyles[toast.type],
//         isVisible 
//           ? 'translate-x-0 opacity-100' 
//           : 'translate-x-full opacity-0'
//       )}
//     >
//       <div className="flex justify-between items-start">
//         <div>
//           <h4 className="font-semibold">{toast.title}</h4>
//           {toast.message && (
//             <p className="text-sm mt-1">{toast.message}</p>
//           )}
//         </div>
//         <button
//           onClick={handleClose}
//           className="ml-4 text-gray-400 hover:text-gray-600"
//         >
//           ×
//         </button>
//       </div>
//     </div>
//   );
// }

// export function useToast() {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error('useToast must be used within ToastProvider');
//   }
//   return context;
// }





// 'use client';

// import React, { createContext, useContext, useState, useCallback } from 'react';
// import { X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// interface Toast {
//   id: string;
//   title: string;
//   message: string;
//   type: 'success' | 'error' | 'warning';
// }

// interface ToastContextType {
//   toasts: Toast[];
//   addToast: (toast: Omit<Toast, 'id'>) => void;
//   removeToast: (id: string) => void;
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// export function ToastProvider({ children }: { children: React.ReactNode }) {
//   const [toasts, setToasts] = useState<Toast[]>([]);

//   const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
//     const id = Math.random().toString(36).substring(7);
//     const newToast = { ...toast, id };
    
//     setToasts(prev => [...prev, newToast]);
    
//     setTimeout(() => {
//       removeToast(id);
//     }, 5000);
//   }, []);

//   const removeToast = useCallback((id: string) => {
//     setToasts(prev => prev.filter(toast => toast.id !== id));
//   }, []);

//   return (
//     <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
//       {children}
//       <ToastContainer />
//     </ToastContext.Provider>
//   );
// }

// export function useToast() {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error('useToast must be used within a ToastProvider');
//   }
//   return context;
// }

// function ToastContainer() {
//   const { toasts, removeToast } = useToast();

//   if (toasts.length === 0) return null;

//   return (
//     <div className="fixed top-4 right-4 z-50 space-y-2">
//       {toasts.map((toast) => (
//         <ToastComponent key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
//       ))}
//     </div>
//   );
// }

// function ToastComponent({ toast, onClose }: { toast: Toast; onClose: () => void }) {
//   const icons = {
//     success: <CheckCircle className="h-5 w-5 text-green-600" />,
//     error: <XCircle className="h-5 w-5 text-red-600" />,
//     warning: <AlertCircle className="h-5 w-5 text-yellow-600" />
//   };

//   const bgColors = {
//     success: 'bg-green-50 border-green-200',
//     error: 'bg-red-50 border-red-200',
//     warning: 'bg-yellow-50 border-yellow-200'
//   };

//   return (
//     <div className={`
//       flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm
//       animate-in slide-in-from-right duration-300
//       ${bgColors[toast.type]}
//     `}>
//       {icons[toast.type]}
//       <div className="flex-1 min-w-0">
//         <h4 className="text-sm font-semibold text-slate-900">{toast.title}</h4>
//         <p className="text-sm text-slate-600">{toast.message}</p>
//       </div>
//       <button
//         onClick={onClose}
//         className="text-slate-400 hover:text-slate-600 transition-colors"
//       >
//         <X className="h-4 w-4" />
//       </button>
//     </div>
//   );
// }



'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning';
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
    
    // Limpiar timeout si existe
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto-remove después de 5 segundos
    const timeout = setTimeout(() => {
      removeToast(id);
    }, 5000);
    
    timeoutsRef.current.set(id, timeout);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastComponent({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-600" />,
    error: <XCircle className="h-5 w-5 text-red-600" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-600" />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200'
  };

  return (
    <div className={`
      flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm
      animate-in slide-in-from-right duration-300
      ${bgColors[toast.type]}
    `}>
      {icons[toast.type]}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-900">{toast.title}</h4>
        <p className="text-sm text-slate-600">{toast.message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}