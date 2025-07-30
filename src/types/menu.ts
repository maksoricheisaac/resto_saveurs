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
  sideDishes?: MenuItemSideDish[];
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
  sideDishIds?: string[];
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SideDish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SideDishFormData = {
  name: string;
  description: string;
  price: number;
  image: string;
};

export type MenuItemSideDish = {
  id: string;
  menuItemId: string;
  sideDishId: string;
  sideDish: SideDish;
  createdAt: Date;
}; 