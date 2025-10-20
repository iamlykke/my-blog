import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
    <html lang="en" data-theme="light">
      <body className={`${roboto.variable} antialiased`}>
        <div className="w-full max-w-[768px] mx-auto flex h-full min-h-screen">
          {/* <Sidebar /> */}
          <main className="flex-1 px-4 py-6 overflow-y-auto flex flex-col">
            <Header />
            <div className=" mx-auto block w-full">{children}</div>
            <Footer />
          </main>
          {/* <InfoPanel /> */}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
