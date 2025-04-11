
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { ArrowUpRight, Instagram, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: "SULA Vineyards",
    category: "Brand Identity & Packaging",
    image: "/lovable-uploads/1f3b3375-5b9b-4cf2-ba8a-d1bc5e3a203a.png",
    fullWidth: true,
    description: "Complete brand refresh for India's premier winery"
  },
  {
    id: 2,
    title: "YORK Winery",
    category: "Brand Design & Social Media",
    image: "/lovable-uploads/0f8c023a-3265-40e5-b918-254a9a1b948a.png",
    fullWidth: false,
    description: "Digital-first approach for a boutique vineyard"
  },
  {
    id: 3,
    title: "RASA",
    category: "Brand Identity & Packaging",
    image: "/lovable-uploads/d49bc652-d8cb-4cb0-9248-920ffd4ceada.png",
    fullWidth: false,
    description: "Typography-led identity for a fine dining establishment"
  },
  {
    id: 4,
    title: "ShakaCan",
    category: "Brand Design",
    image: "/lovable-uploads/f4515253-c44f-4b09-ad8c-45d8a5a212ba.png",
    fullWidth: false,
    description: "Bold typographic approach for a contemporary brand"
  },
  {
    id: 5,
    title: "SPACE Coffee",
    category: "Product Design",
    image: "/lovable-uploads/c811ded8-6624-4e26-8c62-9e1fb461d271.png",
    fullWidth: true,
    description: "Minimalist design system for a premium coffee brand"
  },
  {
    id: 6,
    title: "The Source at Sula",
    category: "Brand Identity",
    image: "/lovable-uploads/958b04a5-593d-413d-b00f-3f744e36ba71.png",
    fullWidth: false,
    description: "Integrated destination branding for a winery restaurant"
  },
  {
    id: 7,
    title: "MATERO",
    category: "Brand Identity & Packaging",
    image: "/lovable-uploads/d00b89d1-8228-4501-a953-df6b38da715c.png",
    fullWidth: false,
    description: "Bold typographic identity for a modern restaurant"
  },
  {
    id: 8,
    title: "Estate Monkeys",
    category: "Brand Identity & Digital",
    image: "/lovable-uploads/01cc5927-55a8-440c-aebb-ae5d97e0495e.png",
    fullWidth: false,
    description: "Distinctive character design for real estate innovation"
  }
];

// Additional featured clients for the showcase section
const additionalClients = [
  { 
    name: "Farmers and Mike", 
    image: "/lovable-uploads/f8dd037d-7f77-40ac-aeb6-a2b7e21288c8.png",
    category: "Farm to Bar"
  },
  { 
    name: "Kiddopia", 
    image: "/lovable-uploads/b8e2f36f-0193-4feb-9e85-339d2f7f5c04.png",
    category: "Educational App"
  },
  { 
    name: "NAAR", 
    image: "/lovable-uploads/dfb366cd-41c2-4366-9b46-9f769a614bad.png",
    category: "Fashion"
  },
  { 
    name: "BBQ Nation", 
    image: "/lovable-uploads/c7f0031d-1d1d-4d10-9973-effe4da21829.png",
    category: "Restaurant Chain"
  },
  { 
    name: "Momoland", 
    image: "/lovable-uploads/bcab1467-a3c6-4676-86ab-f083cdd37f61.png",
    category: "Food Chain"
  },
  { 
    name: "Buns & Slices", 
    image: "/lovable-uploads/e2931398-c00a-49cc-8292-c38e955e4797.png",
    category: "Burger Joint"
  }
];

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  useEffect(() => {
    document.title = "Our Work | Tipple Works Co.";
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-40">
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-[#ffb13d] via-[#dd3e6d] to-[#9e49dd] p-0.5 rounded-xl"
        >
          <div className="bg-black p-2 rounded-lg">
            <Instagram size={20} className="text-white" />
          </div>
        </a>
        <div className="bg-[#ffff00] p-3 rounded-xl flex items-center justify-center w-10 h-10">
          <div className="w-4 h-4 border-2 border-black rounded-full"></div>
        </div>
      </div>
      
      <main className="pt-32 pb-20">
        <header className="px-6 md:px-10 mb-20">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex gap-2 items-center mb-2 text-gray-400"
            >
              <span>PROJECTS @</span>
              <span className="uppercase font-bold">TIPLEWORKSCO</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col md:flex-row md:items-end gap-4 md:gap-20"
            >
              <h1 className="text-6xl md:text-8xl font-bold">Work</h1>
              <p className="text-xl text-zinc-400 pb-2">in spotlight</p>
            </motion.div>
          </div>
        </header>
        
        <div className="px-6 md:px-10 mb-20">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full border ${filter === 'all' ? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'} transition-all duration-300`}
              >
                All Work
              </button>
              <button 
                onClick={() => setFilter('Brand Identity')}
                className={`px-6 py-2 rounded-full border ${filter === 'Brand Identity' ? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'} transition-all duration-300`}
              >
                Brand Identity
              </button>
              <button 
                onClick={() => setFilter('Digital')}
                className={`px-6 py-2 rounded-full border ${filter === 'Digital' ? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'} transition-all duration-300`}
              >
                Digital
              </button>
              <button 
                onClick={() => setFilter('Packaging')}
                className={`px-6 py-2 rounded-full border ${filter === 'Packaging' ? 'bg-white text-black border-white' : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'} transition-all duration-300`}
              >
                Packaging
              </button>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="container mx-auto px-6 md:px-10">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {projectsData.map((project) => (
                <motion.div 
                  key={project.id} 
                  className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-500 ${project.fullWidth ? 'md:col-span-2' : ''}`}
                  onClick={() => setSelectedProject(project.id === selectedProject ? null : project.id)}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="aspect-video bg-neutral-800 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover filter saturate-50 group-hover:saturate-100 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
                    <div className="transform group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-zinc-400">{project.category}</p>
                      <p className="text-sm mt-2 max-w-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Plus className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Gradient overlay at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </div>
        
        {/* Additional clients showcase */}
        <div className="container mx-auto px-6 md:px-10 mt-32">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">More Brand Partners</h2>
            <p className="text-zinc-400">A selection of additional brands we've worked with</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {additionalClients.map((client, index) => (
              <motion.div 
                key={index}
                className="bg-zinc-900/30 rounded-lg p-6 flex items-center justify-center aspect-square hover:bg-zinc-800/50 transition-all duration-300 border border-transparent hover:border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={client.image} 
                  alt={client.name}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="container mx-auto px-6 md:px-10">
          <motion.div 
            className="mt-24 text-center relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-24 h-24 rounded-full border border-zinc-800 flex items-center justify-center mx-auto mb-10 group hover:border-white transition-colors duration-300">
              <Plus className="w-8 h-8 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <p className="text-xl text-zinc-400">Want to see more of our work?</p>
            <p className="text-lg mt-2">
              <a href="mailto:srishti.bhatia@tippeworks.com" className="hover-link">
                Get in touch for a detailed portfolio
              </a>
            </p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Work;
