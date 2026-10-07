import React from 'react';
import { Compass, MapPin, CheckCircle2, ShieldCheck, MessageCircle } from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton';

interface AboutProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
          About Bharat Darshan
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900">
          Discover India. Plan Your Journey.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Bharat Darshan is a dedicated India travel discovery and tour planning platform designed to help travelers explore verified destinations, transparent budget guidelines, and curated tour packages across India.
        </p>
      </div>

      {/* Purpose & Core Values */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-xl font-bold font-heading text-slate-900">
          Our Core Mission
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          Planning travel across India should be clear, enriching, and accessible. Bharat Darshan was built to provide verified destination information, realistic route logistics (nearest railway stations, operational airports, and road connectivity), and interactive budget estimates that empower travelers to make informed decisions.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          We bring together rich cultural context, seasonal advisories, and curated day-by-day itineraries spanning mountains, coasts, royal heritage monuments, and multi-faith spiritual circuits.
        </p>
      </div>

      {/* What We Offer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Verified Destination Discovery
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Detailed guides for major Indian travel hubs with verified distances to railway stations, airport connections, local transportation options, and official visiting timings.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Interactive Budget Estimation
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Realistically calibrated calculators that estimate accommodations, vehicle transfers, and meals for your specific group size and trip duration.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Respectful Multi-Faith Tourism
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Objective, factual presentation of sacred places of worship across Hindu, Islamic, Christian, Sikh, Buddhist, and Jain traditions with cultural etiquette guidance.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Direct Enquiry Support
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Prompt trip planning assistance via web enquiry forms and direct WhatsApp support at +91 9594319442 to customize your itinerary with certified partners.
          </p>
        </div>
      </div>

      {/* Office & Contact Presence */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold font-heading text-slate-900">
          Bharat Darshan Office & Communications
        </h3>
        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <span>Mangolpuri Kala, New Delhi, Delhi – 110085, India</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>WhatsApp & Phone: +91 9594319442</span>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap gap-3">
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 bg-teal-800 text-white rounded-lg text-xs font-semibold hover:bg-teal-700"
          >
            Plan Your Journey
          </button>
          <WhatsAppButton label="Chat on WhatsApp (+91 9594319442)" />
        </div>
      </div>
    </div>
  );
};
