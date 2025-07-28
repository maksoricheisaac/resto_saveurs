"use client";

import Image from 'next/image';
import { GalleryImage } from '@/types';

interface GalleryGridProps {
  filteredImages: GalleryImage[];
  onImageClick: (imageUrl: string) => void;
}

export const GalleryGrid = ({ filteredImages, onImageClick }: GalleryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredImages.map((image) => (
        <div
          key={image.id}
          className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group transform hover:scale-105 transition-all duration-500"
          onClick={() => onImageClick(image.url)}
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
  );
}; 