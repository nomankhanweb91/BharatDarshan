import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface GalleryProps {
  images: string[];
  destinationName: string;
}

export const Gallery: React.FC<GalleryProps> = ({ images, destinationName }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === 0 ? images.length - 1 : prev! - 1));
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! === images.length - 1 ? 0 : prev! + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Primary Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden">
        {/* Large Marquee Image */}
        <div
          onClick={() => openLightbox(0)}
          className="md:col-span-2 md:row-span-2 relative aspect-4/3 md:aspect-auto md:h-full overflow-hidden group cursor-pointer bg-slate-100"
        >
          <SmartImage
            src={images[0]}
            alt={`${destinationName} primary view`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-xs font-medium px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>View Full Gallery</span>
          </div>
        </div>

        {/* Supporting Thumbnails */}
        {images.slice(1, 5).map((img, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx + 1)}
            className="relative aspect-4/3 overflow-hidden group cursor-pointer bg-slate-100 rounded-lg md:rounded-none"
          >
            <SmartImage
              src={img}
              alt={`${destinationName} gallery photo ${idx + 2}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
            {idx === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center text-white font-bold text-sm">
                +{images.length - 5} More
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all focus:outline-none"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter and Title */}
          <div className="absolute top-4 left-4 z-50 text-white text-sm">
            <span className="font-semibold">{destinationName}</span>
            <span className="mx-2 text-white/50">·</span>
            <span className="text-white/70">
              {lightboxIndex + 1} of {images.length}
            </span>
          </div>

          {/* Prev Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all focus:outline-none"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Display */}
          <div className="max-w-5xl max-h-[85vh] flex items-center justify-center overflow-hidden">
            <SmartImage
              src={images[lightboxIndex]}
              alt={`${destinationName} image full view`}
              className="max-h-[85vh] max-w-full object-contain rounded-lg"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all focus:outline-none"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
