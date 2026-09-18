"use client";

import { useState } from "react";
import { Card } from "@/components/ui/primitives";
import Button from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/form";
import { useActionForm } from "@/components/forms/useActionForm";
import { updateProfile, changePassword } from "@/lib/actions/community";

export function ProfileForm({ user }) {
  const [preview, setPreview] = useState(user.photo || "");
  const { onSubmit, loading } = useActionForm(updateProfile);
  return (
    <Card as="form" onSubmit={onSubmit} className="space-y-5 p-6">
      <h2 className="text-lg font-semibold text-white">Profile</h2>
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-star-500/15 text-xl font-semibold text-star-300">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            user.name?.[0]
          )}
        </div>
        <label className="cursor-pointer text-sm text-sky-400 hover:underline">
          Change photo
          <input type="file" name="photo" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && setPreview(URL.createObjectURL(e.target.files[0]))} />
        </label>
      </div>
      <Field label="Name" htmlFor="p-name">
        <Input id="p-name" name="name" defaultValue={user.name} required maxLength={80} />
      </Field>
      <Field label="Bio" htmlFor="p-bio" hint="Shown on the team/members list.">
        <Textarea id="p-bio" name="bio" rows={3} defaultValue={user.bio} maxLength={300} />
      </Field>
      <Field label="Interests" htmlFor="p-int">
        <Input id="p-int" name="interests" defaultValue={user.interests} maxLength={200} />
      </Field>
      <Button type="submit" loading={loading}>Save profile</Button>
    </Card>
  );
}

export function PasswordForm() {
  const { onSubmit, loading } = useActionForm(changePassword, { onSuccess: () => document.getElementById("pw-form")?.reset() });
  return (
    <Card as="form" id="pw-form" onSubmit={onSubmit} className="space-y-5 p-6">
      <h2 className="text-lg font-semibold text-white">Change password</h2>
      <Field label="Current password" htmlFor="cur">
        <Input id="cur" name="currentPassword" type="password" autoComplete="current-password" required />
      </Field>
      <Field label="New password" htmlFor="new" hint="At least 8 characters">
        <Input id="new" name="newPassword" type="password" autoComplete="new-password" required minLength={8} />
      </Field>
      <Field label="Confirm new password" htmlFor="new2">
        <Input id="new2" name="newPasswordConfirm" type="password" autoComplete="new-password" required minLength={8} />
      </Field>
      <Button type="submit" variant="secondary" loading={loading}>Update password</Button>
    </Card>
  );
}
