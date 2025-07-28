"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Schéma de validation pour la création/modification de catégorie
const categorySchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  description: z.string().optional(),
});

// Schéma pour la pagination
const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
export type PaginationParams = z.infer<typeof paginationSchema>;

// Récupérer toutes les catégories avec pagination et recherche
export async function getCategories(params: PaginationParams = { page: 1, limit: 10 }) {
  try {
    const { page = 1, limit = 10, search = "" } = paginationSchema.parse(params);
    
    const skip = (page - 1) * limit;
    
    // Construire la condition de recherche
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    // Récupérer les catégories avec pagination
    const [categories, totalCount] = await Promise.all([
      prisma.category.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          _count: {
            select: { menuItems: true }
          }
        }
      }),
      prisma.category.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      success: true,
      data: {
        categories,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      },
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des catégories",
    };
  }
}

// Récupérer une catégorie par ID
export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { menuItems: true }
        }
      }
    });

    if (!category) {
      return {
        success: false,
        error: "Catégorie non trouvée",
      };
    }

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de la catégorie:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération de la catégorie",
    };
  }
}

// Créer une nouvelle catégorie
export async function createCategory(data: CategoryFormData) {
  try {
    const validatedData = categorySchema.parse(data);

    // Vérifier si une catégorie avec le même nom existe déjà
    const existingCategory = await prisma.category.findFirst({
      where: { name: { equals: validatedData.name, mode: "insensitive" } },
    });

    if (existingCategory) {
      return {
        success: false,
        error: "Une catégorie avec ce nom existe déjà",
      };
    }

    const category = await prisma.category.create({
      data: {
        name: validatedData.name,
        description: validatedData.description || null,
      },
    });

    revalidatePath("/admin/categories");
    
    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error("Erreur lors de la création de la catégorie:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Données invalides",
        details: error.issues,
      };
    }
    return {
      success: false,
      error: "Erreur lors de la création de la catégorie",
    };
  }
}

// Modifier une catégorie
export async function updateCategory(id: string, data: CategoryFormData) {
  try {
    const validatedData = categorySchema.parse(data);

    // Vérifier si la catégorie existe
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return {
        success: false,
        error: "Catégorie non trouvée",
      };
    }

    // Vérifier si une autre catégorie avec le même nom existe déjà
    const duplicateCategory = await prisma.category.findFirst({
      where: {
        name: { equals: validatedData.name, mode: "insensitive" },
        id: { not: id },
      },
    });

    if (duplicateCategory) {
      return {
        success: false,
        error: "Une catégorie avec ce nom existe déjà",
      };
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description || null,
      },
    });

    revalidatePath("/admin/categories");
    
    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error("Erreur lors de la modification de la catégorie:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Données invalides",
        details: error.issues,
      };
    }
    return {
      success: false,
      error: "Erreur lors de la modification de la catégorie",
    };
  }
}

// Supprimer une catégorie
export async function deleteCategory(id: string) {
  try {
    // Vérifier si la catégorie existe
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { menuItems: true }
        }
      }
    });

    if (!category) {
      return {
        success: false,
        error: "Catégorie non trouvée",
      };
    }

    // Vérifier si la catégorie a des éléments de menu associés
    if (category._count.menuItems > 0) {
      return {
        success: false,
        error: `Impossible de supprimer cette catégorie car elle contient ${category._count.menuItems} élément(s) de menu`,
      };
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categories");
    
    return {
      success: true,
      message: "Catégorie supprimée avec succès",
    };
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie:", error);
    return {
      success: false,
      error: "Erreur lors de la suppression de la catégorie",
    };
  }
}

// Récupérer toutes les catégories actives (pour les formulaires)
export async function getActiveCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories actives:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des catégories",
    };
  }
}

// Activer/Désactiver une catégorie
export async function toggleCategoryStatus(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return {
        success: false,
        error: "Catégorie non trouvée",
      };
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { isActive: !category.isActive },
    });

    revalidatePath("/admin/categories");
    
    return {
      success: true,
      data: updatedCategory,
    };
  } catch (error) {
    console.error("Erreur lors du changement de statut de la catégorie:", error);
    return {
      success: false,
      error: "Erreur lors du changement de statut",
    };
  }
}
