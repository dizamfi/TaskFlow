// 'use client';

// import React, { useState, useMemo } from 'react';
// import { Task, TaskStatus } from '@/types';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent } from '@/components/ui/card';
// import { 
//   ChevronLeft, 
//   ChevronRight, 
//   Calendar as CalendarIcon,
//   Plus,
//   Filter,
//   Grid3x3,
//   List
// } from 'lucide-react';
// import { cn, formatDate } from '@/lib/index';
// import { CalendarListView } from './CalendarListView';

// interface CalendarViewProps {
//   tasks: Task[];
//   onTaskClick?: (task: Task) => void;
//   onDateClick?: (date: Date) => void;
//   onCreateTask?: (date?: Date) => void;
//   loading?: boolean;
// }

// type ViewMode = 'month' | 'week' | 'list';

// export function CalendarView({ 
//   tasks, 
//   onTaskClick, 
//   onDateClick, 
//   onCreateTask,
//   loading = false 
// }: CalendarViewProps) {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [viewMode, setViewMode] = useState<ViewMode>('month');
//   const [showCompleted, setShowCompleted] = useState(true);

//   // Filtrar tareas según configuración
//   const filteredTasks = useMemo(() => {
//     return tasks.filter(task => {
//       if (!showCompleted && task.status === TaskStatus.COMPLETED) {
//         return false;
//       }
//       return task.due_date; // Solo mostrar tareas con fecha de vencimiento
//     });
//   }, [tasks, showCompleted]);

//   // Obtener días del mes actual
//   const getDaysInMonth = useMemo(() => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
    
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
    
//     // Obtener el primer día de la semana (domingo = 0)
//     const startingDayOfWeek = firstDay.getDay();
    
//     const days: (Date | null)[] = [];
    
//     // Agregar días del mes anterior para completar la primera semana
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
//       days.push(prevDate);
//     }
    
//     // Agregar días del mes actual
//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push(new Date(year, month, day));
//     }
    
//     // Agregar días del siguiente mes para completar la última semana
//     const totalCells = Math.ceil(days.length / 7) * 7;
//     let nextMonthDay = 1;
//     for (let i = days.length; i < totalCells; i++) {
//       days.push(new Date(year, month + 1, nextMonthDay));
//       nextMonthDay++;
//     }
    
//     return days;
//   }, [currentDate]);

//   // Obtener tareas para una fecha específica
//   const getTasksForDate = (date: Date) => {
//     return filteredTasks.filter(task => {
//       if (!task.due_date) return false;
//       const taskDate = new Date(task.due_date);
//       return (
//         taskDate.getDate() === date.getDate() &&
//         taskDate.getMonth() === date.getMonth() &&
//         taskDate.getFullYear() === date.getFullYear()
//       );
//     });
//   };

//   // Navegación del calendario
//   const goToPreviousMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };

//   const goToNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };

//   const goToToday = () => {
//     setCurrentDate(new Date());
//   };

//   const monthNames = [
//     'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
//     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
//   ];

//   const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

