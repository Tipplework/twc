import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { fallbackSettings } from "@/lib/cms/fallback";
import { usePage, usePageSeo, useSiteSettings } from "@/lib/cms/usePublic";

export default function TermsOfService() {
  const page = usePage("/terms-of-service");
  const settings = useSiteSettings(fallbackSettings);
  usePageSeo("/terms-of-service");
  const content = page?.content || {};
  const items = Array.isArray(content.items) ? content.items.map(String) : null;
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <CustomCursor />
      <article className="pt-32 pb-20 px-6 md:px-10 max-w-3xl mx-auto">
        <h1 className="twc-heading mb-8">{String(content.heading || "Terms of Service")}</h1>
        <p className="mb-4 text-white/70">{String(content.effective || "Effective Date: June 2025")}</p>
        <p className="twc-body text-white/60 mb-8">
          {String(content.intro || "By using our website or services, you agree to the following terms:")}
        </p>
        <ul className="list-disc space-y-4 text-white/75 ml-6">
          {(items || [
            "Content and visuals on this site are the property of Tipple Works Private Limited.",
            "Service engagements are governed by mutual agreements or project scopes.",
            "We are not liable for external links or third-party actions.",
            "We may change or update these terms at our discretion.",
          ]).map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="mt-8 text-white/75">
          {String(content.closing || "For any concerns, reach out to")} <a href={`mailto:${settings.admin_email}`} className="underline underline-offset-4">{settings.admin_email}</a>.
        </p>
      </article>
      <Footer />
    </div>
  );
}
