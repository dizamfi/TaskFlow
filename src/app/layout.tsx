// 'use client';

// import './globals.css';
// import { Inter } from 'next/font/google';
// import { ToastProvider } from '@/components/ui/toast';
// import { AuthGuard } from '@/components/features/auth';
// import { Metadata } from 'next';

// const inter = Inter({ subsets: ['latin'] });

// // export const metadata: Metadata = {
// //   title: 'TaskFlow - Gestión de Tareas',
// //   description: 'Sistema moderno de gestión de tareas y productividad',
// // };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="es">
//       <body className={`${inter.className} bg-gray-50`}>
//         <ToastProvider>
//           {/* <AuthGuard>
            
//           </AuthGuard> */}
//           {children}
//         </ToastProvider>
//       </body>
//     </html>
//   );
// }



'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/components/ui/toast';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}



// // Quitar 'use client' del layout si no necesitas funcionalidades de cliente en este archivo
// import './globals.css';
// import { Inter } from 'next/font/google';
// import { Metadata } from 'next';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'TaskFlow - Gestión de Tareas',
//   description: 'Sistema moderno de gestión de tareas y productividad',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="es">
//       <body className={`${inter.className} bg-gray-50`}>
//         {children}
//       </body>
//     </html>
//   );
// }
