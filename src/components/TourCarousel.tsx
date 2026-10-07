import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Destination } from '../types';
import { DestinationCard } from './DestinationCard';

interface TourCarouselProps {
  destinations: Destination[];
  onSelect: (slug: string) => void;
}

export const TourCarousel: React.FC<TourCarouselProps> = ({
  destinations,
  onSelect,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = container.offsetWidth * 0.75; // Scroll approximately 1-2 cards
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative group">
      {/* Scroll Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-slate-800 shadow-md border border-slate-200 items-center justify-center hover:bg-slate-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
        aria-label="Previous tours"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white text-slate-800 shadow-md border border-slate-200 items-center justify-center hover:bg-slate-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
        aria-label="Next tours"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Cards Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="w-[85vw] sm:w-[320px] md:w-[340px] lg:w-[300px] shrink-0 snap-start"
          >
            <DestinationCard destination={dest} onSelect={onSelect} />
          </div>
        ))}
      </div>
    </div>
  );
};
