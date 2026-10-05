import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

export default function TermsOfService() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <CustomCursor />
      <article className="pt-32 pb-20 px-6 md:px-10 max-w-3xl mx-auto">
        <h1 className="twc-heading mb-8">Terms of Service</h1>
        <p className="mb-4 text-white/70">Effective Date: June 2025</p>
        <p className="twc-body text-white/60 mb-8">
          By using our website or services, you agree to the following terms:
        </p>
        <ul className="list-disc space-y-4 text-white/75 ml-6">
          <li>Content and visuals on this site are the property of Tipple Works Private Limited.</li>
          <li>Service engagements are governed by mutual agreements or project scopes.</li>
          <li>We are not liable for external links or third-party actions.</li>
          <li>We may change or update these terms at our discretion.</li>
        </ul>
        <p className="mt-8 text-white/75">
          For any concerns, reach out to <a href="mailto:admin@tippleworks.com" className="underline underline-offset-4">admin@tippleworks.com</a>.
        </p>
      </article>
      <Footer />
    </div>
  );
}
