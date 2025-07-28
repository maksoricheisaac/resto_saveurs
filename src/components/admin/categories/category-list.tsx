"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { List, Tag, Edit, Trash2 } from 'lucide-react';
import { Category } from '@/types/category';

interface CategoryListProps {
  categories: Category[];
  searchTerm: string;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export function CategoryList({ categories, searchTerm, onEdit, onDelete }: CategoryListProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <List className="h-5 w-5 text-amber-600" />
          Liste des catégories ({categories.length})
          {searchTerm && (
            <Badge variant="secondary" className="ml-2">
              Recherche: &ldquo;{searchTerm}&rdquo;
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {categories.length === 0 
            ? 'Aucune catégorie trouvée' 
            : `${categories.length} catégorie(s) affichée(s)`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {categories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Tag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            {searchTerm ? (
              <>
                <p className="text-lg font-medium mb-2">Aucune catégorie trouvée</p>
                <p className="text-sm mb-4">Aucune catégorie ne correspond à votre recherche</p>
              </>
            ) : (
              <>
                <p className="text-lg font-medium mb-2">Aucune catégorie créée</p>
                <p className="text-sm">Commencez par créer votre première catégorie</p>
              </>
            )}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">Nom</TableHead>
                  <TableHead className="font-semibold text-gray-900">Description</TableHead>
                  <TableHead className="font-semibold text-gray-900">Éléments de menu</TableHead>
                  <TableHead className="font-semibold text-gray-900">Date de création</TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map(category => (
                  <TableRow key={category.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium text-gray-900">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {category.description || '-'}
                    </TableCell>
                    <TableCell>
                      {category._count ? (
                        <Badge variant="outline" className="text-amber-700 border-amber-200">
                          {category._count.menuItems} élément(s)
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(category.createdAt).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => onEdit(category)}
                          className="border-gray-300 hover:bg-amber-50 hover:border-amber-300"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => onDelete(category.id)}
                          className="hover:bg-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 