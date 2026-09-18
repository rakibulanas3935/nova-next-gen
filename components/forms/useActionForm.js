"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/** Submits a <form> to a server action, toasts the result, optionally redirects. */
export function useActionForm(action, { redirectTo, onSuccess } = {}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    // datetime-local values carry no timezone; convert in the browser so the
    // server (UTC) stores the instant the admin actually meant.
    for (const el of e.currentTarget.elements) {
      if (el.type === "datetime-local" && el.name && el.value) fd.set(el.name, new Date(el.value).toISOString());
    }
    const res = await action(fd);
    setLoading(false);
    if (res.ok) {
      toast.success(res.message);
      onSuccess?.(res);
      if (redirectTo) {
        router.push(typeof redirectTo === "function" ? redirectTo(res) : redirectTo);
        router.refresh();
      }
    } else {
      toast.error(res.message);
    }
  };

  return { onSubmit, loading };
}
