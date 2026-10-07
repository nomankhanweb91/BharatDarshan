import React, { useState, useMemo } from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';
import { DestinationCard } from '../components/DestinationCard';
import { spiritualDestinations } from '../data/destinations/spiritual';
import { tourPackages } from '../data/packages';
import { statesData } from '../data/states';
import { AdSlot } from '../components/AdSlot';
import { WhatsAppButton } from '../components/WhatsAppButton';

interface ReligiousToursProps {
  onSelectDestination: (slug: string) => void;
  onSelectPackage: (slug: string) => void;
}

export const ReligiousTours: React.FC<ReligiousToursProps> = ({
  onSelectDestination,
  onSelectPackage,
}) => {
  const [selectedFaith, setSelectedFaith] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [budgetMax, setBudgetMax] = useState<number>(30000);

  const faithOptions = [
    { label: 'All Traditions', value: 'all', icon: '🏛️' },
    { label: 'Hindu Temples', value: 'Hindu', icon: '🛕' },
    { label: 'Mosques & Islamic Heritage', value: 'Islamic', icon: '🕌' },
    { label: 'Churches & Christian Heritage', value: 'Christian', icon: '⛪' },
    { label: 'Sikh Gurudwaras', value: 'Sikh', icon: '🛕' },
    { label: 'Buddhist Monasteries', value: 'Buddhist', icon: '☸️' },
    { label: 'Jain Temples', value: 'Jain', icon: '🕉️' },
  ];

  const filteredSpiritual = useMemo(() => {
    return spiritualDestinations.filter((d) => {
      if (selectedFaith !== 'all' && d.religionType !== selectedFaith) return false;
      if (selectedState !== 'all' && d.state !== selectedState) return false;
      if (d.startingBudget > budgetMax) return false;
      return true;
    });
  }, [selectedFaith, selectedState, budgetMax]);

  const spiritualPackages = tourPackages.filter((p) => p.category === 'Spiritual');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-teal-800/40">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs text-amber-300 font-semibold border border-white/10">
            <span>Sacred Circuits of India</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Religious & Spiritual Tours
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Discover sacred destinations across India presented with dignity, cultural context, and verified visitor information. From the ancient ghats of Varanasi and the golden radiance of Amritsar’s Harmandir Sahib, to tranquil Buddhist monasteries in Bodh Gaya, Sufi shrines in Ajmer, historic Goan basilicas, and marble Jain sanctuaries.
          </p>

          {/* Respectful Content Statement */}
          <div className="pt-2 flex items-start gap-2.5 text-xs text-slate-300 bg-black/30 p-3 rounded-xl border border-white/10">
            <ShieldCheck className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Respectful Tourism Policy:</strong> All places of worship are presented neutrally and respectfully as part of India&apos;s rich cultural tapestry. We provide verified visiting etiquette, official timings, dress guidelines, and logistics without theological comparison.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs by Tradition */}
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Filter by Faith & Site Type
        </span>

        <div className="flex flex-wrap gap-2">
          {faithOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedFaith(opt.value)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                selectedFaith === opt.value
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Filters: State & Budget */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Filter by State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="border border-slate-300 rounded-lg p-2 bg-slate-50 font-medium"
            >
              <option value="all">All States</option>
              {statesData.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Max Budget:</span>
            <span className="font-bold text-teal-900 tabular-nums">
              ₹{budgetMax.toLocaleString('en-IN')}
            </span>
            <input
              type="range"
              min="5000"
              max="30000"
              step="1000"
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              className="accent-teal-700 ml-2"
            />
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedFaith('all');
            setSelectedState('all');
            setBudgetMax(30000);
          }}
          className="text-slate-500 hover:text-slate-800 underline"
        >
          Reset Filters
        </button>
      </div>

      {/* Destinations Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredSpiritual.length} spiritual & religious destinations</span>
          <span>Verified visiting rules & timings included</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpiritual.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onSelect={onSelectDestination}
            />
          ))}
        </div>
      </div>

      {/* Top Content Ad */}
      <AdSlot position="TopContentAd" adSlotId="9876543210" />

      {/* Dedicated Spiritual Tour Packages */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
            Pilgrim Circuit Itineraries
          </span>
          <h2 className="text-2xl font-bold font-heading text-slate-900">
            Dedicated Religious Tour Packages
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pre-planned spiritual journeys with comfortable stays, pilgrim assistance, and verified transport.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spiritualPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[11px] font-semibold text-teal-800 uppercase block mb-1">
                  {pkg.duration}
                </span>
                <h3 className="font-bold text-base text-slate-900 font-heading">
                  {pkg.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                  {pkg.overview}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Starting from</span>
                  <span className="font-bold text-sm text-teal-900 tabular-nums">
                    ₹{pkg.startingPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectPackage(pkg.slug)}
                    className="px-3 py-1.5 bg-teal-800 text-white rounded-lg text-xs font-semibold hover:bg-teal-700"
                  >
                    View Tour
                  </button>
                  <WhatsAppButton
                    packageTitle={pkg.title}
                    label="Quote"
                    variant="subtle"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
