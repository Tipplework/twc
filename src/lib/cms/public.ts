import type { Project } from "@/lib/projectData";
import { reportCmsFallback, supabase } from "@/lib/cms/client";

export type SiteSettings = {
  site_name: string;
  phone: string;
  phone_href: string;
  email: string;
  about_email: string;
  careers_email: string;
  admin_email: string;
  address: string;
  instagram: string;
  instagram_handle: string;
  instagram_floating: string;
  instagram_contact: string;
  linkedin: string;
  linkedin_floating: string;
  footer_copy: string;
  copyright: string;
};

export type CmsClient = {
  id: string;
  name: string;
  image: string;
  category: string;
  slug: string | null;
  website_url: string | null;
};

export type CmsTestimonial = {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
};

export type CmsService = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon_key: string;
  items: { name: string; icon_key: string }[];
};

export type CmsTeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string | null;
};

export type CmsNavLink = { id: string; label: string; href: string; placement: string };
export type CmsPage = { path: string; title: string; content: Record<string, unknown> };
export type CmsSection = {
  section_key: string;
  heading: string | null;
  body: string | null;
  visible: boolean;
  settings: Record<string, unknown>;
};
export type CmsSeo = {
  path: string;
  title: string | null;
  description: string | null;
  canonical: string | null;
  og_image: string | null;
  indexable: boolean;
};

type Asset = { public_url?: string; alt_text?: string; caption?: string; id?: string };

function assetUrl(asset: Asset | Asset[] | null | undefined) {
  const row = Array.isArray(asset) ? asset[0] : asset;
  return row?.public_url || "";
}

function toProject(row: Record<string, unknown>): Project {
  const gallery = Array.isArray(row.gallery) ? row.gallery : [];
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title || ""),
    image: assetUrl(row.hero as Asset),
    category: String(row.category || ""),
    description: String(row.description || ""),
    videoUrl: (row.video_url as string) || undefined,
    videoConfirmed: Boolean(row.video_confirmed),
    gallery: gallery
      .filter((item) => (item as { visible?: boolean }).visible !== false)
      .sort((a, b) => Number((a as { sort_order?: number }).sort_order || 0) - Number((b as { sort_order?: number }).sort_order || 0))
      .map((item) => {
        const media = item as { caption?: string; asset?: Asset | Asset[] };
        const src = assetUrl(media.asset);
        return media.caption ? { src, caption: media.caption } : src;
      }),
    client: (row.client as string) || undefined,
    sector: (row.sector as string) || undefined,
    discipline: (row.discipline as string) || undefined,
    year: (row.year as string) || undefined,
    featured: Boolean(row.featured),
    featuredOrder: row.featured_order == null ? undefined : Number(row.featured_order),
    status: row.status as Project["status"],
    visible: Boolean(row.visible),
    seoTitle: (row.seo_title as string) || undefined,
    seoDescription: (row.seo_description as string) || undefined,
  };
}

const projectSelect = `
  id, slug, title, category, description, client, sector, discipline, year,
  video_url, video_confirmed, featured, featured_order, work_order, visible, status,
  seo_title, seo_description,
  hero:assets!projects_hero_asset_id_fkey(public_url, alt_text),
  gallery:project_media(caption, sort_order, visible, asset:assets!project_media_asset_id_fkey(public_url, alt_text, caption))
`;

let projectsRequest: Promise<Project[] | null> | null = null;

export function getProjects() {
  if (!projectsRequest) projectsRequest = loadProjects();
  return projectsRequest;
}

async function loadProjects() {
  if (!supabase) {
    reportCmsFallback("Supabase is not configured.");
    return null;
  }
  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .eq("status", "published")
    .eq("visible", true)
    .order("work_order", { ascending: true });
  if (error || !data?.length) {
    console.error("[cms] getProjects failed", error || "no published projects");
    reportCmsFallback("Published projects could not be loaded.");
    return null;
  }
  return data.map((row) => toProject(row as unknown as Record<string, unknown>));
}

export async function getFeaturedProjects() {
  const projects = await getProjects();
  if (!projects) return null;
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
}

export async function getProject(slug: string) {
  const projects = await getProjects();
  if (!projects) return undefined;
  return projects.find((project) => project.slug === slug) || null;
}

export async function getPreviewProject(slug: string): Promise<Project | null | undefined> {
  if (!supabase || !slug) return undefined;
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) return undefined;
  const { data, error } = await supabase
    .from("projects")
    .select(`${projectSelect}, draft`)
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) {
    console.error("[cms] preview project failed", error);
    return null;
  }
  const row = data as unknown as Record<string, unknown>;
  const draft = (row.draft || null) as Record<string, unknown> | null;
  const merged = draft ? { ...row, ...draft, id: row.id, slug: draft.slug || row.slug } : row;
  if (Array.isArray(draft?.gallery)) {
    merged.gallery = draft.gallery;
    merged.hero = draft.hero_url ? { public_url: draft.hero_url } : row.hero;
  }
  return toProject(merged);
}

async function publishedList<T>(table: string, select: string, map: (row: Record<string, unknown>) => T) {
  if (!supabase) {
    reportCmsFallback("Supabase is not configured.");
    return null;
  }
  const { data, error } = await supabase
    .from(table)
    .select(select)
    .eq("status", "published")
    .eq("visible", true)
    .order("sort_order", { ascending: true });
  if (error || !data?.length) {
    console.error(`[cms] ${table} failed`, error || "empty");
    reportCmsFallback(`${table} could not be loaded.`);
    return null;
  }
  return data.map((row) => map(row as unknown as Record<string, unknown>));
}

