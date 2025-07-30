"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MenuItem, Category } from '@/types';
import { Badge } from '@/components/ui/badge';

interface SideDish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
}

interface MenuItemWithSideDishes extends MenuItem {
  sideDishes?: {
    id: string;
    sideDishId: string;
    sideDish: SideDish;
    createdAt: Date;
  }[];
}

interface MenuItemsProps {
  categories: Category[];
  filteredItems: MenuItemWithSideDishes[];
  selectedCategory: string;
}

export const MenuItems = ({ categories, filteredItems, selectedCategory }: MenuItemsProps) => {
  return (
    <>
      {/* Menu Items by Category */}
      {categories.map(category => {
        const categoryItems = filteredItems.filter(item => item.category === category.name);
        
        if (categoryItems.length === 0 && selectedCategory !== 'all') return null;
        if (categoryItems.length === 0 && selectedCategory === 'all') return null;

        return (
          <motion.section
            key={category.id}
            className="mb-16 bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <div className="mb-8 border-b border-gray-100 pb-4">
              <h2 className="text-3xl font-serif font-extrabold mb-2 text-amber-700 tracking-tight">{category.name}</h2>
              <p className="text-gray-500 font-light">{category.description}</p>
            </div>
            <div className="flex flex-col gap-8">
              {categoryItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className="flex flex-col md:flex-row items-start md:items-center gap-6 group border-b last:border-b-0 border-gray-100 pb-8 last:pb-0"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.08, type: 'spring' }}
                >
                  <div className="w-full md:w-40 h-32 md:h-28 flex-shrink-0 overflow-hidden rounded-2xl shadow group-hover:scale-105 transition-transform duration-300">
                    <Image
                      width={200}
                      height={120}
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <h3 className="text-xl md:text-2xl font-bold font-serif text-gray-900 mb-1 md:mb-0">{item.name}</h3>
                      <span className="text-lg md:text-xl font-bold text-amber-700 whitespace-nowrap">{item.price.toLocaleString()} FCFA</span>
                    </div>
                    <p className="text-gray-600 font-light mt-2 mb-4 md:mb-0 text-base">{item.description}</p>
                    
                    {/* Side Dishes */}
                    {item.sideDishes && item.sideDishes.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Accompagnements disponibles:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.sideDishes.map((sideDishRel) => (
                            <Badge
                              key={sideDishRel.id}
                              variant="outline"
                              className="bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
                            >
                              <div className="flex items-center gap-2">
                                {sideDishRel.sideDish.image && (
                                  <div className="w-4 h-4 rounded-full overflow-hidden">
                                    <Image
                                      width={16}
                                      height={16}
                                      src={sideDishRel.sideDish.image}
                                      alt={sideDishRel.sideDish.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                <span className="text-xs font-medium">{sideDishRel.sideDish.name}</span>
                                <span className="text-xs text-amber-600">+{sideDishRel.sideDish.price} FCFA</span>
                              </div>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        );
      })}
    </>
  );
}; 