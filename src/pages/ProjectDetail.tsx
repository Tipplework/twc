import { Link, useParams } from "react-router-dom";
import { projectData } from "@/lib/projectData";
import { Navbar } from '@/components/Navbar';
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { CustomCursor } from '@/components/CustomCursor';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectData.find((p) => p.slug === slug);

  const [showFullText, setShowFullText] = useState(false);

  if (!project) {
    return (
      <div className="bg-white text-black min-h-screen">
        <Navbar />
        <main className="px-6 md:px-10 pt-36 pb-24">
          <h1 className="twc-heading">Project not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const shouldShowButton = project.description && project.description.length > 100;
  const next = projectData[(projectData.findIndex((item) => item.slug === project.slug) + 1) % projectData.length];

  return (
    <>
      <Navbar />
      <CustomCursor /> 
      <div className="bg-white text-black">
        <div className="px-6 md:px-10 max-w-[1400px] mx-auto pt-28 md:pt-36 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-end mb-16 md:mb-24">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto"
            />
            <div>
              <p className="twc-micro text-black/45 mb-4">{project.category}</p>
              <h1 className="twc-h1 mb-6">{project.title}</h1>
              <div className="relative">
                <p className="twc-body text-black/70">
                  {showFullText || !shouldShowButton
                    ? project.description
                    : `${project.description.slice(0, 220).trim()}...`}
                </p>

                {shouldShowButton && (
                  <button
                    onClick={() => setShowFullText(!showFullText)}
                    className="mt-6 inline-block bg-tipple-red text-white text-sm py-2 px-5 rounded-full transition-transform duration-500 hover:scale-[1.02]"
                  >
                    {showFullText ? "Read Less" : "Read More"}
                  </button>
                )}

                <div className="mt-4">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: project.title,
                          text: project.description?.slice(0, 150),
                          url: window.location.href,
                        });
                      } else {
                        alert("Sharing not supported in this browser.");
                      }
                    }}
                    className="inline-block border border-black/15 px-4 py-2 text-sm rounded-full text-black/70 hover:text-black transition-colors"
                  >
                    Share this Project
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-10">
                {project.client && (
                  <div>
                    <p className="twc-micro text-black/40 mb-1">Client</p>
                    <p>{project.client}</p>
                  </div>
                )}
                {project.sector && (
                  <div>
                    <p className="twc-micro text-black/40 mb-1">Sector</p>
                    <p>{project.sector}</p>
                  </div>
                )}
                {project.discipline && (
                  <div>
                    <p className="twc-micro text-black/40 mb-1">Discipline</p>
                    <p>{project.discipline}</p>
                  </div>
                )}
                {project.year && (
                  <div>
                    <p className="twc-micro text-black/40 mb-1">Year</p>
                    <p>{project.year}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {project.gallery?.map((img, i) => (
            <div key={i} className="w-full flex justify-center my-12 overflow-hidden">
              <img
                src={img}
                alt={`${project.title} Visual ${i + 1}`}
                className="block w-full max-w-screen-lg h-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      {next && next.slug !== project.slug && (
        <Link to={`/project/${next.slug}`} className="block px-6 md:px-10 max-w-[1120px] mx-auto py-14 border-t border-black/10">
          <p className="twc-micro text-black/45 mb-3">Next</p>
          <p className="twc-h2">{next.title}</p>
        </Link>
      )}
      <Footer />
    </>
  );
}
