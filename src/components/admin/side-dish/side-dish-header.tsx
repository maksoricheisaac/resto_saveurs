import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface SideDishHeaderProps {
  onAddNew: () => void;
}

export function SideDishHeader({ onAddNew }: SideDishHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Accompagnements</h1>
        <p className="text-gray-600 mt-2">
          Gérez les accompagnements disponibles pour vos plats
        </p>
      </div>
      <Button onClick={onAddNew} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white">
        <Plus className="h-4 w-4" />
        Nouvel Accompagnement
      </Button>
    </div>
  );
} 