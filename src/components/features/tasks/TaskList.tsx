'use client';

import React from 'react';
import { Task } from '@/types';
import { TaskCard } from './TaskCard';
import { Empty } from '@/components/ui/empty';
import { CheckSquare, Search } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: any) => void;
  loading?: boolean;
  emptyMessage?: string;
  emptyDescription?: string;
}

export function TaskList({ 
  tasks, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  loading = false,
  emptyMessage = "No hay tareas",
  emptyDescription = "Crea tu primera tarea para comenzar a organizarte"
}: TaskListProps) {
  if (!loading && tasks.length === 0) {
    return (
      <Empty
        icon={<CheckSquare className="h-12 w-12 text-gray-400" />}
        title={emptyMessage}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          loading={loading}
        />
      ))}
      
      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="flex gap-2">
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                      <div className="h-5 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}