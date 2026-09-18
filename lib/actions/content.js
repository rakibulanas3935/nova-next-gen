"use server";

import { run, authed, fields } from "./_run";

const BLOG_TAGS = ["blogs"];
const EVENT_TAGS = ["events"];
const LEARN_TAGS = ["learn"];

// ---- uploads --------------------------------------------------------------
export async function uploadImage(formData) {
  const file = formData.get("image");
  if (!file || !file.size) return { ok: false, message: "Choose an image first" };
  const fd = new FormData();
  fd.append("image", file);
  const res = await run(() => authed("/all/upload-image", { method: "POST", body: fd }));
  return res.ok ? { ok: true, url: res.data?.url ?? null, ...res } : res;
}

// ---- blog -----------------------------------------------------------------
const BLOG_FIELDS = ["title", "description", "blogImage", "dateTime", "tags", "isPublished"];

export async function createBlog(formData) {
  const body = fields(formData, BLOG_FIELDS);
  return run(() => authed("/blogs", { method: "POST", body: JSON.stringify(body) }), { tags: BLOG_TAGS, paths: ["/blog", "/"] });
}

export async function updateBlog(id, formData) {
  const body = fields(formData, BLOG_FIELDS);
  return run(() => authed(`/blogs/${id}`, { method: "PATCH", body: JSON.stringify(body) }), { tags: BLOG_TAGS, paths: ["/blog", "/"] });
}

export async function deleteBlog(id) {
  return run(() => authed(`/blogs/${id}`, { method: "DELETE" }), { tags: BLOG_TAGS, paths: ["/blog", "/"] });
}

// ---- events ---------------------------------------------------------------
const EVENT_FIELDS = ["title", "description", "eventTime", "endTime", "location", "meetLink", "type", "membersOnly", "poster"];

const eventForm = (formData) => {
  const fd = new FormData();
  for (const k of EVENT_FIELDS) if (formData.has(k)) fd.append(k, formData.getAll(k).at(-1));
  const file = formData.get("posterFile");
  if (file && file.size) fd.append("poster", file);
  return fd;
};

export async function createEvent(formData) {
  return run(() => authed("/events", { method: "POST", body: eventForm(formData) }), { tags: EVENT_TAGS, paths: ["/events", "/"] });
}

export async function updateEvent(id, formData) {
  return run(() => authed(`/events/${id}`, { method: "PATCH", body: eventForm(formData) }), { tags: EVENT_TAGS, paths: ["/events", "/"] });
}

export async function deleteEvent(id) {
  return run(() => authed(`/events/${id}`, { method: "DELETE" }), { tags: EVENT_TAGS, paths: ["/events", "/"] });
}

// ---- learn ----------------------------------------------------------------
const LEARN_FIELDS = ["title", "description", "level", "category", "order"];

export async function createLearn(formData) {
  const body = fields(formData, LEARN_FIELDS);
  return run(() => authed("/learn", { method: "POST", body: JSON.stringify(body) }), { tags: LEARN_TAGS, paths: ["/learn"] });
}

export async function updateLearn(id, formData) {
  const body = fields(formData, LEARN_FIELDS);
  return run(() => authed(`/learn/${id}`, { method: "PATCH", body: JSON.stringify(body) }), { tags: LEARN_TAGS, paths: ["/learn"] });
}

export async function deleteLearn(id) {
  return run(() => authed(`/learn/${id}`, { method: "DELETE" }), { tags: LEARN_TAGS, paths: ["/learn"] });
}

// ---- contact (public) -----------------------------------------------------
export async function sendContact(formData) {
  const body = fields(formData, ["name", "email", "message", "website"]);
  return run(() => authed("/message", { method: "POST", body: JSON.stringify(body) }));
}
