'use client';

import React, { useState } from 'react';
import { TaskList, TaskForm, TaskFilters } from '@/components/features/tasks';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/hooks/useTasks';
import { Task, FilterOptions } from '@/types';
import { Plus } from 'lucide-react';

export default function TasksPage() {
  const { tasks, loading, filters, actions } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = async (taskData: any) => {
    await actions.createTask(taskData);
    setShowTaskForm(false);
  };

  const handleUpdateTask = async (taskData: any) => {
    if (editingTask) {
      await actions.updateTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      actions.deleteTask(taskId);
    }
  };

  const handleStatusChange = (taskId: string, status: any) => {
    actions.updateTask(taskId, { status });
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    actions.applyFilters(newFilters);
  };

  // Calcular conteos para los filtros
  const taskCounts = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Tareas</h1>
            <p className="text-gray-600 mt-1">
              Gestiona y organiza todas tus tareas
            </p>
          </div>
          <Button
            onClick={() => setShowTaskForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nueva Tarea
          </Button>
        </div>

        {/* Filtros */}
        <TaskFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClear={actions.clearFilters}
          taskCounts={taskCounts}
        />

        {/* Lista de Tareas */}
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          loading={loading}
          emptyMessage={
            Object.keys(filters).length > 0 
              ? "No se encontraron tareas" 
              : "No tienes tareas aún"
          }
          emptyDescription={
            Object.keys(filters).length > 0
              ? "Intenta ajustar los filtros para encontrar las tareas que buscas"
              : "Crea tu primera tarea para comenzar a organizarte"
          }
        />

        {/* Formulario de Tarea - Modal */}
        {(showTaskForm || editingTask) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <TaskForm
                task={editingTask || undefined}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={() => {
                  setShowTaskForm(false);
                  setEditingTask(null);
                }}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}




// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';
// import { Dashboard } from '@/components/features/dashboard';
// import { AppLayout } from '@/components/layout/AppLayout';
// import { Task } from '@/types';

// export default function HomePage() {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);

//   // Verificar autenticación
//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/auth/signin');
//     }
//   }, [user, loading, router]);

//   const handleNavigateToTasks = () => {
//     router.push('/tasks');
//   };

//   const handleTaskSelect = (task: Task) => {
//     setSelectedTask(task);
//   };

//   // Mostrar loading mientras verifica autenticación
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <h1 className="text-2xl font-bold text-white mb-2">TaskFlow</h1>
//           <p className="text-slate-300">Cargando...</p>
//         </div>
//       </div>
//     );
//   }

//   // Si no hay usuario, no mostrar nada (se está redirigiendo)
//   if (!user) {
//     return null;
//   }

//   // Usuario autenticado - mostrar dashboard
//   return (
//     <AppLayout>
//       <Dashboard 
//         onNavigateToTasks={handleNavigateToTasks}
//         onTaskSelect={handleTaskSelect}
//       />
//     </AppLayout>
//   );
// }