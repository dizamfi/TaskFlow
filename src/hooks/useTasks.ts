// src/hooks/useTasks.ts - Hook para gestión de tareas
'use client';

import { useState, useEffect, useCallback } from 'react';
import { TaskService } from '@/lib/supabase/tasks';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/toast';
import type { Task, FilterOptions, DashboardStats, TaskStatus } from '@/types';

export function useTasks(initialFilters: FilterOptions = {}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  
  const { user } = useAuth();
  const { addToast } = useToast();

  // Cargar tareas con filtros
  const fetchTasks = useCallback(async (newFilters?: FilterOptions) => {
    if (!user) return;

    setLoading(true);
    try {
      const currentFilters = newFilters || filters;
      const fetchedTasks = await TaskService.getTasks(currentFilters);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
      addToast({
        title: 'Error',
        message: 'No se pudieron cargar las tareas',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [user, filters, addToast]);

  // Cargar estadísticas del dashboard
  const fetchStats = useCallback(async () => {
    if (!user) return;

    try {
      const dashboardStats = await TaskService.getDashboardStats();
      setStats(dashboardStats);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
      // No mostrar toast para estadísticas, es menos crítico
    }
  }, [user]);

  // Crear nueva tarea
  const createTask = useCallback(async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) {
      addToast({
        title: 'Error',
        message: 'Debes estar autenticado para crear tareas',
        type: 'error',
      });
      return;
    }

    try {
      const newTask = await TaskService.createTask(taskData);
      
      // Optimistic update - agregar la tarea inmediatamente
      setTasks((prev) => [newTask, ...prev]);
      
      // Actualizar estadísticas
      await fetchStats();
      
      addToast({
        title: '✅ Tarea creada',
        message: 'La tarea se creó exitosamente',
        type: 'success',
      });
      
      return newTask;
    } catch (error) {
      console.error('Error al crear tarea:', error);
      addToast({
        title: 'Error al crear tarea',
        message: error instanceof Error ? error.message : 'Error desconocido',
        type: 'error',
      });
      throw error;
    }
  }, [user, addToast, fetchStats]);

  // Actualizar tarea existente
  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    if (!user) {
      addToast({
        title: 'Error',
        message: 'Debes estar autenticado para actualizar tareas',
        type: 'error',
      });
      return;
    }

    let originalTask: Task | undefined = undefined;
    try {
      // Optimistic update - actualizar inmediatamente en el estado
      originalTask = tasks.find(task => task.id === id);
      if (originalTask) {
        setTasks((prev) =>
          prev.map((task) => 
            task.id === id 
              ? { ...task, ...updates, updated_at: new Date().toISOString() }
              : task
          )
        );
      }

      const updatedTask = await TaskService.updateTask(id, updates);
      
      // Actualizar con los datos reales del servidor
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      
      // Actualizar estadísticas
      await fetchStats();
      
      addToast({
        title: '✅ Tarea actualizada',
        message: 'Los cambios se guardaron correctamente',
        type: 'success',
      });
      
      return updatedTask;
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      
      // Revertir optimistic update en caso de error
      if (originalTask) {
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? originalTask as Task : task))
        );
      }
      
      addToast({
        title: 'Error al actualizar',
        message: error instanceof Error ? error.message : 'No se pudo actualizar la tarea',
        type: 'error',
      });
      throw error;
    }
  }, [user, tasks, addToast, fetchStats]);

  // Eliminar tarea
  const deleteTask = useCallback(async (id: string) => {
    if (!user) {
      addToast({
        title: 'Error',
        message: 'Debes estar autenticado para eliminar tareas',
        type: 'error',
      });
      return;
    }

    let taskToDelete: Task | undefined = undefined;
    try {
      // Optimistic update - eliminar inmediatamente del estado
      taskToDelete = tasks.find(task => task.id === id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      
      await TaskService.deleteTask(id);
      
      // Actualizar estadísticas
      await fetchStats();
      
      addToast({
        title: '🗑️ Tarea eliminada',
        message: 'La tarea se eliminó correctamente',
        type: 'success',
      });
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      
      // Revertir optimistic update en caso de error
      if (taskToDelete) {
        setTasks((prev) => taskToDelete ? [...prev, taskToDelete] : prev);
      }
      
      addToast({
        title: 'Error al eliminar',
        message: error instanceof Error ? error.message : 'No se pudo eliminar la tarea',
        type: 'error',
      });
      throw error;
    }
  }, [user, tasks, addToast, fetchStats]);

  // Cambiar estado de una tarea (toggle completed)
  const toggleTaskStatus = useCallback(async (id: string, newStatus: TaskStatus) => {
    return updateTask(id, { status: newStatus });
  }, [updateTask]);

  // Aplicar filtros
  const applyFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    fetchTasks(newFilters);
  }, [fetchTasks]);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    const clearedFilters: FilterOptions = {};
    setFilters(clearedFilters);
    fetchTasks(clearedFilters);
  }, [fetchTasks]);

  // Refrescar datos
  const refresh = useCallback(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  // Obtener tareas por estado
  const getTasksByStatus = useCallback((status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  // Obtener tareas vencidas
  const getOverdueTasks = useCallback(() => {
    const now = new Date();
    return tasks.filter(task => 
      task.due_date && 
      new Date(task.due_date) < now && 
      task.status !== 'completed'
    );
  }, [tasks]);

  // Obtener tareas de hoy
  const getTodayTasks = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tasks.filter(task => {
      if (!task.due_date) return false;
      const dueDate = new Date(task.due_date);
      return dueDate >= today && dueDate < tomorrow;
    });
  }, [tasks]);

  // Obtener tareas próximas (próximos 7 días)
  const getUpcomingTasks = useCallback(() => {
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));

    return tasks.filter(task => {
      if (!task.due_date || task.status === 'completed') return false;
      const dueDate = new Date(task.due_date);
      return dueDate >= now && dueDate <= sevenDaysFromNow;
    }).sort((a, b) => 
      new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime()
    );
  }, [tasks]);

  // Efectos
  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchStats();
    } else {
      // Limpiar estado si no hay usuario
      setTasks([]);
      setStats({
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        completionRate: 0,
      });
    }
  }, [user, fetchTasks, fetchStats]);

  // Recalcular estadísticas cuando las tareas cambien
  useEffect(() => {
    if (tasks.length > 0) {
      const newStats = tasks.reduce(
        (acc, task) => {
          acc.totalTasks++;
          if (task.status === 'completed') acc.completedTasks++;
          if (task.status === 'pending') acc.pendingTasks++;
          if (task.status === 'in_progress') acc.inProgressTasks++;
          return acc;
        },
        {
          totalTasks: 0,
          completedTasks: 0,
          pendingTasks: 0,
          inProgressTasks: 0,
          completionRate: 0,
        }
      );

      newStats.completionRate = newStats.totalTasks > 0 
        ? (newStats.completedTasks / newStats.totalTasks) * 100 
        : 0;

      setStats(newStats);
    }
  }, [tasks]);

  return {
    // Estado
    tasks,
    stats,
    loading,
    filters,
    
    // Acciones principales
    actions: {
      createTask,
      updateTask,
      deleteTask,
      toggleTaskStatus,
      applyFilters,
      clearFilters,
      refresh,
    },
    
    // Utilidades para obtener subconjuntos de tareas
    utils: {
      getTasksByStatus,
      getOverdueTasks,
      getTodayTasks,
      getUpcomingTasks,
    }
  };
}