// 'use client';

// import React from 'react';
// import { TaskStatus, TaskPriority, FilterOptions } from '@/types';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { Search, Filter, X, SortAsc, SortDesc } from 'lucide-react';

// interface TaskFiltersProps {
//   filters: FilterOptions;
//   onFiltersChange: (filters: FilterOptions) => void;
//   onClear: () => void;
//   taskCounts?: {
//     total: number;
//     pending: number;
//     inProgress: number;
//     completed: number;
//   };
// }

// export function TaskFilters({ 
//   filters, 
//   onFiltersChange, 
//   onClear, 
//   taskCounts 
// }: TaskFiltersProps) {
//   const statusOptions = [
//     { value: '', label: 'Todos los estados' },
//     { value: TaskStatus.PENDING, label: 'Pendiente' },
//     { value: TaskStatus.IN_PROGRESS, label: 'En Progreso' },
//     { value: TaskStatus.COMPLETED, label: 'Completada' },
//   ];

//   const priorityOptions = [
//     { value: '', label: 'Todas las prioridades' },
//     { value: TaskPriority.HIGH, label: 'Alta' },
//     { value: TaskPriority.MEDIUM, label: 'Media' },
//     { value: TaskPriority.LOW, label: 'Baja' },
//   ];

//   const sortOptions = [
//     { value: 'created_at', label: 'Fecha de creación' },
//     { value: 'due_date', label: 'Fecha de vencimiento' },
//     { value: 'title', label: 'Título' },
//   ];

//   const handleFilterChange = (key: keyof FilterOptions, value: any) => {
//     onFiltersChange({
//       ...filters,
//       [key]: value === '' ? undefined : value,
//     });
//   };

//   const hasActiveFilters = filters.status || filters.priority || filters.search;

//   return (
//     <div className="space-y-4">
//       {/* Barra de búsqueda */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//         <Input
//           placeholder="Buscar tareas..."
//           value={filters.search || ''}
//           onChange={(e) => handleFilterChange('search', e.target.value)}
//           className="pl-10"
//         />
//       </div>

//       {/* Filtros rápidos por estado */}
//       {taskCounts && (
//         <div className="flex flex-wrap gap-2">
//           <Button
//             variant={!filters.status ? 'default' : 'outline'}
//             size="sm"
//             onClick={() => handleFilterChange('status', '')}
//             className="flex items-center gap-2"
//           >
//             <Filter className="h-3 w-3" />
//             Todas
//             <Badge variant="secondary">{taskCounts.total}</Badge>
//           </Button>
          
//           <Button
//             variant={filters.status === TaskStatus.PENDING ? 'default' : 'outline'}
//             size="sm"
//             onClick={() => handleFilterChange('status', TaskStatus.PENDING)}
//             className="flex items-center gap-2"
//           >
//             Pendientes
//             <Badge variant="pending">{taskCounts.pending}</Badge>
//           </Button>
          
//           <Button
//             variant={filters.status === TaskStatus.IN_PROGRESS ? 'default' : 'outline'}
//             size="sm"
//             onClick={() => handleFilterChange('status', TaskStatus.IN_PROGRESS)}
//             className="flex items-center gap-2"
//           >
//             En Progreso
//             <Badge variant="in-progress">{taskCounts.inProgress}</Badge>
//           </Button>
          
//           <Button
//             variant={filters.status === TaskStatus.COMPLETED ? 'default' : 'outline'}
//             size="sm"
//             onClick={() => handleFilterChange('status', TaskStatus.COMPLETED)}
//             className="flex items-center gap-2"
//           >
//             Completadas
//             <Badge variant="completed">{taskCounts.completed}</Badge>
//           </Button>
//         </div>
//       )}

//       {/* Filtros avanzados */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Select
//           value={filters.status || ''}
//           onChange={(e) => handleFilterChange('status', e.target.value)}
//           options={statusOptions}
//           placeholder="Estado"
//         />

