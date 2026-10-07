import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Send, CheckCircle2 } from 'lucide-react';
import { WhatsAppButton } from '../components/WhatsAppButton';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !message) return;

    const text = `*Namaste Bharat Darshan!* 🙏
*Website Contact Enquiry:*
👤 *Name*: ${name}
📞 *Phone*: ${phone}
📧 *Email*: ${email}
${subject ? `📌 *Subject*: ${subject}\n` : ''}📝 *Message*: ${message}`;

    const url = `https://wa.me/919594319442?text=${encodeURIComponent(text)}`;
    setWaUrl(url);
    setSubmitted(true);

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider block">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900">
          Contact Bharat Darshan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Have questions about a destination, tour package, or custom pilgrimage circuit? Reach out to our travel enquiry desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-teal-900 text-white rounded-3xl p-8 space-y-8 shadow-xl">
          <div>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Direct Contact Channels
            </span>
            <h2 className="text-2xl font-bold font-heading text-white mt-1">
              Bharat Darshan Office
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              We provide prompt support for travel planning, itineraries, and package bookings across India.
            </p>
          </div>

          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-teal-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold block text-slate-200">Registered Office:</span>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  Mangolpuri Kala, New Delhi, Delhi – 110085, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-emerald-300">
                <MessageCircle className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="font-semibold block text-slate-200">WhatsApp Support:</span>
                <a
                  href="https://wa.me/919594319442"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-300 hover:underline block mt-0.5"
                >
                  +91 9594319442 (Instant Chat)
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-teal-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold block text-slate-200">Phone Enquiry:</span>
                <a
                  href="tel:+919594319442"
                  className="text-xs text-slate-300 hover:text-white block mt-0.5"
                >
                  +91 9594319442
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-teal-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold block text-slate-200">Email:</span>
                <span className="text-xs text-slate-300 block mt-0.5">
                  contact@bharatdarshan.online
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-teal-800">
            <WhatsAppButton
              label="Chat on WhatsApp (+91 9594319442)"
              className="w-full py-3 text-xs font-bold"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900">
                Thank You for Contacting Us
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your message has been received. Our team will get back to you shortly. For immediate assistance, feel free to reach us directly on WhatsApp.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={waUrl || "https://wa.me/919594319442"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Directly on WhatsApp (+91 9594319442)</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold font-heading text-slate-900 mb-2">
                Send Us a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Subject / Destination
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Kashmir Tour / Varanasi Darshan"
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Your Message or Enquiry Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your proposed dates, number of travelers, budget preferences, or specific travel questions..."
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-teal-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-800 text-white rounded-xl font-bold text-xs hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit Enquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
