import { Link } from "react-router-dom";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/lib/seo";
import { settings } from "@/content/site";

export default function PrivacyPolicy() {
  return (
    <>
      <Seo title="Privacy Policy | Tipple Works Co." description="How Tipple Works Co. handles personal information." path="/privacy-policy" />
      <SiteNav />
      <main className="site-pad max-w-3xl pb-24 pt-32">
        <h1 className="display text-5xl">Privacy</h1>
        <p className="mt-4 text-sm text-[#a39c90]">Effective June 2025</p>
        <div className="mt-8 space-y-4 text-lg text-[#d9d3c7]">
          <p>Tipple Works Co. collects the details you send us — name, email, phone, and the message — so we can reply. If the studio database is connected, that inquiry is stored there. Otherwise it is sent through your own email app and never reaches a server of ours.</p>
          <p>We do not run advertising trackers on this site. Server logs from the host may include a browser and IP address for security.</p>
          <p>To ask for a copy or deletion, write to <a className="text-[#ffc700]" href={`mailto:${settings.adminEmail}`}>{settings.adminEmail}</a>.</p>
        </div>
        <Link to="/" className="mt-10 inline-block text-sm uppercase tracking-[0.16em]">Home</Link>
      </main>
      <SiteFooter />
    </>
  );
}
