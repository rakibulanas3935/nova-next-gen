import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { ToastContainer } from "react-toastify";
import { UserProvider } from "../context/userContext";

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
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >

          {children}
          <ToastContainer />
        </body>
      </UserProvider>
    </html>
  );
}
