"use client";

import { motion } from 'framer-motion';

export const HeroBanner = () => {
  return (
    <section className="relative h-[38vh] md:h-[48vh] flex items-center justify-center overflow-hidden mb-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg)'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full text-center px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 font-serif"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          Contactez-nous
        </motion.h1>
        <motion.p
          className="text-xl max-w-2xl mx-auto text-gray-100 font-light drop-shadow-md"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
        >
          Nous sommes à votre écoute pour toute question ou réservation.
        </motion.p>
      </div>
    </section>
  );
}; 