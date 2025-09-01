import { supabase } from './client';
import type { Task, FilterOptions } from '@/types';

export class TaskService {
  // Crear tarea
  static async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Usuario no autenticado');

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        ...task,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Task;
  }

  // Obtener tareas del usuario
  static async getTasks(filters: FilterOptions = {}): Promise<Task[]> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Usuario no autenticado');

    let query = supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id);

    // Aplicar filtros
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.priority) {
      query = query.eq('priority', filters.priority);
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    // Ordenamiento
    const sortBy = filters.sortBy || 'created_at';
    const sortOrder = filters.sortOrder || 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    const { data, error } = await query;

    if (error) throw error;
    return data as Task[];
  }

  // Actualizar tarea
  static async updateTask(id: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Task;
  }

  // Eliminar tarea
  static async deleteTask(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Obtener estadísticas del dashboard
  static async getDashboardStats() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error('Usuario no autenticado');

    const { data, error } = await supabase
      .from('tasks')
      .select('status')
      .eq('user_id', user.id);

    if (error) throw error;

    const stats = data.reduce(
      (acc, task) => {
        acc.totalTasks++;
        if (task.status === 'completed') acc.completedTasks++;
        if (task.status === 'pending') acc.pendingTasks++;
        if (task.status === 'in_progress') acc.inProgressTasks++;
        return acc;
      },
      {
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        completionRate: 0,
      }
    );

    stats.completionRate = stats.totalTasks > 0 
      ? (stats.completedTasks / stats.totalTasks) * 100 
      : 0;

    return stats;
  }
}