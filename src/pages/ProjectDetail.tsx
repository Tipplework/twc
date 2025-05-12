import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const projectContent = {
  "sulafest-2025": {
    title: "SulaFest 2025",
    subtitle: "Event Strategy & Activation",
    description: "A vibrant celebration of music, wine, and experiences at India’s most iconic vineyard.",
    image: "/lovable-uploads/sulafest.png"
  },
  "forbes-wpower": {
    title: "W-Power 2025",
    subtitle: "Event Identity",
    description: "Empowering India’s leading women entrepreneurs through visual identity and event design.",
    image: "/lovable-uploads/forbes.png"
  },
  "zomato-campaign": {
    title: "Zomato",
    subtitle: "Campaign Activations",
    description: "National food discovery campaign launch with strong visual storytelling and engagement strategy.",
    image: "/lovable-uploads/zomato.png"
  }
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectContent[slug as keyof typeof projectContent];

  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title} | Tipple Works Co.`;
    }
  }, [project]);

  if (!project) {
    return <div className="text-center mt-20 text-lg">Project not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black py-20 px-6 md:px-10">
      <img src={project.image} alt={project.title} className="w-full max-w-5xl mx-auto rounded-xl mb-12" />
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <h2 className="text-xl text-gray-600 mb-8">{project.subtitle}</h2>
      <p className="max-w-3xl text-lg leading-relaxed">{project.description}</p>
    </div>
  );
}
