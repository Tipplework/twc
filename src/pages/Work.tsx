// twc/src/pages/Work.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import Footer from "@/components/Footer";
import { projectData } from '../lib/projectData';
import { CustomCursor } from '@/components/CustomCursor';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const categories = Array.from(
    new Set(projectData.map((p) => p.category))
  );

  const filteredProjects =
    filter === 'all'
      ? projectData
      : projectData.filter((p) => p.category === filter);

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-10 py-20">
      <Navbar />

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Selected Work
        </h1>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            className={`px-4 py-1 rounded-full border ${
              filter === 'all'
                ? 'bg-white text-black'
                : 'text-white border-white'
            }`}
            onClick={() => setFilter('all')}
          >
            All Work
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1 rounded-full border ${
                filter === cat
                  ? 'bg-white text-black'
                  : 'text-white border-white'
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {filteredProjects.map((project) => (
          <Link key={project.slug} to={`/project/${project.slug}`}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white text-black rounded-xl overflow-hidden transition-all duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{project.title}</h2>
                <p className="text-sm text-gray-700">
                  {project.category}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}
