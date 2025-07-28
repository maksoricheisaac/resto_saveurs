import { Search } from 'lucide-react';

export const NoResults = () => {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Search size={24} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun plat trouvé</h3>
      <p className="text-gray-600">
        Essayez de modifier vos critères de recherche.
      </p>
    </div>
  );
}; 