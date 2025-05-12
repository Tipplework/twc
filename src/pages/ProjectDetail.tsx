import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingSocials } from '@/components/FloatingSocials';

const projects = {
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
  const project = projects[slug as keyof typeof projects];

  if (!project) {
    return (
      <div className="text-center py-32">
        <h1 className="text-3xl font-bold">Project not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-white text-black">
      <FloatingSocials />
      <Navbar />
      <main className="px-6 md:px-10 pt-32 pb-20 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">{project.title}</h1>
        <img src={project.image} alt={project.title} className="mb-8 w-full rounded-lg" />
        <p className="text-lg text-gray-700">{project.description}</p>
      </main>
      <Footer />
    </div>
  );
}
