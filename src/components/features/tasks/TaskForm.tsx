'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema, type CreateTaskInput } from '@/lib/validations/tasks';
import { TaskStatus, TaskPriority, type Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Plus, Edit3 } from 'lucide-react';

// Definir el tipo específico para el formulario
type TaskFormData = {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: string;
};

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: CreateTaskInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function TaskForm({ task, onSubmit, onCancel, loading = false }: TaskFormProps) {
  const isEditing = !!task;
  
  // Valores por defecto
  const defaultValues: TaskFormData = {
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || TaskStatus.PENDING,
    priority: task?.priority || TaskPriority.MEDIUM,
    due_date: task?.due_date ? new Date(task.due_date).toISOString().slice(0, 16) : '',
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,

  } = useForm<TaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues,
  });

  const statusOptions = [
    { value: TaskStatus.PENDING, label: 'Pendiente' },
    { value: TaskStatus.IN_PROGRESS, label: 'En Progreso' },
    { value: TaskStatus.COMPLETED, label: 'Completada' },
  ];

  const priorityOptions = [
    { value: TaskPriority.LOW, label: 'Baja' },
    { value: TaskPriority.MEDIUM, label: 'Media' },
    { value: TaskPriority.HIGH, label: 'Alta' },
  ];

  const handleFormSubmit = async (data: TaskFormData) => {
    try {
      // Convertir y limpiar datos
      const formattedData: CreateTaskInput = {
        title: data.title,
        description: data.description || '',
        status: data.status ?? TaskStatus.PENDING,
        priority: data.priority ?? TaskPriority.MEDIUM,
        due_date: data.due_date && data.due_date.trim() !== '' 
          ? new Date(data.due_date).toISOString() 
          : undefined,
      };
      
      await onSubmit(formattedData);
      
      if (!isEditing) {
        reset(); // Solo resetear si es creación
      }
    } catch (error) {
      console.error('Error en el formulario:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          {isEditing ? <Edit3 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={loading}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Input
            {...register('title')}
            label="Título *"
            placeholder="Ej: Completar informe de proyecto"
            error={errors.title?.message}
            disabled={loading}
          />

          <Textarea
            {...register('description')}
            label="Descripción"
            placeholder="Describe los detalles de la tarea..."
            error={errors.description?.message}
            disabled={loading}
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                {...register('status')}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-danger-600">{errors.status.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridad
              </label>
              <select
                {...register('priority')}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <p className="mt-1 text-sm text-danger-600">{errors.priority.message}</p>
              )}
            </div>
          </div>

          <Input
            {...register('due_date')}
            label="Fecha de vencimiento"
            type="datetime-local"
            error={errors.due_date?.message}
            disabled={loading}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={loading}
            >
              {isEditing ? 'Actualizar' : 'Crear'} Tarea
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}