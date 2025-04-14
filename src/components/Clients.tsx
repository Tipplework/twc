
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Clients = () => {
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  
  // Client data with new logos
  const clientData = [
    // Row 1 - Top tier brands
    { 
      id: 1, 
      name: "SULA Vineyards", 
      image: "/lovable-uploads/5408fbd0-c855-46c5-b4dc-ae4b5252431d.png",
      category: "Beverages"
    },
    { 
      id: 2, 
      name: "YORK Winery", 
      image: "/lovable-uploads/e3dd22eb-407e-4098-af8a-9a1f9763da8f.png",
      category: "Beverages" 
    },
    { 
      id: 3, 
      name: "RASA", 
      image: "/lovable-uploads/cb05f2c8-dee5-429f-b303-7fcab94aa530.png",
      category: "Restaurants"
    },
    { 
      id: 4, 
      name: "SPACE", 
      image: "/lovable-uploads/d22f10d9-d5e3-4506-96ab-e87d32c37f71.png",
      category: "Beverages"
    },
    { 
      id: 5, 
      name: "ELAAN", 
      image: "/lovable-uploads/49dfd6d5-5a40-4ba1-b080-34a7a0ed8d00.png",
      category: "Restaurants"
    },
    
    // Row 2 - Featured partnerships
    { 
      id: 6, 
      name: "MATERO", 
      image: "/lovable-uploads/c0e9e3ac-d51a-4c12-81cf-e458eb0e2664.png",
      category: "Food & Beverage" 
    },
    { 
      id: 7, 
      name: "Estate Monkeys", 
      image: "/lovable-uploads/0231f590-ace6-4ce6-9e07-b2c4b379f6b1.png",
      category: "Real Estate" 
    },
    { 
      id: 8, 
      name: "ShakaCan", 
      image: "/lovable-uploads/720f08fe-787e-45a3-8ffd-7c235ff5d8aa.png",
      category: "Food & Beverage" 
    },
    { 
      id: 9, 
      name: "The Source", 
      image: "/lovable-uploads/526b39b7-c3e5-42f9-92ee-145e0dddce99.png",
      category: "Hospitality" 
    },
    
    // Row 3 - Additional partnerships
    { 
      id: 10, 
      name: "FARMERS AND MIKE", 
      image: "/lovable-uploads/b246673d-6bf9-4339-9091-9da121b4de83.png",
      category: "Food & Beverage" 
    },
    { 
      id: 11, 
      name: "KIDDOPIA", 
      image: "/lovable-uploads/5de0c8fc-2168-4598-b582-6d65f001d55f.png",
      category: "Education" 
    },
    { 
      id: 12, 
      name: "NAAR", 
      image: "/lovable-uploads/3c82352b-919d-4df9-b9b9-b425780e5cfb.png",
      category: "Fashion" 
    },
    { 
      id: 13, 
      name: "BBQ NATION", 
      image: "/lovable-uploads/64878f2c-fc9e-46f9-9944-b6c3ad06bb79.png",
      category: "Restaurants" 
    },
    
    // Row 4 - More partnerships
    { 
      id: 14, 
      name: "MOMOLAND", 
      image: "/lovable-uploads/967f7f59-47b4-46fb-8867-2a57e12f4bc0.png",
      category: "Food & Beverage" 
    },
    { 
      id: 15, 
      name: "BUNS & SLICES", 
      image: "/lovable-uploads/eb7e8ed5-eba1-4e3f-a8e5-69f08e9656f5.png",
      category: "Food & Beverage" 
    },
    { 
      id: 16, 
      name: "COPPER GRILLHOUSE", 
      image: "/lovable-uploads/2221dfaf-39fe-4883-9240-2e7193e36385.png",
      category: "Restaurants" 
    },
    { 
      id: 17, 
      name: "BEYOND BY SULA", 
      image: "/lovable-uploads/37b7ee37-f9c1-48f0-86aa-67d8263b7df8.png",
      category: "Hospitality" 
    },
    
    // Row 5 - Last row of featured clients
    { 
      id: 18, 
      name: "SPRIG", 
      image: "/lovable-uploads/bc381b7c-b452-41ea-9f62-8ace06f7bbe5.png",
      category: "Health & Wellness" 
    },
    { 
      id: 19, 
      name: "PROVOQUE", 
      image: "/lovable-uploads/959b4b1a-1841-4d59-a367-6c83e6e8952d.png",
      category: "Fashion" 
    },
    { 
      id: 20, 
      name: "DSG", 
      image: "/lovable-uploads/d8e77c41-59c5-4b13-a24b-e665a3caa146.png",
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
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  // Filter clients based on selected category
  const filteredClients = filter === 'all' 
    ? clientData 
    : clientData.filter(client => client.category === filter);

  return (
    <section className="py-20 px-6 md:px-10 bg-white" id="clients">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8">
          <div className="md:col-span-3 md:col-start-1">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Clients
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We collaborate with innovative brands across various industries, helping them reach new heights with our creative solutions.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-2 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-all duration-300`}
              >
                All
              </button>
              {categories.map((category, index) => (
                <button 
                  key={index}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-1 rounded-full text-sm ${filter === category ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-all duration-300`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
          
          <div className="md:col-span-8 md:col-start-5">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {filteredClients.map((client) => (
                <motion.div
                  key={client.id}
                  className={`relative bg-white rounded-lg transition-all duration-300 border border-gray-100 hover:border-black overflow-hidden ${
                    hoveredLogo === client.id ? 'scale-105 shadow-md' : 'scale-100'
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
                      className={`w-auto h-auto max-h-full object-contain transition-all duration-500 ${hoveredLogo === client.id ? 'filter-none' : 'grayscale opacity-60'}`}
                    />
                  </div>
                  <div className={`absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${hoveredLogo === client.id ? 'opacity-100' : 'opacity-0'}`}>
                    <div>
                      <p className="text-sm text-white font-medium">{client.name}</p>
                      <p className="text-xs text-white/80">{client.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
