import React, { useEffect, useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Train,
  Plane,
  Car,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { getDestinationBySlug } from '../data/destinations';
import { getPackagesByDestination } from '../data/packages';
import { SmartImage } from '../components/SmartImage';
import { Gallery } from '../components/Gallery';
import { BudgetCalculator } from '../components/BudgetCalculator';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { AdSlot } from '../components/AdSlot';

interface DestinationDetailsProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectPackage: (slug: string) => void;
  onOpenBookingForDestination: (destinationName: string) => void;
}

export const DestinationDetails: React.FC<DestinationDetailsProps> = ({
  slug,
  onNavigate,
  onSelectPackage,
  onOpenBookingForDestination,
}) => {
  const destination = getDestinationBySlug(slug);
  const relatedPackages = getPackagesByDestination(slug);
  const [copied, setCopied] = useState(false);

  // Scroll to top upon viewing
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Destination Not Found</h2>
        <p className="text-sm text-slate-500">
          The requested destination page could not be located in our directory.
        </p>
        <button
          onClick={() => onNavigate('/destinations')}
          className="px-5 py-2.5 bg-teal-800 text-white rounded-lg text-sm font-semibold hover:bg-teal-700"
        >
          Back to All Destinations
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${destination.name} Travel Guide | Bharat Darshan`,
        text: destination.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Structured Data Schema for SEO
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: destination.name,
    description: destination.description,
    url: `https://bharatdarshan.online/destinations/${destination.slug}`,
    image: destination.heroImage,
    address: {
      '@type': 'PostalAddress',
      addressRegion: destination.state,
      addressCountry: 'India',
    },
    touristType: destination.category,
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/destinations')}
              className="flex items-center gap-1 hover:text-teal-800 transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Destinations</span>
            </button>
            <span aria-hidden="true">/</span>
            <span>{destination.state}</span>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 font-semibold truncate">{destination.name}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* 1. DESTINATION HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[460px] flex items-end p-6 sm:p-10 bg-slate-900 shadow-xl border border-slate-200">
          <SmartImage
            src={destination.heroImage}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{destination.state}, India</span>
              <span aria-hidden="true">·</span>
              <span>{destination.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
              {destination.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed">
              &quot;{destination.tagline}&quot;
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-white/90">
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-3.5 h-3.5 text-teal-300" />
                <span>{destination.duration}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-teal-300" />
                <span>{destination.bestTime.split('(')[0]}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
                <span>From ₹{destination.startingBudget.toLocaleString('en-IN')} / person</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenBookingForDestination(destination.name)}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
              >
                Plan This Trip
              </button>

              <WhatsAppButton
                destinationName={destination.name}
                label="WhatsApp Enquiry (+91 9594319442)"
                className="px-6 py-3 font-bold text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Top Content Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot position="TopContentAd" adSlotId="5847392019" />
      </div>

      {/* 2. IMAGE GALLERY WITH LIGHTBOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-0.5">
            Photo Highlights
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            {destination.name} Image Gallery
          </h2>
        </div>

        <Gallery
          images={destination.gallery.length > 0 ? destination.gallery : [destination.heroImage]}
          destinationName={destination.name}
        />
      </section>

      {/* 3. MAIN CONTENT & SIDEBAR GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Left Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* ABOUT DESTINATION */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
                Destination Overview
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                About {destination.name}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {destination.longDescription}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                {destination.description}
              </p>
            </div>

            {/* BEST TIME TO VISIT */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
              <div>
                <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
                  Climate & Seasonal Calendar
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                  Best Time to Visit {destination.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
                  <span className="font-bold text-emerald-900 text-sm block">
                    Peak Season
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {destination.bestSeasonDetail.peak}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5">
                  <span className="font-bold text-amber-900 text-sm block">
                    Moderate / Shoulder
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {destination.bestSeasonDetail.moderate}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-700 text-sm block">
                    Off Season
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {destination.bestSeasonDetail.offSeason}
                  </p>
                </div>
              </div>
            </div>

            {/* HOW TO REACH */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
                  Route & Logistics
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                  How to Reach {destination.name}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">By Air</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {destination.howToReach.byAir}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <Train className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">By Train</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {destination.howToReach.byTrain}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">By Road</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {destination.howToReach.byRoad}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Railway Stations Card */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Train className="w-4 h-4 text-teal-700" />
                  <span>Nearest Railway Stations</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.railwayStations.map((station, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1 text-xs"
                    >
                      <span className="font-bold text-slate-900 block">{station.name}</span>
                      <span className="text-teal-700 font-medium block">
                        Distance: {station.distance}
                      </span>
                      <p className="text-slate-500 text-[11px] leading-tight">
                        {station.connectivity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Nearby Airports Card */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Plane className="w-4 h-4 text-teal-700" />
                  <span>Nearest Airports</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.airports.map((airport, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-1 text-xs"
                    >
                      <span className="font-bold text-slate-900 block">{airport.name}</span>
                      <span className="text-teal-700 font-medium block">
                        Distance: {airport.distance}
                      </span>
                      <p className="text-slate-500 text-[11px] leading-tight">
                        Transfer: {airport.transferOptions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* In-Content Ad */}
            <AdSlot position="InContentAd" adSlotId="8473920194" />

            {/* PLACES TO VISIT */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
              <div>
                <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-1">
                  Key Attractions & Landmarks
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                  Places to Visit in {destination.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destination.placesToVisit.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 font-heading">
                        {place.name}
                      </h3>
                      <p className="text-slate-600 mt-1 leading-relaxed">
                        {place.description}
                      </p>
                    </div>

                    {(place.timing || place.entryFee) && (
                      <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 space-y-0.5">
                        {place.timing && <div>Timings: {place.timing}</div>}
                        {place.entryFee && <div>Entry: {place.entryFee}</div>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* THINGS TO DO */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
                Local Experiences
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                Things to Do in {destination.name}
              </h2>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                {destination.thingsToDo.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ESTIMATED TRAVEL BUDGET CALCULATOR */}
            <BudgetCalculator destination={destination} />

            {/* VISITING GUIDELINES & LOCAL ETIQUETTE */}
            {destination.visitingGuidelines && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-teal-800">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="text-lg font-bold font-heading text-slate-900">
                    Visiting Guidelines & Local Etiquette
                  </h3>
                </div>

                {destination.dressCodeAndEtiquette && (
                  <div className="p-3 bg-teal-50/70 border border-teal-200/60 rounded-lg text-xs text-teal-950 font-medium">
                    Attire & Sanctum Rule: {destination.dressCodeAndEtiquette}
                  </div>
                )}

                <ul className="space-y-2 text-xs text-slate-700">
                  {destination.visitingGuidelines.map((guide, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-700 shrink-0 mt-1.5" />
                      <span>{guide}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-800" />
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="divide-y divide-slate-100 space-y-3">
                {destination.faq.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.question}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Right Column */}
          <div className="lg:col-span-4 space-y-6 sticky top-20">
            {/* Quick Enquiry Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div>
                <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">
                  Plan Your Trip
                </span>
                <h3 className="text-lg font-bold font-heading text-slate-900 mt-1">
                  Enquire About {destination.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Get a personalized itinerary, hotel options, and verified driver quotes.
                </p>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => onOpenBookingForDestination(destination.name)}
                  className="w-full py-3 bg-teal-800 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-colors shadow-xs"
                >
                  Send Travel Enquiry
                </button>

                <WhatsAppButton
                  destinationName={destination.name}
                  label="Enquire on WhatsApp"
                  className="w-full py-3 text-xs font-bold"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>State:</span>
                  <span className="font-semibold text-slate-800">{destination.state}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Suggested Duration:</span>
                  <span className="font-semibold text-slate-800">{destination.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Starting Budget:</span>
                  <span className="font-bold text-teal-900">
                    ₹{destination.startingBudget.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Related Packages Card */}
            {relatedPackages.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h4 className="text-sm font-bold font-heading text-slate-900">
                  Related Tour Packages
                </h4>

                <div className="space-y-3">
                  {relatedPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => onSelectPackage(pkg.slug)}
                      className="group p-3 rounded-xl border border-slate-100 hover:border-teal-700 bg-slate-50 hover:bg-white transition-all cursor-pointer space-y-1"
                    >
                      <span className="text-[10px] font-semibold text-teal-700 block">
                        {pkg.duration}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-1">
                        {pkg.title}
                      </h5>
                      <span className="text-xs font-bold text-slate-800 block">
                        From ₹{pkg.startingPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar Ad Placement */}
            <AdSlot position="SidebarAd" adSlotId="1928374650" />
          </div>
        </div>
      </div>

      {/* Bottom Ad Placement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSlot position="BottomContentAd" adSlotId="4958372019" />
      </div>
    </div>
  );
};
