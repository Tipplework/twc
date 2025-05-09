import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

type Service = {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
};

export const Services = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Creative Design",
      description: "Brand identity, packaging design, and innovative spatial experiences that leave a lasting impression.",
      color: "border-tipple-yellow",
      icon: <div className="w-12 h-12 rounded-full bg-tipple-yellow bg-opacity-20 flex items-center justify-center text-2xl">1.</div>
    },
    {
      id: 2,
      title: "Social Media",
      description: "Captivating content creation, strategic planning, and seamless page management across all platforms.",
      color: "border-tipple-red",
      icon: <div className="w-12 h-12 rounded-full bg-tipple-red bg-opacity-20 flex items-center justify-center text-2xl">2.</div>
    },
    {
      id: 3,
      title: "Content Creation",
      description: "High-quality photos, engaging reels, and tailored content that resonates with your audience.",
      color: "border-tipple-purple",
      icon: <div className="w-12 h-12 rounded-full bg-tipple-purple bg-opacity-20 flex items-center justify-center text-2xl">3.</div>
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Performance marketing, e-commerce development, and targeted ads strategies for maximum growth.",
      color: "border-tipple-yellow",
      icon: <div className="w-12 h-12 rounded-full bg-tipple-yellow bg-opacity-20 flex items-center justify-center text-2xl">4.</div>
    },
    {
      id: 5,
      title: "Event Services",
      description: "Captivating stage designs, seamless logistics, and immersive brand experiences for memorable events.",
      color: "border-tipple-red",
      icon: <div className="w-12 h-12 rounded-full bg-tipple-red bg-opacity-20 flex items-center justify-center text-2xl">5.</div>
    },
    {
      id: 6,
      title: "Hospitality Services",
      description: "Brand identities, visual design, and marketing strategies tailored for hospitality businesses.",
      color: "border-tipple-purple",
      icon: <div className="w-12 h-12 rounded-full bg-tipple-purple bg-opacity-20 flex items-center justify-center text-2xl">6.</div>
    }
  ];

  return (
    <section className="py-20 px-6 md:px-10 bg-black" id="services">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8">
          <div className="md:col-span-3 md:col-start-1">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our Services
            </motion.h2>
            
            <motion.p 
              className="text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We offer strategic marketing solutions that drive impact and growth for brands across industries.
            </motion.p>
          </div>
          
          <div className="md:col-span-8 md:col-start-5">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {services.map((service, index) => (
                <motion.div 
                  key={service.id}
                  className={`service-card group p-6 hover:-translate-y-1 ${service.color} transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-zinc-400 mb-6">{service.description}</p>
                  
                  <a href={`/services#${service.id}`} className="flex justify-end">
                    <div className="p-2 rounded-full group-hover:bg-white/10 transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* Colored bar at the bottom */}
        <div className="flex h-1.5 mt-12">
          <div className="flex-1 bg-tipple-yellow"></div>
          <div className="flex-1 bg-tipple-red"></div>
          <div className="flex-1 bg-tipple-purple"></div>
          <div className="flex-1 bg-tipple-yellow"></div>
          <div className="flex-1 bg-tipple-red"></div>
          <div className="flex-1 bg-tipple-purple"></div>
        </div>
      </div>
    </section>
  );
};
