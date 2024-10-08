import type { Metadata } from "next";
import { Navbar } from "../_components/navbar";

import localFont from "next/font/local";
import "../globals.css";
import { AuthProvider } from "@/context/authContext";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 400 600 900",
});

export const metadata: Metadata = {
  title: "Zo's Bioverse Challenge",
  description:
    "Technical challenge from Bioverse. Solution from Zohaib Manzoor",
};

type AdminLayoutProps = {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
