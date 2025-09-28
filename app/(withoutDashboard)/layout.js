import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { ToastContainer } from 'react-toastify';
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { UserProvider } from "../context/userContext";
import { EventProvider } from "../context/eventContext";
import { BlogProvider } from "../context/blogContext";
import { GalleryProvider } from "../context/galleryContext";
import { ProjectProvider } from "../context/projectContext";
import { LearnProvider } from "../context/learnContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Deep Sky Society",
  description: "Deep Sky Society is a vibrant astronomy club bringing together space enthusiasts, stargazers, and curious minds to explore the wonders of the universe through events, workshops, and stargazing sessions.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <link rel="icon" href="/logo.ico" sizes="any" />
        {/* For PNG version */}
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <UserProvider>
        <EventProvider>
          <BlogProvider>
            <ProjectProvider>
              <GalleryProvider>
                <LearnProvider>
                  <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                  >
                    <Navbar />
                    {children}
                    <Footer />
                    <ToastContainer />
                  </body>
                </LearnProvider>
              </GalleryProvider>
            </ProjectProvider>
          </BlogProvider>
        </EventProvider>
      </UserProvider>
    </html>
  );
}
