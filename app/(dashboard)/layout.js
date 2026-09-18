import { requireAdmin } from "@/lib/auth";
import { apiGet } from "@/lib/api";
import Sidebar from "@/components/dashboard/Sidebar";
import PageFx from "@/components/fx/PageFx";

export const metadata = { title: { default: "Dashboard", template: "%s · Admin" }, robots: { index: false, follow: false } };

export default async function DashboardLayout({ children }) {
  const user = await requireAdmin();
  const stats = await apiGet("/dashboard", { auth: true });
  return (
    <div className="min-h-dvh">
      <Sidebar user={user} counts={stats?.data?.totals || {}} />
      <main className="relative isolate px-4 py-6 sm:px-6 lg:ml-60 lg:px-10 lg:py-10">
        <PageFx variant="constellation" className="opacity-50" />
        {children}
      </main>
    </div>
  );
}
