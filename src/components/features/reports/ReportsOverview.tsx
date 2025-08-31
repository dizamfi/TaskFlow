'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task, TaskStatus } from '@/types';
import { 
  Target, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { formatRelativeTime } from '@/lib/index';

interface ReportsOverviewProps {
  tasks: Task[];
  period: 'week' | 'month' | 'year';
}

export function ReportsOverview({ tasks, period }: ReportsOverviewProps) {
  // Calcular métricas basadas en el período
  const calculateMetrics = () => {
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    const periodTasks = tasks.filter(task => 
      new Date(task.created_at) >= startDate
    );

    const completedTasks = periodTasks.filter(task => 
      task.status === TaskStatus.COMPLETED
    );

    const overdueTasks = tasks.filter(task => 
      task.due_date && 
      new Date(task.due_date) < now && 
      task.status !== TaskStatus.COMPLETED
    );

    const upcomingTasks = tasks.filter(task => {
      if (!task.due_date || task.status === TaskStatus.COMPLETED) return false;
      const dueDate = new Date(task.due_date);
      const threeDaysFromNow = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
      return dueDate >= now && dueDate <= threeDaysFromNow;
    });

    // Calcular tiempo promedio de completado
    const completionTimes = completedTasks
      .map(task => {
        const created = new Date(task.created_at);
        const updated = new Date(task.updated_at);
        return updated.getTime() - created.getTime();
      })
      .filter(time => time > 0);

    const avgCompletionTime = completionTimes.length > 0 
      ? completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length
      : 0;

    const avgCompletionDays = Math.round(avgCompletionTime / (1000 * 60 * 60 * 24));

    // Productividad comparada con período anterior
    const prevStartDate = new Date(startDate);
    const prevEndDate = new Date(startDate);
    
    switch (period) {
      case 'week':
        prevStartDate.setDate(prevStartDate.getDate() - 7);
        break;
      case 'month':
        prevStartDate.setMonth(prevStartDate.getMonth() - 1);
        break;
      case 'year':
        prevStartDate.setFullYear(prevStartDate.getFullYear() - 1);
        break;
    }

    const prevPeriodTasks = tasks.filter(task => {
      const taskDate = new Date(task.created_at);
      return taskDate >= prevStartDate && taskDate < startDate;
    });

    const prevCompletedTasks = prevPeriodTasks.filter(task => 
      task.status === TaskStatus.COMPLETED
    );

    const productivityChange = prevCompletedTasks.length > 0
      ? ((completedTasks.length - prevCompletedTasks.length) / prevCompletedTasks.length) * 100
      : completedTasks.length > 0 ? 100 : 0;

    return {
      totalTasks: periodTasks.length,
      completedTasks: completedTasks.length,
      completionRate: periodTasks.length > 0 ? (completedTasks.length / periodTasks.length) * 100 : 0,
      overdueTasks: overdueTasks.length,
      upcomingTasks: upcomingTasks.length,
      avgCompletionDays,
      productivityChange,
    };
  };

  const metrics = calculateMetrics();

  const getPeriodLabel = () => {
    switch (period) {
      case 'week': return 'Esta semana';
      case 'month': return 'Este mes';
      case 'year': return 'Este año';
      default: return 'Período';
    }
  };

  const MetricCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    color = 'blue',
    trend,
  }: {
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle: string;
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
    trend?: { value: number; type: 'increase' | 'decrease' | 'neutral' };
  }) => {
    const colorClasses = {
      blue: 'text-primary-600 bg-primary-50',
      green: 'text-success-600 bg-success-50',
      yellow: 'text-warning-600 bg-warning-50',
      red: 'text-danger-600 bg-danger-50',
      purple: 'text-purple-600 bg-purple-50',
    };

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{subtitle}</p>
              </div>
            </div>
            
            {trend && (
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  trend.type === 'increase' ? 'text-success-600' :
                  trend.type === 'decrease' ? 'text-danger-600' : 'text-gray-500'
                }`}>
                  {trend.type === 'increase' && '+'}
                  {Math.abs(trend.value)}%
                </div>
                <div className="text-xs text-gray-500">
                  vs. período anterior
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Resumen de {getPeriodLabel()}
        </h2>
        <p className="text-gray-600">
          Análisis detallado de tu productividad y rendimiento
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          icon={CheckCircle2}
          title="Tareas Completadas"
          value={metrics.completedTasks}
          subtitle={`de ${metrics.totalTasks} tareas totales`}
          color="green"
          trend={{
            value: Math.round(metrics.productivityChange),
            type: metrics.productivityChange > 0 ? 'increase' : 
                  metrics.productivityChange < 0 ? 'decrease' : 'neutral'
          }}
        />

        <MetricCard
          icon={Target}
          title="Tasa de Completado"
          value={`${Math.round(metrics.completionRate)}%`}
          subtitle="Eficiencia general"
          color="blue"
        />

        <MetricCard
          icon={Clock}
          title="Tiempo Promedio"
          value={metrics.avgCompletionDays}
          subtitle={`día${metrics.avgCompletionDays !== 1 ? 's' : ''} para completar`}
          color="purple"
        />

        <MetricCard
          icon={AlertTriangle}
          title="Tareas Vencidas"
          value={metrics.overdueTasks}
          subtitle="Requieren atención"
          color="red"
        />

        <MetricCard
          icon={Calendar}
          title="Próximas a Vencer"
          value={metrics.upcomingTasks}
          subtitle="En los próximos 3 días"
          color="yellow"
        />

        <MetricCard
          icon={TrendingUp}
          title="Tendencia"
          value={metrics.productivityChange >= 0 ? '↗️' : '↘️'}
          subtitle={`${Math.abs(metrics.productivityChange).toFixed(1)}% ${
            metrics.productivityChange >= 0 ? 'mejora' : 'disminución'
          }`}
          color={metrics.productivityChange >= 0 ? 'green' : 'red'}
        />
      </div>
    </div>
  );
}