import React from 'react';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { Destination } from '../types';
import { SmartImage } from './SmartImage';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (slug: string) => void;
  rank?: number;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelect,
  rank,
}) => {
  return (
    <div
      onClick={() => onSelect(destination.slug)}
      className="group relative flex flex-col bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-700/40 transition-all duration-300 cursor-pointer"
    >
      {/* Visual Area */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <SmartImage
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Optional Clean Rank Marker for Top 10 */}
        {typeof rank === 'number' && (
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10 shadow-xs">
            #{rank} Top Pick
          </div>
        )}

        {/* Scrim overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-200 drop-shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-teal-300 shrink-0" />
            <span className="truncate">{destination.state}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5">
        {/* Unboxed Metadata with Typographic Separator */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span>{destination.category}</span>
          <span aria-hidden="true">·</span>
          <span>{destination.duration}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-teal-800 transition-colors line-clamp-1">
          {destination.name}
        </h3>

        <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed flex-1">
          {destination.description}
        </p>

        {/* Best time note */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-500 truncate mr-2">
            <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{destination.bestTime.split('(')[0]}</span>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-slate-400 block">From</span>
            <span className="text-sm font-bold text-teal-900 tabular-nums">
              ₹{destination.startingBudget.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-3 pt-2 flex items-center justify-between text-xs font-semibold text-teal-800 group-hover:text-teal-900">
          <span>Explore Destination</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
