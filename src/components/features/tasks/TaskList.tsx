'use client';

import React from 'react';
import { Task } from '@/types';
import { TaskCard } from './TaskCard';
import { Empty } from '@/components/ui/empty';
import { CheckSquare, Search } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: any) => void;
  loading?: boolean;
  emptyMessage?: string;
  emptyDescription?: string;
}

export function TaskList({ 
  tasks, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  loading = false,
  emptyMessage = "No hay tareas",
  emptyDescription = "Crea tu primera tarea para comenzar a organizarte"
}: TaskListProps) {
  if (!loading && tasks.length === 0) {
    return (
      <Empty
        icon={<CheckSquare className="h-12 w-12 text-gray-400" />}
        title={emptyMessage}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          loading={loading}
        />
      ))}
      
      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="flex gap-2">
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                      <div className="h-5 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}




// 'use client';

// import React from 'react';
// import { Task } from '@/types';
// import { TaskCard } from './TaskCard';
// import { Empty } from '@/components/ui/empty';
// import { CheckSquare, Search, Sparkles, Target, FileText } from 'lucide-react';

// interface TaskListProps {
//   tasks: Task[];
//   onEdit: (task: Task) => void;
//   onDelete: (id: string) => void;
//   onStatusChange: (id: string, status: any) => void;
//   loading?: boolean;
//   emptyMessage?: string;
//   emptyDescription?: string;
// }

// export function TaskList({ 
//   tasks, 
//   onEdit, 
//   onDelete, 
//   onStatusChange, 
//   loading = false,
//   emptyMessage = "No hay tareas",
//   emptyDescription = "Crea tu primera tarea para comenzar a organizarte"
// }: TaskListProps) {
  
//   // Estado vacío mejorado
//   if (!loading && tasks.length === 0) {
//     const isFiltered = emptyMessage.includes("encontraron");
    
//     return (
//       <div className="flex flex-col items-center justify-center py-16 px-4">
//         {/* Contenedor con gradiente de fondo */}
//         <div className="relative">
//           {/* Círculo de fondo con gradiente */}
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl opacity-50 scale-150"></div>
          
//           {/* Icono principal */}
//           <div className="relative bg-white rounded-full p-6 shadow-lg border border-gray-100">
//             {isFiltered ? (
//               <Search className="h-12 w-12 text-gray-400" />
//             ) : (
//               <Target className="h-12 w-12 text-blue-500" />
//             )}
//           </div>
//         </div>

//         {/* Contenido del mensaje */}
//         <div className="text-center mt-6 space-y-3">
//           <h3 className="text-xl font-semibold text-gray-900">
//             {emptyMessage}
//           </h3>
//           <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
//             {emptyDescription}
//           </p>
          
//           {/* Sugerencias visuales */}
//           {!isFiltered && (
//             <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
//               <div className="flex items-center justify-center gap-2 text-blue-700 font-medium mb-2">
//                 <Sparkles className="h-4 w-4" />
//                 <span className="text-sm">¿Por dónde empezar?</span>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                   <span>Organiza tu día</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//                   <span>Establece prioridades</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
//                   <span>Alcanza tus metas</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {/* Header con contador de tareas */}
//       {!loading && tasks.length > 0 && (
//         <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2">
//               <FileText className="h-5 w-5 text-blue-600" />
//               <span className="font-semibold text-gray-900">
//                 {tasks.length} {tasks.length === 1 ? 'Tarea' : 'Tareas'}
//               </span>
//             </div>
            
//             {/* Stats rápidas */}
//             <div className="hidden sm:flex items-center gap-4 text-sm">
//               <div className="flex items-center gap-1">
//                 <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
//                 <span className="text-gray-600">
//                   {tasks.filter(t => t.status === 'completed').length} completadas
//                 </span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//                 <span className="text-gray-600">
//                   {tasks.filter(t => t.status === 'in_progress').length} en progreso
//                 </span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
//                 <span className="text-gray-600">
//                   {tasks.filter(t => t.status === 'pending').length} pendientes
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Indicador de progreso general */}
//           <div className="hidden md:flex items-center gap-2">
//             <span className="text-xs text-gray-500">Progreso:</span>
//             <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
//               <div 
//                 className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
//                 style={{ 
//                   width: `${Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%` 
//                 }}
//               ></div>
//             </div>
//             <span className="text-xs font-medium text-emerald-600">
//               {Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Lista de tareas con animaciones */}
//       <div className="space-y-4">
//         {tasks.map((task, index) => (
//           <div
//             key={task.id}
//             className="animate-fade-in-up"
//             style={{ animationDelay: `${index * 50}ms` }}
//           >
//             <TaskCard
//               task={task}
//               onEdit={onEdit}
//               onDelete={onDelete}
//               onStatusChange={onStatusChange}
//               loading={loading}
//             />
//           </div>
//         ))}
//       </div>
      
//       {/* Loading skeletons mejorados */}
//       {loading && (
//         <div className="space-y-4">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="animate-pulse">
//               <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
//                 <div className="flex items-start gap-4">
//                   {/* Skeleton del checkbox */}
//                   <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0 mt-1"></div>
                  
//                   {/* Skeleton del contenido */}
//                   <div className="flex-1 space-y-3">
//                     {/* Título */}
//                     <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-3/4 animate-shimmer"></div>
                    
//                     {/* Descripción */}
//                     <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 animate-shimmer"></div>
                    
//                     {/* Metadatos */}
//                     <div className="flex gap-4">
//                       <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-16 animate-shimmer"></div>
//                       <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 animate-shimmer"></div>
//                     </div>
                    
//                     {/* Badges */}
//                     <div className="flex gap-2">
//                       <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-20 animate-shimmer"></div>
//                       <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-16 animate-shimmer"></div>
//                     </div>
//                   </div>
                  
//                   {/* Skeleton del menú */}
//                   <div className="w-8 h-8 bg-gray-200 rounded flex-shrink-0"></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }