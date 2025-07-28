"use client";

import { Search } from 'lucide-react';
import { Category } from '@/types';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: Category[];
}

export const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories
}: SearchFiltersProps) => {
  return (
    <div className="mb-12 flex flex-col gap-6 items-center w-full">
      {/* Champ de recherche */}
      <div className="w-full max-w-2xl mx-auto relative shadow-lg rounded-xl bg-white">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher un plat..."
          className="w-full pl-12 pr-4 py-4 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Catégories */}
      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-transparent">
        <div className="flex flex-nowrap gap-3 justify-center min-w-fit py-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-medium border transition-all whitespace-nowrap shadow-sm ${
              selectedCategory === 'all'
                ? 'bg-amber-600 text-white border-amber-600 scale-105 shadow-lg'
                : 'bg-white text-gray-700 hover:bg-amber-50 border-gray-200'
            }`}
          >
            Tous
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium border transition-all whitespace-nowrap shadow-sm ${
                selectedCategory === category.id
                  ? 'bg-amber-600 text-white border-amber-600 scale-105 shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-amber-50 border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 