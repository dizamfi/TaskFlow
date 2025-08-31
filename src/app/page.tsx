'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dashboard } from '@/components/features/dashboard';
import { AppLayout } from '@/components/layout/AppLayout';
import { Task } from '@/types';

export default function HomePage() {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleNavigateToTasks = () => {
    router.push('/tasks');
  };

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    // Aquí podrías abrir un modal o navegar a la página de detalle
  };

  return (
    <AppLayout>
      <Dashboard 
        onNavigateToTasks={handleNavigateToTasks}
        onTaskSelect={handleTaskSelect}
      />
    </AppLayout>
  );
}