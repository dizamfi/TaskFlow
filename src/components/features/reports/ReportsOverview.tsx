// 'use client';

// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Task, TaskStatus } from '@/types';
// import { 
//   Target, 
//   Clock, 
//   TrendingUp, 
//   AlertTriangle,
//   Calendar,
//   CheckCircle2
// } from 'lucide-react';
// import { formatRelativeTime } from '@/lib/index';

// interface ReportsOverviewProps {
//   tasks: Task[];
//   period: 'week' | 'month' | 'year';
// }

// export function ReportsOverview({ tasks, period }: ReportsOverviewProps) {
//   // Calcular métricas basadas en el período
//   const calculateMetrics = () => {
//     const now = new Date();
//     let startDate = new Date();
    
//     switch (period) {
//       case 'week':
//         startDate.setDate(now.getDate() - 7);
//         break;
//       case 'month':
//         startDate.setMonth(now.getMonth() - 1);
//         break;
//       case 'year':
//         startDate.setFullYear(now.getFullYear() - 1);
//         break;
//     }

//     const periodTasks = tasks.filter(task => 
//       new Date(task.created_at) >= startDate
//     );

//     const completedTasks = periodTasks.filter(task => 
//       task.status === TaskStatus.COMPLETED
//     );

//     const overdueTasks = tasks.filter(task => 
//       task.due_date && 
//       new Date(task.due_date) < now && 
//       task.status !== TaskStatus.COMPLETED
//     );

//     const upcomingTasks = tasks.filter(task => {
//       if (!task.due_date || task.status === TaskStatus.COMPLETED) return false;
//       const dueDate = new Date(task.due_date);
//       const threeDaysFromNow = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
//       return dueDate >= now && dueDate <= threeDaysFromNow;
//     });

//     // Calcular tiempo promedio de completado
//     const completionTimes = completedTasks
//       .map(task => {
//         const created = new Date(task.created_at);
//         const updated = new Date(task.updated_at);
//         return updated.getTime() - created.getTime();
//       })
//       .filter(time => time > 0);

//     const avgCompletionTime = completionTimes.length > 0 
//       ? completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length
//       : 0;

//     const avgCompletionDays = Math.round(avgCompletionTime / (1000 * 60 * 60 * 24));

//     // Productividad comparada con período anterior
//     const prevStartDate = new Date(startDate);
//     const prevEndDate = new Date(startDate);
    
//     switch (period) {
//       case 'week':
//         prevStartDate.setDate(prevStartDate.getDate() - 7);
//         break;
//       case 'month':
//         prevStartDate.setMonth(prevStartDate.getMonth() - 1);
//         break;
//       case 'year':
//         prevStartDate.setFullYear(prevStartDate.getFullYear() - 1);
//         break;
//     }

//     const prevPeriodTasks = tasks.filter(task => {
//       const taskDate = new Date(task.created_at);
//       return taskDate >= prevStartDate && taskDate < startDate;
//     });

//     const prevCompletedTasks = prevPeriodTasks.filter(task => 
//       task.status === TaskStatus.COMPLETED
//     );

//     const productivityChange = prevCompletedTasks.length > 0
//       ? ((completedTasks.length - prevCompletedTasks.length) / prevCompletedTasks.length) * 100
//       : completedTasks.length > 0 ? 100 : 0;

//     return {
//       totalTasks: periodTasks.length,
//       completedTasks: completedTasks.length,
//       completionRate: periodTasks.length > 0 ? (completedTasks.length / periodTasks.length) * 100 : 0,
//       overdueTasks: overdueTasks.length,
//       upcomingTasks: upcomingTasks.length,
//       avgCompletionDays,
//       productivityChange,
//     };
//   };

//   const metrics = calculateMetrics();

//   const getPeriodLabel = () => {
//     switch (period) {
//       case 'week': return 'Esta semana';
//       case 'month': return 'Este mes';
//       case 'year': return 'Este año';
//       default: return 'Período';
//     }
//   };

//   const MetricCard = ({ 
//     icon: Icon, 
//     title, 
//     value, 
//     subtitle, 
//     color = 'blue',
//     trend,
//   }: {
//     icon: React.ElementType;
//     title: string;
//     value: string | number;
//     subtitle: string;
//     color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
//     trend?: { value: number; type: 'increase' | 'decrease' | 'neutral' };
//   }) => {
//     const colorClasses = {
//       blue: 'text-primary-600 bg-primary-50',
//       green: 'text-success-600 bg-success-50',
//       yellow: 'text-warning-600 bg-warning-50',
//       red: 'text-danger-600 bg-danger-50',
//       purple: 'text-purple-600 bg-purple-50',
//     };

