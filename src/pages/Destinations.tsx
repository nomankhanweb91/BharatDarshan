import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, MapPin } from 'lucide-react';
import { DestinationCard } from '../components/DestinationCard';
import { AdSlot } from '../components/AdSlot';
import { allDestinations } from '../data/destinations';
import { travelCategories } from '../data/categories';
import { statesData } from '../data/states';

interface DestinationsProps {
  onSelectDestination: (slug: string) => void;
  initialCategory?: string;
  initialState?: string;
}

export const Destinations: React.FC<DestinationsProps> = ({
  onSelectDestination,
  initialCategory = 'all',
  initialState = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedState, setSelectedState] = useState(initialState);
  const [sortBy, setSortBy] = useState<'recommended' | 'budget-asc' | 'budget-desc' | 'alphabetical'>('recommended');

  const filteredDestinations = useMemo(() => {
    return allDestinations
      .filter((dest) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matches =
            dest.name.toLowerCase().includes(q) ||
            dest.state.toLowerCase().includes(q) ||
            dest.category.toLowerCase().includes(q) ||
            dest.subCategory?.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Category filter
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'religious-tours' || selectedCategory === 'Religious & Spiritual') {
            if (dest.category !== 'Religious & Spiritual') return false;
          } else {
            const catMatch =
              dest.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === selectedCategory ||
              dest.subCategory?.toLowerCase().replace(/[^a-z0-9]/g, '-') === selectedCategory;
            if (!catMatch) return false;
          }
        }

        // State filter
        if (selectedState !== 'all') {
          if (dest.state.toLowerCase().replace(/[^a-z0-9]/g, '-') !== selectedState) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'budget-asc') return a.startingBudget - b.startingBudget;
        if (sortBy === 'budget-desc') return b.startingBudget - a.startingBudget;
        if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
        // Default recommended: trending first, then rank
        const rankA = a.top10Rank ?? 99;
        const rankB = b.top10Rank ?? 99;
        return rankA - rankB;
      });
  }, [searchQuery, selectedCategory, selectedState, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
          Explore India Directory
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          All Travel Destinations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Discover verified Indian travel destinations with verified rail connections, nearest airports, best seasons, and estimated budgets.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination, city..."
              className="w-full text-xs border border-slate-300 rounded-lg py-2.5 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-teal-700 bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Travel Style Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs font-medium border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white"
            >
              <option value="all">All Travel Styles</option>
              {travelCategories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full text-xs font-medium border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white"
            >
              <option value="all">All States & UTs</option>
              {statesData.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full text-xs font-medium border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white"
            >
              <option value="recommended">Recommended & Popular</option>
              <option value="budget-asc">Budget: Low to High</option>
              <option value="budget-desc">Budget: High to Low</option>
              <option value="alphabetical">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Active Filter Pills (Functional Buttons) */}
        {(selectedCategory !== 'all' || selectedState !== 'all' || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-medium">Active Filters:</span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors"
              >
                Style: {selectedCategory} ✕
              </button>
            )}
            {selectedState !== 'all' && (
              <button
                onClick={() => setSelectedState('all')}
                className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors"
              >
                State: {selectedState} ✕
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors"
              >
                Search: &quot;{searchQuery}&quot; ✕
              </button>
            )}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedState('all');
                setSearchQuery('');
              }}
              className="text-slate-500 hover:text-slate-800 underline ml-2"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Destinations Grid */}
      {filteredDestinations.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <p className="text-base font-semibold text-slate-700">
            No destinations found matching your filter criteria.
          </p>
          <p className="text-xs text-slate-400">
            Try adjusting your search terms or reset the filters to see all available destinations.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedState('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-teal-800 text-white rounded-lg text-xs font-semibold hover:bg-teal-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
            <span>Showing {filteredDestinations.length} destinations</span>
            <span>Estimated budgets in INR (₹)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelect={onSelectDestination}
                rank={dest.top10Rank}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Ad */}
      <AdSlot position="BottomContentAd" adSlotId="9182736450" />
    </div>
  );
};
