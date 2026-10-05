
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
            <h1 className="twc-display mb-6">Let's Create</h1>
            <p className="twc-body text-white/60 mb-14 max-w-xl">Ready to transform your brand? Get in touch with us.</p>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="twc-heading text-[clamp(1.5rem,2.5vw,2rem)] mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mt-1 mr-4 text-tipple-yellow" />
                    <div>
                      <p className="text-lg font-medium">Phone</p>
                      <a href="tel:+919810035669" className="text-zinc-400 hover:text-white transition-colors">
                        +91 9136291606
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
                <h2 className="twc-heading text-[clamp(1.5rem,2.5vw,2rem)] mb-8">Send a Message</h2>
                <form
                  className="space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(event.currentTarget);
                    const name = String(data.get("name") || "");
                    const email = String(data.get("email") || "");
                    const phone = String(data.get("phone") || "");
                    const message = String(data.get("message") || "");
                    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;
                    window.location.href = `mailto:srishti.bhatia@tippeworks.com?subject=${encodeURIComponent("New project — " + name)}&body=${encodeURIComponent(body)}`;
                  }}
                >
                  <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input 
                      name="name"
                      id="name"
                      type="text" 
                      placeholder="Name" 
                      className="w-full bg-transparent border-b border-white/25 py-3 placeholder:text-white/35 focus:outline-none focus:border-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input 
                      name="email"
                      required
                      id="email"
                      type="email" 
                      placeholder="Email" 
                      className="w-full bg-transparent border-b border-white/25 py-3 placeholder:text-white/35 focus:outline-none focus:border-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="sr-only">Phone</label>
                    <input 
                      name="phone"
                      id="phone"
                      type="tel" 
                      placeholder="Phone (optional)" 
                      className="w-full bg-transparent border-b border-white/25 py-3 placeholder:text-white/35 focus:outline-none focus:border-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea 
                      name="message"
                      required
                      id="message"
                      placeholder="Tell us about your project" 
                      rows={5}
                      className="w-full bg-transparent border-b border-white/25 py-3 placeholder:text-white/35 focus:outline-none focus:border-white"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button 
                      type="submit" 
                      className="w-full py-3 px-4 bg-white text-black rounded-full transition-transform duration-500 hover:scale-[1.02]"
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
