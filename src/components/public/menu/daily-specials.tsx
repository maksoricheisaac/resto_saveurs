/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from 'framer-motion';
import { Star, Clock, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { MenuItem } from '@/types';
import Image from 'next/image';


interface DailySpecialsProps {
  dailySpecials: MenuItem[];
}

export const DailySpecials = ({ dailySpecials }: DailySpecialsProps) => {
  if (dailySpecials.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container-custom">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="w-6 h-6 text-amber-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">
              Menu du Jour
            </h2>
            <Star className="w-6 h-6 text-amber-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-3">
            Découvrez nos plats spéciaux du jour, préparés avec soin par nos chefs
          </p>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-amber-600 font-semibold text-sm">
              Disponible aujourd'hui
            </span>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {dailySpecials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="group bg-white shadow-md hover:shadow-lg transition-all duration-300 border-0 overflow-hidden h-120">
                <div className="relative">
                  {item.image && (
                    <div className="aspect-[3/2] overflow-hidden">
                      <Image
                        width={300}
                        height={200}
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-amber-500 text-white border-0 px-2 py-1 text-xs">
                      <Tag className="w-2 h-2 mr-1" />
                      Spécial
                    </Badge>
                  </div>
                  
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                    {item.description.slice(0, 100)}...
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <div className="text-lg font-bold text-amber-600">
                        {item.price.toLocaleString()} FCFA
                      </div>
                    </div>
                    
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        
      </div>
    </section>
  );
}; 