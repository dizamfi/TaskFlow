'use client';

import { Card, CardContent, Badge } from "@/components/ui";
import { cn, formatDate } from "@/lib";
import { Task, TaskStatus } from "@/types";
import { CalendarIcon } from "lucide-react";
import { useMemo } from "react";


interface CalendarListViewProps {
  tasks: Task[];
  currentDate: Date;
  onTaskClick?: (task: Task) => void;
}

export function CalendarListView({ tasks, currentDate, onTaskClick }: CalendarListViewProps) {
  // Agrupar tareas por fecha
  const tasksByDate = useMemo(() => {
    const groups: Record<string, Task[]> = {};
    
    tasks.forEach(task => {
      if (!task.due_date) return;
      
      const dateKey = new Date(task.due_date).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(task);
    });
    
    // Ordenar por fecha
    const sortedDates = Object.keys(groups).sort((a, b) => 
      new Date(a).getTime() - new Date(b).getTime()
    );
    
    return sortedDates.map(dateKey => ({
      date: new Date(dateKey),
      tasks: groups[dateKey].sort((a, b) => 
        new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime()
      )
    }));
  }, [tasks]);

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED: return 'completed';
      case TaskStatus.IN_PROGRESS: return 'in-progress';
      case TaskStatus.PENDING: return 'pending';
      default: return 'pending';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'low';
    }
  };

  return (
    <div className="space-y-6">
      {tasksByDate.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay tareas programadas
            </h3>
            <p className="text-gray-600">
              Las tareas con fechas de vencimiento aparecerán aquí
            </p>
          </CardContent>
        </Card>
      ) : (
        tasksByDate.map(({ date, tasks: dateTasks }) => {
          const isToday = date.toDateString() === new Date().toDateString();
          const isOverdue = date < new Date() && !isToday;
          
          return (
            <Card key={date.toDateString()}>
              <CardContent className="p-0">
                <div className={cn(
                  "px-6 py-4 border-b bg-gray-50",
                  isToday && "bg-primary-50",
                  isOverdue && "bg-danger-50"
                )}>
                  <div className="flex items-center justify-between">
                    <h3 className={cn(
                      "text-lg font-semibold",
                      isToday && "text-primary-900",
                      isOverdue && "text-danger-900"
                    )}>
                      {formatDate(date)}
                      {isToday && (
                        <Badge variant="default" className="ml-2">Hoy</Badge>
                      )}
                      {isOverdue && (
                        <Badge variant="destructive" className="ml-2">Vencido</Badge>
                      )}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {dateTasks.length} tarea{dateTasks.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                
                <div className="divide-y">
                  {dateTasks.map(task => (
                    <div
                      key={task.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => onTaskClick?.(task)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={cn(
                            "font-medium text-gray-900 mb-1",
                            task.status === TaskStatus.COMPLETED && "line-through text-gray-500"
                          )}>
                            {task.title}
                          </h4>
                          
                          {task.description && (
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusColor(task.status)}>
                              {task.status === TaskStatus.PENDING && 'Pendiente'}
                              {task.status === TaskStatus.IN_PROGRESS && 'En Progreso'}
                              {task.status === TaskStatus.COMPLETED && 'Completada'}
                            </Badge>
                            
                            <Badge variant={getPriorityColor(task.priority)}>
                              {task.priority === 'high' && 'Alta'}
                              {task.priority === 'medium' && 'Media'}
                              {task.priority === 'low' && 'Baja'}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500 ml-4">
                          {new Date(task.due_date!).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}