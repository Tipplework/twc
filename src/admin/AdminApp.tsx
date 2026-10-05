import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

type Role = "super_admin" | "editor" | "viewer";

const nav = [
  ["Overview", "/admin"],
  ["Homepage", "/admin/homepage"],
  ["Projects", "/admin/projects"],
  ["Clients", "/admin/clients"],
  ["Leadership", "/admin/people"],
  ["Services", "/admin/services"],
  ["Media", "/admin/media"],
  ["SEO", "/admin/seo"],
  ["Settings", "/admin/settings"],
];

function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<Role>("viewer");

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session) {
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.session.user.id).single();
        if (profile?.role) setRole(profile.role as Role);
      }
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange(async (_event, next) => {
      setSession(next);
      if (next && supabase) {
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", next.user.id).single();
        if (profile?.role) setRole(profile.role as Role);
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return { session, ready, role };
}

function Shell({ role }: { role: Role }) {
  const location = useLocation();
  const canEdit = role === "super_admin" || role === "editor";

  useEffect(() => {
    document.body.classList.add("admin-mode");
    return () => document.body.classList.remove("admin-mode");
  }, []);

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#f6f4ef] text-[#141414] md:grid-cols-[220px_1fr]">
      <aside className="border-b border-black/10 p-4 md:border-b-0 md:border-r">
        <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">Tipple Works</p>
        <p className="mt-1 text-sm">Studio desk · {role.replace("_", " ")}</p>
        <nav className="mt-6 flex gap-3 overflow-x-auto md:flex-col md:gap-1">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              to={href}
              className={`px-2 py-1.5 text-sm ${location.pathname === href ? "bg-black text-white" : "hover:bg-black/5"}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          className="mt-6 text-sm underline"
          onClick={() => supabase?.auth.signOut()}
        >
          Log out
        </button>
      </aside>
      <div className="p-4 md:p-8">
        {!canEdit && <p className="mb-4 border border-amber-300 bg-amber-50 px-3 py-2 text-sm">Viewer access. Changes are blocked.</p>}
        <Routes>
          <Route path="/admin" element={<Overview />} />
          <Route path="/admin/homepage" element={<SettingsForm canEdit={canEdit} fields={["hero_headline", "hero_support", "hero_cta", "positioning_before", "positioning_after", "studio_heading", "studio_body", "contact_heading", "contact_body"]} />} />
          <Route path="/admin/settings" element={<SettingsForm canEdit={role === "super_admin"} fields={["email", "phone", "phone_href", "address", "instagram", "instagram_handle", "linkedin", "careers_email", "admin_email", "deck_url"]} />} />
          <Route path="/admin/projects" element={<ProjectList canEdit={canEdit} />} />
          <Route path="/admin/projects/:slug" element={<ProjectEditor canEdit={canEdit} />} />
          <Route path="/admin/clients" element={<SimpleTable table="clients" canEdit={canEdit} columns={["name", "logo", "category", "website", "project_slug", "visible", "sort_order"]} />} />
          <Route path="/admin/people" element={<SimpleTable table="leaders" canEdit={canEdit} columns={["name", "title", "bio", "image", "linkedin", "visible", "sort_order"]} />} />
          <Route path="/admin/services" element={<SimpleTable table="services" canEdit={canEdit} columns={["title", "summary", "details", "visible", "sort_order"]} />} />
          <Route path="/admin/seo" element={<SimpleTable table="page_seo" canEdit={canEdit} columns={["path", "title", "description", "og_image", "noindex"]} idKey="path" />} />
          <Route path="/admin/media" element={<MediaDesk canEdit={canEdit} />} />
        </Routes>
      </div>
    </div>
  );
}

function Overview() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [missing, setMissing] = useState<string[]>([]);

  useEffect(() => {
    if (!supabase) return;
    void (async () => {
      const names = ["projects", "clients", "leaders", "services", "inquiries", "media_assets"] as const;
      const next: Record<string, number> = {};
      for (const name of names) {
        const { count } = await supabase.from(name).select("*", { count: "exact", head: true });
        next[name] = count ?? 0;
      }
      const { count: published } = await supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "published");
      const { count: drafts } = await supabase.from("projects").select("*", { count: "exact", head: true }).eq("status", "draft");
      const { count: featured } = await supabase.from("projects").select("*", { count: "exact", head: true }).eq("featured", true);
      const { data: seo } = await supabase.from("projects").select("slug, seo_title, seo_description, cover");
      next.published = published ?? 0;
      next.drafts = drafts ?? 0;
      next.featured = featured ?? 0;
      setCounts(next);
      setMissing(
        (seo ?? [])
          .filter((row) => !row.seo_title || !row.seo_description || !row.cover)
          .map((row) => row.slug)
      );
    })();
  }, []);

  const cards = [
    ["Projects", counts.projects],
    ["Published", counts.published],
    ["Drafts", counts.drafts],
    ["Featured", counts.featured],
    ["Inquiries", counts.inquiries],
    ["Media", counts.media_assets],
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-[-0.04em]">Today</h1>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={String(label)} className="border border-black/10 bg-white p-4">
            <p className="text-3xl font-semibold">{value ?? "–"}</p>
            <p className="text-sm text-neutral-500">{label}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-10 text-lg font-semibold">Projects missing SEO or a cover</h2>
      <ul className="mt-3 text-sm">
        {missing.length === 0 && <li>None flagged.</li>}
        {missing.map((slug) => (
          <li key={slug}><Link className="underline" to={`/admin/projects/${slug}`}>{slug}</Link></li>
        ))}
      </ul>
    </div>
  );
}

function SettingsForm({ fields, canEdit }: { fields: string[]; canEdit: boolean }) {
  const [row, setRow] = useState<Record<string, string>>({});
  const [state, setState] = useState("Loading");

  useEffect(() => {
    supabase?.from("site_settings").select("*").eq("id", 1).single().then(({ data, error }) => {
      if (error) setState(error.message);
      else {
        setRow(data as Record<string, string>);
        setState("Saved");
      }
    });
  }, []);

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!canEdit || !supabase) return;
    setState("Saving");
    const payload: Record<string, string> = {};
    fields.forEach((field) => {
      payload[field] = row[field] ?? "";
    });
    const { error } = await supabase.from("site_settings").update(payload).eq("id", 1);
    setState(error ? error.message : "Saved");
  }

  return (
    <form onSubmit={save} className="max-w-2xl space-y-4">
      {fields.map((field) => (
        <label key={field} className="block text-sm">
          <span className="mb-1 block uppercase tracking-[0.12em] text-neutral-500">{field.replaceAll("_", " ")}</span>
          {field.includes("body") || field.includes("description") ? (
            <textarea disabled={!canEdit} className="w-full border border-black/15 bg-white p-3" rows={4} value={row[field] ?? ""} onChange={(event) => setRow({ ...row, [field]: event.target.value })} />
          ) : (
            <input disabled={!canEdit} className="w-full border border-black/15 bg-white p-3" value={row[field] ?? ""} onChange={(event) => setRow({ ...row, [field]: event.target.value })} />
          )}
        </label>
      ))}
      <p className="text-sm">{state}</p>
      {canEdit && <button className="bg-black px-4 py-2 text-white" type="submit">Publish settings</button>}
    </form>
  );
}

function ProjectList({ canEdit }: { canEdit: boolean }) {
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const navigate = useNavigate();

  async function refresh() {
    const { data } = await supabase!.from("projects").select("slug, title, status, featured, home_order, work_order").order("work_order");
    setRows(data ?? []);
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function move(slug: string, direction: -1 | 1) {
    if (!canEdit) return;
    const ordered = [...rows].sort((a, b) => Number(a.work_order) - Number(b.work_order));
    const index = ordered.findIndex((row) => row.slug === slug);
    const swap = ordered[index + direction];
    if (!swap) return;
    await supabase!.from("projects").update({ work_order: swap.work_order }).eq("slug", slug);
    await supabase!.from("projects").update({ work_order: ordered[index].work_order }).eq("slug", swap.slug);
    refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Projects</h1>
        {canEdit && (
          <button
            className="bg-black px-3 py-2 text-sm text-white"
            onClick={async () => {
              const slug = `untitled-${Date.now()}`;
              await supabase!.from("projects").insert({ slug, title: "Untitled", status: "draft" });
              navigate(`/admin/projects/${slug}`);
            }}
          >
            New project
          </button>
        )}
      </div>
      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-black/10 text-neutral-500">
            <th className="py-2">Title</th><th>Status</th><th>Featured</th><th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={String(row.slug)} className="border-b border-black/10">
              <td className="py-3"><Link className="underline" to={`/admin/projects/${row.slug}`}>{String(row.title)}</Link></td>
              <td>{String(row.status)}</td>
              <td>{row.featured ? "Yes" : "No"}</td>
              <td className="space-x-2">
                <button type="button" onClick={() => move(String(row.slug), -1)}>Up</button>
                <button type="button" onClick={() => move(String(row.slug), 1)}>Down</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const projectFields = ["title", "client", "sector", "year", "summary", "introduction", "challenge", "thinking", "strategy", "creative", "execution", "results", "cover", "video", "credits", "theme", "seo_title", "seo_description"] as const;

function ProjectEditor({ canEdit }: { canEdit: boolean }) {
  const { slug = "" } = useParams();
  const [row, setRow] = useState<Record<string, unknown> | null>(null);
  const [state, setState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase?.from("projects").select("*").eq("slug", slug).single().then(({ data }) => setRow(data));
  }, [slug]);

  async function save(status?: "draft" | "published") {
    if (!canEdit || !supabase || !row) return;
    setState("Saving");
    const payload = { ...row, status: status ?? row.status, updated_at: new Date().toISOString() };
    const { error } = await supabase.from("projects").update(payload).eq("slug", slug);
    setState(error ? error.message : status === "published" ? "Published" : "Draft saved");
    if (!error) setRow(payload);
  }

  if (!row) return <p>Loading project…</p>;

  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">{slug} · {String(row.status)}</p>
      <div className="mt-4 space-y-3">
        {projectFields.map((field) => (
          <label key={field} className="block text-sm">
            <span className="mb-1 block text-neutral-500">{field}</span>
            <textarea
              disabled={!canEdit}
              rows={field.length > 12 ? 4 : 2}
              className="w-full border border-black/15 bg-white p-3"
              value={String(row[field] ?? "")}
              onChange={(event) => setRow({ ...row, [field]: event.target.value })}
            />
          </label>
        ))}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" disabled={!canEdit} checked={Boolean(row.featured)} onChange={(event) => setRow({ ...row, featured: event.target.checked })} />
          Featured on the homepage
        </label>
        <label className="block text-sm">
          Homepage order
          <input disabled={!canEdit} className="mt-1 w-24 border border-black/15 p-2" type="number" value={Number(row.home_order ?? 0)} onChange={(event) => setRow({ ...row, home_order: Number(event.target.value) })} />
        </label>
      </div>
      {row.cover ? <img src={String(row.cover)} alt="" className="mt-4 max-h-64 object-cover" /> : null}
      <div className="mt-4 flex flex-wrap gap-2">
        {canEdit && <button className="border border-black px-3 py-2" onClick={() => save("draft")}>Save draft</button>}
        {canEdit && <button className="bg-[#ffc700] px-3 py-2" onClick={() => save("published")}>Publish</button>}
        {canEdit && (
          <button
            className="text-red-700"
            onClick={async () => {
              if (!confirm("Unpublish this project?")) return;
              await save("draft");
            }}
          >
            Unpublish
          </button>
        )}
        <Link className="px-3 py-2 underline" to={`/project/${slug}`} target="_blank">Open public URL</Link>
        <button className="underline" onClick={() => navigate("/admin/projects")}>Back</button>
      </div>
      <p className="mt-3 text-sm">{state}</p>
    </div>
  );
}

function SimpleTable({ table, columns, canEdit, idKey = "id" }: { table: string; columns: string[]; canEdit: boolean; idKey?: string }) {
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const [state, setState] = useState("");

  async function refresh() {
    const { data, error } = await supabase!.from(table).select("*");
    if (error) setState(error.message);
    setRows(data ?? []);
  }

  useEffect(() => {
    void refresh();
  }, [table]);

  async function save(row: Record<string, unknown>) {
    if (!canEdit) return;
    setState("Saving");
    const { error } = await supabase!.from(table).upsert(row);
    setState(error ? error.message : "Saved");
    refresh();
  }

  const empty = useMemo(() => {
    const row: Record<string, unknown> = {};
    columns.forEach((column) => {
      row[column] = column === "visible" || column === "noindex" ? false : "";
    });
    return row;
  }, [columns]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold capitalize">{table.replace("_", " ")}</h1>
      <p className="text-sm">{state}</p>
      {rows.map((row) => (
        <form
          key={String(row[idKey])}
          className="grid gap-2 border border-black/10 bg-white p-3 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const next = { ...row };
            columns.forEach((column) => {
              if (column === "visible" || column === "noindex") next[column] = data.get(column) === "on";
              else if (column === "sort_order") next[column] = Number(data.get(column) || 0);
              else if (column === "details") next[column] = String(data.get(column) || "").split(",").map((item) => item.trim()).filter(Boolean);
              else next[column] = String(data.get(column) || "");
            });
            void save(next);
          }}
        >
          {columns.map((column) => (
            <label key={column} className="text-xs">
              {column}
              {column === "visible" || column === "noindex" ? (
                <input name={column} type="checkbox" defaultChecked={Boolean(row[column])} disabled={!canEdit} className="ml-2" />
              ) : (
                <input name={column} defaultValue={Array.isArray(row[column]) ? (row[column] as string[]).join(", ") : String(row[column] ?? "")} disabled={!canEdit} className="mt-1 w-full border border-black/10 p-2 text-sm" />
              )}
            </label>
          ))}
          {canEdit && <button className="bg-black px-3 py-2 text-sm text-white md:col-span-2" type="submit">Save</button>}
        </form>
      ))}
      {canEdit && (
        <button
          className="border border-black px-3 py-2 text-sm"
          onClick={() => save(idKey === "path" ? { ...empty, path: `/page-${Date.now()}` } : empty)}
        >
          Add row
        </button>
      )}
    </div>
  );
}

function MediaDesk({ canEdit }: { canEdit: boolean }) {
  const [rows, setRows] = useState<Array<Record<string, string>>>([]);
  const [state, setState] = useState("");

  async function refresh() {
    const { data } = await supabase!.from("media_assets").select("*").order("created_at", { ascending: false });
    setRows((data ?? []) as Array<Record<string, string>>);
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function upload(file: File) {
    if (!supabase || !canEdit) return;
    setState("Uploading");
    const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
    if (error) {
      setState(error.message);
      return;
    }
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    await supabase.from("media_assets").insert({ filename: file.name, url: data.publicUrl, kind: file.type.startsWith("video") ? "video" : "image", alt: "" });
    setState("Uploaded");
    refresh();
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">Media</h1>
      <p className="mt-2 max-w-xl text-sm text-neutral-600">Uploads are new files. Replacing an image means uploading another and pointing the project at it. Nothing is overwritten.</p>
      {canEdit && (
        <input
          className="mt-4"
          type="file"
          accept="image/*,video/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
          }}
        />
      )}
      <p className="mt-2 text-sm">{state}</p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {rows.map((row) => (
          <figure key={row.id} className="border border-black/10 bg-white p-2">
            {row.kind === "video" ? <video src={row.url} className="aspect-square w-full object-cover" /> : <img src={row.url} alt={row.alt || ""} className="aspect-square w-full object-cover" />}
            <figcaption className="mt-2 truncate text-xs">{row.filename}</figcaption>
            {canEdit && (
              <button
                className="mt-1 text-xs text-red-700"
                onClick={async () => {
                  if (!confirm(`Delete ${row.filename}?`)) return;
                  await supabase!.from("media_assets").delete().eq("id", row.id);
                  refresh();
                }}
              >
                Delete record
              </button>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}

function Login() {
  const [state, setState] = useState("");
  const navigate = useNavigate();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    const form = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    if (error) setState(error.message);
    else navigate("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f4ef] px-4 text-[#141414]">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3 border border-black/10 bg-white p-6">
        <h1 className="text-2xl font-semibold">Studio desk</h1>
        <input name="email" type="email" required placeholder="Email" className="w-full border border-black/15 p-3" />
        <input name="password" type="password" required placeholder="Password" className="w-full border border-black/15 p-3" />
        <button className="w-full bg-black py-3 text-white" type="submit">Log in</button>
        <p className="text-sm text-red-700">{state}</p>
      </form>
    </main>
  );
}

function Setup() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] px-6 py-16 text-[#141414]">
      <h1 className="text-4xl font-semibold tracking-[-0.04em]">Connect the TWC database</h1>
      <p className="mt-4 max-w-xl">The public site is using the migrated content in the codebase. The studio desk stays closed until a Tipple Works Supabase project is connected. Do not point this at another brand.</p>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm">
        <li>Create a new Supabase project for Tipple Works only.</li>
        <li>Run supabase/migrations/20261005143000_twc_cms.sql in that project.</li>
        <li>Create the first user in Authentication, then set their profile role to super_admin.</li>
        <li>Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the website-refresh-2026 preview environment. Not production, until launch is approved.</li>
      </ol>
    </main>
  );
}

export default function AdminApp() {
  const location = useLocation();
  const { session, ready, role } = useSession();

  if (!supabaseConfigured) return <Setup />;
  if (!ready) return <p className="p-8">Checking access…</p>;
  if (!session && location.pathname !== "/admin/login") return <Navigate to="/admin/login" replace />;
  if (!session) return <Login />;
  return <Shell role={role} />;
}
