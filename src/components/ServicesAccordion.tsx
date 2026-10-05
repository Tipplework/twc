import {
  Briefcase,
  Instagram,
  Video,
  Globe,
  CalendarDays,
  Utensils,
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
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { getServices } from "@/lib/cms/public";
import { useHomepageSection } from "@/lib/cms/usePublic";
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

const serviceIcons = {
  brush: Brush,
  instagram: Instagram,
  video: Video,
  globe: Globe,
  calendar: CalendarDays,
  utensils: Utensils,
  palette: Palette,
  package: Package,
  pentool: PenTool,
  building: Building,
  chart: BarChart2,
  layout: Layout,
  megaphone: Megaphone,
  camera: Camera,
  mic: Mic,
  search: Search,
  mail: Mail,
  monitor: Monitor,
  briefcase: Briefcase,
};

const serviceIcon = (key: string, className: string) => {
  const Icon = serviceIcons[key as keyof typeof serviceIcons] || Brush;
  return <Icon className={className} />;
};

export const ServicesAccordion = () => {
  const section = useHomepageSection("services");
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([
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
  ]);

  useEffect(() => {
    let live = true;
    getServices().then((rows) => {
      if (!live || !rows?.length) return;
      setServiceCategories(
        rows.map((service) => ({
          id: service.slug,
          title: service.title,
          description: service.description,
          icon: serviceIcon(service.icon_key, "h-6 w-6"),
          services: service.items.map((item) => ({
            name: item.name,
            icon: serviceIcon(item.icon_key, "h-5 w-5"),
          })),
        }))
      );
    });
    return () => {
      live = false;
    };
  }, []);

  if (section && section.visible === false) return null;

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-white" id="services">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="lg:sticky lg:top-28">
              <motion.h2
                className="twc-heading mb-6 text-black"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {section?.heading || "Our Services"}
              </motion.h2>
              <motion.p
                className="twc-body text-black/70 max-w-sm"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 }}
              >
                {section?.body || "We offer strategic marketing solutions that drive impact and growth for brands across industries."}
              </motion.p>
            </div>
          </div>

          <div className="md:col-span-8">
            <Accordion type="single" collapsible className="w-full border-t border-black/10">
              {serviceCategories.map((category, index) => (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className="border-b border-black/10"
                >
                  <AccordionTrigger className="group py-7 md:py-8 hover:no-underline [&>svg]:h-[18px] [&>svg]:w-[18px] [&>svg]:text-black/35 [&>svg]:transition-colors hover:[&>svg]:text-black data-[state=open]:[&>svg]:text-tipple-red">
                    <div className="flex flex-1 items-center gap-4 md:gap-6 text-left min-w-0 pr-4">
                      <span className="twc-micro w-7 shrink-0 text-black/35 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="shrink-0 text-black/40 transition-colors duration-300 group-hover:text-tipple-red group-data-[state=open]:text-tipple-red">
                        {category.icon}
                      </span>
                      <h3 className="text-[1.35rem] md:text-[1.65rem] font-medium tracking-[-0.03em] leading-tight text-black transition-transform duration-300 group-hover:translate-x-1">
                        {category.title}
                      </h3>
                      <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-tipple-red opacity-0 transition-opacity duration-300 group-data-[state=open]:opacity-100" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pb-8 pl-0 md:pl-[4.75rem]">
                      <p className="text-black/60 mb-6 max-w-xl">{category.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                        {category.services.map((service) => (
                          <div key={service.name} className="flex items-center gap-3">
                            <span className="text-black/40">{service.icon}</span>
                            <span className="text-[15px] text-black/80">{service.name}</span>
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
