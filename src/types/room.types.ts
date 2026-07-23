export interface Room {
  _id: string;
  name: string;
  slug: string;
  image: string;
  gallery: string[];
  price: number;
  size: string;
  occupancy: number;
  beds: string;
  bathrooms: number;
  description: string;
  amenities: string[];
  isActive: boolean;
}
