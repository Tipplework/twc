
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section className="py-20 px-6 md:px-10 bg-white" id="about">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="flex gap-2 items-center mb-6 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span>ABOUT @</span>
            <span className="uppercase font-bold">TIPPLEWORKSCO</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Tipple Works Co.
          </motion.h2>
          
          <motion.div 
            className="space-y-6 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg">
              Tipple Works Co. is where strategy meets soul. We build systems, campaigns, and visual stories that not only work but are remembered. We blend data, creativity, and cutting-edge AI tools to bring brands alive — not just as logos, but as experiences.
            </p>
            
            <p className="text-lg">
              At Tipple Works Co., we don't just run campaigns—we build brands, drive growth, and shape the future of 
              businesses. What began as a boutique agency has transformed into a strategic marketing 
              partner for brands across industries, delivering impactful, performance-driven marketing 
              solutions that make a real difference.
            </p>
            
            <p className="text-lg">
              We manage everything that falls within your marketing budget—from brand building and digital 
              growth to performance-driven campaigns that fuel business success. But we're not just about 
              marketing; we embed ourselves in your business strategy, ensuring that every marketing move 
              aligns with your company's vision and growth ambitions.
            </p>
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-black">Marketing That Works. Business That Grows.</h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
