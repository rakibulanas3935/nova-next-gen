import { notFound } from "next/navigation";
import { apiGet } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/ui";
import { LearnForm } from "@/components/forms/ContentForms";

export const metadata = { title: "Edit lesson" };

export default async function EditLearnFormPage({ params }) {
  const { id } = await params;
  const res = await apiGet(`/learn/${id}`, { auth: true });
  const item = res?.data?.lesson;
  if (!item) notFound();
  return (
    <>
      <PageHeader title="Edit lesson" description={item.title} />
      <LearnForm lesson={item} />
    </>
  );
}
