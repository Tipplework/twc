// twc/src/pages/ProjectDetail.tsx

import { useParams } from 'react-router-dom';
import { projectData } from '../lib/projectData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useState } from 'react';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectData.find((p) => p.slug === slug);
  const [showFullText, setShowFullText] = useState(false);

  if (!project) {
    return <div className="text-center py-20">Project not found.</div>;
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Project Title */}
        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

        {/* Video if exists */}
        {project.videoUrl && (
          <div className="w-full aspect-video mb-10">
            <iframe
              src={project.videoUrl}
              title={project.title}
              className="w-full h-full rounded"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="text-lg text-gray-700 leading-relaxed mb-10 transition-all duration-300">
            <p className={`${showFullText ? 'line-clamp-none' : 'line-clamp-3'}`}>
              {project.description}
            </p>
            <button
              className="mt-2 text-sm text-black underline"
              onClick={() => setShowFullText(!showFullText)}
            >
              {showFullText ? 'Show Less' : 'Read More'}
            </button>
          </div>
        )}

        {/* Role tags */}
        {project.category && (
          <div className="mb-10">
            <span className="bg-black text-white px-4 py-2 rounded-full text-sm">
              {project.category}
            </span>
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {project.gallery.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full rounded shadow-md hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
