export interface TravelGuide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  image: string;
  publishDate: string;
  content: string[];
}

export const travelGuides: TravelGuide[] = [
  {
    id: 'respectful-religious-etiquette-india',
    slug: 'respectful-religious-etiquette-india',
    title: 'Spiritual Circuit Etiquette: Visiting Places of Worship in India',
    excerpt: 'Practical guidelines on dress codes, footwear, photography, and cultural etiquette across Temples, Mosques, Gurudwaras, Churches, and Monasteries.',
    readTime: '6 min read',
    category: 'Cultural Etiquette',
    image: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=800&q=80',
    publishDate: 'Updated 2026',
    content: [
      'India is home to ancient faith traditions that welcome travelers with warmth and open doors. Observing basic etiquette ensures a harmonious and enriching cultural experience.',
      'Footwear: In Hindu temples, Jain temples, Sikh Gurudwaras, Mosques, and Buddhist shrines, shoes and socks must be removed at designated shoe counters (Joota Ghar) outside the sanctum.',
      'Head Coverings: Covering the head with a clean scarf, handkerchief, or dupatta is strictly mandatory in all Sikh Gurudwaras and many historic Dargahs and Mosques. Most gurudwaras provide clean triangular head cloths at entrances free of charge.',
      'Modesty & Dress Codes: Modest attire covering shoulders, upper arms, and knees is universally appreciated. In several historic South Indian temples, traditional dhotis or sarees are required for entry into inner sanctums.',
      'Photography & Electronics: Always observe signage regarding cameras. While outer courtyards frequently allow photography, inner sanctums where prayers are active strictly prohibit cameras to preserve devotional peace.',
    ],
  },
  {
    id: 'first-timers-guide-india',
    slug: 'first-timers-guide-india',
    title: 'The First-Timer’s Guide to Exploring India Comfortably',
    excerpt: 'Key tips on local transport, train bookings, SIM cards, cashless UPI payments, and seasonal packing essentials.',
    readTime: '8 min read',
    category: 'Trip Planning',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
    publishDate: 'Updated 2026',
    content: [
      'Planning your journey to India is an exhilarating experience. A well-paced itinerary focusing on 2 to 3 distinct regions is far more enjoyable than trying to cover the entire subcontinent in a single trip.',
      'Digital Payments & UPI: India has the world’s most advanced cashless payment ecosystem. International travelers can activate UPI One World or carry credit cards and modest cash for small street purchases.',
      'High-Speed Trains: Semi-high-speed Vande Bharat Express and Shatabdi Express trains provide world-class, punctual journeys between major tourism hubs like Delhi-Agra, Delhi-Varanasi, and Delhi-Amritsar.',
      'Health & Hydration: Always drink sealed bottled water or RO-purified water. Enjoy freshly cooked, piping-hot meals at busy eateries.',
    ],
  },
  {
    id: 'best-season-india-travel',
    slug: 'best-season-india-travel',
    title: 'When to Visit India: Month-by-Month Weather Guide',
    excerpt: 'From crisp Himalayan winters to golden Rajasthan breezes and lush green monsoon backwaters.',
    readTime: '5 min read',
    category: 'Seasonal Guide',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    publishDate: 'Updated 2026',
    content: [
      'October to March: The quintessential golden window for North, Central, and South India. Days are sunny and comfortable, making palace walking, wildlife safaris, and beach stays ideal.',
      'April to June: Prime season for high Himalayan retreats—Kashmir, Himachal Pradesh, Uttarakhand, and Ladakh, where pleasant mountain temperatures provide an escape from plain heat.',
      'July to September: Monsoon season brings dramatic emerald transformations to the Western Ghats, Kerala backwaters, and waterfalls.',
    ],
  },
];
