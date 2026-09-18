"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import clsx from "clsx";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Bold, Italic, Strikethrough, Heading2, Heading3, List, ListOrdered, Quote, Code2, Minus, Link2, ImagePlus, Undo2, Redo2,
} from "lucide-react";
import { uploadImage } from "@/lib/actions/content";

function ToolButton({ active, onClick, title, children, disabled }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={clsx("flex h-8 w-8 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40 ring-focus", active && "bg-star-500/20 text-star-300")}
    >
      {children}
    </button>
  );
}

/**
 * Tiptap editor that mirrors its HTML into a hidden input so it can be
 * submitted with a plain <form> / server action.
 */
export default function RichEditor({ name = "description", initialHtml = "", placeholder = "Write something worth reading…" }) {
  const [html, setHtml] = useState(initialHtml);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: "https" }),
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: initialHtml,
    editorProps: {
      attributes: { class: "prose prose-invert prose-sky max-w-none px-4 py-3 focus:outline-none" },
    },
    onUpdate: ({ editor: e }) => setHtml(e.getHTML()),
  });

  const setLink = () => {
    const prev = editor.getAttributes("link").href || "";
    const url = window.prompt("Link URL", prev);
    if (url === null) return;
    if (url === "") return editor.chain().focus().extendMarkRange("link").unsetLink().run();
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = async (file) => {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    const res = await uploadImage(fd);
    setUploading(false);
    if (!res.ok || !res.url) return toast.error(res.message || "Upload failed");
    editor.chain().focus().setImage({ src: res.url, alt: file.name }).run();
  };

  if (!editor) return <div className="skeleton h-72 w-full" />;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white/[0.03] focus-within:border-sky-500/60">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-line bg-white/[0.02] p-1.5">
        <ToolButton title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></ToolButton>
        <ToolButton title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></ToolButton>
        <ToolButton title="Strike" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough className="h-4 w-4" /></ToolButton>
        <span className="mx-1 h-5 w-px bg-line" />
        <ToolButton title="Heading" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></ToolButton>
        <ToolButton title="Subheading" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></ToolButton>
        <ToolButton title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></ToolButton>
        <ToolButton title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></ToolButton>
        <ToolButton title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></ToolButton>
        <ToolButton title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code2 className="h-4 w-4" /></ToolButton>
        <ToolButton title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus className="h-4 w-4" /></ToolButton>
        <span className="mx-1 h-5 w-px bg-line" />
        <ToolButton title="Link" active={editor.isActive("link")} onClick={setLink}><Link2 className="h-4 w-4" /></ToolButton>
        <ToolButton title="Insert image" onClick={() => fileRef.current?.click()} disabled={uploading}><ImagePlus className="h-4 w-4" /></ToolButton>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { addImage(e.target.files?.[0]); e.target.value = ""; }} />
        <span className="ml-auto flex gap-0.5">
          <ToolButton title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}><Undo2 className="h-4 w-4" /></ToolButton>
          <ToolButton title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}><Redo2 className="h-4 w-4" /></ToolButton>
        </span>
      </div>
      <EditorContent editor={editor} />
      {uploading && <p className="border-t border-line px-4 py-2 text-xs text-fg-subtle">Uploading image…</p>}
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
