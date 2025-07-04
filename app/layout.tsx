import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import NowPlaying from "@/components/NowPlaying";
import "./globals.css";

const roboto = Roboto({
  variable: "--roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My blog",
  description: "Lykke",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className="bg-base-200 h-full">
      <body
        className={`${roboto.variable} flex flex-col h-full max-w-[768px] container mx-auto px-4 pt-4 antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <NowPlaying />
        <Analytics />
      </body>
    </html>
  );
}
