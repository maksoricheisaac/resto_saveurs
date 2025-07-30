'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { SideDishFormData } from '@/types/menu';

export async function getSideDishes(params?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}) {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = params || {};

    const skip = (page - 1) * limit;

    // Construire les conditions de recherche
    const where = {
      AND: [
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { description: { contains: search, mode: 'insensitive' as const } }
          ]
        } : {},
      ]
    };

    // Construire l'ordre de tri
    const orderBy = { [sortBy]: sortOrder };

    // Récupérer les accompagnements avec pagination
    const [sideDishes, total] = await Promise.all([
      prisma.sideDish.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.sideDish.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: {
        sideDishes,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des accompagnements:', error);
    return {
      success: false,
      error: 'Erreur lors de la récupération des accompagnements'
    };
  }
}

export async function createSideDish(data: SideDishFormData) {
  try {
    const sideDish = await prisma.sideDish.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image || '',
      }
    });

    revalidatePath('/admin/side-dishes');
    return {
      success: true,
      data: sideDish
    };
  } catch (error) {
    console.error('Erreur lors de la création de l\'accompagnement:', error);
    return {
      success: false,
      error: 'Erreur lors de la création de l\'accompagnement'
    };
  }
}

export async function updateSideDish(id: string, data: SideDishFormData) {
  try {
    const sideDish = await prisma.sideDish.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image || '',
      }
    });

    revalidatePath('/admin/side-dishes');
    return {
      success: true,
      data: sideDish
    };
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'accompagnement:', error);
    return {
      success: false,
      error: 'Erreur lors de la mise à jour de l\'accompagnement'
    };
  }
}

export async function deleteSideDish(id: string) {
  try {
    await prisma.sideDish.delete({
      where: { id }
    });

    revalidatePath('/admin/side-dishes');
    return {
      success: true
    };
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'accompagnement:', error);
    return {
      success: false,
      error: 'Erreur lors de la suppression de l\'accompagnement'
    };
  }
}

export async function toggleSideDishAvailability(id: string) {
  try {
    const sideDish = await prisma.sideDish.findUnique({
      where: { id }
    });

    if (!sideDish) {
      return {
        success: false,
        error: 'Accompagnement non trouvé'
      };
    }

    const updatedSideDish = await prisma.sideDish.update({
      where: { id },
      data: {
        isAvailable: !sideDish.isAvailable
      }
    });

    revalidatePath('/admin/side-dishes');
    return {
      success: true,
      data: updatedSideDish
    };
  } catch (error) {
    console.error('Erreur lors du changement de disponibilité:', error);
    return {
      success: false,
      error: 'Erreur lors du changement de disponibilité'
    };
  }
}

export async function getSideDishById(id: string) {
  try {
    const sideDish = await prisma.sideDish.findUnique({
      where: { id }
    });

    if (!sideDish) {
      return {
        success: false,
        error: 'Accompagnement non trouvé'
      };
    }

    return {
      success: true,
      data: sideDish
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'accompagnement:', error);
    return {
      success: false,
      error: 'Erreur lors de la récupération de l\'accompagnement'
    };
  }
} 