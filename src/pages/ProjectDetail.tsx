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

  // 🟡 ULTRA-MODERN LAYOUT FOR SULA VINEYARDS
  if (slug === 'sula-vineyards') {
    return (
      <div className="bg-white text-black font-sans scroll-smooth">
        <Navbar />

        {/* Split Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={project.image}
              alt="Sula Vineyards"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              {project.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {project.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 pt-6 border-t">
              <div>
                <span className="font-semibold text-black block mb-1">Client</span>Sula Vineyards
              </div>
              <div>
                <span className="font-semibold text-black block mb-1">Sector</span>Wine, Hospitality
              </div>
              <div>
                <span className="font-semibold text-black block mb-1">Discipline</span>Brand Identity, Campaigns, Systems
              </div>
              <div>
                <span className="font-semibold text-black block mb-1">Year</span>2023–2025
              </div>
            </div>
          </motion.div>
        </section>

        {/* Horizontal Scroll Gallery */}
        {project.gallery && (
          <section className="overflow-x-auto whitespace-nowrap scrollbar-hide px-6 pb-12">
            <div className="flex gap-6 w-max">
              {project.gallery.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt={`Sula Image ${i + 1}`}
                  className="h-[480px] rounded-xl object-cover shadow-lg inline-block"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Embedded Video Section */}
        {project.videoUrl && (
          <section className="max-w-6xl mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="aspect-video rounded-2xl overflow-hidden shadow-xl"
            >
              <iframe
                src={project.videoUrl}
                title="Sula Video"
                className="w-full h-full"
                allowFullScreen
              />
            </motion.div>
          </section>
        )}

        <Footer />
      </div>
    );
  }

  // 🧱 DEFAULT LAYOUT FOR ALL OTHER PROJECTS
  const shortDescription = project.description?.slice(0, 160) ?? '';

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
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
