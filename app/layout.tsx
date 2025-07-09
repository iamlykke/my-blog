import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { InfoPanel } from "@/components/InfoPanel";

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
    <html lang="en" data-theme="dark" className="min-h-screen">
      <body
        className={`${roboto.variable} min-h-screen bg-base-200 antialiased`}
      >
        <div className="w-full max-w-[1920px] mx-auto flex min-h-screen bg-base-200">
          <Sidebar />
          <main className="flex-1 px-4 md:px-8 py-6 overflow-y-auto bg-base-100">
            <Header />
            <div className="mt-7 max-w-[768px] mx-auto">{children}</div>
            <Footer />
          </main>
          <InfoPanel />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
