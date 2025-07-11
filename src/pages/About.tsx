import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from '@/components/CustomCursor';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const About = () => {
  return (
    <>
      <Navbar />
      <CustomCursor /> 
      {/* Hero Section */}
      <motion.section
        className="bg-white text-black py-24 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
          We build bold brands with clarity, creativity, and cultural insight.
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
            <h2 className="text-2xl font-semibold mb-3">Our Philosophy</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Tipple Works Co. is a creative-led marketing agency built for ambitious brands. We’re passionate about storytelling, strategy, and design that doesn’t just look good—but delivers real results.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">How We Work</h2>
            <p className="text-base md:text-lg leading-relaxed">
              From strategy and identity to campaigns and content—we believe in sharp thinking, clean execution, and working as an extension of your team to bring your brand to life.
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
        <h2 className="text-4xl md:text-5xl font-bold">Meet the Team!</h2>
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
          {/* Rohan */}
          <div className="relative rounded-xl overflow-hidden group shadow-md">
            <img
              src="/lovable-uploads/rohandhirwani.png"
              alt="Rohan Dhirwani"
              className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur p-4">
              <p className="text-lg font-semibold text-black">Rohan Dhirwani</p>
              <p className="text-sm text-gray-600">Founder & CEO</p>
            </div>
          </div>

          {/* Srishti */}
          <div className="relative rounded-xl overflow-hidden group shadow-md">
            <img
              src="/lovable-uploads/SrishtiBhatia.jpg"
              alt="Srishti Bhatia"
              className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur p-4">
              <p className="text-lg font-semibold text-black">Srishti Bhatia</p>
              <p className="text-sm text-gray-600">Co-Founder & Business Head</p>
            </div>
          </div>

          {/* Ansh */}
          <div className="relative rounded-xl overflow-hidden group shadow-md">
            <img
              src="/lovable-uploads/AnshBhatia.jpeg"
              alt="Ansh Bhatia"
              className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur p-4">
              <p className="text-lg font-semibold text-black">Ansh Bhatia</p>
              <p className="text-sm text-gray-600">Co-Founder & Creative Head</p>
            </div>
          </div>
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let’s build something unforgettable.</h2>
        <p className="text-base md:text-lg mb-8">
          Start your next project with Tipple Works Co. today.
        </p>
        <a
          href="mailto:srishti.bhatia@tippleworks.com"
          className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
        >
          Get in Touch
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Team</h2>
        <p className="text-base md:text-lg mb-8">
          We’re always looking for talented, curious, and driven people to grow with us.
        </p>
        <a
          href="mailto:rohandhirwani@tippleworks.com"
          className="inline-block bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-900 transition"
        >
          Join Us
        </a>
      </motion.section>

      <Footer />
    </>
  );
};

export default About;
