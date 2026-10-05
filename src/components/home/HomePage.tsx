import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  clients,
  featuredProjects,
  leaders,
  services,
  settings,
  type Client,
  type Leader,
  type Project,
  type Service,
} from "@/content/site";
import { canUseWebGL, isCoarsePointer, prefersReducedMotion } from "@/lib/webgl";

const WorkField = lazy(() => import("@/components/three/WorkField"));

const ease = [0.16, 1, 0.3, 1] as const;

function StaticStrip({ projects }: { projects: Project[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {projects.map((project) => (
        <Link key={project.slug} to={`/project/${project.slug}`} className="min-w-[70%] sm:min-w-[42%] lg:min-w-[24%]">
          <img src={project.cover} alt={project.title} className="aspect-[4/5] w-full object-cover" />
          <p className="mt-3 text-sm">{project.title}</p>
        </Link>
      ))}
    </div>
  );
}

function WorkSpace({ projects }: { projects: Project[] }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || isCoarsePointer() || !canUseWebGL()) return;
    const start = () => setEnabled(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 500);
    return () => window.clearTimeout(id);
  }, []);

  if (!enabled) return <StaticStrip projects={projects} />;

  return (
    <div className="relative h-[70vh] min-h-[460px]">
      <Suspense fallback={<StaticStrip projects={projects} />}>
        <WorkField urls={projects.map((project) => project.cover)} />
      </Suspense>
      <p className="pointer-events-none absolute bottom-4 left-0 text-xs uppercase tracking-[0.18em] text-[#a39c90]">
        Move through the work
      </p>
    </div>
  );
}

function Positioning() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node || prefersReducedMotion() || window.innerWidth < 900) return;
    let revert: (() => void) | undefined;
    let cancelled = false;
    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const lines = node.querySelectorAll("[data-line]");
        gsap.set(lines[1], { yPercent: 110 });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.6,
          },
        });
        timeline.to(lines[0], { yPercent: -110, ease: "none" }, 0);
        timeline.to(lines[1], { yPercent: 0, ease: "none" }, 0);
      }, node);
      revert = () => ctx.revert();
    })();
    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section ref={root} className="site-pad flex min-h-[100svh] items-center overflow-hidden">
      <div className="relative w-full">
        <h2 className="display text-[clamp(3.2rem,8vw,8.4rem)]">
          <span data-line className="block">{settings.positioningBefore}</span>
        </h2>
        <h2 className="display absolute inset-x-0 top-0 text-[clamp(3.2rem,8vw,8.4rem)] text-[#ffc700] max-lg:static max-lg:mt-8 max-lg:text-[#f3efe6]">
          <span data-line className="block lg:translate-y-[110%]">{settings.positioningAfter}</span>
        </h2>
      </div>
    </section>
  );
}

