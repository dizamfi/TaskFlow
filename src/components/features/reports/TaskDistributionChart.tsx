'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { PieChart, BarChart3 } from 'lucide-react';

interface TaskDistributionChartProps {
  tasks: Task[];
  type: 'status' | 'priority';
}

export function TaskDistributionChart({ tasks, type }: TaskDistributionChartProps) {
  const generateDistributionData = () => {
    if (type === 'status') {
      return [
        {
          label: 'Completadas',
          value: tasks.filter(t => t.status === TaskStatus.COMPLETED).length,
          color: 'bg-success-500',
          textColor: 'text-success-700',
          variant: 'completed' as const,
        },
        {
          label: 'En Progreso',
          value: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
          color: 'bg-primary-500',
          textColor: 'text-primary-700',
          variant: 'in-progress' as const,
        },
        {
          label: 'Pendientes',
          value: tasks.filter(t => t.status === TaskStatus.PENDING).length,
          color: 'bg-gray-400',
          textColor: 'text-gray-700',
          variant: 'pending' as const,
        },
      ];
    } else {
      return [
        {
          label: 'Alta',
          value: tasks.filter(t => t.priority === TaskPriority.HIGH).length,
          color: 'bg-danger-500',
          textColor: 'text-danger-700',
          variant: 'high' as const,
        },
        {
          label: 'Media',
          value: tasks.filter(t => t.priority === TaskPriority.MEDIUM).length,
          color: 'bg-warning-500',
          textColor: 'text-warning-700',
          variant: 'medium' as const,
        },
        {
          label: 'Baja',
          value: tasks.filter(t => t.priority === TaskPriority.LOW).length,
          color: 'bg-gray-400',
          textColor: 'text-gray-700',
          variant: 'low' as const,
        },
      ];
    }
  };

  const data = generateDistributionData();
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calcular ángulos para el gráfico circular
  const dataWithAngles = data.map((item, index) => {
    const percentage = total > 0 ? (item.value / total) * 100 : 0;
    const startAngle = index === 0 ? 0 : data.slice(0, index).reduce((sum, prev) => sum + (prev.value / total) * 360, 0);
    const endAngle = startAngle + (percentage / 100) * 360;
    
    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Distribución por {type === 'status' ? 'Estado' : 'Prioridad'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {/* Gráfico circular simple */}
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              {dataWithAngles.map((item, index) => {
                if (item.value === 0) return null;
                
                const radius = 50;
                const circumference = 2 * Math.PI * radius;
                const strokeDasharray = circumference;
                const strokeDashoffset = circumference - (item.percentage / 100) * circumference;
                const rotation = item.startAngle;
                
                return (
                  <circle
                    key={index}
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke={item.color.replace('bg-', '').replace('-500', '-500')}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(${rotation} 64 64)`}
                    className="transition-all duration-500 hover:stroke-opacity-80"
                  />
                );
              })}
            </svg>
            
            {/* Número total en el centro */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{total}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
          </div>

          {/* Leyenda y estadísticas */}
          <div className="flex-1 ml-6">
            <div className="space-y-3">
              {dataWithAngles.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.label}
                    </span>
                    <Badge variant={item.variant}>
                      {item.value}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    {Math.round(item.percentage)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}