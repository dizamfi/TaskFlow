// 'use client';

// import React, { useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { UserMenu } from '@/components/features/auth';
// import { NotificationBell } from '@/components/features/notifications';
// import { 
//   Home, 
//   CheckSquare, 
//   Calendar, 
//   BarChart3, 
//   Settings,
//   Menu,
//   X
// } from 'lucide-react';

// interface AppLayoutProps {
//   children: React.ReactNode;
// }

// export function AppLayout({ children }: AppLayoutProps) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();

//   const navigation = [
//     { name: 'Dashboard', href: '/', icon: Home },
//     { name: 'Tareas', href: '/tasks', icon: CheckSquare },
//     { name: 'Calendario', href: '/calendar', icon: Calendar },
//     { name: 'Reportes', href: '/reports', icon: BarChart3 },
//     { name: 'Perfil', href: '/profile', icon: Settings },
//   ];

//   const handleNavigation = (href: string) => {
//     router.push(href);
//     setSidebarOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile sidebar backdrop */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         >
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
//         </div>
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
//         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//         lg:translate-x-0 lg:static lg:inset-0
//       `}>
//         <div className="flex items-center justify-between h-16 px-6 border-b">
//           <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden"
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
        
//         <nav className="mt-6 px-3">
//           <div className="space-y-1">
//             {navigation.map((item) => {
//               const isActive = pathname === item.href;
//               return (
//                 <button
//                   key={item.name}
//                   onClick={() => handleNavigation(item.href)}
//                   className={`
//                     group flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors
//                     ${isActive 
//                       ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
//                       : 'text-gray-700 hover:bg-gray-50'
//                     }
//                   `}
//                 >
//                   <item.icon className={`
//                     mr-3 h-5 w-5 flex-shrink-0
//                     ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'}
//                   `} />
//                   {item.name}
//                 </button>
//               );
//             })}
//           </div>
//         </nav>
//       </div>

//       {/* Main content */}
//       <div className="lg:pl-64">
//         {/* Top bar */}
//         <div className="sticky top-0 z-40 flex h-16 bg-white border-b border-gray-200 lg:border-none">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setSidebarOpen(true)}
//             className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
//           >
//             <Menu className="h-6 w-6" />
//           </Button>
          
//           <div className="flex flex-1 justify-end items-center px-4 sm:px-6 gap-3">
//             {/* Campana de Notificaciones */}
//             <NotificationBell />
            
//             {/* Menú de Usuario */}
//             <UserMenu />
//           </div>
//         </div>

//         {/* Page content */}
//         <main className="flex-1">
//           <div className="py-6 px-4 sm:px-6 lg:px-8">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }





// 'use client';

// import React, { useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';
// import { AuthService } from '@/lib/supabase/auth';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/toast';
// import { 
//   Home, 
//   CheckSquare, 
//   Calendar, 
//   BarChart3, 
//   Settings,
//   Menu,
//   X,
//   LogOut,
//   Bell,
//   User,
//   Search,
//   Plus,
//   ChevronDown,
//   Zap,
//   TrendingUp
// } from 'lucide-react';

// interface AppLayoutProps {
//   children: React.ReactNode;
// }

// export function AppLayout({ children }: AppLayoutProps) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const { user } = useAuth();
//   const { addToast } = useToast();
//   const router = useRouter();
//   const pathname = usePathname();

//   const navigation = [
//     { name: 'Dashboard', href: '/', icon: Home, badge: null },
//     { name: 'Tareas', href: '/tasks', icon: CheckSquare, badge: '12' },
//     { name: 'Calendario', href: '/calendar', icon: Calendar, badge: null },
//     { name: 'Reportes', href: '/reports', icon: BarChart3, badge: null },
//     { name: 'Perfil', href: '/profile', icon: Settings, badge: null },
//   ];

//   const handleNavigation = (href: string) => {
//     router.push(href);
//     setSidebarOpen(false);
//   };

//   const handleLogout = async () => {
//     try {
//       await AuthService.signOut();
//       addToast({
//         title: 'Sesión cerrada',
//         message: 'Has cerrado sesión correctamente',
//         type: 'success',
//       });
//       router.push('/auth/signin');
//     } catch (error) {
//       console.error('Error al cerrar sesión:', error);
//       addToast({
//         title: 'Error',
//         message: 'No se pudo cerrar la sesión',
//         type: 'error',
//       });
//     }
//     setShowUserMenu(false);
//   };

