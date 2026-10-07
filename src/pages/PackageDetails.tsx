import React, { useEffect } from 'react';
import {
  Clock,
  MapPin,
  Check,
  X as XIcon,
  Calendar,
  Hotel,
  Car,
  ShieldAlert,
  ArrowLeft,
} from 'lucide-react';
import { getPackageBySlug } from '../data/packages';
import { SmartImage } from '../components/SmartImage';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { AdSlot } from '../components/AdSlot';

interface PackageDetailsProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenBookingForPackage: (packageTitle: string) => void;
}

export const PackageDetails: React.FC<PackageDetailsProps> = ({
  slug,
  onNavigate,
  onOpenBookingForPackage,
}) => {
  const pkg = getPackageBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!pkg) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Package Not Found</h2>
        <p className="text-sm text-slate-500">
          The requested tour package could not be located in our directory.
        </p>
        <button
          onClick={() => onNavigate('/packages')}
          className="px-5 py-2.5 bg-teal-800 text-white rounded-lg text-sm font-semibold hover:bg-teal-700"
        >
          View All Tour Packages
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 pb-3 border-b border-slate-200">
          <button
            onClick={() => onNavigate('/packages')}
            className="flex items-center gap-1 hover:text-teal-800 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Packages</span>
          </button>
          <span aria-hidden="true">/</span>
          <span>{pkg.destinationName}</span>
          <span aria-hidden="true">/</span>
          <span className="text-slate-900 font-semibold truncate">{pkg.title}</span>
        </div>
      </div>

      {/* Package Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-end p-6 sm:p-10 bg-slate-900 shadow-xl border border-slate-200">
          <SmartImage
            src={pkg.heroImage}
            alt={pkg.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{pkg.destinationName}, {pkg.state}</span>
              <span aria-hidden="true">·</span>
              <span>{pkg.category} Package</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
              {pkg.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-medium">
              {pkg.subtitle}
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-white/90">
              <div className="bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-300" />
                <span>{pkg.duration}</span>
              </div>
              <div className="bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-300" />
                <span>Best: {pkg.bestTimeToVisit.split('(')[0]}</span>
              </div>
              <div className="bg-teal-900/80 px-3 py-1.5 rounded-lg border border-teal-400/30 text-amber-300 font-bold">
                From ₹{pkg.startingPrice.toLocaleString('en-IN')} / person
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenBookingForPackage(pkg.title)}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
              >
                Send Package Enquiry
              </button>

              <WhatsAppButton
                packageTitle={pkg.title}
                label="WhatsApp Quote (+91 9594319442)"
                className="px-6 py-3 font-bold text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Details Left */}
          <div className="lg:col-span-8 space-y-10">
            {/* Package Overview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                Package Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {pkg.overview}
              </p>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                <span className="font-semibold text-slate-500">Destinations Covered:</span>
                {pkg.destinationsCovered.map((dest, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                  >
                    {dest}
                  </span>
                ))}
              </div>
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block mb-0.5">
                    Structured Day Schedule
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                    Day-by-Day Itinerary
                  </h2>
                </div>
                <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-lg">
                  {pkg.duration}
                </span>
              </div>

              <div className="space-y-6">
                {pkg.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="relative pl-7 border-l-2 border-teal-700/30 space-y-2 pb-2 last:pb-0"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-800 border-2 border-white ring-2 ring-teal-100" />

                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                        Day {day.day}:
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                        {day.title}
                      </h3>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                      {day.activities.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                Inclusions & Exclusions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>What&apos;s Included</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <XIcon className="w-4 h-4 text-rose-600" />
                    <span>What&apos;s Excluded</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {pkg.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <XIcon className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Accommodation & Transport Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-teal-800">
                  <Hotel className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">Stay & Hotels</h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {pkg.hotelCategory}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-teal-800">
                  <Car className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">Transport Details</h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {pkg.transport}
                </p>
              </div>
            </div>

            {/* Important Notes & Cancellation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-amber-800">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold font-heading text-slate-900">
                  Important Notes & Cancellation Terms
                </h3>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                {pkg.importantNotes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600">
                <strong>Cancellation Policy:</strong> {pkg.cancellationPolicy}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Right */}
          <div className="lg:col-span-4 space-y-6 sticky top-20">
            {/* Booking Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase">
                  Starting Price Estimate
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-teal-900 tabular-nums font-heading">
                    ₹{pkg.startingPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500">/ person</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  *Subject to seasonal tariff and traveler count
                </span>
              </div>

              <div className="space-y-2.5">
                <button
                  onClick={() => onOpenBookingForPackage(pkg.title)}
                  className="w-full py-3 bg-teal-800 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-colors shadow-xs"
                >
                  Send Travel Enquiry
                </button>

                <WhatsAppButton
                  packageTitle={pkg.title}
                  label="Enquire on WhatsApp"
                  className="w-full py-3 text-xs font-bold"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-slate-800">{pkg.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Category:</span>
                  <span className="font-semibold text-slate-800">{pkg.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Destination:</span>
                  <span className="font-semibold text-slate-800">{pkg.destinationName}</span>
                </div>
              </div>
            </div>

            {/* Sidebar Ad Placement */}
            <AdSlot position="SidebarAd" adSlotId="2839401928" />
          </div>
        </div>
      </div>
    </div>
  );
};
