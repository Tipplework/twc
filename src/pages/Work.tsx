import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/lib/seo";
import { publishedProjects } from "@/content/site";
import { loadPublishedSite } from "@/lib/content";
import type { Project } from "@/content/site";

export default function Work() {
  const [items, setItems] = useState<Project[]>(publishedProjects());
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadPublishedSite().then((site) => setItems(site.projects));
  }, []);

  const sectors = ["All", ...Array.from(new Set(items.map((item) => item.sector)))];
  const visible = filter === "All" ? items : items.filter((item) => item.sector === filter);

  return (
    <>
      <Seo
        title="Selected Work | Tipple Works Co."
        description="Campaigns, identities, and brand systems from Tipple Works Co."
        path="/work"
        image="/work/sula-vineyards-cover.webp"
      />
      <SiteNav />
      <main className="site-pad pb-24 pt-32">
        <p className="kicker">Index</p>
        <h1 className="display mt-4 text-[clamp(4rem,10vw,8.5rem)]">Work</h1>
        <div className="mt-8 flex flex-wrap gap-2">
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setFilter(sector)}
              className={`rounded-full border px-3 py-1 text-sm ${filter === sector ? "border-[#ffc700] text-[#ffc700]" : "border-white/20 text-[#a39c90]"}`}
            >
              {sector}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <Link key={project.slug} to={`/project/${project.slug}`}>
              <img src={project.cover} alt="" className="aspect-[4/5] w-full object-cover" />
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{project.title}</h2>
              <p className="text-sm text-[#a39c90]">{project.client} · {project.year}</p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
