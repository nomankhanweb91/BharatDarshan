import React, { useState, useMemo } from 'react';
import { Clock, MapPin, Check, ArrowRight } from 'lucide-react';
import { tourPackages } from '../data/packages';
import { SmartImage } from '../components/SmartImage';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { AdSlot } from '../components/AdSlot';

interface PackagesProps {
  onSelectPackage: (slug: string) => void;
  onOpenBookingForPackage: (packageTitle: string) => void;
}

export const Packages: React.FC<PackagesProps> = ({
  onSelectPackage,
  onOpenBookingForPackage,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = [
    { label: 'All Packages', value: 'all' },
    { label: 'Spiritual Circuits', value: 'Spiritual' },
    { label: 'Family Tours', value: 'Family' },
    { label: 'Standard Comfort', value: 'Standard' },
    { label: 'Premium & Luxury', value: 'Premium' },
  ];

  const filteredPackages = useMemo(() => {
    if (selectedFilter === 'all') return tourPackages;
    return tourPackages.filter((p) => p.category === selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
          Curated Holiday & Pilgrimage Packages
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Popular Tour Packages
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Complete itineraries covering Kashmir, Varanasi, Golden Temple, Ayodhya, Goa, and Kerala with verified transport and transparent estimates.
        </p>
      </div>

      {/* Interactive Filter Tabs (Buttons with click handlers) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedFilter(cat.value)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedFilter === cat.value
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
          >
            {/* Visual Header */}
            <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
              <SmartImage
                src={pkg.heroImage}
                alt={pkg.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-teal-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                {pkg.duration}
              </div>
              <div className="absolute bottom-3 left-3 text-white text-xs font-medium flex items-center gap-1 drop-shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-teal-300" />
                <span>{pkg.destinationName}, {pkg.state}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col flex-1">
              <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider block mb-1">
                {pkg.category} Circuit
              </span>

              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-heading group-hover:text-teal-800 transition-colors line-clamp-1">
                {pkg.title}
              </h2>

              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {pkg.subtitle}
              </p>

              <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed flex-1">
                {pkg.overview}
              </p>

              {/* Highlights Inclusions Preview */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span className="truncate">{pkg.hotelCategory}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span className="truncate">{pkg.transport}</span>
                </div>
              </div>

              {/* Pricing & Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Starting from</span>
                  <span className="text-base sm:text-lg font-bold text-teal-900 tabular-nums">
                    ₹{pkg.startingPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400"> / person</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectPackage(pkg.slug)}
                    className="px-3.5 py-2 bg-teal-800 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <span>View Package</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <WhatsAppButton
                    packageTitle={pkg.title}
                    label="WhatsApp"
                    variant="subtle"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ad Placement */}
      <AdSlot position="BottomContentAd" adSlotId="6758493021" />
    </div>
  );
};
