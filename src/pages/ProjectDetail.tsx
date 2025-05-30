import { useParams } from 'react-router-dom';
import { projectData } from '../lib/projectData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectData.find(p => p.slug === slug);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!project) {
    return <div className="bg-black text-white min-h-screen flex items-center justify-center">Project not found.</div>;
  }

  // ✨ CUSTOM LAYOUT for SULA VINEYARDS
  if (slug === 'sula-vineyards') {
    return (
      <div className="bg-white text-black min-h-screen font-sans">
        <Navbar />
        <main className="pt-28 pb-32 px-4 md:px-16">
          {/* Full Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="overflow-hidden rounded-2xl shadow-xl"
          >
            <img
              src={project.image}
              alt="Sula Vineyards"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Project Text */}
          <div className="max-w-5xl mx-auto mt-16 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Sula Vineyards
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Brand world design for one of India’s most iconic vineyards — uniting architecture, packaging, hospitality and experience into a cohesive identity.
            </p>
          </div>

          {/* Meta Info */}
          <div className="grid md:grid-cols-2 gap-12 mt-20 max-w-6xl mx-auto">
            <div className="space-y-4 text-base text-gray-700 leading-relaxed">
              <p>
                From logo applications across property signages to wine labels, event campaigns, and even resort experiences — the Sula brand language was developed with warmth, earthiness, and celebration at its core.
              </p>
            </div>
            <div className="text-sm text-gray-500 space-y-1 border-t md:border-t-0 md:border-l pl-0 md:pl-6 border-gray-200 pt-6 md:pt-0">
              <div><span className="font-semibold text-black">Client:</span> Sula Vineyards</div>
              <div><span className="font-semibold text-black">Sector:</span> Wine, Hosp
