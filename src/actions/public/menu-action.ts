"use server";

import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma";


// Récupérer tous les plats disponibles pour le menu public
export async function getPublicMenuItems(options?: {
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}) {
  try {
    const {
      categoryId,
      search,
      minPrice,
      maxPrice,
      sortBy = 'name',
      sortOrder = 'asc'
    } = options || {};

    // Construire les filtres pour les plats
    const menuWhere: Prisma.MenuItemWhereInput = {
      isAvailable: true,
      ...(categoryId && { categoryId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } }
        ]
      }),
      ...(minPrice !== undefined && { price: { gte: minPrice } }),
      ...(maxPrice !== undefined && { price: { lte: maxPrice } })
    };

    // Construire les filtres pour les accompagnements
    const sideDishWhere= {
      isAvailable: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } }
        ]
      }),
      ...(minPrice !== undefined && { price: { gte: minPrice } }),
      ...(maxPrice !== undefined && { price: { lte: maxPrice } })
    };

    const [menuItems, sideDishes] = await Promise.all([
      prisma.menuItem.findMany({
        where: menuWhere,
        include: {
          category: true,
          sideDishes: {
            include: {
              sideDish: true
            }
          }
        },
        orderBy: [
          { isDailySpecial: 'desc' },
          { [sortBy]: sortOrder }
        ],
      }),
      prisma.sideDish.findMany({
        where: sideDishWhere,
        orderBy: {
          [sortBy]: sortOrder
        },
      })
    ]);

    return { 
      success: true, 
      data: {
        menuItems,
        sideDishes
      }
    };
  } catch (error) {
    console.error('Erreur récupération menu public:', error);
    return { success: false, error: 'Erreur lors de la récupération du menu' };
  }
}

// Récupérer toutes les catégories actives
export async function getPublicCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return { success: true, data: categories };
  } catch (error) {
    console.error('Erreur récupération catégories:', error);
    return { success: false, error: 'Erreur lors de la récupération des catégories' };
  }
}

// Récupérer les plats du jour
export async function getPublicDailySpecials() {
  try {
    const dailySpecials = await prisma.menuItem.findMany({
      where: {
        isDailySpecial: true,
        isAvailable: true,
      },
      include: {
        category: true,
        sideDishes: {
          include: {
            sideDish: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { success: true, data: dailySpecials };
  } catch (error) {
    console.error('Erreur récupération plats du jour:', error);
    return { success: false, error: 'Erreur lors de la récupération des plats du jour' };
  }
}

// Récupérer les plats par catégorie
export async function getPublicMenuItemsByCategory(categoryId: string) {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: {
        categoryId,
        isAvailable: true,
      },
      include: {
        category: true,
        sideDishes: {
          include: {
            sideDish: true
          }
        }
      },
      orderBy: {
        name: 'asc',
      },
    });

    return { success: true, data: menuItems };
  } catch (error) {
    console.error('Erreur récupération plats par catégorie:', error);
    return { success: false, error: 'Erreur lors de la récupération des plats' };
  }
}

// Rechercher des plats
export async function searchPublicMenuItems(searchTerm: string) {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: {
        isAvailable: true,
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      include: {
        category: true,
        sideDishes: {
          include: {
            sideDish: true
          }
        }
      },
      orderBy: [
        { isDailySpecial: 'desc' },
        { name: 'asc' }
      ],
    });

    return { success: true, data: menuItems };
  } catch (error) {
    console.error('Erreur recherche plats:', error);
    return { success: false, error: 'Erreur lors de la recherche' };
  }
} 