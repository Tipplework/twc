
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Hero = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Rohan Dhirwani",
      role: "Founder",
      image: "/lovable-uploads/8414478a-ac5a-45be-9ea6-718d88674cd6.png"
    },
    {
      name: "Ansh Bhatia",
      role: "Visual Lead & AI Experience",
      image: "/lovable-uploads/9975c594-9b95-46e6-8d57-cfee947f09d0.png"
    },
    {
      name: "Srishti Bhatia",
      role: "Director - Business",
      image: "/lovable-uploads/e8999307-18fa-42c1-a166-2e0e856dd265.png"
    }
  ];

  return (
    <section className="min-h-screen bg-white text-black flex flex-col justify-center relative px-6 md:px-10 py-20">
      <div className="container mx-auto relative z-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 md:col-start-2">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-8 text-black"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let's Create
            </motion.h1>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg md:text-xl">
                +91 9810035669
              </p>
              <p className="text-lg md:text-xl">
                srishti.bhatia@tippeworks.com
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link 
                to="/contact" 
                className="group inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium rounded-none hover:bg-gray-900 transition-all duration-300"
              >
                Start a Project
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Team Members Grid - Pentagram Inspired */}
        <motion.div 
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.name}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + (index * 0.2) }}
            >
              <div className="aspect-square overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-medium text-black">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Social Media Icons - Positioned at bottom */}
      <div className="fixed bottom-12 left-0 right-0 mx-auto w-max flex gap-4 z-40">
        <motion.div className="flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="sr-only">Instagram</span>
            <svg className="h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="sr-only">Twitter</span>
            <svg className="h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="sr-only">LinkedIn</span>
            <svg className="h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </motion.div>
      </div>
      
      {/* Colored bar at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex h-1.5">
        <div className="flex-1 bg-tipple-yellow"></div>
        <div className="flex-1 bg-tipple-red"></div>
        <div className="flex-1 bg-tipple-purple"></div>
      </div>
    </section>
  );
};
