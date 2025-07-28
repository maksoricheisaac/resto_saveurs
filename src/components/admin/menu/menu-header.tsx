"use client";

interface MenuHeaderProps {
  children?: React.ReactNode;
}

export function MenuHeader({ children }: MenuHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-900 font-serif">Gestion des menus</h1>
        <p className="text-gray-600">Ajoutez et gérez les plats de votre restaurant</p>
      </div>
      {children}
    </div>
  );
} 