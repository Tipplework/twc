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
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Project not found.
      </div>
    );
  }

  // ✅ ULTRA-MODERN LAYOUT FOR SULA VINEYARDS
  if (slug === 'sula-vineyards') {
    return (
      <div className="bg-white text-black font-sans scroll-smooth">
        <Navbar />

        {/* Hero Image with Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-[60vh] overflow-hidden relative"
        >
          <img
            src={project.image}
            alt="Sula Hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-end p-6 sm:p-12">
            <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-md">
              {project.title}
            </h1>
          </div>
        </motion.div>

        {/* Introduction Section */}
        <section className="max-w-5xl mx-auto px-4 py-16 space-y-6">
          <p className="text-xl text-neutral-700 leading-relaxed">
            {project.description}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t text-sm text-gray-600">
            <div>
              <span className="block font-medium text-black">Client</span>
              Sula Vineyards
            </div>
            <div>
              <span className="block font-medium text-black">Sector</span>
              Wine, Hospitality
            </div>
            <div>
              <span className="block font-medium text-black">Discipline</span>
              Brand Identity, Design System, Campaigns
            </div>
            <div>
              <span className="block font-medium text-black">Year</span>
              2023–2025
            </div>
          </div>
        </section>

        {/* Animated Gallery Grid */}
        <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.gallery.map((img, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <img
                src={img}
                alt={`Sula View ${i + 1}`}
                className="rounded-xl shadow-md object-cover hover:scale-[1.01] transition-transform"
              />
            </motion.div>
          ))}
        </section>

        {/* Embedded Video Section */}
        {project.videoUrl && (
          <section className="max-w-5xl mx-auto px-4 py-20">
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
              <iframe
                src={project.videoUrl}
                title="Sula Video"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </section>
        )}

        <Footer />
      </div>
    );
  }

  // ✅ DEFAULT LAYOUT FOR ALL OTHER PROJECTS
  const shortDescription = project.description?.slice(0, 160) ?? '';

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Default Hero Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow-lg"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-gray-700 mb-4">
              {showFullDescription ? project.description : `${shortDescription}...`}
              {project.description && project.description.length > 160 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-500 ml-2 text-sm underline"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                </button>
              )}
            </p>

            {project.role && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.role.map((r, i) => (
                  <span
                    key={i}
                    className="bg-black text-white px-3 py-1 rounded-full text-sm"
                  >
                    {r}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Default Video */}
        {project.videoUrl && (
          <div className="aspect-video max-w-5xl mx-auto">
            <iframe
              src={project.videoUrl}
              title="Project video"
              className="w-full h-full rounded-lg shadow"
              allowFullScreen
            />
          </div>
        )}

        {/* Default Gallery */}
        {project.gallery && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {project.gallery.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Gallery ${i + 1}`}
                className="rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
