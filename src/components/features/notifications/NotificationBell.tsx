'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NotificationCenter } from './NotificationCenter';
import { Bell, BellRing } from 'lucide-react';

interface NotificationBellProps {
  className?: string;
}

export function NotificationBell({ className }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3); // Mock count
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  // Simular nuevas notificaciones
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular notificación aleatoria
      if (Math.random() < 0.1) { // 10% de probabilidad cada 10 segundos
        setUnreadCount(prev => prev + 1);
        setHasNewNotifications(true);
        
        // Limpiar la animación después de 3 segundos
        setTimeout(() => setHasNewNotifications(false), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleBellClick = () => {
    setIsOpen(true);
    setHasNewNotifications(false);
  };

  const handleNotificationClick = (notification: any) => {
    // Aquí puedes manejar el clic en una notificación específica
    // Por ejemplo, navegar a una tarea específica
    console.log('Notification clicked:', notification);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBellClick}
          className={`relative p-2 ${className}`}
        >
          {hasNewNotifications ? (
            <BellRing className="h-5 w-5 text-primary-600 animate-pulse" />
          ) : (
            <Bell className="h-5 w-5 text-gray-700" />
          )}
          
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 min-w-[20px]"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      <NotificationCenter
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNotificationClick={handleNotificationClick}
      />
    </>
  );
}