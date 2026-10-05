import { useEffect, useState } from "react";
import { canEdit, db, publishColumns, saveDraft, unpublish, uploadAsset, type Profile } from "@/admin/api";
import { Button, Field, Notice, Pill, SaveState, fieldClass, useUnsaved } from "@/admin/ui";

type GalleryItem = {
  id?: string;
  asset_id?: string;
  public_url: string;
  caption: string;
  alt_text: string;
  sort_order: number;
};

type Form = {
  title: string;
  slug: string;
  category: string;
  client: string;
  sector: string;
  discipline: string;
  year: string;
  description: string;
  video_url: string;
  video_confirmed: boolean;
  featured: boolean;
  featured_order: string;
  work_order: string;
  visible: boolean;
  status: string;
  seo_title: string;
  seo_description: string;
  hero_asset_id: string | null;
  hero_url: string;
  og_asset_id: string | null;
  og_url: string;
  gallery: GalleryItem[];
};

const empty: Form = {
  title: "",
  slug: "",
  category: "",
  client: "",
  sector: "",
  discipline: "",
  year: "",
  description: "",
  video_url: "",
  video_confirmed: false,
  featured: false,
  featured_order: "",
  work_order: "0",
  visible: true,
  status: "draft",
  seo_title: "",
  seo_description: "",
  hero_asset_id: null,
  hero_url: "",
  og_asset_id: null,
  og_url: "",
  gallery: [],
};

function fromRow(row: Record<string, unknown>): Form {
  const draft = (row.draft || {}) as Partial<Form>;
  const hero = row.hero as { id?: string; public_url?: string } | null;
  const og = row.og as { id?: string; public_url?: string } | null;
  const gallery = Array.isArray(draft.gallery)
    ? draft.gallery
    : ((row.gallery as Array<Record<string, unknown>>) || [])
        .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))
        .map((item, index) => {
          const asset = (item.asset || {}) as { id?: string; public_url?: string; alt_text?: string };
          return {
            id: String(item.id || ""),
            asset_id: asset.id,
            public_url: asset.public_url || "",
            caption: String(item.caption || ""),
            alt_text: asset.alt_text || "",
            sort_order: index,
          };
        });
  const base: Form = {
    ...empty,
    title: String(row.title || ""),
    slug: String(row.slug || ""),
    category: String(row.category || ""),
    client: String(row.client || ""),
    sector: String(row.sector || ""),
    discipline: String(row.discipline || ""),
    year: String(row.year || ""),
    description: String(row.description || ""),
    video_url: String(row.video_url || ""),
    video_confirmed: Boolean(row.video_confirmed),
    featured: Boolean(row.featured),
    featured_order: row.featured_order == null ? "" : String(row.featured_order),
    work_order: String(row.work_order ?? 0),
    visible: row.visible !== false,
    status: String(row.status || "draft"),
    seo_title: String(row.seo_title || ""),
    seo_description: String(row.seo_description || ""),
    hero_asset_id: hero?.id || (row.hero_asset_id as string) || null,
    hero_url: hero?.public_url || "",
    og_asset_id: og?.id || (row.og_asset_id as string) || null,
    og_url: og?.public_url || "",
    gallery,
  };
  return { ...base, ...draft, gallery };
}

