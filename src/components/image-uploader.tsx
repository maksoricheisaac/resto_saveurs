"use client"

import { AlertCircleIcon, ImageUpIcon, XIcon, Loader2Icon } from "lucide-react"
import { useFileUpload } from "@/hooks/use-file-upload"
import { useImageUpload } from "@/hooks/use-image-upload"
import Image from "next/image"
import { useState, useEffect } from "react"

interface ImageUploaderProps {
  onImageUpload?: (url: string) => void;
  initialImage?: string;
  className?: string;
}

export default function ImageUploader({ 
  onImageUpload, 
  initialImage,
  className = "" 
}: ImageUploaderProps) {
  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024 // 5MB default
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(initialImage || null)

  const { uploading, uploadImage } = useImageUpload({
    onSuccess: (url) => {
      setUploadedImageUrl(url);
      onImageUpload?.(url);
    },
    onError: (error) => {
      console.error('Erreur upload:', error);
    }
  });

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
  })

  const previewUrl = files[0]?.preview || uploadedImageUrl

  // Gérer l'upload quand un fichier est sélectionné
  useEffect(() => {
    const handleFileUpload = async () => {
      if (files.length > 0 && files[0].file instanceof File && !uploading) {
        try {
          await uploadImage(files[0].file);
        } catch (error) {
          console.error('Erreur upload:', error);
        }
      }
    };

    handleFileUpload();
  }, [files, uploading, uploadImage]);

  const handleRemoveImage = () => {
    setUploadedImageUrl(null);
    removeFile(files[0]?.id);
    onImageUpload?.('');
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="relative">
        {/* Drop area */}
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
          />
          {previewUrl ? (
            <div className="absolute inset-0">
              <Image
                width={100}
                height={100}
                src={previewUrl}
                alt={files[0]?.file?.name || "Uploaded image"}
                className="size-full object-cover"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2Icon className="h-8 w-8 text-white animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                {uploading ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <ImageUpIcon className="size-4 opacity-60" />
                )}
              </div>
              <p className="mb-1.5 text-sm font-medium">
                {uploading ? 'Upload en cours...' : 'Déposez votre image ici ou cliquez pour parcourir'}
              </p>
              <p className="text-muted-foreground text-xs">
                Max size: {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>
        {previewUrl && !uploading && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={handleRemoveImage}
              aria-label="Remove image"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {uploadedImageUrl && (
        <p className="text-green-600 text-xs text-center">
          ✓ Image uploadée avec succès
        </p>
      )}
    </div>
  )
}
