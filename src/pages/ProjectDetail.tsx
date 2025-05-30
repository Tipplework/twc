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

  // 🔥 CUSTOM DESIGNER LAYOUT FOR COLLIER AWARD
  if (slug === 'collier-award') {
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
              src="/case/collier-award-hero.jpg"
              alt="Collier Award Hero"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Project Text */}
          <div className="max-w-5xl mx-auto mt-16 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Peter F. Collier Award
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              A typographic and industrial award design commissioned by New York University — symbolizing truth, permanence, and design clarity in journalism.
            </p>
          </div>

          {/* Meta Info */}
          <div className="grid md:grid-cols-2 gap-12 mt-20 max-w-6xl mx-auto">
            <div className="space-y-4 text-base text-gray-700 leading-relaxed">
              <p>
                The form evokes a gold-leafed book, sandblasted and milled to perfection. 
                The award is both sculptural and symbolic — standing upright in support of ethical journalism.
              </p>
            </div>
            <div className="text-sm text-gray-500 space-y-1 border-t md:border-t-0 md:border-l pl-0 md:pl-6 border-gray-200 pt-6 md:pt-0">
              <div><span className="font-semibold text-black">Client:</span> New York University</div>
              <div><span className="font-semibold text-black">Sector:</span> Education</div>
              <div><span className="font-semibold text-black">Discipline:</span> Industrial & Product Design</div>
              <div><span className="font-semibold text-black">Team:</span> Tipple Works Co, Daniel Ford</div>
              <div><span className="font-semibold text-black">Year:</span> 2025</div>
            </div>
          </div>

          {/* Gallery */}
          <div className="grid md:grid-cols-3 gap-6 mt-24 max-w-6xl mx-auto">
            {['1', '2', '3'].map((img, i) => (
              <motion.img
                key={i}
                src={`/case/collier-award-${img}.jpg`}
                alt={`Collier View ${img}`}
                className="rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-300"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </main>
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
