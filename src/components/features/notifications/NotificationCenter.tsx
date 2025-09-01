'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { formatRelativeTime } from '@/lib/index';
import { 
  Bell, 
  Check, 
  X, 
  AlertTriangle, 
  Calendar,
  CheckCircle2,
  Info,
  Trash2,
  Settings
} from 'lucide-react';

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

// Mock notifications - en producción vendrían de una API
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'reminder',
    title: 'Tarea próxima a vencer',
    message: 'La tarea "Revisar documentación" vence en 2 horas',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 min ago
    read: false,
    taskId: 'task-1',
  },
  {
    id: '2',
    type: 'success',
    title: 'Tarea completada',
    message: 'Has completado "Llamar al cliente"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h ago
    read: false,
    taskId: 'task-2',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Tareas vencidas',
    message: 'Tienes 3 tareas que han vencido',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'Resumen semanal',
    message: 'Has completado 15 tareas esta semana. ¡Buen trabajo!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    read: true,
  },
];

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

export function NotificationCenter({ isOpen, onClose, onNotificationClick }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const { addToast } = useToast();

  // Contar notificaciones no leídas
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-success-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning-600" />;
      case 'error':
        return <X className="h-4 w-4 text-danger-600" />;
      case 'reminder':
        return <Calendar className="h-4 w-4 text-primary-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'border-l-success-500 bg-success-50';
      case 'warning':
        return 'border-l-warning-500 bg-warning-50';
      case 'error':
        return 'border-l-danger-500 bg-danger-50';
      case 'reminder':
        return 'border-l-primary-500 bg-primary-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    
    addToast({
      title: 'Notificaciones marcadas',
      message: 'Todas las notificaciones se marcaron como leídas',
      type: 'success',
    //   duration: 3000,
    });
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev =>
      prev.filter(n => n.id !== notificationId)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    addToast({
      title: 'Notificaciones eliminadas',
      message: 'Todas las notificaciones se eliminaron',
      type: 'success',
    //   duration: 3000,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-25 z-40"
        onClick={onClose}
      />
      
      {/* Panel de Notificaciones */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Notificaciones
                </h2>
                {unreadCount > 0 && (
                  <Badge variant="destructive">{unreadCount}</Badge>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Acciones */}
            {notifications.length > 0 && (
              <div className="flex justify-between mt-3">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Marcar todas como leídas
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllNotifications}
                  className="text-xs text-danger-600 hover:text-danger-700"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Eliminar todas
                </Button>
              </div>
            )}
          </div>

          {/* Lista de Notificaciones */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Bell className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No hay notificaciones
                </h3>
                <p className="text-gray-600">
                  Las notificaciones aparecerán aquí
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${
                      !notification.read ? 'bg-gray-50' : ''
                    } ${getNotificationColor(notification.type)}`}
                    onClick={() => {
                      markAsRead(notification.id);
                      onNotificationClick?.(notification);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-gray-900 text-sm">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          
                          <p className="text-xs text-gray-500">
                            {formatRelativeTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con configuración */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Configurar notificaciones
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}