export function ProjectList({ profile, open }: { profile: Profile; open: (id: string) => void }) {
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [error, setError] = useState("");

  const load = () => {
    db()
      .from("projects")
      .select("id, title, slug, status, visible, featured, has_unpublished_changes, updated_at")
      .order("work_order")
      .then(({ data, error: loadError }) => {
        if (loadError) setError(loadError.message);
        else setRows(data || []);
      });
  };

  useEffect(load, []);

  const visible = rows.filter((row) => {
    const text = `${row.title} ${row.slug}`.toLowerCase();
    if (query && !text.includes(query.toLowerCase())) return false;
    if (status === "featured") return Boolean(row.featured);
    if (status !== "all" && row.status !== status) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">Projects</h1>
          <p className="text-sm text-neutral-500">{rows.length} records</p>
        </div>
        {canEdit(profile.role) && <Button onClick={() => open("new")}>New project</Button>}
      </div>
      <div className="flex gap-2">
        <input className={fieldClass} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or slug" />
        <select className={fieldClass} value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="featured">Featured</option>
        </select>
      </div>
      {error && <Notice>{error}</Notice>}
      <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
        {visible.map((row) => (
          <button key={String(row.id)} onClick={() => open(String(row.id))} className="flex w-full items-center justify-between gap-3 border-b border-black/5 px-4 py-3 text-left last:border-0 hover:bg-black/[0.02]">
            <span>
              <span className="block text-sm font-medium">{String(row.title)}</span>
              <span className="text-xs text-neutral-500">{String(row.slug)}</span>
            </span>
            <span className="flex gap-2">
              <Pill tone={row.status === "published" ? "green" : "amber"}>{String(row.status)}</Pill>
              {!row.visible && <Pill>Hidden</Pill>}
              {row.featured ? <Pill>Featured</Pill> : null}
              {row.has_unpublished_changes ? <Pill tone="amber">Unpublished</Pill> : null}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProjectEditor({ id, profile, back }: { id: string; profile: Profile; back: () => void }) {
  const [form, setForm] = useState<Form>(empty);
  const [recordId, setRecordId] = useState(id === "new" ? "" : id);
  const [dirty, setDirty] = useState(false);
  const [state, setState] = useState("No changes");
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const [ready, setReady] = useState(id === "new");
  const locked = !canEdit(profile.role);
  useUnsaved(dirty);

  useEffect(() => {
    if (id === "new") return;
    db()
      .from("projects")
      .select("*, hero:assets!projects_hero_asset_id_fkey(id, public_url, alt_text), og:assets!projects_og_asset_id_fkey(id, public_url), gallery:project_media(id, caption, sort_order, asset:assets(id, public_url, alt_text))")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setState(error?.message || "Project not found");
          return;
        }
        setForm(fromRow(data as Record<string, unknown>));
        setUpdatedAt(String(data.updated_at || ""));
        setRecordId(data.id);
        setReady(true);
      });
  }, [id]);

  const update = (patch: Partial<Form>) => {
    setForm((current) => ({ ...current, ...patch }));
    setDirty(true);
    setState("Unsaved changes");
  };

  const columns = () => ({
    title: form.title,
    slug: form.slug,
    category: form.category,
    client: form.client,
    sector: form.sector,
    discipline: form.discipline,
    year: form.year,
    description: form.description,
    video_url: form.video_url || null,
    video_confirmed: form.video_confirmed,
    featured: form.featured,
    featured_order: form.featured_order === "" ? null : Number(form.featured_order),
    work_order: Number(form.work_order || 0),
    visible: form.visible,
    seo_title: form.seo_title,
    seo_description: form.seo_description,
    hero_asset_id: form.hero_asset_id,
    og_asset_id: form.og_asset_id,
  });

  const draftPayload = () => ({
    ...columns(),
    hero_url: form.hero_url,
    og_url: form.og_url,
    gallery: form.gallery,
  });

  const syncGallery = async (projectId: string) => {
    await db().from("project_media").delete().eq("project_id", projectId);
    const gallery = form.gallery.filter((item) => item.asset_id);
    if (!gallery.length) return;
    const { error } = await db().from("project_media").insert(
      gallery.map((item, index) => ({
        project_id: projectId,
        asset_id: item.asset_id,
        caption: item.caption,
        sort_order: index,
        visible: true,
      }))
    );
    if (error) throw error;
    await Promise.all(
      form.gallery.filter((item) => item.asset_id).map((item) => db().from("assets").update({ alt_text: item.alt_text, caption: item.caption }).eq("id", item.asset_id))
    );
  };

  const failure = (error: unknown, fallback: string) => {
    if (error instanceof Error && error.message) return error.message;
    if (error && typeof error === "object" && "message" in error && error.message) return String(error.message);
    return fallback;
  };

  const save = async () => {
    if (!ready) return;
    setState("Saving draft…");
    try {
      if (!recordId) {
        const { data, error } = await db().from("projects").insert({ ...columns(), status: "draft" }).select("id, updated_at").single();
        if (error) throw error;
        setRecordId(data.id);
        await syncGallery(data.id);
        setUpdatedAt(data.updated_at);
      } else if (form.status === "published") {
        await saveDraft("projects", recordId, draftPayload());
      } else {
        const { error } = await db().from("projects").update(columns()).eq("id", recordId);
        if (error) throw error;
        await syncGallery(recordId);
      }
      setDirty(false);
      setState("Draft saved");
    } catch (error) {
      setState(failure(error, "Save failed"));
    }
  };

  const publish = async () => {
    if (!ready) return;
    setState("Publishing…");
    try {
      let projectId = recordId;
      if (!projectId) {
        const { data, error } = await db().from("projects").insert({ ...columns(), status: "draft" }).select("id").single();
        if (error) throw error;
        projectId = data.id;
        setRecordId(projectId);
      }
      await publishColumns("projects", projectId, columns());
      await syncGallery(projectId);
      setForm((current) => ({ ...current, status: "published" }));
      setDirty(false);
      setState("Published");
    } catch (error) {
      setState(failure(error, "Publish failed"));
    }
  };

  const upload = async (file: File, folder: string) => uploadAsset(file, `${folder}/${form.slug || "draft"}`);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button onClick={back} className="text-xs uppercase tracking-[0.14em] text-neutral-500">Projects</button>
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">{form.title || "New project"}</h1>
          <div className="mt-2 flex gap-2">
            <Pill tone={form.status === "published" ? "green" : "amber"}>{form.status}</Pill>
            {form.featured && <Pill>Featured</Pill>}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {recordId && form.slug && (
            <a className="rounded-md border border-black/10 px-3 py-2 text-sm" href={`/project/${form.slug}?preview=1`} target="_blank" rel="noreferrer">Preview</a>
          )}
          {!locked && <Button tone="light" disabled={!ready} onClick={save}>Save draft</Button>}
          {!locked && <Button disabled={!ready} onClick={publish}>Publish</Button>}
          {!locked && recordId && form.status === "published" && (
            <Button tone="light" onClick={() => unpublish("projects", recordId).then(() => { setForm((current) => ({ ...current, status: "draft" })); setState("Unpublished"); })}>Unpublish</Button>
          )}
        </div>
      </div>
      <SaveState state={locked ? "Read only" : state} updatedAt={updatedAt} />
      {dirty && <Notice>You have unsaved changes. They are not public until you publish.</Notice>}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title"><input className={fieldClass} disabled={locked} value={form.title} onChange={(event) => update({ title: event.target.value })} /></Field>
        <Field label="Slug"><input className={fieldClass} disabled={locked} value={form.slug} onChange={(event) => update({ slug: event.target.value })} /></Field>
        <Field label="Category"><input className={fieldClass} disabled={locked} value={form.category} onChange={(event) => update({ category: event.target.value })} /></Field>
        <Field label="Client"><input className={fieldClass} disabled={locked} value={form.client} onChange={(event) => update({ client: event.target.value })} /></Field>
        <Field label="Sector"><input className={fieldClass} disabled={locked} value={form.sector} onChange={(event) => update({ sector: event.target.value })} /></Field>
        <Field label="Discipline"><input className={fieldClass} disabled={locked} value={form.discipline} onChange={(event) => update({ discipline: event.target.value })} /></Field>
        <Field label="Year"><input className={fieldClass} disabled={locked} value={form.year} onChange={(event) => update({ year: event.target.value })} /></Field>
        <Field label="Work page order"><input className={fieldClass} disabled={locked} value={form.work_order} onChange={(event) => update({ work_order: event.target.value })} /></Field>
        <Field label="Homepage order"><input className={fieldClass} disabled={locked} value={form.featured_order} onChange={(event) => update({ featured_order: event.target.value })} /></Field>
        <Field label="Video URL"><input className={fieldClass} disabled={locked} value={form.video_url} onChange={(event) => update({ video_url: event.target.value })} /></Field>
      </div>
      <Field label="Description"><textarea className={`${fieldClass} min-h-40`} disabled={locked} value={form.description} onChange={(event) => update({ description: event.target.value })} /></Field>
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" disabled={locked} checked={form.video_confirmed} onChange={(event) => update({ video_confirmed: event.target.checked })} /> Video confirmed</label>
        <label className="flex items-center gap-2"><input type="checkbox" disabled={locked} checked={form.featured} onChange={(event) => update({ featured: event.target.checked })} /> Featured</label>
        <label className="flex items-center gap-2"><input type="checkbox" disabled={locked} checked={form.visible} onChange={(event) => update({ visible: event.target.checked })} /> Visible</label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="SEO title"><input className={fieldClass} disabled={locked} value={form.seo_title} onChange={(event) => update({ seo_title: event.target.value })} /></Field>
        <Field label="SEO description"><input className={fieldClass} disabled={locked} value={form.seo_description} onChange={(event) => update({ seo_description: event.target.value })} /></Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-neutral-500">Hero image</p>
          {form.hero_url && <img src={form.hero_url} alt="" className="mb-2 h-40 w-full rounded-md object-contain bg-neutral-100" />}
          {!locked && (
            <input type="file" accept="image/*" onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const asset = await upload(file, "projects");
              update({ hero_asset_id: asset.id, hero_url: asset.public_url });
            }} />
          )}
        </div>
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-neutral-500">OG image</p>
          {form.og_url && <img src={form.og_url} alt="" className="mb-2 h-40 w-full rounded-md object-contain bg-neutral-100" />}
          {!locked && (
            <input type="file" accept="image/*" onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const asset = await upload(file, "projects");
              update({ og_asset_id: asset.id, og_url: asset.public_url });
            }} />
          )}
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">Gallery</p>
          {!locked && (
            <input type="file" accept="image/*" onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const asset = await upload(file, "projects");
              update({ gallery: [...form.gallery, { asset_id: asset.id, public_url: asset.public_url, caption: "", alt_text: "", sort_order: form.gallery.length }] });
            }} />
          )}
        </div>
        <div className="space-y-3">
          {form.gallery.map((item, index) => (
            <div
              key={`${item.asset_id}-${index}`}
              draggable={!locked}
              onDragStart={() => setDrag(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (drag === null || drag === index) return;
                const next = [...form.gallery];
                const [moved] = next.splice(drag, 1);
                next.splice(index, 0, moved);
                update({ gallery: next });
                setDrag(null);
              }}
              className="grid items-center gap-3 rounded-md border border-black/10 bg-white p-3 md:grid-cols-[96px_1fr_auto]"
            >
              <img src={item.public_url} alt="" className="h-20 w-24 rounded object-contain bg-neutral-100" />
              <div className="grid gap-2">
                <input className={fieldClass} disabled={locked} value={item.caption} placeholder="Caption" onChange={(event) => {
                  const gallery = form.gallery.slice();
                  gallery[index] = { ...item, caption: event.target.value };
                  update({ gallery });
                }} />
                <input className={fieldClass} disabled={locked} value={item.alt_text} placeholder="Alt text" onChange={(event) => {
                  const gallery = form.gallery.slice();
                  gallery[index] = { ...item, alt_text: event.target.value };
                  update({ gallery });
                }} />
              </div>
              {!locked && (
                <div className="flex gap-2">
                  <label className="cursor-pointer text-sm underline">
                    Replace
                    <input type="file" accept="image/*" className="hidden" onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      const asset = await upload(file, "projects");
                      const gallery = form.gallery.slice();
                      gallery[index] = { ...item, asset_id: asset.id, public_url: asset.public_url };
                      update({ gallery });
                    }} />
                  </label>
                  <button className="text-sm text-red-700" onClick={() => {
                    if (!window.confirm("Remove this gallery image?")) return;
                    update({ gallery: form.gallery.filter((_, itemIndex) => itemIndex !== index) });
                  }}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {!locked && recordId && (
        <Button tone="danger" onClick={async () => {
          if (!window.confirm("Delete this project? Media files are kept.")) return;
          const { error } = await db().from("projects").delete().eq("id", recordId);
          if (error) setState(error.message);
          else back();
        }}>Delete project</Button>
      )}
    </div>
  );
}
