
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { ArrowUpRight } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: "SULA Vineyards",
    category: "Brand Identity & Packaging",
    image: "/lovable-uploads/b6fed313-87ea-465d-b759-68775fc17809.png"
  },
  {
    id: 2,
    title: "Estate Monkeys",
    category: "Brand Design & Social Media",
    image: "/lovable-uploads/f99330e1-a20a-4e9f-bba0-495d93a93776.png"
  },
  {
    id: 3,
    title: "Matero",
    category: "Brand Identity & Packaging",
    image: "/lovable-uploads/f7f985b7-ba33-4c6c-b690-0298a796a336.png"
  },
  {
    id: 4,
    title: "Shaka Can",
    category: "Brand Design",
    image: "/lovable-uploads/fc373324-94ad-499a-a254-05b6bd6988af.png"
  },
  {
    id: 5,
    title: "Space Coffee",
    category: "Product Design",
    image: "/lovable-uploads/dbb0fa30-3a2d-4b38-8c82-9f8864152a6c.png"
  },
  {
    id: 6,
    title: "The Source at Sula",
    category: "Brand Identity",
    image: "/lovable-uploads/49cb6ca5-df1b-4552-bc62-bae892696195.png"
  }
];

const Work = () => {
  useEffect(() => {
    document.title = "Our Work | Tipple Works Co.";
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 md:px-10">
        <div className="container mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Work</h1>
          <p className="text-lg text-zinc-400 max-w-2xl mb-12">
            Selected projects showcasing our expertise in creating exceptional brand experiences.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-lg cursor-pointer">
                <div className="aspect-[4/3] bg-zinc-900">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-contain object-center p-6 bg-neutral-800"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-zinc-400">{project.category}</p>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-xl text-zinc-400">Want to see more of our work?</p>
            <p className="text-lg mt-2">
              <a href="mailto:srishti.bhatia@tippeworks.com" className="hover-link">
                Get in touch for a detailed portfolio
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Work;
