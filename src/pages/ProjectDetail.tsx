import { Link, useParams } from "react-router-dom";
import { projectData } from "@/lib/projectData";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import {
  formatProjectCopy,
  galleryPlates,
  isUsableVideo,
  plateWidth,
  type GalleryPlate,
} from "@/lib/projectPresentation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const COLLAPSED_LINES = 6;

function ProjectHero({ src, alt }: { src: string; alt: string }) {
  const [ratio, setRatio] = useState<number | null>(null);
  const tall = ratio !== null && ratio < 0.85;

  return (
    <img
      src={src}
      alt={alt}
      onLoad={(event) => {
        const img = event.currentTarget;
        if (img.naturalHeight) setRatio(img.naturalWidth / img.naturalHeight);
      }}
      className={
        tall
          ? "project-fade mx-auto h-auto w-auto max-h-[680px] max-w-full object-contain"
          : "project-fade mx-auto h-auto w-full max-h-[680px] object-contain"
      }
    />
  );
}

function ProjectCopy({ text }: { text: string }) {
  const copy = formatProjectCopy(text);
  const ref = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);
  const [collapsedHeight, setCollapsedHeight] = useState(0);
  const [needsToggle, setNeedsToggle] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const line = parseFloat(getComputedStyle(el).lineHeight) || 28;
      const collapsed = line * COLLAPSED_LINES;
      const previous = el.style.maxHeight;
      el.style.maxHeight = "none";
      const full = el.scrollHeight;
      el.style.maxHeight = previous;
      setCollapsedHeight(collapsed);
      setFullHeight(full);
      setNeedsToggle(full > collapsed + 4);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [copy]);

  return (
    <div>
      <p
        ref={ref}
        className="twc-body text-black/70"
        style={
          needsToggle
            ? {
                maxHeight: open ? fullHeight : collapsedHeight,
                overflow: "hidden",
                transition: "max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
              }
            : undefined
        }
      >
        {copy}
      </p>
      {needsToggle && (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mt-6 inline-block bg-tipple-red text-white text-sm py-2 px-5 rounded-full transition-colors duration-300 hover:bg-[#e43700]"
        >
          {open ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}

function ShareProject({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-block border border-black/15 px-4 py-2 text-sm rounded-full text-black/55 hover:text-black transition-colors"
    >
      {copied ? "Link copied" : "Share this Project"}
    </button>
  );
}

function GalleryImage({ plate, alt }: { plate: GalleryPlate; alt: string }) {
  const [ratio, setRatio] = useState<number | null>(null);

  return (
    <figure className={`mx-auto w-full ${ratio ? plateWidth(ratio) : "max-w-[1120px]"}`}>
      <img
        src={plate.src}
        alt={alt}
        loading="lazy"
        onLoad={(event) => {
          const img = event.currentTarget;
          if (img.naturalHeight) setRatio(img.naturalWidth / img.naturalHeight);
        }}
        className={`h-auto w-full object-contain transition-opacity duration-700 ${ratio ? "opacity-100" : "opacity-0"}`}
      />
      {plate.caption ? <figcaption className="twc-micro mt-4 text-black/45">{plate.caption}</figcaption> : null}
    </figure>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectData.find((item) => item.slug === slug);
  const next = project
    ? projectData[(projectData.findIndex((item) => item.slug === project.slug) + 1) % projectData.length]
    : undefined;

  if (!project) {
    return (
      <div className="bg-white text-black min-h-screen">
        <Navbar />
        <CustomCursor />
        <main className="px-6 md:px-10 pt-36 pb-24">
          <h1 className="twc-heading">Project not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const plates = galleryPlates(project.gallery);
  const showVideo = isUsableVideo(project.videoUrl, project.videoConfirmed);
  const facts = [
    { label: "Client", value: project.client },
    { label: "Sector", value: project.sector },
    { label: "Discipline", value: project.discipline },
    { label: "Year", value: project.year },
  ];

  return (
    <div className="bg-white text-black">
      <Navbar />
      <CustomCursor />
      <article className="px-6 md:px-10 max-w-[1400px] mx-auto pt-28 md:pt-36 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 md:items-center">
          <ProjectHero src={project.image} alt={project.title} />
          <div className="min-w-0 project-fade">
            <p className="twc-micro text-black/45 mb-4">{project.category}</p>
            <h1 className="twc-h1 mb-6 [text-wrap:balance]">{project.title}</h1>
            {project.description && (
              <ProjectCopy key={project.slug} text={project.description} />
            )}
            <div className="mt-4">
              <ShareProject key={project.slug} title={project.title} />
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 mt-10">
              {facts.map((fact) => (
                <div key={fact.label} className="min-w-0">
                  <dt className="twc-micro text-black/40 mb-1">{fact.label}</dt>
                  <dd className="text-black break-words">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {showVideo && (
          <div className="mx-auto mt-20 max-w-[1120px] aspect-video">
            <iframe
              src={project.videoUrl}
              title={project.title}
              className="h-full w-full"
              allow="fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {plates.length > 0 && (
          <div className="mt-20 md:mt-28 border-t border-black/10 pt-16 md:pt-24 space-y-20 md:space-y-28">
            {plates.map((plate, index) => (
              <GalleryImage key={`${plate.src}-${index}`} plate={plate} alt={`${project.title} ${index + 1}`} />
            ))}
          </div>
        )}
      </article>

      {next && next.slug !== project.slug && (
        <div className="px-6 md:px-10">
          <Link
            to={`/project/${next.slug}`}
            className="group mx-auto flex max-w-[1400px] items-center gap-6 border-t border-black/10 py-12 md:py-16"
          >
            <img
              src={next.image}
              alt=""
              className="h-16 w-24 shrink-0 object-contain"
            />
            <span className="min-w-0">
              <span className="twc-micro block text-black/45 mb-2">Next project</span>
              <span className="twc-h2 block transition-opacity duration-300 group-hover:opacity-55">{next.title}</span>
            </span>
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
}
