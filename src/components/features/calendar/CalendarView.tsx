'use client';

import React, { useState, useMemo } from 'react';
import { Task, TaskStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Plus,
  Filter,
  Grid3x3,
  List
} from 'lucide-react';
import { cn, formatDate } from '@/lib/index';
import { CalendarListView } from './CalendarListView';

interface CalendarViewProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onDateClick?: (date: Date) => void;
  onCreateTask?: (date?: Date) => void;
  loading?: boolean;
}

type ViewMode = 'month' | 'week' | 'list';

export function CalendarView({ 
  tasks, 
  onTaskClick, 
  onDateClick, 
  onCreateTask,
  loading = false 
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [showCompleted, setShowCompleted] = useState(true);

  // Filtrar tareas según configuración
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (!showCompleted && task.status === TaskStatus.COMPLETED) {
        return false;
      }
      return task.due_date; // Solo mostrar tareas con fecha de vencimiento
    });
  }, [tasks, showCompleted]);

  // Obtener días del mes actual
  const getDaysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Obtener el primer día de la semana (domingo = 0)
    const startingDayOfWeek = firstDay.getDay();
    
    const days: (Date | null)[] = [];
    
    // Agregar días del mes anterior para completar la primera semana
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push(prevDate);
    }
    
    // Agregar días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    // Agregar días del siguiente mes para completar la última semana
    const totalCells = Math.ceil(days.length / 7) * 7;
    let nextMonthDay = 1;
    for (let i = days.length; i < totalCells; i++) {
      days.push(new Date(year, month + 1, nextMonthDay));
      nextMonthDay++;
    }
    
    return days;
  }, [currentDate]);

  // Obtener tareas para una fecha específica
  const getTasksForDate = (date: Date) => {
    return filteredTasks.filter(task => {
      if (!task.due_date) return false;
      const taskDate = new Date(task.due_date);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Navegación del calendario
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCurrentMonth = (date: Date) => {
    return (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(35)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header del Calendario */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
            >
              Hoy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Filtros */}
          <Button
            variant={showCompleted ? "default" : "outline"}
            size="sm"
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2"
          >
            <Filter className="h-3 w-3" />
            {showCompleted ? 'Todas' : 'Pendientes'}
          </Button>

          {/* Cambiar vista */}
          <div className="flex rounded-lg border">
            <Button
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('month')}
              className="rounded-r-none"
            >
              <Grid3x3 className="h-3 w-3" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-3 w-3" />
            </Button>
          </div>

          {/* Crear tarea */}
          <Button
            onClick={() => onCreateTask?.()}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Nueva Tarea
          </Button>
        </div>
      </div>

      {/* Vista del Calendario */}
      {viewMode === 'month' ? (
        <Card>
          <CardContent className="p-0">
            {/* Encabezados de días */}
            <div className="grid grid-cols-7 border-b">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-semibold text-gray-900 bg-gray-50"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Días del calendario */}
            <div className="grid grid-cols-7">
              {getDaysInMonth.map((date, index) => {
                if (!date) return null;
                
                const dayTasks = getTasksForDate(date);
                const isCurrentMonthDay = isCurrentMonth(date);
                const isTodayDay = isToday(date);
                
                return (
                  <div
                    key={index}
                    className={cn(
                      "min-h-[120px] p-2 border-r border-b cursor-pointer hover:bg-gray-50 transition-colors",
                      !isCurrentMonthDay && "bg-gray-50 text-gray-400",
                      isTodayDay && "bg-primary-50"
                    )}
                    onClick={() => onDateClick?.(date)}
                  >
                    <div className={cn(
                      "text-sm font-medium mb-1",
                      isTodayDay && "text-primary-600"
                    )}>
                      {date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {dayTasks.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onTaskClick?.(task);
                          }}
                          className={cn(
                            "text-xs p-1 rounded cursor-pointer hover:opacity-80 truncate",
                            task.status === TaskStatus.COMPLETED 
                              ? "bg-success-100 text-success-700"
                              : task.status === TaskStatus.IN_PROGRESS
                              ? "bg-primary-100 text-primary-700"
                              : "bg-gray-100 text-gray-700"
                          )}
                        >
                          {task.title}
                        </div>
                      ))}
                      
                      {dayTasks.length > 3 && (
                        <div className="text-xs text-gray-500 font-medium">
                          +{dayTasks.length - 3} más
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Vista de Lista */
        <CalendarListView 
          tasks={filteredTasks}
          currentDate={currentDate}
          onTaskClick={onTaskClick}
        />
      )}
    </div>
  );
}