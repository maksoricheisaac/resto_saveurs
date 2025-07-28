"use client";
import { useState, useEffect } from 'react';
import { 
  MenuHeader, 
  MenuForm, 
  DailySpecials, 
  MenuFilters, 
  MenuList 
} from '@/components/admin/menu';
import { Menu, Category } from '@/types/menu';
import { 
  getMenuItems, 
  deleteMenuItem, 
  toggleDailySpecial, 
  getDailySpecials,
} from '@/actions/admin/menu-action';
import { useToast } from '@/hooks/use-toast';
import { transformPrismaMenuItem, transformPrismaCategory } from '@/lib/utils';
import { getCategories } from '@/actions/admin/category-action';
import { Skeleton } from '@/components/ui/skeleton';


type AdminMenusProps = {
  initialCategories: Category[];
  initialMenus: Menu[];
  initialPagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}


export default function AdminMenus({ initialCategories, initialMenus, initialPagination }: AdminMenusProps) {
  const { toast } = useToast();
  const [menus, setMenus] = useState<Menu[]>(initialMenus);
  const [dailySpecials, setDailySpecials] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dailySpecialFilter, setDailySpecialFilter] = useState<boolean | null>(null);
  const [pagination, setPagination] = useState(initialPagination);
  const [limit, setLimit] = useState(10);


  // Charger les données quand les filtres changent
  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sortBy, sortOrder, categoryFilter, dailySpecialFilter, pagination.page, limit]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Charger les catégories
      const categoriesResult = await getCategories();
      if (categoriesResult.success && categoriesResult.data) {
        const transformedCategories = categoriesResult.data.categories.map(transformPrismaCategory);
        setCategories(transformedCategories);
      } else {
        toast({
          title: "Erreur",
          description: categoriesResult.error || "Erreur lors du chargement des catégories",
          variant: "destructive",
        });
      }

      // Charger les plats avec pagination et filtres
      const menuResult = await getMenuItems({
        page: pagination.page,
        limit: limit,
        search: searchTerm || undefined,
        categoryId: categoryFilter !== 'all' ? categoryFilter : undefined,
        isDailySpecial: dailySpecialFilter !== null ? dailySpecialFilter : undefined,
        sortBy,
      });

      if (menuResult.success && menuResult.data) {
        // Transformer les données Prisma en format Menu
        const transformedMenus = menuResult.data.menuItems.map(transformPrismaMenuItem);
        setMenus(transformedMenus);
        setPagination(menuResult.data.pagination);
      } else {
        toast({
          title: "Erreur",
          description: menuResult.error || "Erreur lors du chargement des plats",
          variant: "destructive",
        });
      }

      // Charger les plats du jour
      const dailyResult = await getDailySpecials();
      if (dailyResult.success && dailyResult.data) {
        // Transformer les données Prisma en format Menu
        const transformedDailySpecials = dailyResult.data.map(transformPrismaMenuItem);
        setDailySpecials(transformedDailySpecials);
      }
    } catch (error) {
      console.error('Erreur chargement données:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement des données",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (menu: Menu) => {
    setEditing(menu.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteMenuItem(id);
      if (result.success) {
        toast({
          title: "Succès",
          description: "Plat supprimé avec succès",
        });
        loadData(); // Recharger les données
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de la suppression",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  const handleToggleDailySpecial = async (id: string) => {
    try {
      const result = await toggleDailySpecial(id);
      if (result.success) {
        toast({
          title: "Succès",
          description: "Statut du plat du jour mis à jour",
        });
        loadData(); // Recharger les données
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de la mise à jour",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur basculement:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour",
        variant: "destructive",
      });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setDailySpecialFilter(null);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const editingMenu = editing ? menus.find(menu => menu.id === editing) : undefined;
  const hasActiveFilters = Boolean(searchTerm || categoryFilter !== 'all' || dailySpecialFilter !== null);

  if (loading) {
    return (
      <div className="space-y-8 px-4">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-5 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Daily Specials Skeleton */}
        <div className="border-0 shadow-md bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6">
          <div className="pb-4">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border border-amber-200 rounded-lg bg-white">
                <div className="flex items-start justify-between mb-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="border-0 shadow-md rounded-lg p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </div>

        {/* Menu List Skeleton */}
        <div className="border-0 shadow-md rounded-lg p-6">
          <div className="pb-4">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4">
      <MenuHeader>
        <MenuForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editing={editing}
          setEditing={setEditing}
          editingMenu={editingMenu}
          categories={categories}
          onSuccess={loadData}
        />
      </MenuHeader>

      <DailySpecials 
        dailySpecials={dailySpecials}
        categories={categories}
      />

      <MenuFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        dailySpecialFilter={dailySpecialFilter}
        setDailySpecialFilter={setDailySpecialFilter}
        categories={categories}
        limit={limit}
        setLimit={handleLimitChange}
      />

      <MenuList
        menus={menus}
        searchTerm={searchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleDailySpecial={handleToggleDailySpecial}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
} 