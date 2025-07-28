"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Menu, Category } from '@/types/menu';

interface DailySpecialsProps {
  dailySpecials: Menu[];
  categories: Category[];
}

export function DailySpecials({ dailySpecials, categories }: DailySpecialsProps) {
  if (dailySpecials.length === 0) return null;

  return (
    <Card className="border-0 shadow-md bg-gradient-to-r from-amber-50 to-orange-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Star className="h-4 w-4 text-amber-600" />
          Plats du jour ({dailySpecials.length})
        </CardTitle>
        <CardDescription className="text-sm">Vos plats mis en avant aujourd&apos;hui</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {dailySpecials.map(item => (
            <div key={item.id} className="p-3 border border-amber-200 rounded-lg bg-white">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                <Badge className="bg-amber-600 text-white text-xs px-2 py-1">
                  <Star className="h-2 w-2 mr-1" />
                  Du jour
                </Badge>
              </div>
              <p className="text-gray-600 text-xs mb-2 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-amber-700">{item.price.toLocaleString()} FCFA</span>
                <span className="text-gray-500">
                  {categories.find(c => String(c.id) === String(item.category))?.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 