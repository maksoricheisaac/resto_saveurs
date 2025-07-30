"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SideDish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
}

interface SideDishesSectionProps {
  sideDishes: SideDish[];
}

export function SideDishesSection({ sideDishes }: SideDishesSectionProps) {
  if (!sideDishes || sideDishes.length === 0) {
    return null;
  }

  return (
    <motion.section 
      className="py-16 bg-gradient-to-br from-amber-50 to-orange-50"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, type: 'spring' }}
    >
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-amber-800 mb-4 tracking-tight">
            Nos Accompagnements
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
            Complétez votre repas avec nos délicieux accompagnements faits maison, 
            préparés avec des ingrédients frais et locaux
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sideDishes.map((sideDish, idx) => (
            <motion.div
              key={sideDish.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1, type: 'spring' }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={sideDish.image}
                    alt={sideDish.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  {!sideDish.isAvailable && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="destructive" className="text-xs px-1 py-0">
                        Indisponible
                      </Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2 pt-3 px-3">
                  <div className="flex items-start justify-between gap-1">
                    <CardTitle className="text-sm font-bold font-serif text-gray-900 line-clamp-1">
                      {sideDish.name}
                    </CardTitle>
                    <Badge 
                      variant="secondary" 
                      className="bg-amber-100 text-amber-800 border-amber-200 font-semibold flex-shrink-0 text-xs px-2 py-0"
                    >
                      {sideDish.price.toLocaleString()} FCFA
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 px-3 pb-3">
                  <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                    {sideDish.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 