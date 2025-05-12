// twc/src/lib/projectData.ts

export interface Project {
  slug: string;
  title: string;
  image: string;
  category: string;
  description?: string;
  videoUrl?: string;
  gallery?: string[];
}

export const projectData: Project[] = [
  // Featured Work
  {
    slug: "sula-fest",
    title: "SulaFest 2025",
    image: "/lovable-uploads/SF25.webp",
    category: "Event Strategy & Activation",
    description: "SulaFest 2025 was an immersive blend of music, culture, and creativity at India’s iconic vineyard destination. Our team led the full activation strategy, spatial design, and identity across the festival experience.",
    videoUrl: "https://player.vimeo.com/video/123456789", // dummy video
    gallery: [
      "/lovable-uploads/SF25.webp",
      "/lovable-uploads/FORBES.webp",
      "/lovable-uploads/ZOMATO.webp",
      "/lovable-uploads/PM.webp"
    ]
  },
  {
    slug: "forbes-wpower",
    title: "W-Power 2025",
    image: "/lovable-uploads/FORBES.webp",
    category: "Event Identity",
    description: "Celebrating the power of women leaders across India, this annual Forbes summit demanded bold, clean visuals and a commanding stage design. Our work created a statement experience.",
    videoUrl: "https://player.vimeo.com/video/987654321",
    gallery: [
      "/lovable-uploads/FORBES.webp",
      "/lovable-uploads/ZOMATO.webp"
    ]
  },
  {
    slug: "zomato",
    title: "Zomato",
    image: "/lovable-uploads/ZOMATO.webp",
    category: "Campaign Activations",
    description: "For Zomato’s city-wide dining campaign, we turned high streets into food runways. OOH creative, influencer zones, and curated micro-events were part of this buzz-heavy activation.",
    videoUrl: "https://player.vimeo.com/video/111222333",
    gallery: [
      "/lovable-uploads/ZOMATO.webp",
      "/lovable-uploads/PROVOGUE.webp"
    ]
  },
  {
    slug: "provogue",
    title: "Provogue",
    image: "/lovable-uploads/PROVOGUE.webp",
    category: "Retail",
    description: "We reimagined Provogue’s retail windows and launch visuals for a younger fashion-forward audience. From minimal palettes to statement typography, this revamp turned heads.",
    videoUrl: "https://player.vimeo.com/video/444555666",
    gallery: [
      "/lovable-uploads/PROVOGUE.webp",
      "/lovable-uploads/PM.webp"
    ]
  },
  {
    slug: "paul-and-mike",
    title: "Paul & Mike",
    image: "/lovable-uploads/PM.webp",
    category: "Packaging",
    description: "Packaging design for Paul & Mike’s artisanal chocolate line, balancing flavor-forward expression with eco-conscious storytelling.",
    videoUrl: "https://player.vimeo.com/video/777888999",
    gallery: [
      "/lovable-uploads/PM.webp",
      "/lovable-uploads/SF25.webp"
    ]
  },

  // Clients (reused entries)
  {
    slug: "sula-vineyards",
    title: "Sula Vineyards",
    image: "/lovable-uploads/SULA.png",
    category: "Alco-Bev"
  },
  {
    slug: "paul-and-mike-client",
    title: "Paul & Mike (Client)",
    image: "/lovable-uploads/paulandmike.png",
    category: "F&B"
  },
  {
    slug: "provogue-client",
    title: "Provogue (Client)",
    image: "/lovable-uploads/provogue.png",
    category: "Lifestyle"
  },
  {
    slug: "shakacan",
    title: "ShakaCan",
    image: "/lovable-uploads/shakacan.png",
    category: "Alco-Bev"
  }
];
