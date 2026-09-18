import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCurrentUser } from "@/lib/auth";

export default async function SiteLayout({ children }) {
  const user = await getCurrentUser();
  return (
    <>
      <Navbar user={user} />
      <main className="min-h-dvh">{children}</main>
      <Footer />
    </>
  );
}
