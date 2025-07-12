"use client"
import { useState } from 'react';
import { Search } from 'lucide-react';
// import { useRestaurant } from '@/context/RestaurantContext';
import { restaurantInfo, initialMenuItems, initialCategories } from '@/data/restaurant';
import type { MenuItem, Category } from '@/types';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Menu(){
  // const { menuItems, categories } = useRestaurant();
  const menuItems: MenuItem[] = initialMenuItems;
  const categories: Category[] = initialCategories;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = menuItems.filter((item: MenuItem) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && item.isAvailable;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[38vh] md:h-[48vh] flex items-center justify-center overflow-hidden mb-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 w-full text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 font-serif">Notre Menu</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-100 font-light drop-shadow-md">
            Découvrez nos spécialités congolaises préparées avec passion et des ingrédients frais
          </p>
        </div>
      </section>

      <div className="container-custom py-16">
        {/* Search and Filter */}
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

        {/* Menu Items by Category */}
        {categories.map(category => {
          const categoryItems = filteredItems.filter(item => item.category === category.id);
          
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun plat trouvé</h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl p-12 text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Envie de commander ?</h2>
          <p className="text-xl mb-8 text-amber-100">
            Contactez-nous sur WhatsApp pour passer votre commande ou réserver votre table
          </p>
          <button 
            onClick={() => window.open(`https://wa.me/${restaurantInfo.whatsapp}?text=Bonjour, je souhaite passer une commande`, '_blank')}
            className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Commander sur WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

