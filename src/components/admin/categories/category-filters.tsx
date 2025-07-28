"use client";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Search, X } from 'lucide-react';

interface CategoryFiltersProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export function CategoryFilters({
  searchTerm,
  onSearch
}: CategoryFiltersProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par nom ou description..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearch('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>


        </div>
      </CardContent>
    </Card>
  );
} 