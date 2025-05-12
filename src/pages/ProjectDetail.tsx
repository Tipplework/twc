import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';

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
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects[slug ?? ''];

  if (!project) return <div className="text-center mt-20">Project not found.</div>;

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <main className="pt-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
          <img src={project.image} alt={project.title} className="mb-8 rounded-xl w-full object-cover" />
          <p className="text-lg leading-relaxed">{project.description}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
