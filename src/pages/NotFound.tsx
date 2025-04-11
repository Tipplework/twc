
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found | Tipple Works Co.";
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="bg-black text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 md:px-10">
        <div className="container mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8">The page you're looking for doesn't exist</p>
          
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-opacity-90 transition-all duration-300"
          >
            Return to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
