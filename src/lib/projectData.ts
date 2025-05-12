// twc/src/lib/projectData.ts

export interface Project {
  slug: string;
  title: string;
  image: string;
  category: string;
  description?: string;
  role?: string[];
  gallery?: string[];
}

export const projectData: Project[] = [
  // Featured Work
  {
    slug: "sula-fest",
    title: "SulaFest 2025",
    image: "/lovable-uploads/SF25.webp",
    category: "Event Strategy & Activation",
    description: "Event strategy and activation for one of India’s most iconic vineyard festivals.",
    role: ["Strategy", "Activation", "Experience Design"],
    gallery: [
      "/lovable-uploads/sf25-1.webp",
      "/lovable-uploads/sf25-2.webp",
    ],
  },
  {
    slug: "forbes-wpower",
    title: "W-Power 2025",
    image: "/lovable-uploads/FORBES.webp",
    category: "Event Identity",
    description: "Identity and visual storytelling for Forbes India’s flagship event celebrating women leaders.",
    role: ["Identity Design", "Event Branding"],
    gallery: [
      "/lovable-uploads/forbes-1.webp",
      "/lovable-uploads/forbes-2.webp",
    ],
  },
  {
    slug: "zomato",
    title: "Zomato",
    image: "/lovable-uploads/ZOMATO.webp",
    category: "Campaign Activations",
    description: "A quirky activation campaign designed to drive Zomato engagement across metros.",
    role: ["Campaign", "OOH", "Pop Culture"],
    gallery: [
      "/lovable-uploads/zomato-1.webp",
      "/lovable-uploads/zomato-2.webp",
    ],
  },
  {
    slug: "provogue",
    title: "Provogue",
    image: "/lovable-uploads/PROVOGUE.webp",
    category: "Retail",
    description: "Retail identity and visual merchandising for youth fashion leader Provogue.",
    role: ["Retail Strategy", "VM", "Lookbook"],
    gallery: [
      "/lovable-uploads/provogue-1.webp",
      "/lovable-uploads/provogue-2.webp",
    ],
  },
  {
    slug: "paul-and-mike",
    title: "Paul & Mike",
    image: "/lovable-uploads/PM.webp",
    category: "Packaging",
    description: "Craft chocolate packaging with a global, farm-to-bar ethos for Paul & Mike.",
    role: ["Packaging", "Illustration", "Typography"],
    gallery: [
      "/lovable-uploads/pm-1.webp",
      "/lovable-uploads/pm-2.webp",
    ],
  },

  // Client Logos (shared with Featured Work if applicable)
  {
    slug: "sula-vineyards",
    title: "Sula Vineyards",
    image: "/lovable-uploads/SULA.png",
    category: "Alco-Bev",
    description: "India’s best-known wine brand — shaped from vineyards to visual culture.",
    role: ["Brand Stewardship"],
  },
  {
    slug: "paul-and-mike-client",
    title: "Paul & Mike (Client)",
    image: "/lovable-uploads/paulandmike.png",
    category: "F&B",
    description: "Farm-to-bar chocolate pioneers Paul & Mike — strategic brand partner.",
    role: ["Packaging", "Brand Support"],
  },
  {
    slug: "provogue-client",
    title: "Provogue (Client)",
    image: "/lovable-uploads/provogue.png",
    category: "Lifestyle",
    description: "A retail branding journey for India’s leading youth fashion brand.",
    role: ["Visual Merchandising"],
  },
  {
    slug: "shakacan",
    title: "ShakaCan",
    image: "/lovable-uploads/shakacan.png",
    category: "Alco-Bev",
    description: "Funky, fizzy, and flavor-packed — we built a voice for this canned cocktail brand.",
    role: ["Naming", "Logo", "Tone of Voice"],
    gallery: ["/lovable-uploads/shakacan-banner.webp"],
  },
];
