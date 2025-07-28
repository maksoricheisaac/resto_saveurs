"use client";

import { X } from 'lucide-react';
import Image from 'next/image';

interface ImageModalProps {
  selectedImage: string | null;
  onClose: () => void;
}

export const ImageModal = ({ selectedImage, onClose }: ImageModalProps) => {
  if (!selectedImage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="relative max-w-4xl max-h-full">
        <button
          onClick={onClose}
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
  );
}; 