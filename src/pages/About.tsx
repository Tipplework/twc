import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const About = () => {
  return (
    <>
      <Navbar />

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

      {/* Two-Column Section */}
      <motion.section
        className="bg-[#F5F5F5] text-black py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Philosophy</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Tipple Works Co. is a creative-led marketing agency built for ambitious brands. We’re
              passionate about storytelling, strategy, and design that doesn’t just look good—but
              delivers real results.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">How We Work</h2>
            <p className="text-base md:text-lg leading-relaxed">
              From strategy and identity to campaigns and content—we believe in sharp thinking,
              clean execution, and working as an extension of your team to bring your brand to life.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Team Grid with Designations */}
      <motion.section
        className="bg-white py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Ansh Bhatia */}
            <div className="text-center">
              <div className="w-full aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-md">
                <img
                  src="/lovable-uploads/AnshBhatia.jpeg"
                  alt="Ansh Bhatia"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-lg font-semibold">Ansh Bhatia</p>
              <p className="text-sm text-gray-600">Co-Founder & Creative Head</p>
            </div>

            {/* Rohan Dhirwani */}
            <div className="text-center">
              <div className="w-full aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-md">
                <img
                  src="/lovable-uploads/rohandhirwani.png"
                  alt="Rohan Dhirwani"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-lg font-semibold">Rohan Dhirwani</p>
              <p className="text-sm text-gray-600">Founder & CEO</p>
            </div>

            {/* Srishti Bhatia */}
            <div className="text-center">
              <div className="w-full aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-md">
                <img
                  src="/lovable-uploads/SrishtiBhatia.jpg"
                  alt="Srishti Bhatia"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-lg font-semibold">Srishti Bhatia</p>
              <p className="text-sm text-gray-600">Co-Founder & Business Head</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Mission */}
      <motion.section
        className="bg-[#F5F5F5] py-20 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl shadow-lg">
            <img
              src="/images/mission.jpg"
              alt="Our Mission"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-black">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-base md:text-lg leading-relaxed">
              Our goal is to help brands break through the noise. Whether you're building a new
              identity or scaling what you already have, we’re here to make sure your story is seen,
              heard, and remembered.
            </p>
          </div>
        </div>
      </motion.section>

      {/* CTA: Get in Touch */}
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

      {/* CTA: Join Our Team */}
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
