/* eslint-disable react/no-unescaped-entities */
"use client"
import { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { initialGalleryImages } from '@/data/restaurant';
import type { GalleryImage } from '@/types';
import { motion } from 'framer-motion';

export default function Gallery(){
  // const { galleryImages } = useRestaurant();
  const galleryImages: GalleryImage[] = initialGalleryImages;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Toutes' },
    { id: 'food', name: 'Plats' },
    { id: 'ambiance', name: 'Ambiance' },
    { id: 'event', name: 'Événements' }
  ];

  const filteredImages = galleryImages.filter((image: GalleryImage) => 
    selectedCategory === 'all' || image.category === selectedCategory
  );

  return (
    <div className="min-h-screen pt-0 pb-20 bg-white">
      {/* Hero avec image de fond */}
      <section className="relative h-[38vh] md:h-[48vh] flex items-center justify-center overflow-hidden mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg)'
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
            Galerie Photos
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto text-gray-100 font-light drop-shadow-md"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
          >
            Plongez dans l'univers de Saveurs du Congo à travers nos plus belles images.
          </motion.p>
        </div>
      </section>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">Galerie Photos</h1>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Plongez dans l'univers de Saveurs du Congo à travers nos plus belles images
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group transform hover:scale-105 transition-all duration-500"
              onClick={() => setSelectedImage(image.url)}
            >
              <Image
                width={500}
                height={500}
                src={image.url}
                alt={image.alt}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 image-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center px-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-orange-400 z-10 bg-black/50 rounded-full p-2 transition-colors duration-300"
              >
                <X size={32} />
              </button>
              <Image
                width={500}
                height={500}
                src={selectedImage}
                alt="Image agrandie"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="hero-gradient text-white rounded-2xl p-16 text-center mt-20 relative overflow-hidden">
          <div className="absolute inset-0 african-pattern"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Venez découvrir notre ambiance !</h2>
            <div className="section-divider w-24 mx-auto mb-6"></div>
            <p className="text-xl mb-10">
            Réservez votre table et vivez l'expérience Saveurs du Congo
            </p>
            <button 
            onClick={() => window.open(`https://wa.me/${'+242061234567'}?text=Bonjour, je souhaite réserver une table`, '_blank')}
            className="bg-white text-orange-500 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Réserver maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

