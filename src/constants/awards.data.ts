export interface Award {
  id: string;
  title: string;
  year: string;
  issuer: string;
}

export const awards: Award[] = [
  { id: "a1", title: "Best Luxury Hotel", year: "2025", issuer: "World Travel Awards" },
  { id: "a2", title: "5-Star Excellence", year: "2024", issuer: "Forbes Travel Guide" },
  { id: "a3", title: "Top Hospitality Brand", year: "2024", issuer: "Condé Nast Traveler" },
  { id: "a4", title: "Best Spa Experience", year: "2023", issuer: "Spa & Wellness Awards" },
];
