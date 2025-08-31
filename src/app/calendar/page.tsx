'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CalendarView } from '@/components/features/calendar/CalendarView';
import { TaskForm } from '@/components/features/tasks/TaskForm';
import { useTasks } from '@/hooks/useTasks';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { useToast } from '@/components/ui/toast';

export default function CalendarPage() {
  const { tasks, loading, actions } = useTasks();
  const { addToast } = useToast();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCreateTask = async (taskData: any) => {
    try {
      // Si hay una fecha seleccionada, usarla como fecha de vencimiento
      if (selectedDate && !taskData.due_date) {
        taskData.due_date = selectedDate.toISOString();
      }
      
      await actions.createTask(taskData);
      setShowTaskForm(false);
      setSelectedDate(null);
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  const handleUpdateTask = async (taskData: any) => {
    if (selectedTask) {
      try {
        await actions.updateTask(selectedTask.id, taskData);
        setShowTaskForm(false);
        setSelectedTask(null);
      } catch (error) {
        console.error('Error al actualizar tarea:', error);
      }
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTask(null); // Limpiar tarea seleccionada
    setShowTaskForm(true);
    
    addToast({
      title: 'Nueva tarea',
      message: `Creando tarea para ${date.toLocaleDateString('es-ES')}`,
      type: 'info',
      duration: 2000,
    });
  };

  const handleCreateTaskClick = (date?: Date) => {
    setSelectedDate(date || null);
    setSelectedTask(null);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setSelectedDate(null);
    setSelectedTask(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendario</h1>
          <p className="text-gray-600 mt-1">
            Visualiza y gestiona tus tareas por fecha
          </p>
        </div>

        {/* Calendario */}
        <CalendarView
          tasks={tasks}
          onTaskClick={handleTaskClick}
          onDateClick={handleDateClick}
          onCreateTask={handleCreateTaskClick}
          loading={loading}
        />

        {/* Modal de Formulario */}
        {showTaskForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <TaskForm
                task={selectedTask || undefined}
                onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
                onCancel={handleCloseForm}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}