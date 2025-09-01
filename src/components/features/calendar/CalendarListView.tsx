// 'use client';

// import { Card, CardContent, Badge } from "@/components/ui";
// import { cn, formatDate } from "@/lib";
// import { Task, TaskStatus } from "@/types";
// import { CalendarIcon } from "lucide-react";
// import { useMemo } from "react";


// interface CalendarListViewProps {
//   tasks: Task[];
//   currentDate: Date;
//   onTaskClick?: (task: Task) => void;
// }

// export function CalendarListView({ tasks, currentDate, onTaskClick }: CalendarListViewProps) {
//   // Agrupar tareas por fecha
//   const tasksByDate = useMemo(() => {
//     const groups: Record<string, Task[]> = {};
    
//     tasks.forEach(task => {
//       if (!task.due_date) return;
      
//       const dateKey = new Date(task.due_date).toDateString();
//       if (!groups[dateKey]) {
//         groups[dateKey] = [];
//       }
//       groups[dateKey].push(task);
//     });
    
//     // Ordenar por fecha
//     const sortedDates = Object.keys(groups).sort((a, b) => 
//       new Date(a).getTime() - new Date(b).getTime()
//     );
    
//     return sortedDates.map(dateKey => ({
//       date: new Date(dateKey),
//       tasks: groups[dateKey].sort((a, b) => 
//         new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime()
//       )
//     }));
//   }, [tasks]);

//   const getStatusColor = (status: TaskStatus) => {
//     switch (status) {
//       case TaskStatus.COMPLETED: return 'completed';
//       case TaskStatus.IN_PROGRESS: return 'in-progress';
//       case TaskStatus.PENDING: return 'pending';
//       default: return 'pending';
//     }
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'high': return 'high';
//       case 'medium': return 'medium';
//       case 'low': return 'low';
//       default: return 'low';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {tasksByDate.length === 0 ? (
//         <Card>
//           <CardContent className="text-center py-12">
//             <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">
//               No hay tareas programadas
//             </h3>
//             <p className="text-gray-600">
//               Las tareas con fechas de vencimiento aparecerán aquí
//             </p>
//           </CardContent>
//         </Card>
//       ) : (
//         tasksByDate.map(({ date, tasks: dateTasks }) => {
//           const isToday = date.toDateString() === new Date().toDateString();
//           const isOverdue = date < new Date() && !isToday;
          
