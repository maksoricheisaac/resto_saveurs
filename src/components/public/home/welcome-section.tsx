/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import Image from 'next/image';

export const WelcomeSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenu de bienvenue */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4"
              >
                <Heart className="w-4 h-4 mr-2" />
                Bienvenue chez Restaurant Saveurs
              </motion.div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-serif leading-tight">
              Bienvenue dans notre
              <span className="text-amber-600 block">maison culinaire</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Découvrez l'authenticité des saveurs congolaises dans un cadre chaleureux et accueillant. 
              Notre équipe passionnée vous invite à vivre une expérience gastronomique unique, 
              où chaque plat raconte une histoire et chaque service est une marque d'affection.
            </p>
          </motion.div>

          {/* Image et caractéristiques */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Image principale */}
            <div className="relative">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/fallback.png"
                  alt="Restaurant Saveurs - Ambiance chaleureuse"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Ambiance chaleureuse</p>
                  <p className="text-xs opacity-90">Découvrez notre espace convivial</p>
                </div>
              </div>
              
              {/* Badge flottant */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-amber-600 text-white px-4 py-2 rounded-full shadow-lg"
              >
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span className="text-sm font-medium">4.8/5</span>
                </div>
                <p className="text-xs opacity-90">Note clients</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};