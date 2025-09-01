// import { useState, useEffect } from 'react';
// import { User } from '@supabase/supabase-js';
// import { supabase } from '@/lib/supabase/client';
// import type { User as AppUser } from '@/types';

// export function useAuth() {
//   const [user, setUser] = useState<AppUser | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Obtener sesión inicial
//     const getInitialSession = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
      
//       if (session?.user) {
//         setUser({
//           id: session.user.id,
//           email: session.user.email!,
//           full_name: session.user.user_metadata?.full_name,
//           avatar_url: session.user.user_metadata?.avatar_url,
//           created_at: session.user.created_at,
//         });
//       }
      
//       setLoading(false);
//     };

//     getInitialSession();

//     // Escuchar cambios en la autenticación
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (event, session) => {
//         if (session?.user) {
//           setUser({
//             id: session.user.id,
//             email: session.user.email!,
//             full_name: session.user.user_metadata?.full_name,
//             avatar_url: session.user.user_metadata?.avatar_url,
//             created_at: session.user.created_at,
//           });
//         } else {
//           setUser(null);
//         }
//         setLoading(false);
//       }
//     );

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, []);

//   return { user, loading };
// }





import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener sesión inicial
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        }
        
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            full_name: session.user.user_metadata?.full_name,
            avatar_url: session.user.user_metadata?.avatar_url,
            created_at: session.user.created_at,
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            full_name: session.user.user_metadata?.full_name,
            avatar_url: session.user.user_metadata?.avatar_url,
            created_at: session.user.created_at,
          });
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}