export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Amara Chukwu",
    role: "Business Traveler",
    quote: "Every visit feels like a reset. The staff remember small details that make you feel truly cared for, not just accommodated.",
    rating: 5,
  },
  {
    id: "t2",
    name: "David Whitmore",
    role: "Honeymoon Guest",
    quote: "We chose Zenith for our honeymoon and it exceeded every expectation. The suite, the service, the sunset views — flawless.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Funmilayo Adeyemi",
    role: "Corporate Event Planner",
    quote: "Hosted our annual conference here and the events team handled everything seamlessly. Professional from start to finish.",
    rating: 5,
  },
];
