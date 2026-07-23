export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  validUntil: string;
}

export const offers: Offer[] = [
  { id: "early-bird", title: "Early Bird Escape", description: "Book 30 days in advance and save on your stay, including a complimentary breakfast for two.", discount: "20% OFF", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000", validUntil: "December 31, 2026" },
  { id: "romance-package", title: "Romance Package", description: "A candlelit dinner, couples spa treatment, and late checkout for the perfect romantic getaway.", discount: "15% OFF", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000", validUntil: "Ongoing", },
  { id: "extended-stay", title: "Extended Stay Discount", description: "Stay 5 nights or more and enjoy a significant discount plus complimentary airport transfers.", discount: "25% OFF", image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000", validUntil: "Ongoing" },
];
