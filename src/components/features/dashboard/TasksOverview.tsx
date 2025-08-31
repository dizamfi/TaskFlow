'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { Clock, Calendar, AlertTriangle } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/utils';

interface TasksOverviewProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

export function TasksOverview({ tasks, onTaskClick }: TasksOverviewProps) {
  // Obtener tareas recientes (últimas 5)
  const recentTasks = tasks
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  // Obtener tareas próximas a vencer
  const upcomingTasks = tasks
    .filter(task => {
      if (!task.due_date || task.status === TaskStatus.COMPLETED) return false;
      const dueDate = new Date(task.due_date);
      const today = new Date();
      const threeDaysFromNow = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));
      return dueDate <= threeDaysFromNow;
    })
    .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime())
    .slice(0, 5);

  // Obtener tareas de alta prioridad pendientes
  const highPriorityTasks = tasks
    .filter(task => 
      task.priority === TaskPriority.HIGH && 
      task.status !== TaskStatus.COMPLETED
    )
    .slice(0, 5);

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH: return 'high';
      case TaskPriority.MEDIUM: return 'medium';
      case TaskPriority.LOW: return 'low';
      default: return 'low';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED: return 'completed';
      case TaskStatus.IN_PROGRESS: return 'in-progress';
      case TaskStatus.PENDING: return 'pending';
      default: return 'pending';
    }
  };

  const TaskItem = ({ task, showDueDate = false }: { task: Task; showDueDate?: boolean }) => (
    <div 
      className={`p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${
        onTaskClick ? 'cursor-pointer' : ''
      }`}
      onClick={() => onTaskClick?.(task)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-gray-600 truncate mt-1">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={getStatusColor(task.status)}>
              {task.status === TaskStatus.PENDING && 'Pendiente'}
              {task.status === TaskStatus.IN_PROGRESS && 'En Progreso'}
              {task.status === TaskStatus.COMPLETED && 'Completada'}
            </Badge>
            <Badge variant={getPriorityColor(task.priority)}>
              {task.priority === TaskPriority.HIGH && 'Alta'}
              {task.priority === TaskPriority.MEDIUM && 'Media'}
              {task.priority === TaskPriority.LOW && 'Baja'}
            </Badge>
          </div>
        </div>
        <div className="text-xs text-gray-500 ml-2">
          {showDueDate && task.due_date ? (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(task.due_date).toLocaleDateString('es-ES')}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(task.created_at)}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Tareas Recientes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Tareas Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentTasks.length > 0 ? (
              recentTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No hay tareas recientes
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Próximas a Vencer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-warning-600" />
            Próximas a Vencer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map(task => (
                <TaskItem key={task.id} task={task} showDueDate />
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No hay tareas próximas a vencer
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alta Prioridad */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-danger-600" />
            Alta Prioridad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {highPriorityTasks.length > 0 ? (
              highPriorityTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No hay tareas de alta prioridad pendientes
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}