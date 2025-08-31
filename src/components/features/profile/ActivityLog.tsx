'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatRelativeTime } from '@/lib/utils/utils';
import { Activity, CheckCircle2, Edit3, Trash2, Plus } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'created' | 'updated' | 'completed' | 'deleted';
  description: string;
  timestamp: string;
  taskTitle?: string;
}

// Mock data - en producción esto vendría de una API
const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'completed',
    description: 'Completaste la tarea',
    taskTitle: 'Revisar documentación',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
  },
  {
    id: '2',
    type: 'created',
    description: 'Creaste una nueva tarea',
    taskTitle: 'Preparar presentación',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h ago
  },
  {
    id: '3',
    type: 'updated',
    description: 'Actualizaste la tarea',
    taskTitle: 'Llamar al cliente',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5h ago
  },
  {
    id: '4',
    type: 'deleted',
    description: 'Eliminaste la tarea',
    taskTitle: 'Tarea obsoleta',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
];

export function ActivityLog() {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-success-600" />;
      case 'created':
        return <Plus className="h-4 w-4 text-primary-600" />;
      case 'updated':
        return <Edit3 className="h-4 w-4 text-warning-600" />;
      case 'deleted':
        return <Trash2 className="h-4 w-4 text-danger-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityBadge = (type: ActivityItem['type']) => {
    switch (type) {
      case 'completed':
        return <Badge variant="success">Completada</Badge>;
      case 'created':
        return <Badge variant="default">Creada</Badge>;
      case 'updated':
        return <Badge variant="warning">Actualizada</Badge>;
      case 'deleted':
        return <Badge variant="destructive">Eliminada</Badge>;
      default:
        return <Badge variant="secondary">Actividad</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.description}
                  </p>
                  {getActivityBadge(activity.type)}
                </div>
                
                {activity.taskTitle && (
                  <p className="text-sm text-gray-600 mb-1">
                    "{activity.taskTitle}"
                  </p>
                )}
                
                <p className="text-xs text-gray-500">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {mockActivities.length === 0 && (
            <div className="text-center py-8">
              <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No hay actividad reciente</p>
            </div>
          )}
        </div>
        
        <div className="text-center pt-4 border-t">
          <button className="text-sm text-primary-600 hover:text-primary-800">
            Ver toda la actividad
          </button>
        </div>
      </CardContent>
    </Card>
  );
}