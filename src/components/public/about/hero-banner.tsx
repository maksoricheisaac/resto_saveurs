"use client";

import { motion } from 'framer-motion';

export const HeroBanner = () => {
  return (
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
  );
}; 