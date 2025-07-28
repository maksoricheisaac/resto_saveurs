import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAdminAuth(redirectTo = '/sign-in') {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending) {
      // Si pas de session, rediriger vers la page de connexion
      if (!session) {
        router.push(redirectTo);
        return;
      }

      // Si l'utilisateur n'a pas le rôle admin, rediriger vers la page d'accès refusé
      if (session.user.role !== 'admin') {
        router.push('/unauthorized');
        return;
      }
    }
  }, [session, isPending, router, redirectTo]);

  return {
    session,
    isPending,
    isAdmin: session?.user.role === 'admin',
    user: session?.user,
  };
}

// Hook pour vérifier si l'utilisateur est connecté (sans vérification admin)
export function useAuth(redirectTo = '/sign-in') {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push(redirectTo);
    }
  }, [session, isPending, router, redirectTo]);

  return {
    session,
    isPending,
    isAuthenticated: !!session,
    user: session?.user,
  };
} 