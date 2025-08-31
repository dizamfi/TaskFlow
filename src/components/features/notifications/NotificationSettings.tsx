'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { 
  Settings, 
  Bell, 
  BellOff, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Mail,
  Smartphone,
  Monitor,
  BarChart3
} from 'lucide-react';

interface NotificationPreferences {
  taskReminders: boolean;
  overdueAlerts: boolean;
  completionNotifications: boolean;
  weeklyReports: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  desktopNotifications: boolean;
  reminderTime: number; // horas antes del vencimiento
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export function NotificationSettings() {
  const { addToast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    taskReminders: true,
    overdueAlerts: true,
    completionNotifications: true,
    weeklyReports: false,
    emailNotifications: true,
    pushNotifications: true,
    desktopNotifications: false,
    reminderTime: 2,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
    },
  });

  const [loading, setLoading] = useState(false);

  const handlePreferenceChange = (key: keyof NotificationPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleQuietHoursChange = (key: 'enabled' | 'start' | 'end', value: any) => {
    setPreferences(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [key]: value,
      },
    }));
  };

  const savePreferences = async () => {
    setLoading(true);
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addToast({
        title: 'Preferencias guardadas',
        message: 'Tu configuración de notificaciones se actualizó correctamente',
        type: 'success',
      });
    } catch (error) {
      addToast({
        title: 'Error',
        message: 'No se pudieron guardar las preferencias',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        handlePreferenceChange('desktopNotifications', true);
        addToast({
          title: 'Permisos otorgados',
          message: 'Las notificaciones de escritorio están habilitadas',
          type: 'success',
        });
      } else {
        addToast({
          title: 'Permisos denegados',
          message: 'No se pueden mostrar notificaciones de escritorio',
          type: 'warning',
        });
      }
    }
  };

  const ToggleOption = ({ 
    icon: Icon, 
    title, 
    description, 
    enabled, 
    onChange,
    badge,
  }: {
    icon: React.ElementType;
    title: string;
    description: string;
    enabled: boolean;
    onChange: (value: boolean) => void;
    badge?: string;
  }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-start gap-3">
        <Icon className="h-5 w-5 text-gray-600 mt-0.5" />
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900">{title}</h4>
            {badge && <Badge variant="secondary">{badge}</Badge>}
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      
      <Button
        variant={enabled ? "default" : "outline"}
        size="sm"
        onClick={() => onChange(!enabled)}
        className="flex items-center gap-2"
      >
        {enabled ? <Bell className="h-3 w-3" /> : <BellOff className="h-3 w-3" />}
        {enabled ? 'Activado' : 'Desactivado'}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración de Notificaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tipos de Notificaciones */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tipos de Notificaciones</h3>
            <div className="space-y-3">
              <ToggleOption
                icon={Clock}
                title="Recordatorios de tareas"
                description="Te avisaremos antes de que venzan tus tareas"
                enabled={preferences.taskReminders}
                onChange={(value) => handlePreferenceChange('taskReminders', value)}
                badge="Recomendado"
              />
              
              <ToggleOption
                icon={AlertTriangle}
                title="Alertas de vencimiento"
                description="Notificaciones cuando las tareas estén vencidas"
                enabled={preferences.overdueAlerts}
                onChange={(value) => handlePreferenceChange('overdueAlerts', value)}
              />
              
              <ToggleOption
                icon={CheckCircle2}
                title="Notificaciones de completado"
                description="Confirmación cuando completes una tarea"
                enabled={preferences.completionNotifications}
                onChange={(value) => handlePreferenceChange('completionNotifications', value)}
              />
              
              <ToggleOption
                icon={BarChart3}
                title="Reportes semanales"
                description="Resumen de tu productividad cada semana"
                enabled={preferences.weeklyReports}
                onChange={(value) => handlePreferenceChange('weeklyReports', value)}
              />
            </div>
          </div>

          {/* Canales de Notificación */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Canales de Notificación</h3>
            <div className="space-y-3">
              <ToggleOption
                icon={Mail}
                title="Notificaciones por email"
                description="Recibir notificaciones en tu correo electrónico"
                enabled={preferences.emailNotifications}
                onChange={(value) => handlePreferenceChange('emailNotifications', value)}
              />
              
              <ToggleOption
                icon={Smartphone}
                title="Notificaciones push"
                description="Notificaciones en tu dispositivo móvil"
                enabled={preferences.pushNotifications}
                onChange={(value) => handlePreferenceChange('pushNotifications', value)}
              />
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Monitor className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Notificaciones de escritorio</h4>
                    <p className="text-sm text-gray-600">
                      Mostrar notificaciones en tu navegador
                    </p>
                  </div>
                </div>
                
                {!preferences.desktopNotifications ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={requestNotificationPermission}
                  >
                    Habilitar
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handlePreferenceChange('desktopNotifications', false)}
                  >
                    <Bell className="h-3 w-3 mr-1" />
                    Activado
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Configuración de Tiempo */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Configuración de Tiempo</h3>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Recordar tareas antes de vencer
                </h4>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0.5"
                    max="24"
                    step="0.5"
                    value={preferences.reminderTime}
                    onChange={(e) => handlePreferenceChange('reminderTime', parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium min-w-0 text-gray-900">
                    {preferences.reminderTime} hora{preferences.reminderTime !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Horario silencioso</h4>
                    <p className="text-sm text-gray-600">
                      No recibir notificaciones durante estas horas
                    </p>
                  </div>
                  <Button
                    variant={preferences.quietHours.enabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleQuietHoursChange('enabled', !preferences.quietHours.enabled)}
                  >
                    {preferences.quietHours.enabled ? 'Activado' : 'Desactivado'}
                  </Button>
                </div>
                
                {preferences.quietHours.enabled && (
                  <div className="flex items-center gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Desde
                      </label>
                      <input
                        type="time"
                        value={preferences.quietHours.start}
                        onChange={(e) => handleQuietHoursChange('start', e.target.value)}
                        className="text-sm border rounded px-2 py-1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Hasta
                      </label>
                      <input
                        type="time"
                        value={preferences.quietHours.end}
                        onChange={(e) => handleQuietHoursChange('end', e.target.value)}
                        className="text-sm border rounded px-2 py-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Guardar Cambios */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={savePreferences}
              loading={loading}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Guardar Configuración
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}