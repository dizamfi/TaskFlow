'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/types';
import { TrendingUp, Calendar } from 'lucide-react';

interface ProductivityChartProps {
  tasks: Task[];
  period: 'week' | 'month' | 'year';
}

export function ProductivityChart({ tasks, period }: ProductivityChartProps) {
  // Generar datos según el período
  const generateChartData = () => {
    const now = new Date();
    let days = 7;
    let formatOptions: Intl.DateTimeFormatOptions = { weekday: 'short' };
    
    switch (period) {
      case 'month':
        days = 30;
        formatOptions = { day: 'numeric' };
        break;
      case 'year':
        days = 365;
        formatOptions = { month: 'short' };
        break;
      default:
        days = 7;
    }

    const periods = Array.from({ length: period === 'year' ? 12 : days }, (_, i) => {
      const date = new Date(now);
      
      if (period === 'year') {
        date.setMonth(date.getMonth() - (11 - i));
        date.setDate(1);
      } else {
        date.setDate(date.getDate() - (days - 1 - i));
      }
      
      return date;
    });

    return periods.map(date => {
      const start = new Date(date);
      const end = new Date(date);
      
      if (period === 'year') {
        end.setMonth(end.getMonth() + 1);
      } else {
        end.setDate(end.getDate() + 1);
      }

      const periodTasks = tasks.filter(task => {
        const taskDate = new Date(task.updated_at);
        return taskDate >= start && taskDate < end && task.status === 'completed';
      });

      return {
        date: date.toLocaleDateString('es-ES', formatOptions),
        completed: periodTasks.length,
        total: tasks.filter(task => {
          const taskDate = new Date(task.created_at);
          return taskDate >= start && taskDate < end;
        }).length,
      };
    });
  };

  const chartData = generateChartData();
  const maxCompleted = Math.max(...chartData.map(d => d.completed), 1);
  const totalCompleted = chartData.reduce((sum, d) => sum + d.completed, 0);
  const totalTasks = chartData.reduce((sum, d) => sum + d.total, 0);
  const completionRate = totalTasks > 0 ? (totalCompleted / totalTasks) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Productividad - {period === 'week' ? 'Semanal' : period === 'month' ? 'Mensual' : 'Anual'}
          </div>
          <div className="text-sm text-gray-600">
            {Math.round(completionRate)}% completado
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Gráfico de barras */}
          <div className="flex items-end justify-between h-40 gap-1 bg-gray-50 rounded-lg p-4">
            {chartData.map((data, index) => {
              const height = (data.completed / maxCompleted) * 100;
              return (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div 
                    className="w-full bg-primary-500 rounded-t transition-all duration-500 ease-in-out hover:bg-primary-600 min-h-[4px] relative group-hover:shadow-lg"
                    style={{ height: `${Math.max(height, 4)}%` }}
                    title={`${data.completed} tareas completadas`}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap">
                      {data.completed} completadas
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
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
          
          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{totalCompleted}</div>
              <div className="text-sm text-gray-600">Completadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success-600">{Math.round(completionRate)}%</div>
              <div className="text-sm text-gray-600">Tasa de éxito</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}