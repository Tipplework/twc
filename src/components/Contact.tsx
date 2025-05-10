import { Instagram } from 'lucide-react';

export const Contact = () => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-10 bg-black border-t border-zinc-900 overflow-hidden" id="contact">
      <div className="container mx-auto max-w-screen-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">Let's Create Together</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
              <div className="space-y-4 text-zinc-300">
                <p className="flex items-center">
                  <span className="w-24">Phone:</span>
                  <a href="tel:+919810035669" className="hover-link">+91 9810035669</a>
                </p>
                <p className="flex items-center">
                  <span className="w-24">Email:</span>
                  <a href="mailto:srishti.bhatia@tippeworks.com" className="hover-link">
                    srishti.bhatia@tippeworks.com
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="w-24">Social:</span>
                  <a 
                    href="https://www.instagram.com/tippleworksco/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-full transition-colors inline-flex"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 text-white placeholder-white/70"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 text-white placeholder-white/70"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Message" 
                    rows={4}
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 text-white placeholder-white/70"
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
    </section>
  );
};
