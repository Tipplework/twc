import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import projects from '@/data/projects';
import { FloatingSocials } from '@/components/ui/FloatingSocials';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const categories = Array.from(new Set(projects.map(p => p.category)));
  const filteredProjects =
    filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="bg-black text-white min-h-screen px-6 md:px-10 py-20 relative">
      <FloatingSocials />

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Selected Work</h1>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            className={`px-4 py-1 rounded-full border ${
              filter === 'all' ? 'bg-white text-black' : 'text-white border-white'
            }`}
            onClick={() => setFilter('all')}
          >
            All Work
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1 rounded-full border ${
                filter === cat ? 'bg-white text-black' : 'text-white border-white'
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate(`/project/${project.id}`)}
            className="bg-white text-black rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{project.name}</h2>
              <p className="text-sm text-gray-700">{project.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
