export type Menu = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  isDailySpecial: boolean;
  isAvailable: boolean;
  preparationTime?: string;
  allergens?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MenuFormData = {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  isDailySpecial: boolean;
  preparationTime?: string;
  allergens?: string;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}; 