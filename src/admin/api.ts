import { supabase } from "@/lib/cms/client";

export type Role = "super_admin" | "editor" | "viewer";

export type Profile = {
  id: string;
  email: string;
  display_name: string | null;
  role: Role;
  active: boolean;
};

export const routes = ["/", "/about", "/work", "/services", "/contact", "/privacy-policy", "/terms-of-service"];

export function db() {
  if (!supabase) throw new Error("Supabase is not configured.");
  return supabase;
}

export function canEdit(role?: Role | null) {
  return role === "super_admin" || role === "editor";
}

export async function uploadAsset(file: File, folder: string, alt = "") {
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const storagePath = `${folder}/${crypto.randomUUID()}-${safe}`;
  const size = await imageSize(file);
  const { error } = await db().storage.from("website").upload(storagePath, file, {
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const { data: pub } = db().storage.from("website").getPublicUrl(storagePath);
  const { data, error: insertError } = await db()
    .from("assets")
    .insert({
      storage_path: storagePath,
      public_url: pub.publicUrl,
      filename: file.name,
      mime_type: file.type,
      file_size: file.size,
      width: size?.width ?? null,
      height: size?.height ?? null,
      alt_text: alt,
    })
    .select("*")
    .single();
  if (insertError) throw insertError;
  return data as AssetRow;
}

export type AssetRow = {
  id: string;
  storage_path: string;
  public_url: string;
  filename: string;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  file_size: number | null;
  alt_text: string | null;
  caption: string | null;
  created_at: string;
};

export async function deleteAsset(asset: AssetRow) {
  if (!asset.storage_path.startsWith("/")) {
    const { error } = await db().storage.from("website").remove([asset.storage_path]);
    if (error) throw error;
  }
  const { error } = await db().from("assets").delete().eq("id", asset.id);
  if (error) throw error;
}

export async function replaceAssetFile(asset: AssetRow, file: File) {
  const folder = asset.storage_path.split("/")[0] || "site";
  const uploaded = await uploadAsset(file, folder, asset.alt_text || "");
  const { error: clearError } = await db().from("assets").delete().eq("id", uploaded.id);
  if (clearError) throw clearError;
  const { error } = await db()
    .from("assets")
    .update({
      storage_path: uploaded.storage_path,
      public_url: uploaded.public_url,
      filename: uploaded.filename,
      mime_type: uploaded.mime_type,
      file_size: uploaded.file_size,
      width: uploaded.width,
      height: uploaded.height,
    })
    .eq("id", asset.id);
  if (error) throw error;
  if (!asset.storage_path.startsWith("/")) {
    await db().storage.from("website").remove([asset.storage_path]);
  }
  return { ...asset, ...uploaded, id: asset.id };
}

function imageSize(file: File) {
  return new Promise<{ width: number; height: number } | null>((resolve) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
      URL.revokeObjectURL(url);
    };
    image.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(url);
    };
    image.src = url;
  });
}

export async function saveDraft(table: string, id: string | number, patch: Record<string, unknown>, idColumn = "id") {
  const { data, error } = await db().from(table).select("draft").eq(idColumn, id).maybeSingle();
  if (error) throw error;
  const draft = { ...((data?.draft as Record<string, unknown>) || {}), ...patch };
  const { error: updateError } = await db()
    .from(table)
    .update({ draft, has_unpublished_changes: true })
    .eq(idColumn, id);
  if (updateError) throw updateError;
}

export async function publishColumns(
  table: string,
  id: string | number,
  columns: Record<string, unknown>,
  options?: { idColumn?: string; withStatus?: boolean }
) {
  const idColumn = options?.idColumn || "id";
  const payload = {
    ...columns,
    draft: null,
    has_unpublished_changes: false,
    ...(options?.withStatus === false ? {} : { status: "published" }),
  };
  const { error } = await db().from(table).update(payload).eq(idColumn, id);
  if (error) throw error;
}

export async function unpublish(table: string, id: string) {
  const { error } = await db().from(table).update({ status: "draft" }).eq("id", id);
  if (error) throw error;
}
