
import { useState } from 'react';
import {
  Briefcase,
  Instagram,
  Video,
  Globe,
  CalendarDays,
  Utensils,
  ChevronDown,
  Brush,
  Camera,
  Package,
  PenTool,
  BarChart2,
  Search,
  Mail,
  Megaphone,
  Building,
  Layout,
  Mic,
  Palette,
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ServiceItem = {
  name: string;
  icon: React.ReactNode;
};

type ServiceCategory = {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  services: ServiceItem[];
};

export const ServicesAccordion = () => {
  const serviceCategories: ServiceCategory[] = [
    {
      id: "creative-design",
      title: "Creative Design",
      icon: <Brush className="h-6 w-6" />,
      description: "Brand identity, packaging design, and innovative spatial experiences that leave a lasting impression.",
      services: [
        { name: "Visual Identity", icon: <Palette className="h-5 w-5" /> },
        { name: "Packaging", icon: <Package className="h-5 w-5" /> },
        { name: "Mascot Development", icon: <PenTool className="h-5 w-5" /> },
        { name: "Spatial & Experience Design", icon: <Building className="h-5 w-5" /> }
      ]
    },
    {
      id: "social-media",
      title: "Social Media",
      icon: <Instagram className="h-6 w-6" />,
      description: "Captivating content creation, strategic planning, and seamless page management across all platforms.",
      services: [
        { name: "Analytics & Performance", icon: <BarChart2 className="h-5 w-5" /> },
        { name: "Page Handling", icon: <Layout className="h-5 w-5" /> },
        { name: "Targeted Strategy", icon: <Megaphone className="h-5 w-5" /> },
        { name: "Community Engagement", icon: <Globe className="h-5 w-5" /> }
      ]
    },
    {
      id: "content-creation",
      title: "Content Creation",
      icon: <Video className="h-6 w-6" />,
      description: "High-quality photos, engaging reels, and tailored content that resonates with your audience.",
      services: [
        { name: "Reels & Video Production", icon: <Video className="h-5 w-5" /> },
        { name: "Grid Planning", icon: <Layout className="h-5 w-5" /> },
        { name: "Campaign Shoots", icon: <Camera className="h-5 w-5" /> },
        { name: "Studio Production", icon: <Mic className="h-5 w-5" /> }
      ]
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      icon: <Globe className="h-6 w-6" />,
      description: "Performance marketing, e-commerce development, and targeted ads strategies for maximum growth.",
      services: [
        { name: "Meta & Google Ads", icon: <Megaphone className="h-5 w-5" /> },
        { name: "SEO & Analytics", icon: <Search className="h-5 w-5" /> },
        { name: "Emailers & Retargeting", icon: <Mail className="h-5 w-5" /> },
        { name: "Website Design", icon: <Monitor className="h-5 w-5" /> }
      ]
    },
    {
      id: "event-services",
      title: "Event Services",
      icon: <CalendarDays className="h-6 w-6" />,
      description: "Captivating stage designs, seamless logistics, and immersive brand experiences for memorable events.",
      services: [
        { name: "Immersive Event Branding", icon: <Briefcase className="h-5 w-5" /> },
        { name: "Fest Activations", icon: <Megaphone className="h-5 w-5" /> },
        { name: "Stage Design & Production", icon: <Palette className="h-5 w-5" /> },
        { name: "Interactive Experiences", icon: <Layout className="h-5 w-5" /> }
      ]
    },
    {
      id: "hospitality-services",
      title: "Hospitality Services",
      icon: <Utensils className="h-6 w-6" />,
      description: "Brand identities, visual design, and marketing strategies tailored for hospitality businesses.",
      services: [
        { name: "Menu Design", icon: <PenTool className="h-5 w-5" /> },
        { name: "Packaging & Product Design", icon: <Package className="h-5 w-5" /> },
        { name: "Marketing Collaterals", icon: <Megaphone className="h-5 w-5" /> },
        { name: "Digital Presence", icon: <Globe className="h-5 w-5" /> }
      ]
    }
  ];

  return (
    <section className="py-20 px-6 md:px-10 bg-white" id="services">
      <div className="container mx-auto">
        <motion.div 
          className="flex gap-2 items-center mb-6 text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-12">
          <div className="md:col-span-5">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our Services
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We offer strategic marketing solutions that drive impact and growth for brands across industries.
            </motion.p>
          </div>
          
          <div className="md:col-span-7">
            <Accordion type="single" collapsible className="w-full">
              {serviceCategories.map((category, index) => (
                <AccordionItem 
                  key={category.id} 
                  value={category.id}
                  className="border-b border-gray-200 py-2"
                >
                  <AccordionTrigger className="hover:no-underline group">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-black group-hover:text-gray-800 transition-colors">
                          {index + 1}. {category.title}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-2 pb-4">
                      <p className="text-gray-600 mb-6">{category.description}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                        {category.services.map((service, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center gap-2 p-3 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <div className="text-gray-600">{service.icon}</div>
                            <span className="text-sm">{service.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        {/* Colored bar */}
        <div className="flex h-1.5 mt-16">
          <div className="flex-1 bg-tipple-yellow"></div>
          <div className="flex-1 bg-tipple-red"></div>
          <div className="flex-1 bg-tipple-purple"></div>
        </div>
      </div>
    </section>
  );
};