//         <Select
//           value={filters.priority || ''}
//           onChange={(e) => handleFilterChange('priority', e.target.value)}
//           options={priorityOptions}
//           placeholder="Prioridad"
//         />

//         <Select
//           value={filters.sortBy || 'created_at'}
//           onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//           options={sortOptions}
//           placeholder="Ordenar por"
//         />

//         <div className="flex gap-2">
//           <Button
//             variant={filters.sortOrder === 'asc' ? 'default' : 'outline'}
//             size="sm"
//             onClick={() => handleFilterChange('sortOrder', 'asc')}
//             className="flex items-center gap-1"
//           >
//             <SortAsc className="h-3 w-3" />
//             Asc
//           </Button>
//           <Button
//             variant={filters.sortOrder === 'desc' ? 'default' : 'outline'}
//             size="sm"
//             onClick={() => handleFilterChange('sortOrder', 'desc')}
//             className="flex items-center gap-1"
//           >
//             <SortDesc className="h-3 w-3" />
//             Desc
//           </Button>
//         </div>
//       </div>

//       {/* Limpiar filtros */}
//       {hasActiveFilters && (
//         <div className="flex justify-end">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={onClear}
//             className="flex items-center gap-2"
//           >
//             <X className="h-3 w-3" />
//             Limpiar filtros
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }




'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TaskStatus, TaskPriority, FilterOptions } from '@/types';
import { 
  Search, 
  Filter, 
  X, 
  SortAsc, 
  SortDesc, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  Flag,
  Calendar,
  FileText,
  Zap,
  Target,
  ChevronDown,
  RefreshCw
} from 'lucide-react';

interface TaskFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClear: () => void;
  taskCounts: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
}

