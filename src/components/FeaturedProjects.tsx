import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projectData } from "@/lib/projectData";

export const FeaturedProjects = () => {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Selected Work
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projectData.slice(0, 5).map((project) => (
          <Link key={project.slug} to={`/project/${project.slug}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-full overflow-hidden rounded-lg shadow-lg cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover aspect-video"
                loading="lazy"
              />
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};
