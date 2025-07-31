import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function checkAdminPermission() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || !session.user || session.user.role !== 'admin') {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent('/admin/dashboard')}`)

  }
  return session;
}

export async function checkPermission() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
   
  const roles = ['admin', 'owner', 'manager']

  if (!session || (session.user.role && !roles.includes(session.user.role))) {
    redirect(`/sign-in?callbackUrl=${encodeURIComponent('/admin/dashboard')}`)
  }
  return session;
}