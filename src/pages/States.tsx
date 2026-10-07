import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { statesData } from '../data/states';
import { SmartImage } from '../components/SmartImage';

interface StatesProps {
  onSelectState: (slug: string) => void;
}

export const States: React.FC<StatesProps> = ({ onSelectState }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
          State-Wise Tourism Directory
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Explore India by States & Union Territories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Dive into regional travel guides featuring state capitals, optimal seasonal windows, iconic attractions, and local travel styles across India.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statesData.map((st) => (
          <div
            key={st.id}
            onClick={() => onSelectState(st.slug)}
            className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-700/50 transition-all cursor-pointer"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
              <SmartImage
                src={st.image}
                alt={st.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="font-bold text-lg font-heading drop-shadow-xs">
                  {st.name}
                </h3>
                <span className="text-xs text-teal-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {st.capital}
                </span>
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {st.description}
              </p>

              <div className="space-y-2">
                <div className="text-[11px] text-slate-500">
                  <strong className="text-slate-700">Best Season:</strong> {st.bestTime.split('(')[0]}
                </div>

                <div className="flex flex-wrap gap-1 text-[11px]">
                  {st.knownFor.slice(0, 3).map((k, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-800 font-bold group-hover:text-teal-900">
                <span>View State Destinations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
