import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, Calendar, Users, Hotel, MapPin, Sparkles } from 'lucide-react';
import { TravelEnquiry } from '../types';

interface BookingFormProps {
  initialDestination?: string;
  initialPackage?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialDestination = '',
  initialPackage = '',
  onClose,
  isModal = true,
}) => {
  const [formData, setFormData] = useState<TravelEnquiry>({
    fullName: '',
    mobileNumber: '',
    email: '',
    destination: initialDestination,
    package: initialPackage,
    journeyStartDate: '',
    journeyEndDate: '',
    adults: 2,
    children: 0,
    infants: 0,
    numberOfRooms: 1,
    hotelPreference: '3-Star Standard Comfort',
    budgetRange: '₹15,000 - ₹30,000 per person',
    transportPreference: 'Private Dedicated Sedan',
    specialRequirements: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [whatsAppUrlSent, setWhatsAppUrlSent] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const constructWhatsAppMessage = () => {
    const targetPhone = '919594319442';
    const text = `*Namaste Bharat Darshan!* 🙏
*New Travel Enquiry:*

👤 *Name*: ${formData.fullName}
📞 *Mobile*: ${formData.mobileNumber}
📧 *Email*: ${formData.email}
📍 *Destination*: ${formData.destination}
${formData.package ? `📦 *Package*: ${formData.package}\n` : ''}📅 *Start Date*: ${formData.journeyStartDate || 'Flexible'}
${formData.journeyEndDate ? `🏁 *End Date*: ${formData.journeyEndDate}\n` : ''}👥 *Travelers*: ${formData.adults} Adults${formData.children > 0 ? `, ${formData.children} Children` : ''}${formData.infants > 0 ? `, ${formData.infants} Infants` : ''}
🏠 *Rooms*: ${formData.numberOfRooms} Room(s)
🏨 *Hotel Preference*: ${formData.hotelPreference}
🚗 *Transport*: ${formData.transportPreference}
💰 *Budget*: ${formData.budgetRange}
${formData.message ? `📝 *Requirements*: ${formData.message}\n` : ''}
Please share custom itinerary and best quote.`;

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!formData.mobileNumber.trim() || formData.mobileNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!formData.destination.trim()) {
      setErrorMsg('Please select or specify your destination');
      return;
    }

    // Save inquiry to localStorage lead store
    try {
      const existing = JSON.parse(localStorage.getItem('bharat_darshan_leads') || '[]');
      existing.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('bharat_darshan_leads', JSON.stringify(existing));
    } catch {
      // Quiet fail if storage unavailable
    }

    const waUrl = constructWhatsAppMessage();
    setWhatsAppUrlSent(waUrl);
    setErrorMsg('');
    setSubmitted(true);

    // Automatically trigger opening WhatsApp with the enquiry!
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback in case popup was blocked
    }
  };

  const content = (
    <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-2xl w-full mx-auto shadow-2xl border border-slate-200">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block mb-1">
            Travel Enquiry & Itinerary Planning
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
            Plan Your Journey with Bharat Darshan
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Fill the enquiry below. It will automatically connect directly with our WhatsApp team at +91 9594319442.
          </p>
        </div>
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {submitted ? (
        <div className="py-6 sm:py-8 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              Enquiry Submitted Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              We have generated your customized tour enquiry for <strong className="text-slate-900">{formData.destination}</strong>.
            </p>
          </div>

          {/* Prominent WhatsApp Redirection CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 max-w-lg mx-auto text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-emerald-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Connect on WhatsApp (+91 9594319442)</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Click below to send all your submitted trip details directly to our travel desk on WhatsApp for instant quote and itinerary customization.
            </p>

            <a
              href={whatsAppUrlSent || constructWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all active:scale-98"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Open in WhatsApp Now (+91 9594319442)</span>
            </a>
          </div>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Done / Close Window
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {errorMsg && (
            <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-teal-700 bg-slate-50 focus:bg-white min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobileNumber"
                required
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-teal-700 bg-slate-50 focus:bg-white min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-teal-700 bg-slate-50 focus:bg-white min-h-[44px]"
              />
            </div>
          </div>

          {/* Destination and Package */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Destination *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="text"
                  name="destination"
                  required
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Kashmir / Varanasi / Goa / Manali"
                  className="w-full text-xs border border-slate-300 rounded-xl py-3 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-teal-700 bg-slate-50 focus:bg-white min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Package Name (Optional)
              </label>
              <input
                type="text"
                name="package"
                value={formData.package}
                onChange={handleChange}
                placeholder="e.g. Kashmir Delight / Spiritual Tour"
                className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-teal-700 bg-slate-50 focus:bg-white min-h-[44px]"
              />
            </div>
          </div>

          {/* Dates & Travelers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="journeyStartDate"
                value={formData.journeyStartDate}
                onChange={handleChange}
                className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-teal-700 bg-slate-50 focus:bg-white min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Adults (12+)
              </label>
              <select
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                className="w-full text-xs border border-slate-300 rounded-xl p-3 bg-slate-50 focus:bg-white min-h-[44px]"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 15].map((n) => (
                  <option key={n} value={n}>
                    {n} Adult{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Children (2-11)
              </label>
              <select
                name="children"
                value={formData.children}
                onChange={handleChange}
                className="w-full text-xs border border-slate-300 rounded-xl p-3 bg-slate-50 focus:bg-white min-h-[44px]"
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} Child{n > 1 ? 'ren' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Rooms
              </label>
              <select
                name="numberOfRooms"
                value={formData.numberOfRooms}
                onChange={handleChange}
                className="w-full text-xs border border-slate-300 rounded-xl p-3 bg-slate-50 focus:bg-white min-h-[44px]"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} Room{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Hotel Preference
              </label>
              <select
                name="hotelPreference"
                value={formData.hotelPreference}
                onChange={handleChange}
                className="w-full text-xs border border-slate-300 rounded-xl p-3 bg-slate-50 focus:bg-white min-h-[44px]"
              >
                <option value="Budget / Clean Pilgrim Sarai">Budget / Guest House</option>
                <option value="3-Star Standard Comfort">3-Star Standard Comfort</option>
                <option value="4-Star Premium Hotel">4-Star Premium Hotel</option>
                <option value="5-Star / Heritage Palace / Houseboat">5-Star / Heritage Palace</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Budget Range (per person)
              </label>
              <select
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full text-xs border border-slate-300 rounded-xl p-3 bg-slate-50 focus:bg-white min-h-[44px]"
              >
                <option value="Below ₹10,000">Below ₹10,000</option>
                <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                <option value="₹20,000 - ₹35,000">₹20,000 - ₹35,000</option>
                <option value="Above ₹35,000">Above ₹35,000 (Luxury)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Transport Preference
              </label>
              <select
                name="transportPreference"
                value={formData.transportPreference}
                onChange={handleChange}
                className="w-full text-xs border border-slate-300 rounded-xl p-3 bg-slate-50 focus:bg-white min-h-[44px]"
              >
                <option value="Private Dedicated Sedan">Private Dedicated Sedan</option>
                <option value="Innova / SUV Vehicle">Innova / SUV Vehicle</option>
                <option value="Tempo Traveller (Group)">Tempo Traveller (Group)</option>
                <option value="Self / Public Transport">Self / Public Transport</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Special Requirements & Notes
            </label>
            <textarea
              name="message"
              rows={2}
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. Traveling with senior citizens, need ground floor rooms, pure vegetarian meals..."
              className="w-full text-xs border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-teal-700 bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Notice */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-50/70 border border-teal-200/60 text-[11px] text-teal-900">
            <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Enquiry will directly open in WhatsApp (+91 9594319442) upon submission.</span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-teal-800 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Travel Enquiry to WhatsApp</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );

  if (!isModal) {
    return content;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl my-6">{content}</div>
    </div>
  );
};
