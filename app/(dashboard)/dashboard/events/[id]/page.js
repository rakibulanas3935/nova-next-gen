import { notFound } from "next/navigation";
import { apiGet } from "@/lib/api";
import { PageHeader } from "@/components/dashboard/ui";
import { EventForm } from "@/components/forms/ContentForms";

export const metadata = { title: "Edit event" };

export default async function EditEventFormPage({ params }) {
  const { id } = await params;
  const res = await apiGet(`/events/${id}`, { auth: true });
  const item = res?.data?.event;
  if (!item) notFound();
  return (
    <>
      <PageHeader title="Edit event" description={item.title} />
      <EventForm event={item} />
    </>
  );
}
