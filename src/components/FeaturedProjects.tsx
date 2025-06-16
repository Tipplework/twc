'use client';
import React from 'react';
import { projectData } from '../lib/projectData';
import { Link } from 'react-router-dom';

const selectedSlugs = [
  'sula-fest',
  'provogue',
  'paul-and-mike',
  'sula-vineyards',
  'zomato',
  'forbes-w-power',
];

export const FeaturedProjects = () => {
  const projects = projectData.filter((project) =>
    selectedSlugs.includes(project.slug)
  );

  return (
    <section id="featured" className="w-full bg-white text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative w-full h-[300px] md:h-[500px] overflow-hidden group"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Orange Curved View Button */}
            <Link
              to={`/project/${project.slug}`}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#FFA336] text-white px-6 py-2 text-sm rounded-full tracking-wide shadow-md hover:scale-105 transition-transform duration-300 z-10"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
