import { checkPermission } from '@/lib/auth-helpers';
import CategoriesClient from './categories';

export default async function CategoriesPage() {
  await checkPermission();
  return <CategoriesClient />;
} 