//     return (
//       <Card className="hover:shadow-md transition-shadow">
//         <CardContent className="p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
//                 <Icon className="h-5 w-5" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">{title}</p>
//                 <p className="text-2xl font-bold text-gray-900">{value}</p>
//                 <p className="text-sm text-gray-500">{subtitle}</p>
//               </div>
//             </div>
            
//             {trend && (
//               <div className="text-right">
//                 <div className={`text-sm font-medium ${
//                   trend.type === 'increase' ? 'text-success-600' :
//                   trend.type === 'decrease' ? 'text-danger-600' : 'text-gray-500'
//                 }`}>
//                   {trend.type === 'increase' && '+'}
//                   {Math.abs(trend.value)}%
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   vs. período anterior
//                 </div>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Resumen de {getPeriodLabel()}
//         </h2>
//         <p className="text-gray-600">
//           Análisis detallado de tu productividad y rendimiento
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <MetricCard
//           icon={CheckCircle2}
//           title="Tareas Completadas"
//           value={metrics.completedTasks}
//           subtitle={`de ${metrics.totalTasks} tareas totales`}
//           color="green"
//           trend={{
//             value: Math.round(metrics.productivityChange),
//             type: metrics.productivityChange > 0 ? 'increase' : 
//                   metrics.productivityChange < 0 ? 'decrease' : 'neutral'
//           }}
//         />

//         <MetricCard
//           icon={Target}
//           title="Tasa de Completado"
//           value={`${Math.round(metrics.completionRate)}%`}
//           subtitle="Eficiencia general"
//           color="blue"
//         />

//         <MetricCard
//           icon={Clock}
//           title="Tiempo Promedio"
//           value={metrics.avgCompletionDays}
//           subtitle={`día${metrics.avgCompletionDays !== 1 ? 's' : ''} para completar`}
//           color="purple"
//         />

//         <MetricCard
//           icon={AlertTriangle}
//           title="Tareas Vencidas"
//           value={metrics.overdueTasks}
//           subtitle="Requieren atención"
//           color="red"
//         />

//         <MetricCard
//           icon={Calendar}
//           title="Próximas a Vencer"
//           value={metrics.upcomingTasks}
//           subtitle="En los próximos 3 días"
//           color="yellow"
//         />

//         <MetricCard
//           icon={TrendingUp}
//           title="Tendencia"
//           value={metrics.productivityChange >= 0 ? '↗️' : '↘️'}
//           subtitle={`${Math.abs(metrics.productivityChange).toFixed(1)}% ${
//             metrics.productivityChange >= 0 ? 'mejora' : 'disminución'
//           }`}
//           color={metrics.productivityChange >= 0 ? 'green' : 'red'}
//         />
//       </div>
//     </div>
//   );
// }




'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task, TaskStatus } from '@/types';
import { 
  Target, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  BarChart3,
  Award,
  Zap,
  Users,
  Globe
} from 'lucide-react';

interface ReportsOverviewProps {
  tasks: Task[];
  period: 'week' | 'month' | 'year';
}

