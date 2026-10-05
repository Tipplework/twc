import React from "react";
import { projectData } from "../lib/projectData";
import { Link } from "react-router-dom";
import { CircleWipe } from "@/components/brand/CircleWipe";

const selectedSlugs = [
  "sula-fest",
  "provogue",
  "paul-and-mike",
  "sula-vineyards",
  "zomato",
  "forbes-w-power",
];

function nudge(event: React.MouseEvent<HTMLDivElement>, active: boolean) {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const img = event.currentTarget.querySelector("img");
  if (!img) return;
  if (!active) {
    img.style.transform = "translate3d(-5%, -5%, 0) scale(1)";
    return;
  }
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  img.style.transform = `translate3d(calc(-5% + ${x * 1.6}%), calc(-5% + ${y * 1.6}%), 0) scale(1.02)`;
}

export const FeaturedProjects = () => {
  const projects = projectData.filter((project) => selectedSlugs.includes(project.slug));

  return (
    <section id="featured" className="w-full bg-white text-black">
      <div className="px-6 md:px-10 pt-20 md:pt-28 pb-8 md:pb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <h2 className="twc-display">Work</h2>
        <p className="twc-micro text-black/50 pb-2 md:pb-4">Selected Work</p>
      </div>
      <CircleWipe>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 px-2 md:px-3 pb-2">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="relative w-full h-[78vw] sm:h-[48vw] lg:h-[34vw] min-h-[280px] overflow-hidden group"
              onMouseMove={(event) => nudge(event, true)}
              onMouseLeave={(event) => nudge(event, false)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="twc-image absolute inset-0 h-[112%] w-[112%] max-w-none object-cover"
                loading="lazy"
              />
              <Link
                to={`/project/${project.slug}`}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-tipple-red text-white px-6 py-2 text-sm rounded-full tracking-wide z-10 transition-transform duration-500 ease-out hover:scale-[1.02]"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </CircleWipe>
    </section>
  );
};
