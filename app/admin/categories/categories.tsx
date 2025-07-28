"use client";

import { useState, useEffect, useCallback } from 'react';
import { CategoryList } from '@/components/admin/categories/category-list';
import { CategoryForm } from '@/components/admin/categories/category-form';
import { CategoryFilters } from '@/components/admin/categories/category-filters';
import { CategoryHeader } from '@/components/admin/categories/category-header';
import { Pagination } from '@/components/ui/pagination';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/ui/toast';
import { 
  getCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  type CategoryFormData,
  type PaginationParams 
} from '@/actions/admin/category-action';
import { Category } from '@/types/category';

export default function CategoriesClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const { toast, toasts, dismiss } = useToast();

  // Charger les catégories
  const loadCategories = useCallback(async (params: PaginationParams = { page: 1, limit: 10 }) => {
    try {
      const result = await getCategories(params);
      
      if (result.success && result.data) {
        setCategories(result.data.categories);
        setPagination(result.data.pagination);
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors du chargement des catégories",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement des catégories",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Charger les catégories au montage et lors des changements de recherche
  useEffect(() => {
    const params: PaginationParams = {
      page: pagination.page,
      limit: pagination.limit,
      search: searchTerm || undefined,
    };
    loadCategories(params);
  }, [searchTerm, pagination.page, pagination.limit, loadCategories]);

  // Gérer la soumission du formulaire
  const handleSubmit = async (values: CategoryFormData) => {
    try {
      let result;
      
      if (editing) {
        result = await updateCategory(editing, values);
      } else {
        result = await createCategory(values);
      }

      if (result.success) {
        toast({
          title: "Succès",
          description: editing 
            ? "Catégorie modifiée avec succès" 
            : "Catégorie créée avec succès",
        });
        
        // Vider le formulaire et fermer le modal
        setIsModalOpen(false);
        setEditing(null);
        setEditingCategory(undefined);
        
        // Recharger les catégories
        const params: PaginationParams = {
          page: pagination.page,
          limit: pagination.limit,
          search: searchTerm || undefined,
        };
        loadCategories(params);
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue",
          variant: "destructive",
        });
        // En cas d'erreur, on lance une exception pour que le formulaire reste ouvert
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
      // Relancer l'erreur pour que le formulaire reste ouvert
      throw error;
    }
  };

  // Gérer l'édition
  const handleEdit = (category: Category) => {
    setEditing(category.id);
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  // Gérer la suppression
  const handleDelete = (id: string) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Confirmer la suppression
  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      const result = await deleteCategory(categoryToDelete);
      
      if (result.success) {
        toast({
          title: "Succès",
          description: result.message || "Catégorie supprimée avec succès",
        });
        
        // Recharger les catégories
        const params: PaginationParams = {
          page: pagination.page,
          limit: pagination.limit,
          search: searchTerm || undefined,
        };
        loadCategories(params);
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de la suppression",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  // Gérer la pagination
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  // Gérer la recherche
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPagination(prev => ({ ...prev, page: 1 })); // Retour à la première page
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <CategoryHeader />
          <CategoryForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            editing={editing}
            setEditing={setEditing}
            onSubmit={handleSubmit}
            editingCategory={editingCategory}
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <CategoryFilters 
              searchTerm={searchTerm}
              onSearch={handleSearch}
            />
            
            <CategoryList
              categories={categories}
              searchTerm={searchTerm}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                hasNextPage={pagination.hasNextPage}
                hasPreviousPage={pagination.hasPreviousPage}
              />
            )}
          </div>
        </div>

        {/* Dialog de confirmation de suppression */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer cette catégorie ? 
                Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Container pour les notifications toast */}
        <ToastContainer toasts={toasts} onDismiss={dismiss} />
      </div>
    </>
  );
} 