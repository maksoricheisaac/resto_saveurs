import { getMenuCategories, getMenuItems } from '@/actions/admin/menu-action'
import { transformPrismaMenuItem, transformPrismaCategory } from '@/lib/utils'
import AdminMenus from './menu'

export default async function MenuPage() {
  const categoriesResult = await getMenuCategories()
  const menusResult = await getMenuItems({ page: 1, limit: 10 })

  return (
    <div className="space-y-8 px-4">
      <AdminMenus
        initialCategories={(categoriesResult?.data || []).map(transformPrismaCategory)}
        initialMenus={(menusResult.data?.menuItems || []).map(transformPrismaMenuItem)}
        initialPagination={menusResult.data?.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        }}
      />
    </div>
  )
}
