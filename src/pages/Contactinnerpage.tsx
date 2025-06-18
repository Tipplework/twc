
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import Footer from "@/components/Footer";
import { CustomCursor } from '@/components/CustomCursor';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us | Tipple Works Co.";
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 md:px-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Let's Create</h1>
            <p className="text-xl text-zinc-400 mb-12">Ready to transform your brand? Get in touch with us.</p>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mt-1 mr-4 text-tipple-yellow" />
                    <div>
                      <p className="text-lg font-medium">Phone</p>
                      <a href="tel:+919810035669" className="text-zinc-400 hover:text-white transition-colors">
                        +91 9810035669
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mt-1 mr-4 text-tipple-red" />
                    <div>
                      <p className="text-lg font-medium">Email</p>
                      <a href="mailto:srishti.bhatia@tippeworks.com" className="text-zinc-400 hover:text-white transition-colors">
                        srishti.bhatia@tippeworks.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mt-1 mr-4 text-tipple-purple" />
                    <div>
                      <p className="text-lg font-medium">Location</p>
                      <p className="text-zinc-400">
                        Mumbai, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Instagram className="w-5 h-5 mt-1 mr-4 text-zinc-300" />
                    <div>
                      <p className="text-lg font-medium">Social</p>
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        @tippleworksco
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input 
                      id="name"
                      type="text" 
                      placeholder="Name" 
                      className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input 
                      id="email"
                      type="email" 
                      placeholder="Email" 
                      className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="sr-only">Phone</label>
                    <input 
                      id="phone"
                      type="tel" 
                      placeholder="Phone (optional)" 
                      className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea 
                      id="message"
                      placeholder="Tell us about your project" 
                      rows={5}
                      className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      className="w-full py-3 px-4 bg-white text-black font-medium rounded-md hover:bg-opacity-90 transition-all duration-300"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
export default Contact;
