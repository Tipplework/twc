import { useEffect, useRef, useState } from "react";
import { canEdit, db, deleteAsset, publishColumns, replaceAssetFile, routes, saveDraft, unpublish, uploadAsset, type AssetRow, type Profile } from "@/admin/api";
import { AssetPicker } from "@/admin/AssetPicker";
import { Button, Field, Notice, Pill, SaveState, fieldClass, useUnsaved } from "@/admin/ui";

export function Dashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [recent, setRecent] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      db().from("projects").select("status, visible, featured, hero_asset_id, seo_title, seo_description, has_unpublished_changes"),
      db().from("clients").select("id, visible, status"),
      db().from("assets").select("id", { count: "exact", head: true }),
      db().from("page_seo").select("title, description"),
      db().from("audit_log").select("action, entity_type, created_at").order("created_at", { ascending: false }).limit(8),
    ]).then(([projects, clients, assets, seo, audit]) => {
      if (projects.error) {
        setError(projects.error.message);
        return;
      }
      const rows = projects.data || [];
      const seoRows = seo.data || [];
      setStats({
        published: rows.filter((row) => row.status === "published").length,
        draft: rows.filter((row) => row.status === "draft").length,
        hidden: rows.filter((row) => row.visible === false).length,
        featured: rows.filter((row) => row.featured).length,
        clients: (clients.data || []).filter((row) => row.visible && row.status === "published").length,
        missingImages: rows.filter((row) => !row.hero_asset_id).length,
        missingSeo: rows.filter((row) => !row.seo_title || !row.seo_description).length + seoRows.filter((row) => !row.title || !row.description).length,
        unpublished: rows.filter((row) => row.has_unpublished_changes).length,
        media: assets.count || 0,
      });
      setRecent((audit.data || []) as unknown as Array<Record<string, unknown>>);
    });
  }, []);

  const cards = [
    ["Published projects", stats.published],
    ["Draft projects", stats.draft],
    ["Hidden projects", stats.hidden],
    ["Featured projects", stats.featured],
    ["Active clients", stats.clients],
    ["Missing images", stats.missingImages],
    ["Missing SEO", stats.missingSeo],
    ["Unpublished changes", stats.unpublished],
    ["Media files", stats.media],
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">Dashboard</h1>
      {error && <Notice>{error}</Notice>}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={String(label)} className="rounded-lg border border-black/10 bg-white px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{value ?? "—"}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="mb-2 text-sm font-medium">Recently edited</h2>
        <div className="rounded-lg border border-black/10 bg-white">
          {recent.length === 0 && <p className="px-4 py-3 text-sm text-neutral-500">No audit events yet.</p>}
          {recent.map((row, index) => (
            <p key={index} className="border-b border-black/5 px-4 py-2 text-sm last:border-0">
              {String(row.action)} · {String(row.entity_type)} · {row.created_at ? new Date(String(row.created_at)).toLocaleString() : ""}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function useRows(table: string, select = "*") {
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const [error, setError] = useState("");
  const load = () => {
    db()
      .from(table)
      .select(select)
      .order("sort_order", { ascending: true })
      .then(({ data, error: loadError }) => {
        if (loadError) setError(loadError.message);
        else setRows((data || []) as unknown as Array<Record<string, unknown>>);
      });
  };
  useEffect(load, [table, select]);
  return { rows, error, reload: load, setRows };
}

export function RecordList({
  title,
  table,
  profile,
  fields,
  select,
}: {
  title: string;
  table: string;
  profile: Profile;
  fields: string[];
  select?: string;
}) {
  const { rows, error, reload } = useRows(table, select);
  const [current, setCurrent] = useState<Record<string, unknown> | null>(null);
  const [state, setState] = useState("No changes");
  const [dirty, setDirty] = useState(false);
  const locked = !canEdit(profile.role);
  useUnsaved(dirty);

  const edit = (row: Record<string, unknown>) => {
    const draft = (row.draft || {}) as Record<string, unknown>;
    const related = (row.logo || row.image) as { public_url?: string } | { public_url?: string }[] | null;
    const image = Array.isArray(related) ? related[0]?.public_url : related?.public_url;
    setCurrent({ ...row, ...draft, image });
    setDirty(false);
    setState(row.has_unpublished_changes ? "Unpublished changes" : "Loaded");
  };

  const save = async (publish: boolean) => {
    if (!current) return;
    setState(publish ? "Publishing…" : "Saving draft…");
    try {
      const payload: Record<string, unknown> = {};
      fields.forEach((field) => {
        if (field === "sort_order") payload[field] = Number(current[field] || 0);
        else if (field === "visible") payload[field] = Boolean(current[field]);
        else if ((field === "project_slug" || field === "website_url" || field === "linkedin") && current[field] === "") payload[field] = null;
        else payload[field] = current[field];
      });
      if (current.logo_asset_id) payload.logo_asset_id = current.logo_asset_id;
      if (current.image_asset_id) payload.image_asset_id = current.image_asset_id;
      if (!current.id) {
        const { data, error: insertError } = await db().from(table).insert({ ...payload, status: "draft" }).select("*").single();
        if (insertError) throw insertError;
        if (publish) await publishColumns(table, data.id, payload);
        setCurrent(data);
      } else if (publish) {
        await publishColumns(table, String(current.id), payload);
      } else if (current.status === "published") {
        await saveDraft(table, String(current.id), payload);
      } else {
        const { error: updateError } = await db().from(table).update(payload).eq("id", current.id);
        if (updateError) throw updateError;
      }
      setDirty(false);
      setState(publish ? "Published" : "Draft saved");
      reload();
    } catch (saveError) {
      setState(saveError instanceof Error ? saveError.message : "Save failed");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h1>
        </div>
        {error && <Notice>{error}</Notice>}
        {!locked && <Button onClick={() => edit({ status: "draft", visible: true, sort_order: rows.length })}>Add</Button>}
        <div className="mt-3 rounded-lg border border-black/10 bg-white">
          {rows.map((row) => (
            <button key={String(row.id)} onClick={() => edit(row)} className="block w-full border-b border-black/5 px-3 py-2 text-left text-sm last:border-0">
              {String(row.name || row.title || row.quote || row.label || "Untitled")}
              <span className="mt-1 flex gap-1">
                <Pill tone={row.status === "published" ? "green" : "amber"}>{String(row.status || "draft")}</Pill>
                {row.has_unpublished_changes ? <Pill tone="amber">Unpublished</Pill> : null}
              </span>
            </button>
          ))}
        </div>
      </div>
      {current && (
        <div className="space-y-3">
          <SaveState state={locked ? "Read only" : state} updatedAt={String(current.updated_at || "")} />
          {fields.map((field) => (
            <Field key={field} label={field.replace(/_/g, " ")}>
              {field === "visible" ? (
                <input type="checkbox" disabled={locked} checked={Boolean(current[field])} onChange={(event) => { setCurrent({ ...current, [field]: event.target.checked }); setDirty(true); }} />
              ) : (
                <input className={fieldClass} disabled={locked} value={String(current[field] ?? "")} onChange={(event) => { setCurrent({ ...current, [field]: event.target.value }); setDirty(true); setState("Unsaved changes"); }} />
              )}
            </Field>
          ))}
          {(table === "clients" || table === "team_members") && (
            <AssetPicker
              label={table === "clients" ? "Logo" : "Team photo"}
              folder={table === "clients" ? "clients" : "team"}
              disabled={locked}
              assetId={String((table === "clients" ? current.logo_asset_id : current.image_asset_id) || "")}
              previewUrl={current.image ? String(current.image) : null}
              onChange={(asset) => {
                const key = table === "clients" ? "logo_asset_id" : "image_asset_id";
                setCurrent({ ...current, [key]: asset.id, image: asset.public_url });
                setDirty(true);
                setState("Unsaved changes");
              }}
            />
          )}
          {!locked && (
            <div className="flex gap-2">
              <Button tone="light" onClick={() => save(false)}>Save draft</Button>
              <Button onClick={() => save(true)}>Publish</Button>
              {current.id && current.status === "published" && <Button tone="light" onClick={() => unpublish(table, String(current.id)).then(reload)}>Unpublish</Button>}
              {current.id && (
                <Button tone="danger" onClick={() => {
                  if (!window.confirm("Delete this record?")) return;
                  db().from(table).delete().eq("id", current.id).then(reload);
                  setCurrent(null);
                }}>Delete</Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ServicesAdmin({ profile }: { profile: Profile }) {
  const { rows, error, reload } = useRows("services", "*, items:service_items(id, name, icon_key, sort_order, visible)");
  const [current, setCurrent] = useState<Record<string, unknown> | null>(null);
  const [state, setState] = useState("No changes");
  const locked = !canEdit(profile.role);

  const save = async (publish: boolean) => {
    if (!current) return;
    const items = (current.items as Array<Record<string, unknown>>) || [];
    const payload = {
      slug: current.slug,
      title: current.title,
      description: current.description,
      icon_key: current.icon_key,
      visible: current.visible !== false,
      sort_order: Number(current.sort_order || 0),
    };
    setState(publish ? "Publishing…" : "Saving draft…");
    try {
      let id = String(current.id || "");
      if (!id) {
        const { data, error: insertError } = await db().from("services").insert({ ...payload, status: "draft" }).select("id").single();
        if (insertError) throw insertError;
        id = data.id;
      } else if (publish || current.status !== "published") {
        if (publish) await publishColumns("services", id, payload);
        else {
          const { error: updateError } = await db().from("services").update(payload).eq("id", id);
          if (updateError) throw updateError;
        }
      } else {
        await saveDraft("services", id, { ...payload, items });
        setState("Draft saved");
        return;
      }
      await db().from("service_items").delete().eq("service_id", id);
      if (items.length) {
        const { error: itemError } = await db().from("service_items").insert(items.map((item, index) => ({
          service_id: id,
          name: item.name,
          icon_key: item.icon_key,
          sort_order: index,
          visible: item.visible !== false,
        })));
        if (itemError) throw itemError;
      }
      setState(publish ? "Published" : "Draft saved");
      reload();
    } catch (saveError) {
      setState(saveError instanceof Error ? saveError.message : "Save failed");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">Services</h1>
      {error && <Notice>{error}</Notice>}
      <SaveState state={state} />
      <div className="grid gap-3">
        {rows.map((row) => (
          <button key={String(row.id)} className="rounded-lg border border-black/10 bg-white px-4 py-3 text-left" onClick={() => setCurrent(row)}>
            {String(row.title)} <Pill>{String(row.status)}</Pill>
          </button>
        ))}
      </div>
      {current && (
        <div className="space-y-3 rounded-lg border border-black/10 bg-white p-4">
          {["slug", "title", "description", "icon_key", "sort_order"].map((field) => (
            <Field key={field} label={field}>
              <input className={fieldClass} disabled={locked} value={String(current[field] ?? "")} onChange={(event) => setCurrent({ ...current, [field]: event.target.value })} />
            </Field>
          ))}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" aria-label="Service visible" disabled={locked} checked={current.visible !== false} onChange={(event) => setCurrent({ ...current, visible: event.target.checked })} /> Visible
          </label>
          <p className="text-xs uppercase tracking-[0.14em] text-neutral-500">Items</p>
          {((current.items as Array<Record<string, unknown>>) || []).map((item, index, items) => (
            <div key={index} className="grid grid-cols-[1fr_1fr_auto] items-center gap-2">
              <input className={fieldClass} aria-label="Service item name" disabled={locked} value={String(item.name || "")} onChange={(event) => {
                const next = items.slice();
                next[index] = { ...item, name: event.target.value };
                setCurrent({ ...current, items: next });
              }} />
              <input className={fieldClass} aria-label="Service item icon" disabled={locked} value={String(item.icon_key || "")} onChange={(event) => {
                const next = items.slice();
                next[index] = { ...item, icon_key: event.target.value };
                setCurrent({ ...current, items: next });
              }} />
              <div className="flex items-center gap-2 text-xs">
                <label className="flex items-center gap-1">
                  <input type="checkbox" aria-label="Service item visible" disabled={locked} checked={item.visible !== false} onChange={(event) => {
                    const next = items.slice();
                    next[index] = { ...item, visible: event.target.checked };
                    setCurrent({ ...current, items: next });
                  }} /> Visible
                </label>
                {!locked && <button type="button" aria-label="Move service item up" disabled={index === 0} onClick={() => {
                  const next = items.slice();
                  [next[index - 1], next[index]] = [next[index], next[index - 1]];
                  setCurrent({ ...current, items: next });
                }}>Up</button>}
                {!locked && <button type="button" aria-label="Move service item down" disabled={index === items.length - 1} onClick={() => {
                  const next = items.slice();
                  [next[index + 1], next[index]] = [next[index], next[index + 1]];
                  setCurrent({ ...current, items: next });
                }}>Down</button>}
              </div>
            </div>
          ))}
          {!locked && <Button tone="light" onClick={() => setCurrent({ ...current, items: [...((current.items as unknown[]) || []), { name: "", icon_key: "palette", visible: true }] })}>Add item</Button>}
          {!locked && (
            <div className="flex gap-2">
              <Button tone="light" onClick={() => save(false)}>Save draft</Button>
              <Button onClick={() => save(true)}>Publish</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function HomepageAdmin({ profile }: { profile: Profile }) {
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const [state, setState] = useState("No changes");
  const locked = !canEdit(profile.role);
  useEffect(() => {
    db().from("homepage_sections").select("*").order("sort_order").then(({ data }) => setRows(data || []));
  }, []);

  const save = async (row: Record<string, unknown>, publish: boolean) => {
    const payload = {
      heading: row.heading,
      body: row.body,
      visible: row.visible !== false,
      sort_order: Number(row.sort_order || 0),
      settings: row.settings || {},
    };
    try {
      if (publish) await publishColumns("homepage_sections", String(row.id), payload, { withStatus: false });
      else await saveDraft("homepage_sections", String(row.id), payload);
      setState(publish ? "Published" : "Draft saved");
    } catch (error) {
      setState(error instanceof Error ? error.message : "Save failed");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">Homepage</h1>
      <p className="text-sm text-neutral-500">The public section order is part of the design and stays fixed. You can edit copy and visibility. Hero layout and the cursor stay locked; circles and their intensity are the only hero controls.</p>
      <SaveState state={state} />
      {rows.map((row, index) => (
        <div key={String(row.id)} className="space-y-2 rounded-lg border border-black/10 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{String(row.section_key)}</h2>
            {row.has_unpublished_changes ? <Pill tone="amber">Unpublished</Pill> : null}
          </div>
          <Field label="Heading"><input className={fieldClass} disabled={locked} value={String(row.heading || "")} onChange={(event) => {
            const next = rows.slice();
            next[index] = { ...row, heading: event.target.value };
            setRows(next);
          }} /></Field>
          <Field label="Body"><textarea className={fieldClass} disabled={locked} value={String(row.body || "")} onChange={(event) => {
            const next = rows.slice();
            next[index] = { ...row, body: event.target.value };
            setRows(next);
          }} /></Field>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" disabled={locked} checked={row.visible !== false} onChange={(event) => {
            const next = rows.slice();
            next[index] = { ...row, visible: event.target.checked };
            setRows(next);
          }} /> Visible</label>
          {row.section_key === "hero" && (
            <>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" aria-label="Background circles" disabled={locked} checked={(row.settings as { circles?: boolean })?.circles !== false} onChange={(event) => {
                const next = rows.slice();
                next[index] = { ...row, settings: { ...(row.settings as object), circles: event.target.checked } };
                setRows(next);
              }} /> Background circles</label>
              <Field label="Circle intensity">
                <input className={fieldClass} type="number" min="0" max="1" step="0.01" aria-label="Circle intensity" disabled={locked} value={String((row.settings as { intensity?: number })?.intensity ?? 0.42)} onChange={(event) => {
                  const next = rows.slice();
                  next[index] = { ...row, settings: { ...(row.settings as object), intensity: Number(event.target.value) } };
                  setRows(next);
                }} />
              </Field>
            </>
          )}
          {!locked && (
            <div className="flex gap-2">
              <Button tone="light" onClick={() => save(rows[index], false)}>Save draft</Button>
              <Button onClick={() => save(rows[index], true)}>Publish</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function PageAdmin({ profile, path, title, keys }: { profile: Profile; path: string; title: string; keys: string[] }) {
  const [page, setPage] = useState<Record<string, unknown> | null>(null);
  const [state, setState] = useState("Loading");
  const locked = !canEdit(profile.role);
  const [dirty, setDirty] = useState(false);
  useUnsaved(dirty);

  useEffect(() => {
    db().from("pages").select("*").eq("path", path).maybeSingle().then(({ data, error }) => {
      if (error) setState(error.message);
      else if (data) {
        setPage({ ...data, content: { ...(data.content || {}), ...(data.draft || {}) } });
        setState(data.has_unpublished_changes ? "Unpublished changes" : "Loaded");
      }
    });
  }, [path]);

  if (!page) return <p className="text-sm text-neutral-500">{state}</p>;
  const content = (page.content || {}) as Record<string, unknown>;

  const save = async (publish: boolean) => {
    try {
      if (publish) await publishColumns("pages", String(page.id), { title: page.title, content });
      else if (page.status === "published") await saveDraft("pages", String(page.id), content);
      else {
        const { error } = await db().from("pages").update({ title: page.title, content }).eq("id", page.id);
        if (error) throw error;
      }
      setDirty(false);
      setState(publish ? "Published" : "Draft saved");
    } catch (error) {
      setState(error instanceof Error ? error.message : "Save failed");
    }
  };

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h1>
      <SaveState state={locked ? "Read only" : state} updatedAt={String(page.updated_at || "")} />
      {keys.map((key) => (
        <Field key={key} label={key.replace(/_/g, " ")}>
          <textarea className={fieldClass} disabled={locked} value={String(content[key] ?? "")} onChange={(event) => {
            setPage({ ...page, content: { ...content, [key]: event.target.value } });
            setDirty(true);
            setState("Unsaved changes");
          }} />
        </Field>
      ))}
      {!locked && (
        <div className="flex gap-2">
          <Button tone="light" onClick={() => save(false)}>Save draft</Button>
          <Button onClick={() => save(true)}>Publish</Button>
        </div>
      )}
    </div>
  );
}

export function SettingsAdmin({ profile, title, fields }: { profile: Profile; title: string; fields: string[] }) {
  const [row, setRow] = useState<Record<string, unknown> | null>(null);
  const [state, setState] = useState("Loading");
  const [dirty, setDirty] = useState(false);
  const locked = !canEdit(profile.role);
  useUnsaved(dirty);
  useEffect(() => {
    db().from("site_settings").select("*").eq("id", 1).maybeSingle().then(({ data, error }) => {
      if (error) setState(error.message);
      else if (data) {
        setRow({ ...data, ...(data.draft || {}) });
        setState(data.has_unpublished_changes ? "Unpublished changes" : "Loaded");
      } else setState("Settings row is missing. Apply the seed first.");
    });
  }, []);
  if (!row) return <p className="text-sm">{state}</p>;

  const save = async (publish: boolean) => {
    const payload: Record<string, unknown> = {};
    fields.forEach((field) => { payload[field] = row[field]; });
    try {
      if (publish) await publishColumns("site_settings", 1, payload, { withStatus: false });
      else await saveDraft("site_settings", 1, payload);
      setDirty(false);
      setState(publish ? "Published" : "Draft saved");
    } catch (error) {
      setState(error instanceof Error ? error.message : "Save failed");
    }
  };

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h1>
      <SaveState state={locked ? "Read only" : state} />
      {fields.map((field) => (
        <Field key={field} label={field.replace(/_/g, " ")}>
          <input className={fieldClass} disabled={locked} value={String(row[field] ?? "")} onChange={(event) => { setRow({ ...row, [field]: event.target.value }); setDirty(true); setState("Unsaved changes"); }} />
        </Field>
      ))}
      {!locked && (
        <div className="flex gap-2">
          <Button tone="light" onClick={() => save(false)}>Save draft</Button>
          <Button onClick={() => save(true)}>Publish</Button>
        </div>
      )}
    </div>
  );
}

export function NavAdmin({ profile, placement, title }: { profile: Profile; placement: string; title: string }) {
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const [state, setState] = useState("");
  const locked = !canEdit(profile.role);
  const load = () => db().from("nav_links").select("*").eq("placement", placement).order("sort_order").then(({ data }) => setRows(data || []));
  useEffect(() => { load(); }, [placement]);

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h1>
      <p className="text-sm text-neutral-500">Links stay on the existing routes. New routes cannot be created here. Order and visibility can be changed.</p>
      {state && <SaveState state={state} />}
      {rows.map((row, index) => (
        <div key={String(row.id)} className="grid gap-2 rounded-lg border border-black/10 bg-white p-3 md:grid-cols-[1fr_1fr_auto_auto]">
          <input className={fieldClass} aria-label={`${title} label ${index}`} disabled={locked} value={String(row.label || "")} onChange={(event) => {
            const next = rows.slice();
            next[index] = { ...row, label: event.target.value };
            setRows(next);
          }} />
          <select className={fieldClass} aria-label={`${title} url ${index}`} disabled={locked} value={String(row.href)} onChange={(event) => {
            const next = rows.slice();
            next[index] = { ...row, href: event.target.value };
            setRows(next);
          }}>
            {routes.map((route) => <option key={route}>{route}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" aria-label={`${title} visible ${index}`} disabled={locked} checked={row.visible !== false} onChange={(event) => {
              const next = rows.slice();
              next[index] = { ...row, visible: event.target.checked };
              setRows(next);
            }} /> Visible
          </label>
          <div className="flex gap-2">
            {!locked && <Button tone="light" disabled={index === 0} onClick={() => {
              const next = rows.slice();
              [next[index - 1], next[index]] = [next[index], next[index - 1]];
              setRows(next);
            }}>Up</Button>}
            {!locked && <Button tone="light" disabled={index === rows.length - 1} onClick={() => {
              const next = rows.slice();
              [next[index + 1], next[index]] = [next[index], next[index + 1]];
              setRows(next);
            }}>Down</Button>}
            {!locked && <Button onClick={async () => {
              await Promise.all(rows.map((item, itemIndex) => publishColumns("nav_links", String(item.id), {
                label: item.label,
                href: item.href,
                visible: item.visible !== false,
                sort_order: itemIndex,
              })));
              setState("Published");
              load();
            }}>Publish</Button>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SeoAdmin({ profile, global = false }: { profile: Profile; global?: boolean }) {
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const [state, setState] = useState("");
  const locked = !canEdit(profile.role);
  useEffect(() => {
    db().from("page_seo").select("*, og:assets!page_seo_og_asset_id_fkey(public_url)").order("path").then(({ data }) => setRows(data || []));
  }, []);
  const visible = global ? rows.filter((row) => row.path === "/") : rows;

  const save = async (row: Record<string, unknown>) => {
    try {
      await publishColumns("page_seo", String(row.path), {
        title: row.title,
        description: row.description,
        canonical: row.canonical,
        indexable: row.indexable !== false,
        og_asset_id: row.og_asset_id || null,
      }, { idColumn: "path", withStatus: false });
      setState(`Published ${row.path}`);
    } catch (error) {
      setState(error instanceof Error ? error.message : "Save failed");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">{global ? "Global SEO" : "Page SEO"}</h1>
      {state && <SaveState state={state} />}
      {visible.map((row, index) => (
        <div key={String(row.path)} className="space-y-2 rounded-lg border border-black/10 bg-white p-4">
          <p className="text-sm font-medium">{String(row.path)}</p>
          <input className={fieldClass} disabled={locked} value={String(row.title || "")} onChange={(event) => {
            const next = rows.slice();
            const real = rows.findIndex((item) => item.path === row.path);
            next[real] = { ...row, title: event.target.value };
            setRows(next);
          }} />
          <textarea className={fieldClass} disabled={locked} value={String(row.description || "")} onChange={(event) => {
            const next = rows.slice();
            const real = rows.findIndex((item) => item.path === row.path);
            next[real] = { ...row, description: event.target.value };
            setRows(next);
          }} />
          <input className={fieldClass} disabled={locked} value={String(row.canonical || "")} onChange={(event) => {
            const next = rows.slice();
            const real = rows.findIndex((item) => item.path === row.path);
            next[real] = { ...row, canonical: event.target.value };
            setRows(next);
          }} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" aria-label={`Indexable ${row.path}`} disabled={locked} checked={row.indexable !== false} onChange={(event) => {
              const next = rows.slice();
              const real = rows.findIndex((item) => item.path === row.path);
              next[real] = { ...row, indexable: event.target.checked };
              setRows(next);
            }} /> Indexable
          </label>
          <AssetPicker
            label={`OG image ${row.path}`}
            folder="seo"
            disabled={locked}
            assetId={row.og_asset_id ? String(row.og_asset_id) : ""}
            previewUrl={(row.og as { public_url?: string } | null)?.public_url || null}
            onChange={(asset) => {
              const next = rows.slice();
              const real = rows.findIndex((item) => item.path === row.path);
              next[real] = { ...row, og_asset_id: asset.id, og: { public_url: asset.public_url } };
              setRows(next);
            }}
          />
          {!locked && <Button onClick={() => save(rows.find((item) => item.path === row.path) || row)}>Publish</Button>}
          <span className="hidden">{index}</span>
        </div>
      ))}
    </div>
  );
}

export function MediaAdmin({ profile, folder }: { profile: Profile; folder?: string }) {
  const [rows, setRows] = useState<AssetRow[]>([]);
  const [state, setState] = useState("");
  const request = useRef(0);
  const locked = !canEdit(profile.role);
  const load = () => {
    const current = ++request.current;
    db().from("assets").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      if (current !== request.current) return;
      const all = (data || []) as AssetRow[];
      setRows(folder ? all.filter((asset) => asset.storage_path.includes(`/${folder}/`) || asset.storage_path.includes(`${folder}/`)) : all);
    });
  };
  useEffect(() => { load(); }, [folder]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">{folder ? `${folder} images` : "Website images"}</h1>
      {state && <Notice>{state}</Notice>}
      {!locked && (
        <input type="file" accept="image/*" onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          try {
            await uploadAsset(file, folder || "site");
            setState("Uploaded. The original file was not overwritten.");
            load();
          } catch (error) {
            setState(error instanceof Error ? error.message : "Upload failed");
          }
        }} />
      )}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {rows.map((asset) => (
          <div key={asset.id} className="rounded-lg border border-black/10 bg-white p-2">
            <img src={asset.public_url} alt={asset.alt_text || ""} className="h-28 w-full object-contain bg-neutral-100" />
            <p className="mt-2 truncate text-xs">{asset.filename}</p>
            <input className={`${fieldClass} mt-2`} aria-label={`Alt text ${asset.filename}`} disabled={locked} defaultValue={asset.alt_text || ""} placeholder="Alt text" onBlur={async (event) => {
              await db().from("assets").update({ alt_text: event.target.value }).eq("id", asset.id);
            }} />
            <input className={`${fieldClass} mt-2`} aria-label={`Caption ${asset.filename}`} disabled={locked} defaultValue={asset.caption || ""} placeholder="Caption" onBlur={async (event) => {
              await db().from("assets").update({ caption: event.target.value }).eq("id", asset.id);
            }} />
            {!locked && (
              <label className="mt-2 block text-xs underline">
                Replace
                <input type="file" accept="image/*" className="hidden" aria-label={`Replace ${asset.filename}`} onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  try {
                    await replaceAssetFile(asset, file);
                    setState("Replaced with a new file. The previous stored file was removed.");
                    load();
                  } catch (error) {
                    setState(error instanceof Error ? error.message : "Replace failed");
                  }
                }} />
              </label>
            )}
            {!locked && <button className="mt-2 text-xs text-red-700" onClick={async () => {
              if (!window.confirm("Delete this media record? Seeded public files stay on the site.")) return;
              try {
                await deleteAsset(asset);
                load();
              } catch (error) {
                setState(error instanceof Error ? error.message : "Delete failed. The file may still be in use.");
              }
            }}>Delete</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function UsersAdmin({ profile }: { profile: Profile }) {
  const [rows, setRows] = useState<Profile[]>([]);
  const [state, setState] = useState("");
  useEffect(() => {
    db().from("profiles").select("*").order("created_at").then(({ data, error }) => {
      if (error) setState(error.message);
      else setRows((data || []) as Profile[]);
    });
  }, []);
  if (profile.role !== "super_admin") return <Notice>Only a super admin can manage users and roles.</Notice>;

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">Users and roles</h1>
      {state && <Notice>{state}</Notice>}
      {rows.map((row) => (
        <div key={row.id} className="grid items-center gap-2 rounded-lg border border-black/10 bg-white p-3 md:grid-cols-[1fr_180px_auto]">
          <div>
            <p className="text-sm font-medium">{row.display_name || row.email}</p>
            <p className="text-xs text-neutral-500">{row.email}</p>
          </div>
          <select className={fieldClass} value={row.role} onChange={async (event) => {
            const role = event.target.value;
            if (row.id === profile.id && role !== "super_admin") {
              setState("You cannot remove your own super admin role from this screen.");
              return;
            }
            const { error } = await db().from("profiles").update({ role, active: row.active }).eq("id", row.id);
            setState(error ? error.message : "Role updated");
            if (!error) setRows(rows.map((item) => item.id === row.id ? { ...item, role: role as Profile["role"] } : item));
          }}>
            <option value="super_admin">super_admin</option>
            <option value="editor">editor</option>
            <option value="viewer">viewer</option>
          </select>
          <label className="text-sm"><input type="checkbox" checked={row.active} onChange={async (event) => {
            const { error } = await db().from("profiles").update({ active: event.target.checked }).eq("id", row.id);
            setState(error ? error.message : "Updated");
          }} /> Active</label>
        </div>
      ))}
    </div>
  );
}

export function AuditAdmin() {
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  useEffect(() => {
    db().from("audit_log").select("action, entity_type, entity_id, created_at, user_id").order("created_at", { ascending: false }).limit(200).then(({ data }) => setRows(data || []));
  }, []);
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold tracking-[-0.03em]">Audit log</h1>
      <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
        {rows.map((row, index) => (
          <p key={index} className="border-b border-black/5 px-4 py-2 text-sm last:border-0">
            {String(row.action)} · {String(row.entity_type)} · {String(row.entity_id || "")} · {row.created_at ? new Date(String(row.created_at)).toLocaleString() : ""}
          </p>
        ))}
      </div>
    </div>
  );
}

export function FeaturedAdmin({ profile }: { profile: Profile }) {
  const [rows, setRows] = useState<Array<Record<string, unknown>>>([]);
  const [state, setState] = useState("");
  const locked = !canEdit(profile.role);
  useEffect(() => {
    db().from("projects").select("id, title, slug, featured, featured_order, visible, status").order("work_order").then(({ data }) => setRows(data || []));
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-[-0.03em]">Featured work</h1>
      <p className="text-sm text-neutral-500">Choose which published projects appear on the homepage and set their order.</p>
      {state && <SaveState state={state} />}
      {rows.map((row, index) => (
        <div key={String(row.id)} className="grid items-center gap-3 rounded-lg border border-black/10 bg-white p-3 md:grid-cols-[1fr_120px_auto]">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" disabled={locked} checked={Boolean(row.featured)} onChange={(event) => {
              const next = rows.slice();
              next[index] = { ...row, featured: event.target.checked };
              setRows(next);
            }} />
            {String(row.title)}
          </label>
          <input className={fieldClass} disabled={locked} value={String(row.featured_order ?? "")} onChange={(event) => {
            const next = rows.slice();
            next[index] = { ...row, featured_order: event.target.value };
            setRows(next);
          }} />
          {!locked && <Button onClick={async () => {
            await saveDraft("projects", String(row.id), {
              featured: row.featured,
              featured_order: row.featured_order === "" ? null : Number(row.featured_order),
            });
            setState("Draft saved. Publish the project to make the order public.");
          }}>Save draft</Button>}
        </div>
      ))}
    </div>
  );
}