//           return (
//             <Card key={date.toDateString()}>
//               <CardContent className="p-0">
//                 <div className={cn(
//                   "px-6 py-4 border-b bg-gray-50",
//                   isToday && "bg-primary-50",
//                   isOverdue && "bg-danger-50"
//                 )}>
//                   <div className="flex items-center justify-between">
//                     <h3 className={cn(
//                       "text-lg font-semibold",
//                       isToday && "text-primary-900",
//                       isOverdue && "text-danger-900"
//                     )}>
//                       {formatDate(date)}
//                       {isToday && (
//                         <Badge variant="default" className="ml-2">Hoy</Badge>
//                       )}
//                       {isOverdue && (
//                         <Badge variant="destructive" className="ml-2">Vencido</Badge>
//                       )}
//                     </h3>
//                     <span className="text-sm text-gray-600">
//                       {dateTasks.length} tarea{dateTasks.length !== 1 ? 's' : ''}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="divide-y">
//                   {dateTasks.map(task => (
//                     <div
//                       key={task.id}
//                       className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
//                       onClick={() => onTaskClick?.(task)}
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <h4 className={cn(
//                             "font-medium text-gray-900 mb-1",
//                             task.status === TaskStatus.COMPLETED && "line-through text-gray-500"
//                           )}>
//                             {task.title}
//                           </h4>
                          
//                           {task.description && (
//                             <p className="text-sm text-gray-600 mb-2 line-clamp-2">
//                               {task.description}
//                             </p>
//                           )}
                          
//                           <div className="flex items-center gap-2">
//                             <Badge variant={getStatusColor(task.status)}>
//                               {task.status === TaskStatus.PENDING && 'Pendiente'}
//                               {task.status === TaskStatus.IN_PROGRESS && 'En Progreso'}
//                               {task.status === TaskStatus.COMPLETED && 'Completada'}
//                             </Badge>
                            
//                             <Badge variant={getPriorityColor(task.priority)}>
//                               {task.priority === 'high' && 'Alta'}
//                               {task.priority === 'medium' && 'Media'}
//                               {task.priority === 'low' && 'Baja'}
//                             </Badge>
//                           </div>
//                         </div>
                        
//                         <div className="text-sm text-gray-500 ml-4">
//                           {new Date(task.due_date!).toLocaleTimeString('es-ES', {
//                             hour: '2-digit',
//                             minute: '2-digit'
//                           })}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })
//       )}
//     </div>
//   );
// }


'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/index';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { 
  CalendarIcon, 
  Clock,
  AlertTriangle,
  CheckCircle2,
  Circle,
  PlayCircle,
  Flag,
  Calendar,
  Sparkles,
  Target,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface CalendarListViewProps {
  tasks: Task[];
  currentDate: Date;
  onTaskClick?: (task: Task) => void;
  loading?: boolean;
}

export function CalendarListView({ tasks, onTaskClick, loading = false }: CalendarListViewProps) {
  // Loading state elegante
  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Skeleton Header con estadísticas */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 via-white to-purple-50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-shimmer"></div>
                </div>
              </div>
              
              {/* Stats skeletons */}
              <div className="hidden sm:flex items-center gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="text-center space-y-1">
                    <div className="w-6 h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer mx-auto"></div>
                    <div className="w-12 h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Skeleton Cards de días */}
        {[...Array(3)].map((_, index) => (
          <Card 
            key={index}
            className="border-0 shadow-lg"
            style={{ 
              animationDelay: `${index * 200}ms`,
              animation: 'slideInLeft 0.6s ease-out forwards'
            }}
          >
            {/* Skeleton Header del día */}
            <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-blue-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-shimmer"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer"></div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="w-4 h-3 bg-gray-200 rounded animate-shimmer"></div>
                      </div>
                    ))}
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </CardHeader>

            {/* Skeleton Tareas del día */}
            <CardContent className="pt-2 pb-6">
              <div className="space-y-3">
                {[...Array(Math.floor(Math.random() * 3) + 1)].map((_, taskIndex) => (
                  <div
                    key={taskIndex}
                    className="p-4 rounded-xl border border-gray-200 bg-white"
                    style={{ 
                      animationDelay: `${(index * 200) + (taskIndex * 100)}ms`,
                      animation: 'fadeInUp 0.5s ease-out forwards'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Skeleton checkbox */}
                      <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse mt-1 flex-shrink-0"></div>

                      {/* Skeleton contenido */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" 
                                 style={{ width: `${60 + Math.random() * 30}%` }}></div>
                            <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" 
                                 style={{ width: `${40 + Math.random() * 40}%` }}></div>
                            
                            {/* Skeleton metadatos */}
                            <div className="flex items-center gap-3 pt-1">
                              <div className="h-3 bg-gray-200 rounded w-12 animate-shimmer"></div>
                              <div className="h-3 bg-gray-200 rounded w-16 animate-shimmer"></div>
                            </div>
                          </div>

                          {/* Skeleton badges */}
                          <div className="flex flex-col gap-2 items-end flex-shrink-0">
                            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-20 animate-shimmer"></div>
                            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-16 animate-shimmer"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Indicador de carga elegante */}
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100">
            <div className="relative">
              <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <span className="text-sm font-medium text-gray-600">Organizando tareas...</span>
          </div>
        </div>
      </div>
    );
  }
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
      tasks: groups[dateKey].sort((a, b) => {
        // Ordenar por prioridad primero, luego por hora
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 1;
        const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 1;
        
        if (aPriority !== bPriority) {
          return bPriority - aPriority;
        }
        
        return new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime();
      })
    }));
  }, [tasks]);

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case TaskStatus.IN_PROGRESS:
        return <PlayCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED: 
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case TaskStatus.IN_PROGRESS: 
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case TaskStatus.PENDING: 
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default: 
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return 'bg-red-50 text-red-700 border-red-200';
      case TaskPriority.MEDIUM:
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case TaskPriority.LOW:
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return <AlertTriangle className="h-3 w-3 text-red-500" />;
      case TaskPriority.MEDIUM:
        return <Flag className="h-3 w-3 text-amber-500" />;
      case TaskPriority.LOW:
        return <Target className="h-3 w-3 text-blue-500" />;
      default:
        return <Flag className="h-3 w-3 text-gray-400" />;
    }
  };

  const formatDateHeader = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return { label: 'Hoy', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (isTomorrow) return { label: 'Mañana', color: 'text-emerald-600', bgColor: 'bg-emerald-100' };
    if (isYesterday) return { label: 'Ayer', color: 'text-amber-600', bgColor: 'bg-amber-100' };

    const isThisYear = date.getFullYear() === today.getFullYear();
    const dateStr = date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: isThisYear ? undefined : 'numeric'
    });

    return { 
      label: dateStr.charAt(0).toUpperCase() + dateStr.slice(1), 
      color: 'text-gray-700', 
      bgColor: 'bg-gray-100' 
    };
  };

  const isOverdue = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getTaskStats = (tasks: Task[]) => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === TaskStatus.COMPLETED).length;
    const inProgress = tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length;
    const pending = tasks.filter(t => t.status === TaskStatus.PENDING).length;
    const highPriority = tasks.filter(t => t.priority === TaskPriority.HIGH).length;
    
    return { total, completed, inProgress, pending, highPriority };
  };

  if (tasksByDate.length === 0) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="py-16">
          <div className="text-center space-y-4">
            {/* Icono decorativo */}
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-xl opacity-60"></div>
              <div className="relative bg-white rounded-full p-6 shadow-lg border border-gray-100">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                No hay tareas programadas
              </h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Organiza tu tiempo programando tareas con fechas de vencimiento específicas
              </p>
            </div>

            {/* Sugerencias */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-blue-700 font-medium mb-3">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">Comienza organizándote</span>
              </div>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Crea tareas con fechas límite</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Establece prioridades claras</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Visualiza tu progreso diario</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con estadísticas generales */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 via-white to-purple-50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-gray-900">Vista de Lista</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {tasksByDate.length} días con tareas programadas
                </p>
              </div>
            </div>
            
            {/* Stats rápidos */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {tasks.filter(t => t.status === TaskStatus.COMPLETED).length}
                </div>
                <div className="text-xs text-gray-600">Completadas</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-amber-600">
                  {tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length}
                </div>
                <div className="text-xs text-gray-600">En Progreso</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-600">
                  {tasks.filter(t => t.status === TaskStatus.PENDING).length}
                </div>
                <div className="text-xs text-gray-600">Pendientes</div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Lista de días con tareas */}
      {tasksByDate.map(({ date, tasks: dayTasks }, index) => {
        const dateInfo = formatDateHeader(date);
        const stats = getTaskStats(dayTasks);
        const isOverdueDate = isOverdue(date);
        
        return (
          <Card 
            key={date.toDateString()} 
            className={cn(
              "border-0 shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden",
              isOverdueDate && "ring-2 ring-red-200 bg-red-50/30"
            )}
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: 'slideInLeft 0.5s ease-out forwards'
            }}
          >
            {/* Header del día */}
            <CardHeader className={cn(
              "pb-4",
              isOverdueDate 
                ? "bg-gradient-to-r from-red-50 to-red-100/50" 
                : "bg-gradient-to-r from-gray-50 to-blue-50/50"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-xl shadow-md",
                    isOverdueDate 
                      ? "bg-gradient-to-br from-red-500 to-red-600" 
                      : "bg-gradient-to-br from-blue-500 to-purple-600"
                  )}>
                    <CalendarIcon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={cn(
                        "text-xl font-bold",
                        isOverdueDate ? "text-red-700" : "text-gray-900"
                      )}>
                        {dateInfo.label}
                      </h3>
                      {isOverdueDate && (
                        <Badge className="bg-red-100 text-red-700 border-red-200">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Vencido
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {date.toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                      })}
                    </p>
                  </div>
                </div>

                {/* Estadísticas del día */}
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span className="text-gray-600">{stats.completed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-600">{stats.inProgress}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-600">{stats.pending}</span>
                    </div>
                  </div>

                  {/* Indicador de progreso circular */}
                  <div className="relative w-12 h-12">
                    <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
                    <div 
                      className={cn(
                        "absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent transition-all duration-500",
                        stats.completed > 0 && "border-emerald-400"
                      )}
                      style={{
                        clipPath: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent ${(stats.completed / stats.total) * 360}deg, transparent ${(stats.completed / stats.total) * 360}deg)`
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-700">
                        {Math.round((stats.completed / stats.total) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Lista de tareas del día */}
            <CardContent className="pt-2 pb-6">
              <div className="space-y-3">
                {dayTasks.map((task, taskIndex) => {
                  const taskIsOverdue = isOverdueDate && task.status !== TaskStatus.COMPLETED;
                  
                  return (
                    <div
                      key={task.id}
                      onClick={() => onTaskClick?.(task)}
                      className={cn(
                        "group p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-[1.02]",
                        taskIsOverdue 
                          ? "bg-red-50 border-red-200 hover:bg-red-100" 
                          : "bg-white border-gray-200 hover:bg-gray-50",
                        task.status === TaskStatus.COMPLETED && "opacity-75"
                      )}
                      style={{ 
                        animationDelay: `${taskIndex * 50}ms`,
                        animation: 'fadeInUp 0.4s ease-out forwards'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icono de estado */}
                        <div className="flex-shrink-0 mt-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-6 w-6 hover:bg-transparent hover:scale-110 transition-all duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Aquí podrías agregar lógica para cambiar estado
                            }}
                          >
                            {getStatusIcon(task.status)}
                          </Button>
                        </div>

                        {/* Contenido de la tarea */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className={cn(
                                "font-semibold text-base mb-1 transition-colors duration-200",
                                task.status === TaskStatus.COMPLETED 
                                  ? "line-through text-gray-500" 
                                  : taskIsOverdue 
                                  ? "text-red-900"
                                  : "text-gray-900 group-hover:text-blue-700"
                              )}>
                                {task.title}
                              </h4>
                              
                              {task.description && (
                                <p className={cn(
                                  "text-sm mb-3 leading-relaxed",
                                  task.status === TaskStatus.COMPLETED 
                                    ? "text-gray-400" 
                                    : "text-gray-600"
                                )}>
                                  {task.description}
                                </p>
                              )}

                              {/* Metadatos */}
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>
                                    {new Date(task.due_date!).toLocaleTimeString('es-ES', { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </span>
                                </div>
                                
                                {task.created_at && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>
                                      Creada {new Date(task.created_at).toLocaleDateString('es-ES')}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Badges de estado y prioridad */}
                            <div className="flex flex-col gap-2 items-end flex-shrink-0">
                              <div className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border",
                                getStatusColor(task.status)
                              )}>
                                {task.status === TaskStatus.PENDING && '⏳ Pendiente'}
                                {task.status === TaskStatus.IN_PROGRESS && '🔄 En Progreso'}
                                {task.status === TaskStatus.COMPLETED && '✅ Completada'}
                              </div>
                              
                              <div className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border",
                                getPriorityColor(task.priority)
                              )}>
                                {getPriorityIcon(task.priority)}
                                {task.priority === TaskPriority.HIGH && 'Alta'}
                                {task.priority === TaskPriority.MEDIUM && 'Media'}
                                {task.priority === TaskPriority.LOW && 'Baja'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Barra de progreso para tareas en progreso */}
                      {task.status === TaskStatus.IN_PROGRESS && (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-3 w-3 text-blue-500" />
                            <span className="text-xs text-gray-600 font-medium">En progreso</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full animate-pulse" 
                                 style={{ width: '65%' }}>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}