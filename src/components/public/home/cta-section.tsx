"use client";

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { restaurantInfo } from '@/data/restaurant';

export const CtaSection = () => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${restaurantInfo.whatsapp}?text=Bonjour, je souhaite vous contacter`, '_blank');
  };

  return (
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
  );
}; 