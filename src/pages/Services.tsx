import { useEffect, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/lib/seo";
import { services as fallback, settings } from "@/content/site";
import { loadPublishedSite } from "@/lib/content";
import type { Service } from "@/content/site";

export default function Services() {
  const [items, setItems] = useState<Service[]>(fallback);

  useEffect(() => {
    loadPublishedSite().then((site) => setItems(site.services));
  }, []);

  return (
    <>
      <Seo
        title="Capabilities | Tipple Works Co."
        description="Brand, campaigns, content, performance, PR, digital, and experiences."
        path="/services"
      />
      <SiteNav />
      <main className="site-pad pb-24 pt-32">
        <p className="kicker">Capabilities</p>
        <h1 className="display mt-4 max-w-4xl text-[clamp(3.4rem,7vw,6.5rem)]">One team. The whole marketing job.</h1>
        <div className="mt-16">
          {items.map((item) => (
            <article key={item.title} className="grid gap-4 border-t border-white/10 py-8 md:grid-cols-12">
              <h2 className="text-3xl font-semibold tracking-[-0.045em] md:col-span-5 md:text-5xl">{item.title}</h2>
              <div className="md:col-span-6 md:col-start-7">
                <p className="text-lg text-[#d9d3c7]">{item.summary}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.14em] text-[#a39c90]">{item.details.join("  /  ")}</p>
              </div>
            </article>
          ))}
        </div>
        <a href={settings.deckUrl} target="_blank" rel="noreferrer" className="mt-12 inline-block border-b border-[#ffc700] pb-1 text-sm uppercase tracking-[0.16em]">
          View the deck
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
