export type ProjectStatus = "draft" | "published";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  sector: string;
  year: string;
  disciplines: string[];
  summary: string;
  introduction: string;
  challenge: string;
  thinking: string;
  strategy: string;
  creative: string;
  execution: string;
  results: string;
  cover: string;
  gallery: GalleryImage[];
  video: string | null;
  credits: string;
  links: { label: string; href: string }[];
  theme: string;
  featured: boolean;
  homeOrder: number;
  workOrder: number;
  status: ProjectStatus;
  seoTitle: string;
  seoDescription: string;
};

export type Client = {
  name: string;
  logo: string;
  category: string;
  website: string;
  slug: string | null;
  visible: boolean;
  order: number;
};

export type Leader = {
  name: string;
  title: string;
  bio: string;
  image: string;
  linkedin: string;
  visible: boolean;
  order: number;
};

export type Service = {
  title: string;
  summary: string;
  details: string[];
  visible: boolean;
  order: number;
};

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  ogImage: string;
};

export type SiteSettings = {
  siteName: string;
  email: string;
  phone: string;
  phoneHref: string;
  address: string;
  instagram: string;
  instagramHandle: string;
  linkedin: string;
  careersEmail: string;
  adminEmail: string;
  deckUrl: string;
  heroHeadline: string;
  heroSupport: string;
  heroCta: string;
  positioningBefore: string;
  positioningAfter: string;
  studioHeading: string;
  studioBody: string;
  contactHeading: string;
  contactBody: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
};

const img = (src: string, alt: string, caption = ""): GalleryImage => ({ src, alt, caption });

export const settings: SiteSettings = {
  siteName: "Tipple Works Co.",
  email: "srishti.bhatia@tippleworks.com",
  phone: "+91 9136291606",
  phoneHref: "tel:+919136291606",
  address: "Mumbai, India",
  instagram: "https://www.instagram.com/tippleworksco",
  instagramHandle: "@tippleworksco",
  linkedin: "https://www.linkedin.com/company/tippleworksco",
  careersEmail: "rohandhirwani@tippleworks.com",
  adminEmail: "admin@tippleworks.com",
  deckUrl: "https://drive.google.com/drive/folders/1oD8mWzAWKjpeHTk4_hvnyQf23eSE8Tuk",
  heroHeadline: "Tipple Works Co.",
  heroSupport: "The extended marketing team behind ambitious brands.",
  heroCta: "Enter the work",
  positioningBefore: "We don't work like an outside agency.",
  positioningAfter: "We work like your marketing team.",
  studioHeading: "A studio built around the brands it keeps.",
  studioBody:
    "Tipple Works Co. is a creative-led marketing company for ambitious brands. Strategy, identity, campaigns, content, and the on-ground work sit with one team — operating as an extension of yours.",
  contactHeading: "Let's make something people notice.",
  contactBody: "New work, collaborations, and people who want to build with us.",
  defaultTitle: "Tipple Works Co. | The extended marketing team",
  defaultDescription:
    "Tipple Works Co. is the extended marketing team behind ambitious brands — strategy, identity, campaigns, content, and experiences from Mumbai.",
  defaultOgImage: "/og.jpg",
};

export const pageSeo: PageSeo[] = [
  {
    path: "/",
    title: settings.defaultTitle,
    description: settings.defaultDescription,
    ogImage: "/og.jpg",
  },
  {
    path: "/work",
    title: "Selected Work | Tipple Works Co.",
    description: "Campaigns, identities, and brand systems for Sula, Provogue, Paul & Mike, Zomato, Forbes, and others.",
    ogImage: "/work/sula-vineyards-cover.webp",
  },
  {
    path: "/about",
    title: "About | Tipple Works Co.",
    description: "The people and the way of working behind Tipple Works Co.",
    ogImage: "/og.jpg",
  },
  {
    path: "/services",
    title: "Capabilities | Tipple Works Co.",
    description: "Brand, campaigns, content, performance, PR, digital, and experiences — run as one marketing team.",
    ogImage: "/og.jpg",
  },
  {
    path: "/contact",
    title: "Contact | Tipple Works Co.",
    description: "Start a project with Tipple Works Co. in Mumbai.",
    ogImage: "/og.jpg",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Tipple Works Co.",
    description: "How Tipple Works Co. handles personal information.",
    ogImage: "/og.jpg",
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service | Tipple Works Co.",
    description: "Terms for using the Tipple Works Co. website and services.",
    ogImage: "/og.jpg",
  },
];

