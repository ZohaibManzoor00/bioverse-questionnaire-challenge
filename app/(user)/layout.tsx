import type { Metadata } from "next";
import { Navbar } from "../(root-login)/_components/navbar";

import localFont from "next/font/local";
import "../globals.css";

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

type QuestionnaireLayoutProps = {
  children: React.ReactNode;
};

export default function QuestionnaireLayout({
  children,
}: QuestionnaireLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
