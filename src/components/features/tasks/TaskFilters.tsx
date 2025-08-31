'use client';

import React from 'react';
import { TaskStatus, TaskPriority, FilterOptions } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, SortAsc, SortDesc } from 'lucide-react';

interface TaskFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClear: () => void;
  taskCounts?: {
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
  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: TaskStatus.PENDING, label: 'Pendiente' },
    { value: TaskStatus.IN_PROGRESS, label: 'En Progreso' },
    { value: TaskStatus.COMPLETED, label: 'Completada' },
  ];

  const priorityOptions = [
    { value: '', label: 'Todas las prioridades' },
    { value: TaskPriority.HIGH, label: 'Alta' },
    { value: TaskPriority.MEDIUM, label: 'Media' },
    { value: TaskPriority.LOW, label: 'Baja' },
  ];

  const sortOptions = [
    { value: 'created_at', label: 'Fecha de creación' },
    { value: 'due_date', label: 'Fecha de vencimiento' },
    { value: 'title', label: 'Título' },
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === '' ? undefined : value,
    });
  };

  const hasActiveFilters = filters.status || filters.priority || filters.search;

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar tareas..."
          value={filters.search || ''}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filtros rápidos por estado */}
      {taskCounts && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!filters.status ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('status', '')}
            className="flex items-center gap-2"
          >
            <Filter className="h-3 w-3" />
            Todas
            <Badge variant="secondary">{taskCounts.total}</Badge>
          </Button>
          
          <Button
            variant={filters.status === TaskStatus.PENDING ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('status', TaskStatus.PENDING)}
            className="flex items-center gap-2"
          >
            Pendientes
            <Badge variant="pending">{taskCounts.pending}</Badge>
          </Button>
          
          <Button
            variant={filters.status === TaskStatus.IN_PROGRESS ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('status', TaskStatus.IN_PROGRESS)}
            className="flex items-center gap-2"
          >
            En Progreso
            <Badge variant="in-progress">{taskCounts.inProgress}</Badge>
          </Button>
          
          <Button
            variant={filters.status === TaskStatus.COMPLETED ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('status', TaskStatus.COMPLETED)}
            className="flex items-center gap-2"
          >
            Completadas
            <Badge variant="completed">{taskCounts.completed}</Badge>
          </Button>
        </div>
      )}

      {/* Filtros avanzados */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          options={statusOptions}
          placeholder="Estado"
        />

        <Select
          value={filters.priority || ''}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          options={priorityOptions}
          placeholder="Prioridad"
        />

        <Select
          value={filters.sortBy || 'created_at'}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          options={sortOptions}
          placeholder="Ordenar por"
        />

        <div className="flex gap-2">
          <Button
            variant={filters.sortOrder === 'asc' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('sortOrder', 'asc')}
            className="flex items-center gap-1"
          >
            <SortAsc className="h-3 w-3" />
            Asc
          </Button>
          <Button
            variant={filters.sortOrder === 'desc' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('sortOrder', 'desc')}
            className="flex items-center gap-1"
          >
            <SortDesc className="h-3 w-3" />
            Desc
          </Button>
        </div>
      </div>

      {/* Limpiar filtros */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="flex items-center gap-2"
          >
            <X className="h-3 w-3" />
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}