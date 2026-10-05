import { projectData } from "../lib/projectData";
import { Link } from "react-router-dom";

const selectedSlugs = [
  "sula-fest",
  "provogue",
  "paul-and-mike",
  "sula-vineyards",
  "zomato",
  "forbes-w-power",
];

export const FeaturedProjects = () => {
  const projects = projectData.filter((project) => selectedSlugs.includes(project.slug));

  return (
    <section id="featured" className="w-full bg-white text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-3 p-1 md:p-2">
        {projects.map((project) => (
          <div key={project.slug} className="relative w-full h-[300px] md:h-[500px] overflow-hidden group">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              loading="lazy"
            />
            <Link
              to={`/project/${project.slug}`}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#FFA336] text-white px-6 py-2 text-sm rounded-full tracking-wide z-10"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
