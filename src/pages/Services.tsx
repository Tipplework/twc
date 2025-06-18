import React from "react";
import { motion } from "framer-motion";
import { ShareButton } from "@/components/ShareButton"; // Reuse from ProjectDetail
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const Services = () => {
  return (
    <>
      <Navbar />

      <section className="bg-black text-white min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-6">
        <img
          src="/lovable-uploads/TWC-LOGO.png"
          alt="Tipple Works Co."
          className="h-10 md:h-12 mb-6"
        />

        <h1 className="text-3xl md:text-5xl font-bold text-center">
          tipple works co.
        </h1>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ShareButton
            url="https://example.com/tippleworks-deck.pdf" // Replace with your actual deck link
            label="View Our Deck"
            variant="light"
          />
        </motion.div>

        {/* Optional: yellow dot like homepage */}
        <span className="absolute bottom-16 right-16 w-5 h-5 rounded-full bg-yellow-400 animate-pulse"></span>
      </section>

      <Footer />
    </>
  );
};

export default Services;
