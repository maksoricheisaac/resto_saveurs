"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import type { MenuItem } from '@/types';

interface FeaturedMenuProps {
  featuredItems: MenuItem[];
}

export const FeaturedMenu = ({ featuredItems }: FeaturedMenuProps) => {
  // Données statiques pour la démo
  const demoItems: MenuItem[] = [
    {
      id: '1',
      name: 'Poulet Moambé',
      description: 'Poulet mijoté dans une sauce moambé traditionnelle avec des épices locales',
      price: 8500,
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
      category: 'Plats principaux',
      isAvailable: true,
      isDailySpecial: true,
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Poisson Braisé',
      description: 'Poisson frais braisé aux herbes aromatiques et citron vert',
      price: 12000,
      image: 'https://images.pexels.com/photos/725992/pexels-photo-725992.jpeg',
      category: 'Plats principaux',
      isAvailable: true,
      isDailySpecial: false,
      createdAt: new Date()
    },
    {
      id: '3',
      name: 'Foufou de Manioc',
      description: 'Foufou traditionnel accompagné de sauce aux légumes locaux',
      price: 3500,
      image: 'https://images.pexels.com/photos/5718019/pexels-photo-5718019.jpeg',
      category: 'Accompagnements',
      isAvailable: true,
      isDailySpecial: false,
      createdAt: new Date()
    }
  ];

  const items = featuredItems.length > 0 ? featuredItems : demoItems;

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Nos Spécialités
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos plats signature préparés avec passion et des ingrédients frais
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                />
                {item.isDailySpecial && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Plat du jour
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-amber-600">
                    {item.price.toLocaleString()} FCFA
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">4.8</span>
                  </div>
                  
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Voir tout le menu
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}; 