//   const isToday = (date: Date) => {
//     const today = new Date();
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   const isCurrentMonth = (date: Date) => {
//     return (
//       date.getMonth() === currentDate.getMonth() &&
//       date.getFullYear() === currentDate.getFullYear()
//     );
//   };

//   if (loading) {
//     return (
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
//           <div className="flex gap-2">
//             <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
//             <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
//           </div>
//         </div>
//         <div className="grid grid-cols-7 gap-2">
//           {[...Array(35)].map((_, i) => (
//             <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header del Calendario */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div className="flex items-center gap-4">
//           <h2 className="text-2xl font-bold text-gray-900">
//             {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//           </h2>
          
//           <div className="flex items-center gap-1">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={goToPreviousMonth}
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={goToToday}
//             >
//               Hoy
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={goToNextMonth}
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           {/* Filtros */}
//           <Button
//             variant={showCompleted ? "default" : "outline"}
//             size="sm"
//             onClick={() => setShowCompleted(!showCompleted)}
//             className="flex items-center gap-2"
//           >
//             <Filter className="h-3 w-3" />
//             {showCompleted ? 'Todas' : 'Pendientes'}
//           </Button>

//           {/* Cambiar vista */}
//           <div className="flex rounded-lg border">
//             <Button
//               variant={viewMode === 'month' ? 'default' : 'ghost'}
//               size="sm"
//               onClick={() => setViewMode('month')}
//               className="rounded-r-none"
//             >
//               <Grid3x3 className="h-3 w-3" />
//             </Button>
//             <Button
//               variant={viewMode === 'list' ? 'default' : 'ghost'}
//               size="sm"
//               onClick={() => setViewMode('list')}
//               className="rounded-l-none"
//             >
//               <List className="h-3 w-3" />
//             </Button>
//           </div>

//           {/* Crear tarea */}
//           <Button
//             onClick={() => onCreateTask?.()}
//             className="flex items-center gap-2"
//           >
//             <Plus className="h-4 w-4" />
//             Nueva Tarea
//           </Button>
//         </div>
//       </div>

//       {/* Vista del Calendario */}
//       {viewMode === 'month' ? (
//         <Card>
//           <CardContent className="p-0">
//             {/* Encabezados de días */}
//             <div className="grid grid-cols-7 border-b">
//               {dayNames.map((day) => (
//                 <div
//                   key={day}
//                   className="p-3 text-center text-sm font-semibold text-gray-900 bg-gray-50"
//                 >
//                   {day}
//                 </div>
//               ))}
//             </div>

//             {/* Días del calendario */}
//             <div className="grid grid-cols-7">
//               {getDaysInMonth.map((date, index) => {
//                 if (!date) return null;
                
//                 const dayTasks = getTasksForDate(date);
//                 const isCurrentMonthDay = isCurrentMonth(date);
//                 const isTodayDay = isToday(date);
                
//                 return (
//                   <div
//                     key={index}
//                     className={cn(
//                       "min-h-[120px] p-2 border-r border-b cursor-pointer hover:bg-gray-50 transition-colors",
//                       !isCurrentMonthDay && "bg-gray-50 text-gray-400",
//                       isTodayDay && "bg-primary-50"
//                     )}
//                     onClick={() => onDateClick?.(date)}
//                   >
//                     <div className={cn(
//                       "text-sm font-medium mb-1",
//                       isTodayDay && "text-primary-600"
//                     )}>
//                       {date.getDate()}
//                     </div>
                    
//                     <div className="space-y-1">
//                       {dayTasks.slice(0, 3).map((task) => (
//                         <div
//                           key={task.id}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             onTaskClick?.(task);
//                           }}
//                           className={cn(
//                             "text-xs p-1 rounded cursor-pointer hover:opacity-80 truncate",
//                             task.status === TaskStatus.COMPLETED 
//                               ? "bg-success-100 text-success-700"
//                               : task.status === TaskStatus.IN_PROGRESS
//                               ? "bg-primary-100 text-primary-700"
//                               : "bg-gray-100 text-gray-700"
//                           )}
//                         >
//                           {task.title}
//                         </div>
//                       ))}
                      
//                       {dayTasks.length > 3 && (
//                         <div className="text-xs text-gray-500 font-medium">
//                           +{dayTasks.length - 3} más
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         /* Vista de Lista */
//         <CalendarListView 
//           tasks={filteredTasks}
//           currentDate={currentDate}
//           onTaskClick={onTaskClick}
//         />
//       )}
//     </div>
//   );
// }




// 'use client';

// import React, { useState, useMemo } from 'react';
// import { Task, TaskStatus } from '@/types';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent } from '@/components/ui/card';
// import { 
//   ChevronLeft, 
//   ChevronRight, 
//   Calendar as CalendarIcon,
//   Plus,
//   Filter,
//   Grid3x3,
//   List,
//   Eye,
//   EyeOff,
//   Clock,
//   Sparkles,
//   Moon,
//   Sun
// } from 'lucide-react';
// import { cn, formatDate } from '@/lib/index';
// import { CalendarListView } from './CalendarListView';

// interface CalendarViewProps {
//   tasks: Task[];
//   onTaskClick?: (task: Task) => void;
//   onDateClick?: (date: Date) => void;
//   onCreateTask?: (date?: Date) => void;
//   loading?: boolean;
// }

// type ViewMode = 'month' | 'week' | 'list';

// export function CalendarView({ 
//   tasks, 
//   onTaskClick, 
//   onDateClick, 
//   onCreateTask,
//   loading = false 
// }: CalendarViewProps) {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [viewMode, setViewMode] = useState<ViewMode>('month');
//   const [showCompleted, setShowCompleted] = useState(true);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   // Filtrar tareas según configuración
//   const filteredTasks = useMemo(() => {
//     return tasks.filter(task => {
//       if (!showCompleted && task.status === TaskStatus.COMPLETED) {
//         return false;
//       }
//       return task.due_date; // Solo mostrar tareas con fecha de vencimiento
//     });
//   }, [tasks, showCompleted]);

//   // Obtener días del mes actual
//   const getDaysInMonth = useMemo(() => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
    
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
    
//     // Obtener el primer día de la semana (domingo = 0)
//     const startingDayOfWeek = firstDay.getDay();
    
//     const days: (Date | null)[] = [];
    
//     // Agregar días del mes anterior para completar la primera semana
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
//       days.push(prevDate);
//     }
    
//     // Agregar días del mes actual
//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push(new Date(year, month, day));
//     }
    
//     // Agregar días del siguiente mes para completar la última semana
//     const totalCells = Math.ceil(days.length / 7) * 7;
//     let nextMonthDay = 1;
//     for (let i = days.length; i < totalCells; i++) {
//       days.push(new Date(year, month + 1, nextMonthDay));
//       nextMonthDay++;
//     }
    
//     return days;
//   }, [currentDate]);

//   // Obtener tareas para una fecha específica
//   const getTasksForDate = (date: Date) => {
//     return filteredTasks.filter(task => {
//       if (!task.due_date) return false;
//       const taskDate = new Date(task.due_date);
//       return (
//         taskDate.getDate() === date.getDate() &&
//         taskDate.getMonth() === date.getMonth() &&
//         taskDate.getFullYear() === date.getFullYear()
//       );
//     });
//   };

//   // Navegación del calendario
//   const goToPreviousMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };

//   const goToNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };

//   const goToToday = () => {
//     setCurrentDate(new Date());
//   };

//   const monthNames = [
//     'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
//     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
//   ];

//   const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

//   const isToday = (date: Date) => {
//     const today = new Date();
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   const isCurrentMonth = (date: Date) => {
//     return (
//       date.getMonth() === currentDate.getMonth() &&
//       date.getFullYear() === currentDate.getFullYear()
//     );
//   };

//   const isWeekend = (date: Date) => {
//     const day = date.getDay();
//     return day === 0 || day === 6; // Domingo o Sábado
//   };

//   const handleDateClick = (date: Date) => {
//     setSelectedDate(date);
//     onDateClick?.(date);
//   };

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         {/* Skeleton Header */}
//         <div className="flex justify-between items-center">
//           <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 animate-pulse"></div>
//           <div className="flex gap-3">
//             <div className="h-9 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
//             <div className="h-9 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
//           </div>
//         </div>
        
//         {/* Skeleton Calendar */}
//         <Card className="overflow-hidden">
//           <CardContent className="p-0">
//             <div className="grid grid-cols-7 border-b">
//               {dayNames.map((day, i) => (
//                 <div key={i} className="h-12 bg-gray-100 animate-pulse border-r"></div>
//               ))}
//             </div>
//             <div className="grid grid-cols-7">
//               {[...Array(35)].map((_, i) => (
//                 <div key={i} className="h-32 bg-gray-50 border-r border-b animate-pulse flex flex-col p-2">
//                   <div className="h-4 bg-gray-200 rounded w-6 mb-2"></div>
//                   <div className="space-y-1">
//                     <div className="h-3 bg-gray-200 rounded w-full"></div>
//                     <div className="h-3 bg-gray-200 rounded w-3/4"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header del Calendario Mejorado */}
//       <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl border border-blue-100 p-6">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//           {/* Título y Navegación */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
//                 <CalendarIcon className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//                   {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//                 </h2>
//                 <p className="text-sm text-gray-600 mt-1">
//                   {filteredTasks.length} tareas programadas este mes
//                 </p>
//               </div>
//             </div>
            
//             {/* Controles de Navegación */}
//             <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={goToPreviousMonth}
//                 className="hover:bg-blue-50 hover:text-blue-600 h-9 w-9 p-0"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={goToToday}
//                 className="hover:bg-blue-50 hover:text-blue-600 px-4 h-9"
//               >
//                 <Clock className="h-4 w-4 mr-2" />
//                 Hoy
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={goToNextMonth}
//                 className="hover:bg-blue-50 hover:text-blue-600 h-9 w-9 p-0"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           {/* Controles y Filtros */}
//           <div className="flex flex-wrap items-center gap-3">
//             {/* Toggle de Tareas Completadas */}
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setShowCompleted(!showCompleted)}
//               className={`h-9 px-4 border transition-all duration-200 ${
//                 showCompleted 
//                   ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
//                   : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
//               }`}
//             >
//               {showCompleted ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
//               {showCompleted ? 'Todas' : 'Pendientes'}
//             </Button>

//             {/* Selector de Vista */}
//             <div className="flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
//               <Button
//                 variant={viewMode === 'month' ? 'default' : 'ghost'}
//                 size="sm"
//                 onClick={() => setViewMode('month')}
//                 className={`h-8 px-3 rounded-lg transition-all duration-200 ${
//                   viewMode === 'month' 
//                     ? 'bg-blue-500 text-white shadow-sm' 
//                     : 'hover:bg-blue-50 hover:text-blue-600'
//                 }`}
//               >
//                 <Grid3x3 className="h-4 w-4 mr-2" />
//                 Mes
//               </Button>
//               <Button
//                 variant={viewMode === 'list' ? 'default' : 'ghost'}
//                 size="sm"
//                 onClick={() => setViewMode('list')}
//                 className={`h-8 px-3 rounded-lg transition-all duration-200 ${
//                   viewMode === 'list' 
//                     ? 'bg-blue-500 text-white shadow-sm' 
//                     : 'hover:bg-blue-50 hover:text-blue-600'
//                 }`}
//               >
//                 <List className="h-4 w-4 mr-2" />
//                 Lista
//               </Button>
//             </div>

//             {/* Botón Crear Tarea */}
//             <Button
//               onClick={() => onCreateTask?.()}
//               className="h-9 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Nueva Tarea
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Vista del Calendario */}
//       {viewMode === 'month' ? (
//         <Card className="overflow-hidden border-0 shadow-xl bg-white">
//           <CardContent className="p-0">
//             {/* Encabezados de días mejorados */}
//             <div className="grid grid-cols-7 border-b border-gray-200">
//               {dayNames.map((day, index) => (
//                 <div
//                   key={day}
//                   className={`p-4 text-center text-sm font-semibold border-r border-gray-100 last:border-r-0 ${
//                     index === 0 || index === 6 
//                       ? 'bg-gradient-to-br from-blue-50 to-purple-50 text-purple-700' 
//                       : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-700'
//                   }`}
//                 >
//                   <div className="flex items-center justify-center gap-1">
//                     {index === 0 || index === 6 ? (
//                       <Moon className="h-3 w-3" />
//                     ) : (
//                       <Sun className="h-3 w-3" />
//                     )}
//                     {day}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Días del calendario mejorados */}
//             <div className="grid grid-cols-7">
//               {getDaysInMonth.map((date, index) => {
//                 if (!date) return null;
                
