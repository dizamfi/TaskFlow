// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Dashboard } from '@/components/features/dashboard';
// import { AppLayout } from '@/components/layout/AppLayout';
// import { Task } from '@/types';

// export default function HomePage() {
//   const router = useRouter();
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);

//   const handleNavigateToTasks = () => {
//     router.push('/tasks');
//   };

//   const handleTaskSelect = (task: Task) => {
//     setSelectedTask(task);
//     // Aquí podrías abrir un modal o navegar a la página de detalle
//   };

//   return (
//     <AppLayout>
//       <Dashboard 
//         onNavigateToTasks={handleNavigateToTasks}
//         onTaskSelect={handleTaskSelect}
//       />
//     </AppLayout>
//   );
// }



'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Dashboard } from '@/components/features/dashboard';
import { AppLayout } from '@/components/layout/AppLayout';
import { Task } from '@/types';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Verificar autenticación
  useEffect(() => {
    
    if (!loading && !user) {
      router.push('/auth/signin');
      
    }
  }, [user, loading, router]);

  const handleNavigateToTasks = () => {
    router.push('/tasks');
  };

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white mb-2">TaskFlow</h1>
          <p className="text-slate-300">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, no mostrar nada (se está redirigiendo)
  if (!user) {
    return null;
  }

  // Usuario autenticado - mostrar dashboard
  return (
    <AppLayout>
      <Dashboard 
        onNavigateToTasks={handleNavigateToTasks}
        onTaskSelect={handleTaskSelect}
      />
    </AppLayout>
  );
}