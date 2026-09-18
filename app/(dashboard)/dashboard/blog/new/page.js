import { PageHeader } from "@/components/dashboard/ui";
import { BlogForm } from "@/components/forms/ContentForms";

export const metadata = { title: "New post" };

export default function NewBlogFormPage() {
  return (
    <>
      <PageHeader title="New post" />
      <BlogForm />
    </>
  );
}
