import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/lib/seo";
import { settings } from "@/content/site";

export default function TermsOfService() {
  return (
    <>
      <Seo title="Terms of Service | Tipple Works Co." description="Terms for using the Tipple Works Co. website." path="/terms-of-service" />
      <SiteNav />
      <main className="site-pad max-w-3xl pb-24 pt-32">
        <h1 className="display text-5xl">Terms</h1>
        <p className="mt-4 text-sm text-[#a39c90]">Effective June 2025</p>
        <div className="mt-8 space-y-4 text-lg text-[#d9d3c7]">
          <p>Work shown on this site belongs to Tipple Works Private Limited or to the clients it was made with. Do not reuse it without permission.</p>
          <p>A project engagement is governed by the agreement for that project, not by this page.</p>
          <p>Questions: <a className="text-[#ffc700]" href={`mailto:${settings.adminEmail}`}>{settings.adminEmail}</a>.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
