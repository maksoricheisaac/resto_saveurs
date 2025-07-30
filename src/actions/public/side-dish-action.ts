'use server';

import prisma from '@/lib/prisma';

export async function getPublicSideDishes() {
  try {
    const sideDishes = await prisma.sideDish.findMany({
      where: {
        isAvailable: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return {
      success: true,
      data: sideDishes
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des accompagnements:', error);
    return {
      success: false,
      error: 'Erreur lors de la récupération des accompagnements'
    };
  }
} 