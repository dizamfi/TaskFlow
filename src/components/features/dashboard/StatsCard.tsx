'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  description?: string;
  onClick?: () => void;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = 'blue',
  description,
  onClick 
}: StatsCardProps) {
  const colorClasses = {
    blue: 'text-primary-600 bg-primary-50',
    green: 'text-success-600 bg-success-50',
    yellow: 'text-warning-600 bg-warning-50',
    red: 'text-danger-600 bg-danger-50',
    purple: 'text-purple-600 bg-purple-50',
  };

  const changeColors = {
    increase: 'text-success-600',
    decrease: 'text-danger-600',
    neutral: 'text-gray-500',
  };

  return (
    <Card 
      className={cn(
        "hover:shadow-md transition-shadow",
        onClick && "cursor-pointer hover:shadow-lg"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", colorClasses[color])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {value.toLocaleString()}
        </div>
        
        {change && (
          <div className="flex items-center text-xs">
            <span className={cn("font-medium", changeColors[change.type])}>
              {change.type === 'increase' && '+'}
              {change.value}%
            </span>
            <span className="text-gray-500 ml-1">vs. semana anterior</span>
          </div>
        )}
        
        {description && (
          <p className="text-xs text-gray-500 mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}