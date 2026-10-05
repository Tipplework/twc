import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from '@/components/CustomCursor';
import { fallbackSettings, fallbackTeam } from "@/lib/cms/fallback";
import { usePage, usePageSeo, useSiteSettings, useTeam } from "@/lib/cms/usePublic";

const fadeInUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const About = () => {
  const page = usePage("/about");
  const settings = useSiteSettings(fallbackSettings);
  const team = useTeam(fallbackTeam);
  usePageSeo("/about");
  const content = page?.content || {};
  const text = (key: string, fallback: string) => String(content[key] || fallback);

  return (
    <>
      <Navbar />
      <CustomCursor /> 
      {/* Hero Section */}
      <motion.section
        className="bg-white text-black text-center pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className="twc-h1 max-w-4xl mx-auto">
          {text("headline", "We build bold brands with clarity, creativity, and cultural insight.")}
        </h1>
      </motion.section>

      {/* Philosophy Section */}
      <motion.section
        className="bg-[#F5F5F5] text-black py-20 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="twc-heading text-[clamp(1.6rem,3vw,2.2rem)] mb-4">{text("philosophy_heading", "Our Philosophy")}</h2>
            <p className="twc-body">
              {text("philosophy", "Tipple Works Co. is a creative-led marketing agency built for ambitious brands. We’re passionate about storytelling, strategy, and design that doesn’t just look good—but delivers real results.")}
            </p>
          </div>
          <div>
            <h2 className="twc-heading text-[clamp(1.6rem,3vw,2.2rem)] mb-4">{text("how_heading", "How We Work")}</h2>
            <p className="twc-body">
              {text("how", "From strategy and identity to campaigns and content—we believe in sharp thinking, clean execution, and working as an extension of your team to bring your brand to life.")}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Team Heading */}
      <motion.section
        className="bg-white text-black text-center pt-10 pb-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="twc-heading">Meet the Team!</h2>
      </motion.section>

      {/* Team Grid */}
      <motion.section
        className="bg-white py-6 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((person) => (
            <div key={person.id} className="relative overflow-hidden group">
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-[460px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-0 left-0 w-full bg-white p-4">
                <p className="text-lg font-semibold text-black">{person.name}</p>
                <p className="text-sm text-gray-600">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Get in Touch CTA */}
      <motion.section
        className="bg-black text-white py-20 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="twc-heading mb-4">{text("cta_heading", "Let’s build something unforgettable.")}</h2>
        <p className="text-base md:text-lg mb-8">
          {text("cta_body", "Start your next project with Tipple Works Co. today.")}
        </p>
        <a
          href={`mailto:${settings.about_email}`}
          className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
        >
          {text("cta_label", "Get in Touch")}
        </a>
      </motion.section>

      {/* Join Our Team CTA */}
      <motion.section
        className="bg-[#F5F5F5] text-black py-20 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="twc-heading mb-4">{text("join_heading", "Join Our Team")}</h2>
        <p className="text-base md:text-lg mb-8">
          {text("join_body", "We’re always looking for talented, curious, and driven people to grow with us.")}
        </p>
        <a
          href={`mailto:${settings.careers_email}`}
          className="inline-block bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-900 transition"
        >
          {text("join_label", "Join Us")}
        </a>
      </motion.section>

      <Footer />
    </>
  );
};

export default About;
