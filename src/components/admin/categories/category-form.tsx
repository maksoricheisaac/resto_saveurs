"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Category, CategoryFormData } from '@/types/category';

const categorySchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  description: z.string().optional(),
});

interface CategoryFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  editing: string | null;
  setEditing: (id: string | null) => void;
  onSubmit: (values: CategoryFormData) => Promise<void>;
  editingCategory?: Category;
}

export function CategoryForm({ 
  isModalOpen, 
  setIsModalOpen, 
  editing, 
  setEditing, 
  onSubmit, 
  editingCategory 
}: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', description: '' },
  });

  // Mettre à jour les valeurs du formulaire quand on édite une catégorie
  useEffect(() => {
    if (editingCategory) {
      form.reset({
        name: editingCategory.name,
        description: editingCategory.description || '',
      });
    } else {
      form.reset({ name: '', description: '' });
    }
  }, [editingCategory, form]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    form.reset();
    setIsLoading(false);
  };

  const handleOpenModal = () => {
    setEditing(null);
    form.reset();
    setIsLoading(false);
  };

  const handleSubmit = async (values: CategoryFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(values);
      // Le formulaire sera vidé automatiquement après la soumission réussie
    } catch (error) {
      // En cas d'erreur, on garde les valeurs pour que l'utilisateur puisse corriger
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-amber-600 hover:bg-amber-700 text-white"
          onClick={handleOpenModal}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une catégorie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Plus className="h-5 w-5 text-amber-600" />
            {editing ? 'Modifier' : 'Ajouter'} une catégorie
          </DialogTitle>
          <DialogDescription>
            {editing ? 'Modifiez les informations de la catégorie' : 'Créez une nouvelle catégorie pour organiser vos plats'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Nom de la catégorie</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Entrées, Plats principaux..." 
                      {...field} 
                      className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Description (optionnelle)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez cette catégorie..." 
                      {...field} 
                      className="border-gray-200 focus:border-amber-500 focus:ring-amber-500 min-h-[80px]"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editing ? 'Modification...' : 'Ajout...'}
                  </>
                ) : (
                  <>
                    {editing ? 'Modifier' : 'Ajouter'} la catégorie
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCloseModal}
                className="border-gray-300 hover:bg-gray-50"
                disabled={isLoading}
              >
                Annuler
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 