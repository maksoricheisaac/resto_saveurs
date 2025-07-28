"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Menu, MenuFormData, Category } from '@/types/menu';
import ImageUploader from '@/components/image-uploader';
import { useState, useEffect } from 'react';
import { createMenuItem, updateMenuItem, MenuFormData as ServerMenuFormData } from '@/actions/admin/menu-action';
import { useToast } from '@/hooks/use-toast';

const menuSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  description: z.string().min(5, 'La description est requise'),
  price: z.coerce.number().min(1, 'Prix requis'),
  image: z.string().url('URL d\'image valide requise'),
  categoryId: z.string().min(1, 'Catégorie requise'),
  isDailySpecial: z.boolean().default(false),
  preparationTime: z.string().optional(),
  allergens: z.string().optional(),
});

interface MenuFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  editing: string | null;
  setEditing: (id: string | null) => void;
  editingMenu?: Menu;
  categories: Category[];
  onSuccess?: () => void;
}

export function MenuForm({ 
  isModalOpen, 
  setIsModalOpen, 
  editing, 
  setEditing, 
  editingMenu,
  categories,
  onSuccess
}: MenuFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const form = useForm({
    resolver: zodResolver(menuSchema),
    defaultValues: { 
      name: '', 
      description: '', 
      price: '', 
      image: '', 
      categoryId: '',
      isDailySpecial: false,
    },
  });

  // Mettre à jour les valeurs du formulaire quand on édite
  useEffect(() => {
    if (editingMenu && editing) {
      form.reset({
        name: editingMenu.name,
        description: editingMenu.description,
        price: editingMenu.price,
        image: editingMenu.image,
        categoryId: editingMenu.categoryId,
        isDailySpecial: editingMenu.isDailySpecial
      });
      setImageUrl(editingMenu.image);
    } else {
      form.reset({
        name: '', 
        description: '', 
        price: '', 
        image: '', 
        categoryId: '',
        isDailySpecial: false
      });
      setImageUrl('');
    }
  }, [editingMenu, editing, form]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    form.reset();
    setImageUrl('');
  };

  const handleOpenModal = () => {
    setEditing(null);
    form.reset();
    setImageUrl('');
  };

  const handleImageUpload = (url: string) => {
    if (url !== imageUrl) {
      setImageUrl(url);
      form.setValue('image', url);
    }
  };

  const onSubmit = async (values: MenuFormData) => {
    if (!imageUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une image",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData: ServerMenuFormData = {
        ...values,
        image: imageUrl,
        price: Number(values.price),
      };

      let result;
      if (editing) {
        result = await updateMenuItem(editing, formData);
      } else {
        result = await createMenuItem(formData);
      }

      if (result.success) {
        toast({
          title: "Succès",
          description: editing ? "Plat modifié avec succès" : "Plat ajouté avec succès",
        });
        handleCloseModal();
        onSuccess?.();
      } else {
        toast({
          title: "Erreur",
          description: result.error || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erreur soumission:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          Ajouter un plat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Plus className="h-5 w-5 text-amber-600" />
            {editing ? 'Modifier' : 'Ajouter'} un plat
          </DialogTitle>
          <DialogDescription>
            {editing ? 'Modifiez les informations du plat' : 'Créez un nouveau plat pour votre menu'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Nom du plat</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Poulet Moambe" 
                      {...field} 
                      className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
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
                  <FormLabel className="text-sm font-medium text-gray-700">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez le plat, ses ingrédients, sa préparation..." 
                      {...field} 
                      className="border-gray-200 focus:border-amber-500 focus:ring-amber-500 min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Prix (FCFA)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5000"
                        {...field}
                        value={typeof field.value === 'number' || typeof field.value === 'string' ? field.value : ''}
                        className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border-gray-200 focus:border-amber-500 focus:ring-amber-500 w-full">
                        <SelectValue placeholder="Choisir..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Image du plat
                  </FormLabel>
                  <FormControl>
                    <ImageUploader 
                      onImageUpload={handleImageUpload}
                      initialImage={editingMenu?.image}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isDailySpecial"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Plat du jour</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Marquer ce plat comme plat du jour
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
           
            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {editing ? 'Modification...' : 'Ajout...'}
                  </>
                ) : (
                  <>
                    {editing ? 'Modifier' : 'Ajouter'} le plat
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCloseModal}
                className="border-gray-300 hover:bg-gray-50"
                disabled={isSubmitting}
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