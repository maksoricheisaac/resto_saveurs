"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";

// Schéma de validation pour les plats
const menuItemSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string().min(5, "La description doit contenir au moins 5 caractères"),
  price: z.number().positive("Le prix doit être positif"),
  image: z.string().url("URL d'image valide requise"),
  categoryId: z.string().min(1, "Catégorie requise"),
  isDailySpecial: z.boolean().default(false),
  preparationTime: z.string().optional(),
  allergens: z.string().optional(),
});

export type MenuFormData = z.infer<typeof menuItemSchema>;

// Fonction pour uploader une image
export async function uploadImage(file: File): Promise<string> {
  try {
    const filename = `menu/${Date.now()}-${file.name}`;

    const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
      method: 'POST',
      body: file,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Échec de l\'upload de l\'image');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Erreur upload image:', error);
    throw new Error('Erreur lors de l\'upload de l\'image');
  }
}

// Créer un nouveau plat
export async function createMenuItem(formData: MenuFormData) {
  try {
    const validatedData = menuItemSchema.parse(formData);

         const menuItem = await prisma.menuItem.create({
       data: {
         name: validatedData.name,
         description: validatedData.description,
         price: validatedData.price,
         image: validatedData.image,
         categoryId: validatedData.categoryId,
         isDailySpecial: validatedData.isDailySpecial,

       },
       include: {
         category: true,
       },
     });

    revalidatePath('/admin/menu');
    return { success: true, data: menuItem };
  } catch (error) {
    console.error('Erreur création plat:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Erreur lors de la création du plat' };
  }
}

// Mettre à jour un plat
export async function updateMenuItem(id: string, formData: MenuFormData) {
  try {
    const validatedData = menuItemSchema.parse(formData);

    const menuItem = await prisma.menuItem.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        image: validatedData.image,
        categoryId: validatedData.categoryId,
        isDailySpecial: validatedData.isDailySpecial,
      },
      include: {
        category: true,
      },
    });

    revalidatePath('/admin/menu');
    return { success: true, data: menuItem };
  } catch (error) {
    console.error('Erreur mise à jour plat:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Erreur lors de la mise à jour du plat' };
  }
}

// Supprimer un plat
export async function deleteMenuItem(id: string) {
  try {
    await prisma.menuItem.delete({
      where: { id },
    });

    revalidatePath('/admin/menu');
    return { success: true };
  } catch (error) {
    console.error('Erreur suppression plat:', error);
    return { success: false, error: 'Erreur lors de la suppression du plat' };
  }
}

// Récupérer un plat par ID
export async function getMenuItem(id: string) {
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!menuItem) {
      return { success: false, error: 'Plat non trouvé' };
    }

    return { success: true, data: menuItem };
  } catch (error) {
    console.error('Erreur récupération plat:', error);
    return { success: false, error: 'Erreur lors de la récupération du plat' };
  }
}

// Récupérer tous les plats avec pagination et filtres
export async function getMenuItems(options: {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  isDailySpecial?: boolean;
  sortBy?: 'name' | 'price' | 'createdAt';
}) {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      categoryId,
      isDailySpecial,
      sortBy = 'createdAt',
    } = options;

    const skip = (page - 1) * limit;

    // Construire les filtres
    const where: {
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' };
        description?: { contains: string; mode: 'insensitive' };
      }>;
      categoryId?: string;
      isDailySpecial?: boolean;
    } = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (isDailySpecial !== undefined) {
      where.isDailySpecial = isDailySpecial;
    }

    // Construire le tri
    const orderBy = sortBy === 'name' ? { name: 'asc' as const } : sortBy === 'price' ? { price: 'asc' as const } : { createdAt: 'desc' as const };
   

    // Récupérer les plats
    const [menuItems, total] = await Promise.all([
      prisma.menuItem.findMany({
        where,
        include: {
          category: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.menuItem.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: {
        menuItems,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    };
  } catch (error) {
    console.error('Erreur récupération plats:', error);
    return { success: false, error: 'Erreur lors de la récupération des plats' };
  }
}

// Basculer le statut "plat du jour"
export async function toggleDailySpecial(id: string) {
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!menuItem) {
      return { success: false, error: 'Plat non trouvé' };
    }

    const updatedMenuItem = await prisma.menuItem.update({
      where: { id },
      data: {
        isDailySpecial: !menuItem.isDailySpecial,
      },
      include: {
        category: true,
      },
    });

    revalidatePath('/admin/menu');
    return { success: true, data: updatedMenuItem };
  } catch (error) {
    console.error('Erreur basculement plat du jour:', error);
    return { success: false, error: 'Erreur lors du basculement du statut' };
  }
}

// Récupérer les plats du jour
export async function getDailySpecials() {
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

// Récupérer les statistiques des plats
export async function getMenuStats() {
  try {
    const [totalItems, dailySpecials, availableItems, categories] = await Promise.all([
      prisma.menuItem.count(),
      prisma.menuItem.count({ where: { isDailySpecial: true } }),
      prisma.menuItem.count({ where: { isAvailable: true } }),
      prisma.category.count({ where: { isActive: true } }),
    ]);

    return {
      success: true,
      data: {
        totalItems,
        dailySpecials,
        availableItems,
        categories,
      },
    };
  } catch (error) {
    console.error('Erreur récupération statistiques:', error);
    return { success: false, error: 'Erreur lors de la récupération des statistiques' };
  }
}

export async function getMenuCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        isActive: true,
      }
    });

    return { success: true, data: categories };
  } catch(e){
    console.error('Erreur récupération catégories:', e);
  }
}