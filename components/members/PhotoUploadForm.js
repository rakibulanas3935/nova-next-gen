"use client";

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Card } from "@/components/ui/primitives";
import Button from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/form";
import { useActionForm } from "@/components/forms/useActionForm";
import { uploadGallery } from "@/lib/actions/community";

const MAX = 10;

export default function PhotoUploadForm({ backHref = "/members" }) {
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
  const { onSubmit, loading } = useActionForm(uploadGallery, { redirectTo: backHref });

  const add = (list) => {
    const next = [...files, ...Array.from(list)].filter((f) => f.type.startsWith("image/")).slice(0, MAX);
    setFiles(next);
    // keep the real input in sync so FormData picks up the files
    const dt = new DataTransfer();
    next.forEach((f) => dt.items.add(f));
    if (inputRef.current) inputRef.current.files = dt.files;
  };
  const remove = (i) => add(files.filter((_, idx) => idx !== i));

  return (
    <Card as="form" onSubmit={onSubmit} className="space-y-5 p-6">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); add(e.dataTransfer.files); }}
        className="rounded-xl border border-dashed border-line-strong bg-white/[0.02] p-6 text-center"
      >
        <ImagePlus className="mx-auto h-8 w-8 text-fg-subtle" />
        <p className="mt-3 text-sm text-fg-muted">Drag photos here or</p>
        <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={() => inputRef.current?.click()}>Choose files</Button>
        <input ref={inputRef} type="file" name="images" accept="image/*" multiple className="hidden" onChange={(e) => add(e.target.files)} />
        <p className="mt-3 text-xs text-fg-subtle">{files.length}/{MAX} selected</p>
      </div>

      {files.length > 0 && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="relative aspect-square overflow-hidden rounded-lg border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={URL.createObjectURL(f)} alt="" className="h-full w-full object-cover" />
              <button type="button" onClick={() => remove(i)} className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-space-950/80 text-white" aria-label="Remove">
                <X className="h-3 w-3" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Field label="Caption" htmlFor="caption" hint="Optional — object, gear, location.">
        <Input id="caption" name="caption" maxLength={200} placeholder="Orion Nebula, 8-inch Dob, phone at the eyepiece" />
      </Field>

      <div className="flex gap-3">
        <Button type="submit" loading={loading} disabled={!files.length}>Upload {files.length || ""} photo{files.length === 1 ? "" : "s"}</Button>
        <Button href={backHref} variant="ghost">Cancel</Button>
      </div>
    </Card>
  );
}
