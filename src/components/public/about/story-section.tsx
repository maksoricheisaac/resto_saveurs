"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export const StorySection = () => {
  return (
    <>
      {/* Hero Section */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 font-serif drop-shadow-lg text-gray-900">
          Notre Histoire
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
          Une passion familiale pour la cuisine congolaise authentique transmise de génération en génération
        </p>
      </motion.div>

      {/* Main Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20 items-center">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          <div className="overflow-hidden rounded-3xl shadow-xl group">
            <Image
              width={500}
              height={500}
              src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg"
              alt="Ambiance chaleureuse du restaurant"
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, type: 'spring', delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6 font-serif text-orange-600">Une Tradition Familiale</h2>
          <p className="text-gray-700 mb-4 font-light text-lg">
            Fondé en 2015 par la famille Moukala, Resto Saveurs est né d&apos;une passion profonde pour la cuisine traditionnelle congolaise et du désir de partager les saveurs authentiques de notre belle terre avec les habitants de Brazzaville.
          </p>
          <p className="text-gray-700 mb-4 font-light text-lg">
            Nos recettes sont transmises de génération en génération, préservant ainsi les secrets culinaires de nos ancêtres tout en les adaptant aux goûts modernes. Chaque plat raconte une histoire, chaque saveur évoque un souvenir.
          </p>
          <p className="text-gray-700 font-light text-lg">
            Nous nous engageons à utiliser uniquement des ingrédients frais et locaux, soutenant ainsi les producteurs de notre région et garantissant la qualité exceptionnelle de nos plats.
          </p>
        </motion.div>
      </div>
    </>
  );
}; 