// twc/src/components/FeaturedProjects.tsx

import { Link } from 'react-router-dom';
import { projectData } from '../lib/projectData';

export const FeaturedProjects = () => {
  const topProjects = projectData.slice(0, 5); // Adjust count as needed

  return (
    <section className="py-16 px-4 bg-white text-black">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Selected Work
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topProjects.map((project) => (
          <Link
            key={project.slug}
            to={`/project/${project.slug}`}
            className="block overflow-hidden rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover aspect-video"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
