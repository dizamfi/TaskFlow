'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types';

interface ProgressChartProps {
  stats: DashboardStats;
}

export function ProgressChart({ stats }: ProgressChartProps) {
  const { completionRate, completedTasks, totalTasks } = stats;

  // Calcular ángulo para el gráfico circular
  const angle = (completionRate / 100) * 360;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Progreso General</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            {/* Círculo de fondo */}
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              {/* Círculo de progreso */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#10b981"
                strokeWidth="8"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
            
            {/* Texto central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(completionRate)}%
                </div>
                <div className="text-xs text-gray-500">
                  Completado
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {completedTasks} de {totalTasks} tareas completadas
          </p>
        </div>
        
        {/* Barra de progreso lineal como alternativa */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progreso</span>
            <span>{Math.round(completionRate)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-success-600 h-2 rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}