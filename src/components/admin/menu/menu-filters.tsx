"use client";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { Category } from '@/types/menu';

interface MenuFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: 'name' | 'price' | 'createdAt';
  setSortBy: (sort: 'name' | 'price' | 'createdAt') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  dailySpecialFilter: boolean | null;
  setDailySpecialFilter: (filter: boolean | null) => void;
  categories: Category[];
  limit: number;
  setLimit: (limit: number) => void;
}

export function MenuFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  categoryFilter,
  setCategoryFilter,
  dailySpecialFilter,
  setDailySpecialFilter,
  categories,
  limit,
  setLimit
}: MenuFiltersProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par nom, description ou catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Filtres */}
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40 border-gray-200 focus:border-amber-500 focus:ring-amber-500">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={String(category.id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={dailySpecialFilter === null ? 'all' : dailySpecialFilter ? 'daily' : 'regular'} 
              onValueChange={(value) => {
                if (value === 'all') setDailySpecialFilter(null);
                else setDailySpecialFilter(value === 'daily');
              }}
            >
              <SelectTrigger className="w-40 border-gray-200 focus:border-amber-500 focus:ring-amber-500">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les plats</SelectItem>
                <SelectItem value="daily">Plats du jour</SelectItem>
                <SelectItem value="regular">Plats réguliers</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: 'name' | 'price' | 'createdAt') => setSortBy(value)}>
              <SelectTrigger className="w-40 border-gray-200 focus:border-amber-500 focus:ring-amber-500">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nom</SelectItem>
                <SelectItem value="price">Prix</SelectItem>
                <SelectItem value="createdAt">Date d&apos;ajout</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="border-gray-200 hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>

            <Select value={String(limit)} onValueChange={(value) => setLimit(Number(value))}>
              <SelectTrigger className="w-32 border-gray-200 focus:border-amber-500 focus:ring-amber-500">
                <SelectValue placeholder="Par page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 par page</SelectItem>
                <SelectItem value="25">25 par page</SelectItem>
                <SelectItem value="50">50 par page</SelectItem>
                <SelectItem value="100">100 par page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 