export function ReportsOverview({ tasks, period }: ReportsOverviewProps) {
  // Calcular métricas basadas en el período
  const metrics = useMemo(() => {
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

    const avgCompletionDays = Math.round(avgCompletionTime / (1000 * 60 * 60 * 24)) || 0;

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

    // Análisis de patrones de trabajo
    const tasksByDay = completedTasks.reduce((acc, task) => {
      const day = new Date(task.updated_at).getDay();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const bestDayNumber = Object.entries(tasksByDay).reduce((best, [day, count]) => 
      count > (tasksByDay[parseInt(best)] || 0) ? day : best, '0'
    );

    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const bestDay = dayNames[parseInt(bestDayNumber)] || 'N/A';

    return {
      totalTasks: periodTasks.length,
      completedTasks: completedTasks.length,
      completionRate: periodTasks.length > 0 ? (completedTasks.length / periodTasks.length) * 100 : 0,
      overdueTasks: overdueTasks.length,
      upcomingTasks: upcomingTasks.length,
      avgCompletionDays,
      productivityChange,
      bestDay,
      bestDayCount: Math.max(...Object.values(tasksByDay), 0)
    };
  }, [tasks, period]);

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
    badge,
    gradient = false
  }: {
    icon: React.ElementType;
    title: string;
    value: string | number;
    subtitle: string;
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo' | 'emerald';
    trend?: 'increase' | 'decrease' | 'neutral';
    badge?: string;
    gradient?: boolean;
  }) => {
    const colorClasses = {
      blue: {
        bg: gradient ? 'bg-gradient-to-br from-blue-50 to-indigo-100' : 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'bg-gradient-to-br from-blue-500 to-blue-600',
        text: 'text-blue-900',
        subtitle: 'text-blue-700'
      },
      green: {
        bg: gradient ? 'bg-gradient-to-br from-emerald-50 to-green-100' : 'bg-emerald-50',
        border: 'border-emerald-200',
        icon: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
        text: 'text-emerald-900',
        subtitle: 'text-emerald-700'
      },
      yellow: {
        bg: gradient ? 'bg-gradient-to-br from-amber-50 to-yellow-100' : 'bg-amber-50',
        border: 'border-amber-200',
        icon: 'bg-gradient-to-br from-amber-500 to-amber-600',
        text: 'text-amber-900',
        subtitle: 'text-amber-700'
      },
      red: {
        bg: gradient ? 'bg-gradient-to-br from-red-50 to-rose-100' : 'bg-red-50',
        border: 'border-red-200',
        icon: 'bg-gradient-to-br from-red-500 to-red-600',
        text: 'text-red-900',
        subtitle: 'text-red-700'
      },
      purple: {
        bg: gradient ? 'bg-gradient-to-br from-purple-50 to-violet-100' : 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'bg-gradient-to-br from-purple-500 to-purple-600',
        text: 'text-purple-900',
        subtitle: 'text-purple-700'
      },
      indigo: {
        bg: gradient ? 'bg-gradient-to-br from-indigo-50 to-blue-100' : 'bg-indigo-50',
        border: 'border-indigo-200',
        icon: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
        text: 'text-indigo-900',
        subtitle: 'text-indigo-700'
      },
      emerald: {
        bg: gradient ? 'bg-gradient-to-br from-emerald-50 to-teal-100' : 'bg-emerald-50',
        border: 'border-emerald-200',
        icon: 'bg-gradient-to-br from-emerald-500 to-teal-600',
        text: 'text-emerald-900',
        subtitle: 'text-emerald-700'
      }
    };

    const colors = colorClasses[color];

    const getTrendIcon = () => {
      switch (trend) {
        case 'increase': return <TrendingUp className="h-3 w-3 text-emerald-600" />;
        case 'decrease': return <TrendingDown className="h-3 w-3 text-red-600" />;
        default: return null;
      }
    };

    return (
      <Card className={`${colors.bg} ${colors.border} border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 group overflow-hidden relative`}>
        {badge && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-white/80 text-gray-700">
              {badge}
            </Badge>
          </div>
        )}
        
        <CardContent className="p-4 relative">
          <div className="flex items-start justify-between mb-3">
            <div className={`flex items-center justify-center w-12 h-12 ${colors.icon} rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            {getTrendIcon()}
          </div>
          
          <div>
            <p className={`text-2xl font-bold ${colors.text} mb-1 group-hover:scale-110 transition-transform duration-300 origin-left`}>
              {value}
            </p>
            <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
            <p className={`text-xs ${colors.subtitle}`}>{subtitle}</p>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Resumen Ejecutivo</h2>
            <p className="text-sm text-gray-600">{getPeriodLabel()} - Métricas clave de rendimiento</p>
          </div>
        </div>

        {/* KPI Badge */}
        <div className="flex items-center gap-2">
          <Badge 
            variant={metrics.completionRate >= 80 ? "default" : metrics.completionRate >= 60 ? "secondary" : "destructive"}
            className="px-3 py-1 font-semibold"
          >
            {metrics.completionRate >= 80 ? "🚀 Excelente" : 
             metrics.completionRate >= 60 ? "⚡ Bueno" : "⚠️ Mejorable"}
          </Badge>
        </div>
      </div>

      {/* Grid principal de métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          icon={Target}
          title="Tareas Completadas"
          value={metrics.completedTasks}
          subtitle={`De ${metrics.totalTasks} tareas creadas`}
          color="emerald"
          trend={metrics.productivityChange > 0 ? 'increase' : metrics.productivityChange < 0 ? 'decrease' : 'neutral'}
          gradient
        />

        <MetricCard
          icon={BarChart3}
          title="Tasa de Completado"
          value={`${Math.round(metrics.completionRate)}%`}
          subtitle="Eficiencia general"
          color="blue"
          badge={metrics.completionRate >= 80 ? "Óptimo" : undefined}
          gradient
        />

        <MetricCard
          icon={Clock}
          title="Tiempo Promedio"
          value={metrics.avgCompletionDays || "N/A"}
          subtitle={metrics.avgCompletionDays ? `día${metrics.avgCompletionDays !== 1 ? 's' : ''} para completar` : "Sin datos suficientes"}
          color="purple"
          gradient
        />

        <MetricCard
          icon={AlertTriangle}
          title="Tareas Vencidas"
          value={metrics.overdueTasks}
          subtitle="Requieren atención inmediata"
          color="red"
          trend={metrics.overdueTasks > 0 ? 'increase' : 'neutral'}
          gradient
        />

        <MetricCard
          icon={Calendar}
          title="Próximas a Vencer"
          value={metrics.upcomingTasks}
          subtitle="En los próximos 3 días"
          color="yellow"
          gradient
        />

        <MetricCard
          icon={Award}
          title="Mejor Día"
          value={metrics.bestDay}
          subtitle={`${metrics.bestDayCount} tareas completadas`}
          color="indigo"
          badge="Top"
          gradient
        />
      </div>

      {/* Sección de insights y análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card de tendencias */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <TrendingUp className="h-5 w-5" />
              Análisis de Tendencias
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
              <div>
                <p className="font-semibold text-blue-900">Cambio de Productividad</p>
                <p className="text-sm text-blue-700">Comparado con el período anterior</p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${metrics.productivityChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {metrics.productivityChange >= 0 ? '+' : ''}{metrics.productivityChange.toFixed(1)}%
                </p>
                <div className="flex items-center gap-1 justify-end">
                  {metrics.productivityChange >= 0 ? 
                    <TrendingUp className="h-4 w-4 text-emerald-600" /> : 
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  }
                  <span className={`text-sm ${metrics.productivityChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {metrics.productivityChange >= 0 ? 'Mejorando' : 'Disminuyendo'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-800">Progreso hacia la meta</span>
                <span className="font-semibold text-blue-900">{Math.round(metrics.completionRate)}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: `${Math.min(metrics.completionRate, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-blue-700 mt-1">
                {metrics.completionRate >= 90 ? "🏆 ¡Rendimiento excepcional!" :
                 metrics.completionRate >= 70 ? "⭐ Buen ritmo de trabajo" :
                 metrics.completionRate >= 50 ? "📈 En camino hacia la meta" :
                 "🎯 Oportunidad de mejora"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card de insights */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-100 overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-emerald-900">
              <Zap className="h-5 w-5" />
              Insights Inteligentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {/* Insight 1: Mejor día */}
              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-emerald-500 rounded-full flex-shrink-0">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-emerald-900 text-sm">Patrón Óptimo</p>
                  <p className="text-emerald-800 text-xs">
                    Tu mejor día es <strong>{metrics.bestDay}</strong> con {metrics.bestDayCount} tareas completadas
                  </p>
                </div>
              </div>

              {/* Insight 2: Eficiencia */}
              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full flex-shrink-0">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-emerald-900 text-sm">Estado de Eficiencia</p>
                  <p className="text-emerald-800 text-xs">
                    {metrics.completionRate >= 80 ? "Mantienes un ritmo excelente de trabajo" :
                     metrics.completionRate >= 60 ? "Tu productividad está en buen nivel" :
                     "Hay oportunidades para optimizar tu flujo de trabajo"}
                  </p>
                </div>
              </div>

              {/* Insight 3: Recomendación */}
              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-purple-500 rounded-full flex-shrink-0">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-emerald-900 text-sm">Recomendación</p>
                  <p className="text-emerald-800 text-xs">
                    {metrics.overdueTasks > 0 ? "Prioriza las tareas vencidas para recuperar el ritmo" :
                     metrics.upcomingTasks > 5 ? "Considera redistribuir la carga de trabajo próxima" :
                     metrics.productivityChange < -10 ? "Revisa tu planificación para la próxima semana" :
                     "¡Sigue así! Tu gestión de tareas es efectiva"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="border-t border-emerald-200 pt-3 mt-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-xl font-bold text-emerald-900">{metrics.totalTasks}</p>
                  <p className="text-xs text-emerald-700">Total {getPeriodLabel().toLowerCase()}</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-emerald-900">
                    {Math.round((metrics.completedTasks / Math.max(metrics.totalTasks, 1)) * 100)}%
                  </p>
                  <p className="text-xs text-emerald-700">Tasa de éxito</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}