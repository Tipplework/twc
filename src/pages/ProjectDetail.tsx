import { useParams } from "react-router-dom";
import { projectData } from "../lib/projectData";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectData.find((p) => p.slug === slug);

  if (!project) {
    return <div className="text-center py-20 text-white">Project not found.</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="project-hero"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        <div className="project-hero-overlay" />
        <div className="project-hero-content">
          <p className="project-subhead">{project.category}</p>
          <h1 className="project-title">{project.title}</h1>
        </div>
      </section>

      {/* Project Description */}
      <section className="project-info-section">
        <div className="max-w-4xl space-y-6">
          <p className="project-info-text">{project.description}</p>

          <hr className="border-white/10 my-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-zinc-400">
            <div>
              <span className="font-semibold text-white">Client:</span>{" "}
              {project.title}
            </div>
            <div>
              <span className="font-semibold text-white">Sector:</span>{" "}
              {project.category}
            </div>
            <div>
              <span className="font-semibold text-white">Discipline:</span>{" "}
              Brand Identity, Campaigns, Systems
            </div>
            <div>
              <span className="font-semibold text-white">Year:</span> 2023–2025
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="gallery-scroll">
          {project.gallery.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`${project.title} Image ${i + 1}`}
              className="gallery-image"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            />
          ))}
        </section>
      )}

      <Footer />
    </div>
  );
}