//                 const dayTasks = getTasksForDate(date);
//                 const isCurrentMonthDay = isCurrentMonth(date);
//                 const isTodayDay = isToday(date);
//                 const isWeekendDay = isWeekend(date);
//                 const isSelected = selectedDate && 
//                   selectedDate.getDate() === date.getDate() &&
//                   selectedDate.getMonth() === date.getMonth() &&
//                   selectedDate.getFullYear() === date.getFullYear();
                
//                 return (
//                   <div
//                     key={index}
//                     className={cn(
//                       "min-h-[140px] p-3 border-r border-b border-gray-100 cursor-pointer transition-all duration-200 group relative overflow-hidden",
//                       !isCurrentMonthDay && "bg-gray-50 text-gray-400",
//                       isTodayDay && "bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 ring-2 ring-blue-400 ring-inset",
//                       isWeekendDay && isCurrentMonthDay && "bg-gradient-to-br from-purple-50 to-blue-50",
//                       isSelected && "bg-gradient-to-br from-purple-100 to-blue-100 ring-2 ring-purple-400 ring-inset",
//                       "hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:shadow-lg hover:z-10 hover:scale-105 last:border-r-0"
//                     )}
//                     onClick={() => handleDateClick(date)}
//                   >
//                     {/* Número del día con mejor diseño */}
//                     <div className={cn(
//                       "text-sm font-semibold mb-2 flex items-center justify-between",
//                       isTodayDay && "text-blue-700",
//                       !isCurrentMonthDay && "text-gray-400"
//                     )}>
//                       <span className={cn(
//                         "flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200",
//                         isTodayDay && "bg-white shadow-md ring-2 ring-blue-400"
//                       )}>
//                         {date.getDate()}
//                       </span>
                      