export const leaders: Leader[] = [
  {
    name: "Rohan Dhirwani",
    title: "Founder & Director — Brand, Strategy & Client Partnerships",
    bio: "Sets the standard for the relationship and the strategy. The work stays close to the brand, and to the people who own it.",
    image: "/team/rohan.webp",
    linkedin: "",
    visible: true,
    order: 1,
  },
  {
    name: "Srishti Bhatia",
    title: "Co-Founder & Director — Growth",
    bio: "Builds the commercial side of the studio — growth, partnerships, and the discipline that turns a campaign into a system.",
    image: "/team/srishti.webp",
    linkedin: "",
    visible: true,
    order: 2,
  },
  {
    name: "Ansh Bhatia",
    title: "Co-Founder & Creative Director",
    bio: "Holds the visual line. Identity, campaigns, and the images people actually remember.",
    image: "/team/ansh.webp",
    linkedin: "",
    visible: true,
    order: 3,
  },
];

export const services: Service[] = [
  {
    title: "Brand Strategy",
    summary: "Positioning, audience, and the decisions that make the rest of the work coherent.",
    details: ["Positioning", "Brand architecture", "Go-to-market narrative"],
    visible: true,
    order: 1,
  },
  {
    title: "Brand Identity",
    summary: "Names, marks, systems, and packaging that can live past the first campaign.",
    details: ["Visual identity", "Packaging", "Brand guidelines"],
    visible: true,
    order: 2,
  },
  {
    title: "Creative Direction",
    summary: "The look, tone, and sequence of a brand across film, stills, and the room.",
    details: ["Art direction", "Campaign worlds", "Photography direction"],
    visible: true,
    order: 3,
  },
  {
    title: "Campaigns",
    summary: "Ideas built to travel — from a launch film to the piece on the table.",
    details: ["Campaign platforms", "Launch systems", "Always-on ideas"],
    visible: true,
    order: 4,
  },
  {
    title: "Social Media",
    summary: "The day-to-day voice, planned and made, not rented out as a calendar.",
    details: ["Channel strategy", "Community", "Always-on content"],
    visible: true,
    order: 5,
  },
  {
    title: "Content",
    summary: "Photography, film, and edits made for the brand, not for a template.",
    details: ["Campaign shoots", "Social film", "Editorial stills"],
    visible: true,
    order: 6,
  },
  {
    title: "Performance Marketing",
    summary: "Media that has to pay for itself, written in the same language as the brand.",
    details: ["Meta and Google", "Retargeting", "Landing pages"],
    visible: true,
    order: 7,
  },
  {
    title: "Influencer Marketing",
    summary: "Creators chosen for fit, then directed like the rest of the campaign.",
    details: ["Casting", "Briefs", "On-ground integrations"],
    visible: true,
    order: 8,
  },
  {
    title: "PR",
    summary: "The story outside the owned channels — press, partnerships, and moments.",
    details: ["Narrative", "Announcements", "Cultural placements"],
    visible: true,
    order: 9,
  },
  {
    title: "Websites / Digital",
    summary: "Sites and digital systems that carry the brand without looking borrowed.",
    details: ["Marketing sites", "Campaign pages", "Digital identity"],
    visible: true,
    order: 10,
  },
  {
    title: "Events & Experiences",
    summary: "Festivals, rooms, and stages where the brand has to hold up in person.",
    details: ["Event identity", "Spatial design", "Live production"],
    visible: true,
    order: 11,
  },
  {
    title: "Hospitality Marketing",
    summary: "Restaurants, resorts, and wine brands that need the room and the feed to match.",
    details: ["Property identity", "Wine tourism", "Guest-facing content"],
    visible: true,
    order: 12,
  },
];

