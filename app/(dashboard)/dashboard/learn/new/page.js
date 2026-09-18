import { PageHeader } from "@/components/dashboard/ui";
import { LearnForm } from "@/components/forms/ContentForms";

export const metadata = { title: "New lesson" };

export default function NewLearnFormPage() {
  return (
    <>
      <PageHeader title="New lesson" />
      <LearnForm />
    </>
  );
}
