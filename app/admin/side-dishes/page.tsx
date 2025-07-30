import { getSideDishes } from '@/actions/admin/side-dish-action';
import AdminSideDishes from './side-dishes';

export default async function SideDishesPage() {
  const result = await getSideDishes({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const initialSideDishes = result.success ? result.data?.sideDishes || [] : [];
  const initialPagination = result.success ? result.data?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  } : {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  };

  return (
    <AdminSideDishes 
      initialSideDishes={initialSideDishes}
      initialPagination={initialPagination}
    />
  );
} 