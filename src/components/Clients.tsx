import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // ✅ import Link

export const Clients = () => {
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const clientData = [
    { id: 1, name: "Sula Vineyards", image: "/lovable-uploads/SULA.png", category: "Alco-Bev", slug: "sula-vineyards" },
    { id: 2, name: "YORK WINERY", image: "/lovable-uploads/YORK.png", category: "Alco-Bev", slug: "york-winery" },
    { id: 3, name: "Rasa", image: "/lovable-uploads/RASA.png", category: "Alco-Bev", slug: "rasa" },
    { id: 4, name: "SPACE", image: "/lovable-uploads/space.png", category: "F&B", slug: "space" },
    { id: 5, name: "ELAAN", image: "/lovable-uploads/elaan.png", category: "Alco-Bev", slug: "elaan" },
    { id: 6, name: "MATERO", image: "/lovable-uploads/matero.png", category: "F&B", slug: "matero" },
    { id: 7, name: "Estate Monkeys", image: "/lovable-uploads/estatemonkey.png", category: "F&B", slug: "estate-monkeys" },
    { id: 8, name: "ShakaCan", image: "/lovable-uploads/shakacan.png", category: "Alco-Bev", slug: "shakacan" },
    { id: 9, name: "The Source", image: "/lovable-uploads/thesource.png", category: "Alco-Bev", slug: "the-source" },
    { id: 10, name: "Paul & Mike", image: "/lovable-uploads/paulandmike.png", category: "F&B", slug: "paul-and-mike" },
    { id: 11, name: "KIDDOPIA", image: "/lovable-uploads/kiddopia.png", category: "Lifestyle", slug: "kiddopia" },
    { id: 12, name: "NAAR", image: "/lovable-uploads/Naar.png", category: "Hospitality", slug: "naar" },
    { id: 13, name: "British Brewing Co", image: "/lovable-uploads/Britishbrewingcompany.png", category: "Hospitality", slug: "british-brewing-co" },
    { id: 14, name: "MOMOLAND", image: "/lovable-uploads/momoland.png", category: "Hospitality", slug: "momoland" },
    { id: 15, name: "Buns & Slices", image: "/lovable-uploads/bunsandslices.png", category: "Hospitality", slug: "buns-and-slices" },
    { id: 16, name: "COPPER Grillhouse", image: "/lovable-uploads/coppergrillhouse.png", category: "Hospitality", slug: "copper-grillhouse" },
    { id: 17, name: "BEYOND BY SULA", image: "/lovable-uploads/Beyond.png", category: "Hospitality", slug: "beyond-by-sula" },
    { id: 18, name: "SPRIG", image: "/lovable-uploads/sprig.png", category: "F&B", slug: "sprig" },
    { id: 19, name: "provogue", image: "/lovable-uploads/provogue.png", category: "Lifestyle", slug: "provogue" },
    { id: 20, name: "DSG", image: "/lovable-uploads/DSG.png", category: "Event IP's", slug: "DSG" },
    { id: 21, name: "Zealo", image: "/lovable-uploads/ZEALO.png", category: "F&B", slug: "Zealo" },
    { id: 22, name: "VLIV", image: "/lovable-uploads/VLIV.png", category: "Hospitality", slug: "VLIV" },
    { id: 23, name: "SULAFEST", image: "/lovable-uploads/SULAFEST.png", category: "Event IP's", slug: "SULAFEST" },
    { id: 24, name: "FORBES", image: "/lovable-uploads/FORBES.png", category: "Event IP's", slug: "SULAFEST" }
    ];

  const categories = Array.from(new Set(clientData.map(c => c.category.trim())));

  const filteredClients =
    filter === 'all'
      ? clientData
      : clientData.filter(c => c.category.trim().toLowerCase() === filter.toLowerCase());

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

  return (
    <section className="py-20 px-6 md:px-10 bg-white" id="clients">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8">
          {/* Sidebar */}
          <div className="md:col-span-3 md:col-start-1">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              Our Clients
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We collaborate with innovative brands across various industries, helping them reach new heights with our creative solutions.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-1 rounded-full text-sm ${
                  filter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } transition-all duration-300`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-1 rounded-full text-sm ${
                    filter === category ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } transition-all duration-300`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Logo Grid */}
          <div className="md:col-span-8 md:col-start-5">
            {filteredClients.length === 0 ? (
              <p className="text-gray-500">No clients found in this category.</p>
            ) : (
              <motion.div
                key={filter}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {filteredClients.map((client) => (
                  <Link to={`/project/${client.slug}`} key={client.id}>
                    <motion.div
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
                          className={`w-auto h-auto max-h-full object-contain transition-all duration-500 ${
                            hoveredLogo === client.id ? 'filter-none' : 'grayscale opacity-60'
                          }`}
                        />
                      </div>
                      <div
                        className={`absolute inset-0 flex items-end p-3 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                          hoveredLogo === client.id ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <div>
                          <p className="text-sm text-white font-medium">{client.name}</p>
                          <p className="text-xs text-white/80">{client.category}</p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
