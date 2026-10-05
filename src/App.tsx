import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ProjectDetail from "./pages/ProjectDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Work from "./pages/Work";
import Services from "./pages/Services";
import Contact from "./pages/Contactinnerpage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { lazy, Suspense } from "react";

const AdminApp = lazy(() => import("./admin/AdminApp"));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop /> 
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<p className="p-8">Opening studio…</p>}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
