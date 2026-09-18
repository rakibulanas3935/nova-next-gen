"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, X, Trash2, ShieldCheck, Shield, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/form";
import { Card } from "@/components/ui/primitives";
import { approveUser, rejectUser, setUserRole, deleteUser, createUser } from "@/lib/actions/community";
import { useActionForm } from "@/components/forms/useActionForm";

function useRun() {
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const run = async (key, fn, confirm) => {
    if (confirm && !window.confirm(confirm)) return;
    setBusy(key);
    const res = await fn();
    setBusy("");
    res.ok ? toast.success(res.message) : toast.error(res.message);
    if (res.ok) router.refresh();
  };
  return { busy, run };
}

export function MemberRowActions({ user, me }) {
  const { busy, run } = useRun();
  const isMe = user._id === me._id;
  return (
    <div className="flex flex-wrap justify-end gap-1.5">
      {user.status !== "approved" && (
        <Button size="sm" loading={busy === "approve"} onClick={() => run("approve", () => approveUser(user._id))}><Check className="h-4 w-4" /> Approve</Button>
      )}
      {user.status === "pending" && (
        <Button size="sm" variant="danger" loading={busy === "reject"} onClick={() => run("reject", () => rejectUser(user._id), `Decline ${user.name}'s application?`)}><X className="h-4 w-4" /> Decline</Button>
      )}
      {user.status === "approved" && !isMe && (
        <Button
          size="sm"
          variant="secondary"
          loading={busy === "role"}
          title={user.role === "admin" ? "Make member" : "Make admin"}
          onClick={() => run("role", () => setUserRole(user._id, user.role === "admin" ? "member" : "admin"), `${user.role === "admin" ? "Remove admin rights from" : "Give admin rights to"} ${user.name}?`)}
        >
          {user.role === "admin" ? <Shield className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
          {user.role === "admin" ? "Demote" : "Make admin"}
        </Button>
      )}
      {!isMe && (
        <Button size="icon" variant="ghost" title="Delete" loading={busy === "delete"} onClick={() => run("delete", () => deleteUser(user._id), `Permanently delete ${user.name}? Their projects and photos stay.`)}>
          <Trash2 className="h-4 w-4 text-red-300" />
        </Button>
      )}
    </div>
  );
}

export function CreateUserForm() {
  const [open, setOpen] = useState(false);
  const { onSubmit, loading } = useActionForm(createUser, { onSuccess: () => setOpen(false) });
  if (!open) {
    return <Button size="sm" variant="secondary" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add user directly</Button>;
  }
  return (
    <Card as="form" onSubmit={onSubmit} className="mb-6 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
      <Field label="Name" required><Input name="name" required /></Field>
      <Field label="Username" required><Input name="userName" required pattern="[A-Za-z0-9_.]+" minLength={3} /></Field>
      <Field label="Email" required><Input name="email" type="email" required /></Field>
      <Field label="Temporary password" required><Input name="password" type="text" required minLength={8} /></Field>
      <Field label="Role"><Select name="role" defaultValue="member"><option value="member">Member</option><option value="admin">Admin</option></Select></Field>
      <input type="hidden" name="passwordConfirm" value="" />
      <div className="flex items-end gap-2">
        <Button type="submit" loading={loading}>Create (approved)</Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
      <p className="text-xs text-fg-subtle sm:col-span-2 lg:col-span-3">The account is created already approved and an email tells them to log in and change the password.</p>
    </Card>
  );
}
