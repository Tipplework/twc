// twc/src/pages/ProjectDetail.tsx

import { useParams } from 'react-router-dom';
import { projectData } from '../lib/projectData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectData.find(p => p.slug === slug);

  if (!project) {
    return <div className="text-center py-20">Project not found.</div>;
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <img
          src={project.image}
          alt={project.title}
          className="w-full rounded mb-6"
        />
        <p className="text-lg text-gray-700 mb-4">{project.description}</p>
        {project.role && (
          <div className="flex flex-wrap gap-2 mb-6">
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
        {project.gallery && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Gallery ${i + 1}`}
                className="rounded shadow"
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
