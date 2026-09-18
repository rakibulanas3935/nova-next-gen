"use client";

import { useRef, useState } from "react";
import { ImagePlus, X, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/lib/actions/content";
import { Field } from "@/components/ui/form";

/**
 * Cover-image picker with preview.
 *
 * mode="url"  → uploads immediately to Cloudinary and stores the URL in a
 *               hidden input (`name`), for JSON endpoints like blogs.
 * mode="file" → keeps the File in a file input (`fileName`) that the server
 *               action forwards as multipart, for events/projects.
 */
export default function ImageField({ label = "Cover image", name = "image", fileName = "imageFile", mode = "file", initialUrl = "", hint }) {
  const [preview, setPreview] = useState(initialUrl);
  const [url, setUrl] = useState(initialUrl);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  const onPick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    if (mode === "url") {
      setBusy(true);
      const fd = new FormData();
      fd.append("image", file);
      const res = await uploadImage(fd);
      setBusy(false);
      if (!res.ok || !res.url) {
        toast.error(res.message || "Upload failed");
        setPreview(initialUrl);
        return;
      }
      setUrl(res.url);
    }
  };

  const clear = () => {
    setPreview("");
    setUrl("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <Field label={label} hint={hint || "JPEG, PNG or WEBP up to 8 MB."}>
      <div className="relative overflow-hidden rounded-xl border border-dashed border-line-strong bg-white/[0.03]">
        {preview ? (
          <div className="relative aspect-[16/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="h-full w-full object-cover" />
            {busy && <div className="absolute inset-0 flex items-center justify-center bg-space-950/60 text-sm text-fg"><UploadCloud className="mr-2 h-4 w-4 animate-bounce" /> Uploading…</div>}
            <button type="button" onClick={clear} className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-space-950/80 text-white hover:bg-space-950" aria-label="Remove image">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => fileRef.current?.click()} className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 text-sm text-fg-muted hover:text-white">
            <ImagePlus className="h-6 w-6" /> Choose an image
          </button>
        )}
        <input ref={fileRef} type="file" name={mode === "file" ? fileName : undefined} accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={onPick} />
        {mode === "url" && <input type="hidden" name={name} value={url} />}
      </div>
    </Field>
  );
}
