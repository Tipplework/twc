// twc/src/lib/projectData.ts

export interface Project {
  slug: string;
  title: string;
  image: string;
  category: string;
}

export const projectData: Project[] = [
  {
    slug: "sula-fest",
    title: "SulaFest 2025",
    image: "/lovable-uploads/SF25.webp",
    category: "Event Strategy & Activation",
  },
  {
    slug: "forbes-wpower",
    title: "W-Power 2025",
    image: "/lovable-uploads/FORBES.webp",
    category: "Event Identity",
  },
  {
    slug: "zomato",
    title: "Zomato",
    image: "/lovable-uploads/ZOMATO.webp",
    category: "Campaign Activations",
  },
  {
    slug: "provogue",
    title: "Provogue",
    image: "/lovable-uploads/PROVOGUE.webp",
    category: "Retail",
  },
  {
    slug: "paul-and-mike",
    title: "Paul & Mike",
    image: "/lovable-uploads/PM.webp",
    category: "Packaging",
  },
  {
    slug: "sula-vineyards",
    title: "Sula Vineyards",
    image: "/lovable-uploads/SULA.png",
    category: "Alco-Bev",
  },
  {
    slug: "paul-and-mike-client",
    title: "Paul & Mike (Client)",
    image: "/lovable-uploads/paulandmike.png",
    category: "F&B",
  },
  // Add more shared entries here
];
