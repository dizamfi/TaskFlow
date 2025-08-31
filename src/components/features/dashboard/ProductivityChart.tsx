'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task, TaskStatus } from '@/types';

interface ProductivityChartProps {
  tasks: Task[];
}

export function ProductivityChart({ tasks }: ProductivityChartProps) {
  // Generar datos de los últimos 7 días
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const chartData = last7Days.map(date => {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const dayTasks = tasks.filter(task => {
      const taskDate = new Date(task.updated_at);
      return taskDate >= dayStart && taskDate <= dayEnd && task.status === TaskStatus.COMPLETED;
    });

    return {
      date: date.toLocaleDateString('es-ES', { weekday: 'short' }),
      completed: dayTasks.length,
    };
  });

  const maxCompleted = Math.max(...chartData.map(d => d.completed), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Productividad (7 días)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Gráfico de barras simple */}
          <div className="flex items-end justify-between h-32 gap-2">
            {chartData.map((data, index) => {
              const height = (data.completed / maxCompleted) * 100;
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-primary-500 rounded-t transition-all duration-500 ease-in-out min-h-[4px]"
                    style={{ height: `${Math.max(height, 4)}%` }}
                    title={`${data.completed} tareas completadas`}
                  />
                  <span className="text-xs text-gray-600 mt-2 font-medium">
                    {data.date}
                  </span>
                  <span className="text-xs text-gray-500">
                    {data.completed}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Resumen */}
          <div className="flex justify-between text-sm text-gray-600 pt-4 border-t">
            <span>Total esta semana:</span>
            <span className="font-semibold">
              {chartData.reduce((sum, d) => sum + d.completed, 0)} tareas
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}