//   return (
//     <div className="h-screen bg-white overflow-hidden flex">
//       {/* Mobile sidebar backdrop */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 z-50 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         >
//           <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
//         </div>
//       )}

//         {/* Sidebar */}
//         <div className={`
//           fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl
//           transform transition-all duration-300 ease-out
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//           lg:translate-x-0 lg:relative lg:flex lg:flex-col
//         `}>
//           {/* Logo Section */}
//           <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
//             <div className="flex items-center gap-3">
//               <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 relative overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
//                 <Zap className="w-6 h-6 text-white relative z-10" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
//                   TaskFlow
//                 </h1>
//                 <p className="text-xs text-slate-500 font-medium">Gestión Inteligente</p>
//               </div>
//             </div>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setSidebarOpen(false)}
//               className="lg:hidden hover:bg-slate-100 rounded-xl p-2"
//             >
//               <X className="h-5 w-5" />
//             </Button>
//           </div>

        
          
//           {/* Navigation */}
//           <nav className="flex-1 px-4 py-2 pt-5 overflow-y-auto">
//             <div className="space-y-1">
//               {navigation.map((item) => {
//                 const isActive = pathname === item.href;
//                 return (
//                   <div key={item.name} className="relative">
//                     <button
//                       onClick={() => handleNavigation(item.href)}
//                       className={`
//                         group flex items-center w-full px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-200 relative overflow-hidden
//                         ${isActive 
//                           ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
//                           : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm'
//                         }
//                       `}
//                     >
//                       {isActive && (
//                         <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
//                       )}
//                       <item.icon className={`
//                         mr-3 h-5 w-5 flex-shrink-0 transition-all duration-200 relative z-10
//                         ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}
//                       `} />
//                       <span className="relative z-10 flex-1 text-left">{item.name}</span>
//                       {item.badge && (
//                         <span className={`
//                           relative z-10 ml-2 px-2 py-1 text-xs font-bold rounded-full
//                           ${isActive 
//                             ? 'bg-white/20 text-white' 
//                             : 'bg-blue-100 text-blue-600'
//                           }
//                         `}>
//                           {item.badge}
//                         </span>
//                       )}
//                       {isActive && (
//                         <div className="ml-auto relative z-10">
//                           <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                         </div>
//                       )}
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Quick Stats */}
//             <div className="mt-8 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
//               <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
//                 Esta Semana
//               </h3>
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-slate-600">Completadas</span>
//                   <span className="text-sm font-bold text-green-600">28</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm text-slate-600">En progreso</span>
//                   <span className="text-sm font-bold text-blue-600">5</span>
//                 </div>
//                 <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
//                   <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
//                 </div>
//                 <p className="text-xs text-slate-500 text-center">75% completado</p>
//               </div>
//             </div>
//           </nav>

         
//         </div>

//         {/* Main content */}
//         <div className="flex-1 flex flex-col min-w-0 ml-4">
//           {/* Top Header - Integrado sin separación */}
//           <header className="    rounded-t-2xl">
//             <div className="px-6 lg:px-8">
//               <div className="flex justify-between items-center h-20">
//                 {/* Mobile menu button */}
//                 <div className="lg:hidden">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setSidebarOpen(true)}
//                     className="hover:bg-slate-100 rounded-xl p-2"
//                   >
//                     <Menu className="h-5 w-5" />
//                   </Button>
//                 </div>

//                 {/* Título de página o breadcrumb */}
//                 <div className="flex-1">
//                   <h1 className="text-xl font-semibold text-slate-900">
//                     {pathname === '/' && ''}
//                     {pathname === '/tasks' && ''}
//                     {pathname === '/calendar' && ''}
//                     {pathname === '/reports' && ''}
//                     {pathname === '/profile' && ''}
//                   </h1>
//                 </div>

//                 {/* Right side actions */}
//                 <div className="flex items-center space-x-4">
//                   {/* Notifications */}
//                   <div className="relative">
//                     <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all duration-200 relative">
//                       <Bell className="h-5 w-5" />
//                     </button>
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
//                       4
//                     </span>
//                   </div>

//                   {/* User Menu en Header */}
//                   <div className="relative">
//                     <button
//                       onClick={() => setShowUserMenu(!showUserMenu)}
//                       className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-all duration-200"
//                     >
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md relative overflow-hidden">
//                         <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
//                         <span className="text-sm font-bold text-white relative z-10">
//                           {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
//                         </span>
//                       </div>
//                       <div className="hidden md:block text-left">
//                         <p className="text-sm font-medium text-slate-900">
//                           {user?.full_name || 'Usuario'}
//                         </p>
//                       </div>
//                       <ChevronDown className="h-4 w-4 text-slate-400" />
//                     </button>