export const clients: Client[] = [
  { name: "Sula Vineyards", logo: "/lovable-uploads/SULA.png", category: "Alco-Bev", website: "", slug: "sula-vineyards", visible: true, order: 1 },
  { name: "SulaFest", logo: "/lovable-uploads/SULAFEST.png", category: "Events", website: "", slug: "sula-fest", visible: true, order: 2 },
  { name: "Rasa", logo: "/lovable-uploads/RASA.png", category: "Alco-Bev", website: "", slug: "rasa", visible: true, order: 3 },
  { name: "The Source", logo: "/lovable-uploads/thesource.png", category: "Hospitality", website: "", slug: "the-source", visible: true, order: 4 },
  { name: "Paul & Mike", logo: "/lovable-uploads/paulandmike.png", category: "FMCG", website: "", slug: "paul-and-mike", visible: true, order: 5 },
  { name: "Provogue", logo: "/lovable-uploads/provogue.png", category: "Retail", website: "", slug: "provogue", visible: true, order: 6 },
  { name: "Zomato", logo: "/lovable-uploads/ZOMATO.png", category: "Hospitality", website: "", slug: "zomato", visible: true, order: 7 },
  { name: "Forbes", logo: "/lovable-uploads/FORBES.png", category: "Events", website: "", slug: "forbes-w-power", visible: true, order: 8 },
  { name: "Sprig", logo: "/lovable-uploads/sprig.png", category: "FMCG", website: "", slug: "sprig", visible: true, order: 9 },
  { name: "York Winery", logo: "/lovable-uploads/YORK.png", category: "Alco-Bev", website: "", slug: "york-winery", visible: true, order: 10 },
  { name: "Space", logo: "/lovable-uploads/space.png", category: "FMCG", website: "", slug: "space", visible: true, order: 11 },
  { name: "Estate Monkeys", logo: "/lovable-uploads/estatemonkey.png", category: "FMCG", website: "", slug: "estate-monkeys", visible: true, order: 12 },
  { name: "Naar", logo: "/lovable-uploads/Naar.png", category: "Hospitality", website: "", slug: "naar", visible: true, order: 13 },
  { name: "Momoland", logo: "/lovable-uploads/momoland.png", category: "Hospitality", website: "", slug: "momoland", visible: true, order: 14 },
  { name: "Buns & Slices", logo: "/lovable-uploads/bunsandslices.png", category: "Hospitality", website: "", slug: "buns-and-slices", visible: true, order: 15 },
  { name: "Beyond by Sula", logo: "/lovable-uploads/Beyond.png", category: "Hospitality", website: "", slug: "beyond-by-sula", visible: true, order: 16 },
  { name: "DSG", logo: "/lovable-uploads/DSG.png", category: "Events", website: "", slug: "DSG", visible: true, order: 17 },
  { name: "Elaan", logo: "/lovable-uploads/elaan.png", category: "Alco-Bev", website: "", slug: null, visible: true, order: 18 },
  { name: "Matero", logo: "/lovable-uploads/matero.png", category: "F&B", website: "", slug: null, visible: true, order: 19 },
  { name: "Kiddopia", logo: "/lovable-uploads/kiddopia.png", category: "Lifestyle", website: "", slug: null, visible: true, order: 20 },
  { name: "ShakaCan", logo: "/lovable-uploads/shakacan.png", category: "Alco-Bev", website: "", slug: null, visible: true, order: 21 },
  { name: "British Brewing Co", logo: "/lovable-uploads/Britishbrewingcompany.png", category: "Hospitality", website: "", slug: null, visible: true, order: 22 },
  { name: "Copper Grillhouse", logo: "/lovable-uploads/coppergrillhouse.png", category: "Hospitality", website: "", slug: null, visible: true, order: 23 },
  { name: "Zealo", logo: "/lovable-uploads/ZEALO.png", category: "F&B", website: "", slug: null, visible: true, order: 24 },
  { name: "VLIV", logo: "/lovable-uploads/VLIV.png", category: "Hospitality", website: "", slug: null, visible: true, order: 25 },
];

function project(partial: Omit<Project, "video" | "credits" | "links" | "challenge" | "thinking" | "strategy" | "creative" | "execution" | "results" | "status"> & Partial<Project>): Project {
  return {
    video: null,
    credits: "",
    links: [],
    challenge: "",
    thinking: "",
    strategy: "",
    creative: "",
    execution: "",
    results: "",
    status: "published",
    ...partial,
  };
}

