"use client";

import { useState } from 'react';
import { initialGalleryImages } from '@/data/restaurant';
import type { GalleryImage } from '@/types';
import { HeroBanner } from '@/components/public/gallery/hero-banner';
import { HeaderSection } from '@/components/public/gallery/header-section';
import { CategoryFilters } from '@/components/public/gallery/category-filters';
import { GalleryGrid } from '@/components/public/gallery/gallery-grid';
import { ImageModal } from '@/components/public/gallery/image-modal';
import { CtaSection } from '@/components/public/gallery/cta-section';

export default function GalleryClient() {
  const galleryImages: GalleryImage[] = initialGalleryImages;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredImages = galleryImages.filter((image: GalleryImage) => 
    selectedCategory === 'all' || image.category === selectedCategory
  );

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen pt-0 pb-20 bg-white">
      {/* Hero avec image de fond */}
      <HeroBanner />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <HeaderSection />

        {/* Category Filter */}
        <CategoryFilters 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Gallery Grid */}
        <GalleryGrid 
          filteredImages={filteredImages}
          onImageClick={handleImageClick}
        />

        {/* Modal for enlarged image */}
        <ImageModal 
          selectedImage={selectedImage}
          onClose={handleCloseModal}
        />

        {/* Call to Action */}
        <CtaSection />
      </div>
    </div>
  );
} 