//                       {/* Indicador de cantidad de tareas */}
//                       {dayTasks.length > 0 && (
//                         <div className={cn(
//                           "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
//                           dayTasks.length <= 2 ? "bg-blue-100 text-blue-700" :
//                           dayTasks.length <= 4 ? "bg-amber-100 text-amber-700" :
//                           "bg-red-100 text-red-700"
//                         )}>
//                           {dayTasks.length}
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Lista de tareas mejorada */}
//                     <div className="space-y-1.5">
//                       {dayTasks.slice(0, 3).map((task, taskIndex) => (
//                         <div
//                           key={task.id}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             onTaskClick?.(task);
//                           }}
//                           className={cn(
//                             "text-xs px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md font-medium border",
//                             task.status === TaskStatus.COMPLETED 
//                               ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
//                               : task.status === TaskStatus.IN_PROGRESS
//                               ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
//                               : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
//                           )}
//                           style={{ 
//                             animationDelay: `${taskIndex * 100}ms`,
//                             animation: 'fadeInUp 0.3s ease-out forwards'
//                           }}
//                         >
//                           <div className="flex items-center gap-1">
//                             <div className={cn(
//                               "w-1.5 h-1.5 rounded-full flex-shrink-0",
//                               task.status === TaskStatus.COMPLETED ? "bg-emerald-400" :
//                               task.status === TaskStatus.IN_PROGRESS ? "bg-blue-400" :
//                               "bg-gray-400"
//                             )} />
//                             <span className="truncate">{task.title}</span>
//                           </div>
//                         </div>
//                       ))}
                      
