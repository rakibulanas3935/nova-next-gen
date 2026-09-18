"use server";

import { run, authed, fields } from "./_run";

const PROJECT_TAGS = ["projects"];
const GALLERY_TAGS = ["gallery"];
const PROJECT_FIELDS = ["title", "description", "liveLink", "repoLink", "tags", "projectImage", "isFeatured", "isApproved"];

const projectForm = (formData) => {
  const fd = new FormData();
  for (const k of PROJECT_FIELDS) if (formData.has(k)) fd.append(k, formData.get(k));
  const file = formData.get("imageFile");
  if (file && file.size) fd.append("projectImage", file);
  return fd;
};

// ---- projects (member + admin) -------------------------------------------
export async function submitProject(formData) {
  return run(() => authed("/projects", { method: "POST", body: projectForm(formData) }), { tags: PROJECT_TAGS, paths: ["/projects", "/members", "/dashboard/projects"] });
}

export async function updateProject(id, formData) {
  return run(() => authed(`/projects/${id}`, { method: "PATCH", body: projectForm(formData) }), { tags: PROJECT_TAGS, paths: ["/projects", "/members", "/dashboard/projects"] });
}

export async function deleteProject(id) {
  return run(() => authed(`/projects/${id}`, { method: "DELETE" }), { tags: PROJECT_TAGS, paths: ["/projects", "/members", "/dashboard/projects"] });
}

export async function approveProject(id) {
  return run(() => authed(`/projects/${id}/approve`, { method: "PATCH" }), { tags: PROJECT_TAGS, paths: ["/projects", "/dashboard", "/dashboard/projects"] });
}

export async function rejectProject(id) {
  return run(() => authed(`/projects/${id}/reject`, { method: "DELETE" }), { tags: PROJECT_TAGS, paths: ["/dashboard", "/dashboard/projects"] });
}

export async function setProjectFeatured(id, featured) {
  return run(
    () => authed(`/projects/${id}`, { method: "PATCH", body: JSON.stringify({ isFeatured: featured }) }),
    { tags: PROJECT_TAGS, paths: ["/projects", "/", "/dashboard/projects"] }
  );
}

// ---- gallery ---------------------------------------------------------------
export async function uploadGallery(formData) {
  const files = formData.getAll("images").filter((f) => f && f.size);
  if (!files.length) return { ok: false, message: "Choose at least one photo" };
  const fd = new FormData();
  files.forEach((f) => fd.append("images", f));
  if (formData.get("caption")) fd.append("caption", formData.get("caption"));
  return run(() => authed("/gallery", { method: "POST", body: fd, timeout: 120000 }), { tags: GALLERY_TAGS, paths: ["/gallery", "/members", "/dashboard/gallery"] });
}

export async function approveGallery(id) {
  return run(() => authed(`/gallery/${id}/approve`, { method: "PATCH" }), { tags: GALLERY_TAGS, paths: ["/gallery", "/dashboard", "/dashboard/gallery"] });
}

export async function rejectGallery(id) {
  return run(() => authed(`/gallery/${id}/reject`, { method: "DELETE" }), { tags: GALLERY_TAGS, paths: ["/dashboard", "/dashboard/gallery"] });
}

export async function deleteGallery(id) {
  return run(() => authed(`/gallery/${id}`, { method: "DELETE" }), { tags: GALLERY_TAGS, paths: ["/gallery", "/members", "/dashboard/gallery"] });
}

// ---- users / membership ---------------------------------------------------
const USER_PATHS = ["/dashboard", "/dashboard/members", "/about"];

export async function approveUser(id) {
  return run(() => authed(`/users/${id}/approve`, { method: "PATCH" }), { tags: ["members"], paths: USER_PATHS });
}
export async function rejectUser(id) {
  return run(() => authed(`/users/${id}/reject`, { method: "PATCH" }), { tags: ["members"], paths: USER_PATHS });
}
export async function setUserRole(id, role) {
  return run(() => authed(`/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) }), { paths: USER_PATHS });
}
export async function deleteUser(id) {
  return run(() => authed(`/users/${id}`, { method: "DELETE" }), { tags: ["members"], paths: USER_PATHS });
}
export async function createUser(formData) {
  const body = fields(formData, ["name", "userName", "email", "password", "passwordConfirm", "role"]);
  return run(() => authed("/users", { method: "POST", body: JSON.stringify(body) }), { tags: ["members"], paths: USER_PATHS });
}

export async function updateProfile(formData) {
  const fd = new FormData();
  for (const k of ["name", "bio", "interests"]) if (formData.has(k)) fd.append(k, formData.get(k));
  const photo = formData.get("photo");
  if (photo && photo.size) fd.append("photo", photo);
  return run(() => authed("/users/profile", { method: "PATCH", body: fd }), { paths: ["/members", "/members/profile"] });
}

export async function changePassword(formData) {
  const body = fields(formData, ["currentPassword", "newPassword", "newPasswordConfirm"]);
  return run(() => authed("/users/change-password", { method: "PATCH", body: JSON.stringify(body) }));
}

// ---- messages -------------------------------------------------------------
export async function deleteMessage(id) {
  return run(() => authed(`/message/${id}`, { method: "DELETE" }), { paths: ["/dashboard/messages"] });
}
