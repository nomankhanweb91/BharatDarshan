import React from 'react';
import { MapPin, Calendar, Compass, ArrowLeft } from 'lucide-react';
import { statesData } from '../data/states';
import { getDestinationsByState } from '../data/destinations';
import { DestinationCard } from '../components/DestinationCard';
import { SmartImage } from '../components/SmartImage';
import { AdSlot } from '../components/AdSlot';
import { WhatsAppButton } from '../components/WhatsAppButton';

interface StateDetailsProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectDestination: (slug: string) => void;
}

export const StateDetails: React.FC<StateDetailsProps> = ({
  slug,
  onNavigate,
  onSelectDestination,
}) => {
  const stateInfo = statesData.find((s) => s.slug === slug);
  const stateDestinations = getDestinationsByState(slug);

  if (!stateInfo) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">State Guide Not Found</h2>
        <button
          onClick={() => onNavigate('/states')}
          className="px-5 py-2.5 bg-teal-800 text-white rounded-lg text-sm font-semibold hover:bg-teal-700"
        >
          View All States
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 pb-3 border-b border-slate-200">
          <button
            onClick={() => onNavigate('/states')}
            className="flex items-center gap-1 hover:text-teal-800 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All States</span>
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-slate-900 font-semibold">{stateInfo.name}</span>
        </div>
      </div>

      {/* State Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden min-h-[340px] sm:min-h-[400px] flex items-end p-6 sm:p-10 bg-slate-900 shadow-xl border border-slate-200">
          <SmartImage
            src={stateInfo.image}
            alt={stateInfo.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-3 text-white">
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider block">
              State Travel Guide
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
              {stateInfo.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {stateInfo.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-white/90">
              <div className="bg-black/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-300" />
                <span>Capital: {stateInfo.capital}</span>
              </div>
              <div className="bg-black/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-300" />
                <span>Best: {stateInfo.bestTime.split('(')[0]}</span>
              </div>
            </div>

            <div className="pt-2">
              <WhatsAppButton
                message={`Hello Bharat Darshan, I would like to plan a tour to ${stateInfo.name}. Please share customized itineraries.`}
                label={`Enquire for ${stateInfo.name} Tours`}
                className="px-5 py-2.5 text-xs font-bold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Highlights & Top Sights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <h2 className="text-lg font-bold font-heading text-slate-900">
            Known For & Regional Travel Highlights
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {stateInfo.knownFor.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium text-slate-800 flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-teal-700 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations in this state */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
            Destinations in {stateInfo.name}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified individual guides with route information, railway stations, airports, and budget breakdowns.
          </p>
        </div>

        {stateDestinations.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
            More destinations for {stateInfo.name} are currently being mapped by our research team. Contact us on WhatsApp for custom itineraries in this state.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stateDestinations.map((d) => (
              <DestinationCard
                key={d.id}
                destination={d}
                onSelect={onSelectDestination}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot position="BottomContentAd" adSlotId="3829104820" />
      </div>
    </div>
  );
};
