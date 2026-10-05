import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

export default function PrivacyPolicy() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <CustomCursor />
      <article className="pt-32 pb-20 px-6 md:px-10 max-w-3xl mx-auto">
        <h1 className="twc-heading mb-8">Privacy Policy</h1>
        <p className="mb-4 text-white/70">Effective Date: June 2025</p>
        <p className="twc-body text-white/60 mb-8">
          Tipple Works Co. (“we”, “us”, or “our”) values your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our website or services.
        </p>
        <ul className="list-disc space-y-4 text-white/75 ml-6">
          <li><strong>What we collect:</strong> Contact details, browsing behavior, and submitted inquiries.</li>
          <li><strong>How we use it:</strong> To respond to you, improve services, and provide relevant communication.</li>
          <li><strong>Data Sharing:</strong> Only with trusted tools used to run our business (analytics, forms).</li>
          <li><strong>Security:</strong> Your data is stored securely and used responsibly.</li>
          <li><strong>Your Rights:</strong> You may request access or deletion of your personal info at any time.</li>
        </ul>
        <p className="mt-8 text-white/75">
          For any queries, contact us at <a href="mailto:admin@tippleworks.com" className="underline underline-offset-4">admin@tippleworks.com</a>.
        </p>
      </article>
      <Footer />
    </div>
  );
}
