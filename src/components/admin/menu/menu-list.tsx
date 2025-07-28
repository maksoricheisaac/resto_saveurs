"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Utensils, 
  Clock, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Image as ImageIcon,
  Eye,
  EyeOff
} from 'lucide-react';
import { Menu } from '@/types/menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface MenuListProps {
  menus: Menu[];
  searchTerm: string;
  onEdit: (menu: Menu) => void;
  onDelete: (id: string) => void;
  onToggleDailySpecial: (id: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
}

export function MenuList({ 
  menus, 
  searchTerm, 
  onEdit, 
  onDelete, 
  onToggleDailySpecial,
  onClearFilters,
  hasActiveFilters,
  pagination,
  onPageChange
}: MenuListProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Utensils className="h-5 w-5 text-amber-600" />
          Liste des plats ({pagination?.total || menus.length})
          {searchTerm && (
            <Badge variant="secondary" className="ml-2">
              Recherche: &ldquo;{searchTerm}&rdquo;
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {menus.length === 0 
            ? 'Aucun plat trouvé' 
            : `${menus.length} plat(s) affiché(s)${pagination ? ` sur ${pagination.total}` : ''}`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {menus.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Utensils className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            {hasActiveFilters ? (
              <>
                <p className="text-lg font-medium mb-2">Aucun plat trouvé</p>
                <p className="text-sm mb-4">Aucun plat ne correspond à vos critères</p>
                <Button 
                  variant="outline" 
                  onClick={onClearFilters}
                  className="border-gray-300 hover:bg-gray-50"
                >
                  Effacer les filtres
                </Button>
              </>
            ) : (
              <>
                <p className="text-lg font-medium mb-2">Aucun plat créé</p>
                <p className="text-sm">Commencez par créer votre premier plat</p>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead className="w-32">Prix</TableHead>
                    <TableHead className="w-24">Statut</TableHead>
                    <TableHead className="w-24">Spécial</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menus.map(item => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Avatar className="h-12 w-12">
                          {item.image ? (
                            <AvatarImage 
                              src={item.image} 
                              alt={item.name}
                              className="object-cover"
                            />
                          ) : (
                            <AvatarFallback className="bg-gray-100">
                              <ImageIcon className="h-4 w-4 text-gray-400" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                            {item.description}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Ajouté le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-amber-200 text-amber-700">
                          {item.category.name}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-gray-900">
                          {item.price.toLocaleString()} FCFA
                        </div>
                        {item.preparationTime && (
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {item.preparationTime}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.isAvailable ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-xs ${item.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                            {item.isAvailable ? 'Disponible' : 'Indisponible'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={item.isDailySpecial}
                          onCheckedChange={() => onToggleDailySpecial(item.id)}
                          className="data-[state=checked]:bg-amber-600"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => onEdit(item)}
                            className="h-8 w-8 p-0 border-gray-300 hover:bg-amber-50 hover:border-amber-300"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => onDelete(item.id)}
                            className="h-8 w-8 p-0 hover:bg-red-600"
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
            
            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Page {pagination.page} sur {pagination.totalPages} ({pagination.total} plats)
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange?.(pagination.page - 1)}
                    disabled={!pagination.hasPrev}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Précédent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange?.(pagination.page + 1)}
                    disabled={!pagination.hasNext}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Suivant
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
} 