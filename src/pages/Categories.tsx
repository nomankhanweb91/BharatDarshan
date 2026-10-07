import React from 'react';
import { ArrowRight } from 'lucide-react';
import { travelCategories } from '../data/categories';
import { SmartImage } from '../components/SmartImage';

interface CategoriesProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
          Travel Discovery Styles
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Explore India by Travel Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Choose your travel style—from sacred pilgrimage circuits and high-altitude Himalayan escapes to sun-soaked beaches and royal heritage citadels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {travelCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className="group relative flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-700/50 transition-all cursor-pointer"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
              <SmartImage
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="absolute top-3 left-3 text-xl p-2 bg-white/20 backdrop-blur-xs rounded-xl">
                {cat.icon}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-bold text-lg font-heading drop-shadow-xs">
                  {cat.name}
                </h3>
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">
              <p className="text-xs text-slate-600 leading-relaxed">
                {cat.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-800 font-bold group-hover:text-teal-900">
                <span>{cat.count} Curated Destinations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
