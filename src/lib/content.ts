import {
  clients,
  featuredProjects,
  leaders,
  pageSeo,
  projects,
  services,
  settings,
  publishedProjects,
  type Client,
  type Leader,
  type Project,
  type Service,
} from "@/content/site";
import { supabase, supabaseConfigured } from "@/lib/supabase";

export type PublishedSite = {
  projects: Project[];
  featured: Project[];
  clients: Client[];
  leaders: Leader[];
  services: Service[];
};

const fallback: PublishedSite = {
  projects: publishedProjects(),
  featured: featuredProjects(),
  clients: clients.filter((item) => item.visible).sort((a, b) => a.order - b.order),
  leaders: leaders.filter((item) => item.visible).sort((a, b) => a.order - b.order),
  services: services.filter((item) => item.visible).sort((a, b) => a.order - b.order),
};

let cache: PublishedSite | null = null;

function mapProject(row: Record<string, unknown>): Project {
  return {
    slug: String(row.slug),
    title: String(row.title),
    client: String(row.client ?? ""),
    sector: String(row.sector ?? ""),
    year: String(row.year ?? ""),
    disciplines: Array.isArray(row.disciplines) ? row.disciplines.map(String) : [],
    summary: String(row.summary ?? ""),
    introduction: String(row.introduction ?? ""),
    challenge: String(row.challenge ?? ""),
    thinking: String(row.thinking ?? ""),
    strategy: String(row.strategy ?? ""),
    creative: String(row.creative ?? ""),
    execution: String(row.execution ?? ""),
    results: String(row.results ?? ""),
    cover: String(row.cover ?? ""),
    gallery: Array.isArray(row.gallery) ? (row.gallery as Project["gallery"]) : [],
    video: row.video ? String(row.video) : null,
    credits: String(row.credits ?? ""),
    links: Array.isArray(row.links) ? (row.links as Project["links"]) : [],
    theme: String(row.theme ?? "#111111"),
    featured: Boolean(row.featured),
    homeOrder: Number(row.home_order ?? 0),
    workOrder: Number(row.work_order ?? 0),
    status: row.status === "draft" ? "draft" : "published",
    seoTitle: String(row.seo_title ?? row.title),
    seoDescription: String(row.seo_description ?? row.summary ?? ""),
  };
}

export async function loadPublishedSite(): Promise<PublishedSite> {
  if (cache) return cache;
  if (!supabaseConfigured || !supabase) {
    cache = fallback;
    return cache;
  }
  try {
    const [projectRes, clientRes, leaderRes, serviceRes] = await Promise.all([
      supabase.from("projects").select("*").eq("status", "published").order("work_order"),
      supabase.from("clients").select("*").eq("visible", true).order("sort_order"),
      supabase.from("leaders").select("*").eq("visible", true).order("sort_order"),
      supabase.from("services").select("*").eq("visible", true).order("sort_order"),
    ]);
    if (projectRes.error || !projectRes.data?.length) {
      cache = fallback;
      return cache;
    }
    const list = projectRes.data.map((row) => mapProject(row as Record<string, unknown>));
    cache = {
      projects: list,
      featured: list.filter((item) => item.featured).sort((a, b) => a.homeOrder - b.homeOrder),
      clients: clientRes.data?.length
        ? clientRes.data.map((row) => ({
            name: row.name,
            logo: row.logo,
            category: row.category,
            website: row.website ?? "",
            slug: row.project_slug,
            visible: row.visible,
            order: row.sort_order,
          }))
        : fallback.clients,
      leaders: leaderRes.data?.length
        ? leaderRes.data.map((row) => ({
            name: row.name,
            title: row.title,
            bio: row.bio ?? "",
            image: row.image ?? "",
            linkedin: row.linkedin ?? "",
            visible: row.visible,
            order: row.sort_order,
          }))
        : fallback.leaders,
      services: serviceRes.data?.length
        ? serviceRes.data.map((row) => ({
            title: row.title,
            summary: row.summary ?? "",
            details: row.details ?? [],
            visible: row.visible,
            order: row.sort_order,
          }))
        : fallback.services,
    };
    return cache;
  } catch {
    cache = fallback;
    return cache;
  }
}

export function seoFor(path: string) {
  return pageSeo.find((item) => item.path === path);
}

export { settings };
