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
  // ⭐ Featured Work
  {
    slug: "sula-fest",
    title: "SulaFest 2025",
    image: "/lovable-uploads/Sulafest.webp",
    category: "Event Strategy & Activation",
    description: "SulaFest is India’s most iconic vineyard music festival — a celebration of music, wine, food, and culture held at the legendary Sula Vineyards. For the 2025 edition, Tipple Works Co. was at the helm of the entire brand and event rollout.We led the overall festival strategy, curating the creative direction and campaign narrative that defined the experience. Our team managed end-to-end creative production, brand partnerships, performance and social marketing, influencer activations, and coordinated photo and video teams for both pre-event buzz and real-time coverage.We also spearheaded on-ground social media management, sponsorship integrations, and ensured consistent brand engagement across digital and physical touchpoints. The result was a high-impact, multi-platform campaign that brought SulaFest 2025 to life like never before.",
    videoUrl: "https://www.youtube.com/results?search_query=sulafest+2025",
    gallery: ["/lovable-uploads/SF25.webp", "/lovable-uploads/SF25.webp", "/lovable-uploads/SF25.webp"]
  },
  {
    slug: "forbes-wpower",
    title: "W-Power 2025",
    image: "/lovable-uploads/FORBES.webp",
    category: "Event Identity",
    description: "Celebrating the power of women leaders across India, this annual Forbes summit demanded bold, clean visuals and a commanding stage design. Our work created a statement experience.",
    videoUrl: "https://player.vimeo.com/video/987654321",
    gallery: ["/lovable-uploads/FORBES.webp", "/lovable-uploads/FORBES.webp"]
  },
  {
    slug: "zomato",
    title: "Zomato",
    image: "/lovable-uploads/ZOMATO.webp",
    category: "Campaign Activations",
    description: "For Zomato’s city-wide dining campaign, we turned high streets into food runways. OOH creative, influencer zones, and curated micro-events were part of this buzz-heavy activation.",
    videoUrl: "https://player.vimeo.com/video/111222333",
    gallery: ["/lovable-uploads/ZOMATO.webp", "/lovable-uploads/ZOMATO.webp"]
  },
  {
    slug: "provogue",
    title: "Provogue",
    image: "/lovable-uploads/PROVOGUE.webp",
    category: "Retail",
    description: "We reimagined Provogue’s retail windows and launch visuals for a younger fashion-forward audience. From minimal palettes to statement typography, this revamp turned heads.",
    videoUrl: "https://player.vimeo.com/video/444555666",
    gallery: ["/lovable-uploads/PROVOGUE.webp"]
  },
  {
    slug: "paul-and-mike",
    title: "Paul & Mike",
    image: "/lovable-uploads/PM.webp",
    category: "Packaging",
    description: "Packaging design for Paul & Mike’s artisanal chocolate line, balancing flavor-forward expression with eco-conscious storytelling.",
    videoUrl: "https://player.vimeo.com/video/777888999",
    gallery: ["/lovable-uploads/PM.webp"]
  },

  // 🧠 Clients (with updated sula-vineyards)
  {
    slug: "sula-vineyards",
    title: "Sula Vineyards",
    image: "/lovable-uploads/SULA.webp",
    category: "Alco-Bev",
    description: "Brand world design for one of India’s most iconic vineyards — uniting architecture, packaging, hospitality and experience into a cohesive identity. From logo applications across property signages to wine labels, event campaigns, and even resort experiences — the Sula brand language was developed with warmth, earthiness, and celebration at its core.",
    videoUrl: "https://player.vimeo.com/video/000001", // Replace with valid link or null
    gallery: [
      "/lovable-uploads/SULA.webp",
      "/lovable-uploads/SULA1.webp",
      "/lovable-uploads/SULA2.webp"
    ]
  },
  {
    slug: "york-winery",
    title: "YORK WINERY",
    image: "/lovable-uploads/YORK.webp",
    category: "Alco-Bev",
    description: "A beautiful exploration of York Winery's identity and brand story.",
    videoUrl: "https://player.vimeo.com/video/000002",
    gallery: ["/lovable-uploads/YORK.webp"]
  },
  {
    slug: "rasa",
    title: "Rasa",
    image: "/lovable-uploads/RASA.webp",
    category: "Alco-Bev",
    description: "Visual storytelling and branding for Rasa’s unique wine culture.",
    videoUrl: "https://player.vimeo.com/video/000003",
    gallery: ["/lovable-uploads/RASA.webp"]
  },
  {
    slug: "space",
    title: "SPACE",
    image: "/lovable-uploads/SPACE.webp",
    category: "F&B",
    description: "Minimalist aesthetics and design systems for SPACE’s food concept.",
    videoUrl: "https://player.vimeo.com/video/000004",
    gallery: ["/lovable-uploads/SPACE.webp"]
  },
  {
    slug: "estate-monkeys",
    title: "Estate Monkeys",
    image: "/lovable-uploads/EM.webp",
    category: "F&B",
    description: "Visual systems and storytelling for the estate coffee brand.",
    videoUrl: "https://player.vimeo.com/video/000007",
    gallery: ["/lovable-uploads/EM.webp"]
  },
  {
    slug: "the-source",
    title: "The Source",
    image: "/lovable-uploads/SOURCE.webp",
    category: "Alco-Bev",
    description: "Brand articulation for The Source at Sula, blending leisure & luxury.",
    videoUrl: "https://player.vimeo.com/video/000009",
    gallery: ["/lovable-uploads/SOURCE.webp"]
  },
  {
    slug: "naar",
    title: "NAAR",
    image: "/lovable-uploads/NAAR.webp",
    category: "Hospitality",
    description: "Creating a distinctive luxe hospitality vibe for NAAR.",
    videoUrl: "https://player.vimeo.com/video/000011",
    gallery: ["/lovable-uploads/NAAR.webp"]
  },
  {
    slug: "momoland",
    title: "MOMOLAND",
    image: "/lovable-uploads/ML.webp",
    category: "Hospitality",
    description: "Street food reimagined with MOMOLAND’s experiential concept.",
    videoUrl: "https://player.vimeo.com/video/000013",
    gallery: ["/lovable-uploads/ML.webp"]
  },
  {
    slug: "buns-and-slices",
    title: "Buns & Slices",
    image: "/lovable-uploads/BS.webp",
    category: "Hospitality",
    description: "Quirky interiors and identity work for this cafe brand.",
    videoUrl: "https://player.vimeo.com/video/000014",
    gallery: ["/lovable-uploads/BS.webp"]
  },
  {
    slug: "beyond-by-sula",
    title: "BEYOND BY SULA",
    image: "/lovable-uploads/Beyond.png",
    category: "Hospitality",
    description: "Art direction & branded storytelling for Beyond by Sula luxury stay.",
    videoUrl: "https://player.vimeo.com/video/000016",
    gallery: ["/lovable-uploads/Beyond.png"]
  },
  {
    slug: "sprig",
    title: "SPRIG",
    image: "/lovable-uploads/SPRIG.webp",
    category: "F&B",
    description: "Refreshed identity and pack design for SPRIG’s gourmet offerings.",
    videoUrl: "https://player.vimeo.com/video/000017",
    gallery: ["/lovable-uploads/SPRIG.webp"]
  }
];
