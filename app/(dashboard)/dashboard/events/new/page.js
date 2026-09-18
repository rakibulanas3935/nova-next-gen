import { PageHeader } from "@/components/dashboard/ui";
import { EventForm } from "@/components/forms/ContentForms";

export const metadata = { title: "New event" };

export default function NewEventFormPage() {
  return (
    <>
      <PageHeader title="New event" />
      <EventForm />
    </>
  );
}
