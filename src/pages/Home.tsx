import React from 'react';
import { ArrowRight, ChevronRight, CheckCircle2, MessageCircle, MapPin, Compass } from 'lucide-react';
import { Hero } from '../components/Hero';
import { TourCarousel } from '../components/TourCarousel';
import { DestinationCard } from '../components/DestinationCard';
import { SmartImage } from '../components/SmartImage';
import { AdSlot } from '../components/AdSlot';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { getTrendingDestinations, getTop10Destinations, allDestinations } from '../data/destinations';
import { travelCategories } from '../data/categories';
import { statesData } from '../data/states';
import { tourPackages } from '../data/packages';
import { travelGuides } from '../data/guides';

interface HomeProps {
  onNavigate: (path: string) => void;
  onSelectDestination: (slug: string) => void;
  onSelectPackage: (slug: string) => void;
  onOpenBooking: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  onSelectDestination,
  onSelectPackage,
  onOpenBooking,
}) => {
  const trendingDestinations = getTrendingDestinations();
  const top10Picks = getTop10Destinations();
  const popularPackages = tourPackages.slice(0, 6);
  const featuredStates = statesData.slice(0, 8);

  const handleSearchTrips = (criteria: { destination: string; category: string }) => {
    if (criteria.destination) {
      const match = allDestinations.find(
        (d) =>
          d.name.toLowerCase().includes(criteria.destination.toLowerCase()) ||
          d.state.toLowerCase().includes(criteria.destination.toLowerCase())
      );
      if (match) {
        onSelectDestination(match.slug);
        return;
      }
    }
    onNavigate('/destinations');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. Hero & Trip Search Planner */}
      <Hero
        onExploreDestinations={() => onNavigate('/destinations')}
        onOpenBooking={onOpenBooking}
        onSearchTrips={handleSearchTrips}
        onSelectDestinationSlug={onSelectDestination}
      />

      {/* Top Content Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot position="TopContentAd" adSlotId="2019283746" />
      </div>

      {/* 2. Most Trending Tours (Horizontal Carousel) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
              Curated Travel Inspiration
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Most Trending Tours
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Hand-picked seasonal journeys with verified route logistics and starting budgets.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/destinations')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-900 transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <TourCarousel
          destinations={trendingDestinations}
          onSelect={onSelectDestination}
        />
      </section>

      {/* 3. Explore India by Travel Style (Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
            Browse by Interest
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Explore India by Travel Style
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Whether seeking spiritual solace at historic shrines, Himalayan adventures, or coastal tranquility.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {travelCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(`/categories/${cat.slug}`)}
              className="group relative flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-teal-700/40 transition-all cursor-pointer"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <SmartImage
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5 text-lg p-1.5 bg-white/20 backdrop-blur-xs rounded-lg">
                  {cat.icon}
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="font-bold text-sm sm:text-base font-heading drop-shadow-xs truncate">
                    {cat.name}
                  </h3>
                </div>
              </div>

              <div className="p-3.5 flex flex-col flex-1 justify-between">
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-teal-800 font-semibold group-hover:text-teal-900">
                  <span>{cat.count} Destinations</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* In-Content Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot position="InContentAd" adSlotId="3948572019" />
      </div>

      {/* 4. Explore India by States */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
              Geographic Discovery
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Explore India by States
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Comprehensive state-wise travel guides from Rajasthan to Kerala and Kashmir.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/states')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-900 transition-colors self-start sm:self-auto"
          >
            <span>View All States & UTs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredStates.map((st) => (
            <div
              key={st.id}
              onClick={() => onNavigate(`/states/${st.slug}`)}
              className="group relative flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md hover:border-teal-700/40 transition-all cursor-pointer"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <SmartImage
                  src={st.image}
                  alt={st.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-3 text-white">
                  <h3 className="font-bold text-base font-heading">{st.name}</h3>
                  <span className="text-[11px] text-slate-300 block">{st.capital}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {st.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-teal-800 font-semibold">
                  <span>Explore State Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Top 10 Places to Visit in India (Our Top 10 Picks) */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
              Curated Editorial Selection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Our Top 10 India Picks
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              The country’s most celebrated destinations featuring verified logistics, railway hubs, airports, and budget guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {top10Picks.slice(0, 9).map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelect={onSelectDestination}
                rank={dest.top10Rank}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('/destinations')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-800 text-white rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors shadow-xs"
            >
              <span>Explore All Destinations Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Popular Tour Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
              Curated Itineraries
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Popular Tour Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Complete day-by-day plans with verified inclusions, transport, and WhatsApp support.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/packages')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-900 transition-colors self-start sm:self-auto"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <SmartImage
                  src={pkg.heroImage}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-teal-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                  {pkg.duration}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span>{pkg.destinationName}</span>
                  <span>·</span>
                  <span>{pkg.hotelCategory.split('(')[0]}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-heading mb-1 line-clamp-1">
                  {pkg.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed flex-1">
                  {pkg.overview}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Starting from</span>
                    <span className="text-base font-bold text-teal-900 tabular-nums">
                      ₹{pkg.startingPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400"> / person</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectPackage(pkg.slug)}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                    >
                      View Tour
                    </button>
                    <WhatsAppButton
                      packageTitle={pkg.title}
                      label="Enquire"
                      variant="subtle"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Dedicated Spotlight: Religious & Spiritual Tours */}
      <section className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-16 mx-4 sm:mx-6 lg:mx-auto shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Dedicated Pilgrim & Heritage Circuit
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              Religious & Spiritual Tours Across India
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Sacred places of worship presented with reverence and verified visiting guidelines. Explore Hindu Temples, Islamic Heritage & Mosques, Historic Churches & Basilicas, Sikh Gurudwaras, Buddhist Monasteries, and Jain Marble Sanctums.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-xs text-slate-200">
              <span className="px-2.5 py-1 bg-white/10 rounded-md">🛕 Hindu Temples</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-md">🕌 Mosques & Dargahs</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-md">⛪ Churches & Basilicas</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-md">🛕 Sikh Gurudwaras</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-md">☸️ Buddhist Monasteries</span>
              <span className="px-2.5 py-1 bg-white/10 rounded-md">🕉️ Jain Temples</span>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('/categories/religious-tours')}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                Explore Spiritual Tours Directory
              </button>
              <WhatsAppButton
                message="Hello Bharat Darshan, I would like to enquire about religious and spiritual tour packages in India."
                label="Spiritual Enquiry (+91 9594319442)"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              />
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div
              onClick={() => onSelectDestination('varanasi')}
              className="group cursor-pointer rounded-xl overflow-hidden aspect-square relative bg-slate-800"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=400&q=80"
                alt="Varanasi Ghats"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white">Varanasi Ghats</span>
              </div>
            </div>

            <div
              onClick={() => onSelectDestination('golden-temple-amritsar')}
              className="group cursor-pointer rounded-xl overflow-hidden aspect-square relative bg-slate-800"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=400&q=80"
                alt="Golden Temple"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white">Golden Temple</span>
              </div>
            </div>

            <div
              onClick={() => onSelectDestination('bodh-gaya')}
              className="group cursor-pointer rounded-xl overflow-hidden aspect-square relative bg-slate-800"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=400&q=80"
                alt="Bodh Gaya"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white">Bodh Gaya</span>
              </div>
            </div>

            <div
              onClick={() => onSelectDestination('velankanni-and-goa-churches')}
              className="group cursor-pointer rounded-xl overflow-hidden aspect-square relative bg-slate-800"
            >
              <SmartImage
                src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80"
                alt="Old Goa Churches"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold text-white">Old Goa Churches</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Travel Planning Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
            Travel Planning Insights
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Travel Planning Guides
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Practical advice on cultural etiquette, high-speed train networks, and seasonal weather patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {travelGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <SmartImage
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                  {guide.category}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                    <span>{guide.readTime}</span>
                    <span>·</span>
                    <span>{guide.publishDate}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 font-heading leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-xs font-semibold text-teal-800 flex items-center gap-1">
                    Read Guide Insights <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Why Plan With Bharat Darshan ("Plan Better. Travel Smarter.") */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
              Why Bharat Darshan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Plan Better. Travel Smarter.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              Empowering travelers with verified information, transparent budget estimates, and direct WhatsApp enquiry assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Verified Destination Information
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Realistic railway connections, nearest operational airports, official monument visiting hours, and local etiquette without fabricated claims.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Interactive Budget Estimates
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transparent destination budget calculators helping you plan realistic accommodations, transport, and meal expenses before you leave.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Curated Tour Packages
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Well-paced itineraries spanning leisure holidays to sacred multi-faith pilgrimage circuits with clear inclusions and exclusions.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Respectful Cultural Presentation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Neutral, factual presentation of all places of worship across Hindu, Islamic, Christian, Sikh, Buddhist, and Jain traditions.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Direct WhatsApp Support
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reach out anytime on WhatsApp at +91 9594319442 with one click to ask questions or customize your tour itinerary.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Mobile-First Performance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lightweight, fast-loading architecture optimized for mobile devices across 4G and 5G networks in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. WhatsApp Travel Enquiry CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-900 via-teal-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl border border-teal-800/40">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Direct Travel Assistance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              Planning a Trip to India?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tell us where you want to go, when you want to travel, and how many people are travelling. Our team will tailor a verified itinerary for you.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-3.5 bg-white text-teal-950 font-bold rounded-xl text-sm hover:bg-slate-100 transition-colors shadow-sm"
              >
                Plan My Trip
              </button>

              <WhatsAppButton
                label="WhatsApp Us (+91 9594319442)"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm"
              />
            </div>

            <p className="text-xs text-slate-400 pt-2">
              Office Address: Mangolpuri Kala, New Delhi, Delhi – 110085, India
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
