import React, { useState } from 'react';
import { Search, Menu, X, MessageCircle, Calendar } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Destinations', path: '/destinations' },
    { label: 'Tours & Packages', path: '/packages' },
    { label: 'Spiritual Tours', path: '/categories/religious-tours' },
    { label: 'States', path: '/states' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single Wordmark Element */}
          <button
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-lg font-heading shadow-sm group-hover:bg-teal-700 transition-colors">
              B
            </div>
            <span className="text-xl font-bold font-heading tracking-tight text-slate-900 group-hover:text-teal-800 transition-colors">
              Bharat Darshan
            </span>
          </button>

          {/* Zone 2: Clean 4-6 Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-sm font-medium transition-colors whitespace-nowrap hover:text-teal-800 ${
                    isActive ? 'text-teal-800 font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-teal-800 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              aria-label="Search destinations in India"
              title="Search destinations"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href="https://wa.me/919594319442?text=Hello%20Bharat%20Darshan,%20I%20am%20interested%20in%20planning%20a%20trip%20in%20India."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              aria-label="Chat on WhatsApp +91 9594319442"
              title="WhatsApp: +91 9594319442"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>

            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-teal-800 text-white rounded-lg text-sm font-medium hover:bg-teal-700 active:scale-98 transition-all shadow-sm focus:outline-none"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan Trip</span>
            </button>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-3 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleLinkClick('/')}
              className={`px-3 py-2 text-left rounded-md text-base font-medium ${
                currentPath === '/' ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3 py-2 text-left rounded-md text-base font-medium ${
                    isActive ? 'bg-teal-50 text-teal-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-teal-800 text-white rounded-xl font-bold text-center text-sm shadow-sm hover:bg-teal-700 min-h-[44px] flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Plan Your Trip</span>
            </button>
            <a
              href="https://wa.me/919594319442?text=Hello%20Bharat%20Darshan,%20I%20am%20interested%20in%20planning%20a%20tour%20in%20India."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-emerald-600 text-emerald-700 rounded-xl font-bold text-center text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp: +91 9594319442</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
