'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  taskId?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Generar notificaciones automáticas basadas en tareas
  const generateTaskNotifications = useCallback((tasks: any[]) => {
    const now = new Date();
    const newNotifications: Notification[] = [];

    tasks.forEach(task => {
      if (!task.due_date) return;
      
      const dueDate = new Date(task.due_date);
      const timeDiff = dueDate.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      // Notificación para tareas que vencen en 2 horas
      if (hoursDiff > 0 && hoursDiff <= 2 && task.status !== 'completed') {
        newNotifications.push({
          id: `reminder-${task.id}`,
          type: 'reminder',
          title: 'Tarea próxima a vencer',
          message: `"${task.title}" vence en ${Math.round(hoursDiff)} hora${Math.round(hoursDiff) !== 1 ? 's' : ''}`,
          timestamp: now.toISOString(),
          read: false,
          taskId: task.id,
        });
      }

      // Notificación para tareas vencidas
      if (dueDate < now && task.status !== 'completed') {
        const daysPassed = Math.floor(-hoursDiff / 24);
        newNotifications.push({
          id: `overdue-${task.id}`,
          type: 'warning',
          title: 'Tarea vencida',
          message: `"${task.title}" venció hace ${daysPassed} día${daysPassed !== 1 ? 's' : ''}`,
          timestamp: now.toISOString(),
          read: false,
          taskId: task.id,
        });
      }
    });

    return newNotifications;
  }, []);

  // Crear notificación personalizada
  const createNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `custom-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    setNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  }, []);

  // Marcar como leída
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  }, []);

  // Marcar todas como leídas
  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  }, []);

  // Eliminar notificación
  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.filter(n => n.id !== notificationId)
    );
  }, []);

  // Limpiar todas las notificaciones
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Obtener contadores
  const unreadCount = notifications.filter(n => !n.read).length;
  const totalCount = notifications.length;

  // Simular carga de notificaciones al montar
  useEffect(() => {
    if (user) {
      setLoading(true);
      // Simular carga
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  return {
    notifications,
    unreadCount,
    totalCount,
    loading,
    actions: {
      createNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll,
      generateTaskNotifications,
    },
  };
}