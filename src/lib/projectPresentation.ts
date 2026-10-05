import type { Project } from "@/lib/projectData";

export type GalleryPlate = {
  src: string;
  caption?: string;
};

export type GalleryInput = string | GalleryPlate;

/** Insert the missing space after a sentence end. Wording stays the same. */
export function formatProjectCopy(text: string) {
  return text.replace(/([.!?])(?=[A-Za-z])/g, "$1 ").replace(/[^\S\n]{2,}/g, " ").trim();
}

export function galleryPlates(gallery?: GalleryInput[]): GalleryPlate[] {
  if (!gallery) return [];
  return gallery
    .map((item) => (typeof item === "string" ? { src: item } : { src: item.src, caption: item.caption }))
    .filter((item) => item.src);
}

const DUMMY_VIMEO = new Set([
  "111222333",
  "444555666",
  "777888999",
  "000001",
  "000002",
  "000003",
  "000004",
  "000007",
  "000009",
  "000011",
  "000013",
  "000014",
  "000016",
  "000017",
]);

/**
 * Render a video only when a future CMS explicitly confirms the URL.
 * Placeholder search links and dummy Vimeo ids never play.
 */
export function isUsableVideo(url?: string, confirmed?: boolean) {
  if (!confirmed || !url) return false;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  const host = parsed.hostname.replace(/^www\./, "");
  if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "youtu.be") {
    if (parsed.pathname.startsWith("/results")) return false;
    return host === "youtu.be" ? parsed.pathname.length > 1 : parsed.searchParams.has("v") || parsed.pathname.startsWith("/embed/");
  }
  if (host === "player.vimeo.com") {
    const id = parsed.pathname.split("/").filter(Boolean).pop() || "";
    if (!/^\d{6,}$/.test(id) || /^0+$/.test(id) || DUMMY_VIMEO.has(id)) return false;
    return true;
  }
  return false;
}

export function plateWidth(ratio: number) {
  if (ratio < 0.85) return "max-w-[760px]";
  if (ratio < 1.15) return "max-w-[860px]";
  return "max-w-[1120px]";
}

export type ProjectContent = Project & {
  videoConfirmed?: boolean;
  gallery?: GalleryInput[];
};
