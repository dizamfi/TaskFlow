'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, CheckSquare, Calendar, BarChart3, Settings } from 'lucide-react';

interface QuickActionsProps {
  onCreateTask: () => void;
  onViewAllTasks: () => void;
  onViewCalendar?: () => void;
  onViewReports?: () => void;
  onViewSettings?: () => void;
}

export function QuickActions({ 
  onCreateTask, 
  onViewAllTasks,
  onViewCalendar,
  onViewReports,
  onViewSettings 
}: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <Button 
            onClick={onCreateTask}
            className="flex items-center gap-2 h-12"
          >
            <Plus className="h-4 w-4" />
            Nueva Tarea
          </Button>
          
          <Button 
            variant="outline"
            onClick={onViewAllTasks}
            className="flex items-center gap-2 h-12"
          >
            <CheckSquare className="h-4 w-4" />
            Ver Todas
          </Button>
          
          {onViewCalendar && (
            <Button 
              variant="outline"
              onClick={onViewCalendar}
              className="flex items-center gap-2 h-12"
            >
              <Calendar className="h-4 w-4" />
              Calendario
            </Button>
          )}
          
          {onViewReports && (
            <Button 
              variant="outline"
              onClick={onViewReports}
              className="flex items-center gap-2 h-12"
            >
              <BarChart3 className="h-4 w-4" />
              Reportes
            </Button>
          )}
          
          {onViewSettings && (
            <Button 
              variant="outline"
              onClick={onViewSettings}
              className="flex items-center gap-2 h-12"
            >
              <Settings className="h-4 w-4" />
              Configuración
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}