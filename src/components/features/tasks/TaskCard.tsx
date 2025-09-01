// 'use client';

// import React, { useState } from 'react';
// import { Task, TaskStatus, TaskPriority } from '@/types';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { formatRelativeTime } from '@/lib/utils/utils';
// import { 
//   Edit3, 
//   Trash2, 
//   Clock, 
//   Calendar,
//   MoreVertical,
//   CheckCircle2,
//   Circle,
//   AlertCircle 
// } from 'lucide-react';

// interface TaskCardProps {
//   task: Task;
//   onEdit: (task: Task) => void;
//   onDelete: (id: string) => void;
//   onStatusChange: (id: string, status: TaskStatus) => void;
//   loading?: boolean;
// }

// export function TaskCard({ task, onEdit, onDelete, onStatusChange, loading = false }: TaskCardProps) {
//   const [showActions, setShowActions] = useState(false);

//   const getStatusIcon = (status: TaskStatus) => {
//     switch (status) {
//       case TaskStatus.COMPLETED:
//         return <CheckCircle2 className="h-4 w-4 text-success-600" />;
//       case TaskStatus.IN_PROGRESS:
//         return <AlertCircle className="h-4 w-4 text-primary-600" />;
//       default:
//         return <Circle className="h-4 w-4 text-gray-400" />;
//     }
//   };

//   const getPriorityColor = (priority: TaskPriority) => {
//     switch (priority) {
//       case TaskPriority.HIGH:
//         return 'high';
//       case TaskPriority.MEDIUM:
//         return 'medium';
//       case TaskPriority.LOW:
//         return 'low';
//       default:
//         return 'low';
//     }
//   };

//   const getStatusColor = (status: TaskStatus) => {
//     switch (status) {
//       case TaskStatus.COMPLETED:
//         return 'completed';
//       case TaskStatus.IN_PROGRESS:
//         return 'in-progress';
//       case TaskStatus.PENDING:
//         return 'pending';
//       default:
//         return 'pending';
//     }
//   };

//   const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== TaskStatus.COMPLETED;

//   const handleStatusToggle = () => {
//     const nextStatus = task.status === TaskStatus.COMPLETED 
//       ? TaskStatus.PENDING 
//       : TaskStatus.COMPLETED;
//     onStatusChange(task.id, nextStatus);
//   };

//   return (
//     <Card className={`group hover:shadow-md transition-shadow ${task.status === TaskStatus.COMPLETED ? 'opacity-75' : ''}`}>
//       <CardContent className="p-4">
//         <div className="flex items-start justify-between">
//           <div className="flex items-start gap-3 flex-1">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={handleStatusToggle}
//               disabled={loading}
//               className="p-0 h-6 w-6 hover:bg-transparent"
//             >
//               {getStatusIcon(task.status)}
//             </Button>
            
//             <div className="flex-1 min-w-0">
//               <h3 className={`font-semibold text-gray-900 mb-1 ${
//                 task.status === TaskStatus.COMPLETED ? 'line-through text-gray-500' : ''
//               }`}>
//                 {task.title}
//               </h3>
              
//               {task.description && (
//                 <p className="text-sm text-gray-600 mb-2 line-clamp-2">
//                   {task.description}
//                 </p>
//               )}
              
//               <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
//                 <Clock className="h-3 w-3" />
//                 <span>{formatRelativeTime(task.created_at)}</span>
                
//                 {task.due_date && (
//                   <>
//                     <Calendar className="h-3 w-3 ml-2" />
//                     <span className={isOverdue ? 'text-danger-600 font-medium' : ''}>
//                       {new Date(task.due_date).toLocaleDateString('es-ES')}
//                       {isOverdue && ' (Vencida)'}
//                     </span>
//                   </>
//                 )}
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <Badge variant={getStatusColor(task.status)}>
//                   {task.status === TaskStatus.PENDING && 'Pendiente'}
//                   {task.status === TaskStatus.IN_PROGRESS && 'En Progreso'}
//                   {task.status === TaskStatus.COMPLETED && 'Completada'}
//                 </Badge>
                
