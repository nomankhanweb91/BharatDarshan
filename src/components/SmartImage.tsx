import React, { useState } from 'react';
import { Compass, Image as ImageIcon } from 'lucide-react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackText?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackText,
  className = '',
  containerClassName = '',
  aspectRatio,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-teal-950 to-slate-900 text-white p-4 text-center select-none">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2 text-teal-300">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-teal-300/80">
            Bharat Darshan
          </span>
          <p className="text-sm font-medium mt-1 text-slate-200 line-clamp-2 max-w-[80%]">
            {fallbackText || alt}
          </p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`${className} transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
};