//                       {/* Indicador de más tareas */}
//                       {dayTasks.length > 3 && (
//                         <div className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded-lg flex items-center gap-1">
//                           <Sparkles className="h-3 w-3" />
//                           +{dayTasks.length - 3} más
//                         </div>
//                       )}
//                     </div>

//                     {/* Efecto hover decorativo */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
//                   </div>
//                 );
//               })}
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         /* Vista de Lista */
//         <CalendarListView 
//           tasks={filteredTasks}
//           currentDate={currentDate}
//           onTaskClick={onTaskClick}
//         />
//       )}
//     </div>
//   );
// }



'use client';

import React, { useState, useMemo } from 'react';
import { Task, TaskStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Plus,
  Grid3x3,
  List,
  Eye,
  EyeOff,
  Clock,
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';
import { cn} from '@/lib/index';
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Domingo o Sábado
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateClick?.(date);
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        {/* Skeleton Header Premium */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl border border-blue-100 p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Skeleton Título y Navegación */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                {/* Skeleton Icono */}
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
                <div className="space-y-2">
                  {/* Skeleton Título */}
                  <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-48 animate-shimmer"></div>
                  {/* Skeleton Subtítulo */}
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-32 animate-shimmer"></div>
                </div>
              </div>
              
              {/* Skeleton Controles de Navegación */}
              <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                <div className="h-9 w-9 bg-gray-100 rounded animate-pulse"></div>
                <div className="h-9 w-16 bg-gray-100 rounded animate-pulse mx-1"></div>
                <div className="h-9 w-9 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Skeleton Controles y Filtros */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="h-9 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-shimmer"></div>
              <div className="flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
                <div className="h-8 w-12 bg-gray-100 rounded-lg animate-pulse mx-1"></div>
                <div className="h-8 w-12 bg-gray-100 rounded-lg animate-pulse"></div>
              </div>
              <div className="h-9 w-32 bg-gradient-to-r from-blue-200 via-blue-100 to-purple-200 rounded-xl animate-shimmer"></div>
            </div>
          </div>
        </div>
        
        {/* Skeleton Calendar Premium */}
        <Card className="overflow-hidden border-0 shadow-xl bg-white">
          <CardContent className="p-0">
            {/* Skeleton Headers de días */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {dayNames.map((day, i) => (
                <div key={i} className="p-4 border-r border-gray-100 last:border-r-0">
                  <div className={`h-6 rounded animate-pulse ${
                    i === 0 || i === 6 
                      ? 'bg-gradient-to-r from-purple-200 to-blue-200' 
                      : 'bg-gradient-to-r from-gray-200 to-blue-200'
                  }`}></div>
                </div>
              ))}
            </div>
            
            {/* Skeleton Días del calendario */}
            <div className="grid grid-cols-7">
              {[...Array(35)].map((_, i) => (
                <div 
                  key={i} 
                  className="min-h-[140px] p-3 border-r border-b border-gray-100 last:border-r-0"
                  style={{ 
                    animationDelay: `${i * 20}ms`,
                    animation: 'fadeIn 0.8s ease-out forwards'
                  }}
                >
                  <div className="space-y-3">
                    {/* Skeleton número del día */}
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer"></div>
                      {Math.random() > 0.6 && (
                        <div className="w-5 h-5 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full animate-shimmer"></div>
                      )}
                    </div>
                    
                    {/* Skeleton tareas */}
                    <div className="space-y-1.5">
                      {Array.from({ length: Math.floor(Math.random() * 4) }).map((_, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="h-7 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-lg animate-shimmer"
                          style={{ 
                            animationDelay: `${(i * 20) + (taskIndex * 100)}ms`,
                            width: `${70 + Math.random() * 30}%`
                          }}
                        ></div>
                      ))}
                      
                      {/* Ocasional "más tareas" skeleton */}
                      {Math.random() > 0.8 && (
                        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-shimmer w-16"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Indicador de carga elegante */}
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100">
            <div className="relative">
              <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <span className="text-sm font-medium text-gray-600">Cargando calendario...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header del Calendario Mejorado */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl border border-blue-100 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Título y Navegación */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredTasks.length} tareas programadas este mes
                </p>
              </div>
            </div>
            
            {/* Controles de Navegación */}
            <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousMonth}
                className="hover:bg-blue-50 hover:text-blue-600 h-9 w-9 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={goToToday}
                className="hover:bg-blue-50 hover:text-blue-600 px-4 h-9"
              >
                <Clock className="h-4 w-4 mr-2" />
                Hoy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNextMonth}
                className="hover:bg-blue-50 hover:text-blue-600 h-9 w-9 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Controles y Filtros */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle de Tareas Completadas */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCompleted(!showCompleted)}
              className={`h-9 px-4 border transition-all duration-200 ${
                showCompleted 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {showCompleted ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              {showCompleted ? 'Todas' : 'Pendientes'}
            </Button>

            {/* Selector de Vista */}
            <div className="flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
              <Button
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('month')}
                className={`h-8 px-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'month' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Grid3x3 className="h-4 w-4 mr-2" />
                Mes
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={`h-8 px-3 rounded-lg transition-all duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white shadow-sm' 
                    : 'hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <List className="h-4 w-4 mr-2" />
                Lista
              </Button>
            </div>

            {/* Botón Crear Tarea */}
            <Button
              onClick={() => onCreateTask?.()}
              className="h-9 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Tarea
            </Button>
          </div>
        </div>
      </div>

      {/* Vista del Calendario */}
      {viewMode === 'month' ? (
        <Card className="overflow-hidden border-0 shadow-xl bg-white">
          <CardContent className="p-0">
            {/* Encabezados de días mejorados */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {dayNames.map((day, index) => (
                <div
                  key={day}
                  className={`p-4 text-center text-sm font-semibold border-r border-gray-100 last:border-r-0 ${
                    index === 0 || index === 6 
                      ? 'bg-gradient-to-br from-blue-50 to-purple-50 text-purple-700' 
                      : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {index === 0 || index === 6 ? (
                      <Moon className="h-3 w-3" />
                    ) : (
                      <Sun className="h-3 w-3" />
                    )}
                    {day}
                  </div>
                </div>
              ))}
            </div>

            {/* Días del calendario mejorados */}
            <div className="grid grid-cols-7">
              {getDaysInMonth.map((date, index) => {
                if (!date) return null;
                
                const dayTasks = getTasksForDate(date);
                const isCurrentMonthDay = isCurrentMonth(date);
                const isTodayDay = isToday(date);
                const isWeekendDay = isWeekend(date);
                const isSelected = selectedDate && 
                  selectedDate.getDate() === date.getDate() &&
                  selectedDate.getMonth() === date.getMonth() &&
                  selectedDate.getFullYear() === date.getFullYear();
                
                return (
                  <div
                    key={index}
                    className={cn(
                      "min-h-[140px] p-3 border-r border-b border-gray-100 cursor-pointer transition-all duration-200 group relative overflow-hidden",
                      !isCurrentMonthDay && "bg-gray-50 text-gray-400",
                      isTodayDay && "bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 ring-2 ring-blue-400 ring-inset",
                      isWeekendDay && isCurrentMonthDay && "bg-gradient-to-br from-purple-50 to-blue-50",
                      isSelected && "bg-gradient-to-br from-purple-100 to-blue-100 ring-2 ring-purple-400 ring-inset",
                      "hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:shadow-lg hover:z-10 hover:scale-105 last:border-r-0"
                    )}
                    onClick={() => handleDateClick(date)}
                  >
                    {/* Número del día con mejor diseño */}
                    <div className={cn(
                      "text-sm font-semibold mb-2 flex items-center justify-between",
                      isTodayDay && "text-blue-700",
                      !isCurrentMonthDay && "text-gray-400"
                    )}>
                      <span className={cn(
                        "flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200",
                        isTodayDay && "bg-white shadow-md ring-2 ring-blue-400"
                      )}>
                        {date.getDate()}
                      </span>
                      
                      {/* Indicador de cantidad de tareas */}
                      {dayTasks.length > 0 && (
                        <div className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
                          dayTasks.length <= 2 ? "bg-blue-100 text-blue-700" :
                          dayTasks.length <= 4 ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        )}>
                          {dayTasks.length}
                        </div>
                      )}
                    </div>
                    
                    {/* Lista de tareas mejorada */}
                    <div className="space-y-1.5">
                      {dayTasks.slice(0, 3).map((task, taskIndex) => (
                        <div
                          key={task.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onTaskClick?.(task);
                          }}
                          className={cn(
                            "text-xs px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md font-medium border",
                            task.status === TaskStatus.COMPLETED 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                              : task.status === TaskStatus.IN_PROGRESS
                              ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          )}
                          style={{ 
                            animationDelay: `${taskIndex * 100}ms`,
                            animation: 'fadeInUp 0.3s ease-out forwards'
                          }}
                        >
                          <div className="flex items-center gap-1">
                            <div className={cn(
                              "w-1.5 h-1.5 rounded-full flex-shrink-0",
                              task.status === TaskStatus.COMPLETED ? "bg-emerald-400" :
                              task.status === TaskStatus.IN_PROGRESS ? "bg-blue-400" :
                              "bg-gray-400"
                            )} />
                            <span className="truncate">{task.title}</span>
                          </div>
                        </div>
                      ))}
                      
                      {/* Indicador de más tareas */}
                      {dayTasks.length > 3 && (
                        <div className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded-lg flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          +{dayTasks.length - 3} más
                        </div>
                      )}
                    </div>

                    {/* Efecto hover decorativo */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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