import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function checkAdminPermission() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function checkPermission() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
   
  const roles = ['admin', 'owner', 'manager']

  if (!session || (session.user.role && !roles.includes(session.user.role))) {
    throw new Error('Unauthorized');
  }
  return session;
}