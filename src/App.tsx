import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Work from "./pages/Work";
import Services from "./pages/Services";
import Contact from "./pages/Contactinnerpage";
import NotFound from "./pages/NotFound"; // Optional if you have a 404 page

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} /> {/* Optional fallback */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
