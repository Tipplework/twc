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
            className="relative w-full h-[380px] md:h-[450px] overflow-hidden group"
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50 z-10" />

            <div className="relative z-20 w-full h-full flex flex-col justify-between text-white px-5 py-6">
              {/* Top Left Title + Subheading */}
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold">{project.title}</h3>
                {project.description && (
                  <p className="text-sm md:text-base text-white/80 mt-1">
                    {project.description}
                  </p>
                )}
              </div>

              {/* Bottom Left Tags + View */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs md:text-sm px-3 py-1 border border-white rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/project/${project.slug}`}
                  className="inline-block border border-white px-5 py-1.5 text-xs md:text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
