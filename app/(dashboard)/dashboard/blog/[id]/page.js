import { notFound } from "next/navigation";
import { apiGet } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/ui";
import { BlogForm } from "@/components/forms/ContentForms";

export const metadata = { title: "Edit post" };

export default async function EditBlogFormPage({ params }) {
  const { id } = await params;
  const res = await apiGet(`/blogs/${id}`, { auth: true });
  const item = res?.data?.blog;
  if (!item) notFound();
  return (
    <>
      <PageHeader title="Edit post" description={item.title} />
      <BlogForm blog={item} />
    </>
  );
}
