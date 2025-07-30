import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { initialSideDishes } from '@app/admin/side-dishes/side-dishes';

interface SideDishListProps {
  sideDishes: initialSideDishes[];
  onEdit: (sideDish: initialSideDishes) => void;
  onDelete: (id: string) => void;
  onToggleAvailability: (id: string) => void;
  loading?: boolean;
}

export function SideDishList({
  sideDishes,
  onEdit,
  onDelete,
  onToggleAvailability,
  loading = false
}: SideDishListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (sideDishes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">Aucun accompagnement trouvé</div>
        <p className="text-gray-400">Commencez par ajouter votre premier accompagnement</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sideDishes.map((sideDish) => (
        <Card key={sideDish.id} className="overflow-hidden">
          {sideDish.image && (
            <div className="relative h-48 w-full">
              <Image
                src={sideDish.image}
                alt={sideDish.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold">{sideDish.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={sideDish.isAvailable ? "default" : "secondary"}>
                    {sideDish.isAvailable ? "Disponible" : "Indisponible"}
                  </Badge>
                  <span className="text-lg font-bold text-green-600">
                    {sideDish.price.toFixed(2)} FCFA
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {sideDish.description}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(sideDish)}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onToggleAvailability(sideDish.id)}
              >
                {sideDish.isAvailable ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(sideDish.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 