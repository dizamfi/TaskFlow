# TaskFlow 📋

![TaskFlow Logo](./public/icons/icon-192x192.png)

**Sistema moderno de gestión de tareas construido con Next.js 14, Supabase, TypeScript y TailwindCSS.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftu-usuario%2Ftaskflow)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## ✨ Características

### 🔐 **Autenticación Completa**
- Registro e inicio de sesión seguro
- Recuperación de contraseña
- Protección de rutas
- Gestión de perfiles de usuario

### 📋 **Gestión Avanzada de Tareas**
- CRUD completo con validaciones
- Estados: Pendiente, En Progreso, Completada
- Prioridades: Baja, Media, Alta
- Fechas de vencimiento
- Filtros y búsqueda avanzada

### 📊 **Dashboard Interactivo**
- Métricas de productividad en tiempo real
- Gráficos de progreso y estadísticas
- Tareas recientes y próximas a vencer
- Vista general personalizable

### 📅 **Calendario Integrado**
- Vista mensual con tareas
- Vista de lista cronológica
- Creación de tareas desde fechas
- Navegación intuitiva

### 🔔 **Sistema de Notificaciones**
- Centro de notificaciones
- Recordatorios de vencimientos
- Configuración personalizable
- Horarios silenciosos

### 📈 **Reportes y Analytics**
- Gráficos de productividad
- Distribución por estados y prioridades
- Métricas comparativas
- Exportación a PDF/Excel

## 🚀 Demo en Vivo

**🌐 [Ver Demo](https://taskflow-demo.vercel.app)**

### Credenciales de prueba:
- **Email:** demo@taskflow.com
- **Contraseña:** Demo123!

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **TailwindCSS** - Framework de CSS utilitario
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas
- **Lucide React** - Iconos SVG

### **Backend & Base de Datos**
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Base de datos relacional
- **Row Level Security (RLS)** - Seguridad a nivel de fila

### **Testing**
- **Vitest** - Framework de testing
- **Testing Library** - Testing de componentes
- **Playwright** - Testing E2E
- **Coverage** - Cobertura de código 90%+

### **DevOps & Performance**
- **Vercel** - Deployment y hosting
- **PWA** - Progressive Web App
- **Bundle Analyzer** - Optimización de bundles
- **Web Vitals** - Métricas de rendimiento

## 📦 Instalación y Configuración

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase
- Cuenta de Vercel (para deploy)

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/dizamfi/TaskFlow.git
cd taskflow
npm install