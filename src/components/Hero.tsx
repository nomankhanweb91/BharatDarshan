import React, { useState, useEffect } from 'react';
import {
  Compass,
  Calendar,
  Search,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Sparkles,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { SmartImage } from './SmartImage';

interface HeroProps {
  onExploreDestinations: () => void;
  onOpenBooking: () => void;
  onSearchTrips: (criteria: { destination: string; date: string; adults: number; category: string }) => void;
  onSelectDestinationSlug: (slug: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreDestinations,
  onOpenBooking,
  onSearchTrips,
  onSelectDestinationSlug,
}) => {
  const heroShowcase = [
    {
      name: 'Kashmir',
      subtitle: 'Paradise of India — Valleys & Dal Lake',
      slug: 'kashmir',
      state: 'Jammu & Kashmir',
      budget: '₹18,999',
      duration: '5D / 4N',
      bestTime: 'Apr - Oct & Dec - Feb',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Taj Mahal, Agra',
      subtitle: 'Monument to Eternal Love & Mughal Wonder',
      slug: 'taj-mahal-agra',
      state: 'Uttar Pradesh',
      budget: '₹6,999',
      duration: '2D / 1N',
      bestTime: 'Oct - Mar',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Varanasi',
      subtitle: 'Sacred Ganga Ghats & Evening Aarti',
      slug: 'varanasi',
      state: 'Uttar Pradesh',
      budget: '₹11,999',
      duration: '4D / 3N',
      bestTime: 'Oct - Mar',
      image: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Goa',
      subtitle: 'Sun, Sand & Portuguese Basilicas',
      slug: 'goa',
      state: 'Goa',
      budget: '₹14,999',
      duration: '4D / 3N',
      bestTime: 'Nov - Feb',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Kerala',
      subtitle: 'God’s Own Country Backwaters & Munnar',
      slug: 'kerala',
      state: 'Kerala',
      budget: '₹17,999',
      duration: '5D / 4N',
      bestTime: 'Sep - Mar',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Manali',
      subtitle: 'Snow Peaks, Solang & Atal Tunnel',
      slug: 'manali',
      state: 'Himachal Pradesh',
      budget: '₹13,999',
      duration: '4D / 3N',
      bestTime: 'Oct - Jun',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate slider every 5 seconds unless hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroShowcase.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, heroShowcase.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroShowcase.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroShowcase.length);
  };

  // Search planner state
  const [searchDestination, setSearchDestination] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchReturnDate, setSearchReturnDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [travelType, setTravelType] = useState('All Styles');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchTrips({
      destination: searchDestination,
      date: searchDate,
      adults,
      category: travelType,
    });
  };

  const current = heroShowcase[currentIndex];

  return (
    <div className="relative bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white overflow-hidden pt-8 sm:pt-12 pb-14 lg:pb-20">
      {/* Dynamic ambient mesh gradients */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-14">
        {/* Main Grid: Left copy & Right Expanded Modern Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Trust Badging & CTAs */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            {/* Modern Glass Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-teal-200 text-xs font-semibold border border-white/10 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>India Travel Discovery & Spiritual Heritage</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-[1.12]">
              Explore India, <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-teal-200 bg-clip-text text-transparent">
                One Journey
              </span>{' '}
              at a Time
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
              Discover breathtaking destinations, plan verified trips, and explore curated tour packages across India&apos;s royal heritage, holy pilgrimage circuits, and Himalayan heights.
            </p>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Route Logistics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Transparent Budget Estimates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>All States & Faith Circuits</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreDestinations}
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Explore Destinations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl font-bold text-sm transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-teal-300" />
                <span>Plan Your Trip</span>
              </button>
            </div>
          </div>

          {/* Right Column: EXPANDED WIDTH Modern Interactive Slider */}
          <div
            className="lg:col-span-6 w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* The slider frame expands to full width of the right column */}
            <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-slate-900 group aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/12] max-h-[500px]">
              {/* Dynamic Image with Smooth Scale */}
              <SmartImage
                key={current.slug}
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Multi-step Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-black/20" />

              {/* Top Controls Bar: Counter and Arrow Navigation */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white/90 border border-white/10 tracking-wider">
                  0{currentIndex + 1} / 0{heroShowcase.length}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/15 flex items-center justify-center transition-all active:scale-95"
                    aria-label="Previous destination"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/15 flex items-center justify-center transition-all active:scale-95"
                    aria-label="Next destination"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Glass Destination Card */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-4 sm:p-5 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-white/15 text-left">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{current.state}</span>
                      <span className="text-white/40">·</span>
                      <span className="text-teal-200">{current.duration}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                      {current.name}
                    </h3>

                    <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                      {current.subtitle}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-300">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Best: {current.bestTime}</span>
                      </div>
                      <span className="text-white/30">·</span>
                      <div>
                        From <strong className="text-emerald-400 font-bold">{current.budget}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectDestinationSlug(current.slug)}
                    className="shrink-0 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <span>Explore {current.name}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Destination Switcher Pills directly below image */}
            <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none">
              {heroShowcase.map((item, idx) => (
                <button
                  key={item.slug}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    idx === currentIndex
                      ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* HERO SEARCH / TRIP PLANNER BOX (Modern Responsive Card) */}
        <div className="bg-white text-slate-900 rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200/90">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                Quick Trip Finder & Planner
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:block">
              Verified Routes & Estimated Budgets
            </span>
          </div>

          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
              {/* Destination Input */}
              <div className="lg:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Destination or Landmark
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    placeholder="e.g. Kashmir, Varanasi, Goa, Ayodhya"
                    className="w-full text-xs font-medium border border-slate-300 rounded-xl py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50 focus:bg-white min-h-[44px]"
                  />
                </div>
              </div>

              {/* Departure Date */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Departure Date
                </label>
                <input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50 focus:bg-white min-h-[44px]"
                />
              </div>

              {/* Return Date */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Return Date
                </label>
                <input
                  type="date"
                  value={searchReturnDate}
                  onChange={(e) => setSearchReturnDate(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-700 bg-slate-50 focus:bg-white min-h-[44px]"
                />
              </div>

              {/* Travelers */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Travelers
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full text-xs font-medium border border-slate-300 rounded-xl p-3 bg-slate-50 focus:bg-white min-h-[44px]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} Adult{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full text-xs font-medium border border-slate-300 rounded-xl p-3 bg-slate-50 focus:bg-white min-h-[44px]"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} Child{n > 1 ? 'ren' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
                  Travel Category
                </label>
                <select
                  value={travelType}
                  onChange={(e) => setTravelType(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-300 rounded-xl p-3 bg-slate-50 focus:bg-white min-h-[44px]"
                >
                  <option value="All Styles">All Travel Styles</option>
                  <option value="Religious & Spiritual">Religious & Spiritual</option>
                  <option value="Mountain Tours">Mountain Tours</option>
                  <option value="Beach Holidays">Beach Holidays</option>
                  <option value="Heritage Tours">Heritage Tours</option>
                  <option value="Honeymoon Tours">Honeymoon Tours</option>
                  <option value="Family Tours">Family Tours</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Quick Searches:</span>
                <button
                  type="button"
                  onClick={() => setSearchDestination('Kashmir')}
                  className="hover:text-teal-800 underline"
                >
                  Kashmir
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setSearchDestination('Varanasi')}
                  className="hover:text-teal-800 underline"
                >
                  Varanasi
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setSearchDestination('Goa')}
                  className="hover:text-teal-800 underline"
                >
                  Goa
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setSearchDestination('Golden Temple')}
                  className="hover:text-teal-800 underline"
                >
                  Amritsar
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setSearchDestination('Ayodhya')}
                  className="hover:text-teal-800 underline"
                >
                  Ayodhya
                </button>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-teal-800 hover:bg-teal-700 text-white rounded-xl font-bold text-sm transition-all active:scale-98 flex items-center justify-center gap-2 shadow-md min-h-[44px]"
              >
                <Search className="w-4 h-4" />
                <span>SEARCH TRIPS</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
