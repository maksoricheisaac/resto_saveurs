"use client";

import { motion } from 'framer-motion';
import { Heart, Users, Award, Clock } from 'lucide-react';

export const ValuesSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Authenticité",
      description: "Nous préservons les recettes traditionnelles tout en innovant avec respect"
    },
    {
      icon: Users,
      title: "Convivialité",
      description: "Nous créons une atmosphère chaleureuse où chacun se sent comme en famille"
    },
    {
      icon: Award,
      title: "Qualité",
      description: "Nous sélectionnons les meilleurs ingrédients pour garantir l'excellence"
    },
    {
      icon: Clock,
      title: "Tradition",
      description: "Nous honorons notre héritage culinaire tout en embrassant l'innovation"
    }
  ];

  return (
    <motion.div
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.18 }
        }
      }}
    >
      <h2 className="text-3xl font-bold text-center mb-12 font-serif text-orange-600">Nos Valeurs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={index}
            className="text-center bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 group"
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } } }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4 shadow group-hover:scale-110 transition-transform duration-300"
              whileHover={{ scale: 1.15 }}
            >
              <value.icon className="text-white" size={28} />
            </motion.div>
            <h3 className="text-xl font-bold mb-3 font-serif text-gray-900">{value.title}</h3>
            <p className="text-gray-600 font-light">
              {value.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}; 