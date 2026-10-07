import React from 'react';
import { MapPin, Phone, MessageCircle, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 lg:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-lg font-heading shadow-sm">
                B
              </div>
              <span className="text-xl font-bold font-heading text-white tracking-tight">
                Bharat Darshan
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Discover India. Plan Your Journey. Create Memories. Bharat Darshan is your comprehensive discovery platform for verified destinations, spiritual circuits, and curated tour packages across India.
            </p>

            <div className="space-y-2.5 pt-2 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Mangolpuri Kala, New Delhi, Delhi – 110085, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+919594319442" className="hover:text-white transition-colors">
                  +91 9594319442
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/919594319442"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +91 9594319442
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>support@bharatdarshan.online</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/destinations')}
                  className="hover:text-white transition-colors"
                >
                  All Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/packages')}
                  className="hover:text-white transition-colors"
                >
                  Tour Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/categories/religious-tours')}
                  className="hover:text-white transition-colors"
                >
                  Religious & Spiritual Tours
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/states')}
                  className="hover:text-white transition-colors"
                >
                  Explore by States
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Key Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Top Destinations
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/destinations/kashmir')}
                  className="hover:text-white transition-colors"
                >
                  Kashmir Valley
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/destinations/varanasi')}
                  className="hover:text-white transition-colors"
                >
                  Varanasi Sacred Ghats
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/destinations/golden-temple-amritsar')}
                  className="hover:text-white transition-colors"
                >
                  Golden Temple, Amritsar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/destinations/taj-mahal-agra')}
                  className="hover:text-white transition-colors"
                >
                  Taj Mahal, Agra
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/destinations/ayodhya')}
                  className="hover:text-white transition-colors"
                >
                  Ayodhya Shri Ram Mandir
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/destinations/bodh-gaya')}
                  className="hover:text-white transition-colors"
                >
                  Bodh Gaya
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/destinations/goa')}
                  className="hover:text-white transition-colors"
                >
                  Goa Beaches & Churches
                </button>
              </li>
            </ul>
          </div>

          {/* Curated Tour Packages */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
              Popular Packages
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/packages/kashmir-delight-5-days')}
                  className="hover:text-white transition-colors"
                >
                  Kashmir Delight (5D/4N)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/packages/varanasi-spiritual-tour-4-days')}
                  className="hover:text-white transition-colors"
                >
                  Varanasi Spiritual (4D/3N)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/packages/golden-temple-amritsar-3-days')}
                  className="hover:text-white transition-colors"
                >
                  Amritsar Heritage (3D/2N)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/packages/ayodhya-religious-tour-3-days')}
                  className="hover:text-white transition-colors"
                >
                  Ayodhya Pilgrimage (3D/2N)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/packages/char-dham-journey-10-days')}
                  className="hover:text-white transition-colors"
                >
                  Char Dham Yatra (10D/9N)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/packages/goa-family-beach-escape-4-days')}
                  className="hover:text-white transition-colors"
                >
                  Goa Family Vacation (4D/3N)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Disclaimer & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Bharat Darshan (bharatdarshan.online). All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <button
              onClick={() => onNavigate('/privacy-policy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('/terms-and-conditions')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('/disclaimer')}
              className="hover:text-white transition-colors"
            >
              Disclaimer
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('/cookie-policy')}
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed text-center">
          Notice: Travel information, verified transport timetables, ticket estimates and seasonal package prices are subject to change based on weather conditions, seasonal demand, and official administrative advisories. Bharat Darshan is an independent tourism discovery and enquiry platform.
        </div>
      </div>
    </footer>
  );
};
