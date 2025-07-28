"use client";

interface CategoryFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const CategoryFilters = ({ selectedCategory, setSelectedCategory }: CategoryFiltersProps) => {
  const categories = [
    { id: 'all', name: 'Toutes' },
    { id: 'food', name: 'Plats' },
    { id: 'ambiance', name: 'Ambiance' },
    { id: 'event', name: 'Événements' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
            selectedCategory === category.id
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}; 