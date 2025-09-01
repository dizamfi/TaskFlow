// 'use client';

// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Task } from '@/types';
// import { TrendingUp, Calendar } from 'lucide-react';

// interface ProductivityChartProps {
//   tasks: Task[];
//   period: 'week' | 'month' | 'year';
// }

// export function ProductivityChart({ tasks, period }: ProductivityChartProps) {
//   // Generar datos según el período
//   const generateChartData = () => {
//     const now = new Date();
//     let days = 7;
//     let formatOptions: Intl.DateTimeFormatOptions = { weekday: 'short' };
    
//     switch (period) {
//       case 'month':
//         days = 30;
//         formatOptions = { day: 'numeric' };
//         break;
//       case 'year':
//         days = 365;
//         formatOptions = { month: 'short' };
//         break;
//       default:
//         days = 7;
//     }

//     const periods = Array.from({ length: period === 'year' ? 12 : days }, (_, i) => {
//       const date = new Date(now);
      
//       if (period === 'year') {
//         date.setMonth(date.getMonth() - (11 - i));
//         date.setDate(1);
//       } else {
//         date.setDate(date.getDate() - (days - 1 - i));
//       }
      
//       return date;
//     });

//     return periods.map(date => {
//       const start = new Date(date);
//       const end = new Date(date);
      
//       if (period === 'year') {
//         end.setMonth(end.getMonth() + 1);
//       } else {
//         end.setDate(end.getDate() + 1);
//       }

//       const periodTasks = tasks.filter(task => {
//         const taskDate = new Date(task.updated_at);
//         return taskDate >= start && taskDate < end && task.status === 'completed';
//       });

//       return {
//         date: date.toLocaleDateString('es-ES', formatOptions),
//         completed: periodTasks.length,
//         total: tasks.filter(task => {
//           const taskDate = new Date(task.created_at);
//           return taskDate >= start && taskDate < end;
//         }).length,
//       };
//     });
//   };

//   const chartData = generateChartData();
//   const maxCompleted = Math.max(...chartData.map(d => d.completed), 1);
//   const totalCompleted = chartData.reduce((sum, d) => sum + d.completed, 0);
//   const totalTasks = chartData.reduce((sum, d) => sum + d.total, 0);
//   const completionRate = totalTasks > 0 ? (totalCompleted / totalTasks) * 100 : 0;

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <TrendingUp className="h-5 w-5" />
//             Productividad - {period === 'week' ? 'Semanal' : period === 'month' ? 'Mensual' : 'Anual'}
//           </div>
//           <div className="text-sm text-gray-600">
//             {Math.round(completionRate)}% completado
//           </div>
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {/* Gráfico de barras */}
//           <div className="flex items-end justify-between h-40 gap-1 bg-gray-50 rounded-lg p-4">
//             {chartData.map((data, index) => {
//               const height = (data.completed / maxCompleted) * 100;
//               return (
//                 <div key={index} className="flex flex-col items-center flex-1 group">
//                   <div 
//                     className="w-full bg-primary-500 rounded-t transition-all duration-500 ease-in-out hover:bg-primary-600 min-h-[4px] relative group-hover:shadow-lg"
//                     style={{ height: `${Math.max(height, 4)}%` }}
//                     title={`${data.completed} tareas completadas`}
//                   >
//                     {/* Tooltip */}
//                     <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity mb-1 whitespace-nowrap">
//                       {data.completed} completadas
//                       <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-900"></div>
//                     </div>
//                   </div>
//                   <span className="text-xs text-gray-600 mt-2 font-medium">
//                     {data.date}
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     {data.completed}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
          
//           {/* Estadísticas */}
//           <div className="grid grid-cols-3 gap-4 pt-4 border-t">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-primary-600">{totalCompleted}</div>
//               <div className="text-sm text-gray-600">Completadas</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-gray-900">{totalTasks}</div>
//               <div className="text-sm text-gray-600">Total</div>
//             </div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-success-600">{Math.round(completionRate)}%</div>
//               <div className="text-sm text-gray-600">Tasa de éxito</div>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }




'use client';

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Task, TaskStatus } from '@/types';
import { 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  Activity,
  Target,
  Zap,
  Award,
  ChevronDown,
  Info
} from 'lucide-react';

interface ProductivityChartProps {
  tasks: Task[];
  period: 'week' | 'month' | 'year';
}

