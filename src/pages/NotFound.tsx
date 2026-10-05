import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found | Tipple Works Co.";
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="bg-black text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      <main className="pt-32 pb-20 px-6 md:px-10">
        <img src="/twc-logo.png" alt="Tipple Works Co." className="w-[200px] max-w-[70vw] h-auto mb-8" />
        <h1 className="twc-h1 mb-4">404</h1>
        <p className="twc-body text-white/60 mb-10">The page you're looking for doesn't exist</p>
        <Link
          to="/"
          className="inline-flex items-center px-8 py-3.5 bg-white text-black rounded-full transition-transform duration-500 hover:scale-[1.02]"
        >
          Return to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
