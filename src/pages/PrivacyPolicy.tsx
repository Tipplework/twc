import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { fallbackSettings } from "@/lib/cms/fallback";
import { usePage, usePageSeo, useSiteSettings } from "@/lib/cms/usePublic";

export default function PrivacyPolicy() {
  const page = usePage("/privacy-policy");
  const settings = useSiteSettings(fallbackSettings);
  usePageSeo("/privacy-policy");
  const content = page?.content || {};
  const items = Array.isArray(content.items) ? content.items.map(String) : null;
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <CustomCursor />
      <article className="pt-32 pb-20 px-6 md:px-10 max-w-3xl mx-auto">
        <h1 className="twc-heading mb-8">{String(content.heading || "Privacy Policy")}</h1>
        <p className="mb-4 text-white/70">{String(content.effective || "Effective Date: June 2025")}</p>
        <p className="twc-body text-white/60 mb-8">
          {String(content.intro || "Tipple Works Co. (“we”, “us”, or “our”) values your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you interact with our website or services.")}
        </p>
        <ul className="list-disc space-y-4 text-white/75 ml-6">
          {(items || [
            "What we collect: Contact details, browsing behavior, and submitted inquiries.",
            "How we use it: To respond to you, improve services, and provide relevant communication.",
            "Data Sharing: Only with trusted tools used to run our business (analytics, forms).",
            "Security: Your data is stored securely and used responsibly.",
            "Your Rights: You may request access or deletion of your personal info at any time.",
          ]).map((item) => {
            const [label, ...rest] = item.split(":");
            return <li key={item}><strong>{label}:</strong>{rest.join(":")}</li>;
          })}
        </ul>
        <p className="mt-8 text-white/75">
          {String(content.closing || "For any queries, contact us at")} <a href={`mailto:${settings.admin_email}`} className="underline underline-offset-4">{settings.admin_email}</a>.
        </p>
      </article>
      <Footer />
    </div>
  );
}
