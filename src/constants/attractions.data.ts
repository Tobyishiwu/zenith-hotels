export interface Attraction {
  id: string;
  name: string;
  distance: string;
  image: string;
}

export const attractions: Attraction[] = [
  { id: "n1", name: "Golden Beach Promenade", distance: "5 min walk", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800" },
  { id: "n2", name: "Old Town Market", distance: "10 min drive", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800" },
  { id: "n3", name: "Botanical Gardens", distance: "15 min drive", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800" },
];
