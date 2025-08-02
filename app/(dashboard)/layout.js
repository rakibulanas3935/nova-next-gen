import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "../context/userContext";
import DashboardSidebar from "./component/DashboardSideBar";
import { EventProvider } from "../context/eventContext";
import { BlogProvider } from "../context/blogContext";
import { ProjectProvider } from "../context/projectContext";
import { GalleryProvider } from "../context/galleryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard | NovaNextGen",
  description: "Dashboard area of NovaNextGen",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <EventProvider>
          <BlogProvider>
            <ProjectProvider>
              <GalleryProvider>
                <body
                  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden text-white">
                    <DashboardSidebar />
                    <div className="lg:ml-64">
                      {children}
                    </div>
                  </div>
                  <ToastContainer />
                </body>
              </GalleryProvider>
            </ProjectProvider>
          </BlogProvider>
        </EventProvider>
      </UserProvider>
    </html>
  );
}
