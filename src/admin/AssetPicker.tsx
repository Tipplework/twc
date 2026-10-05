import { useEffect, useState } from "react";
import { db, uploadAsset, type AssetRow } from "@/admin/api";
import { fieldClass } from "@/admin/ui";

type Picked = Pick<AssetRow, "id" | "public_url" | "alt_text">;

export function AssetPicker({
  label,
  folder,
  assetId,
  previewUrl,
  disabled,
  onChange,
}: {
  label: string;
  folder: string;
  assetId?: string | null;
  previewUrl?: string | null;
  disabled?: boolean;
  onChange: (asset: Picked) => void;
}) {
  const [assets, setAssets] = useState<AssetRow[]>([]);
  const [alt, setAlt] = useState("");

  useEffect(() => {
    db()
      .from("assets")
      .select("id, storage_path, public_url, filename, alt_text, caption, mime_type, width, height, file_size, created_at")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => setAssets((data || []) as AssetRow[]));
  }, []);

  useEffect(() => {
    setAlt(assets.find((asset) => asset.id === assetId)?.alt_text || "");
  }, [assetId, assets]);

  return (
    <div className="space-y-2" data-asset-picker={label}>
      <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">{label}</p>
      {previewUrl ? <img src={previewUrl} alt="" className="h-20 max-w-full object-contain" /> : null}
      <select
        className={fieldClass}
        aria-label={`${label} existing media`}
        disabled={disabled}
        value={assetId || ""}
        onChange={(event) => {
          const asset = assets.find((item) => item.id === event.target.value);
          if (asset) onChange(asset);
        }}
      >
        <option value="">Choose existing media</option>
        {assets.map((asset) => (
          <option key={asset.id} value={asset.id}>{asset.filename}</option>
        ))}
      </select>
      {!disabled && (
        <input
          aria-label={`${label} upload`}
          type="file"
          accept="image/*"
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const asset = await uploadAsset(file, folder, alt);
            setAssets((current) => [asset, ...current]);
            onChange(asset);
          }}
        />
      )}
      <label className="block">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-neutral-500">Alt text</span>
        <input
          className={fieldClass}
          aria-label={`${label} alt text`}
          disabled={disabled || !assetId}
          value={alt}
          onChange={(event) => setAlt(event.target.value)}
          onBlur={async () => {
            if (!assetId) return;
            await db().from("assets").update({ alt_text: alt }).eq("id", assetId);
            const asset = assets.find((item) => item.id === assetId);
            if (asset) onChange({ ...asset, alt_text: alt });
          }}
        />
      </label>
    </div>
  );
}
