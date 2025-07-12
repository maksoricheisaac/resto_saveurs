"use client";
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Heart, Users, Award, Clock } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen pt-0 pb-20 bg-white">
      {/* Hero avec image de fond */}
      <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden mb-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 w-full text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 font-serif"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            À propos
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-gray-100 font-light max-w-2xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
          >
            Découvrez notre histoire, nos valeurs et notre équipe passionnée.
          </motion.p>
        </div>
      </section>
      <div className="container mx-auto px-4">
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
              Fondé en 2015 par la famille Moukala, Saveurs du Congo est né d'une passion profonde pour la cuisine traditionnelle congolaise et du désir de partager les saveurs authentiques de notre belle terre avec les habitants de Brazzaville.
            </p>
            <p className="text-gray-700 mb-4 font-light text-lg">
              Nos recettes sont transmises de génération en génération, préservant ainsi les secrets culinaires de nos ancêtres tout en les adaptant aux goûts modernes. Chaque plat raconte une histoire, chaque saveur évoque un souvenir.
            </p>
            <p className="text-gray-700 font-light text-lg">
              Nous nous engageons à utiliser uniquement des ingrédients frais et locaux, soutenant ainsi les producteurs de notre région et garantissant la qualité exceptionnelle de nos plats.
            </p>
          </motion.div>
        </div>

        {/* Values Section */}
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
            {/* Valeur 1 */}
            <motion.div
              className="text-center bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 group"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } } }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4 shadow group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <Heart className="text-white" size={28} />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 font-serif text-gray-900">Authenticité</h3>
              <p className="text-gray-600 font-light">
                Nous préservons les recettes traditionnelles tout en innovant avec respect
              </p>
            </motion.div>
            {/* Valeur 2 */}
            <motion.div
              className="text-center bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 group"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } } }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4 shadow group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <Users className="text-white" size={28} />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 font-serif text-gray-900">Convivialité</h3>
              <p className="text-gray-600 font-light">
                Nous créons une atmosphère chaleureuse où chacun se sent comme en famille
              </p>
            </motion.div>
            {/* Valeur 3 */}
            <motion.div
              className="text-center bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 group"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } } }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4 shadow group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <Award className="text-white" size={28} />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 font-serif text-gray-900">Qualité</h3>
              <p className="text-gray-600 font-light">
                Nous sélectionnons les meilleurs ingrédients pour garantir l'excellence
              </p>
            </motion.div>
            {/* Valeur 4 */}
            <motion.div
              className="text-center bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 group"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } } }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4 shadow group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <Clock className="text-white" size={28} />
              </motion.div>
              <h3 className="text-xl font-bold mb-3 font-serif text-gray-900">Tradition</h3>
              <p className="text-gray-600 font-light">
                Nous honorons notre héritage culinaire tout en embrassant l'innovation
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Team Section */}
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
          <h2 className="text-3xl font-bold text-center mb-12 font-serif text-orange-600">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Membre 1 */}
            <motion.div
              className="text-center bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } } }}
            >
              <div className="h-64 bg-gray-200 overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src="https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg"
                  alt="Chef Mama Ngozi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 font-serif text-gray-900">Mama Ngozi</h3>
                <p className="text-orange-500 font-semibold mb-3">Chef Exécutive</p>
                <p className="text-gray-600 font-light">
                  Gardienne de nos recettes ancestrales, elle apporte 25 ans d'expérience culinaire
                </p>
              </div>
            </motion.div>
            {/* Membre 2 */}
            <motion.div
              className="text-center bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } } }}
            >
              <div className="h-64 bg-gray-200 overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src="https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg"
                  alt="Chef Moise"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 font-serif text-gray-900">Chef Moïse</h3>
                <p className="text-orange-500 font-semibold mb-3">Sous-Chef</p>
                <p className="text-gray-600 font-light">
                  Spécialiste des grillades et des plats de poisson, il maîtrise l'art des épices
                </p>
              </div>
            </motion.div>
            {/* Membre 3 */}
            <motion.div
              className="text-center bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } } }}
            >
              <div className="h-64 bg-gray-200 overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src="https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg"
                  alt="Grace"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 font-serif text-gray-900">Grace</h3>
                <p className="text-orange-500 font-semibold mb-3">Responsable Service</p>
                <p className="text-gray-600 font-light">
                  Elle veille à ce que chaque client vive une expérience mémorable
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-3xl p-12 text-center shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          <h2 className="text-3xl font-bold mb-6 font-serif drop-shadow-lg">Notre Mission</h2>
          <p className="text-xl max-w-4xl mx-auto font-light">
            Faire découvrir et apprécier la richesse de la cuisine congolaise en offrant une expérience culinaire authentique, dans un cadre chaleureux qui célèbre notre culture et nos traditions, tout en créant des liens durables avec notre communauté.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

