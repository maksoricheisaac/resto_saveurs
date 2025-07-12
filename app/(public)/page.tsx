/* eslint-disable react/no-unescaped-entities */
"use client"
import React from 'react';

import { Users, Heart, ChefHat, Utensils, Award, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';


import { restaurantInfo } from '@/data/restaurant';
import Image from 'next/image';
import Link from 'next/link';
import { MenuItem } from '@/types';

export default function Home() {
  const menuItems: MenuItem[] = [];
  const featuredItems = menuItems.slice(0, 3);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${restaurantInfo.whatsapp}?text=Bonjour, je souhaite faire une réservation`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg)'
          }}
        ></div>
        {/* Overlay sombre et flou */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center text-white w-full px-4">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Logo animé */}
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-8 shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, type: 'spring' }}
            >
              <ChefHat size={40} className="text-white" />
            </motion.div>
            {/* Titre animé */}
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg tracking-tight font-serif"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, type: 'spring' }}
            >
              Saveurs du Congo
            </motion.h1>
            {/* Sous-titre animé */}
            <motion.p
              className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed text-gray-100 font-light drop-shadow-md"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, type: 'spring' }}
            >
              Découvrez les saveurs authentiques du Congo dans une ambiance chaleureuse et conviviale
            </motion.p>
            {/* Boutons animés */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center w-full"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, type: 'spring' }}
            >
              <button
                onClick={handleWhatsAppClick}
                className="bg-amber-500 hover:bg-amber-600 focus-visible:ring-4 focus-visible:ring-amber-300 text-lg px-10 py-4 rounded-full font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl outline-none"
              >
                Réserver maintenant
              </button>
              <Link
                href="/menu"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white focus-visible:ring-4 focus-visible:ring-amber-300 text-lg px-10 py-4 rounded-full font-semibold shadow-md transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-xl outline-none"
              >
                Voir le menu
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 font-serif tracking-tight drop-shadow-sm">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Une expérience culinaire unique qui célèbre la richesse de la culture congolaise
            </p>
          </div>
          {/* Animation d'apparition en cascade */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18
                }
              }
            }}
          >
            {/* Feature 1 */}
            <motion.div
              className="text-center group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } }
              }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-transform duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <Utensils className="text-white" size={28} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 font-serif">Cuisine Authentique</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Plats traditionnels congolais préparés avec des ingrédients frais et des recettes ancestrales
              </p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="text-center group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } }
              }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-transform duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <Users className="text-white" size={28} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 font-serif">Ambiance Conviviale</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Un cadre chaleureux et accueillant où chacun se sent comme en famille
              </p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div
              className="text-center group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } }
              }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 group-hover:shadow-xl transition-transform duration-300"
                whileHover={{ scale: 1.15 }}
              >
                <Award className="text-white" size={28} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 font-serif">Excellence Reconnue</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Une réputation d'excellence bâtie sur la qualité et la satisfaction de nos clients
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 font-serif text-gradient drop-shadow-sm">
              Nos Spécialités
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Découvrez quelques-unes de nos spécialités congolaises les plus appréciées
            </p>
          </div>
          {/* Animation d'apparition en cascade des cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18
                }
              }
            }}
          >
            {featuredItems.map((item) => (
              <motion.div
                key={item.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } }
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    width={500}
                    height={500}
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-amber-600/90 text-white px-4 py-1 rounded-full text-base font-semibold shadow-md">
                    {item.price.toLocaleString()} FCFA
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 font-serif">{item.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 font-light">{item.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-gradient">
                      {item.price.toLocaleString()} FCFA
                    </span>
                    <button 
                      onClick={handleWhatsAppClick}
                      className="bg-amber-500 hover:bg-amber-600 focus-visible:ring-4 focus-visible:ring-amber-300 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl outline-none"
                    >
                      Commander
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-14">
            <Link
              href="/menu"
              className="bg-amber-500 hover:bg-amber-600 focus-visible:ring-4 focus-visible:ring-amber-300 text-white text-lg px-10 py-4 rounded-full font-semibold shadow-md transition-all duration-200 inline-block hover:-translate-y-1 hover:shadow-xl outline-none"
            >
              Voir tout le menu
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="container-custom">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {/* Stat 1 */}
            <motion.div
              className="rounded-2xl py-10 px-2 bg-white/5 hover:bg-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center group"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } }
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
            >
              <span className="text-5xl md:text-6xl font-extrabold mb-2 font-serif drop-shadow-lg">500+</span>
              <span className="text-lg md:text-xl text-amber-100 font-light tracking-wide">Clients satisfaits</span>
            </motion.div>
            {/* Stat 2 */}
            <motion.div
              className="rounded-2xl py-10 px-2 bg-white/5 hover:bg-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center group"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } }
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
            >
              <span className="text-5xl md:text-6xl font-extrabold mb-2 font-serif drop-shadow-lg">15+</span>
              <span className="text-lg md:text-xl text-amber-100 font-light tracking-wide">Spécialités</span>
            </motion.div>
            {/* Stat 3 */}
            <motion.div
              className="rounded-2xl py-10 px-2 bg-white/5 hover:bg-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center group"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } }
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
            >
              <span className="text-5xl md:text-6xl font-extrabold mb-2 font-serif drop-shadow-lg">8</span>
              <span className="text-lg md:text-xl text-amber-100 font-light tracking-wide">Années d'expérience</span>
            </motion.div>
            {/* Stat 4 */}
            <motion.div
              className="rounded-2xl py-10 px-2 bg-white/5 hover:bg-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center group"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } }
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
            >
              <span className="text-5xl md:text-6xl font-extrabold mb-2 font-serif drop-shadow-lg">4.8★</span>
              <span className="text-lg md:text-xl text-amber-100 font-light tracking-wide">Note moyenne</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom text-center">
          <motion.div
            className="max-w-4xl mx-auto flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18
                }
              }
            }}
          >
            {/* Icône cœur animée */}
            <motion.div
              className="mb-8"
              variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', duration: 0.7 } } }}
              animate={{
                scale: [1, 1.15, 1],
                transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
              }}
            >
              <Heart size={56} className="mx-auto text-amber-500 drop-shadow-lg" />
            </motion.div>
            {/* Titre animé */}
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold mb-8 font-serif drop-shadow-lg"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } } }}
            >
              Prêt à vivre une expérience culinaire unique ?
            </motion.h2>
            {/* Texte animé */}
            <motion.p
              className="text-xl mb-12 text-gray-300 leading-relaxed font-light max-w-2xl mx-auto"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } } }}
            >
              Réservez votre table dès maintenant et découvrez les saveurs authentiques du Congo
            </motion.p>
            {/* Boutons animés */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center w-full"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.7 } } }}
            >
              <button
                onClick={handleWhatsAppClick}
                className="bg-amber-500 hover:bg-amber-600 focus-visible:ring-4 focus-visible:ring-amber-300 text-lg px-10 py-4 rounded-full font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl outline-none"
              >
                Réserver sur WhatsApp
              </button>
              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white focus-visible:ring-4 focus-visible:ring-amber-300 text-lg px-10 py-4 rounded-full font-semibold shadow-md transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-1 hover:shadow-xl outline-none"
              >
                Nous contacter
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