//                     {/* User Dropdown en Header */}
//                     {showUserMenu && (
//                       <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
//                         <div className="py-2">
//                           <div className="px-4 py-3 border-b border-slate-100">
//                             <p className="text-sm font-medium text-slate-900">{user?.full_name || 'Usuario'}</p>
//                             <p className="text-sm text-slate-500">{user?.email}</p>
//                           </div>
//                           <button
//                             onClick={() => {
//                               handleNavigation('/profile');
//                               setShowUserMenu(false);
//                             }}
//                             className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
//                           >
//                             <User className="h-4 w-4 mr-3 text-slate-400" />
//                             Ver Perfil
//                           </button>
//                           <button
//                             onClick={() => {
//                               handleNavigation('/settings');
//                               setShowUserMenu(false);
//                             }}
//                             className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
//                           >
//                             <Settings className="h-4 w-4 mr-3 text-slate-400" />
//                             Configuración
//                           </button>
//                           <div className="border-t border-slate-100 mt-1 pt-1">
//                             <button
//                               onClick={handleLogout}
//                               className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                             >
//                               <LogOut className="h-4 w-4 mr-3" />
//                               Cerrar Sesión
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Page content - SIN padding superior, pegado al header */}
//           <main className="flex-1 overflow-hidden bg-white rounded-br-2xl">
//             <div className="h-full overflow-y-auto">
//               {children}
//             </div>
//           </main>
//         </div>

//       {/* Click outside to close user menu */}
//       {showUserMenu && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setShowUserMenu(false)}
//         />
//       )}
//     </div>
//   );
// }







