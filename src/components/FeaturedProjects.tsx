'use client';
import React from 'react';
import { projectData } from '../lib/projectData';
import { Link } from 'react-router-dom';

export const FeaturedProjects = () => {
  return (
    <section id="featured" className="w-full bg-white text-black">
      {projectData.map((project, index) => (
        <div
          key={index}
          className="relative h-screen w-full flex items-center justify-center overflow-hidden group"
        >
          {/* Fullscreen Background Image */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

          {/* Text Content */}
          <div className="relative z-20 text-white text-center px-6 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h2>
            <p className="text-lg md:text-xl mb-6">{project.category}</p>
            <Link
              to={`/project/${project.slug}`}
              className="inline-block border border-white px-6 py-2 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};
