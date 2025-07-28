export type Category = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    menuItems: number;
  };
};

export type CategoryFormData = {
  name: string;
  description?: string;
};

export type PaginationParams = {
  page: number;
  limit: number;
  search?: string;
};

export type CategoryListResponse = {
  success: boolean;
  data?: {
    categories: Category[];
    pagination: {
      page: number;
      limit: number;
      totalCount: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
  error?: string;
};

export type CategoryResponse = {
  success: boolean;
  data?: Category;
  error?: string;
  message?: string;
  details?: Record<string, unknown>;
}; 