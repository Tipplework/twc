// twc/src/lib/projectData.ts

export interface Project {
  slug: string;
  title: string;
  image: string;
  category: string;
  description?: string;
  videoUrl?: string;
  gallery?: string[];
  client?: string;
  sector?: string;
  discipline?: string;
  year?: string;
}

export const projectData: Project[] = [
  {
    slug: "sula-fest",
    title: "SulaFest 2025",
    image: "/lovable-uploads/SF25.webp",
    category: "Event Strategy & Activation",
    description: "SulaFest is India’s most iconic vineyard music festival — a celebration of music, wine, food, and culture held at the legendary Sula Vineyards. For the 2025 edition, Tipple Works Co. was at the helm of the entire brand and event rollout.We led the overall festival strategy, curating the creative direction and campaign narrative that defined the experience. Our team managed end-to-end creative production, brand partnerships, performance and social marketing, influencer activations, and coordinated photo and video teams for both pre-event buzz and real-time coverage.We also spearheaded on-ground social media management, sponsorship integrations, and ensured consistent brand engagement across digital and physical touchpoints. The result was a high-impact, multi-platform campaign that brought SulaFest 2025 to life like never before.",
    videoUrl: "https://www.youtube.com/results?search_query=sulafest+2025",
    gallery: ["/lovable-uploads/Sulafest.webp"],
    client: "Sula Vineyards",
    sector: "Wine, Events",
    discipline: "Event Identity, Campaigns, Social Media",
    year: "2025"
  },
  {
    slug: "forbes-wpower",
    title: "W-Power 2025",
    image: "/lovable-uploads/FORBES.webp",
    category: "Event Identity",
    description: "The Forbes W-Power Awards celebrate India’s most influential women across business, entrepreneurship, leadership, and social impact — a platform that honours power, purpose, and progress. For this prestigious event, Tipple Works Co. was brought on board to craft the entire creative vision from the ground up.Our mandate was clear: to develop a distinct and contemporary visual identity that not only aligned with Forbes’ global brand standards but also captured the spirit of modern Indian womanhood — powerful, poised, and visionary.We conceptualised and executed a fresh, elegant design system that ran across all touchpoints — including event branding, digital and social creatives, print collaterals, stage and set design elements, invites, certificates, motion graphics, and more. Every asset was created with intention, combining minimalism with authority and impact with grace.Beyond aesthetics, our focus was on building a cohesive visual language that elevated the W-Power experience — creating a memorable, immersive brand environment for awardees, attendees, and the Forbes community.With this project, Tipple Works Co. helped shape the visual and emotional tone of one of India’s most respected platforms for celebrating women in power.",
    videoUrl: "https://player.vimeo.com/video/987654321",
    gallery: ["/lovable-uploads/Forbes.webp"],
    client: "Forbes India",
    sector: "Media, Events",
    discipline: "Brand Identity, Systems, Campaigns",
    year: "2025"
  },
  {
    slug: "zomato",
    title: "Zomato",
    image: "/lovable-uploads/ZOMATO.webp",
    category: "Campaign Activations",
    description: "Zomato’s BTL push across Maharashtra called for high-impact, offer-led creatives designed for instant customer engagement — and Tipple Works Co. delivered.We developed visually bold creatives promoting Zomato’s latest offers and discounts, tailored specifically for on-ground visibility at restaurants across multiple cities in Maharashtra. From designing print-ready artwork to coordinating widespread distribution and placement, we ensured that every piece landed on time, on brand, and in the right hands.This project highlighted our ability to turn rapid creative execution into measurable on-ground presence, supporting Zomato’s regional growth strategy.",
    videoUrl: "https://player.vimeo.com/video/111222333",
    gallery: ["/lovable-uploads/Zomato.webp"],
    client: "Zomato",
    sector: "F&B, Delivery",
    discipline: "BTL, Print, Regional Strategy",
    year: "2024"
  },
  {
    slug: "provogue",
    title: "Provogue",
    image: "/lovable-uploads/PROVOGUE.webp",
    category: "Retail",
    description: "Provogue, the legendary fashion brand that once defined urban style in India, is back — this time with a bold new step into the world of luggage.Tipple Works Co. is proud to lead the entire 360° marketing strategy for Provogue’s relaunch. From brand storytelling and creative direction to social media management, campaign shoots, influencer activations, and high-impact launch events, we’re building a refreshed identity that speaks to a new generation while honoring Provogue’s iconic legacy.With fresh designs, bold visuals, and a strong digital and offline presence, the Provogue luggage comeback is positioned to make waves — and we’re driving it, end to end.",
    videoUrl: "https://player.vimeo.com/video/444555666",
    gallery: ["/lovable-uploads/Provogue.webp"],
    client: "Provogue",
    sector: "Retail, Fashion",
    discipline: "360° Marketing, Creative Direction, Social Media",
    year: "2024–2025"
  },
  {
    slug: "paul-and-mike",
    title: "Paul & Mike",
    image: "/lovable-uploads/PM.webp",
    category: "Packaging",
    description: "Tipple Works Co. is proud to lead the entire 360° marketing strategy for Paul & Mike Chocolates. From brand storytelling and creative direction to social media management, campaign shoots, influencer activations, and high-impact launches, we’re building a bold, modern identity that reflects the brand’s premium craft and global ambition.With award-winning campaigns, distinctive packaging, and a strong digital and offline presence, Paul & Mike continues to set new standards in Indian chocolate — and we’re driving it, end to end.",
    videoUrl: "https://player.vimeo.com/video/777888999",
    gallery: ["/lovable-uploads/Paulandmike.webp"],
    client: "Paul & Mike",
    sector: "FMCG, Gourmet",
    discipline: "Packaging, Brand Identity, Campaigns",
    year: "2023–2025"
  },
  {
    slug: "forbes-w-power",
    title: "Forbes-w-power",
    image: "/lovable-uploads/FORBES.webp",
    category: "Event Identity",
    description: "The Forbes W-Power Awards celebrate India’s most influential women leaders across business, entrepreneurship, and impact...",
    videoUrl: "https://player.vimeo.com/video/777888999",
    gallery: ["/lovable-uploads/Forbes.webp"],
    client: "Forbes India",
    sector: "Media, Events",
    discipline: "Brand Identity, Systems, Campaigns",
    year: "2025"
  },
  {
    slug: "sula-vineyards",
    title: "Sula Vineyards",
    image: "/lovable-uploads/SULA.webp",
    category: "Alco-Bev",
    description: "Tipple Works Co. is proud to be the creative and strategic partner behind Sula Vineyards’ ever-evolving brand journey. From campaign planning and visual storytelling to social media, influencer integrations, content production, and experiential rollouts, we’ve been instrumental in shaping the voice and presence of India’s most loved wine brand.With striking visuals, consistent digital engagement, and on-ground brand experiences, Sula continues to lead the wine revolution in India — and we’re right there, driving the momentum every step of the way.",
    videoUrl: "https://player.vimeo.com/video/000001",
    gallery: ["/lovable-uploads/Sula.webp"],
    client: "Sula Vineyards",
    sector: "Wine",
    discipline: "Social Media, Strategy, Visual Identity",
    year: "2023–2025"
  },
  {
    slug: "york-winery",
    title: "YORK WINERY",
    image: "/lovable-uploads/YORK.webp",
    category: "Alco-Bev",
    description: "Tipple Works Co. leads the digital and creative strategy for York Winery, a hidden gem in Nashik’s wine country.From influencer-led campaigns and social media management to creative direction and content production, we’re helping York craft a distinctive voice that reflects its boutique charm and award-winning wines.With engaging visuals, local storytelling, and curated creator experiences, we’re building York’s presence as a must-visit destination — both online and on the vineyard.",
    videoUrl: "https://player.vimeo.com/video/000002",
    gallery: ["/lovable-uploads/YORK.webp"],
    client: "York Winery",
    sector: "Wine",
    discipline: "Brand Storytelling, Visual Design",
    year: "2023"
  },
  {
    slug: "rasa",
    title: "Rasa",
    image: "/lovable-uploads/RASA.webp",
    category: "Alco-Bev",
    description: "Tipple Works Co. leads the digital and creative strategy for Rasa Vineyards — Sula’s premium wine label known for elegance and depth.From influencer campaigns and social media storytelling to art-directed creatives and content shoots, we craft a refined digital presence that mirrors the sophistication of Rasa’s wines.Through thoughtful visuals, curated creator experiences, and elevated brand content, we’re positioning Rasa as the choice for wine lovers seeking something truly exceptional..",
    videoUrl: "https://player.vimeo.com/video/000003",
    gallery: ["/lovable-uploads/RASA.webp"],
    client: "Rasa",
    sector: "Wine",
    discipline: "Visual Design, Brand Identity",
    year: "2024"
  },
  {
    slug: "space",
    title: "SPACE",
    image: "/lovable-uploads/SPACE.webp",
    category: "F&B",
    description: "Tipple Works Co. partners with Space Coffee to build a bold, visually striking brand across every platform.From packaging design and creative direction to digital content, social media management, and lifestyle photoshoots, we help Space stand out with a futuristic, design-first approach. Every asset is crafted to reflect the brand’s unique identity — sleek, minimal, and made for the modern consumer.",
    videoUrl: "https://player.vimeo.com/video/000004",
    gallery: ["/lovable-uploads/SPACE.webp"],
    client: "SPACE",
    sector: "F&B, Hospitality",
    discipline: "Design Systems, Aesthetic Branding",
    year: "2023"
  },
  {
    slug: "estate-monkeys",
    title: "Estate Monkeys",
    image: "/lovable-uploads/EM.webp",
    category: "F&B",
    description: "For Estate Monkey, Tipple Works Co. handles the complete creative and digital stack — bringing craft coffee to life visually and culturally.From brand storytelling, packaging design, and product photography to social media strategy and digital creatives, we’re building a vibrant, design-forward coffee brand rooted in authenticity and taste. Our goal: make every scroll, sip, and shelf moment feel unforgettable.",
    videoUrl: "https://player.vimeo.com/video/000007",
    gallery: ["/lovable-uploads/EM.webp"],
    client: "Estate Monkeys",
    sector: "Coffee, D2C",
    discipline: "Branding, Content, Packaging",
    year: "2024"
  },
  {
    slug: "the-source",
    title: "The Source At Sula",
    image: "/lovable-uploads/SOURCE.webp",
    category: "Resort & Hotels",
    description: "Tipple Works Co. leads the complete creative and marketing mandate for The Source at Sula — Sula Vineyards’ flagship resort.From visual identity and digital creatives to on-ground signage, in-room collaterals, event branding, and performance marketing, we ensure every touchpoint reflects the resort’s premium, vineyard-side charm.Whether it’s building seasonal campaigns, designing wine tourism experiences, or driving bookings through targeted digital ads, our work brings The Source to life — visually, experientially, and commercially.",
    videoUrl: "https://player.vimeo.com/video/000009",
    gallery: ["/lovable-uploads/Thesourceatsula.webp"],
    client: "Sula Vineyards",
    sector: "Hospitality",
    discipline: "Performance Marketing, Visual Identity, On-ground",
    year: "2023–2025"
  },
  {
    slug: "naar",
    title: "NAAR",
    image: "/lovable-uploads/NAAR.webp",
    category: "Hospitality",
    description: "Naar is one of India’s finest restaurants — where culinary artistry meets immersive dining.Tipple Works Co. leads social media management and creative direction for Naar, curating a digital presence as elevated as the experience itself. From bespoke visual storytelling to refined content design, we ensure every post, reel, and visual captures the soul of Naar’s cuisine and philosophy.Our work helps Naar stand out not just as a restaurant, but as a destination for food connoisseurs and modern luxury seekers.",
    videoUrl: "https://player.vimeo.com/video/000011",
    gallery: ["/lovable-uploads/NAAR.webp"],
    client: "NAAR",
    sector: "Hospitality",
    discipline: "Design, Interiors, Brand Vibe",
    year: "2024"
  },
  {
    slug: "momoland",
    title: "MOMOLAND",
    image: "/lovable-uploads/ML.webp",
    category: "Hospitality",
    description: "MoMo Land is a vibrant QSR brand reimagining the way India eats momos — bold, fast, and full of flavour.Tipple Works Co. was brought on to craft the entire brand identity from the ground up — from naming, logo design, and visual language to packaging, store graphics, and digital presence.We built a brand that’s fun, memorable, and built for scale — blending street-style energy with modern QSR sensibilities. Every touchpoint, from social media creatives to on-ground brand elements, reflects a strong, cohesive identity made to stand out in a competitive food landscape.",
    videoUrl: "https://player.vimeo.com/video/000013",
    gallery: ["/lovable-uploads/ML.webp"],
    client: "MOMOLAND",
    sector: "QSR, Street Food",
    discipline: "Experience Design, Branding",
    year: "2024"
  },
  {
    slug: "buns-and-slices",
    title: "Buns & Slices",
    image: "/lovable-uploads/BS.webp",
    category: "Hospitality",
    description: "Quirky interiors and identity work for this cafe brand.",
    videoUrl: "https://player.vimeo.com/video/000014",
    gallery: ["/lovable-uploads/BS.webp"],
    client: "Buns & Slices",
    sector: "Café",
    discipline: "Interiors, Logo, Branding",
    year: "2024"
  },
  {
    slug: "beyond-by-sula",
    title: "BEYOND BY SULA",
    image: "/lovable-uploads/Beyond.png",
    category: "Hospitality",
    description: "Beyond by Sula is a luxury lakeside resort by Sula Vineyards — where nature, wine, and indulgence come together.Tipple Works Co. drives the creative and digital strategy for the resort, handling everything from brand storytelling, content design, and performance marketing to social media, influencer stays, and photoshoots.With a focus on serenity, sophistication, and sensory escapes, we help position Beyond by Sula as a must-visit destination for discerning travellers seeking a vineyard-side retreat.",
    videoUrl: "https://player.vimeo.com/video/000016",
    gallery: ["/lovable-uploads/Beyond.png"],
    client: "Sula Vineyards",
    sector: "Resorts",
    discipline: "Branding, Content, Art Direction",
    year: "2024–2025"
  },
  {
    slug: "sprig",
    title: "SPRIG",
    image: "/lovable-uploads/SPRIG.webp",
    category: "F&B",
    description: "Tipple Works Co. is proud to lead the entire 360° marketing strategy for Sprig. From brand positioning and packaging design to social media, performance marketing, content shoots, influencer collaborations, and marketplace strategy, we manage every aspect of the brand’s creative and growth journey.Whether it’s launching global ingredients like Vanilla, Yuzu, and Chipotle or building category-first products in India, we function as Sprig’s end-to-end creative and marketing partner — ensuring every campaign is premium, purposeful, and built to perform.",
    videoUrl: "https://player.vimeo.com/video/000017",
    gallery: ["/lovable-uploads/Sprig.webp"],
    client: "Sprig",
    sector: "FMCG, Gourmet",
    discipline: "Packaging, Digital, Performance Marketing",
    year: "2023–2025"
  }
];
