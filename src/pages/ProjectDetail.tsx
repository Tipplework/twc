import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

const projects: Record<string, { title: string; image: string; description: string }> = {
  'sula-fest': {
    title: 'SulaFest 2025',
    image: '/lovable-uploads/sulafest.png',
    description: 'Event strategy and activation for one of India’s most iconic vineyard festivals.',
  },
  'forbes-wpower': {
    title: 'W-Power 2025',
    image: '/lovable-uploads/forbes.png',
    description: 'Identity design for Forbes India’s annual women power summit.',
  },
  'zomato': {
    title: 'Zomato',
    image: '/lovable-uploads/zomato.png',
    description: 'Full-funnel campaign activations for India’s biggest food tech company.',
  },
  'paul-and-mike': {
    title: 'Paul & Mike',
    image: '/lovable-uploads/paulandmike.png',
    description: 'Luxury chocolate packaging and story building for this artisanal brand.',
  },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = slug ? projects[slug] : null;

  if (!project) {
    return (
      <div className="text-center mt-32">
        <h1 className="text-2xl font-semibold">Project not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="pt-32 pb-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{project.title}</h1>
          <p className="text-lg text-zinc-700 mb-10">{project.description}</p>
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
