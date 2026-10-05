import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const projectSource = fs.readFileSync(path.join(root, "src/lib/projectData.ts"), "utf8");
const clientsSource = fs.readFileSync(path.join(root, "src/components/Clients.tsx"), "utf8");
const testimonialsSource = fs.readFileSync(path.join(root, "src/components/Testimonials.tsx"), "utf8");

const projectStart = projectSource.indexOf("export const projectData");
const projectData = eval(projectSource.slice(projectSource.indexOf("[", projectStart), projectSource.lastIndexOf("];") + 1));
const clientData = eval(clientsSource.match(/const clientData = (\[[\s\S]*?\n  \]);/)[1]);
const testimonials = eval(testimonialsSource.match(/const testimonials: Testimonial\[] = (\[[\s\S]*?\n  \]);/)[1]);

const featured = ["sula-fest", "provogue", "paul-and-mike", "sula-vineyards", "zomato", "forbes-w-power"];
const projectSlugs = new Set(projectData.map((project) => project.slug));

const services = [
  {
    slug: "creative-design",
    title: "Creative Design",
    icon_key: "brush",
    description: "Brand identity, packaging design, and innovative spatial experiences that leave a lasting impression.",
    items: [
      ["Visual Identity", "palette"],
      ["Packaging", "package"],
      ["Mascot Development", "pentool"],
      ["Spatial & Experience Design", "building"],
    ],
  },
  {
    slug: "social-media",
    title: "Social Media",
    icon_key: "instagram",
    description: "Captivating content creation, strategic planning, and seamless page management across all platforms.",
    items: [
      ["Analytics & Performance", "chart"],
      ["Page Handling", "layout"],
      ["Targeted Strategy", "megaphone"],
      ["Community Engagement", "globe"],
    ],
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    icon_key: "video",
    description: "High-quality photos, engaging reels, and tailored content that resonates with your audience.",
    items: [
      ["Reels & Video Production", "video"],
      ["Grid Planning", "layout"],
      ["Campaign Shoots", "camera"],
      ["Studio Production", "mic"],
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    icon_key: "globe",
    description: "Performance marketing, e-commerce development, and targeted ads strategies for maximum growth.",
    items: [
      ["Meta & Google Ads", "megaphone"],
      ["SEO & Analytics", "search"],
      ["Emailers & Retargeting", "mail"],
      ["Website Design", "monitor"],
    ],
  },
  {
    slug: "event-services",
    title: "Event Services",
    icon_key: "calendar",
    description: "Captivating stage designs, seamless logistics, and immersive brand experiences for memorable events.",
    items: [
      ["Immersive Event Branding", "briefcase"],
      ["Fest Activations", "megaphone"],
      ["Stage Design & Production", "palette"],
      ["Interactive Experiences", "layout"],
    ],
  },
  {
    slug: "hospitality-services",
    title: "Hospitality Services",
    icon_key: "utensils",
    description: "Brand identities, visual design, and marketing strategies tailored for hospitality businesses.",
    items: [
      ["Menu Design", "pentool"],
      ["Packaging & Product Design", "package"],
      ["Marketing Collaterals", "megaphone"],
      ["Digital Presence", "globe"],
    ],
  },
];

const team = [
  ["Rohan Dhirwani", "Founder & CEO", "/lovable-uploads/rohandhirwani.png", 0],
  ["Srishti Bhatia", "Co-Founder & Business Head", "/lovable-uploads/SrishtiBhatia.jpg", 1],
  ["Ansh Bhatia", "Co-Founder & Creative Head", "/lovable-uploads/AnshBhatia.jpeg", 2],
];

let tag = 0;
const q = (value) => {
  if (value === null || value === undefined) return "null";
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  const token = `twcseed${tag++}`;
  return `$${token}$${value}$${token}$`;
};

const assets = new Map();
const remember = (url, alt) => {
  if (!url || assets.has(url)) return;
  assets.set(url, { url, filename: url.split("/").pop(), alt });
};

projectData.forEach((project) => {
  remember(project.image, project.title);
  (project.gallery || []).forEach((item) => {
    const src = typeof item === "string" ? item : item.src;
    const caption = typeof item === "string" ? null : item.caption || null;
    remember(src, caption || project.title);
  });
});
clientData.forEach((client) => remember(client.image, client.name));
team.forEach(([name, , image]) => remember(image, name));

const lines = [];
lines.push(`-- Tipple Works Co. CMS seed, generated from the current public site.`);
lines.push(`-- Apply only after 20261006120000_twc_cms.sql on a dedicated Tipple Works project.`);
lines.push(`-- Existing /public files stay in place. These rows point at those paths.`);
lines.push(`-- Do not apply to project ref ymfwejugtpzawklrlpss.`);
lines.push(``);

for (const asset of assets.values()) {
  lines.push(
    `insert into public.assets (storage_path, public_url, filename, alt_text) values (${q(asset.url)}, ${q(asset.url)}, ${q(asset.filename)}, ${q(asset.alt)}) on conflict (storage_path) do nothing;`
  );
}

lines.push(`
insert into public.site_settings (
  id, site_name, phone, phone_href, email, about_email, careers_email, admin_email, address,
  instagram, instagram_handle, instagram_floating, instagram_contact, linkedin, linkedin_floating,
  footer_copy, copyright
) values (
  1,
  'Tipple Works Co.',
  '+91 9136291606',
  'tel:+919810035669',
  'srishti.bhatia@tippeworks.com',
  'srishti.bhatia@tippleworks.com',
  'rohandhirwani@tippleworks.com',
  'admin@tippleworks.com',
  'Mumbai, India',
  'https://www.instagram.com/tippleworksco',
  '@tippleworksco',
  'https://www.instagram.com/tippleworksco/',
  'https://instagram.com',
  'https://www.linkedin.com/company/tippleworksco',
  'https://in.linkedin.com/company/tippleworksco',
  '© 2025 Tipple Works Private Limited. All rights reserved.',
  '© 2025 Tipple Works Private Limited. All rights reserved.'
) on conflict (id) do nothing;
`);

const pages = [
  ["/", "Home", { logo: "/twc-logo.png" }],
  [
    "/about",
    "About",
    {
      headline: "We build bold brands with clarity, creativity, and cultural insight.",
      philosophy_heading: "Our Philosophy",
      philosophy:
        "Tipple Works Co. is a creative-led marketing agency built for ambitious brands. We’re passionate about storytelling, strategy, and design that doesn’t just look good—but delivers real results.",
      how_heading: "How We Work",
      how: "From strategy and identity to campaigns and content—we believe in sharp thinking, clean execution, and working as an extension of your team to bring your brand to life.",
      cta_heading: "Let’s build something unforgettable.",
      cta_body: "Start your next project with Tipple Works Co. today.",
      cta_label: "Get in Touch",
      join_heading: "Join Our Team",
      join_body: "We’re always looking for talented, curious, and driven people to grow with us.",
      join_label: "Join Us",
    },
  ],
  ["/work", "Work", { heading: "Selected Work" }],
  [
    "/services",
    "Services",
    {
      deck_label: "View Our Deck",
      share_label: "Share",
      deck_url: "https://drive.google.com/drive/folders/1oD8mWzAWKjpeHTk4_hvnyQf23eSE8Tuk",
      share_url: "https://tippleworks.com/services",
    },
  ],
  [
    "/contact",
    "Contact",
    {
      headline: "Let's Create",
      intro: "Ready to transform your brand? Get in touch with us.",
    },
  ],
  [
    "/privacy-policy",
    "Privacy Policy",
    {
      heading: "Privacy Policy",
      effective: "Effective Date: June 2025",
      intro:
        "Tipple Works Co. (“we”, “us”, or “our”) values your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our website or services.",
      items: [
        "What we collect: Contact details, browsing behavior, and submitted inquiries.",
        "How we use it: To respond to you, improve services, and provide relevant communication.",
        "Data Sharing: Only with trusted tools used to run our business (analytics, forms).",
        "Security: Your data is stored securely and used responsibly.",
        "Your Rights: You may request access or deletion of your personal info at any time.",
      ],
      closing: "For any queries, contact us at",
    },
  ],
  [
    "/terms-of-service",
    "Terms of Service",
    {
      heading: "Terms of Service",
      effective: "Effective Date: June 2025",
      intro: "By using our website or services, you agree to the following terms:",
      items: [
        "Content and visuals on this site are the property of Tipple Works Private Limited.",
        "Service engagements are governed by mutual agreements or project scopes.",
        "We are not liable for external links or third-party actions.",
        "We may change or update these terms at our discretion.",
      ],
      closing: "For any concerns, reach out to",
    },
  ],
];

for (const [pagePath, title, content] of pages) {
  lines.push(
    `insert into public.pages (path, title, status, content) values (${q(pagePath)}, ${q(title)}, 'published', ${q(JSON.stringify(content))}::jsonb) on conflict (path) do nothing;`
  );
}

const sections = [
  ["hero", null, null, true, 0, { circles: true, intensity: 0.42, logo: "/twc-logo.png" }],
  ["featured", null, null, true, 1, {}],
  [
    "clients",
    "Our Clients",
    "We collaborate with innovative brands across various industries, helping them reach new heights with our creative solutions.",
    true,
    2,
    {},
  ],
  ["testimonials", "What Clients Say", null, true, 3, {}],
  [
    "services",
    "Our Services",
    "We offer strategic marketing solutions that drive impact and growth for brands across industries.",
    true,
    4,
    {},
  ],
  ["footer", null, "© 2025 Tipple Works Private Limited. All rights reserved.", true, 5, {}],
];

for (const [key, heading, body, visible, order, settings] of sections) {
  lines.push(
    `insert into public.homepage_sections (section_key, heading, body, visible, sort_order, settings) values (${q(key)}, ${q(heading)}, ${q(body)}, ${q(visible)}, ${order}, ${q(JSON.stringify(settings))}::jsonb) on conflict (section_key) do nothing;`
  );
}

const seo = [
  ["/", "Tipple Works Co. | Creative Marketing Agency", "From strategy and identity to campaigns and content—we believe in sharp thinking, clean execution, and working as an extension of your team to bring your brand to life.", "https://tippleworks.com/"],
  ["/about", "Tipple Works Co. | Creative Marketing Agency", "We build bold brands with clarity, creativity, and cultural insight.", "https://tippleworks.com/about"],
  ["/work", "Tipple Works Co. | Creative Marketing Agency", "Selected work by Tipple Works Co.", "https://tippleworks.com/work"],
  ["/services", "Tipple Works Co. | Creative Marketing Agency", "Premium creative marketing agency offering brand identity, social media management, digital marketing, event services and more.", "https://tippleworks.com/services"],
  ["/contact", "Contact Us | Tipple Works Co.", "Ready to transform your brand? Get in touch with us.", "https://tippleworks.com/contact"],
  ["/privacy-policy", "Privacy Policy | Tipple Works Co.", "How Tipple Works Co. collects, uses, and protects personal information.", "https://tippleworks.com/privacy-policy"],
  ["/terms-of-service", "Terms of Service | Tipple Works Co.", "Terms for using the Tipple Works Co. website and services.", "https://tippleworks.com/terms-of-service"],
];

for (const [pagePath, title, description, canonical] of seo) {
  lines.push(
    `insert into public.page_seo (path, title, description, canonical, indexable) values (${q(pagePath)}, ${q(title)}, ${q(description)}, ${q(canonical)}, true) on conflict (path) do nothing;`
  );
}

let featuredOrder = 0;
projectData.forEach((project, index) => {
  const isFeatured = featured.includes(project.slug);
  const order = isFeatured ? featuredOrder++ : null;
  const seoDescription = (project.description || "").slice(0, 160);
  lines.push(`insert into public.projects (
    slug, title, category, description, client, sector, discipline, year, video_url, video_confirmed,
    featured, featured_order, work_order, visible, status, seo_title, seo_description, hero_asset_id
  ) select
    ${q(project.slug)}, ${q(project.title)}, ${q(project.category)}, ${q(project.description || "")},
    ${q(project.client || null)}, ${q(project.sector || null)}, ${q(project.discipline || null)}, ${q(project.year || null)},
    ${q(project.videoUrl || null)}, false,
    ${q(isFeatured)}, ${order === null ? "null" : order}, ${index}, true, 'published',
    ${q(`${project.title} | Tipple Works Co.`)}, ${q(seoDescription)}, a.id
  from public.assets a where a.storage_path = ${q(project.image)}
  on conflict (slug) do nothing;`);

  (project.gallery || []).forEach((item, galleryIndex) => {
    const src = typeof item === "string" ? item : item.src;
    const caption = typeof item === "string" ? null : item.caption || null;
    lines.push(`insert into public.project_media (project_id, asset_id, caption, sort_order, visible)
      select p.id, a.id, ${q(caption)}, ${galleryIndex}, true
      from public.projects p, public.assets a
      where p.slug = ${q(project.slug)} and a.storage_path = ${q(src)}
      and not exists (
        select 1 from public.project_media m where m.project_id = p.id and m.sort_order = ${galleryIndex}
      );`);
  });
});

clientData.forEach((client, index) => {
  const linked = projectSlugs.has(client.slug) ? client.slug : null;
  lines.push(`insert into public.clients (name, logo_asset_id, category, project_slug, website_url, visible, sort_order, status)
    select ${q(client.name)}, a.id, ${q(client.category)}, ${q(linked)}, null, true, ${index}, 'published'
    from public.assets a where a.storage_path = ${q(client.image)}
    and not exists (select 1 from public.clients c where c.name = ${q(client.name)} and c.sort_order = ${index});`);
});

testimonials.forEach((item, index) => {
  lines.push(`insert into public.testimonials (quote, author, position, company, visible, sort_order, status)
    select ${q(item.quote)}, ${q(item.author)}, ${q(item.position)}, ${q(item.company)}, true, ${index}, 'published'
    where not exists (select 1 from public.testimonials t where t.sort_order = ${index} and t.author = ${q(item.author)});`);
});

services.forEach((service, index) => {
  lines.push(`insert into public.services (slug, title, description, icon_key, visible, sort_order, status)
    values (${q(service.slug)}, ${q(service.title)}, ${q(service.description)}, ${q(service.icon_key)}, true, ${index}, 'published')
    on conflict (slug) do nothing;`);
  service.items.forEach(([name, icon], itemIndex) => {
    lines.push(`insert into public.service_items (service_id, name, icon_key, sort_order, visible)
      select s.id, ${q(name)}, ${q(icon)}, ${itemIndex}, true from public.services s
      where s.slug = ${q(service.slug)}
      and not exists (
        select 1 from public.service_items i where i.service_id = s.id and i.sort_order = ${itemIndex}
      );`);
  });
});

team.forEach(([name, role, image, order]) => {
  lines.push(`insert into public.team_members (name, role, image_asset_id, visible, sort_order, status)
    select ${q(name)}, ${q(role)}, a.id, true, ${order}, 'published'
    from public.assets a where a.storage_path = ${q(image)}
    and not exists (select 1 from public.team_members m where m.name = ${q(name)});`);
});

const nav = [
  ["Home", "/", "header", 0],
  ["About", "/about", "header", 1],
  ["Work", "/work", "header", 2],
  ["Services", "/services", "header", 3],
  ["Contact", "/contact", "header", 4],
  ["Home", "/", "footer", 0],
  ["About", "/about", "footer", 1],
  ["Work", "/work", "footer", 2],
  ["Services", "/services", "footer", 3],
  ["Contact", "/contact", "footer", 4],
  ["Privacy Policy", "/privacy-policy", "legal", 0],
  ["Terms of Service", "/terms-of-service", "legal", 1],
];

nav.forEach(([label, href, placement, order]) => {
  lines.push(`insert into public.nav_links (label, href, placement, visible, sort_order, status)
    select ${q(label)}, ${q(href)}, ${q(placement)}, true, ${order}, 'published'
    where not exists (
      select 1 from public.nav_links n where n.placement = ${q(placement)} and n.href = ${q(href)}
    );`);
});

const sqlPath = path.join(root, "supabase/migrations/20261006120100_twc_cms_seed.sql");
fs.writeFileSync(sqlPath, lines.join("\n") + "\n");

const summary = {
  projects: projectData.length,
  featured: featuredOrder,
  clients: clientData.length,
  clientsWithoutProject: clientData.filter((client) => !projectSlugs.has(client.slug)).map((client) => client.name),
  testimonials: testimonials.length,
  services: services.length,
  serviceItems: services.reduce((sum, service) => sum + service.items.length, 0),
  team: team.length,
  assets: assets.size,
  pages: pages.length,
  nav: nav.length,
};
fs.writeFileSync(path.join(root, "scripts/cms-seed-summary.json"), JSON.stringify(summary, null, 2));
console.log(summary);
