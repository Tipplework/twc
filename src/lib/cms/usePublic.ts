import { useEffect, useState } from "react";
import { projectData, type Project } from "@/lib/projectData";
import {
  getClients,
  getFeaturedProjects,
  getHomepageSections,
  getNavLinks,
  getPage,
  getPageSeo,
  getPreviewProject,
  getProjects,
  getServices,
  getSiteSettings,
  getTeam,
  getTestimonials,
  type CmsClient,
  type CmsNavLink,
  type CmsPage,
  type CmsSection,
  type CmsSeo,
  type CmsService,
  type CmsTeamMember,
  type CmsTestimonial,
  type SiteSettings,
} from "@/lib/cms/public";

function useAsync<T>(load: () => Promise<T | null | undefined>) {
  const [value, setValue] = useState<T | null>(null);
  useEffect(() => {
    let live = true;
    load().then((next) => {
      if (live && next) setValue(next);
    });
    return () => {
      live = false;
    };
  }, [load]);
  return value;
}

export function useProjects(fallback: Project[] = projectData) {
  const [projects, setProjects] = useState(fallback);
  useEffect(() => {
    let live = true;
    getProjects().then((rows) => {
      if (live && rows?.length) setProjects(rows);
    });
    return () => {
      live = false;
    };
  }, []);
  return projects;
}

export function useFeaturedProjects() {
  const local = projectData.filter((project) =>
    ["sula-fest", "provogue", "paul-and-mike", "sula-vineyards", "zomato", "forbes-w-power"].includes(project.slug)
  );
  const [projects, setProjects] = useState(local);
  useEffect(() => {
    let live = true;
    getFeaturedProjects().then((rows) => {
      if (live && rows?.length) setProjects(rows);
    });
    return () => {
      live = false;
    };
  }, []);
  return projects;
}

export function useProject(slug: string | undefined, preview: boolean) {
  const local = projectData.find((item) => item.slug === slug);
  const localNext = local
    ? projectData[(projectData.findIndex((item) => item.slug === local.slug) + 1) % projectData.length]
    : undefined;
  const [project, setProject] = useState(local);
  const [next, setNext] = useState(localNext);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let live = true;
    setProject(projectData.find((item) => item.slug === slug));
    setMissing(false);
    (async () => {
      if (preview && slug) {
        const draft = await getPreviewProject(slug);
        if (!live) return;
        if (draft) setProject(draft);
      }
      const rows = await getProjects();
      if (!live || !rows) return;
      const published = rows.find((item) => item.slug === slug);
      if (!preview && !published) setMissing(true);
      if (!preview && published) setProject(published);
      const index = rows.findIndex((item) => item.slug === (published?.slug || slug));
      if (index >= 0) setNext(rows[(index + 1) % rows.length]);
    })();
    return () => {
      live = false;
    };
  }, [slug, preview]);

  return { project, next, missing };
}

export function useClients<T extends { id: string | number; name: string; image: string; category: string; slug?: string | null }>(fallback: T[]) {
  return (useAsync(getClients) as unknown as T[] | null) ?? fallback;
}

export function useTestimonials(fallback: CmsTestimonial[]) {
  return useAsync(getTestimonials) ?? fallback;
}

export function useServices() {
  const [services, setServices] = useState<CmsService[] | null>(null);
  useEffect(() => {
    let live = true;
    getServices().then((rows) => {
      if (live && rows?.length) setServices(rows);
    });
    return () => {
      live = false;
    };
  }, []);
  return services;
}

export function useTeam(fallback: CmsTeamMember[]) {
  return useAsync(getTeam) ?? fallback;
}

export function useSiteSettings(fallback: SiteSettings) {
  return useAsync(getSiteSettings) ?? fallback;
}

export function useNav(placement: "header" | "footer" | "legal", fallback: CmsNavLink[]) {
  const [links, setLinks] = useState(fallback);
  useEffect(() => {
    let live = true;
    getNavLinks(placement).then((rows) => {
      if (live && rows?.length) setLinks(rows);
    });
    return () => {
      live = false;
    };
  }, [placement]);
  return links;
}

export function usePage(path: string): CmsPage | null {
  const [page, setPage] = useState<CmsPage | null>(null);
  useEffect(() => {
    let live = true;
    getPage(path).then((row) => {
      if (live && row) setPage(row);
    });
    return () => {
      live = false;
    };
  }, [path]);
  return page;
}

export function useHomepageSection(key: string): CmsSection | null {
  const [section, setSection] = useState<CmsSection | null>(null);
  useEffect(() => {
    let live = true;
    getHomepageSections().then((rows) => {
      const match = rows?.find((item) => item.section_key === key) || null;
      if (live && match) setSection(match);
    });
    return () => {
      live = false;
    };
  }, [key]);
  return section;
}

export function usePageSeo(path: string) {
  const [seo, setSeo] = useState<CmsSeo | null>(null);
  useEffect(() => {
    let live = true;
    getPageSeo(path).then((row) => {
      if (!live || !row) return;
      setSeo(row);
      if (row.title) document.title = row.title;
      setMeta("description", row.description);
      setMeta("og:title", row.title, true);
      setMeta("og:description", row.description, true);
      if (row.og_image) setMeta("og:image", row.og_image, true);
      if (row.canonical) {
        let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!link) {
          link = document.createElement("link");
          link.rel = "canonical";
          document.head.appendChild(link);
        }
        link.href = row.canonical;
      }
      setMeta("robots", row.indexable ? "index,follow" : "noindex,nofollow");
    });
    return () => {
      live = false;
    };
  }, [path]);
  return seo;
}

function setMeta(name: string, content: string | null, property = false) {
  if (!content) return;
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    if (property) tag.setAttribute("property", name);
    else tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.content = content;
}