function Capabilities({ items }: { items: Service[] }) {
  return (
    <section className="site-pad py-24" id="capabilities">
      <p className="kicker">Capabilities</p>
      <ul className="mt-10">
        {items.filter((item) => item.visible).map((item) => (
          <li key={item.title} className="group border-t border-white/10 py-6 md:grid md:grid-cols-12 md:items-baseline">
            <span className="text-xs text-[#a39c90] md:col-span-1">{String(item.order).padStart(2, "0")}</span>
            <h3 className="mt-2 text-3xl font-semibold tracking-[-0.045em] md:col-span-5 md:mt-0 md:text-5xl">{item.title}</h3>
            <p className="mt-3 text-[#a39c90] md:col-span-6 md:mt-0">{item.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ClientWorld({ items }: { items: Client[] }) {
  return (
    <section className="site-pad py-24" id="clients">
      <div className="mb-10 flex items-end justify-between gap-6">
        <h2 className="display text-[clamp(3rem,7vw,6.5rem)]">Client world</h2>
        <p className="hidden max-w-xs text-sm text-[#a39c90] md:block">Logos with a case study open the work. The rest stay on the table.</p>
      </div>
      <div className="grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-3 lg:grid-cols-5">
        {items.filter((item) => item.visible).map((client) => {
          const inner = (
            <span className="flex aspect-[4/3] items-center justify-center bg-[#101010] p-6">
              <img src={client.logo} alt={client.name} className="max-h-12 w-auto object-contain" />
            </span>
          );
          return client.slug ? (
            <Link key={client.name} to={`/project/${client.slug}`} className="border-b border-r border-white/10">
              {inner}
            </Link>
          ) : (
            <div key={client.name} className="border-b border-r border-white/10">
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Leadership({ people }: { people: Leader[] }) {
  return (
    <section className="site-pad py-24" id="leadership">
      <p className="kicker">Leadership</p>
      <div className="mt-8 grid gap-12 lg:grid-cols-3">
        {people.filter((person) => person.visible).map((person) => (
          <article key={person.name}>
            <img src={person.image} alt={person.name} className="aspect-[3/4] w-full object-cover object-top" />
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.045em]">{person.name}</h3>
            <p className="mt-2 text-sm text-[#ffc700]">{person.title}</p>
            <p className="mt-4 max-w-sm text-[#c8c2b6]">{person.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HomePage({
  work = featuredProjects(),
  serviceList = services,
  clientList = clients,
  people = leaders,
}: {
  work?: Project[];
  serviceList?: Service[];
  clientList?: Client[];
  people?: Leader[];
}) {
  return (
    <main>
      <section className="site-pad flex min-h-[100svh] flex-col justify-end pb-16 pt-28">
        <motion.p
          className="kicker mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          Mumbai
        </motion.p>
        <div className="clip-line">
          <motion.h1
            className="display text-[clamp(4.2rem,13vw,11.5rem)]"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease }}
          >
            {settings.heroHeadline}
          </motion.h1>
        </div>
        <motion.p
          className="mt-6 max-w-xl text-xl text-[#d9d3c7] md:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease }}
        >
          {settings.heroSupport}
        </motion.p>
        <motion.a
          href="#selected"
          className="mt-10 inline-flex w-fit border-b border-[#ffc700] pb-1 text-sm uppercase tracking-[0.16em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {settings.heroCta}
        </motion.a>
      </section>

      <section className="site-pad pb-20" aria-label="Work in space">
        <WorkSpace projects={work} />
      </section>

      <section id="selected" className="site-pad pb-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="display text-[clamp(3rem,7vw,6.5rem)]">Selected work</h2>
          <Link to="/work" className="text-sm uppercase tracking-[0.16em]">Index</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {work.map((project, index) => (
            <Link
              key={project.slug}
              to={`/project/${project.slug}`}
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <div className="overflow-hidden bg-[#111]">
                <img
                  src={project.cover}
                  alt={project.title}
                  className={`w-full object-cover transition duration-700 hover:scale-[1.03] ${index === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{project.title}</h3>
                <p className="text-sm text-[#a39c90]">{project.sector}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Positioning />
      <Capabilities items={serviceList} />
      <ClientWorld items={clientList} />
      <Leadership people={people} />

      <section className="site-pad grid gap-10 py-24 lg:grid-cols-12">
        <h2 className="display text-[clamp(3rem,6vw,5.5rem)] lg:col-span-6">{settings.studioHeading}</h2>
        <p className="text-xl leading-relaxed text-[#d9d3c7] lg:col-span-5 lg:col-start-8">{settings.studioBody}</p>
      </section>

      <section className="site-pad pb-28">
        <p className="kicker">Contact</p>
        <h2 className="display mt-4 max-w-5xl text-[clamp(3.4rem,8vw,7.5rem)] uppercase">{settings.contactHeading}</h2>
        <div className="mt-8 flex flex-wrap gap-6 text-lg">
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
          <a href={settings.phoneHref}>{settings.phone}</a>
          <Link to="/contact" className="border-b border-[#ffc700]">Write to the studio</Link>
        </div>
      </section>
    </main>
  );
}
