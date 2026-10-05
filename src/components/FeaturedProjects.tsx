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

function tilt(event: React.MouseEvent<HTMLDivElement>) {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  event.currentTarget.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
}

export const FeaturedProjects = () => {
  const projects = projectData.filter((project) =>
    selectedSlugs.includes(project.slug)
  );

  return (
    <section id="featured" className="w-full bg-white text-black [perspective:1200px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative w-full h-[300px] md:h-[500px] overflow-hidden group transition-transform duration-300 ease-out"
            onMouseMove={tilt}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)";
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
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
