// Placeholder project data

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Corporate Showcase",
    description: "High-energy performance for global tech company event.",
    image: "/projects/4.jpg",
  },
  {
    id: "2",
    title: "UEFA Championship Opening",
    description: "Grand-scale opening ceremony with 200+ performers.",
    image: "/projects/5.jpg",
  },
  {
    id: "3",
    title: "Music Video Production",
    description: "Choreography and direction for award-winning music video.",
    image: "/projects/6.jpg",
  },
  {
    id: "4",
    title: "International Festival",
    description:
      "Multi-day production with international talent collaboration.",
    image: "/projects/7.jpg",
  },
  {
    id: "5",
    title: "Fashion Week Performance",
    description: "Avant-garde choreography for luxury fashion brand.",
    image: "/projects/8.jpg",
  },
  {
    id: "6",
    title: "Brand Launch Event",
    description: "Creative production for international brand showcase.",
    image: "/projects/9.jpg",
  },
];
