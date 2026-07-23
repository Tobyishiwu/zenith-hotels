export interface GalleryItem {
  id: string;
  image: string;
  category: string;
  caption: string;
}

export const galleryItems: GalleryItem[] = [
  { id: "g1", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000", category: "Rooms", caption: "Ocean View Room" },
  { id: "g2", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000", category: "Rooms", caption: "Presidential Suite" },
  { id: "g3", image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000", category: "Rooms", caption: "Deluxe Suite" },
  { id: "g4", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000", category: "Dining", caption: "Main Restaurant" },
  { id: "g5", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000", category: "Dining", caption: "Sunset Dining" },
  { id: "g6", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000", category: "Spa", caption: "Spa Treatment Room" },
  { id: "g7", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000", category: "Spa", caption: "Wellness Ritual" },
  { id: "g8", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1000", category: "Pool", caption: "Infinity Pool" },
  { id: "g9", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000", category: "Events", caption: "Conference Hall" },
  { id: "g10", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000", category: "Events", caption: "Wedding Setup" },
  { id: "g11", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000", category: "Lounge", caption: "Lobby Lounge" },
  { id: "g12", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1000", category: "Lounge", caption: "Exterior View" },
];
