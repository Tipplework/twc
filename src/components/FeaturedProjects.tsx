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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative w-full h-[300px] sm:h-[340px] md:h-[400px] overflow-hidden group"
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Overlay Text */}
            <div className="relative z-20 w-full h-full flex flex-col justify-center items-center text-center text-white px-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg opacity-90 mb-4">
                {project.category}
              </p>
              <Link
                to={`/project/${project.slug}`}
                className="border border-white px-4 py-1.5 text-xs md:text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
