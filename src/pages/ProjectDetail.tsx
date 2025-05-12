import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const projects: Record<string, {
  title: string;
  image: string;
  description: string;
}> = {
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
  'provogue': {
    title: 'Provogue',
    image: '/lovable-uploads/provogue.png',
    description: 'Brand activation for iconic fashion & lifestyle label.',
  },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projects[slug] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-black p-10">
        <Navbar />
        <h1 className="text-3xl font-bold">Project Not Found</h1>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-5xl font-bold mb-6">{project.title}</h1>
        <img src={project.image} alt={project.title} className="w-full h-auto mb-8 rounded" />
        <p className="text-lg text-gray-700">{project.description}</p>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
