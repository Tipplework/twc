import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cmsConfigured, supabase } from "@/lib/cms/client";
import { db, type Profile } from "@/admin/api";
import { Button, Field, fieldClass } from "@/admin/ui";
import { ProjectEditor, ProjectList } from "@/admin/ProjectScreen";
import {
  AuditAdmin,
  Dashboard,
  FeaturedAdmin,
  HomepageAdmin,
  MediaAdmin,
  NavAdmin,
  PageAdmin,
  RecordList,
  SeoAdmin,
  ServicesAdmin,
  SettingsAdmin,
  UsersAdmin,
} from "@/admin/screens";

const nav = [
  ["Overview", [["/admin", "Dashboard"]]],
  ["Website", [["/admin/homepage", "Homepage"], ["/admin/about", "About"], ["/admin/services", "Services"], ["/admin/contact", "Contact"]]],
  ["Work", [["/admin/projects", "Projects"], ["/admin/featured", "Featured Work"], ["/admin/clients", "Clients"]]],
  ["Social proof", [["/admin/testimonials", "Testimonials"]]],
  ["People", [["/admin/team", "Leadership / Team"]]],
  ["Media", [["/admin/media", "Website Images"], ["/admin/media/projects", "Project Media"], ["/admin/media/team", "Team Images"]]],
  ["SEO", [["/admin/seo", "Pages"], ["/admin/seo/global", "Global SEO"]]],
  ["Settings", [["/admin/settings/contact", "Contact Details"], ["/admin/settings/social", "Social Links"], ["/admin/settings/navigation", "Navigation"], ["/admin/settings/footer", "Footer"]]],
  ["System", [["/admin/users", "Users & Roles"], ["/admin/audit", "Audit Log"]]],
] as const;

function Setup() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] px-6 py-16 text-[#161616]">
      <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Tipple Works</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Admin is waiting for its own database</h1>
      <div className="mt-6 max-w-2xl space-y-3 text-base leading-7">
        <p>Create a new Supabase project used only by Tipple Works Co. Do not reuse the Sula database, the HOST database, or project ref ymfwejugtpzawklrlpss.</p>
        <p>Then add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to the Vercel preview environment. Do not add the service-role key. Do not change production variables.</p>
        <p>Apply, in order, <code>supabase/migrations/20261006120000_twc_cms.sql</code> and <code>supabase/migrations/20261006120100_twc_cms_seed.sql</code>.</p>
        <p>Create the first user in Supabase Authentication. The signup trigger creates a viewer profile. Promote that user once:</p>
        <pre className="overflow-auto rounded-md bg-white p-3 text-sm">{`update public.profiles
set role = 'super_admin', active = true
where email = 'you@tippleworks.com';`}</pre>
      </div>
    </main>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="grid min-h-screen place-items-center bg-[#f4f1ea] px-6">
      <form
        className="w-full max-w-sm space-y-3 rounded-lg border border-black/10 bg-white p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          const { error: signInError } = await db().auth.signInWithPassword({ email, password });
          if (signInError) setError(signInError.message);
        }}
      >
        <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Tipple Works</p>
        <h1 className="text-2xl font-semibold tracking-[-0.03em]">Sign in</h1>
        <Field label="Email"><input className={fieldClass} type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} /></Field>
        <Field label="Password"><input className={fieldClass} type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></Field>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <Button type="submit">Sign in</Button>
      </form>
    </main>
  );
}

