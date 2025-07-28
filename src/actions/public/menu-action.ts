"use server";

import prisma from "@/lib/prisma";

// Récupérer tous les plats disponibles pour le menu public
export async function getPublicMenuItems() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: {
        isAvailable: true,
      },
      include: {
        category: true,
      },
      orderBy: [
        { isDailySpecial: 'desc' },
        { category: { name: 'asc' } },
        { name: 'asc' }
      ],
    });

    return { success: true, data: menuItems };
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