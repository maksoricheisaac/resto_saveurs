"use client";

import { useState, useEffect } from 'react';
import { 
  SideDishHeader, 
  SideDishForm, 
  SideDishFilters, 
  SideDishList 
} from '@/components/admin/side-dish';
import { SideDishFormData } from '@/types/menu';
import { 
  getSideDishes, 
  createSideDish, 
  updateSideDish, 
  deleteSideDish, 
  toggleSideDishAvailability 
} from '@/actions/admin/side-dish-action';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export type initialSideDishes = {
  id: string;
  description: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  image: string | null;
  isAvailable: boolean;
}

type AdminSideDishesProps = {
  initialSideDishes: initialSideDishes[];
  initialPagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export default function AdminSideDishes({ initialSideDishes, initialPagination }: AdminSideDishesProps) {
  const { toast } = useToast();
  const [sideDishes, setSideDishes] = useState<initialSideDishes[]>(initialSideDishes);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<initialSideDishes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [pagination, setPagination] = useState(initialPagination);

  // Charger les données quand les filtres changent
  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sortBy, sortOrder, pagination.page, pagination.limit]);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await getSideDishes({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm || undefined,
        sortBy,
        sortOrder,
      });

      if (result.success && result.data) {
        // Transformer les données Prisma en format SideDish
        const transformedSideDishes = result.data.sideDishes.map((item: initialSideDishes) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image || '',
          isAvailable: item.isAvailable,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        }));
        setSideDishes(transformedSideDishes);
        setPagination(result.data.pagination);
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors du chargement des accompagnements",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement des accompagnements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: SideDishFormData) => {
    try {
      let result;
      if (editing) {
        result = await updateSideDish(editing.id, data);
      } else {
        result = await createSideDish(data);
      }

      if (result.success) {
        toast({
          title: "Succès",
          description: editing 
            ? "Accompagnement mis à jour avec succès" 
            : "Accompagnement créé avec succès",
        });
        setIsModalOpen(false);
        setEditing(null);
        loadData();
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de l'opération",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'opération",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (sideDish: initialSideDishes) => {
    setEditing(sideDish);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet accompagnement ?')) {
      return;
    }

    try {
      const result = await deleteSideDish(id);
      if (result.success) {
        toast({
          title: "Succès",
          description: "Accompagnement supprimé avec succès",
        });
        loadData();
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de la suppression",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  const handleToggleAvailability = async (id: string) => {
    try {
      const result = await toggleSideDishAvailability(id);
      if (result.success) {
        toast({
          title: "Succès",
          description: "Disponibilité mise à jour avec succès",
        });
        loadData();
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Erreur lors de la mise à jour",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur lors du changement de disponibilité:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du changement de disponibilité",
        variant: "destructive",
      });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('createdAt');
    setSortOrder('desc');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleAddNew = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditing(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SideDishHeader onAddNew={handleAddNew} />
      
      <SideDishFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onClearFilters={clearFilters}
      />

      <SideDishList
        sideDishes={sideDishes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleAvailability={handleToggleAvailability}
        loading={loading}
      />

      {/* Modal pour le formulaire */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <SideDishForm
            sideDish={editing || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
} 