export function TaskFilters({ 
  filters, 
  onFiltersChange, 
  onClear,
  taskCounts 
}: TaskFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search || '');

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onFiltersChange({ ...filters, search: value });
  };

  const handleStatusFilter = (status: TaskStatus | undefined) => {
    onFiltersChange({ ...filters, status });
  };

  const handlePriorityFilter = (priority: TaskPriority | undefined) => {
    onFiltersChange({ ...filters, priority });
  };

  const handleSortChange = (sortBy: 'created_at' | 'due_date' | 'title', sortOrder: 'asc' | 'desc') => {
    onFiltersChange({ ...filters, sortBy, sortOrder });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status) count++;
    if (filters.priority) count++;
    if (filters.search) count++;
    if (filters.sortBy !== 'created_at' || filters.sortOrder !== 'desc') count++;
    return count;
  };

  const statusOptions = [
    { 
      value: TaskStatus.PENDING, 
      label: 'Pendientes', 
      icon: Clock, 
      color: 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200',
      count: taskCounts.pending
    },
    { 
      value: TaskStatus.IN_PROGRESS, 
      label: 'En Progreso', 
      icon: Zap, 
      color: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
      count: taskCounts.inProgress
    },
    { 
      value: TaskStatus.COMPLETED, 
      label: 'Completadas', 
      icon: CheckCircle2, 
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200',
      count: taskCounts.completed
    }
  ];

  const priorityOptions = [
    { 
      value: TaskPriority.HIGH, 
      label: 'Alta', 
      icon: AlertCircle, 
      color: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200' 
    },
    { 
      value: TaskPriority.MEDIUM, 
      label: 'Media', 
      icon: Flag, 
      color: 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200' 
    },
    { 
      value: TaskPriority.LOW, 
      label: 'Baja', 
      icon: Target, 
      color: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200' 
    }
  ];

  const sortOptions = [
    { value: 'created_at', label: 'Fecha de creación', icon: Calendar },
    { value: 'due_date', label: 'Fecha de vencimiento', icon: Clock },
    { value: 'title', label: 'Título', icon: FileText }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header con título y contador */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Filtros y Búsqueda</h3>
            <p className="text-sm text-gray-500">
              {taskCounts.total} tareas en total
            </p>
          </div>
        </div>

        {/* Indicador de filtros activos */}
        {getActiveFiltersCount() > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
              {getActiveFiltersCount()} filtro{getActiveFiltersCount() > 1 ? 's' : ''} activo{getActiveFiltersCount() > 1 ? 's' : ''}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-8 px-3"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          </div>
        )}
      </div>

      {/* Barra de búsqueda principal */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Buscar tareas por título o descripción..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-12 pr-12 h-12 text-base border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
        />
        {searchValue && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filtros rápidos por estado */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-500" />
            Filtrar por Estado
          </h4>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!filters.status ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusFilter(undefined)}
            className={`h-9 px-4 ${!filters.status ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0' : 'border-gray-200 hover:bg-gray-50'}`}
          >
            <FileText className="h-4 w-4 mr-2" />
            Todas ({taskCounts.total})
          </Button>
          
          {statusOptions.map((option) => {
            const Icon = option.icon;
            const isActive = filters.status === option.value;
            
            return (
              <Button
                key={option.value}
                variant="outline"
                size="sm"
                onClick={() => handleStatusFilter(option.value)}
                className={`h-9 px-4 border transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-md' 
                    : option.color
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {option.label} ({option.count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Sección expandible de filtros avanzados */}
      <div className="border-t border-gray-100 pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full justify-between text-gray-600 hover:text-gray-900 hover:bg-gray-50 h-10 px-4"
        >
          <span className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Filtros Avanzados
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} />
        </Button>

        {showAdvanced && (
          <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Filtros por prioridad */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <Flag className="h-4 w-4 text-amber-500" />
                Filtrar por Prioridad
              </h4>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!filters.priority ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePriorityFilter(undefined)}
                  className={`h-9 px-4 ${!filters.priority ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  Todas las prioridades
                </Button>
                
                {priorityOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = filters.priority === option.value;
                  
                  return (
                    <Button
                      key={option.value}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePriorityFilter(option.value)}
                      className={`h-9 px-4 border transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-0 shadow-md' 
                          : option.color
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Opciones de ordenamiento */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-purple-500" />
                Ordenar Por
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Campo</label>
                  <div className="flex gap-2">
                    {sortOptions.map((option) => {
                      const Icon = option.icon;
                      const isActive = filters.sortBy === option.value;
                      
                      return (
                        <Button
                          key={option.value}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSortChange(option.value as 'created_at' | 'due_date' | 'title', filters.sortOrder || 'desc')}
                          className={`flex-1 h-9 px-3 border transition-all duration-200 ${
                            isActive 
                              ? 'bg-purple-50 text-purple-700 border-purple-200' 
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="h-4 w-4 mr-1" />
                          <span className="text-xs">{option.label}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Orden</label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSortChange(filters.sortBy || 'created_at', 'desc')}
                      className={`flex-1 h-9 px-3 border transition-all duration-200 ${
                        filters.sortOrder === 'desc' 
                          ? 'bg-purple-50 text-purple-700 border-purple-200' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <SortDesc className="h-4 w-4 mr-1" />
                      <span className="text-xs">Desc</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSortChange(filters.sortBy || 'created_at', 'asc')}
                      className={`flex-1 h-9 px-3 border transition-all duration-200 ${
                        filters.sortOrder === 'asc' 
                          ? 'bg-purple-50 text-purple-700 border-purple-200' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <SortAsc className="h-4 w-4 mr-1" />
                      <span className="text-xs">Asc</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resumen de filtros aplicados */}
      {(filters.status || filters.priority || filters.search) && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Filtros Aplicados:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.status && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                Estado: {statusOptions.find(s => s.value === filters.status)?.label}
                <button
                  onClick={() => handleStatusFilter(undefined)}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {filters.priority && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                Prioridad: {priorityOptions.find(p => p.value === filters.priority)?.label}
                <button
                  onClick={() => handlePriorityFilter(undefined)}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {filters.search && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
                Búsqueda: "{filters.search}"
                <button
                  onClick={() => handleSearchChange('')}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}