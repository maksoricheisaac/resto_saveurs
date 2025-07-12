"use client";
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const categorySchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  description: z.string().optional(),
});

export default function AdminCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Entrées', description: 'Plats pour commencer le repas' },
    { id: 2, name: 'Plats principaux', description: 'Les plats principaux du menu' },
    { id: 3, name: 'Desserts', description: 'Pour finir en douceur' },
  ]);
  const [editing, setEditing] = useState(null);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: '', description: '' },
  });

  function onSubmit(values) {
    if (editing) {
      setCategories(cats => cats.map(cat => cat.id === editing ? { ...cat, ...values } : cat));
      setEditing(null);
    } else {
      setCategories(cats => [...cats, { id: Date.now(), ...values }]);
    }
    form.reset();
  }

  function handleEdit(cat) {
    setEditing(cat.id);
    form.reset({ name: cat.name, description: cat.description });
  }

  function handleDelete(id) {
    setCategories(cats => cats.filter(cat => cat.id !== id));
    if (editing === id) setEditing(null);
    form.reset();
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 font-serif">Gestion des catégories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8">
          <h2 className="text-xl font-bold mb-6">{editing ? 'Modifier' : 'Ajouter'} une catégorie</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom de la catégorie" {...field} />
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
                      <Input placeholder="Description (optionnelle)" {...field} />
                    </FormControl>
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
          <h2 className="text-xl font-bold mb-6">Liste des catégories</h2>
          <ul className="space-y-4">
            {categories.map(cat => (
              <li key={cat.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                <div>
                  <div className="font-semibold">{cat.name}</div>
                  <div className="text-gray-500 text-sm">{cat.description}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(cat)}>Éditer</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(cat.id)}>Supprimer</Button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
} 