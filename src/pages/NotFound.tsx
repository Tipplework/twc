import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/lib/seo";

export default function NotFound() {
  const location = useLocation();
  useEffect(() => {
    console.error("Missing route", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Seo title="Page not found | Tipple Works Co." description="This page does not exist." path={location.pathname} noIndex />
      <SiteNav />
      <main className="site-pad flex min-h-[80vh] flex-col justify-end pb-20 pt-32">
        <p className="kicker">404</p>
        <h1 className="display text-[clamp(4rem,12vw,9rem)]">Lost the thread.</h1>
        <Link to="/" className="mt-8 w-fit border-b border-[#ffc700]">Return home</Link>
      </main>
      <SiteFooter />
    </>
  );
}
