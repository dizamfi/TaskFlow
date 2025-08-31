'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProductivityChart } from '@/components/features/reports/ProductivityChart';
import { TaskDistributionChart } from '@/components/features/reports/TaskDistributionChart';
import { ReportsOverview } from '@/components/features/reports/ReportsOverview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTasks } from '@/hooks/useTasks';
import { 
  Download, 
  Filter, 
  Calendar, 
  BarChart3,
  TrendingUp,
  FileText,
  Mail
} from 'lucide-react';

type Period = 'week' | 'month' | 'year';

export default function ReportsPage() {
  const { tasks, loading } = useTasks();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');
  const [exportLoading, setExportLoading] = useState(false);

  const periods = [
    { value: 'week', label: 'Última semana', icon: Calendar },
    { value: 'month', label: 'Último mes', icon: Calendar },
    { value: 'year', label: 'Último año', icon: Calendar },
  ] as const;

  const handleExportReport = async (format: 'pdf' | 'excel' | 'email') => {
    setExportLoading(true);
    
    try {
      // Simular exportación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En producción aquí iría la lógica real de exportación
      console.log(`Exporting report as ${format} for period ${selectedPeriod}`);
      
      // Simular descarga
      alert(`Reporte exportado como ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Error exporting report:', error);
    } finally {
      setExportLoading(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="flex gap-2">
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-8 w-8" />
              Reportes y Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Análisis detallado de tu productividad y rendimiento
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Selector de período */}
            <div className="flex rounded-lg border">
              {periods.map((period) => (
                <Button
                  key={period.value}
                  variant={selectedPeriod === period.value ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`${
                    period.value === 'week' ? 'rounded-r-none border-r-0' :
                    period.value === 'year' ? 'rounded-l-none' : 'rounded-none border-r-0'
                  }`}
                >
                  {period.label}
                </Button>
              ))}
            </div>

            {/* Exportar reportes */}
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportReport('pdf')}
                loading={exportLoading}
                className="flex items-center gap-1"
              >
                <FileText className="h-3 w-3" />
                PDF
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportReport('excel')}
                loading={exportLoading}
                className="flex items-center gap-1"
              >
                <Download className="h-3 w-3" />
                Excel
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportReport('email')}
                loading={exportLoading}
                className="flex items-center gap-1"
              >
                <Mail className="h-3 w-3" />
                Email
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <ReportsOverview tasks={tasks} period={selectedPeriod} />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductivityChart tasks={tasks} period={selectedPeriod} />
          <TaskDistributionChart tasks={tasks} type="status" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskDistributionChart tasks={tasks} type="priority" />
          
          {/* Insights y Recomendaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Insights y Recomendaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <h4 className="font-semibold text-primary-900 mb-1">
                    💡 Recomendación de Productividad
                  </h4>
                  <p className="text-sm text-primary-700">
                    Tu mejor día para completar tareas es el martes. Considera programar las tareas más importantes ese día.
                  </p>
                </div>

                <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
                  <h4 className="font-semibold text-warning-900 mb-1">
                    ⚠️ Atención Requerida
                  </h4>
                  <p className="text-sm text-warning-700">
                    Tienes varias tareas de alta prioridad pendientes. Considera reorganizar tu agenda.
                  </p>
                </div>

                <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
                  <h4 className="font-semibold text-success-900 mb-1">
                    🎉 ¡Buen Trabajo!
                  </h4>
                  <p className="text-sm text-success-700">
                    Has completado un 85% de tus tareas este mes. ¡Mantén el ritmo!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exportar reportes detallado */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Necesitas un reporte más detallado?
              </h3>
              <p className="text-gray-600 mb-4">
                Exporta tus datos completos en diferentes formatos para análisis avanzado
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  onClick={() => handleExportReport('pdf')}
                  loading={exportLoading}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Descargar Reporte PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleExportReport('excel')}
                  loading={exportLoading}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Exportar a Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}