function Screen({ profile, path, search, openProject }: { profile: Profile; path: string; search: string; openProject: (id: string) => void }) {
  const projectEdit = path.match(/^\/admin\/projects\/([^/]+)$/);
  if (path === "/admin") return <Dashboard />;
  if (path === "/admin/homepage") return <HomepageAdmin profile={profile} />;
  if (path === "/admin/about") return <PageAdmin profile={profile} path="/about" title="About" keys={["headline", "philosophy_heading", "philosophy", "how_heading", "how", "cta_heading", "cta_body", "cta_label", "join_heading", "join_body", "join_label"]} />;
  if (path === "/admin/services") return <ServicesAdmin profile={profile} />;
  if (path === "/admin/contact") return <SettingsAdmin profile={profile} title="Contact" fields={["phone", "phone_href", "email", "about_email", "careers_email", "admin_email", "address"]} />;
  if (path === "/admin/projects") return <ProjectList profile={profile} open={openProject} />;
  if (projectEdit) return <ProjectEditor id={projectEdit[1]} profile={profile} back={() => openProject("")} />;
  if (path === "/admin/featured") return <FeaturedAdmin profile={profile} />;
  if (path === "/admin/clients") return <RecordList profile={profile} title="Clients" table="clients" fields={["name", "category", "project_slug", "website_url", "sort_order", "visible"]} select="*, logo:assets!clients_logo_asset_id_fkey(public_url)" />;
  if (path === "/admin/testimonials") return <RecordList profile={profile} title="Testimonials" table="testimonials" fields={["quote", "author", "position", "company", "sort_order", "visible"]} />;
  if (path === "/admin/team") return <RecordList profile={profile} title="Leadership" table="team_members" fields={["name", "role", "bio", "linkedin", "sort_order", "visible"]} select="*, image:assets!team_members_image_asset_id_fkey(public_url)" />;
  if (path === "/admin/media") return <MediaAdmin profile={profile} folder={new URLSearchParams(search).get("folder") || undefined} />;
  if (path === "/admin/media/projects") return <MediaAdmin profile={profile} folder="projects" />;
  if (path === "/admin/media/team") return <MediaAdmin profile={profile} folder="team" />;
  if (path === "/admin/seo") return <SeoAdmin profile={profile} />;
  if (path === "/admin/seo/global") return <SeoAdmin profile={profile} global />;
  if (path === "/admin/settings/contact") return <SettingsAdmin profile={profile} title="Contact details" fields={["phone", "phone_href", "email", "about_email", "careers_email", "admin_email", "address"]} />;
  if (path === "/admin/settings/social") return <SettingsAdmin profile={profile} title="Social links" fields={["instagram", "instagram_handle", "instagram_floating", "instagram_contact", "linkedin", "linkedin_floating"]} />;
  if (path === "/admin/settings/navigation") return <NavAdmin profile={profile} placement="header" title="Navigation" />;
  if (path === "/admin/settings/footer") return (
    <div className="space-y-8">
      <SettingsAdmin profile={profile} title="Footer" fields={["footer_copy", "copyright"]} />
      <NavAdmin profile={profile} placement="footer" title="Footer links" />
      <NavAdmin profile={profile} placement="legal" title="Legal links" />
    </div>
  );
  if (path === "/admin/users") return <UsersAdmin profile={profile} />;
  if (path === "/admin/audit") return <AuditAdmin />;
  return <Dashboard />;
}

function Shell({ profile, onSignOut }: { profile: Profile; onSignOut: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.replace(/\/$/, "") || "/admin";

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#161616] md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-black/10 bg-white md:min-h-screen md:border-b-0 md:border-r">
        <div className="px-4 py-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500">Tipple Works</p>
          <p className="mt-1 text-sm font-medium">Operations</p>
          <p className="text-xs text-neutral-500">{profile.role.replace("_", " ")}</p>
        </div>
        <nav className="px-3 pb-6">
          {nav.map(([group, items]) => (
            <div key={group} className="mb-4">
              <p className="px-2 text-[10px] uppercase tracking-[0.16em] text-neutral-400">{group}</p>
              {items.map(([href, label]) => {
                if (href === "/admin/users" && profile.role !== "super_admin") return null;
                const active = path === href || (href === "/admin/projects" && path.startsWith("/admin/projects"));
                return (
                  <button key={href} onClick={() => navigate(href)} className={`mt-1 block w-full rounded-md px-2 py-1.5 text-left text-sm ${active ? "bg-black text-white" : "hover:bg-black/5"}`}>
                    {label}
                  </button>
                );
              })}
            </div>
          ))}
          <button onClick={onSignOut} className="mt-4 px-2 text-sm text-neutral-500">Sign out</button>
        </nav>
      </aside>
      <main className="px-4 py-6 md:px-8">
        {profile.role === "viewer" && <p className="mb-4 rounded-md bg-white px-3 py-2 text-sm">Read only. You can look through the desk, not change it.</p>}
        <Screen
          profile={profile}
          path={path}
          search={location.search}
          openProject={(id) => navigate(id ? `/admin/projects/${id}` : "/admin/projects")}
        />
      </main>
    </div>
  );
}

export default function AdminApp() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!supabase) return;
    let live = true;
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) {
        if (live) {
          setProfile(null);
          setReady(true);
        }
        return;
      }
      const { data: row } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (!live) return;
      if (!row?.active) {
        await supabase.auth.signOut();
        setProfile(null);
      } else {
        setProfile(row as Profile);
      }
      setReady(true);
    };
    load();
    const { data: subscription } = supabase.auth.onAuthStateChange(() => { load(); });
    return () => {
      live = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (!cmsConfigured || !supabase) return <Setup />;
  if (!ready) return <main className="grid min-h-screen place-items-center bg-[#f4f1ea]">Checking access…</main>;
  if (!profile) return <Login />;
  if (location.pathname.startsWith("/admin")) {
    return (
      <Shell
        profile={profile}
        onSignOut={async () => {
          await supabase.auth.signOut();
          setProfile(null);
        }}
      />
    );
  }
  return null;
}