//                 <Badge variant={getPriorityColor(task.priority)}>
//                   {task.priority === TaskPriority.HIGH && 'Alta'}
//                   {task.priority === TaskPriority.MEDIUM && 'Media'}
//                   {task.priority === TaskPriority.LOW && 'Baja'}
//                 </Badge>
//               </div>
//             </div>
//           </div>
          
//           <div className="relative">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setShowActions(!showActions)}
//               disabled={loading}
//               className="opacity-0 group-hover:opacity-100 transition-opacity"
//             >
//               <MoreVertical className="h-4 w-4" />
//             </Button>
            
//             {showActions && (
//               <>
//                 <div 
//                   className="fixed inset-0 z-40"
//                   onClick={() => setShowActions(false)}
//                 />
//                 <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border z-50">
//                   <button
//                     onClick={() => {
//                       onEdit(task);
//                       setShowActions(false);
//                     }}
//                     className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     disabled={loading}
//                   >
//                     <Edit3 className="h-3 w-3 mr-2" />
//                     Editar
//                   </button>
//                   <button
//                     onClick={() => {
//                       onDelete(task.id);
//                       setShowActions(false);
//                     }}
//                     className="flex items-center w-full px-3 py-2 text-sm text-danger-600 hover:bg-gray-100"
//                     disabled={loading}
//                   >
//                     <Trash2 className="h-3 w-3 mr-2" />
//                     Eliminar
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/lib/utils/utils';
import { 
  Edit3, 
  Trash2, 
  Clock, 
  Calendar,
  MoreVertical,
  CheckCircle2,
  Circle,
  AlertCircle,
  PlayCircle,
  User,
  Tag,
  Star,
  Flag
} from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '@/types';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  loading?: boolean;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange, loading = false }: TaskCardProps) {
  const [showActions, setShowActions] = useState(false);

  // Loading state elegante y profesional
  if (loading) {
    return (
      <Card className="group relative overflow-hidden transition-all duration-300 border-0 shadow-sm hover:shadow-lg bg-white animate-in fade-in duration-500">
        {/* Borde lateral skeleton */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-200 to-gray-300 animate-pulse" />
        
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Skeleton Checkbox */}
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-shimmer"></div>
            </div>
            
            {/* Skeleton Contenido principal */}
            <div className="flex-1 min-w-0 space-y-3">
              {/* Skeleton Título */}
              <div className="space-y-2">
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-shimmer" 
                     style={{ width: `${60 + Math.random() * 30}%` }}></div>
                
                {/* Skeleton Descripción (solo algunos tienen) */}
                {Math.random() > 0.4 && (
                  <div className="space-y-1">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" 
                         style={{ width: `${70 + Math.random() * 25}%` }}></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer" 
                         style={{ width: `${40 + Math.random() * 30}%` }}></div>
                  </div>
                )}
              </div>

              {/* Skeleton Metadatos */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-12 animate-shimmer"></div>
                </div>
                
                {/* Skeleton Fecha de vencimiento (solo algunos tienen) */}
                {Math.random() > 0.5 && (
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-16 animate-shimmer"></div>
                  </div>
                )}
              </div>
              
              {/* Skeleton Badges */}
              <div className="flex items-center gap-2">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-20 animate-shimmer"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-16 animate-shimmer"></div>
              </div>
            </div>
            
            {/* Skeleton Menú de acciones */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Skeleton Barra de progreso (ocasional) */}
          {Math.random() > 0.7 && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 animate-shimmer"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-300 to-gray-400 h-1.5 rounded-full animate-pulse" 
                     style={{ width: `${30 + Math.random() * 50}%` }}></div>
              </div>
            </div>
          )}

          {/* Efecto de onda de carga */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-wave opacity-60"></div>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case TaskStatus.IN_PROGRESS:
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-300 hover:text-blue-400 transition-colors" />;
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

  const getPriorityIcon = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return <Flag className="h-3 w-3 text-red-500" />;
      case TaskPriority.MEDIUM:
        return <Flag className="h-3 w-3 text-amber-500" />;
      case TaskPriority.LOW:
        return <Flag className="h-3 w-3 text-blue-500" />;
      default:
        return <Flag className="h-3 w-3 text-gray-400" />;
    }
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== TaskStatus.COMPLETED;

  const handleStatusToggle = () => {
    const nextStatus = task.status === TaskStatus.COMPLETED 
      ? TaskStatus.PENDING 
      : TaskStatus.COMPLETED;
    onStatusChange(task.id, nextStatus);
  };

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 border-0 shadow-sm hover:shadow-lg ${
      task.status === TaskStatus.COMPLETED 
        ? 'bg-gradient-to-r from-gray-50 to-gray-100/50' 
        : 'bg-white hover:bg-gray-50/30'
    }`}>
      {/* Borde lateral de prioridad */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
        task.priority === TaskPriority.HIGH ? 'bg-red-400' :
        task.priority === TaskPriority.MEDIUM ? 'bg-amber-400' :
        'bg-blue-400'
      }`} />
      
      {/* Indicador de vencimiento */}
      {isOverdue && (
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-red-500">
          <div className="absolute -top-4 -right-1 text-xs text-white transform rotate-45">
            !
          </div>
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Checkbox de estado */}
          <div className="flex-shrink-0 mt-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStatusToggle}
              disabled={loading}
              className="p-0 h-6 w-6 hover:bg-transparent hover:scale-110 transition-all duration-200"
            >
              {getStatusIcon(task.status)}
            </Button>
          </div>
          
          {/* Contenido principal */}
          <div className="flex-1 min-w-0 space-y-3">
            {/* Título y descripción */}
            <div>
              <h3 className={`font-semibold text-lg leading-tight mb-2 transition-all duration-200 ${
                task.status === TaskStatus.COMPLETED 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-900 group-hover:text-gray-700'
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`text-sm leading-relaxed ${
                  task.status === TaskStatus.COMPLETED 
                    ? 'text-gray-400' 
                    : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}
            </div>

            {/* Metadatos */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {/* Fecha de creación */}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs">
                  {formatRelativeTime(task.created_at)}
                </span>
              </div>
              
              {/* Fecha de vencimiento */}
              {task.due_date && (
                <div className={`flex items-center gap-1 ${
                  isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'
                }`}>
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs">
                    {new Date(task.due_date).toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'short',
                      year: '2-digit'
                    })}
                    {isOverdue && ' (Vencida)'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Badges */}
            <div className="flex items-center gap-2">
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                {task.status === TaskStatus.PENDING && '⏳ Pendiente'}
                {task.status === TaskStatus.IN_PROGRESS && '🔄 En Progreso'}
                {task.status === TaskStatus.COMPLETED && '✅ Completada'}
              </div>
              
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                {getPriorityIcon(task.priority)}
                {task.priority === TaskPriority.HIGH && 'Alta'}
                {task.priority === TaskPriority.MEDIUM && 'Media'}
                {task.priority === TaskPriority.LOW && 'Baja'}
              </div>
            </div>
          </div>
          
          {/* Menú de acciones */}
          <div className="relative flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(!showActions)}
              disabled={loading}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 h-8 w-8 p-0"
            >
              <MoreVertical className="h-4 w-4 text-gray-400" />
            </Button>
            
            {showActions && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowActions(false)}
                />
                <div className="absolute right-0 top-8 mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      onEdit(task);
                      setShowActions(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
                    disabled={loading}
                  >
                    <Edit3 className="h-4 w-4 mr-3" />
                    Editar tarea
                  </button>
                  <div className="h-px bg-gray-100" />
                  <button
                    onClick={() => {
                      onDelete(task.id);
                      setShowActions(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4 mr-3" />
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Barra de progreso visual para tareas en progreso */}
        {task.status === TaskStatus.IN_PROGRESS && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-500">En progreso</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}