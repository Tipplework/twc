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
    return <div className="text-center py-20">Project not found.</div>;
  }

  const shortDescription = project.description?.slice(0, 160) ?? '';

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Main Hero Section */}
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

        {/* Video Embed */}
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

        {/* Gallery Section */}
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
