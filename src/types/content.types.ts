export interface GalleryItem {
  _id: string;
  image: string;
  category: string;
  caption: string;
  isActive: boolean;
}

export interface Offer {
  _id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  validUntil: string;
  isActive: boolean;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  isActive: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  content: string[];
  isPublished: boolean;
}