export function getClients() {
  return publishedList("clients", "id, name, category, project_slug, website_url, logo:assets!clients_logo_asset_id_fkey(public_url, alt_text)", (row) => ({
    id: String(row.id),
    name: String(row.name),
    image: assetUrl(row.logo as Asset),
    category: String(row.category || ""),
    slug: (row.project_slug as string) || null,
    website_url: (row.website_url as string) || null,
  }));
}

export function getTestimonials() {
  return publishedList("testimonials", "id, quote, author, position, company", (row) => ({
    id: String(row.id),
    quote: String(row.quote || ""),
    author: String(row.author || ""),
    position: String(row.position || ""),
    company: String(row.company || ""),
  }));
}

export async function getServices(): Promise<CmsService[] | null> {
  if (!supabase) {
    reportCmsFallback("Supabase is not configured.");
    return null;
  }
  const { data, error } = await supabase
    .from("services")
    .select("id, slug, title, description, icon_key, sort_order, items:service_items(name, icon_key, sort_order, visible)")
    .eq("status", "published")
    .eq("visible", true)
    .order("sort_order", { ascending: true });
  if (error || !data?.length) {
    console.error("[cms] services failed", error || "empty");
    reportCmsFallback("Services could not be loaded.");
    return null;
  }
  return data.map((row) => {
    const items = Array.isArray(row.items) ? row.items : [];
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      description: row.description,
      icon_key: row.icon_key,
      items: items
        .filter((item) => (item as { visible?: boolean }).visible !== false)
        .sort((a, b) => Number((a as { sort_order?: number }).sort_order || 0) - Number((b as { sort_order?: number }).sort_order || 0))
        .map((item) => ({ name: String((item as { name?: string }).name || ""), icon_key: String((item as { icon_key?: string }).icon_key || "") })),
    };
  });
}

export function getTeam() {
  return publishedList("team_members", "id, name, role, bio, linkedin, image:assets!team_members_image_asset_id_fkey(public_url, alt_text)", (row) => ({
    id: String(row.id),
    name: String(row.name),
    role: String(row.role || ""),
    bio: String(row.bio || ""),
    image: assetUrl(row.image as Asset),
    linkedin: (row.linkedin as string) || null,
  }));
}

let settingsRequest: Promise<SiteSettings | null> | null = null;
let sectionsRequest: Promise<CmsSection[] | null> | null = null;

export function getSiteSettings(): Promise<SiteSettings | null> {
  if (!settingsRequest) settingsRequest = loadSettings();
  return settingsRequest;
}

async function loadSettings(): Promise<SiteSettings | null> {
  if (!supabase) {
    reportCmsFallback("Supabase is not configured.");
    return null;
  }
  const { data, error } = await supabase
    .from("site_settings")
    .select("site_name, phone, phone_href, email, about_email, careers_email, admin_email, address, instagram, instagram_handle, instagram_floating, instagram_contact, linkedin, linkedin_floating, footer_copy, copyright")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) {
    console.error("[cms] site settings failed", error);
    reportCmsFallback("Site settings could not be loaded.");
    return null;
  }
  return data as SiteSettings;
}

export async function getNavLinks(placement: "header" | "footer" | "legal") {
  if (!supabase) {
    reportCmsFallback("Supabase is not configured.");
    return null;
  }
  const { data, error } = await supabase
    .from("nav_links")
    .select("id, label, href, placement")
    .eq("placement", placement)
    .eq("status", "published")
    .eq("visible", true)
    .order("sort_order", { ascending: true });
  if (error || !data?.length) {
    console.error("[cms] navigation failed", error || "empty");
    reportCmsFallback("Navigation could not be loaded.");
    return null;
  }
  return data as CmsNavLink[];
}

export async function getPage(path: string): Promise<CmsPage | null> {
  if (!supabase) {
    reportCmsFallback("Supabase is not configured.");
    return null;
  }
  const { data, error } = await supabase.from("pages").select("path, title, content").eq("path", path).eq("status", "published").maybeSingle();
  if (error || !data) {
    if (error) console.error("[cms] page failed", error);
    return null;
  }
  return data as CmsPage;
}

export function getHomepageSections(): Promise<CmsSection[] | null> {
  if (!sectionsRequest) sectionsRequest = loadSections();
  return sectionsRequest;
}

async function loadSections(): Promise<CmsSection[] | null> {
  if (!supabase) {
    reportCmsFallback("Supabase is not configured.");
    return null;
  }
  const { data, error } = await supabase
    .from("homepage_sections")
    .select("section_key, heading, body, visible, settings")
    .order("sort_order", { ascending: true });
  if (error || !data?.length) {
    console.error("[cms] homepage sections failed", error || "empty");
    reportCmsFallback("Homepage sections could not be loaded.");
    return null;
  }
  return data as CmsSection[];
}

export async function getPageSeo(path: string): Promise<CmsSeo | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("page_seo")
    .select("path, title, description, canonical, indexable, og:assets!page_seo_og_asset_id_fkey(public_url)")
    .eq("path", path)
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("[cms] seo failed", error);
    return null;
  }
  const row = data as unknown as { path: string; title: string | null; description: string | null; canonical: string | null; indexable: boolean; og?: Asset | Asset[] };
  return {
    path: row.path,
    title: row.title,
    description: row.description,
    canonical: row.canonical,
    og_image: assetUrl(row.og),
    indexable: row.indexable !== false,
  };
}
