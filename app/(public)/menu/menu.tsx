"use client";

import { useState, useEffect } from 'react';
import { getPublicMenuItems, getPublicCategories } from '@/actions/public/menu-action';
import type { Category } from '@/types';
import { HeroBanner } from '@/components/public/menu/hero-banner';
import { DailySpecials } from '@/components/public/menu/daily-specials';
import { SearchFilters } from '@/components/public/menu/search-filters';
import { LoadingState } from '@/components/public/menu/loading-state';
import { MenuItems } from '@/components/public/menu/menu-items';
import { NoResults } from '@/components/public/menu/no-results';
import { CtaSection } from '@/components/public/menu/cta-section';

// Types pour les données Prisma
interface PrismaMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  isAvailable: boolean;
  isDailySpecial: boolean;
  createdAt: Date;
  category: {
    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  sideDishes: Array<{
    id: string;
    sideDishId: string;
    sideDish: {
      id: string;
      name: string;
      description: string;
      price: number;
      image: string | null;
      isAvailable: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    createdAt: Date;
  }>;
}

interface PrismaCategory {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SideDish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  isDailySpecial: boolean;
  createdAt: Date;
  sideDishes?: Array<{
    id: string;
    sideDishId: string;
    sideDish: SideDish;
    createdAt: Date;
  }>;
}

export default function MenuClient() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Charger les données depuis la base de données
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [menuResult, categoriesResult] = await Promise.all([
          getPublicMenuItems(),
          getPublicCategories()
        ]);

        if (menuResult.success && menuResult.data) {
          const transformedMenuItems = (menuResult.data.menuItems || []).map((item: PrismaMenuItem) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image || '',
            category: item.category.name,
            isAvailable: item.isAvailable,
            isDailySpecial: item.isDailySpecial,
            createdAt: item.createdAt,
            sideDishes: item.sideDishes.map(sd => ({
              id: sd.id,
              sideDishId: sd.sideDishId,
              sideDish: {
                id: sd.sideDish.id,
                name: sd.sideDish.name,
                description: sd.sideDish.description,
                price: sd.sideDish.price,
                image: sd.sideDish.image || '',
                isAvailable: sd.sideDish.isAvailable,
                createdAt: sd.sideDish.createdAt,
                updatedAt: sd.sideDish.updatedAt,
              },
              createdAt: sd.createdAt,
            })),
          }));
          setMenuItems(transformedMenuItems);
          
         
        }

        if (categoriesResult.success) {
          const transformedCategories = (categoriesResult?.data || []).map((item: PrismaCategory) => ({
            id: item.id,
            name: item.name,
            description: item.description || '',
            isActive: item.isActive,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }));
          setCategories(transformedCategories);
        }
      } catch (error) {
        console.error('Erreur chargement données:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filtrer les plats spéciaux du jour
  const dailySpecials = menuItems.filter((item: MenuItem) => 
    item.isDailySpecial && item.isAvailable
  );

  const filteredItems = menuItems.filter((item: MenuItem) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && item.isAvailable;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroBanner />

      {/* Menu du Jour */}
      {!loading && <DailySpecials dailySpecials={dailySpecials} />}

      <div className="container-custom py-16">
        {/* Search and Filter */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Menu Items by Category */}
        {!loading && <MenuItems categories={categories} filteredItems={filteredItems} selectedCategory={selectedCategory} />}

        {/* No Results */}
        {!loading && filteredItems.length === 0 && <NoResults />}

        
        {/* CTA Section */}
        <CtaSection />
      </div>
    </div>
  );
} 