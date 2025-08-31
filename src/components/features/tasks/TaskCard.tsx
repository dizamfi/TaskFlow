'use client';

import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/lib/utils/utils';
import { 
  Edit3, 
  Trash2, 
  Clock, 
  Calendar,
  MoreVertical,
  CheckCircle2,
  Circle,
  AlertCircle 
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  loading?: boolean;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange, loading = false }: TaskCardProps) {
  const [showActions, setShowActions] = useState(false);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle2 className="h-4 w-4 text-success-600" />;
      case TaskStatus.IN_PROGRESS:
        return <AlertCircle className="h-4 w-4 text-primary-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return 'high';
      case TaskPriority.MEDIUM:
        return 'medium';
      case TaskPriority.LOW:
        return 'low';
      default:
        return 'low';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return 'completed';
      case TaskStatus.IN_PROGRESS:
        return 'in-progress';
      case TaskStatus.PENDING:
        return 'pending';
      default:
        return 'pending';
    }
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== TaskStatus.COMPLETED;

  const handleStatusToggle = () => {
    const nextStatus = task.status === TaskStatus.COMPLETED 
      ? TaskStatus.PENDING 
      : TaskStatus.COMPLETED;
    onStatusChange(task.id, nextStatus);
  };

  return (
    <Card className={`group hover:shadow-md transition-shadow ${task.status === TaskStatus.COMPLETED ? 'opacity-75' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStatusToggle}
              disabled={loading}
              className="p-0 h-6 w-6 hover:bg-transparent"
            >
              {getStatusIcon(task.status)}
            </Button>
            
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-gray-900 mb-1 ${
                task.status === TaskStatus.COMPLETED ? 'line-through text-gray-500' : ''
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Clock className="h-3 w-3" />
                <span>{formatRelativeTime(task.created_at)}</span>
                
                {task.due_date && (
                  <>
                    <Calendar className="h-3 w-3 ml-2" />
                    <span className={isOverdue ? 'text-danger-600 font-medium' : ''}>
                      {new Date(task.due_date).toLocaleDateString('es-ES')}
                      {isOverdue && ' (Vencida)'}
                    </span>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-2">
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
          </div>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(!showActions)}
              disabled={loading}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
            
            {showActions && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowActions(false)}
                />
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border z-50">
                  <button
                    onClick={() => {
                      onEdit(task);
                      setShowActions(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    disabled={loading}
                  >
                    <Edit3 className="h-3 w-3 mr-2" />
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      onDelete(task.id);
                      setShowActions(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-danger-600 hover:bg-gray-100"
                    disabled={loading}
                  >
                    <Trash2 className="h-3 w-3 mr-2" />
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}