'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTasks } from '@/hooks/useTasks';
import { AuthService } from '@/lib/supabase/auth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { 
  Home, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  User,
  ChevronDown,
  Zap,
  Clock,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  taskId?: string;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const { user } = useAuth();
  const { addToast } = useToast();
  const { tasks, stats, loading } = useTasks();
  const router = useRouter();
  const pathname = usePathname();

  // Generar notificaciones basadas en tareas
  useEffect(() => {
    if (!tasks.length) return;

    const now = new Date();
    const newNotifications: Notification[] = [];

    tasks.forEach(task => {
      if (!task.due_date) return;
      
      const dueDate = new Date(task.due_date);
      const timeDiff = dueDate.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      // Tareas que vencen en las próximas 24 horas
      if (hoursDiff > 0 && hoursDiff <= 24 && task.status !== 'completed') {
        const hoursLeft = Math.round(hoursDiff);
        newNotifications.push({
          id: `reminder-${task.id}`,
          type: 'reminder',
          title: 'Tarea próxima a vencer',
          message: `"${task.title}" vence en ${hoursLeft} hora${hoursLeft !== 1 ? 's' : ''}`,
          timestamp: now.toISOString(),
          read: false,
          taskId: task.id,
        });
      }

      // Tareas vencidas
      if (dueDate < now && task.status !== 'completed') {
        const daysPassed = Math.floor(-hoursDiff / 24);
        newNotifications.push({
          id: `overdue-${task.id}`,
          type: 'warning',
          title: 'Tarea vencida',
          message: `"${task.title}" venció hace ${daysPassed} día${daysPassed !== 1 ? 's' : ''}`,
          timestamp: now.toISOString(),
          read: false,
          taskId: task.id,
        });
      }
    });

    // Notificaciones de progreso
    if (stats.completedTasks > 0) {
      const completionRate = Math.round(stats.completionRate);
      if (completionRate >= 80) {
        newNotifications.push({
          id: `progress-${Date.now()}`,
          type: 'success',
          title: '¡Excelente progreso!',
          message: `Has completado ${completionRate}% de tus tareas`,
          timestamp: now.toISOString(),
          read: false,
        });
      }
    }

    setNotifications(newNotifications);
  }, [tasks, stats]);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, badge: null },
    { name: 'Tareas', href: '/tasks', icon: CheckSquare, badge: stats.pendingTasks > 0 ? stats.pendingTasks.toString() : null },
    { name: 'Calendario', href: '/calendar', icon: Calendar, badge: null },
    { name: 'Reportes', href: '/reports', icon: BarChart3, badge: null },
    { name: 'Perfil', href: '/profile', icon: Settings, badge: null },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      addToast({
        title: 'Sesión cerrada',
        message: 'Has cerrado sesión correctamente',
        type: 'success',
      });
      router.push('/auth/signin');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      addToast({
        title: 'Error',
        message: 'No se pudo cerrar la sesión',
        type: 'error',
      });
    }
    setShowUserMenu(false);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const handleNotificationClick = (notification: Notification) => {
    markNotificationAsRead(notification.id);
    
    // Si la notificación tiene un taskId, navegar a tareas
    if (notification.taskId) {
      handleNavigation('/tasks');
    }
    
    setShowNotifications(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'reminder': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'error': return <X className="h-4 w-4 text-red-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="h-screen bg-white overflow-hidden flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl
        transform transition-all duration-300 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:flex lg:flex-col
      `}>
        {/* Logo Section */}
        <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <Zap className="w-6 h-6 text-white relative z-10" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-xs text-slate-500 font-medium">Gestión Inteligente</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden hover:bg-slate-100 rounded-xl p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 pt-5 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`
                      group flex items-center w-full px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-200 relative overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm'
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                    )}
                    <item.icon className={`
                      mr-3 h-5 w-5 flex-shrink-0 transition-all duration-200 relative z-10
                      ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}
                    `} />
                    <span className="relative z-10 flex-1 text-left">{item.name}</span>
                    {item.badge && (
                      <span className={`
                        relative z-10 ml-2 px-2 py-1 text-xs font-bold rounded-full animate-pulse
                        ${isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-blue-100 text-blue-600'
                        }
                      `}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <div className="ml-auto relative z-10">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Stats en tiempo real */}
          <div className="mt-8 p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Estadísticas {loading && <span className="animate-pulse">●</span>}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Completadas</span>
                <span className="text-sm font-bold text-green-600">{stats.completedTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">En progreso</span>
                <span className="text-sm font-bold text-blue-600">{stats.inProgressTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Pendientes</span>
                <span className="text-sm font-bold text-orange-600">{stats.pendingTasks}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500" 
                  style={{width: `${stats.completionRate}%`}}
                ></div>
              </div>
              <p className="text-xs text-slate-500 text-center">
                {Math.round(stats.completionRate)}% completado
              </p>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 ml-4">
        {/* Top Header */}
        <header className="rounded-t-2xl">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Mobile menu button */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="hover:bg-slate-100 rounded-xl p-2"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>

              {/* Título de página */}
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-slate-900">
                  {pathname === '/' && ''}
                  {pathname === '/tasks' && ''}
                  {pathname === '/calendar' && ''}
                  {pathname === '/reports' && ''}
                  {pathname === '/profile' && ''}
                </h1>
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all duration-200 relative"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                          {unreadCount}
                        </span>
                      </>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 max-h-96">
                      <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-semibold text-slate-900">Notificaciones</h3>
                        {notifications.length > 0 && (
                          <button 
                            onClick={clearAllNotifications}
                            className="text-xs text-slate-500 hover:text-slate-700"
                          >
                            Limpiar todo
                          </button>
                        )}
                      </div>
                      
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-slate-500">
                            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No tienes notificaciones</p>
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <button
                              key={notification.id}
                              onClick={() => handleNotificationClick(notification)}
                              className={`w-full p-4 text-left hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors ${
                                !notification.read ? 'bg-blue-50' : ''
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                {getNotificationIcon(notification.type)}
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm text-slate-900 truncate">
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-slate-600 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-slate-400 mt-2">
                                    {new Date(notification.timestamp).toLocaleTimeString('es-ES', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                )}
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      <span className="text-sm font-bold text-white relative z-10">
                        {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-slate-900">
                        {user?.full_name || 'Usuario'}
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
                      <div className="py-2">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-sm font-medium text-slate-900">{user?.full_name || 'Usuario'}</p>
                          <p className="text-sm text-slate-500">{user?.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            handleNavigation('/profile');
                            setShowUserMenu(false);
                          }}
                          className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <User className="h-4 w-4 mr-3 text-slate-400" />
                          Ver Perfil
                        </button>
                        <button
                          onClick={() => {
                            handleNavigation('/settings');
                            setShowUserMenu(false);
                          }}
                          className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Settings className="h-4 w-4 mr-3 text-slate-400" />
                          Configuración
                        </button>
                        <div className="border-t border-slate-100 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            Cerrar Sesión
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-hidden bg-white rounded-br-2xl">
          <div className="h-full overflow-y-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Click outside to close menus */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </div>
  );
}