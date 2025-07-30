"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { Menu, MenuFormData, Category } from '@/types/menu';
import ImageUploader from '@/components/image-uploader';
import { useState, useEffect } from 'react';
import { createMenuItem, updateMenuItem, MenuFormData as ServerMenuFormData } from '@/actions/admin/menu-action';
import { useToast } from '@/hooks/use-toast';
import { getPublicSideDishes } from '@/actions/public/side-dish-action';
import Image from 'next/image';
import { SideDish } from '@/generated/prisma';

const menuSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  description: z.string().min(5, 'La description est requise'),
  price: z.coerce.number().min(1, 'Prix requis'),
  image: z.string().url('URL d\'image valide requise'),
  categoryId: z.string().min(1, 'Catégorie requise'),
  isDailySpecial: z.boolean().default(false),
  preparationTime: z.string().optional(),
  allergens: z.string().optional(),
  sideDishIds: z.array(z.string()).optional(),
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
  const [availableSideDishes, setAvailableSideDishes] = useState<SideDish[]>([]);
  const [selectedSideDishes, setSelectedSideDishes] = useState<string[]>([]);

  const form = useForm({
    resolver: zodResolver(menuSchema),
    defaultValues: { 
      name: '', 
      description: '', 
      price: '', 
      image: '', 
      categoryId: '',
      isDailySpecial: false,
      sideDishIds: [],
    },
  });

  // Charger les accompagnements disponibles
  useEffect(() => {
    const loadSideDishes = async () => {
      try {
        const result = await getPublicSideDishes();
        if (result.success && result.data) {
          setAvailableSideDishes(result.data);
        }
      } catch (error) {
        console.error('Erreur chargement accompagnements:', error);
      }
    };
    loadSideDishes();
  }, []);

  // Mettre à jour les valeurs du formulaire quand on édite
  useEffect(() => {
    if (editingMenu && editing) {
      const sideDishIds = editingMenu.sideDishes?.map(sd => sd.sideDishId) || [];
      form.reset({
        name: editingMenu.name,
        description: editingMenu.description,
        price: editingMenu.price,
        image: editingMenu.image,
        categoryId: editingMenu.categoryId,
        isDailySpecial: editingMenu.isDailySpecial,
        sideDishIds: sideDishIds,
      });
      setImageUrl(editingMenu.image);
      setSelectedSideDishes(sideDishIds);
    } else {
      form.reset({
        name: '', 
        description: '', 
        price: '', 
        image: '', 
        categoryId: '',
        isDailySpecial: false,
        sideDishIds: [],
      });
      setImageUrl('');
      setSelectedSideDishes([]);
    }
  }, [editingMenu, editing, form]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    form.reset();
    setImageUrl('');
    setSelectedSideDishes([]);
  };

  const handleOpenModal = () => {
    setEditing(null);
    form.reset();
    setImageUrl('');
    setSelectedSideDishes([]);
  };

  const handleImageUpload = (url: string) => {
    if (url !== imageUrl) {
      setImageUrl(url);
      form.setValue('image', url);
    }
  };

  const handleSideDishToggle = (sideDishId: string) => {
    const newSelected = selectedSideDishes.includes(sideDishId)
      ? selectedSideDishes.filter(id => id !== sideDishId)
      : [...selectedSideDishes, sideDishId];
    
    setSelectedSideDishes(newSelected);
    form.setValue('sideDishIds', newSelected);
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
        sideDishIds: selectedSideDishes,
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
              name="sideDishIds"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Accompagnements</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                        {availableSideDishes.map((sideDish) => (
                          <div
                            key={sideDish.id}
                            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedSideDishes.includes(sideDish.id)
                                ? 'border-amber-500 bg-amber-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleSideDishToggle(sideDish.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                                {sideDish.image && (
                                  <Image
                                    width={40}
                                    height={40}
                                    src={sideDish.image}
                                    alt={sideDish.name}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{sideDish.name}</p>
                                <p className="text-xs text-gray-500">{sideDish.price} FCFA</p>
                              </div>
                            </div>
                            {selectedSideDishes.includes(sideDish.id) && (
                              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                                Sélectionné
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                      {selectedSideDishes.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          <p className="text-sm text-gray-600 w-full">Accompagnements sélectionnés:</p>
                          {selectedSideDishes.map((sideDishId) => {
                            const sideDish = availableSideDishes.find(sd => sd.id === sideDishId);
                            return sideDish ? (
                              <Badge
                                key={sideDishId}
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                {sideDish.name}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSideDishToggle(sideDishId);
                                  }}
                                  className="ml-1 hover:text-red-500"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
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