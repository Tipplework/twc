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
    image: "/lovable-uploads/SF25.webp",
    category: "Event Strategy & Activation",
    description: "SulaFest 2025 was an immersive blend of music, culture, and creativity at India’s iconic vineyard destination. Our team led the full activation strategy, spatial design, and identity across the festival experience.",
    videoUrl: "https://player.vimeo.com/video/123456789",
    gallery: ["/lovable-uploads/SF25.webp", "/lovable-uploads/FORBES.webp", "/lovable-uploads/ZOMATO.webp"]
  },
  {
    slug: "forbes-wpower",
    title: "W-Power 2025",
    image: "/lovable-uploads/FORBES.webp",
    category: "Event Identity",
    description: "Celebrating the power of women leaders across India, this annual Forbes summit demanded bold, clean visuals and a commanding stage design. Our work created a statement experience.",
    videoUrl: "https://player.vimeo.com/video/987654321",
    gallery: ["/lovable-uploads/FORBES.webp", "/lovable-uploads/ZOMATO.webp"]
  },
  {
    slug: "zomato",
    title: "Zomato",
    image: "/lovable-uploads/ZOMATO.webp",
    category: "Campaign Activations",
    description: "For Zomato’s city-wide dining campaign, we turned high streets into food runways. OOH creative, influencer zones, and curated micro-events were part of this buzz-heavy activation.",
    videoUrl: "https://player.vimeo.com/video/111222333",
    gallery: ["/lovable-uploads/ZOMATO.webp", "/lovable-uploads/PROVOGUE.webp"]
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

  // 🧠 Clients (with dummy project pages)
  {
    slug: "sula-vineyards",
    title: "Sula Vineyards",
    image: "/lovable-uploads/SULA.png",
    category: "Alco-Bev",
    description: "Brand world design for one of India’s most loved vineyards.",
    videoUrl: "https://player.vimeo.com/video/000001",
    gallery: ["/lovable-uploads/SULA.png"]
  },
  {
    slug: "york-winery",
    title: "YORK WINERY",
    image: "/lovable-uploads/YORK.png",
    category: "Alco-Bev",
    description: "A beautiful exploration of York Winery's identity and brand story.",
    videoUrl: "https://player.vimeo.com/video/000002",
    gallery: ["/lovable-uploads/YORK.png"]
  },
  {
    slug: "rasa",
    title: "Rasa",
    image: "/lovable-uploads/RASA.png",
    category: "Alco-Bev",
    description: "Visual storytelling and branding for Rasa’s unique wine culture.",
    videoUrl: "https://player.vimeo.com/video/000003",
    gallery: ["/lovable-uploads/RASA.png"]
  },
  {
    slug: "space",
    title: "SPACE",
    image: "/lovable-uploads/space.png",
    category: "F&B",
    description: "Minimalist aesthetics and design systems for SPACE’s food concept.",
    videoUrl: "https://player.vimeo.com/video/000004",
    gallery: ["/lovable-uploads/space.png"]
  },
  {
    slug: "elaan",
    title: "ELAAN",
    image: "/lovable-uploads/elaan.png",
    category: "Alco-Bev",
    description: "Premium branding and activation touchpoints for ELAAN beverages.",
    videoUrl: "https://player.vimeo.com/video/000005",
    gallery: ["/lovable-uploads/elaan.png"]
  },
  {
    slug: "matero",
    title: "MATERO",
    image: "/lovable-uploads/matero.png",
    category: "F&B",
    description: "Go-to-market packaging & positioning design for MATERO.",
    videoUrl: "https://player.vimeo.com/video/000006",
    gallery: ["/lovable-uploads/matero.png"]
  },
  {
    slug: "estate-monkeys",
    title: "Estate Monkeys",
    image: "/lovable-uploads/estatemonkey.png",
    category: "F&B",
    description: "Visual systems and storytelling for the estate coffee brand.",
    videoUrl: "https://player.vimeo.com/video/000007",
    gallery: ["/lovable-uploads/estatemonkey.png"]
  },
  {
    slug: "shakacan",
    title: "ShakaCan",
    image: "/lovable-uploads/shakacan.png",
    category: "Alco-Bev",
    description: "Funky canned cocktail brand brought to life through quirky visuals.",
    videoUrl: "https://player.vimeo.com/video/000008",
    gallery: ["/lovable-uploads/shakacan.png"]
  },
  {
    slug: "the-source",
    title: "The Source",
    image: "/lovable-uploads/thesource.png",
    category: "Alco-Bev",
    description: "Brand articulation for The Source at Sula, blending leisure & luxury.",
    videoUrl: "https://player.vimeo.com/video/000009",
    gallery: ["/lovable-uploads/thesource.png"]
  },
  {
    slug: "kiddopia",
    title: "KIDDOPIA",
    image: "/lovable-uploads/kiddopia.png",
    category: "Lifestyle",
    description: "Playful and educational branded visuals for KIDDOPIA.",
    videoUrl: "https://player.vimeo.com/video/000010",
    gallery: ["/lovable-uploads/kiddopia.png"]
  },
  {
    slug: "naar",
    title: "NAAR",
    image: "/lovable-uploads/Naar.png",
    category: "Hospitality",
    description: "Creating a distinctive luxe hospitality vibe for NAAR.",
    videoUrl: "https://player.vimeo.com/video/000011",
    gallery: ["/lovable-uploads/Naar.png"]
  },
  {
    slug: "british-brewing-co",
    title: "British Brewing Co",
    image: "/lovable-uploads/Britishbrewingcompany.png",
    category: "Hospitality",
    description: "Craft beer heritage and hip pub aesthetic fused for BBC.",
    videoUrl: "https://player.vimeo.com/video/000012",
    gallery: ["/lovable-uploads/Britishbrewingcompany.png"]
  },
  {
    slug: "momoland",
    title: "MOMOLAND",
    image: "/lovable-uploads/momoland.png",
    category: "Hospitality",
    description: "Street food reimagined with MOMOLAND’s experiential concept.",
    videoUrl: "https://player.vimeo.com/video/000013",
    gallery: ["/lovable-uploads/momoland.png"]
  },
  {
    slug: "buns-and-slices",
    title: "Buns & Slices",
    image: "/lovable-uploads/bunsandslices.png",
    category: "Hospitality",
    description: "Quirky interiors and identity work for this cafe brand.",
    videoUrl: "https://player.vimeo.com/video/000014",
    gallery: ["/lovable-uploads/bunsandslices.png"]
  },
  {
    slug: "copper-grillhouse",
    title: "COPPER Grillhouse",
    image: "/lovable-uploads/coppergrillhouse.png",
    category: "Hospitality",
    description: "Elegant fusion dining experience branding for COPPER.",
    videoUrl: "https://player.vimeo.com/video/000015",
    gallery: ["/lovable-uploads/coppergrillhouse.png"]
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
    image: "/lovable-uploads/sprig.png",
    category: "F&B",
    description: "Refreshed identity and pack design for SPRIG’s gourmet offerings.",
    videoUrl: "https://player.vimeo.com/video/000017",
    gallery: ["/lovable-uploads/sprig.png"]
  },
  {
    slug: "dsg",
    title: "DSG",
    image: "/lovable-uploads/DSG.png",
    category: "Event IP's",
    description: "Complete creative direction and stage identity for DSG event IP.",
    videoUrl: "https://player.vimeo.com/video/000018",
    gallery: ["/lovable-uploads/DSG.png"]
  }
];
