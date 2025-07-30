"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SideDishFormData } from '@/types/menu';
import ImageUploader from '@/components/image-uploader';
import { ImageIcon } from 'lucide-react';
import { initialSideDishes } from '@app/admin/side-dishes/side-dishes';

interface SideDishFormProps {
  sideDish?: initialSideDishes;
  onSubmit: (data: SideDishFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function SideDishForm({ sideDish, onSubmit, onCancel, loading = false }: SideDishFormProps) {
  const [formData, setFormData] = useState<SideDishFormData>({
    name: '',
    description: '',
    price: 0,
    image: ''
  });
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (sideDish) {
      setFormData({
        name: sideDish.name,
        description: sideDish.description,
        price: sideDish.price,
        image: sideDish.image as string
      });
      setImageUrl(sideDish.image as string);
    } else {
      setImageUrl('');
    }
  }, [sideDish]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Veuillez sélectionner une image');
      return;
    }
    onSubmit({ ...formData, image: imageUrl });
  };

  const handleChange = (field: keyof SideDishFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto max-h-[90vh] overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>
            {sideDish ? 'Modifier l&apos;accompagnement' : 'Nouvel accompagnement'}
          </CardTitle>
          
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto max-h-[calc(90vh-80px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l&apos;accompagnement</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: Frites maison"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Description détaillée de l&apos;accompagnement"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Prix (FCFA)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Image de l&apos;accompagnement
            </Label>
            <ImageUploader 
              onImageUpload={handleImageUpload}
              initialImage={sideDish?.image as string}
            />
          </div>

          <div className="flex gap-3 pt-4 sticky bottom-0 bg-white pb-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Enregistrement...' : (sideDish ? 'Mettre à jour' : 'Créer')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 