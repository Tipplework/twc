import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/lib/seo";
import { nextProject, projectBySlug, publishedProjects } from "@/content/site";
import { loadPublishedSite } from "@/lib/content";
import type { Project } from "@/content/site";

const blocks: Array<{ key: keyof Project; label: string }> = [
  { key: "challenge", label: "Challenge" },
  { key: "thinking", label: "Thinking" },
  { key: "strategy", label: "Strategy" },
  { key: "creative", label: "Creative" },
  { key: "execution", label: "Execution" },
  { key: "results", label: "Results" },
];

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const [list, setList] = useState<Project[]>(publishedProjects());

  useEffect(() => {
    loadPublishedSite().then((site) => setList(site.projects));
  }, []);

  const project = projectBySlug(slug, list);
  const next = project ? nextProject(project.slug, list) : undefined;
  const jsonLd = useMemo(() => {
    if (!project) return undefined;
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      creator: "Tipple Works Co.",
      about: project.client,
      dateCreated: project.year,
    };
  }, [project]);

  if (!project || project.status !== "published") {
    return (
      <>
        <SiteNav />
        <main className="site-pad flex min-h-[70vh] flex-col justify-center">
          <h1 className="display text-6xl">Project not found</h1>
          <Link to="/work" className="mt-6 w-fit border-b border-[#ffc700]">Back to work</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Seo
        title={project.seoTitle}
        description={project.seoDescription}
        path={`/project/${project.slug}`}
        image={project.cover}
        jsonLd={jsonLd}
      />
      <SiteNav />
      <main>
        <section className="site-pad grid min-h-[80vh] items-end gap-8 pb-10 pt-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <img src={project.cover} alt="" className="aspect-[4/5] w-full object-cover lg:aspect-[16/10]" />
          </div>
          <div className="lg:col-span-5">
            <p className="kicker">{project.client}</p>
            <h1 className="display mt-3 text-[clamp(3.4rem,6vw,6rem)]">{project.title}</h1>
            <p className="mt-6 text-lg text-[#d9d3c7]">{project.summary}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div><dt className="text-[#a39c90]">Sector</dt><dd>{project.sector}</dd></div>
              <div><dt className="text-[#a39c90]">Year</dt><dd>{project.year}</dd></div>
              <div className="col-span-2"><dt className="text-[#a39c90]">Disciplines</dt><dd>{project.disciplines.join(", ")}</dd></div>
            </dl>
          </div>
        </section>

        {project.introduction && (
          <section className="site-pad grid gap-8 border-t border-white/10 py-16 lg:grid-cols-12">
            <h2 className="kicker lg:col-span-3">Introduction</h2>
            <p className="text-2xl leading-snug tracking-[-0.03em] lg:col-span-8">{project.introduction}</p>
          </section>
        )}

        {blocks.map((block) => {
          const copy = project[block.key];
          if (typeof copy !== "string" || !copy.trim()) return null;
          return (
            <section key={block.key} className="site-pad grid gap-8 border-t border-white/10 py-16 lg:grid-cols-12">
              <h2 className="kicker lg:col-span-3">{block.label}</h2>
              <p className="text-xl leading-relaxed text-[#d9d3c7] lg:col-span-8">{copy}</p>
            </section>
          );
        })}

        {project.video && (
          <section className="site-pad border-t border-white/10 py-16">
            <h2 className="kicker">Film</h2>
            <div className="mt-6 aspect-video">
              <iframe title={`${project.title} film`} src={project.video} className="h-full w-full" allow="autoplay; fullscreen" allowFullScreen />
            </div>
          </section>
        )}

        <section className="site-pad space-y-8 border-t border-white/10 py-16">
          {project.gallery.map((image) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.alt} className="w-full object-cover" loading="lazy" />
              {image.caption && <figcaption className="mt-2 text-sm text-[#a39c90]">{image.caption}</figcaption>}
            </figure>
          ))}
        </section>

        {next && (
          <Link to={`/project/${next.slug}`} className="site-pad block border-t border-white/10 py-16">
            <p className="kicker">Next</p>
            <p className="display mt-3 text-[clamp(3rem,7vw,6rem)]">{next.title}</p>
          </Link>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
