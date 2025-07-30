'use client';
import { restaurantInfo } from '@/data/restaurant';
import { motion } from 'framer-motion';
import { ArrowRight, ChefHat } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
    const handleWhatsAppClick = () => {
        window.open(`https://wa.me/${restaurantInfo.whatsapp}?text=Bonjour, je souhaite faire une réservation`, '_blank');
    };

    return (
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
              Resto Saveurs
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
    )
}