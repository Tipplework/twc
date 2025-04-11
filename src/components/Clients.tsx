
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Clients = () => {
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);
  
  // Client data with new logos
  const clientData = [
    // Row 1 - Top tier brands
    { 
      id: 1, 
      name: "SULA Vineyards", 
      image: "/lovable-uploads/1f3b3375-5b9b-4cf2-ba8a-d1bc5e3a203a.png",
      category: "Beverages"
    },
    { 
      id: 2, 
      name: "YORK Winery", 
      image: "/lovable-uploads/0f8c023a-3265-40e5-b918-254a9a1b948a.png",
      category: "Beverages" 
    },
    { 
      id: 3, 
      name: "RASA", 
      image: "/lovable-uploads/d49bc652-d8cb-4cb0-9248-920ffd4ceada.png",
      category: "Restaurants"
    },
    { 
      id: 4, 
      name: "SPACE", 
      image: "/lovable-uploads/c811ded8-6624-4e26-8c62-9e1fb461d271.png",
      category: "Beverages"
    },
    { 
      id: 5, 
      name: "ELAAN", 
      image: "/lovable-uploads/37dfa66f-eed8-4b35-a80f-d7fdb5d4c16f.png",
      category: "Restaurants"
    },
    
    // Row 2 - Featured partnerships
    { 
      id: 6, 
      name: "MATERO", 
      image: "/lovable-uploads/d00b89d1-8228-4501-a953-df6b38da715c.png",
      category: "Food & Beverage" 
    },
    { 
      id: 7, 
      name: "Estate Monkeys", 
      image: "/lovable-uploads/01cc5927-55a8-440c-aebb-ae5d97e0495e.png",
      category: "Real Estate" 
    },
    { 
      id: 8, 
      name: "ShakaCan", 
      image: "/lovable-uploads/f4515253-c44f-4b09-ad8c-45d8a5a212ba.png",
      category: "Food & Beverage" 
    },
    { 
      id: 9, 
      name: "The Source", 
      image: "/lovable-uploads/958b04a5-593d-413d-b00f-3f744e36ba71.png",
      category: "Hospitality" 
    },
    
    // Row 3 - Additional partnerships
    { 
      id: 10, 
      name: "FARMERS AND MIKE", 
      image: "/lovable-uploads/f8dd037d-7f77-40ac-aeb6-a2b7e21288c8.png",
      category: "Food & Beverage" 
    },
    { 
      id: 11, 
      name: "KIDDOPIA", 
      image: "/lovable-uploads/b8e2f36f-0193-4feb-9e85-339d2f7f5c04.png",
      category: "Education" 
    },
    { 
      id: 12, 
      name: "NAAR", 
      image: "/lovable-uploads/dfb366cd-41c2-4366-9b46-9f769a614bad.png",
      category: "Fashion" 
    },
    { 
      id: 13, 
      name: "BBQ NATION", 
      image: "/lovable-uploads/c7f0031d-1d1d-4d10-9973-effe4da21829.png",
      category: "Restaurants" 
    },
    
    // Row 4 - More partnerships
    { 
      id: 14, 
      name: "MOMOLAND", 
      image: "/lovable-uploads/bcab1467-a3c6-4676-86ab-f083cdd37f61.png",
      category: "Food & Beverage" 
    },
    { 
      id: 15, 
      name: "BUNS & SLICES", 
      image: "/lovable-uploads/e2931398-c00a-49cc-8292-c38e955e4797.png",
      category: "Food & Beverage" 
    },
    { 
      id: 16, 
      name: "COPPER GRILLHOUSE", 
      image: "/lovable-uploads/2ed8b729-9006-44b3-9c49-eeb349cf52d9.png",
      category: "Restaurants" 
    },
    { 
      id: 17, 
      name: "BEYOND BY SULA", 
      image: "/lovable-uploads/dc5982e9-00e3-4171-b824-41335512f39e.png",
      category: "Hospitality" 
    },
    
    // Row 5 - Last row of featured clients
    { 
      id: 18, 
      name: "SPRIG", 
      image: "/lovable-uploads/57df3e56-577d-4107-9447-1ec6174de12c.png",
      category: "Health & Wellness" 
    },
    { 
      id: 19, 
      name: "PROVOQUE", 
      image: "/lovable-uploads/1264f900-dda5-4b12-8c00-19b29f188ab5.png",
      category: "Fashion" 
    },
    { 
      id: 20, 
      name: "DSG", 
      image: "/lovable-uploads/25fa32e5-b032-4a6c-b7e5-4b9625233327.png",
      category: "Business" 
    }
  ];

  // Categories for filtering
  const categories = Array.from(new Set(clientData.map(client => client.category)));

  // Animation variants for clients logo grid
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-20 px-6 md:px-10 bg-black border-t border-zinc-900" id="clients">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Our Clients</h2>
          <div className="hidden md:flex space-x-4">
            {/* This could be filter buttons for categories */}
          </div>
        </div>
        
        <div className="mb-16">
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl">We collaborate with innovative brands across various industries, helping them reach new heights with our creative solutions.</p>
        </div>
        
        {/* Creative logo showcase - Main clients */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {clientData.map((client) => (
            <motion.div
              key={client.id}
              className={`relative bg-zinc-900/30 rounded-lg backdrop-blur-sm hover:bg-zinc-800/50 transition-all duration-300 border border-transparent hover:border-white/10 group ${
                hoveredLogo === client.id ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredLogo(client.id)}
              onMouseLeave={() => setHoveredLogo(null)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="aspect-square flex items-center justify-center p-6 overflow-hidden">
                <img 
                  src={client.image} 
                  alt={client.name} 
                  className="w-auto max-h-full object-contain transition-all duration-500 filter group-hover:brightness-125 grayscale group-hover:grayscale-0" 
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm text-white font-medium">{client.name}</p>
                <p className="text-xs text-zinc-400">{client.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <p className="text-xl text-zinc-400 italic">
            ...and many more innovative brands trusting our creative vision
          </p>
          
          {/* Creative visual element */}
          <div className="mt-12 relative">
            <div className="flex justify-center gap-2 opacity-25">
              <div className="w-2 h-2 bg-tipple-yellow rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-tipple-red rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-tipple-purple rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
