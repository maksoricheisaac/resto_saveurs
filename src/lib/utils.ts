import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Types pour les données Prisma
type PrismaMenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  categoryId: string;
  category: {
    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  isDailySpecial: boolean;
  isAvailable: boolean;
  preparationTime?: number | null;
  allergens?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type PrismaCategory = {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

// Fonction utilitaire pour transformer les données Prisma en format Menu
export function transformPrismaMenuItem(item: PrismaMenuItem) {
  return {
    id: item.id,
    name: item.name,
    description: item.description || '',
    price: item.price,
    image: item.image || '',
    categoryId: item.categoryId,
    category: {
      id: item.category.id,
      name: item.category.name,
      description: item.category.description || '',
      isActive: item.category.isActive,
      createdAt: item.category.createdAt,
      updatedAt: item.category.updatedAt,
    },
    isDailySpecial: item.isDailySpecial,
    isAvailable: item.isAvailable,
    preparationTime: item.preparationTime ? item.preparationTime.toString() : undefined,
    allergens: item.allergens || undefined,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

// Fonction utilitaire pour transformer les données Prisma en format Category
export function transformPrismaCategory(cat: PrismaCategory) {
  return {
    id: cat.id,
    name: cat.name,
    description: cat.description || undefined,
    isActive: cat.isActive,
    createdAt: cat.createdAt || new Date(),
    updatedAt: cat.updatedAt || new Date(),
  };
}
