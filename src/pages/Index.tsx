import { useEffect, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { HomePage } from "@/components/home/HomePage";
import { Seo, organizationJsonLd } from "@/lib/seo";
import { settings } from "@/content/site";
import { loadPublishedSite, type PublishedSite } from "@/lib/content";

export default function Index() {
  const [site, setSite] = useState<PublishedSite | null>(null);

  useEffect(() => {
    let live = true;
    loadPublishedSite().then((next) => {
      if (live) setSite(next);
    });
    return () => {
      live = false;
    };
  }, []);

  return (
    <>
      <Seo
        title={settings.defaultTitle}
        description={settings.defaultDescription}
        path="/"
        image={settings.defaultOgImage}
        jsonLd={organizationJsonLd}
      />
      <a className="skip-link" href="#selected">Skip to work</a>
      <SiteNav />
      <HomePage
        work={site?.featured}
        serviceList={site?.services}
        clientList={site?.clients}
        people={site?.leaders}
      />
      <SiteFooter />
    </>
  );
}
