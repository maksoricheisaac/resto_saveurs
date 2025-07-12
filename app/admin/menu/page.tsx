"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const categoriesMock = [
  { id: 1, name: 'Entrées' },
  { id: 2, name: 'Plats principaux' },
  { id: 3, name: 'Desserts' },
];

const menuSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  description: z.string().min(5, 'La description est requise'),
  price: z.coerce.number().min(1, 'Prix requis'),
  image: z.string().url('URL d\'image valide requise'),
  category: z.string().min(1, 'Catégorie requise'),
});

export default function AdminMenus() {
  const [menus, setMenus] = useState([
    { id: 1, name: 'Poulet Moambe', description: 'Plat traditionnel congolais', price: 5000, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg', category: '1' },
    { id: 2, name: 'Saka Saka', description: 'Feuilles de manioc', price: 3500, image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg', category: '2' },
  ]);
  const [editing, setEditing] = useState(null);

  const form = useForm({
    resolver: zodResolver(menuSchema),
    defaultValues: { name: '', description: '', price: '', image: '', category: '' },
  });

  function onSubmit(values) {
    if (editing) {
      setMenus(items => items.map(item => item.id === editing ? { ...item, ...values } : item));
      setEditing(null);
    } else {
      setMenus(items => [...items, { id: Date.now(), ...values }]);
    }
    form.reset();
  }

  function handleEdit(item) {
    setEditing(item.id);
    form.reset({ ...item });
  }

  function handleDelete(id) {
    setMenus(items => items.filter(item => item.id !== id));
    if (editing === id) setEditing(null);
    form.reset();
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 font-serif">Gestion des menus</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8">
          <h2 className="text-xl font-bold mb-6">{editing ? 'Modifier' : 'Ajouter'} un plat</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom du plat" {...field} />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description du plat" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (FCFA)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Prix" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image (URL)</FormLabel>
                    <FormControl>
                      <Input placeholder="URL de l'image" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesMock.map(cat => (
                          <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">{editing ? 'Modifier' : 'Ajouter'}</Button>
              {editing && (
                <Button type="button" variant="outline" className="w-full" onClick={() => { setEditing(null); form.reset(); }}>Annuler</Button>
              )}
            </form>
          </Form>
        </Card>
        <Card className="p-8">
          <h2 className="text-xl font-bold mb-6">Liste des plats</h2>
          <ul className="space-y-4">
            {menus.map(item => (
              <li key={item.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                <div>
                  <div className="font-semibold">{item.name} <span className="text-amber-700 font-normal">({categoriesMock.find(c => String(c.id) === String(item.category))?.name})</span></div>
                  <div className="text-gray-500 text-sm">{item.description}</div>
                  <div className="text-gray-700 text-sm">Prix : {item.price} FCFA</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>Éditer</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>Supprimer</Button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
} 