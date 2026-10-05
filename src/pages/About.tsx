import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/lib/seo";
import { leaders as fallbackLeaders, settings } from "@/content/site";
import { loadPublishedSite } from "@/lib/content";
import type { Leader } from "@/content/site";

export default function About() {
  const [people, setPeople] = useState<Leader[]>(fallbackLeaders);

  useEffect(() => {
    loadPublishedSite().then((site) => setPeople(site.leaders));
  }, []);

  return (
    <>
      <Seo
        title="About | Tipple Works Co."
        description="The people and the way of working behind Tipple Works Co."
        path="/about"
      />
      <SiteNav />
      <main>
        <section className="site-pad pb-16 pt-32">
          <p className="kicker">About</p>
          <h1 className="display mt-4 max-w-5xl text-[clamp(3.4rem,7vw,6.8rem)]">
            We build brands from inside the work, not from a pitch deck.
          </h1>
        </section>
        <section className="site-pad grid gap-10 border-t border-white/10 py-16 lg:grid-cols-2">
          <div>
            <h2 className="text-sm uppercase tracking-[0.16em] text-[#a39c90]">Philosophy</h2>
            <p className="mt-4 text-2xl leading-snug">{settings.studioBody}</p>
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-[0.16em] text-[#a39c90]">How the work runs</h2>
            <p className="mt-4 text-xl leading-relaxed text-[#d9d3c7]">
              Strategy, identity, campaigns, content, and the things that have to exist in a room. One team, sitting with the brand instead of orbiting it.
            </p>
          </div>
        </section>
        <section className="site-pad grid gap-12 py-8 lg:grid-cols-3">
          {people.map((person) => (
            <article key={person.name}>
              <img src={person.image} alt={person.name} className="aspect-[3/4] w-full object-cover object-top" />
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{person.name}</h2>
              <p className="mt-2 text-sm text-[#ffc700]">{person.title}</p>
              <p className="mt-3 text-[#c8c2b6]">{person.bio}</p>
            </article>
          ))}
        </section>
        <section className="site-pad grid gap-6 py-20 md:grid-cols-2">
          <a href={`mailto:${settings.email}`} className="border border-white/15 p-8">
            <p className="kicker">New work</p>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Start a project</p>
          </a>
          <a href={`mailto:${settings.careersEmail}`} className="border border-white/15 p-8">
            <p className="kicker">Studio</p>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Join the team</p>
          </a>
        </section>
        <p className="site-pad pb-16 text-sm text-[#a39c90]">
          Prefer the long version of what we do? <Link to="/services" className="text-[#f3efe6] underline">Capabilities</Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