export function ProductivityChart({ tasks, period }: ProductivityChartProps) {
  const [viewType, setViewType] = useState<'bar' | 'line'>('bar');
  const [showDetails, setShowDetails] = useState(false);

  // Generar datos según el período
  const chartData = useMemo(() => {
    const now = new Date();
    let periods: Date[] = [];
    let formatOptions: Intl.DateTimeFormatOptions = { weekday: 'short' };
    
    switch (period) {
      case 'week':
        periods = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(now);
          date.setDate(date.getDate() - (6 - i));
          return date;
        });
        formatOptions = { weekday: 'short' };
        break;
        
      case 'month':
        periods = Array.from({ length: 30 }, (_, i) => {
          const date = new Date(now);
          date.setDate(date.getDate() - (29 - i));
          return date;
        });
        formatOptions = { day: 'numeric', month: 'short' };
        break;
        
      case 'year':
        periods = Array.from({ length: 12 }, (_, i) => {
          const date = new Date(now);
          date.setMonth(date.getMonth() - (11 - i));
          date.setDate(1);
          return date;
        });
        formatOptions = { month: 'short', year: '2-digit' };
        break;
    }

    return periods.map((date, index) => {
      const start = new Date(date);
      const end = new Date(date);
      
      if (period === 'year') {
        end.setMonth(end.getMonth() + 1);
      } else {
        end.setDate(end.getDate() + 1);
      }

      const periodTasks = tasks.filter(task => {
        const taskDate = new Date(task.created_at);
        return taskDate >= start && taskDate < end;
      });

      const completedTasks = periodTasks.filter(task => task.status === TaskStatus.COMPLETED);
      const inProgressTasks = periodTasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
      
      return {
        period: date.toLocaleDateString('es-ES', formatOptions),
        fullDate: date.toLocaleDateString('es-ES'),
        completed: completedTasks.length,
        inProgress: inProgressTasks.length,
        total: periodTasks.length,
        efficiency: periodTasks.length > 0 ? (completedTasks.length / periodTasks.length) * 100 : 0,
        index
      };
    });
  }, [tasks, period]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    const totalCompleted = chartData.reduce((sum, d) => sum + d.completed, 0);
    const totalTasks = chartData.reduce((sum, d) => sum + d.total, 0);
    const avgDaily = totalCompleted / chartData.length;
    const maxDaily = Math.max(...chartData.map(d => d.completed));
    const bestDay = chartData.find(d => d.completed === maxDaily);
    const trend = chartData.length >= 2 
      ? chartData.slice(-3).reduce((sum, d) => sum + d.completed, 0) / 3 - 
        chartData.slice(0, 3).reduce((sum, d) => sum + d.completed, 0) / 3
      : 0;

    return {
      totalCompleted,
      totalTasks,
      avgDaily: Number(avgDaily.toFixed(1)),
      maxDaily,
      bestDay: bestDay?.period || 'N/A',
      trend: Number(trend.toFixed(1)),
      efficiency: totalTasks > 0 ? Number(((totalCompleted / totalTasks) * 100).toFixed(1)) : 0
    };
  }, [chartData]);

  const maxValue = Math.max(...chartData.map(d => Math.max(d.completed, d.inProgress, d.total)), 1);

  const getPeriodTitle = () => {
    switch (period) {
      case 'week': return 'Últimos 7 días';
      case 'month': return 'Últimos 30 días';
      case 'year': return 'Últimos 12 meses';
      default: return 'Productividad';
    }
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-emerald-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return '📈';
    if (trend < 0) return '📉';
    return '➡️';
  };

  return (
    <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-white to-blue-50/30">
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-900">
                Productividad - {getPeriodTitle()}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Análisis de rendimiento y tendencias
              </p>
            </div>
          </div>

          {/* Controles de vista */}
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-blue-200 bg-white p-1">
              <Button
                variant={viewType === 'bar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewType('bar')}
                className={`h-8 px-3 ${viewType === 'bar' ? 'bg-blue-500 text-white' : 'hover:bg-blue-50'}`}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewType === 'line' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewType('line')}
                className={`h-8 px-3 ${viewType === 'line' ? 'bg-blue-500 text-white' : 'hover:bg-blue-50'}`}
              >
                <Activity className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-medium text-gray-600">Total</span>
            </div>
            <p className="text-lg font-bold text-gray-900 mt-1">{stats.totalCompleted}</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm border border-emerald-100">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-medium text-gray-600">Promedio</span>
            </div>
            <p className="text-lg font-bold text-gray-900 mt-1">{stats.avgDaily}</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-100">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-500" />
              <span className="text-xs font-medium text-gray-600">Mejor día</span>
            </div>
            <p className="text-lg font-bold text-gray-900 mt-1">{stats.maxDaily}</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm border border-amber-100">
            <div className="flex items-center gap-2">
              <TrendingUp className={`h-4 w-4 ${getTrendColor(stats.trend)}`} />
              <span className="text-xs font-medium text-gray-600">Tendencia</span>
            </div>
            <p className={`text-lg font-bold mt-1 ${getTrendColor(stats.trend)}`}>
              {getTrendIcon(stats.trend)} {Math.abs(stats.trend)}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Gráfico Principal */}
        <div className="relative">
          {/* Vista de barras */}
          {viewType === 'bar' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>Tareas completadas por {period === 'year' ? 'mes' : 'día'}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Completadas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-amber-500 rounded"></div>
                    <span>En progreso</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-300 rounded"></div>
                    <span>Total</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {chartData.map((data, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span className="font-medium min-w-[60px]">{data.period}</span>
                      <span className="text-blue-600 font-medium">{data.completed}/{data.total}</span>
                    </div>
                    
                    <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                      {/* Barra total (fondo) */}
                      <div 
                        className="absolute top-0 left-0 h-full bg-gray-200 rounded-lg transition-all duration-700"
                        style={{ 
                          width: `${(data.total / maxValue) * 100}%`,
                          animationDelay: `${index * 50}ms`
                        }}
                      />
                      
                      {/* Barra en progreso */}
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg transition-all duration-700"
                        style={{ 
                          width: `${((data.completed + data.inProgress) / maxValue) * 100}%`,
                          animationDelay: `${index * 50 + 100}ms`
                        }}
                      />
                      
                      {/* Barra completadas */}
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all duration-700 shadow-sm"
                        style={{ 
                          width: `${(data.completed / maxValue) * 100}%`,
                          animationDelay: `${index * 50 + 200}ms`
                        }}
                      />

                      {/* Indicador de eficiencia */}
                      {data.efficiency >= 80 && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <span className="text-xs">🔥</span>
                        </div>
                      )}
                    </div>

                    {/* Tooltip hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1">
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>Eficiencia: {data.efficiency.toFixed(1)}%</span>
                        {data.efficiency >= 80 && <span className="text-emerald-600 font-medium">Excelente!</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vista de línea */}
          {viewType === 'line' && (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                Tendencia de productividad - {getPeriodTitle().toLowerCase()}
              </div>
              
              <div className="relative h-64 bg-gradient-to-b from-blue-50 to-white rounded-lg p-4">
                {/* Grid lines */}
                <div className="absolute inset-4 grid grid-rows-4 opacity-20">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="border-t border-gray-300"></div>
                  ))}
                </div>

                {/* Line chart simulation */}
                <svg className="absolute inset-4 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Area under curve */}
                  <path
                    d={`M 0,${100 - (chartData[0]?.completed || 0) / maxValue * 80} ${chartData
                      .map((d, i) => `L ${(i / (chartData.length - 1)) * 100},${100 - (d.completed / maxValue) * 80}`)
                      .join(' ')} L 100,100 L 0,100 Z`}
                    fill="url(#lineGradient)"
                    className="animate-in fade-in duration-1000"
                  />
                  
                  {/* Main line */}
                  <path
                    d={`M 0,${100 - (chartData[0]?.completed || 0) / maxValue * 80} ${chartData
                      .map((d, i) => `L ${(i / (chartData.length - 1)) * 100},${100 - (d.completed / maxValue) * 80}`)
                      .join(' ')}`}
                    stroke="#3b82f6"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-in fade-in duration-1000 delay-300"
                    style={{ strokeDasharray: '1000', strokeDashoffset: '1000', animation: 'drawLine 2s ease-out forwards' }}
                  />
                  
                  {/* Data points */}
                  {chartData.map((d, i) => (
                    <circle
                      key={i}
                      cx={(i / (chartData.length - 1)) * 100}
                      cy={100 - (d.completed / maxValue) * 80}
                      r="3"
                      fill="#ffffff"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      className="animate-in zoom-in duration-300"
                      style={{ animationDelay: `${i * 100 + 500}ms` }}
                    />
                  ))}
                </svg>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-4 right-4 flex justify-between text-xs text-gray-500">
                  {chartData.filter((_, i) => i % Math.ceil(chartData.length / 6) === 0).map((d, i) => (
                    <span key={i}>{d.period}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panel expandible de detalles */}
        <div className="mt-6 border-t border-gray-100 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full justify-between text-gray-600 hover:text-gray-900"
          >
            <span className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Análisis detallado
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} />
          </Button>

          {showDetails && (
            <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Insights</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Mejor día: <strong>{stats.bestDay}</strong> con {stats.maxDaily} tareas</li>
                    <li>• Eficiencia promedio: <strong>{stats.efficiency}%</strong></li>
                    <li>• Tendencia: {stats.trend >= 0 ? 'Mejorando' : 'Necesita atención'}</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-100">
                  <h4 className="font-semibold text-emerald-900 mb-2">🎯 Recomendaciones</h4>
                  <ul className="text-sm text-emerald-800 space-y-1">
                    {stats.efficiency < 70 && <li>• Revisa la carga de trabajo diaria</li>}
                    {stats.trend < 0 && <li>• Considera optimizar tu rutina</li>}
                    {stats.avgDaily < 2 && <li>• Establece metas más alcanzables</li>}
                    {stats.efficiency >= 80 && <li>• ¡Excelente ritmo! Mantén la consistencia</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}