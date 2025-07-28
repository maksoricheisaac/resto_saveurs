"use client";

interface CategoryHeaderProps {
  children?: React.ReactNode;
}

export function CategoryHeader({ children }: CategoryHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-900 font-serif">Gestion des catégories</h1>
        <p className="text-gray-600">Organisez vos plats par catégories</p>
      </div>
      {children}
    </div>
  );
} 