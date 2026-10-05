import { FormEvent, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Seo } from "@/lib/seo";
import { settings } from "@/content/site";
import { supabase, supabaseConfigured } from "@/lib/supabase";

export default function Contact() {
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (String(form.get("company") || "")) return;
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const message = String(form.get("message") || "");
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;

    if (supabaseConfigured && supabase) {
      const { error } = await supabase.from("inquiries").insert({ name, email, phone, message });
      if (!error) {
        setStatus("Received. We'll reply from the studio.");
        event.currentTarget.reset();
        return;
      }
    }

    window.location.href = `mailto:${settings.email}?subject=${encodeURIComponent("New project — " + name)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <Seo title="Contact | Tipple Works Co." description="Start a project with Tipple Works Co." path="/contact" />
      <SiteNav />
      <main className="site-pad grid gap-16 pb-24 pt-32 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="kicker">Contact</p>
          <h1 className="display mt-4 text-[clamp(3.2rem,7vw,6.2rem)] uppercase">{settings.contactHeading}</h1>
          <div className="mt-8 space-y-3 text-lg">
            <p><a href={`mailto:${settings.email}`}>{settings.email}</a></p>
            <p><a href={settings.phoneHref}>{settings.phone}</a></p>
            <p>{settings.address}</p>
            <p><a href={settings.instagram}>{settings.instagramHandle}</a></p>
            <p className="text-sm text-[#a39c90]">Careers: <a href={`mailto:${settings.careersEmail}`}>{settings.careersEmail}</a></p>
          </div>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 lg:col-span-5 lg:col-start-8">
          <label className="sr-only" htmlFor="name">Name</label>
          <input id="name" name="name" required placeholder="Name" className="border border-white/15 bg-transparent px-4 py-3" />
          <label className="sr-only" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="Email" className="border border-white/15 bg-transparent px-4 py-3" />
          <label className="sr-only" htmlFor="phone">Phone</label>
          <input id="phone" name="phone" placeholder="Phone" className="border border-white/15 bg-transparent px-4 py-3" />
          <label className="sr-only" htmlFor="message">Message</label>
          <textarea id="message" name="message" required rows={6} placeholder="What are we making?" className="border border-white/15 bg-transparent px-4 py-3" />
          <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <button className="bg-[#ffc700] px-4 py-3 font-semibold text-black" type="submit">Send</button>
          <p className="text-sm text-[#a39c90]">{status || "This opens your email, unless the studio inbox is connected."}</p>
        </form>
      </main>
      <SiteFooter />
    </>
  );
}
