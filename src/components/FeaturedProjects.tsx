import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projectData } from "../lib/projectData";

export const FeaturedProjects = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const topProjects = projectData.slice(0, 5);

  return (
    <section className="py-16 px-4 bg-white text-black overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Selected Work
      </h2>

      <motion.div
        ref={carouselRef}
        className="flex space-x-6 overflow-x-auto px-2 pb-4 no-scrollbar"
        whileTap={{ cursor: "grabbing" }}
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }} // adjust as needed
        dragElastic={0.2}
      >
        {topProjects.map((project) => (
          <Link
            to={`/project/${project.slug}`}
            key={project.slug}
            className="min-w-[280px] sm:min-w-[320px] md:min-w-[400px] flex-shrink-0 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-56 object-cover"
            />
          </Link>
        ))}
      </motion.div>
    </section>
  );
};
