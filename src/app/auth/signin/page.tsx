// 'use client';

// import React from 'react';
// import { SignInForm } from '@/components/features/auth';

// export default function SignInPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">TaskFlow</h1>
//           <p className="text-gray-600">Sistema de gestión de tareas</p>
//         </div>
//         <SignInForm />
//       </div>
//     </div>
//   );
// }






'use client';

import React, { useEffect } from 'react';
import { SignInForm } from '@/components/features/auth';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Si el usuario ya está logueado, redirigir a la raíz
 useEffect(() => {
  if (!loading && user) {
    // Si ya está logueado, redirigir al dashboard principal
    router.push('/');
  }
}, [user, loading, router]);

  // Mostrar loading mientras se verifica la sesión
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // Si ya está logueado, no mostrar nada (se está redirigiendo)
  if (user) {
    return null;
  }

  // ... resto del JSX igual (todo el diseño de la página)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Patrón de puntos decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl mb-6 shadow-2xl shadow-blue-500/30">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <p className="text-slate-300 text-lg">
            Sistema profesional de gestión de tareas
          </p>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* Efecto de brillo en el borde */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
          
          {/* Formulario */}
          <div className="relative">
            <SignInForm 
              onSuccess={() => {
                console.log('Login successful, navigating to root...');
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-400">
            © 2024 TaskFlow. Desarrollado para TRD.
          </p>
        </div>
      </div>
    </div>
  );
}




// 'use client';

// import React, { useState } from 'react';
// import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

// export default function SignInPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({ email: '', password: '' });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Reset errors
//     setErrors({ email: '', password: '' });
    
//     // Basic validation
//     let hasErrors = false;
//     if (!email) {
//       setErrors(prev => ({ ...prev, email: 'El email es obligatorio' }));
//       hasErrors = true;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setErrors(prev => ({ ...prev, email: 'Formato de email inválido' }));
//       hasErrors = true;
//     }
    
//     if (!password) {
//       setErrors(prev => ({ ...prev, password: 'La contraseña es obligatoria' }));
//       hasErrors = true;
//     }
    
//     if (hasErrors) return;
    
//     setIsLoading(true);
    
//     try {
//       // Simular autenticación
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Redirigir al dashboard
//       window.location.href = '/task';
//     } catch (error) {
//       console.error('Error en login:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center p-4">
//       {/* Container principal */}
//       <div className="w-full max-w-md">
//         {/* Logo y Header */}
//         <div className="text-center mb-8">
//           {/* Logo MELACORP */}
//           <div className="flex justify-center mb-6">
//             <div className="relative">
//               {/* Logo base */}
//               <div className="flex items-center space-x-3">
//                 {/* Texto MELACORP */}
//                 <div className="flex flex-col">
//                   <span className="text-3xl font-black text-gray-800 tracking-wider">
//                     MELACORP
//                   </span>
//                   <span className="text-sm font-medium text-gray-600 tracking-wide -mt-1">
//                     SERVICIOS INTEGRALES
//                   </span>
//                 </div>
                
//                 {/* Logo diamantes */}
//                 <div className="flex items-center ml-4">
//                   {/* Diamante azul */}
//                   <div className="relative w-8 h-8">
//                     <div 
//                       className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 transform rotate-45"
//                       style={{
//                         clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
//                       }}
//                     />
//                   </div>
                  
//                   {/* Diamante rojo superpuesto */}
//                   <div className="relative w-8 h-8 -ml-2">
//                     <div 
//                       className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 transform rotate-45"
//                       style={{
//                         clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             Bienvenido de vuelta
//           </h1>
//           <p className="text-gray-600">
//             Ingresa tus credenciales para acceder a TaskFlow
//           </p>
//         </div>

//         {/* Formulario */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <div className="space-y-1">
//               <label htmlFor="email" className="text-sm font-semibold text-gray-700">
//                 Correo Electrónico
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`
//                     block w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-colors duration-200
//                     text-gray-900 placeholder-gray-400 focus:outline-none
//                     ${errors.email 
//                       ? 'border-red-300 focus:border-red-500 bg-red-50' 
//                       : 'border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white'
//                     }
//                   `}
//                   placeholder="tu@email.com"
//                   disabled={isLoading}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="text-sm text-red-600 mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="space-y-1">
//               <label htmlFor="password" className="text-sm font-semibold text-gray-700">
//                 Contraseña
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className={`
//                     block w-full pl-12 pr-12 py-4 rounded-xl border-2 transition-colors duration-200
//                     text-gray-900 placeholder-gray-400 focus:outline-none
//                     ${errors.password 
//                       ? 'border-red-300 focus:border-red-500 bg-red-50' 
//                       : 'border-gray-200 focus:border-blue-500 bg-gray-50 focus:bg-white'
//                     }
//                   `}
//                   placeholder="Ingresa tu contraseña"
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-4 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                   disabled={isLoading}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-sm text-red-600 mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Recordar sesión y Olvidé contraseña */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
//                 />
//                 <span className="ml-2 text-sm text-gray-600">Recordar sesión</span>
//               </label>
              
//               <button
//                 type="button"
//                 className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                 onClick={() => window.location.href = '/auth/reset-password'}
//               >
//                 ¿Olvidaste tu contraseña?
//               </button>
//             </div>

//             {/* Botón de Iniciar Sesión */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="
//                 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
//                 text-white font-semibold py-4 px-6 rounded-xl
//                 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg
//                 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
//                 flex items-center justify-center space-x-2
//                 focus:outline-none focus:ring-4 focus:ring-blue-300
//               "
//             >
//               {isLoading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                   <span>Iniciando sesión...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>Iniciar Sesión</span>
//                   <ArrowRight className="h-5 w-5" />
//                 </>
//               )}
//             </button>

//             {/* Divider */}
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-4 bg-white text-gray-500">¿Nuevo en TaskFlow?</span>
//               </div>
//             </div>

//             {/* Botón de Registro */}
//             <button
//               type="button"
//               onClick={() => window.location.href = '/auth/signup'}
//               className="
//                 w-full bg-white border-2 border-gray-200 hover:border-gray-300
//                 text-gray-700 font-semibold py-4 px-6 rounded-xl
//                 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md
//                 focus:outline-none focus:ring-4 focus:ring-gray-300
//               "
//             >
//               Crear cuenta nueva
//             </button>
//           </form>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-8">
//           <p className="text-sm text-gray-500">
//             Al iniciar sesión, aceptas nuestros{' '}
//             <button className="text-blue-600 hover:underline">
//               Términos de Servicio
//             </button>{' '}
//             y{' '}
//             <button className="text-blue-600 hover:underline">
//               Política de Privacidad
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

