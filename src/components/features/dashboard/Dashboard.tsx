'use client';

import React, { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useAuth } from '@/hooks/useAuth';
import { StatsCard } from './StatsCard';
import { ProgressChart } from './ProgressChart';
import { TasksOverview } from './TasksOverview';
import { QuickActions } from './QuickActions';
import { ProductivityChart } from './ProductivityChart';
import { TaskForm } from '../tasks/TaskForm';
import { Task, TaskStatus } from '@/types';
import { 
  CheckSquare, 
  Clock, 
  AlertCircle, 
  Calendar,
  Target
} from 'lucide-react';

interface DashboardProps {
  onNavigateToTasks?: () => void;
  onTaskSelect?: (task: Task) => void;
}

export function Dashboard({ onNavigateToTasks, onTaskSelect }: DashboardProps) {
  const { user } = useAuth();
  const { tasks, stats, loading, actions } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);

  // Calcular estadísticas adicionales
  const overdueTasks = tasks.filter(task => 
    task.due_date && 
    new Date(task.due_date) < new Date() && 
    task.status !== TaskStatus.COMPLETED
  ).length;

  const todayTasks = tasks.filter(task => {
    if (!task.due_date) return false;
    const today = new Date();
    const dueDate = new Date(task.due_date);
    return (
      dueDate.toDateString() === today.toDateString() &&
      task.status !== TaskStatus.COMPLETED
    );
  }).length;

  const handleCreateTask = async (taskData: any) => {
    await actions.createTask(taskData);
    setShowTaskForm(false);
  };

  if (loading && tasks.length === 0) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          ¡Hola, {user?.full_name || 'Usuario'}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Aquí tienes un resumen de tus tareas y productividad
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Tareas"
          value={stats.totalTasks}
          icon={CheckSquare}
          color="blue"
          onClick={onNavigateToTasks}
        />
        
        <StatsCard
          title="Completadas"
          value={stats.completedTasks}
          icon={Target}
          color="green"
          description={`${Math.round(stats.completionRate)}% de progreso`}
        />
        
        <StatsCard
          title="Pendientes"
          value={stats.pendingTasks}
          icon={Clock}
          color="yellow"
        />
        
        <StatsCard
          title="Vencidas"
          value={overdueTasks}
          icon={AlertCircle}
          color="red"
          description={overdueTasks > 0 ? 'Requieren atención' : 'Excelente'}
        />
      </div>

      {/* Quick Actions */}
      <QuickActions
        onCreateTask={() => setShowTaskForm(true)}
        onViewAllTasks={onNavigateToTasks || (() => {})}
      />

      {/* Charts and Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProgressChart stats={stats} />
        <ProductivityChart tasks={tasks} />
        
        {/* Tareas de Hoy */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Tareas de Hoy
            </h3>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {todayTasks}
            </div>
            <p className="text-gray-600 text-sm">
              {todayTasks === 0 
                ? '¡No hay tareas para hoy!' 
                : `Tarea${todayTasks > 1 ? 's' : ''} pendiente${todayTasks > 1 ? 's' : ''} para hoy`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Tasks Overview */}
      <TasksOverview 
        tasks={tasks}
        onTaskClick={onTaskSelect}
      />

      {/* Task Form Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowTaskForm(false)}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
}