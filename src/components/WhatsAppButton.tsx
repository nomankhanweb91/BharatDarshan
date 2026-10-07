import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  variant?: 'primary' | 'outline' | 'floating' | 'subtle';
  className?: string;
  destinationName?: string;
  packageTitle?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message,
  label = 'Enquire on WhatsApp',
  variant = 'primary',
  className = '',
  destinationName,
  packageTitle,
}) => {
  const phoneNumber = '919594319442'; // Target verified WhatsApp number

  const getDefaultMessage = () => {
    if (packageTitle) {
      return `Hello Bharat Darshan, I am interested in the "${packageTitle}" tour package. Please share details, pricing, and availability.`;
    }
    if (destinationName) {
      return `Hello Bharat Darshan, I would like to plan a trip to ${destinationName}. Please share itinerary recommendations and an estimated budget.`;
    }
    return `Hello Bharat Darshan, I am planning a trip in India and would like to speak with a travel specialist.`;
  };

  const finalMessage = message || getDefaultMessage();
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return 'border border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 focus-visible:ring-emerald-500';
      case 'floating':
        return 'bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 hover:shadow-xl focus-visible:ring-emerald-400 p-3 rounded-full';
      case 'subtle':
        return 'text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 p-2 rounded-lg text-sm';
      case 'primary':
      default:
        return 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm focus-visible:ring-emerald-500';
    }
  };

  if (variant === 'floating') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp +91 9594319442"
        className={`inline-flex items-center justify-center transition-all duration-200 active:scale-95 ${getVariantStyles()} ${className}`}
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-98 whitespace-nowrap focus:outline-none focus-visible:ring-2 ${getVariantStyles()} ${className}`}
    >
      <MessageCircle className="w-4 h-4 fill-current shrink-0" />
      <span>{label}</span>
    </a>
  );
};
