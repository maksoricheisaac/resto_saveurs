"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';
import type { Testimonial } from '@/types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marie Nkounkou',
    rating: 5,
    comment: 'Excellente expérience culinaire ! Le poulet moambé était délicieux et l\'ambiance très chaleureuse. Je recommande vivement !',
    date: new Date('2024-01-15'),
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  },
  {
    id: '2',
    name: 'Jean-Pierre Makaya',
    rating: 5,
    comment: 'Un restaurant authentique qui nous fait découvrir les vraies saveurs du Congo. Le service est impeccable et les prix raisonnables.',
    date: new Date('2024-01-20'),
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
  },
  {
    id: '3',
    name: 'Sophie Mboumba',
    rating: 4,
    comment: 'Très bon restaurant africain. Les plats sont savoureux et bien présentés. L\'équipe est accueillante et professionnelle.',
    date: new Date('2024-01-25'),
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
  },
  {
    id: '4',
    name: 'David Nzamba',
    rating: 5,
    comment: 'Parfait pour un dîner en famille ou entre amis. La cuisine traditionnelle congolaise est excellente et l\'ambiance conviviale.',
    date: new Date('2024-01-30'),
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
  },
  {
    id: '5',
    name: 'Claire Bemba',
    rating: 5,
    comment: 'Un vrai coup de cœur ! Les saveurs sont authentiques et le personnel très attentionné. Je reviendrai certainement.',
    date: new Date('2024-02-05'),
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Ce que disent nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les avis de nos clients satisfaits qui ont vécu une expérience culinaire unique
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full h-full"
              >
                <div className="flex flex-col md:flex-row items-center p-8 md:p-12">
                  {/* Image du client */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                    <Image
                      src={testimonials[currentIndex].image || '/fallback.png'}
                      alt={testimonials[currentIndex].name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Contenu du témoignage */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Icône de citation */}
                    <Quote className="w-8 h-8 text-amber-500 mb-4 mx-auto md:mx-0" />
                    
                    {/* Commentaire */}
                    <blockquote className="text-lg md:text-xl text-gray-700 mb-6 italic leading-relaxed">
                      &ldquo;{testimonials[currentIndex].comment}&rdquo;
                    </blockquote>

                    {/* Informations du client */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {formatDate(testimonials[currentIndex].date)}
                        </p>
                      </div>
                      
                      {/* Note */}
                      <div className="flex items-center gap-1 mt-2 md:mt-0">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`${
                              i < testimonials[currentIndex].rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Boutons de navigation */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
            
            <button
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-amber-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Statistiques */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">4.8/5</div>
            <p className="text-gray-600">Note moyenne</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">500+</div>
            <p className="text-gray-600">Clients satisfaits</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-600 mb-2">98%</div>
            <p className="text-gray-600">Recommande le restaurant</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 