export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "sunset-dining-experiences",
    title: "5 Sunset Dining Experiences You Can't Miss",
    excerpt: "Discover the most breathtaking spots to enjoy dinner as the sun sets over the horizon.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200",
    date: "June 12, 2026",
    category: "Dining",
    content: [
      "There is something quietly transformative about a meal shared as the sky shifts from gold to amber to indigo. At Zenith Hotels, we have designed our dining spaces to make the most of these fleeting moments.",
      "Our rooftop terrace offers uninterrupted views paired with a tasting menu that changes with the season, while the poolside cabanas provide a more intimate setting for couples seeking privacy.",
      "For those celebrating a special occasion, our private dining room can be arranged with personalized menus curated by our executive chef, ensuring every sunset dinner feels entirely your own.",
    ],
  },
  {
    id: "wellness-rituals-guide",
    title: "A Guide to Our Signature Wellness Rituals",
    excerpt: "Step inside our spa and explore the treatments designed to restore mind, body, and spirit.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
    date: "May 28, 2026",
    category: "Wellness",
    content: [
      "Wellness at Zenith Hotels goes beyond a single treatment. Each ritual is designed as a journey, blending ancient techniques with modern therapeutic science.",
      "Our signature massage draws on a blend of Swedish and deep tissue methods, tailored to your specific tension points, while the aromatherapy ritual incorporates locally sourced essential oils to calm both body and mind.",
      "We recommend arriving at least 30 minutes before your treatment to enjoy our steam room and relaxation lounge, allowing your body to fully unwind before your session begins.",
    ],
  },
  {
    id: "planning-dream-wedding",
    title: "Planning Your Dream Wedding at Zenith Hotels",
    excerpt: "From intimate ceremonies to grand celebrations, here's how our team brings your vision to life.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    date: "May 10, 2026",
    category: "Events",
    content: [
      "Every love story deserves a setting as unique as the couple themselves. Our wedding team begins each planning journey with a detailed consultation to understand your vision, style, and priorities.",
      "From there, we handle everything from floral arrangements and catering to accommodation blocks for out-of-town guests, ensuring a seamless experience from engagement to 'I do'.",
      "Our venues range from an intimate garden ceremony space to a grand ballroom capable of hosting up to 300 guests, giving every couple the flexibility to celebrate exactly as they imagined.",
    ],
  },
];
