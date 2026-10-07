import React from 'react';
import { Compass, Search, MessageCircle, Calendar } from 'lucide-react';

interface MobileStickyBarProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onNavigate,
  onOpenSearch,
  onOpenBooking,
}) => {
  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5"
    >
      <div className="grid grid-cols-4 items-center max-w-md mx-auto">
        <button
          onClick={() => onNavigate('/destinations')}
          className="flex flex-col items-center justify-center py-1 min-h-[44px] text-slate-600 hover:text-teal-800 transition-colors focus:outline-none"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[11px] font-medium mt-0.5">Explore</span>
        </button>

        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center py-1 min-h-[44px] text-slate-600 hover:text-teal-800 transition-colors focus:outline-none"
        >
          <Search className="w-5 h-5" />
          <span className="text-[11px] font-medium mt-0.5">Search</span>
        </button>

        <a
          href="https://wa.me/919594319442?text=Hello%20Bharat%20Darshan,%20I%20would%20like%20to%20enquire%20about%20a%20trip%20in%20India."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 min-h-[44px] text-emerald-600 hover:text-emerald-700 transition-colors focus:outline-none"
          title="WhatsApp +91 9594319442"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="text-[11px] font-medium mt-0.5">WhatsApp</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center py-1 min-h-[44px] text-teal-800 hover:text-teal-900 transition-colors focus:outline-none"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[11px] font-medium mt-0.5">Plan Trip</span>
        </button>
      </div>
    </nav>
  );
};
