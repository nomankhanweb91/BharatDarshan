import React, { useState } from 'react';
import { Calculator, Info, Users, Calendar, Hotel, Car, UtensilsCrossed } from 'lucide-react';
import { Destination } from '../types';

interface BudgetCalculatorProps {
  destination: Destination;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ destination }) => {
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [days, setDays] = useState<number>(4);
  const [hotelTier, setHotelTier] = useState<'budget' | 'standard' | 'luxury'>('standard');
  const [transportMode, setTransportMode] = useState<'public' | 'private' | 'suv'>('private');
  const [foodTier, setFoodTier] = useState<'standard' | 'premium'>('standard');

  // Multipliers based on destination baseline
  const baseHotel = destination.budgetBreakdown.hotelBudget;
  const baseTransport = destination.budgetBreakdown.transportBudget;
  const baseFood = destination.budgetBreakdown.foodBudget;
  const baseActivities = destination.budgetBreakdown.activitiesBudget;

  // Hotel calculation (rooms needed: approx ceil((adults + children/2) / 2))
  const rooms = Math.max(1, Math.ceil((adults + children * 0.5) / 2));
  const hotelRatePerNight =
    hotelTier === 'budget' ? baseHotel.min / 4 : hotelTier === 'standard' ? (baseHotel.min + baseHotel.max) / 6 : (baseHotel.max * 1.5) / 4;
  const totalHotelEst = Math.round(hotelRatePerNight * (days - 1) * rooms);

  // Transport calculation
  const transportDailyRate =
    transportMode === 'public'
      ? (baseTransport.min / 4) * 0.6
      : transportMode === 'private'
      ? (baseTransport.min + baseTransport.max) / 6
      : ((baseTransport.max * 1.4) / 4);
  const totalTransportEst = Math.round(transportDailyRate * days);

  // Food calculation (per person per day)
  const totalPersons = adults + children * 0.5;
  const dailyFoodPerPerson = foodTier === 'standard' ? 600 : 1200;
  const totalFoodEst = Math.round(dailyFoodPerPerson * totalPersons * days);

  // Activities calculation
  const totalActivitiesEst = Math.round((baseActivities.min / 2) * adults + (baseActivities.min / 3) * children);

  const totalEstimate = totalHotelEst + totalTransportEst + totalFoodEst + totalActivitiesEst;
  const minRange = Math.round(totalEstimate * 0.85);
  const maxRange = Math.round(totalEstimate * 1.25);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
        <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-heading">
            Estimated Travel Budget Planner
          </h3>
          <p className="text-xs text-slate-500">
            Tailor group size and preferences for realistic planning in {destination.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        {/* Travelers */}
        <div>
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-2">
            <Users className="w-3.5 h-3.5 text-teal-700" />
            <span>Adults & Children</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[11px] text-slate-500 block mb-1">Adults (12+ yrs)</span>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full text-xs font-medium border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} Adult{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block mb-1">Children (2-11 yrs)</span>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full text-xs font-medium border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Child' : 'Children'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Days & Nights */}
        <div>
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-2">
            <Calendar className="w-3.5 h-3.5 text-teal-700" />
            <span>Trip Duration</span>
          </label>
          <span className="text-[11px] text-slate-500 block mb-1">Number of Days</span>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full text-xs font-medium border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
          >
            {[2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
              <option key={num} value={num}>
                {num} Days / {num - 1} Nights
              </option>
            ))}
          </select>
        </div>

        {/* Hotel Preference */}
        <div>
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-2">
            <Hotel className="w-3.5 h-3.5 text-teal-700" />
            <span>Hotel Preference</span>
          </label>
          <span className="text-[11px] text-slate-500 block mb-1">Stay Category</span>
          <select
            value={hotelTier}
            onChange={(e) => setHotelTier(e.target.value as 'budget' | 'standard' | 'luxury')}
            className="w-full text-xs font-medium border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700"
          >
            <option value="budget">Budget / Guest House</option>
            <option value="standard">Standard (3-Star Comfort)</option>
            <option value="luxury">Premium / 4-5 Star Heritage</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 pt-4 border-t border-slate-100">
        <div>
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
            <Car className="w-3.5 h-3.5 text-teal-700" />
            <span>Transport Type</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setTransportMode('public')}
              className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                transportMode === 'public'
                  ? 'border-teal-700 bg-teal-50 text-teal-900 font-semibold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Public / Train
            </button>
            <button
              type="button"
              onClick={() => setTransportMode('private')}
              className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                transportMode === 'private'
                  ? 'border-teal-700 bg-teal-50 text-teal-900 font-semibold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Private Sedan
            </button>
            <button
              type="button"
              onClick={() => setTransportMode('suv')}
              className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                transportMode === 'suv'
                  ? 'border-teal-700 bg-teal-50 text-teal-900 font-semibold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              SUV / Innova
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
            <UtensilsCrossed className="w-3.5 h-3.5 text-teal-700" />
            <span>Food Style</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFoodTier('standard')}
              className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                foodTier === 'standard'
                  ? 'border-teal-700 bg-teal-50 text-teal-900 font-semibold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Local Cafes & Thalis
            </button>
            <button
              type="button"
              onClick={() => setFoodTier('premium')}
              className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                foodTier === 'premium'
                  ? 'border-teal-700 bg-teal-50 text-teal-900 font-semibold'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Multi-Cuisine / Hotels
            </button>
          </div>
        </div>
      </div>

      {/* Breakdown Cards */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Estimated Expense Breakdown
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500 block mb-0.5">Accommodation</span>
            <span className="font-bold text-slate-900 tabular-nums">
              ₹{totalHotelEst.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500 block mb-0.5">Local Transport</span>
            <span className="font-bold text-slate-900 tabular-nums">
              ₹{totalTransportEst.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500 block mb-0.5">Food & Meals</span>
            <span className="font-bold text-slate-900 tabular-nums">
              ₹{totalFoodEst.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-500 block mb-0.5">Sightseeing & Passes</span>
            <span className="font-bold text-slate-900 tabular-nums">
              ₹{totalActivitiesEst.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Total Summary */}
        <div className="mt-5 p-4 rounded-xl bg-teal-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div>
            <span className="text-xs text-teal-200 uppercase tracking-wider font-semibold block">
              Estimated Total Budget Range
            </span>
            <span className="text-xs text-teal-100">
              For {adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Children` : ''} ({days} Days / {days - 1} Nights)
            </span>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight">
              ₹{minRange.toLocaleString('en-IN')} – ₹{maxRange.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Mandatory Explicit Disclaimer */}
        <div className="mt-3 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed bg-amber-50/70 p-3 rounded-lg border border-amber-200/50">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong className="text-amber-900">Estimated Budget Notice:</strong> This is an approximate planning estimate and may vary depending on seasonal tariff fluctuations, weekend surcharges, train/flight booking dates, and personal travel choices.
          </p>
        </div>
      </div>
    </div>
  );
};
