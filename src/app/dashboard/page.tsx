'use client';

import React from 'react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* Logo pequeño */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="relative w-6 h-6">
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 transform rotate-45"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                      }}
                    />
                  </div>
                  <div className="relative w-6 h-6 -ml-1">
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 transform rotate-45"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                      }}
                    />
                  </div>
                </div>
                <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/auth/signin'}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ¡Bienvenido al Dashboard! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Has iniciado sesión correctamente en TaskFlow - MELACORP
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">📋</div>
                <h3 className="text-lg font-semibold mb-2">Mis Tareas</h3>
                <p className="text-gray-600">Gestiona y organiza todas tus tareas</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
                <p className="text-gray-600">Métricas y estadísticas en tiempo real</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">📅</div>
                <h3 className="text-lg font-semibold mb-2">Calendario</h3>
                <p className="text-gray-600">Vista de calendario integrada</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}