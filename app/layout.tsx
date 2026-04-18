import type { Metadata } from "next";
import { Roboto, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const roboto = Roboto({
  variable: "--roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lykke",
    template: "%s | Lykke",
  },
  description: "Концертный дневник",
  authors: [{ name: "Sergei Usachev" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Lykke",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${roboto.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
