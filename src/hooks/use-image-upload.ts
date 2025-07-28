import { useState, useCallback } from 'react';

interface UseImageUploadOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: string) => void;
}

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [lastUploadedFile, setLastUploadedFile] = useState<string | null>(null);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    // Créer une clé unique pour le fichier
    const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
    
    // Éviter l'upload multiple du même fichier
    if (lastUploadedFile === fileKey && uploadedUrl) {
      return uploadedUrl;
    }

    setUploading(true);
    
    try {
      const filename = `menu/${Date.now()}-${file.name}`;
      
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(filename)}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Échec de l\'upload de l\'image');
      }

      const data = await response.json();
      const imageUrl = data.url;
      
      setUploadedUrl(imageUrl);
      setLastUploadedFile(fileKey);
      options.onSuccess?.(imageUrl);
      
      return imageUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'upload de l\'image';
      options.onError?.(errorMessage);
      throw error;
    } finally {
      setUploading(false);
    }
  }, [lastUploadedFile, uploadedUrl, options]);

  const reset = useCallback(() => {
    setUploadedUrl(null);
    setLastUploadedFile(null);
    setUploading(false);
  }, []);

  return {
    uploading,
    uploadedUrl,
    uploadImage,
    reset,
  };
} 