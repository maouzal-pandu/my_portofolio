import type { Metadata } from "next";
import { Geist, Geist_Mono, Cascadia_Code, Rubik } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cascadiaCode = Cascadia_Code({
  variable: "--font-cascadia-code",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const neueMachina = localFont({
  src: "fonts/NeueMachina-Ultrabold.otf",
  variable: "--font-neue-machina",
});

export const metadata: Metadata = {
  title: "Maouzal Portfolio",
  // description: "Portofolio orang sigma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cascadiaCode.variable} ${neueMachina.variable}
      ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
