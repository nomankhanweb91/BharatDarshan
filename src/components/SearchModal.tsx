import React, { useState, useMemo } from 'react';
import { Search, X, MapPin, ArrowRight } from 'lucide-react';
import { allDestinations } from '../data/destinations';
import { SmartImage } from './SmartImage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDestination,
}) => {
  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return allDestinations.filter((d) => {
      const matchName = d.name.toLowerCase().includes(q);
      const matchState = d.state.toLowerCase().includes(q);
      const matchCategory = d.category.toLowerCase().includes(q);
      const matchSub = d.subCategory?.toLowerCase().includes(q) ?? false;
      const matchReligion = d.religionType?.toLowerCase().includes(q) ?? false;
      const matchDesc = d.description.toLowerCase().includes(q);
      const matchTagline = d.tagline.toLowerCase().includes(q);
      const matchPlaces = d.placesToVisit.some((p) => p.name.toLowerCase().includes(q));

      return (
        matchName ||
        matchState ||
        matchCategory ||
        matchSub ||
        matchReligion ||
        matchDesc ||
        matchTagline ||
        matchPlaces
      );
    });
  }, [query]);

  const quickSearches = [
    'Kashmir',
    'Varanasi',
    'Golden Temple',
    'Ajmer Sharif',
    'Bodh Gaya',
    'Goa Churches',
    'Ayodhya',
    'Manali',
    'Jain Temples',
    'Taj Mahal',
  ];

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20"
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-200 flex items-center px-4 py-3.5">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destination, temple, mosque, church, state, or tour..."
            className="w-full text-base sm:text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Search Chips */}
        {!query && (
          <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {quickSearches.map((item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-teal-700 hover:text-teal-800 transition-colors shadow-2xs"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-slate-100">
          {query.trim() && filteredResults.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-medium">No destinations found for &quot;{query}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for &quot;Varanasi&quot;, &quot;Kashmir&quot;, &quot;Goa&quot;, or &quot;Temples&quot;
              </p>
            </div>
          )}

          {filteredResults.map((dest) => (
            <div
              key={dest.id}
              onClick={() => {
                onSelectDestination(dest.slug);
                onClose();
              }}
              className="py-3 px-2 flex items-center gap-3.5 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                <SmartImage
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-0.5">
                  <span className="text-teal-700 font-medium">{dest.category}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {dest.state}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors truncate">
                  {dest.name}
                </h4>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {dest.tagline || dest.description}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <span className="text-xs font-bold text-teal-800 block tabular-nums">
                  ₹{dest.startingBudget.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-teal-600 font-medium inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