export const projects: Project[] = [
  project({
    slug: "sula-vineyards",
    title: "Sula Vineyards",
    client: "Sula Vineyards",
    sector: "Wine",
    year: "2023–2025",
    disciplines: ["360° Marketing"],
    summary: "Creative and strategic partnership for India’s most loved wine brand.",
    introduction:
      "Tipple Works Co. is the creative and strategic partner behind Sula Vineyards’ ongoing brand journey. From campaign planning and visual storytelling to social, influencer work, content production, and experiential rollouts, the studio shapes the voice of India’s most loved wine brand.",
    cover: "/work/sula-vineyards-cover.webp",
    gallery: [img("/work/sula-vineyards-01.webp", "Sula Vineyards campaign visual")],
    theme: "#7A1F2B",
    featured: true,
    homeOrder: 1,
    workOrder: 1,
    seoTitle: "Sula Vineyards | Tipple Works Co.",
    seoDescription: "Brand, content, and campaign work for Sula Vineyards.",
  }),
  project({
    slug: "sula-fest",
    title: "SulaFest 2025",
    client: "Sula Vineyards",
    sector: "Wine, Events",
    year: "2025",
    disciplines: ["360° Marketing", "Event Strategy"],
    summary: "The full brand and event rollout for India’s vineyard music festival.",
    introduction:
      "SulaFest is India’s vineyard music festival — music, wine, food, and culture at Sula Vineyards. For 2025, Tipple Works Co. led the festival strategy, creative direction, campaign narrative, partnerships, performance and social marketing, influencer activations, and photo and video teams for the build-up and the weekend itself.",
    cover: "/work/sula-fest-cover.webp",
    gallery: [img("/work/sula-fest-01.webp", "SulaFest 2025")],
    theme: "#E23B2F",
    featured: true,
    homeOrder: 2,
    workOrder: 2,
    seoTitle: "SulaFest 2025 | Tipple Works Co.",
    seoDescription: "Strategy, creative, and on-ground marketing for SulaFest 2025.",
  }),
  project({
    slug: "rasa",
    title: "Rāsā",
    client: "Rasa",
    sector: "Wine",
    year: "2024–2025",
    disciplines: ["360° Marketing"],
    summary: "A quieter, more precise digital presence for Sula’s premium label.",
    introduction:
      "Tipple Works Co. leads digital and creative strategy for Rasa, Sula’s premium wine label. Influencer campaigns, social storytelling, art-directed creatives, and content shoots are built to match the wines: restrained, specific, and made for people who are paying attention.",
    cover: "/work/rasa-cover.webp",
    gallery: [img("/work/rasa-cover.webp", "Rasa")],
    theme: "#6E1E2A",
    featured: true,
    homeOrder: 3,
    workOrder: 3,
    seoTitle: "Rāsā | Tipple Works Co.",
    seoDescription: "Creative and digital work for Rasa, Sula’s premium wine label.",
  }),
  project({
    slug: "the-source",
    title: "The Source at Sula",
    client: "Sula Vineyards",
    sector: "Resort and Hotels",
    year: "2023–2025",
    disciplines: ["360° Marketing"],
    summary: "Identity, digital, and on-property work for Sula’s flagship resort.",
    introduction:
      "Tipple Works Co. leads creative and marketing for The Source at Sula, Sula Vineyards’ flagship resort. Visual identity, digital creatives, signage, in-room collateral, event branding, and performance marketing are kept on one line so the property feels like the vineyard, not a separate brand.",
    cover: "/work/the-source-cover.webp",
    gallery: [img("/work/the-source-01.webp", "The Source at Sula")],
    theme: "#1F4D3A",
    featured: true,
    homeOrder: 4,
    workOrder: 4,
    seoTitle: "The Source at Sula | Tipple Works Co.",
    seoDescription: "Marketing for The Source at Sula, Sula Vineyards’ flagship resort.",
  }),
  project({
    slug: "paul-and-mike",
    title: "Paul & Mike",
    client: "Paul & Mike",
    sector: "Gourmet Chocolates",
    year: "2023–2025",
    disciplines: ["360° Marketing"],
    summary: "End-to-end marketing for a premium Indian chocolate brand.",
    introduction:
      "Tipple Works Co. leads the marketing system for Paul & Mike Chocolates — brand storytelling, creative direction, social, campaign shoots, influencer work, and launches. The aim is a modern identity that matches the craft of the chocolate and the scale of the ambition.",
    cover: "/work/paul-and-mike-cover.webp",
    gallery: [img("/work/paul-and-mike-01.webp", "Paul & Mike")],
    theme: "#C46A2B",
    featured: true,
    homeOrder: 5,
    workOrder: 5,
    seoTitle: "Paul & Mike | Tipple Works Co.",
    seoDescription: "Brand and campaign work for Paul & Mike Chocolates.",
  }),
  project({
    slug: "provogue",
    title: "Provogue",
    client: "Provogue",
    sector: "Retail, Fashion",
    year: "2025",
    disciplines: ["360° Marketing"],
    summary: "The relaunch of Provogue, this time into luggage.",
    introduction:
      "Provogue is returning, stepping into luggage. Tipple Works Co. leads the 360° marketing for the relaunch: brand storytelling, creative direction, social, campaign shoots, influencer activations, and launch events. The identity has to feel current without pretending the old brand never existed.",
    cover: "/work/provogue-cover.webp",
    gallery: [img("/work/provogue-01.webp", "Provogue luggage relaunch")],
    theme: "#111111",
    featured: true,
    homeOrder: 6,
    workOrder: 6,
    seoTitle: "Provogue | Tipple Works Co.",
    seoDescription: "Relaunch marketing for Provogue luggage.",
  }),
  project({
    slug: "zomato",
    title: "Zomato",
    client: "Zomato",
    sector: "F&B",
    year: "2025",
    disciplines: ["BTL", "Print", "Regional Strategy"],
    summary: "Offer-led creatives for Zomato’s on-ground push across Maharashtra.",
    introduction:
      "Zomato’s below-the-line push across Maharashtra needed offer-led creatives that could be read at a restaurant counter. Tipple Works Co. designed the artwork and coordinated distribution and placement so the offers landed on time, on brand, and in the right rooms.",
    cover: "/work/zomato-01.webp",
    gallery: [img("/work/zomato-01.webp", "Zomato Maharashtra campaign")],
    theme: "#E23744",
    featured: true,
    homeOrder: 7,
    workOrder: 7,
    seoTitle: "Zomato | Tipple Works Co.",
    seoDescription: "On-ground creative for Zomato across Maharashtra.",
  }),
  project({
    slug: "forbes-w-power",
    title: "Forbes W-Power",
    client: "Forbes India",
    sector: "Media, Events",
    year: "2025",
    disciplines: ["Brand Identity", "Systems", "Campaigns"],
    summary: "Identity for Forbes India’s recognition of women leaders.",
    introduction:
      "The Forbes W-Power Awards recognise India’s most influential women across business, entrepreneurship, and impact. Tipple Works Co. built the identity and campaign system around that room.",
    cover: "/work/forbes-w-power-cover.webp",
    gallery: [img("/work/forbes-w-power-01.webp", "Forbes W-Power")],
    theme: "#111111",
    featured: true,
    homeOrder: 8,
    workOrder: 8,
    seoTitle: "Forbes W-Power | Tipple Works Co.",
    seoDescription: "Identity and campaign system for Forbes W-Power.",
  }),
  project({
    slug: "york-winery",
    title: "York Winery",
    client: "York Winery",
    sector: "Wine",
    year: "2023–2025",
    disciplines: ["360° Marketing"],
    summary: "Digital and creative strategy for a Nashik winery with a smaller, sharper voice.",
    introduction:
      "Tipple Works Co. leads digital and creative strategy for York Winery. Influencer-led campaigns, social, creative direction, and content give York a voice that matches a boutique winery rather than a national wine brand.",
    cover: "/work/york-winery-cover.webp",
    gallery: [img("/work/york-winery-cover.webp", "York Winery")],
    theme: "#8C3A2F",
    featured: false,
    homeOrder: 0,
    workOrder: 9,
    seoTitle: "York Winery | Tipple Works Co.",
    seoDescription: "Creative and digital work for York Winery.",
  }),
  project({
    slug: "space",
    title: "Space",
    client: "Space",
    sector: "Coffee, D2C",
    year: "2025",
    disciplines: ["Social", "Design Systems", "Brand Identity"],
    summary: "Packaging, content, and social for a design-led coffee brand.",
    introduction:
      "Tipple Works Co. partners with Space Coffee across packaging, creative direction, digital content, social, and photography. The system is spare on purpose — built for a brand that wants to look like itself on a shelf and in a feed.",
    cover: "/work/space-01.webp",
    gallery: [img("/work/space-01.webp", "Space Coffee")],
    theme: "#1A1A1A",
    featured: false,
    homeOrder: 0,
    workOrder: 10,
    seoTitle: "Space Coffee | Tipple Works Co.",
    seoDescription: "Identity and content for Space Coffee.",
  }),
  project({
    slug: "estate-monkeys",
    title: "Estate Monkeys",
    client: "Estate Monkeys",
    sector: "Coffee, D2C",
    year: "2025",
    disciplines: ["Branding", "Social", "Packaging"],
    summary: "The full creative stack for a craft coffee brand.",
    introduction:
      "For Estate Monkeys, Tipple Works Co. handles brand storytelling, packaging, product photography, social strategy, and digital creatives — a coffee brand that has to feel specific in the hand and on the screen.",
    cover: "/work/estate-monkeys-cover.webp",
    gallery: [img("/work/estate-monkeys-01.webp", "Estate Monkeys")],
    theme: "#3D2B1F",
    featured: false,
    homeOrder: 0,
    workOrder: 11,
    seoTitle: "Estate Monkeys | Tipple Works Co.",
    seoDescription: "Branding and content for Estate Monkeys.",
  }),
  project({
    slug: "naar",
    title: "Naar",
    client: "Naar",
    sector: "Restaurant",
    year: "2024–2025",
    disciplines: ["Social", "Creative Direction"],
    summary: "Social and creative direction for one of India’s most exacting restaurants.",
    introduction:
      "Naar is a restaurant where the room and the plate are doing equal work. Tipple Works Co. leads social and creative direction, making a digital presence that is as considered as the dining room.",
    cover: "/work/naar-01.webp",
    gallery: [img("/work/naar-01.webp", "Naar")],
    theme: "#2C2416",
    featured: false,
    homeOrder: 0,
    workOrder: 12,
    seoTitle: "Naar | Tipple Works Co.",
    seoDescription: "Social and creative direction for Naar.",
  }),
  project({
    slug: "momoland",
    title: "Momoland",
    client: "Momoland",
    sector: "QSR",
    year: "2024",
    disciplines: ["Brand Identity", "Brand Kit"],
    summary: "A QSR identity built from the name outward.",
    introduction:
      "Momoland needed an identity that could scale: naming, logo, visual language, packaging, store graphics, and digital. Tipple Works Co. built a system with street energy and the consistency a QSR needs once it leaves the first shop.",
    cover: "/work/momoland-cover.webp",
    gallery: [img("/work/momoland-cover.webp", "Momoland")],
    theme: "#E10600",
    featured: false,
    homeOrder: 0,
    workOrder: 13,
    seoTitle: "Momoland | Tipple Works Co.",
    seoDescription: "Brand identity for Momoland.",
  }),
  project({
    slug: "buns-and-slices",
    title: "Buns & Slices",
    client: "Buns & Slices",
    sector: "QSR",
    year: "2024",
    disciplines: ["Brand Identity", "Brand Kit"],
    summary: "Identity work for a cafe brand with a specific room in mind.",
    introduction: "Identity and interior-facing brand work for Buns & Slices.",
    cover: "/work/buns-and-slices-cover.webp",
    gallery: [img("/work/buns-and-slices-cover.webp", "Buns & Slices")],
    theme: "#E8A317",
    featured: false,
    homeOrder: 0,
    workOrder: 14,
    seoTitle: "Buns & Slices | Tipple Works Co.",
    seoDescription: "Identity for Buns & Slices.",
  }),
  project({
    slug: "beyond-by-sula",
    title: "Beyond by Sula",
    client: "Sula Vineyards",
    sector: "Resort and Hotels",
    year: "2024–2025",
    disciplines: ["360° Marketing"],
    summary: "Creative and digital strategy for a lakeside Sula resort.",
    introduction:
      "Beyond by Sula is a lakeside resort where the offer is quiet on purpose. Tipple Works Co. handles brand storytelling, content, performance, social, influencer stays, and photography — positioning the property as a vineyard-side retreat rather than a generic hotel.",
    cover: "/work/beyond-by-sula-01.webp",
    gallery: [img("/work/beyond-by-sula-01.webp", "Beyond by Sula")],
    theme: "#245C4A",
    featured: false,
    homeOrder: 0,
    workOrder: 15,
    seoTitle: "Beyond by Sula | Tipple Works Co.",
    seoDescription: "Marketing for Beyond by Sula.",
  }),
  project({
    slug: "sprig",
    title: "Sprig",
    client: "Sprig",
    sector: "Gourmet packaged foods",
    year: "2023–2025",
    disciplines: ["360° Marketing"],
    summary: "The full marketing mandate for a premium packaged-food brand.",
    introduction:
      "Tipple Works Co. leads marketing for Sprig: positioning, packaging, social, performance, content, influencer work, and marketplace strategy. The relationship is end to end, from a new ingredient launch to the system that keeps the brand consistent.",
    cover: "/work/sprig-01.webp",
    gallery: [img("/work/sprig-01.webp", "Sprig")],
    theme: "#2F6B3A",
    featured: false,
    homeOrder: 0,
    workOrder: 16,
    seoTitle: "Sprig | Tipple Works Co.",
    seoDescription: "Brand and growth marketing for Sprig.",
  }),
  project({
    slug: "DSG",
    title: "DSG",
    client: "DSG Consumer Partners",
    sector: "Investment",
    year: "2023–2025",
    disciplines: ["Event Marketing"],
    summary: "Creative and production for the DSG annual general meeting.",
    introduction:
      "Tipple Works Co. has been the creative and production partner for DSG Consumer Partners’ AGM. Event identity, stage, presentations, print, digital assets, vendor coordination, and live production are handled as one job so the room matches the firm.",
    cover: "/work/dsg-01.webp",
    gallery: [img("/work/dsg-01.webp", "DSG AGM")],
    theme: "#0E1A2B",
    featured: false,
    homeOrder: 0,
    workOrder: 17,
    seoTitle: "DSG | Tipple Works Co.",
    seoDescription: "Event identity and production for DSG Consumer Partners.",
  }),
  project({
    slug: "thesourcewines",
    title: "The Source Vineyards",
    client: "Sula Vineyards",
    sector: "Wine",
    year: "2023–2025",
    disciplines: ["360° Marketing"],
    summary: "Brand, packaging, and campaigns for The Source wine label.",
    introduction:
      "The Source is a Sula wine label with a more classical tone. Tipple Works Co. leads brand strategy, packaging, digital campaigns, influencer work, social, and performance — telling the vintage story and running the marketing around it.",
    cover: "/work/the-source-cover.webp",
    gallery: [img("/work/thesourcewines-01.webp", "The Source Vineyards")],
    theme: "#6B2D3C",
    featured: false,
    homeOrder: 0,
    workOrder: 18,
    seoTitle: "The Source Vineyards | Tipple Works Co.",
    seoDescription: "Marketing for The Source wine label.",
  }),
];

export function publishedProjects(list = projects) {
  return list
    .filter((item) => item.status === "published")
    .slice()
    .sort((a, b) => a.workOrder - b.workOrder);
}

export function featuredProjects(list = projects) {
  return publishedProjects(list)
    .filter((item) => item.featured)
    .sort((a, b) => a.homeOrder - b.homeOrder);
}

export function projectBySlug(slug: string, list = projects) {
  return list.find((item) => item.slug === slug);
}

export function nextProject(slug: string, list = projects) {
  const ordered = publishedProjects(list);
  const index = ordered.findIndex((item) => item.slug === slug);
  if (index < 0) return ordered[0];
  return ordered[(index + 1) % ordered.length];
}
